const Follow = require("../models/follow.model");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { createNotification } = require("./notification.service");

exports.toggleFollow = async (currentUserId, targetUserId) => {
  if (currentUserId.toString() === targetUserId.toString()) {
    throw new ApiError(400, "You cannot follow yourself");
  }

  const targetUser = await User.findById(targetUserId);

  if (!targetUser) {
    throw new ApiError(404, "User not found");
  }

  const existingFollow = await Follow.findOne({
    follower: currentUserId,
    following: targetUserId,
  });

  if (existingFollow) {
    await existingFollow.deleteOne();

    await User.findByIdAndUpdate(currentUserId, {
      $inc: {
        followingCount: -1,
      },
    });

    await User.findByIdAndUpdate(targetUserId, {
      $inc: {
        followersCount: -1,
      },
    });

    return {
      following: false,
      followerId: currentUserId,
      followingId: targetUserId,
    };
  }

  await Follow.create({
    follower: currentUserId,
    following: targetUserId,
  });

  await User.findByIdAndUpdate(currentUserId, {
    $inc: {
      followingCount: 1,
    },
  });

  await User.findByIdAndUpdate(targetUserId, {
    $inc: {
      followersCount: 1,
    },
  });

  await createNotification({
    receiver: targetUserId,
    sender: currentUserId,
    type: "FOLLOW",
    message: "started following you",
  });

  return {
    following: true,
  };
};

exports.getFollowers = async (userId) => {
  return await Follow.find({
    following: userId,
  })
    .populate(
      "follower",
      "fullName username avatar bio followersCount followingCount",
    )
    .sort({ createdAt: -1 });
};

exports.getFollowing = async (userId) => {
  return await Follow.find({
    follower: userId,
  })
    .populate(
      "following",
      "fullName username avatar bio followersCount followingCount",
    )
    .sort({ createdAt: -1 });
};
