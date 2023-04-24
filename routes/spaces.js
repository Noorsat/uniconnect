const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const SpacesController = require("../src/space/space.controller");

router.post("/create", SpacesController.createSpace);

router.get("/all", SpacesController.getSpaces)

module.exports = router;