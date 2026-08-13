const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const likeService = require("../services/like.service");

exports.toggleLike = asyncHandler(async (req, res) => {

  const result = await likeService.toggleLike(
    req.user._id,
    req.params.postId
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      result.liked
        ? "Post liked successfully"
        : "Post unliked successfully",
      result
    )
  );
});