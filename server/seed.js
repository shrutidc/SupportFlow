const mongoose = require('mongoose');
require('dotenv').config();

const seedDB = require('./seedHandler');

async function runSeed() {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        console.error("Fatal Error: MONGODB_URI is not set in environment.");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected via Mongoose for Seeding");
        await seedDB();
        console.log("Seeding complete. Exiting...");
        process.exit(0);
    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
}

runSeed();
