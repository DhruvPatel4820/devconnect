const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const cookieOptions = require("../utils/cookieOptions");
const jwt = require("jsonwebtoken");

exports.register = async (userData) => {

  const {
    fullName,
    username,
    email,
    password,
  } = userData;

  if (
    !fullName ||
    !username ||
    !email ||
    !password
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [
      { email },
      { username }
    ],
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "User already exists"
    );
  }

  const user = await User.create({
    fullName,
    username,
    email,
    password,
  });

  const accessToken = user.generateAccessToken();

  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });

  const safeUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return {
    user: safeUser,
    accessToken,
    refreshToken,
    cookieOptions,
  };
};

exports.login = async (loginData) => {
  const { email, password } = loginData;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });

  const safeUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return {
    user: safeUser,
    accessToken,
    refreshToken,
    cookieOptions,
  };
};

exports.logout = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    $unset: { // $unset field ko mongodb se remove kar deti h
      refreshToken: 1,
    },
  });

  return true;
};


exports.refreshAccessToken = async (req) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await User.findByIdAndUpdate(user._id, {
    refreshToken,
  });

  return {
    accessToken,
    refreshToken,
  };
};

