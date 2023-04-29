const express = require("express");
const router = express.Router();

const cleanBody = require("../middlewares/cleanbody");
const { validateToken } = require("../middlewares/validateToken");

const AuthController = require("../src/users/user.controller");

router.post("/signup", cleanBody, AuthController.Signup);

router.put("/repeatCode", cleanBody, AuthController.RepeatCode);

router.put("/activate", cleanBody, AuthController.Activate);

router.post("/login", cleanBody, AuthController.Login);

router.put("/forgot", cleanBody, AuthController.ForgotPassword);

router.put("/reset", cleanBody, AuthController.ResetPassword);

router.get("/", validateToken, AuthController.GetUser);

router.get("/referred", validateToken, AuthController.ReferredAccounts);

router.get("/logout", validateToken, AuthController.Logout);

router.delete('/delete/:userId', validateToken, AuthController.DeleteUser)

module.exports = router;