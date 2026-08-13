const Post = require("../models/post.model");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const { createNotification } = require("./notification.service");

const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

exports.createPost = async (userId, data, files) => {
  if (!data.content?.trim() && (!files || files.length === 0)) {
    throw new ApiError(400, "Post must contain text or image");
  }

  let images = [];

  // if (files && files.length > 0) {
  //   for (const file of files) {
  //     const uploaded = await uploadOnCloudinary(file.path);

  // images.push({
  //       url: uploaded.secure_url,
  //       public_id: uploaded.public_id,
  //     });
  //   }
  // }

  if (files && files.length > 0) {
    const uploadedImages = await Promise.all(
      files.map((file) => uploadOnCloudinary(file.path)),
    );

    images = uploadedImages.map((img) => ({
      url: img.secure_url,
      public_id: img.public_id,
    }));
  }

  const post = await Post.create({
    author: userId,
    content: data.content,
    visibility: data.visibility,
    images,
  });

  return await Post.findById(post._id).populate(
    "author",
    "fullName username avatar",
  );
};

exports.getAllPosts = async () => {
  const posts = await Post.find({ visibility: "PUBLIC" })
    .populate("author", "fullName username avatar")
    .sort({ createdAt: -1 });

  return posts;
};

exports.getPostById = async (postId) => {
  const post = await Post.findById(postId).populate(
    "author",
    "fullName username avatar",
  );

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return post;
};

// exports.updatePost = async (userId, postId, data, files) => {
//   const post = await Post.findById(postId);

//   if (!post) {
//     throw new ApiError(404, "Post not found");
//   }

//   if (post.author.toString() !== userId.toString()) {
//     throw new ApiError(403, "Unauthorized");
//   }

//   // Update content
//   if (data.content !== undefined) {
//     post.content = data.content;
//   }

//   // Update visibility
//   if (data.visibility !== undefined) {
//     post.visibility = data.visibility;
//   }

//   // New images uploaded
//   if (files && files.length > 0) {
//     // Delete old images from Cloudinary
//     for (const image of post.images) {
//       await deleteFromCloudinary(image.public_id);
//     }

//     const uploadedImages = [];

//     for (const file of files) {
//       const uploaded = await uploadOnCloudinary(file.path);

//       uploadedImages.push({
//         url: uploaded.secure_url,
//         public_id: uploaded.public_id,
//       });
//     }

//     post.images = uploadedImages;
//   }

//   await post.save();

//   return await Post.findById(post._id).populate(
//     "author",
//     "fullName username avatar",
//   );
// };
exports.updatePost = async (userId, postId, data, files) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  if (data.content !== undefined) {
    post.content = data.content;
  }

  if (data.visibility !== undefined) {
    post.visibility = data.visibility;
  }

  if (files && files.length > 0) {
    // Upload new images first
    const uploadedImages = await Promise.all(
      files.map((file) => uploadOnCloudinary(file.path)),
    );

    // Upload successful -> delete old images
    for (const image of post.images) {
      await deleteFromCloudinary(image.public_id);
    }

    post.images = uploadedImages.map((img) => ({
      url: img.secure_url,
      public_id: img.public_id,
    }));
  }

  await post.save();

  return await Post.findById(post._id).populate(
    "author",
    "fullName username avatar",
  );
};

exports.deletePost = async (userId, postId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }
  //   uaha pe post.author me ek object id store store h and userId me bhi ek objeect id store h
  // to usko string me convert kiya gaya h uske baad compare kiya gaya h
  // niche vala function bhi same kaam karta he equals method ka use karke ham do object ko compatre kar sakte h
  //   if (!post.author.equals(userId)) {
  //   throw new ApiError(403, "Unauthorized");
  // }

  // Delete Cloudinary Images
  for (const image of post.images) {
    try {
      await deleteFromCloudinary(image.public_id);
    } catch (error) {
      console.log("Cloudinary delete failed:", image.public_id);
    }
  }
  await post.deleteOne();

  return true;
};

exports.toggleLike = async (userId, postId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === userId.toString(),
  );

  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());

    post.likesCount--;
  } else {
    post.likes.push(userId);

    post.likesCount++;
    
    // Create notification
    await createNotification({
      receiver: post.author,
      sender: userId,
      type: "LIKE",
      post: post._id,
      message: "liked your post",
    });
  }

  await post.save();

  const updatedPost = await Post.findById(post._id).populate(
    "author",
    "fullName username avatar",
  );

  return updatedPost;
};

exports.toggleSave = async (userId, postId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const alreadySaved = post.savedBy.some(
    (id) => id.toString() === userId.toString(),
  );

  if (alreadySaved) {
    post.savedBy = post.savedBy.filter(
      (id) => id.toString() !== userId.toString(),
    );
  } else {
    post.savedBy.push(userId);
  }

  await post.save();

  return await Post.findById(post._id).populate(
    "author",
    "fullName username avatar",
  );
};

exports.getPostsByUser = async (username) => {
  // 1. User find karo
  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 2. User ke saare posts fetch karo
  const posts = await Post.find({
    author: user._id,
  })
    .populate("author", "fullName username avatar")
    .sort({ createdAt: -1 });

  return posts;
};

exports.getSavedPosts = async (userId) => {
  const posts = await Post.find({
    savedBy: userId,
  })
    .populate("author", "fullName username avatar")
    .sort({
      createdAt: -1,
    });

  return posts;
};
