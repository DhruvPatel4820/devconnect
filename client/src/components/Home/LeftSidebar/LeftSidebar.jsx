import { NavLink } from "react-router-dom";

import {
  FiHome,
  FiCompass,
  FiBookmark,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import { useAuth } from "../../../hooks/useAuth";

import styles from "./LeftSidebar.module.css";

export default function LeftSidebar() {
  const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      {/* Profile Card */}

      <div className={styles.profileCard}>
        <img
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.fullName || "User",
            )}`
          }
          alt={user?.fullName}
        />

        <h3>{user?.fullName}</h3>

        <p>@{user?.username}</p>
      </div>

      {/* Navigation */}

      <nav className={styles.menu}>
        <NavLink to="/" end>
          <FiHome />
          <span>Home</span>
        </NavLink>

        <NavLink to="/search">
          <FiCompass />
          <span>Explore</span>
        </NavLink>

        <NavLink to="/saved">
          <FiBookmark />
          <span>Saved</span>
        </NavLink>

        <NavLink to={`/profile/${user.username}`}>
          <FiUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/settings">
          <FiSettings />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}
