import { useState } from "react";
import styles from "./EditPost.module.css";

import { updatePost } from "../../../services/post.service";

export default function EditPost({ post, setPosts, closeModal }) {
  const [content, setContent] = useState(post.content);

  const [visibility, setVisibility] = useState(post.visibility);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await updatePost(post._id, {
        content,
        visibility,
      });

      const updatedPost = response.data;

      setPosts((prev) =>
        prev.map((item) => (item._id === updatedPost._id ? updatedPost : item)),
      );

      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Post</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="What's on your mind?"
          />

          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="PUBLIC">Public</option>

            <option value="PRIVATE">Private</option>
          </select>

          <div className={styles.actions}>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
