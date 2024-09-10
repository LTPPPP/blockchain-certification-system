// middleware/logMiddleware.js
const AccessLog = require('../models/AccessLog');

exports.logAccess = (action) => {
    return async (req, res, next) => {
        const log = new AccessLog({ userId: req.user._id, action });
        await log.save();
        next();
    };
};
