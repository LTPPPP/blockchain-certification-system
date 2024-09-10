// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/personal', authMiddleware.requireRole('student'), userController.updatePersonalInfo);
router.put('/school', authMiddleware.requireRole('school'), userController.updateSchoolInfo);

module.exports = router;
