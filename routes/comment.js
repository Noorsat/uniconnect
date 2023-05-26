const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const CommentController = require("../src/comment/comment.controller");

router.post("/create", validateToken, CommentController.createComment);

module.exports = router;