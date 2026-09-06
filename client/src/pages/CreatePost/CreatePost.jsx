import { useNavigate } from "react-router-dom";

import CreatePost from "../../components/Home/CreatePost/CreatePost";

import styles from "./CreatePost.module.css";

export default function CreatePostPage() {
  const navigate = useNavigate();

  const handlePostCreated = () => {
    navigate("/home", {
      replace: true,
    });
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* =========================
            HEADER
        ========================= */}

        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            ← Back
          </button>

          <h1>Create Post</h1>

          <p>Share something with the DevConnect community.</p>
        </div>

        {/* =========================
            CREATE POST
        ========================= */}

        <CreatePost onPostCreated={handlePostCreated} />
      </div>
    </main>
  );
}
