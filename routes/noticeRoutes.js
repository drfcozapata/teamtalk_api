const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/noticeController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkIfBlocked = require("../middlewares/checkIfBlocked");
const multer = require("multer");
const path = require("path");

const upload = multer({
  dest: path.join(__dirname, "../uploads"),
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
});

router.use(checkIfBlocked);

router.get("/board", authMiddleware, noticeController.index);
router.post(
  "/board/store",
  authMiddleware,
  upload.single("img"),
  noticeController.store
);
router.delete(
  "/board/:notice/delete",
  authMiddleware,
  noticeController.destroy
);

module.exports = router;
