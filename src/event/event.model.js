const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {type: String, required:true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    description: {type: String, required: true},
    clubId: {type: String},
    userId: {type: String, required: true},
    images: [{type: String, required: true}],
    storyImage: {type: String},
    cardNumber: {type: Number},
    price: {type: Number},
    ticketCount: {type: Number},
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