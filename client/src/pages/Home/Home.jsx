import LeftSidebar from "../../components/Home/LeftSidebar/LeftSidebar";
import Feed from "../../components/Home/Feed/Feed";
import RightSidebar from "../../components/Home/RightSidebar/RightSidebar";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <LeftSidebar />

      <Feed />

      <RightSidebar />
    </main>
  );
}