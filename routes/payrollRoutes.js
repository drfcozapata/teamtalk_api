const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payrollController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkIfBlocked = require("../middlewares/checkIfBlocked");

router.use(checkIfBlocked);

router.get("/payroll", authMiddleware, payrollController.index);

module.exports = router;
