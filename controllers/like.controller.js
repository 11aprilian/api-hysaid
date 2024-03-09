const Like = require('../models/like');

module.exports = {
  getAllLikes: async (req, res) => {
    try {
      const likes = await Like.find().populate('user post', 'username title'); // Assuming you have 'username' in 'user' model and 'title' in 'post' model

      res.json({
        message: 'Successfully retrieved likes',
        data: likes,
      });
    } catch (error) {
      console.error('Error fetching likes:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  getLikeById: async (req, res) => {
    try {
      const likeId = req.params.id;
      const like = await Like.findById(likeId).populate('user post', 'username title'); // Assuming you have 'username' in 'user' model and 'title' in 'post' model

      if (like) {
        res.json({
          message: 'Successfully retrieved like by ID',
          data: like,
        });
      } else {
        res.status(404).json({
          message: 'Like not found',
        });
      }
    } catch (error) {
      console.error('Error fetching like by ID:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  createLike: async (req, res) => {
    try {
      const data = req.body;
      const like = new Like(data);
      await like.save();

      res.json({
        message: 'Like created successfully',
        data: like,
      });
    } catch (error) {
      console.error('Error creating like:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  updateLikeById: async (req, res) => {
    try {
      const likeId = req.params.id;
      const data = req.body;
      const like = await Like.findByIdAndUpdate(likeId, data, { new: true });

      if (like) {
        res.json({
          message: 'Like updated successfully',
          data: like,
        });
      } else {
        res.status(404).json({
          message: 'Like not found',
        });
      }
    } catch (error) {
      console.error('Error updating like:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  deleteLikeById: async (req, res) => {
    try {
      const likeId = req.params.id;
      const like = await Like.findByIdAndDelete(likeId);

      if (like) {
        res.json({
          message: 'Like deleted successfully',
        });
      } else {
        res.status(404).json({
          message: 'Like not found',
        });
      }
    } catch (error) {
      console.error('Error deleting like:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  getLikesByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const likes = await Like.find({ user: userId }).populate('user post', 'username title'); // Assuming you have 'username' in 'user' model and 'title' in 'post' model

      res.json({
        message: 'Successfully retrieved likes by user ID',
        data: likes,
      });
    } catch (error) {
      console.error('Error fetching likes by user ID:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  getLikesByPostId: async (req, res) => {
    try {
      const postId = req.params.postId;
      const likes = await Like.find({ post: postId }).populate('user post', 'username title'); // Assuming you have 'username' in 'user' model and 'title' in 'post' model

      res.json({
        message: 'Successfully retrieved likes by post ID',
        data: likes,
      });
    } catch (error) {
      console.error('Error fetching likes by post ID:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
};
