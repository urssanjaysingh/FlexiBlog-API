const mongoose = require('mongoose');
const Post = require('../models/Post');
const upload = require('../middleware/postMulterConfig');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, content, author, tags } = req.body;
        const imagePath = req.file ? upload.generateRelativePath(req.file.filename) : null;

        const post = new Post({
            title,
            content,
            author: userId, 
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

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'profile')
            .exec();

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
};

exports.getPostById = async (req, res) => {
    const postId = req.params.id; // Get the post ID from the request parameters

    try {
        const post = await Post.findById(postId)
            .populate('author', 'profile') // Populate the author field with 'username'
            .exec();

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching the post' });
    }
};

exports.getPostsByUser = async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const posts = await Post.find({ author: userId })
            .populate('author', 'profile')
            .exec();

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
};

// Update a post by its ID
exports.updatePost = async (req, res) => {
    const { postId } = req.params; // Assuming the postId is passed as a route parameter
    try {
        const { title, content, tags } = req.body;
        
        let updatedPostData = {
            title,
            content,
            tags
        };
        
        if (req.file) {
            const imagePath = upload.generateRelativePath(req.file.filename);
            updatedPostData.image = {
                path: imagePath,
                filename: req.file.filename
            };
        }

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
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
};
