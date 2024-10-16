 const express = require('express');
const { auth, checkAdmin } = require('../middleware/auth');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();

router.get('/viewAllPosts', getAllPosts);
router.get('/post-get-by-id/:id', getPostById);
router.post('/create-post', auth, checkAdmin, createPost);
router.put('/update-by-id/:id', [auth, checkAdmin], updatePost);
router.delete('/delete-by-id/:id', [auth, checkAdmin], deletePost);

module.exports = router;


