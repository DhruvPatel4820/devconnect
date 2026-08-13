const Like = require("../models/like.model");
const Post = require("../models/post.model");
const ApiError = require("../utils/ApiError");

exports.toggleLike = async (userId, postId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const existingLike = await Like.findOne({
    post: postId,
    likedBy: userId,
  });

  if (existingLike) {
    await existingLike.deleteOne();

    await Post.findByIdAndUpdate(postId, {
      $inc: {
        likesCount: -1,
      },
    });

    return {
      liked: false,
    };
  }

  await Like.create({
    post: postId,
    likedBy: userId,
  });

  await Post.findByIdAndUpdate(postId, {
    $inc: {
      likesCount: 1,
    },
  });

  return {
    liked: true,
  };
};