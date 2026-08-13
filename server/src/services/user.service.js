const {uploadOnCloudinary} = require("../utils/cloudinary");
const User = require("../models/user.model");
const Follow = require("../models/follow.model");
const ApiError = require("../utils/ApiError");

exports.updateProfile = async (userId, data) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password -refreshToken");

  return updatedUser;
};

exports.changePassword = async (userId, data) => {
  const { oldPassword, newPassword } = data;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;

  await user.save();

  return true;
};

exports.updateAvatar = async (userId, file) => {
  if (!file) {
    throw new ApiError(400, "Avatar is required");
  }

  const uploadResponse = await uploadOnCloudinary(file.path);

  if (!uploadResponse) {
    throw new ApiError(500, "Avatar upload failed");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      avatar: uploadResponse.secure_url,
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password -refreshToken");

  return updatedUser;
};

exports.searchUsers = async (keyword) => {
  return await User.find({
    $or: [
      {
        fullName: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        username: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  }).select("fullName username avatar bio followersCount followingCount");
};

exports.getSuggestedUsers = async (currentUserId) => {
  return await User.find({
    _id: {
      $ne: currentUserId,
    },
  })
    .select("fullName username avatar bio followersCount")
    .limit(10);
};

exports.getUserProfile = async (username, currentUserId) => {
  const user = await User.findOne({ username }).select(
    "-password -refreshToken -email -role -isVerified",
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  let isFollowing = false;

  if (currentUserId.toString() !== user._id.toString()) {
    const follow = await Follow.findOne({
      follower: currentUserId,
      following: user._id,
    });

    isFollowing = !!follow;
  }

  return {
    ...user.toObject(),
    isFollowing,
  };
};
