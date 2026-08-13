const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate.middleware");
const { verifyJWT } = require("../middleware/auth.middleware");

const { registerSchema, loginSchema } = require("../validators/auth.validator");

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser
} = require("../controllers/auth.controller");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/me", verifyJWT, getCurrentUser);

module.exports = router;
