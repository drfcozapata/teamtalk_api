const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkIfBlocked } = require("../middlewares/checkIfBlocked");

router.use(checkIfBlocked);

router.get("/register", authMiddleware, userController.index);
router.post("/register/store", authMiddleware, userController.store);
router.put(
  "/users/:id/blockUnblock",
  authMiddleware,
  userController.updateBlocked
);
router.put("/register/:id/update", authMiddleware, userController.update);
router.delete("/register/:id/delete", authMiddleware, userController.destroy);

module.exports = router;
