const express = require("express");
const router = express.Router();
const PayrollController = require("../controllers/PayrollController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkIfBlocked } = require("../middlewares/checkIfBlocked");

router.use(checkIfBlocked);

router.get("/payroll", authMiddleware, PayrollController.index);

module.exports = router;
