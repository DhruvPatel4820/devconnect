const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const postService = require("../services/post.service");

exports.createPost = asyncHandler(async (req, res) => {
  const post = await postService.createPost(req.user._id, req.body, req.files);

  return res
    .status(201)
    .json(new ApiResponse(201, "Post created successfully", post));
});

exports.getAllPosts = asyncHandler(async (req, res) => {
  const posts = await postService.getAllPosts();

  return res
    .status(200)
    .json(new ApiResponse(200, "Posts fetched successfully", posts));
});

exports.getPostById = asyncHandler(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Post fetched successfully", post));
});

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await postService.updatePost(
    req.user._id,
    req.params.postId,
    req.body,
    req.files,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Post updated successfully", post));
});

exports.deletePost = asyncHandler(async (req, res) => {
  await postService.deletePost(req.user._id, req.params.postId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Post deleted successfully"));
});

exports.toggleLike = asyncHandler(async (req, res) => {
  const post = await postService.toggleLike(req.user._id, req.params.postId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Like updated successfully", post));
});
exports.toggleSave = async (req, res) => {
  const post = await postService.toggleSave(req.user._id, req.params.postId);

  return res.status(200).json({
    success: true,
    data: post,
  });
};

exports.getPostsByUser = asyncHandler(async (req, res) => {
  const posts = await postService.getPostsByUser(req.params.username);

  return res
    .status(200)
    .json(new ApiResponse(200, "User posts fetched successfully", posts));
});

exports.getSavedPosts = async (req, res) => {
  const posts = await postService.getSavedPosts(req.user._id);

  return res.status(200).json({
    success: true,
    data: posts,
  });
};
