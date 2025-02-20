const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkIfBlocked } = require("../middlewares/checkIfBlocked");

router.use(checkIfBlocked);

router.get("/messages", authMiddleware, messageController.index);
router.post("/messages/store", authMiddleware, messageController.store);
router.post("/messages/outbox", authMiddleware, messageController.storeOutbox);
router.put(
  "/messages/:message/soft-delete",
  authMiddleware,
  messageController.softDelete
);
router.put(
  "/messages/:message/hard-delete",
  authMiddleware,
  messageController.hardDelete
);
router.delete(
  "/messages/:message/delete",
  authMiddleware,
  messageController.destroy
);

module.exports = router;
