const express = require("express");

const router = express.Router();

const { verifyJWT } = require("../middleware/auth.middleware");

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notification.controller");

router.get("/", verifyJWT, getNotifications);

router.patch("/:notificationId/read", verifyJWT, markAsRead);

module.exports = router;
