import { useEffect, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import { getSuggestedUsers } from "../../../services/user.service";
import { toggleFollow } from "../../../services/follow.service";

import styles from "./RightSidebar.module.css";

export default function RightSidebar() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch suggested users
  const fetchSuggestions = async () => {
    try {
      setLoading(true);

      const response = await getSuggestedUsers();

      setUsers(response.data || []);
    } catch (error) {
      console.log("Suggestions error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  // Follow user
  const handleFollow = async (userId) => {
    try {
      const response = await toggleFollow(userId);

      console.log("Follow response:", response);

      // Follow ke baad suggestions refresh
      await fetchSuggestions();
    } catch (error) {
      console.log("Follow error:", error);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <h2>Suggested for you</h2>

        {/* Loading */}
        {loading ? (
          <p className={styles.message}>Loading...</p>
        ) : users.length === 0 ? (
          /* No users */
          <p className={styles.message}>
            No suggestions available
          </p>
        ) : (
          /* Users */
          <div className={styles.userList}>
            {users.map((suggestedUser) => (
              <Link
                key={suggestedUser._id}
                to={`/profile/${suggestedUser.username}`}
                className={styles.user}
              >
                {/* Avatar */}
                <img
                  src={
                    suggestedUser.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      suggestedUser.fullName || "User",
                    )}`
                  }
                  alt={suggestedUser.fullName}
                />

                {/* User Info */}
                <div className={styles.userInfo}>
                  <strong>{suggestedUser.fullName}</strong>

                  <span>
                    @{suggestedUser.username}
                  </span>
                </div>

                {/* Follow Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    // Link ko trigger hone se roko
                    e.preventDefault();

                    handleFollow(suggestedUser._id);
                  }}
                  className={styles.followButton}
                >
                  <FiUserPlus />
                  Follow
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}