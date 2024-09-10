// models/AccessLog.js
const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: String,
    timestamp: { type: Date, default: Date.now },
});

const AccessLog = mongoose.model('AccessLog', accessLogSchema);
module.exports = AccessLog;
