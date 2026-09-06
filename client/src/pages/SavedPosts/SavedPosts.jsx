import { useEffect, useState } from "react";
import { FiBookmark, FiAlertCircle } from "react-icons/fi";

import PostCard from "../../components/Home/PostCard/PostCard";
import { getSavedPosts } from "../../services/post.service";
import { useAuth } from "../../hooks/useAuth";

import styles from "./SavedPosts.module.css";

export default function SavedPosts() {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSavedPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getSavedPosts();

      setPosts(response.data || []);
    } catch (error) {
      console.error("Fetch saved posts error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load saved posts. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedPosts();
    }
  }, [user]);

  // PostCard ke like/save/delete actions ke liye
  const handlePostsUpdate = (updatedPosts) => {
    // Agar user ne kisi saved post ko UNSAVE kar diya
    // to us post ko Saved page se remove kar do.
    const savedPosts = updatedPosts.filter((post) =>
      post.savedBy?.some((id) => id.toString() === user?._id?.toString()),
    );

    setPosts(savedPosts);
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading saved posts...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <h1>Saved Posts</h1>
              <p>Your bookmarked posts</p>
            </div>
          </div>

          <div className={styles.error}>
            <FiAlertCircle />

            <h2>Something went wrong</h2>

            <p>{error}</p>

            <button onClick={fetchSavedPosts}>Try Again</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <div className={styles.icon}>
              <FiBookmark />
            </div>

            <div>
              <h1>Saved Posts</h1>
              <p>Posts you've bookmarked for later</p>
            </div>
          </div>

          {posts.length > 0 && (
            <span className={styles.count}>
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          )}
        </div>

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <FiBookmark />
            </div>

            <h2>No saved posts yet</h2>

            <p>
              When you save a post, it will appear here so you can easily find
              it later.
            </p>
          </div>
        ) : (
          <div className={styles.posts}>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                posts={posts}
                setPosts={handlePostsUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
