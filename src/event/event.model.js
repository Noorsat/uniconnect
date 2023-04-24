const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { data: Buffer, contentType: String },
    date: {type: Date, required: true },
    location: {type: String, required: true },
    description: {type: String, required: true },
    price: {type: Number, required: true },
    allSeats: {type: Number, required: true },
    booked: {type: Number, required: true },
    clubId: {type: String, required: true },
    responsibleUserId: {type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Event = mongoose.model("event", eventSchema);
module.exports = Event;