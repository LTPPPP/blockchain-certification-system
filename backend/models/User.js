const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['student', 'admin', 'school', 'employer'] },
    personalInfo: {
        dob: Date,
        gender: String,
        address: String,
    },
    schoolInfo: {
        schoolName: String,
        schoolType: String,
        contactNumber: String,
        website: String,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;


// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
