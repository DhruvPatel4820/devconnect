const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/auth.service");
const cookieOptions = require("../utils/cookieOptions");

exports.registerUser = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  res
    .status(201)
    .cookie("accessToken", result.accessToken, result.cookieOptions)
    .cookie("refreshToken", result.refreshToken, result.cookieOptions)
    .json(new ApiResponse(201, "User registered successfully", result.user));
});

exports.loginUser = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res
    .status(200)
    .cookie("accessToken", result.accessToken, result.cookieOptions)
    .cookie("refreshToken", result.refreshToken, result.cookieOptions)
    .json(new ApiResponse(200, "Login successful", result.user));
});

exports.logoutUser = asyncHandler(async (req, res) => {
  await authService.logout(req.user._id);

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, "Logout successful"));
});

exports.refreshAccessToken = asyncHandler(async (req, res) => {
  const result = await authService.refreshAccessToken(req);

  return res
    .status(200)
    .cookie("accessToken", result.accessToken, cookieOptions)
    .cookie("refreshToken", result.refreshToken, cookieOptions)
    .json(new ApiResponse(200, "Access token refreshed successfully"));
});

exports.getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Current user fetched successfully", req.user),
    );
});
