// controllers/userController.js
const User = require('../models/User');

exports.updatePersonalInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.personalInfo = req.body.personalInfo;
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateSchoolInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 'school') {
            return res.status(403).send({ error: 'Access denied' });
        }
        user.schoolInfo = req.body.schoolInfo;
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};
