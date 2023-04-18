const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    clubId: {type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Gallery = mongoose.model("gallery", gallerySchema);
module.exports = Gallery;