const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const EventsController = require("../src/event/event.controller");

router.post("/create", validateToken, EventsController.createEvent);

router.get("/all", validateToken, EventsController.getEvents)

router.get("/my", validateToken, EventsController.getMyEvents)

module.exports = router;