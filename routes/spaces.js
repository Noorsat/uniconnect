const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const SpacesController = require("../src/space/space.controller");

router.post("/create", validateToken, SpacesController.createSpace);

router.get("/all", validateToken, SpacesController.getSpaces);

router.get("/:id", validateToken, SpacesController.getSpace)

module.exports = router;