import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import Selected from "./ForYou/Selected";
import Recommended from "./ForYou/Recommended";
import Suggested from "./ForYou/Suggested";
import { fetchBooks } from "@/redux/booksSlice";
import styles from "@/styles/ForYou.module.css";

export default function ForYou() {
  const dispatch = useDispatch();
  const { selected, recommended, suggested } = useSelector(
    (state) => state.books
  );

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1000
  );

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch books on mount
  useEffect(() => {
    dispatch(fetchBooks("selected"));
    dispatch(fetchBooks("recommended"));
    dispatch(fetchBooks("suggested"));
  }, [dispatch]);

  // Collapse sidebar if window is less than 550px
  const sidebarCollapsed = windowWidth < 550;

  return (
    <div
      className={styles.for__you__wrapper}
      style={{
        marginLeft: sidebarCollapsed ? 0 : "200px",
        width: sidebarCollapsed ? "100%" : "calc(100% - 200px)",
      }}
    >
      <SearchBar />
      <Sidebar collapsed={sidebarCollapsed} />
      <div className={styles.for__you__row}>
        <div className={styles.for__you__container}>
          <div className={styles.for_you_wrapper}>
            <Selected selected={selected} />
            <Recommended recommended={recommended} />
            <Suggested suggested={suggested} />
          </div>
        </div>
      </div>
    </div>
  );
}
