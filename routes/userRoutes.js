const express = require('express');
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT'); // Assuming you have a middleware to verify JWT
const upload = require('../middleware/multerConfig');

const router = express.Router();

// Protect these routes with JWT authentication
router.use(verifyJWT);

// GET user profile
router.get('/profile', userController.getUser);

// Update user profile
router.put('/update', upload.single('avatar'), userController.updateProfile);

module.exports = router;
