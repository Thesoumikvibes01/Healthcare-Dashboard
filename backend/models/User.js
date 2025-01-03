// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    symptoms: [{ date: Date, symptom: String }],
});

module.exports = mongoose.model('User', userSchema);