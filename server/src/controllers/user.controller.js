const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const userService = require("../services/user.service");

exports.updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateProfile(req.user._id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully", updatedUser));
});

exports.changePassword = asyncHandler(async (req, res) => {
  await userService.changePassword(req.user._id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});

exports.updateAvatar = asyncHandler(async (req, res) => {
  console.log("REQ FILE:", req.file);
  const updatedUser = await userService.updateAvatar(req.user._id, req.file);

  return res
    .status(200)
    .json(new ApiResponse(200, "Avatar updated successfully", updatedUser));
  // console.log("update Avtar");
});

exports.searchUsers = asyncHandler(async (req, res) => {
  const users = await userService.searchUsers(req.query.keyword);

  return res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});

exports.getSuggestedUsers = asyncHandler(async (req, res) => {
  const users = await userService.getSuggestedUsers(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Suggested users fetched successfully", users));
});
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserProfile(
    req.params.username,
    req.user._id,
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "Profile fetched successfully", user));
});
