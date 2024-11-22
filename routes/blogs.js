const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('home', { blogs });
});

// Create new blog form
router.get('/new', (req, res) => {
    res.render('create');
});

// Add a new blog
router.post('/', async (req, res) => {
    const { title, body } = req.body;
    await Blog.create({ title, body });
    res.redirect('/blogs');
});

// View single blog
router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('post', { blog });
});

// Edit blog form
router.get('/:id/edit', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('edit', { blog });
});

// Update blog
router.put('/:id', async (req, res) => {
    const { title, body } = req.body;
    await Blog.findByIdAndUpdate(req.params.id, { title, body });
    res.redirect(`/blogs/${req.params.id}`);
});

// Delete blog
router.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blogs');
});

module.exports = router;
