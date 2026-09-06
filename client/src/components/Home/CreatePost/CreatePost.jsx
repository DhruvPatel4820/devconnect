import { useEffect, useRef, useState } from "react";
import { FiImage, FiX } from "react-icons/fi";

import { useAuth } from "../../../hooks/useAuth";
import { createPost } from "../../../services/post.service";

import styles from "./CreatePost.module.css";

export default function CreatePost({ onPostCreated }) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const fileRef = useRef(null);

  // =========================
  // Image Selection
  // =========================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => {
      const newImages = [...prev, ...files].slice(0, 5);

      return newImages;
    });

    e.target.value = "";
  };

  // =========================
  // Image Preview
  // =========================

  useEffect(() => {
    const urls = images.map((image) =>
      URL.createObjectURL(image),
    );

    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  // =========================
  // Remove Image
  // =========================

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index),
    );
  };

  // =========================
  // Create Post
  // =========================

  const handleCreatePost = async () => {
    if (!content.trim() && images.length === 0) {
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("content", content);
      formData.append("visibility", "PUBLIC");

      images.forEach((image) => {
        formData.append("images", image);
      });

      await createPost(formData);

      // Reset form
      setContent("");
      setImages([]);
      setPreviews([]);

      if (fileRef.current) {
        fileRef.current.value = "";
      }

      // Go back to Home
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.log("Create post error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createPost}>

      {/* =========================
          USER + CONTENT
      ========================= */}

      <div className={styles.top}>
        <img
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.fullName || "User",
            )}`
          }
          alt={user?.fullName || "User"}
        />

        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
      </div>

      {/* =========================
          IMAGE PREVIEW
      ========================= */}

      {previews.length > 0 && (
        <div className={styles.preview}>
          {previews.map((url, index) => (
            <div
              key={url}
              className={styles.previewItem}
            >
              <img
                src={url}
                alt={`Preview ${index + 1}`}
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                aria-label="Remove image"
              >
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* =========================
          FILE INPUT
      ========================= */}

      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />

      {/* =========================
          BOTTOM
      ========================= */}

      <div className={styles.bottom}>

        <button
          type="button"
          disabled={loading || images.length >= 5}
          onClick={() => fileRef.current?.click()}
        >
          <FiImage />

          {images.length >= 5
            ? "Maximum 5 images"
            : "Add Photo"}
        </button>

        <button
          type="button"
          className={styles.postBtn}
          onClick={handleCreatePost}
          disabled={
            loading ||
            (!content.trim() && images.length === 0)
          }
        >
          {loading ? "Posting..." : "Post"}
        </button>

      </div>
    </div>
  );
}