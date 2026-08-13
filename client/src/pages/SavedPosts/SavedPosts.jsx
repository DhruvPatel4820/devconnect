import { useEffect, useState } from "react";

import PostCard from "../../components/Home/PostCard/PostCard";
import { getSavedPosts } from "../../services/post.service";

export default function SavedPosts() {
  const [posts, setPosts] = useState([]);

  const fetchSavedPosts = async () => {
    try {
      const response = await getSavedPosts();

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  return (
    <div>
      <h2>Saved Posts 🔖</h2>

      {posts.length === 0 ? (
        <p>No saved posts yet</p>
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
    </div>
  );
}
