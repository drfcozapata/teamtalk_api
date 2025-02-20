const express = require("express");
const router = express.Router();
const NoticeController = require("../controllers/NoticeController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkIfBlocked } = require("../middlewares/checkIfBlocked");

router.use(checkIfBlocked); // Middleware para verificar si la cuenta está bloqueada

router.get("/board", authMiddleware, NoticeController.index);
router.post("/board/store", authMiddleware, NoticeController.store);
router.delete(
  "/board/:notice/delete",
  authMiddleware,
  NoticeController.destroy
);

module.exports = router;
