const express = require('express');
const router = express.Router();
const upload = require('../middleware/postMulterConfig'); 
const postController = require('../controllers/postController'); 
const verifyJWT = require('../middleware/verifyJWT');

// Get all posts
router.get('/all', postController.getAllPosts);

router.get('/:id', postController.getPostById);

// Use authentication middleware to protect this route
router.use(verifyJWT);

// Define routes
router.get('/user/:userId', postController.getPostsByUser);

// Create a new post with image upload
router.post('/create', upload.single('image'), postController.createPost);

// Update a post by its ID
router.put('/:postId/update', upload.single('image'), postController.updatePost);

// Delete a post by its ID
router.delete('/:postId/delete', postController.deletePost);

module.exports = router;
