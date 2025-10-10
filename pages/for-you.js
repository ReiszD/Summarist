import styles from "@/styles/ForYou.module.css";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import Selected from "./ForYou/Selected";
import Recommended from "./ForYou/Recommended";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "@/redux/booksSlice";

export default function ForYou() {
  const dispatch = useDispatch();
  const {selected, recommended, loading, error} = useSelector(
    (state) => state.books
  );
  useEffect(() => {
    dispatch(fetchBooks("selected"));
    dispatch(fetchBooks("recommended"));
  }, [dispatch]);

  return (
    <div className={styles.for__you__wrapper}>
      <SearchBar />
      <Sidebar />
      <div className={styles.for__you__row}>
        <div className={styles.for__you__container}>
          <div className={styles.for_you_wrapper}>
            <Selected selected={selected} />
            <Recommended />
          </div>
        </div>
      </div>
    </div>
  );
}
