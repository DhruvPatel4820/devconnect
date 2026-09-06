import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileSkeleton from "../../../components/Common/ProfileSkeleton/ProfileSkeleton";

import ProfileHeader from "../ProfileHeader/ProfileHeader";
import UserPosts from "../UserPosts/UserPosts";

import { getUserProfile } from "../../../services/user.service";
import { getPostsByUser } from "../../../services/post.service";

import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, [username]);

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile(username);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await getPostsByUser(username);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return <ProfileSkeleton />;
  }

  return (
    <main className={styles.page}>
      <div className={styles.profileContainer}>
        <ProfileHeader
          profile={profile}
          setProfile={setProfile}
          refreshProfile={fetchProfile}
          postsCount={posts.length}
        />

        <UserPosts posts={posts} setPosts={setPosts} />
      </div>
    </main>
  );
}

export default ProfilePage;
