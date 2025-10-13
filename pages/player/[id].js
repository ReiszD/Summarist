import styles from "@/styles/Player.module.css";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBookById } from "@/redux/booksSlice";
import { GiPlayButton } from "react-icons/gi";
import { MdOutlineForward10 } from "react-icons/md";
import { MdOutlineReplay10 } from "react-icons/md";

export default function Audio() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { recommended, selected, suggested, currentBook, loading } =
    useSelector((state) => state.books);
  const allBooks = [...recommended, ...selected, ...(suggested || [])];
  const [book, setBook] = useState(null);

  // Fetch book if not found locally
  useEffect(() => {
    if (!id) return;
    const foundBook = allBooks.find((b) => b.id === id);
    if (foundBook) setBook(foundBook);
    else dispatch(fetchBookById(id));
  }, [id, allBooks, dispatch]);

  // Update if currentBook changes
  useEffect(() => {
    if (currentBook && currentBook.id === id) setBook(currentBook);
  }, [currentBook, id]);

  if (loading && !book) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className={styles.audio__wrapper}>
      <SearchBar />
      <Sidebar />
      <div className={styles.player__summary}>
        <div className={styles.audio__book__summary}>
          <div className={styles.audio__book__summary__title}>
            {book.title}
          </div>
          <div className={styles.audio__book__summary__text}>{book.bookDescription}</div>
        </div>
        <div className={styles.audio__player__wrapper}>
          <audio src={book.audioLink}></audio>
          <div className={styles.audio__track__wrapper}>
            <figure className={styles.audio__track__img__mask}>
              <figure className={styles.book__image__wrapper}>
                <img
                  src={book.imageLink}
                  alt="book image"
                  className={styles.book__image}
                />
              </figure>
            </figure>
            <div className={styles.audio__track__details__wrapper}>
              <div className={styles.audio__track__title}>{book.title}</div>
              <div className={styles.audio__track__author}>{book.author}</div>
            </div>
          </div>
          <div className={styles.audio__controls__wrapper}>
            <div className={styles.audio__controls}>
              <button className={styles.audio__controls__btn}>
                <MdOutlineReplay10 className={styles.controls__btn__img} />
              </button>
              <button
                className={`${styles.audio__controls__btn} ${styles.audio__controls__play}`}
              >
                <GiPlayButton className={styles.controls__btn__play__img} />
              </button>
              <button className={styles.audio__controls__btn}>
                <MdOutlineForward10 className={styles.controls__btn__img} />
              </button>
            </div>
          </div>
          <div className={styles.audio__progress__wrapper}>
            <div className={styles.audio__time}>00:00</div>
            <input className={styles.audio__progress__bar}></input>
            <div className={styles.audio__time}>04:52</div>
          </div>
        </div>
      </div>
    </div>
  );
}
