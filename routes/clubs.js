const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const ClubsController = require("../src/club/club.controller");

router.post("/create", validateToken, ClubsController.createClub);

router.get("/all", validateToken, ClubsController.getClubs)

module.exports = router;