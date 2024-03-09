const Comment = require("../models/comment");
module.exports = {
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find({}, "-__v")
        .populate("user", "username")
        .sort({ date: -1 });

      res.json({
        message: "Successfully retrieved comments",
        data: comments,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  getCommentById: async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId).populate(
        "user",
        "username"
      );

      if (comment) {
        res.json({
          message: "Successfully retrieved comment by ID",
          data: comment,
        });
      } else {
        res.status(404).json({
          message: "Comment not found",
        });
      }
    } catch (error) {
      console.error("Error fetching comment by ID:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  getCommentsByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const comments = await Comment.find({ user: userId })
        .populate("user", "username")
        .sort({ date: -1 });

      res.json({
        message: "Successfully retrieved comments by user ID",
        data: comments,
      });
    } catch (error) {
      console.error("Error fetching comments by user ID:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  getCommentsByPostId: async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await Comment.find({ post: postId })
        .populate("user", "username profilePicture")
        .sort({ date: -1 });

      res.json({
        message: "Successfully retrieved comments by post ID",
        data: comments,
      });
    } catch (error) {
      console.error("Error fetching comments by post ID:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  createComment: async (req, res) => {
    try {
      const data = req.body;
      const comment = new Comment(data);
      await comment.save();

      res.json({
        message: "Comment created successfully",
        data: comment,
      });
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  updateCommentById: async (req, res) => {
    try {
      const commentId = req.params.id;
      const data = req.body;
      const comment = await Comment.findByIdAndUpdate(commentId, data, {
        new: true,
      });

      if (comment) {
        res.json({
          message: "Comment updated successfully",
          data: comment,
        });
      } else {
        res.status(404).json({
          message: "Comment not found",
        });
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  deleteCommentById: async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findByIdAndDelete(commentId);

      if (comment) {
        res.json({
          message: "Comment deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "Comment not found",
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
