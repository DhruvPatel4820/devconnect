import { useState } from "react";
import styles from "./CommentItem.module.css";
import { useAuth } from "../../../hooks/useAuth";
import {
  deleteComment,
  updateComment,
} from "../../../services/comment.service";

function CommentItem({ comment, setComments, onCommentDeleted }) {
  const { user } = useAuth();

  const isOwner = comment.author._id === user._id;

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleDelete = async () => {
    try {
      await deleteComment(comment._id);

      setComments((prev) => prev.filter((item) => item._id !== comment._id));

      onCommentDeleted();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editedContent.trim()) return;

    try {
      const response = await updateComment(comment._id, {
        content: editedContent,
      });

      const updatedComment = response.data;

      setComments((prev) =>
        prev.map((item) =>
          item._id === updatedComment._id ? updatedComment : item,
        ),
      );

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.comment}>
      <strong>{comment.author.fullName}</strong>

      {isEditing ? (
        <>
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />

          <div className={styles.actions}>
            <button onClick={handleSave}>💾 Save</button>
            <button onClick={handleCancel}>❌ Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p>{comment.content}</p>

          {isOwner && (
            <div className={styles.actions}>
              <button onClick={() => setIsEditing(true)}>✏ Edit</button>

              <button onClick={handleDelete}>🗑 Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CommentItem;
