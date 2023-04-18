
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritesSchema = new Schema(
  {
    eventId: { type: String, required: true },
    userId: {type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Favorites = mongoose.model("favorites", favoritesSchema);
module.exports = Favorites;