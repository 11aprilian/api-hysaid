const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find({}, "-__v")
        .populate("user", "username profilePicture")
        .sort({ date: -1 });

      res.json({
        message: "Successfully retrieved posts",
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  getPostById: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId)
        .populate("user", "username")
        .sort({ date: -1 }); 

      if (post) {
        res.json({
          message: "Successfully retrieved post by ID",
          data: post,
        });
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  getPostByUserId: async (req, res) => {
    try {
      const userId = req.params.userId; 
      const posts = await Post.find({ user: userId })
        .populate("user", "username profilePicture")
        .sort({ date: -1 });

      res.json({
        message: "Successfully retrieved posts by user ID",
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching posts by user ID:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  createPost: async (req, res) => {
    try {
      const data = req.body;
      const post = new Post(data);
      await post.save();

      res.json({
        message: "Post created successfully",
        data: post,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  updatePostById: async (req, res) => {
    try {
      const postId = req.params.id;
      const data = req.body;
      const post = await Post.findByIdAndUpdate(postId, data, { new: true });

      if (post) {
        res.json({
          message: "Post updated successfully",
          data: post,
        });
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  deletePostById: async (req, res) => {
    try {
      const postId = req.params.id;
      await Comment.deleteMany({ post: postId });
      const post = await Post.findByIdAndDelete(postId);

      if (post) {
        res.json({
          message: "Post deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
