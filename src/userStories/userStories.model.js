const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userStoriesSchema = new Schema(
  {
    image: {type: String, required: true },
    userId: {type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const UserStories = mongoose.model("userStories", userStoriesSchema);
module.exports = UserStories;