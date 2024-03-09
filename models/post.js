const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  date: String,
  content: String,
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
});

postSchema.add({
  comments: [{
    type: mongoose.ObjectId,
    ref: 'Comment'
  }]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
