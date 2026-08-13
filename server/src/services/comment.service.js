const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const ApiError = require("../utils/ApiError");
const { createNotification } = require("./notification.service");

exports.createComment = async (userId, postId, data) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const comment = await Comment.create({
    post: postId,
    author: userId,
    content: data.content,
  });

  await Post.findByIdAndUpdate(postId, {
    $inc: {
      commentsCount: 1,
    },
  });

  await comment.populate("author", "fullName username avatar");
  await createNotification({
    receiver: post.author,
    sender: userId,
    type: "COMMENT",
    post: postId,
    message: "commented on your post",
  });
  return comment;
};

exports.getCommentsByPost = async (postId) => {
  const comments = await Comment.find({ post: postId })
    .populate("author", "fullName username avatar")
    .sort({ createdAt: -1 });

  return comments;
};

exports.updateComment = async (userId, commentId, data) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.author.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  comment.content = data.content;

  await comment.save();

  await comment.populate("author", "fullName username avatar");

  return comment;
};

exports.deleteComment = async (userId, commentId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.author.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  await comment.deleteOne();

  await Post.findByIdAndUpdate(comment.post, {
    $inc: {
      commentsCount: -1,
    },
  });

  return true;
};
