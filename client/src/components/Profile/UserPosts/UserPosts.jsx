import PostCard from "../../Home/PostCard/PostCard";

export default function UserPosts({ posts, setPosts }) {
  if (!posts || posts.length === 0) {
    return (
      <div>
        <h2>No posts yet.</h2>
        <p>This user hasn't shared any posts.</p>
      </div>
    );
  }

  return (
    <>
      <h2>Recent Posts</h2>

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          posts={posts}
          setPosts={setPosts}
        />
      ))}
    </>
  );
}