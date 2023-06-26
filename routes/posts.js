const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const PostsController = require("../src/post/post.controller");

router.post("/create", validateToken, PostsController.createPost);

router.get("/:id", PostsController.getPost)

module.exports = router;