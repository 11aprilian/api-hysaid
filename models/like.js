const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "user",
  },
  post: {
    type: mongoose.ObjectId,
    ref: "post",
  },
  date: String,
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
