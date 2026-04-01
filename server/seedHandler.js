const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Ticket = require('./models/Ticket');

async function seedDB() {
    try {
        console.log("Starting seeding process...");

        // Read data.js parsing the object
        const dataJsPath = path.join(__dirname, '..', 'data.js');
        let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

        // Remove const SupportData = and attach to window
        dataJsContent = dataJsContent.replace('const SupportData = ', 'module.exports = ');
        dataJsContent = dataJsContent.replace('window.SupportData = SupportData;', '');

        // Write out temp file
        const tempPath = path.join(__dirname, 'tempData.js');
        fs.writeFileSync(tempPath, dataJsContent);

        // Require it
        const SupportData = require('./tempData.js');

        // Clean up temp file
        fs.unlinkSync(tempPath);

        // Map to new schema
        const seedTickets = SupportData.map(t => {
            return {
                ticketId: t.id,
                subject: t.subject,
                category: t.category,
                priority: t.priority,
                status: t.status,
                assignedTo: t.assignedTo,
                customer: {
                    name: t.customerName,
                    company: t.company,
                    email: t.email,
                    phone: t.phone
                },
                createdAt: new Date(t.createdAt),
                lastUpdated: new Date(t.lastUpdated),
                slaDeadline: new Date(t.slaDeadline),
                aiAssist: {
                    sentiment: t.sentiment,
                    suggestedReply: null,
                    recommendedAction: null
                },
                messages: t.messages.map(m => ({
                    sender: m.sender,
                    body: m.body,
                    timestamp: new Date(m.timestamp)
                }))
            };
        });

        // Clear existing
        await Ticket.deleteMany({});
        console.log("Cleared existing tickets");

        // Insert
        await Ticket.insertMany(seedTickets);
        console.log(`Inserted ${seedTickets.length} tickets`);

        console.log("Seeding complete.");
    } catch (err) {
        console.error("Seeding error:", err);
        throw err;
    }
}

module.exports = seedDB;
