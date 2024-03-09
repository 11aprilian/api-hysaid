const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller');

router.get('/', likeController.getAllLikes);
router.get('/:id', likeController.getLikeById);
router.post('/', likeController.createLike);
router.put('/:id', likeController.updateLikeById);
router.delete('/:id', likeController.deleteLikeById);
router.get('/user/:userId', likeController.getLikesByUserId);
router.get('/post/:postId', likeController.getLikesByPostId);

module.exports = router;
