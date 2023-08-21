const mongoose = require('mongoose');
const Post = require('../models/Post');
const upload = require('../middleware/postMulterConfig');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;
        const imagePath = req.file ? upload.generateRelativePath(req.file.filename) : null;

        const post = new Post({
            title,
            content,
            author,
            tags,
            image: {
                path: imagePath,
                filename: req.file ? req.file.filename : null
            }
        });

        await post.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'An error occurred while creating the post' });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
};

// Update a post by its ID
exports.updatePost = async (req, res) => {
    const { postId } = req.params; // Assuming the postId is passed as a route parameter
    try {
        const { title, content, tags } = req.body;
        const imagePath = req.file ? upload.generateRelativePath(req.file.filename) : null;

        const updatedPostData = {
            title,
            content,
            tags,
            image: {
                path: imagePath,
                filename: req.file ? req.file.filename : null
            }
        };

        const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'An error occurred while updating the post' });
    }
};

// Delete a post by its ID
exports.deletePost = async (req, res) => {
    const { postId } = req.params; // Assuming the postId is passed as a route parameter
    try {
        const deletedPost = await Post.findByIdAndRemove(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
};
