import { useState } from "react";
import { FiCamera, FiLock, FiUser } from "react-icons/fi";

import {
  updateProfile,
  updateAvatar,
  changePassword,
} from "../../services/user.service";

import { useAuth } from "../../hooks/useAuth";

import styles from "./Settings.module.css";

export default function Settings() {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    bio: user?.bio || "",
  });

  const [avatar, setAvatar] = useState(null);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await updateProfile(profile);

      setUser(response.data);
      
      if (avatar) {
        const formData = new FormData();

        formData.append("avatar", avatar);

        await updateAvatar(formData);
      }

      setMessage("Profile updated successfully");

      setAvatar(null);
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await changePassword(password);

      setPassword({
        oldPassword: "",
        newPassword: "",
      });

      setMessage("Password changed successfully");
    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Settings</h1>

      {message && <div className={styles.message}>{message}</div>}

      {/* Profile Settings */}

      <section className={styles.card}>
        <div className={styles.title}>
          <FiUser />
          <h2>Profile</h2>
        </div>

        <form onSubmit={handleProfileSubmit}>
          <div className={styles.avatarSection}>
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : user?.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.fullName || "User",
                    )}`
              }
              alt={user?.fullName}
            />

            <label className={styles.avatarButton}>
              <FiCamera />
              Change Avatar
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />
            </label>
          </div>

          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
            />
          </label>

          <label>
            Username
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
            />
          </label>

          <label>
            Bio
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              maxLength={300}
              rows={4}
            />
          </label>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>

      {/* Password */}

      <section className={styles.card}>
        <div className={styles.title}>
          <FiLock />
          <h2>Change Password</h2>
        </div>

        <form onSubmit={handlePasswordSubmit}>
          <label>
            Current Password
            <input
              type="password"
              value={password.oldPassword}
              onChange={(e) =>
                setPassword({
                  ...password,
                  oldPassword: e.target.value,
                })
              }
              required
            />
          </label>

          <label>
            New Password
            <input
              type="password"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({
                  ...password,
                  newPassword: e.target.value,
                })
              }
              minLength={8}
              required
            />
          </label>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </section>
    </div>
  );
}
