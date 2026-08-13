const express = require("express");
const router = express.Router();

const { verifyJWT } = require("../middleware/auth.middleware");
const { toggleLike } = require("../controllers/like.controller");

router.post(
  "/:postId",
  verifyJWT,
  toggleLike
);

module.exports = router;