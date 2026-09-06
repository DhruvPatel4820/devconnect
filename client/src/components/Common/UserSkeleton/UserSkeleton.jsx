import styles from "./UserSkeleton.module.css";

export default function UserSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}></div>

      <div className={styles.info}>
        <div className={styles.name}></div>
        <div className={styles.username}></div>
      </div>
    </div>
  );
}