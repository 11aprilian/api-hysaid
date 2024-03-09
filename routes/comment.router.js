const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateCommentById);
router.delete('/:id', commentController.deleteCommentById);
router.get('/user/:userId', commentController.getCommentsByUserId);
router.get('/post/:postId', commentController.getCommentsByPostId);

module.exports = router;
