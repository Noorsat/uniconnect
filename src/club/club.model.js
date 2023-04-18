
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    name: { type: String, required: true },
    logo: { data: Buffer, contentType: String },
    description: {type: String, required: true },
    headId: {type: String, required: true}
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Club = mongoose.model("club", clubSchema);
module.exports = Club;