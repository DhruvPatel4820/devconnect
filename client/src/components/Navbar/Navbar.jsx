import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiBookmark, FiBell,FiX } from "react-icons/fi";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../services/notification.service";
import CreatePost from "../Home/CreatePost/CreatePost";
import {
  FiHome,
  FiSearch,
  FiPlusSquare,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";
import { searchUsers } from "../../services/user.service";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);

  // Search State
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const [notifications, setNotifications] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.isRead) {
        await markNotificationAsRead(notification._id);

        setNotifications((prev) =>
          prev.map((item) =>
            item._id === notification._id ? { ...item, isRead: true } : item,
          ),
        );
      }

      setNotificationOpen(false);

      if (notification.type === "FOLLOW") {
        navigate(`/profile/${notification.sender.username}`);
        return;
      }

      if (notification.type === "LIKE" || notification.type === "COMMENT") {
        if (notification.post?._id) {
          navigate(`/post/${notification.post._id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!keyword.trim()) {
        setResults([]);
        return;
      }

      try {
        const response = await searchUsers(keyword);

        setResults(response.data);

        // Temporary
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();

        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logoutUser();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          DevConnect
        </Link>

        {/* Search */}
        <div className={styles.searchBar}>
          <FiSearch />

          <input
            type="text"
            placeholder="Search users..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {results.length > 0 && (
            <div className={styles.searchResults}>
              {results.map((item) => (
                <NavLink
                  key={item._id}
                  to={`/profile/${item.username}`}
                  className={styles.searchItem}
                  onClick={() => {
                    setKeyword("");
                    setResults([]);
                  }}
                >
                  <img
                    src={
                      item.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        item.fullName,
                      )}`
                    }
                    alt={item.fullName}
                  />

                  <div>
                    <h4>{item.fullName}</h4>
                    <p>@{item.username}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className={styles.navLinks}>
          <NavLink to="/home" end>
            <FiHome />
            <span>Home</span>
          </NavLink>

          <NavLink to="/search">
            <FiSearch />
            <span>Search</span>
          </NavLink>
          <Link to="/saved">
            <FiBookmark />
            Saved
          </Link>

          <div className={styles.notificationBox}>
            <button
              className={styles.notificationBtn}
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <FiBell />

              {unreadCount > 0 && (
                <span className={styles.notificationCount}>{unreadCount}</span>
              )}
            </button>

            {notificationOpen && (
              <div className={styles.notificationDropdown}>
                <h3>Notifications</h3>

                {notifications.length === 0 ? (
                  <p className={styles.emptyNotification}>No notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <button
                      key={notification._id}
                      className={`${styles.notificationItem} ${
                        !notification.isRead ? styles.unread : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <img
                        src={
                          notification.sender?.avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            notification.sender?.fullName || "User",
                          )}`
                        }
                        alt=""
                      />
                      <div>
                        <p>
                          <strong>{notification.sender?.fullName}</strong>{" "}
                          {notification.message}
                        </p>

                        <small>
                          {new Date(notification.createdAt).toLocaleString()}
                        </small>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <button
            className={styles.createBtn}
            onClick={() => setCreateOpen(true)}
          >
            <FiPlusSquare />
            <span>Create</span>
          </button>

          {/* Avatar */}
          {user && (
            <div className={styles.avatarBox}>
              <button
                className={styles.avatarBtn}
                onClick={() => setOpen(!open)}
              >
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.fullName,
                    )}`
                  }
                  alt={user.fullName}
                />

                <FiChevronDown />
              </button>

              {open && (
                <div className={styles.dropdown}>
                  <div className={styles.userInfo}>
                    <img
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.fullName,
                        )}`
                      }
                      alt={user.fullName}
                    />

                    <div>
                      <h4>{user.fullName}</h4>
                      <p>{user.email}</p>
                    </div>
                  </div>

                  <hr />

                  <NavLink to={`/profile/${user.username}`}>
                    <FiUser />
                    My Profile
                  </NavLink>

                  <NavLink to="/settings">
                    <FiSettings />
                    Settings
                  </NavLink>

                  <button onClick={handleLogout}>
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {createOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.createModal}>
              <button
                className={styles.closeModal}
                onClick={() => setCreateOpen(false)}
              >
                <FiX />
              </button>

              <CreatePost
                onPostCreated={() => {
                  setCreateOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
