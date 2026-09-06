import PostCard from "../../Home/PostCard/PostCard";

import styles from "./UserPosts.module.css";

export default function UserPosts({ posts, setPosts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No posts yet.</h2>
        <p>This user hasn't shared any posts.</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <h2>Recent Posts</h2>

      <div className={styles.posts}>
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            posts={posts}
            setPosts={setPosts}
          />
        ))}
      </div>
    </section>
  );
}
