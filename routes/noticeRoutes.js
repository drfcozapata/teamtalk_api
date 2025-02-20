const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/noticeController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkIfBlocked } = require("../middlewares/checkIfBlocked");

router.use(checkIfBlocked);

router.get("/board", authMiddleware, noticeController.index);
router.post("/board/store", authMiddleware, noticeController.store);
router.delete(
  "/board/:notice/delete",
  authMiddleware,
  noticeController.destroy
);

module.exports = router;
