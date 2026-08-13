const express = require("express");
const router = express.Router();

const { verifyJWT } = require("../middleware/auth.middleware");

const {
  toggleFollow,
  getFollowing,
  getFollowers,
} = require("../controllers/follow.controller");

router.get("/followers/:userId", verifyJWT, getFollowers);
router.post("/:userId", verifyJWT, toggleFollow);
router.get("/following/:userId", verifyJWT, getFollowing);

module.exports = router;
