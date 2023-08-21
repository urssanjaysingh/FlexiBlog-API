const express = require('express');
const avatarController = require('../controllers/avatarController');
const verifyJWT = require('../middleware/verifyJWT');

const router = express.Router();

// Use authentication middleware to protect this route
router.use(verifyJWT);

// Define the avatar upload route
router.post('/upload', avatarController.uploadAvatar, avatarController.updateAvatar);

module.exports = router;
