const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    spaceId: { type: String, required: true },
    image: {type: String},
    name: {type: String, required: true},
    description: {type: String, required: true},
    likesCount: {type: Number, default : 0},
    commentsCount: {type: Number, default : 0},
    comments: [
      {
        text: {type: String},
        user: {
          id : {type: String},
          fullname: {type: String},
          image: {type: String}
        }
      }
    ]
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;