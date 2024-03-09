const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  getPostByUserId, 
} = require("../controllers/post.controller");

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/user/:userId", getPostByUserId);
router.post("/", createPost);
router.put("/:id", updatePostById);
router.delete("/:id", deletePostById);


module.exports = router;
