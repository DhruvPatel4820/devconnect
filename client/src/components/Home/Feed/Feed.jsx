import { useEffect, useState } from "react";

import CreatePost from "../CreatePost/CreatePost";
import PostCard from "../PostCard/PostCard";

import { getAllPosts } from "../../../services/post.service";

import styles from "./Feed.module.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className={styles.feed}>
      <CreatePost onPostCreated={fetchPosts} />

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          posts={posts}
          setPosts={setPosts}
        />
      ))}
    </section>
  );
}
