import PostSkeleton from "../PostSkeleton/PostSkeleton";
import styles from "./ProfileSkeleton.module.css";

export default function ProfileSkeleton() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Profile Header Skeleton */}
        <section className={styles.profileCard}>
          <div className={styles.profileTop}>
            <div className={styles.avatar}></div>

            <div className={styles.profileInfo}>
              <div className={styles.name}></div>
              <div className={styles.username}></div>

              <div className={styles.bio}></div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}></div>
                  <div className={styles.statLabel}></div>
                </div>

                <div className={styles.stat}>
                  <div className={styles.statNumber}></div>
                  <div className={styles.statLabel}></div>
                </div>

                <div className={styles.stat}>
                  <div className={styles.statNumber}></div>
                  <div className={styles.statLabel}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Skeleton */}
        <section className={styles.postsSection}>
          <div className={styles.postsTitle}></div>

          <PostSkeleton />
          <PostSkeleton />
        </section>
      </div>
    </main>
  );
}