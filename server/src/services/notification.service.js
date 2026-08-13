const Notification = require("../models/notification.model");

exports.createNotification = async ({
  receiver,
  sender,
  type,
  post = null,
  message,
}) => {
  // Khud ke action par notification nahi
  if (receiver.toString() === sender.toString()) {
    return null;
  }

  const notification = await Notification.create({
    receiver,
    sender,
    type,
    post,
    message,
  });

  return notification;
};

exports.getUserNotifications = async (userId) => {
  return await Notification.find({
    receiver: userId,
  })
    .populate("sender", "fullName username avatar")
    .populate("post", "content images")
    .sort({ createdAt: -1 });
};

exports.markNotificationAsRead = async (userId, notificationId) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    receiver: userId,
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  notification.isRead = true;

  await notification.save();

  return notification;
};
