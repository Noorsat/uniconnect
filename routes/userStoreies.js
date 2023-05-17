const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const UserStoriesСontroller = require("../src/userStories/userStories.controller");

router.post("/upload", validateToken, UserStoriesСontroller.createStories);

router.get("/all", validateToken, UserStoriesСontroller.getStories);

module.exports = router;