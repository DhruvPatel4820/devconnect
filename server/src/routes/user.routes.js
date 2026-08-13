const upload = require("../config/multer");
const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  updateProfileSchema,
  changePasswordSchema,
} = require("../validators/user.validator");

const {
  updateAvatar,
  searchUsers,
  getSuggestedUsers,
  updateProfile,
  changePassword,
  getUserProfile,
} = require("../controllers/user.controller");

router.patch(
  "/avatar",
  (req, res, next) => {
    console.log("Avatar route hit");
    next();
  },
  verifyJWT,
  upload.single("avatar"),
  updateAvatar,
);
router.get("/search", verifyJWT, searchUsers);
router.get("/suggestions", verifyJWT, getSuggestedUsers);
router.patch(
  "/profile",
  verifyJWT,
  validate(updateProfileSchema),
  updateProfile,
);
router.patch(
  "/change-password",
  verifyJWT,
  validate(changePasswordSchema),
  changePassword,
);
router.get("/:username", verifyJWT, getUserProfile);

module.exports = router;
