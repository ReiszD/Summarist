import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBookById } from "@/redux/booksSlice";
import styles from "@/styles/Books.module.css";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";

export default function BookPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const { recommended, selected, suggested, currentBook, loading } =
    useSelector((state) => state.books);

  const allBooks = [...recommended, ...selected, ...(suggested || [])];
  const [book, setBook] = useState(null);

  // Fetch or find the book by ID
  useEffect(() => {
    if (!id) return;

    const foundBook = allBooks.find((b) => b.id === id);
    if (foundBook) {
      setBook(foundBook);
    } else {
      dispatch(fetchBookById(id));
    }
  }, [id, allBooks, dispatch]);

  // Update when async book loads
  useEffect(() => {
    if (currentBook && currentBook.id === id) {
      setBook(currentBook);
    }
  }, [currentBook, id]);

  if (loading && !book) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className={styles.books__wrapper}>
      <SearchBar />
      <Sidebar />
      <div className={styles.books__row}>
        <audio src="install later"></audio>
        <div className={styles.books__container}>
          <div className={styles.inner__wrapper}>
            <div className={styles.inner__book}>
              <div className={styles.inner__book__title}>
                {book.title}
                {book.subscriptionRequired && (
                  <span className={styles.premium__badge}> (Premium)</span>
                )}
              </div>
              <div className="inner__book__author">Dale Carnegie</div>
              <div className="inner__book__subtitle">
                Time-tested advice for the digital age
              </div>
              <div className="inner__book__wrapper">
                <div className="inner__book__description_wrapper">
                  <div className="inner__book__description">
                    <div className="inner__book__icon">
                      <img src="star icon" alt="star" />
                    </div>
                    <div className="inner__book__overall__rating">4.4</div>
                    <div className="inner__book__total__rating">
                      608 ratings
                    </div>
                  </div>
                  <div className="inner__book__description">
                    <div className="inner__book__icon">
                      <img src="clock icon" alt="clock" />
                    </div>
                    <div className="inner__book__duration">03:24</div>
                  </div>
                  <div className="inner__book__description">
                    <div className="inner__book__icon">
                      <img src="audio icon" alt="audio" />
                    </div>
                    <div className="inner__book__type">Audio & Text</div>
                  </div>
                  <div className="inner__book__description">
                    <div className="inner__book__icon">
                      <img src="light icon" alt="light" />
                    </div>
                    <div className="inner__book__key_ideas">8 Key Ideas</div>
                  </div>
                </div>
              </div>
              <div className="inner__book__read__btn_wrapper">
                <button className="inner__book__read__btn">
                  <div className="inner__book__read_icon">
                    <img src="book icon" alt="book" />
                  </div>
                  <div className="inner__book__read_text">Read</div>
                </button>
                <button className="inner__book__read__btn">
                  <div className="inner__book__read_icon">
                    <img src="mic icon" alt="mic" />
                  </div>
                  <div className="inner__book__read_text">Listen</div>
                </button>
              </div>
              <div className="inner__book__bookmark">
                <div className="inner__book__bookmark__icon">
                  <img src="save icon" alt="save" />
                </div>
                <div className="inner__book__bookmark__text">
                  Add Title To My Library
                </div>
              </div>
              <div className="inner__book__secondary__title">
                What's it About
              </div>
              <div className="inner__book__tags__wrapper">
                <div className="inner__book__tag">Communication Skills</div>
                <div className="inner__book__tag">Technology & The Future</div>
              </div>
              <div className="inner__book__description">Description Text</div>
              <h2 className="inner__book__secondary__title">
                About The Author
              </h2>
              <div className="inner__book__author__description">Author Bio</div>
            </div>
            <div className="inner__book__img_wrapper">
              <figure className="book__image__wrapper">
                <img src="book image" alt="book pic" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
