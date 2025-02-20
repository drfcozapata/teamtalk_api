const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkIfBlocked } = require("../middlewares/checkIfBlocked");

router.use(checkIfBlocked);

router.get("/messages", authMiddleware, MessageController.index);
router.post("/messages/store", authMiddleware, MessageController.store);
router.post("/messages/outbox", authMiddleware, MessageController.storeOutbox);
router.put(
  "/messages/:message/soft-delete",
  authMiddleware,
  MessageController.softDelete
);
router.put(
  "/messages/:message/hard-delete",
  authMiddleware,
  MessageController.hardDelete
);
router.delete(
  "/messages/:message/delete",
  authMiddleware,
  MessageController.destroy
);

module.exports = router;
