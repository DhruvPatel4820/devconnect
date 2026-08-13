import { FiImage, FiX } from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./CreatePost.module.css";
import { useEffect, useRef, useState } from "react";
import { createPost } from "../../../services/post.service";

export default function CreatePost({ onPostCreated }) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const fileRef = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => {
      const newImages = [...prev, ...files].slice(0, 5);
      return newImages;
    });

    e.target.value = "";
  };

  useEffect(() => {
    const urls = images.map((image) => URL.createObjectURL(image));

    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreatePost = async () => {
    if (!content.trim() && images.length === 0) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("content", content);
      formData.append("visibility", "PUBLIC");

      images.forEach((image) => {
        formData.append("images", image);
      });

      await createPost(formData);

      setContent("");
      setImages([]);
      setPreviews([]);

      if (fileRef.current) {
        fileRef.current.value = "";
      }

      onPostCreated();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createPost}>
      {/* User */}
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

        <input
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Image Preview */}
      {previews.length > 0 && (
        <div className={styles.preview}>
          {previews.map((url, index) => (
            <div key={url} className={styles.previewItem}>
              <img src={url} alt={`Preview ${index + 1}`} />

              <button type="button" onClick={() => removeImage(index)}>
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* File Input */}
      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />

      {/* Bottom */}
      <div className={styles.bottom}>
        <button
          type="button"
          disabled={loading}
          onClick={() => fileRef.current?.click()}
        >
          <FiImage />
          Photo
        </button>

        <button
          type="button"
          className={styles.postBtn}
          onClick={handleCreatePost}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
