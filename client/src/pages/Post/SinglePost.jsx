import { useEffect, useState } from "react";
import { FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import { getPostById } from "../../services/post.service";
import PostCard from "../../components/Home/PostCard/PostCard";

import styles from "./SinglePost.module.css";

export default function SinglePost() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPostById(postId);

        setPost(response.data);
      } catch (error) {
        console.error("Get single post error:", error);

        setError(
          error?.response?.data?.message ||
            "Unable to load this post. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handlePostUpdate = (updatedPosts) => {
    if (updatedPosts.length === 0) {
      navigate("/home");
      return;
    }

    setPost(updatedPosts[0]);
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading post...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <FiArrowLeft />
            Back
          </button>

          <div className={styles.error}>
            <FiAlertCircle />

            <h2>Post not found</h2>

            <p>{error || "This post may have been deleted."}</p>

            <button onClick={() => navigate("/home")}>Go to Home</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <FiArrowLeft />
          Back
        </button>

        <PostCard post={post} posts={[post]} setPosts={handlePostUpdate} />
      </div>
    </main>
  );
}
