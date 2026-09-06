import { useEffect, useState } from "react";
import PostSkeleton from "../../../components/Common/PostSkeleton/PostSkeleton";

import PostCard from "../PostCard/PostCard";

import { getAllPosts } from "../../../services/post.service";

import styles from "./Feed.module.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const response = await getAllPosts();

      setPosts(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className={styles.feed}>
      {/* Loading Skeleton */}
      {loading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            posts={posts}
            setPosts={setPosts}
          />
        ))
      )}
    </section>
  );
}
