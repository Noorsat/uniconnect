const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spaceSchema = new Schema(
  {
    userId: {type: String, required: true },
    title: {type: String, required: true },
    description: {type: String, required: true },
    image: { type: String, required: true },
    postCount: {type: Number},
    posts: [
      {
        id: {type: String},
        text: { type: String},
        image: {type: String},
        likesCount: {type: Number},
        commentsCount: {type: Number}
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

const Space = mongoose.model("space", spaceSchema);
module.exports = Space;