const express = require("express");
const router = express.Router();
const PersonalProfileController = require("../controllers/PersonalProfileController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkIfBlocked } = require("../middlewares/checkIfBlocked");

router.use(checkIfBlocked);

router.get(
  "/personal-profiles",
  authMiddleware,
  PersonalProfileController.index
);
router.put(
  "/personal-profiles/:profile/update",
  authMiddleware,
  PersonalProfileController.update
);
router.delete(
  "/personal-profiles/:profile/delete",
  authMiddleware,
  PersonalProfileController.destroy
);

module.exports = router;
