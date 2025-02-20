const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/suspended-account", userController.suspendedAccount);

module.exports = router;
