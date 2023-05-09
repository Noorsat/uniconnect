const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const ClubsController = require("../src/club/club.controller");

router.post("/create", ClubsController.createClub);

router.get("/all", validateToken, ClubsController.getClubs);

router.get("/:id", validateToken, ClubsController.getClub);

module.exports = router;