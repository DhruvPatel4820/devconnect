import { useEffect, useState } from "react";
import styles from "./CommentModal.module.css";
import CommentItem from "../CommentItem/CommentItem";
import {
  getCommentsByPost,
  createComment,
} from "../../../services/comment.service";
function CommentModal({ post, onClose, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    try {
      const response = await getCommentsByPost(post._id);

      setComments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      const response = await createComment(post._id, {
        content,
      });

      const newComment = response.data;

      setComments((prev) => [newComment, ...prev]);

      onCommentAdded({
        ...post,
        commentsCount: post.commentsCount + 1,
      });

      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Comments</h2>

          <button onClick={onClose}>✖</button>
        </div>

        <div className={styles.comments}>
          {loading ? (
            <p>Loading...</p>
          ) : comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            // comments.map((comment) => (
            //   <div key={comment._id}>
            //     <h4>{comment.author.fullName}</h4>
            //     <p>{comment.content}</p>
            //   </div>
            // ))
            comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                setComments={setComments}
                onCommentDeleted={() => {
                  onCommentAdded({
                    ...post,
                    commentsCount: post.commentsCount - 1,
                  });
                }}
              />
            ))
          )}
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default CommentModal;
