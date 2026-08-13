const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const commentService = require("../services/comment.service");

exports.createComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment(
    req.user._id,
    req.params.postId,
    req.body,
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "Comment added successfully", comment));
});

exports.getCommentsByPost = asyncHandler(async (req, res) => {
  const comments = await commentService.getCommentsByPost(req.params.postId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Comments fetched successfully", comments));
});

exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await commentService.updateComment(
    req.user._id,
    req.params.commentId,
    req.body,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment updated successfully", comment));
});

exports.deleteComment = asyncHandler(async (req, res) => {
  await commentService.deleteComment(req.user._id, req.params.commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully"));
});
