const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const { verifyJWT } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  getPostsByUser,
  toggleSave,
  getSavedPosts,
} = require("../controllers/post.controller");

const { createPostSchema } = require("../validators/post.validator");

router.get(
  "/",
  (req, res, next) => {
    console.log("🔥 POSTS ROUTE HIT");
    next();
  },
  verifyJWT,
  getAllPosts,
);
router.get("/user/:username", verifyJWT, getPostsByUser);

router.get("/saved", verifyJWT, getSavedPosts);
router.get("/:postId", verifyJWT, getPostById);
router.patch(
  "/:postId",
  verifyJWT,
  upload.array("images", 5),
  validate(createPostSchema),
  updatePost,
);
router.delete("/:postId", verifyJWT, deletePost);
router.post("/:postId/like", verifyJWT, toggleLike);
router.post("/:postId/save", verifyJWT, toggleSave);
router.post(
  "/",
  verifyJWT,
  upload.array("images", 5),
  validate(createPostSchema),
  createPost,
);

module.exports = router;
