import styles from "./PostSkeleton.module.css";

export default function PostSkeleton() {
  return (
    <div className={styles.skeleton}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.avatar}></div>

        <div className={styles.userInfo}>
          <div className={styles.name}></div>
          <div className={styles.username}></div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.line}></div>
        <div className={`${styles.line} ${styles.short}`}></div>
      </div>

      {/* Image */}
      <div className={styles.image}></div>

      {/* Actions */}
      <div className={styles.actions}>
        <div className={styles.action}></div>
        <div className={styles.action}></div>
        <div className={styles.action}></div>
      </div>
    </div>
  );
}
