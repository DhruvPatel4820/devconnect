const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const followService = require("../services/follow.service");

exports.toggleFollow = asyncHandler(async (req, res) => {
  const result = await followService.toggleFollow(
    req.user._id,
    req.params.userId,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result.following
          ? "User followed successfully"
          : "User unfollowed successfully",
        result,
      ),
    );
});

exports.getFollowers = asyncHandler(async (req, res) => {
  const followers = await followService.getFollowers(req.params.userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Followers fetched successfully", followers));
});

exports.getFollowing = asyncHandler(async (req, res) => {

  const following =
    await followService.getFollowing(
      req.params.userId
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Following fetched successfully",
      following
    )
  );

});