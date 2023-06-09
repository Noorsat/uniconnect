const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const LikesController = require("../src/like/like.controller");

router.post("/put", validateToken, LikesController.putLike);

module.exports = router;