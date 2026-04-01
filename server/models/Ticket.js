const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ['customer', 'agent'],
        required: true
    },
    body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ticketSchema = new mongoose.Schema({
    ticketId: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Billing', 'Integration', 'Bug', 'Account Access'],
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    status: {
        type: String,
        enum: ['New', 'In Progress', 'Escalated', 'Closed'],
        required: true
    },
    assignedTo: {
        type: String,
        default: null
    },
    customer: {
        name: { type: String, required: true },
        company: { type: String },
        email: { type: String },
        phone: { type: String }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    slaDeadline: {
        type: Date,
        required: true
    },
    aiAssist: {
        sentiment: {
            type: String,
            enum: ['Frustrated', 'Neutral', 'Positive']
        },
        suggestedReply: { type: String },
        recommendedAction: { type: String }
    },
    messages: [messageSchema]
});

// Text index for search
ticketSchema.index({ subject: 'text' });

module.exports = mongoose.model('Ticket', ticketSchema);
