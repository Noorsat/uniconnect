const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    spaceId: {type: String, required: true },
    postId: {type: String, required: true },
    comment : {type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;