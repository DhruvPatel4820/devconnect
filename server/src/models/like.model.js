const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

likeSchema.index(
  {
    post: 1,
    likedBy: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "Like",
  likeSchema
);