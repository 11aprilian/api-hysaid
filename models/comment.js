const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.ObjectId,
    ref: "Post",
  },
  date: String,
  content: String,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
