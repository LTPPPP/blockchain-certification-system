// routes/diplomaRoutes.js
const express = require('express');
const diplomaController = require('../controllers/diplomaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Chỉ quản trị viên hoặc nhà trường mới có quyền cấp phát bằng cấp
router.post('/issue', authMiddleware.requireRole('admin'), diplomaController.issueDiploma);

module.exports = router;
