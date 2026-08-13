const express = require("express");
const router = express.Router();

const { verifyJWT } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const { createComment,updateComment,deleteComment,getCommentsByPost } = require("../controllers/comment.controller");

const { createCommentSchema } = require("../validators/comment.validator");

router.post(
  "/:postId",
  verifyJWT,
  validate(createCommentSchema),
  createComment,
);
router.get("/:postId", verifyJWT, getCommentsByPost);
router.patch(
  "/:commentId",
  verifyJWT,
  validate(createCommentSchema),
  updateComment,
);

router.delete("/:commentId", verifyJWT, deleteComment);

module.exports = router;
