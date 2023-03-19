const express = require("express");
const router = express.Router();

const cleanBody = require("../middlewares/cleanbody");
const { validateToken } = require("../middlewares/validateToken");

const AuthController = require("../src/users/user.controller");

router.post("/signup", cleanBody, AuthController.Signup);

router.put("/activate", cleanBody, AuthController.Activate);

router.post("/login", cleanBody, AuthController.Login);

router.put("/forgot", cleanBody, AuthController.ForgotPassword);

router.put("/reset", cleanBody, AuthController.ResetPassword);

router.get("/all", validateToken, (req, res) => res.status(200).send("yeah"))

router.get("/referred", validateToken, AuthController.ReferredAccounts);

router.get("/logout", validateToken, AuthController.Logout);

module.exports = router;