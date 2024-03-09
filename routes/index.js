const express = require('express');
const router = express.Router()

const userRouter = require('./user.router');
const postRouter = require('./post.router');
const commentRouter = require('./comment.router');
const likeRouter = require('./like.router');
const searchRouter = require('./search.router');


router.use("/user" ,userRouter)
router.use("/post" ,postRouter)
router.use("/comment" ,commentRouter)
router.use("/like" ,likeRouter)
router.use("/search" ,searchRouter)
module.exports = router
