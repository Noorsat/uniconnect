const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    eventId: {type: String, required: true },
    userId: {type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Ticket = mongoose.model("ticket", ticketSchema);
module.exports = Ticket;