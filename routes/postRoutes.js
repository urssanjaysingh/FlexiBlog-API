const express = require('express');
const router = express.Router();
const upload = require('../middleware/postMulterConfig'); 
const postController = require('../controllers/postController'); 
const verifyJWT = require('../middleware/verifyJWT');

// Use authentication middleware to protect this route
router.use(verifyJWT);

// Create a new post with image upload
router.post('/create', upload.single('image'), postController.createPost);

// Get all posts
router.get('/all', postController.getAllPosts);

// Update a post by its ID
router.put('/:postId', upload.single('image'), postController.updatePost);

// Delete a post by its ID
router.delete('/:postId', postController.deletePost);

module.exports = router;
