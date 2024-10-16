const Post = require("../models/Post");

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Create a new post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      author: req.user.id,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    await post.deleteOne();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
