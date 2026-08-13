import styles from "./ProfileHeader.module.css";
import { useRef } from "react";
import { updateAvatar } from "../../../services/user.service";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

import { toggleFollow } from "../../../services/follow.service";

import EditProfile from "../EditProfile/EditProfile";

function ProfileHeader({ profile, setProfile, postsCount, refreshProfile }) {
  // const { user } = useAuth();
  const { user, setUser } = useAuth();

  const fileRef = useRef();

  const [openEdit, setOpenEdit] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = user._id === profile._id;

  const handleFollow = async () => {
    try {
      const response = await toggleFollow(profile._id);

      console.log("Follow Response:", response);

      setIsFollowing(response.data.following);

      await refreshProfile();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAvatarChange = async (e) => {
    try {
      const file = e.target.files[0];

      console.log("Selected file:", file);

      if (!file) return;

      const formData = new FormData();

      formData.append("avatar", file);

      console.log("FormData:", formData.get("avatar"));

      const response = await updateAvatar(formData);

      console.log("Response:", response);

      const updatedUser = response.data;

      setProfile(updatedUser);

      setUser({
        ...user,
        avatar: updatedUser.avatar,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsFollowing(profile?.isFollowing?? false);
  }, [profile]);

  return (
    <section className={styles.profile}>
      <div>
        <img
          src={
            profile.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile.fullName,
            )}`
          }
          alt={profile.fullName}
        />

        {isOwnProfile && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleAvatarChange}
              style={{
                display: "none",
              }}
            />

            <button
              onClick={() => {
                fileRef.current.click();
              }}
            >
              Change Avatar
            </button>
          </>
        )}
      </div>

      <h2>{profile.fullName}</h2>

      <p>@{profile.username}</p>

      <p className={styles.bio}>{profile.bio || "No bio added yet."}</p>

      <div className={styles.stats}>
        <div>
          <strong>{postsCount}</strong>

          <span>Posts</span>
        </div>

        <div>
          <strong>{profile.followersCount}</strong>

          <span>Followers</span>
        </div>

        <div>
          <strong>{profile.followingCount}</strong>

          <span>Following</span>
        </div>
      </div>

      {isOwnProfile ? (
        <button onClick={() => setOpenEdit(true)}>Edit Profile</button>
      ) : (
        <button onClick={handleFollow}>
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}

      {openEdit && (
        <EditProfile
          profile={profile}
          setProfile={setProfile}
          closeModal={() => setOpenEdit(false)}
        />
      )}
    </section>
  );
}

export default ProfileHeader;
