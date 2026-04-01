const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Ticket = require('./models/Ticket');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// Connect to MongoDB
const { MongoMemoryServer } = require('mongodb-memory-server');
const seedDB = require('./seedHandler');

const mongoURI = process.env.MONGODB_URI;

async function startDatabase() {
    let connected = false;

    if (mongoURI) {
        try {
            await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
            console.log("MongoDB connected via Mongoose (Atlas)");
            connected = true;
        } catch (err) {
            console.error("Primary MongoDB connection failed, falling back to in-memory:", err.message);
        }
    } else {
        console.warn("MONGODB_URI not set, defaulting to in-memory database.");
    }

    if (!connected) {
        try {
            const mongoServer = await MongoMemoryServer.create();
            const memoryURI = mongoServer.getUri();
            await mongoose.connect(memoryURI);
            console.log("MongoDB connected to in-memory server");
            
            // Seed the in-memory database
            await seedDB();
        } catch (err) {
            console.error("Failed to start in-memory database:", err);
            process.exit(1);
        }
    }
}

// Start DB before starting routes
startDatabase().catch(err => {
    console.error("Database initialization failed:", err);
    process.exit(1);
});


// API Routes

// 4.1 GET /api/tickets
app.get('/api/tickets', async (req, res) => {
    try {
        const { status, q, view, sort, limit = 50 } = req.query;
        let query = {};

        if (status && status !== 'All') {
            query.status = status;
        }

        if (q) {
            // Simple regex search on subject
            query.subject = { $regex: q, $options: 'i' };
        }

        if (view === "assigned") {
            query.assignedTo = "You";
        } else if (view === "escalations") {
            query.status = "Escalated";
        }

        let sortObj = { lastUpdated: -1 }; // default 'lastUpdated_desc'
        if (sort === 'lastUpdated_asc') sortObj.lastUpdated = 1;
        // can add more sort options later if needed

        // Lightweight projection
        const tickets = await Ticket.find(query)
            .select('ticketId customer.name customer.company subject priority status assignedTo lastUpdated')
            .sort(sortObj)
            .limit(parseInt(limit));

        res.json({ tickets });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4.2 GET /api/tickets/:ticketId
app.get('/api/tickets/:ticketId', async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4.3 PATCH /api/tickets/:ticketId
app.patch('/api/tickets/:ticketId', async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const updates = req.body;
        updates.lastUpdated = new Date();

        const ticket = await Ticket.findOne({ ticketId });
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        // Validation: Prevent claiming already assigned tickets
        if (updates.assignedTo === "You" && updates.status === "In Progress" && ticket.assignedTo) {
            return res.status(409).json({ error: 'Ticket is already assigned' });
        }

        if (updates.status === 'Escalated') {
            updates.priority = 'High';
            updates.assignedTo = 'Engineering Queue';
            const now = new Date();
            updates.slaDeadline = new Date(now.getTime() + 4 * 60 * 60 * 1000); // now + 4 hours
        } else if (updates.status === 'New') {
            updates.assignedTo = null;
        }

        const updatedTicket = await Ticket.findOneAndUpdate(
            { ticketId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        res.json(updatedTicket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4.4 POST /api/tickets/:ticketId/messages
app.post('/api/tickets/:ticketId/messages', async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const { sender, body } = req.body;

        if (!sender || !body) {
            return res.status(400).json({ error: 'Missing sender or body' });
        }

        const newMessage = {
            sender,
            body,
            timestamp: new Date()
        };

        const ticket = await Ticket.findOne({ ticketId });
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        let updates = {
            $push: { messages: newMessage },
            $set: { lastUpdated: new Date() }
        };

        // If agent sends a message and it's New, set it to In Progress and Assign
        if (ticket.status === 'New' && sender === 'agent') {
            updates['$set'].status = 'In Progress';
            updates['$set'].assignedTo = 'You';
        }

        const updatedTicket = await Ticket.findOneAndUpdate(
            { ticketId },
            updates,
            { new: true }
        );

        res.json(updatedTicket);
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
