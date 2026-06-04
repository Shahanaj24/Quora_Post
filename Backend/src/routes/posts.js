const express = require('express');
const router = express.Router();
const Post = require('../model/Post');
const auth = require('../middleware/auth');

// GET /api/posts - list all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/posts/:id - get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/posts - create post (authenticated)
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const username = req.user.username || req.body.username || 'Anonymous';
    if (!content) return res.status(400).json({ message: 'Content required' });
    const post = await Post.create({ username, content });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/posts/:id - update post (authenticated, owner)
router.patch('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.username !== req.user.username) return res.status(403).json({ message: 'Forbidden' });
    post.content = content || post.content;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/posts/:id - delete post (authenticated, owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.username !== req.user.username) return res.status(403).json({ message: 'Forbidden' });
    await post.remove();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
