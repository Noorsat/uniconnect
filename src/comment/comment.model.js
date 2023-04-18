const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    spaceId: {type: String, required: true },
    text: {type: String, required: true },
    userId: {type: String, required: true },
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