const express = require("express");
const router = express.Router();
const personalProfileController = require("../controllers/personalProfileController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkIfBlocked } = require("../middlewares/checkIfBlocked");

router.use(checkIfBlocked);

router.get(
  "/personal-profiles",
  authMiddleware,
  personalProfileController.index
);
router.put(
  "/personal-profiles/:profile/update",
  authMiddleware,
  personalProfileController.update
);
router.delete(
  "/personal-profiles/:profile/delete",
  authMiddleware,
  personalProfileController.destroy
);

module.exports = router;
