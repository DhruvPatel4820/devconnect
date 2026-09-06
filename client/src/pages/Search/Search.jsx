import { useEffect, useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import UserSkeleton from "../../components/Common/UserSkeleton/UserSkeleton";

import { searchUsers } from "../../services/user.service";
import styles from "./Search.module.css";

export default function Search() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setUsers([]);
      setError("");
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await searchUsers(trimmedKeyword);

        setUsers(response.data || []);
      } catch (error) {
        console.error("Search users error:", error);

        setUsers([]);

        setError(
          error?.response?.data?.message ||
            "Unable to search users. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>Search</h1>
          <p>Find developers and connect with them.</p>
        </div>

        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />

          <input
            type="text"
            placeholder="Search by name or username..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoFocus
          />
        </div>

        {!keyword.trim() && (
          <div className={styles.emptyState}>
            <FiSearch />
            <h3>Search for developers</h3>
            <p>Enter a name or username above to find people on DevConnect.</p>
          </div>
        )}

        {loading && (
          <div className={styles.results}>
            {Array.from({ length: 5 }).map((_, index) => (
              <UserSkeleton key={index} />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && keyword.trim() && users.length === 0 && (
          <div className={styles.emptyState}>
            <FiUser />
            <h3>No users found</h3>
            <p>We couldn't find anyone matching "{keyword.trim()}".</p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className={styles.resultsSection}>
            <div className={styles.resultsHeader}>
              <h2>People</h2>
              <span>
                {users.length} {users.length === 1 ? "user" : "users"}
              </span>
            </div>

            <div className={styles.results}>
              {users.map((user) => (
                <button
                  key={user._id}
                  className={styles.userCard}
                  onClick={() => handleUserClick(user.username)}
                >
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.fullName || user.username,
                      )}&background=random`
                    }
                    alt={user.fullName || user.username}
                  />

                  <div className={styles.userInfo}>
                    <h3>{user.fullName}</h3>
                    <p>@{user.username}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
