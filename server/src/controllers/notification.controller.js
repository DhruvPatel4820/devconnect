const {
  getUserNotifications,
  markNotificationAsRead,
} = require("../services/notification.service");

exports.getNotifications = async (req, res) => {
  const notifications = await getUserNotifications(req.user._id);

  return res.status(200).json({
    success: true,
    data: notifications,
  });
};

exports.markAsRead = async (req, res) => {
  const notification = await markNotificationAsRead(
    req.user._id,
    req.params.notificationId,
  );

  return res.status(200).json({
    success: true,
    data: notification,
  });
};
