const User = require('../models/User');
const tokenUtils = require('../utils/tokenUtils');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const user = new User({ name, email, password, role });
        await user.save();

        const token = tokenUtils.generateToken(user._id);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = tokenUtils.generateToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Error logging in' });
    }
};
