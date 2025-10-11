import styles from "@/styles/Books.module.css";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBookById } from "@/redux/booksSlice";
import { openLogin } from "@/redux/loginSlice";
import Login from "../Home/Login";

export default function BookPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const { currentUser, isLoginOpen } = useSelector((state) => state.login);
  const { recommended, selected, suggested, currentBook, loading } =
    useSelector((state) => state.books);

  const allBooks = [...recommended, ...selected, ...(suggested || [])];
  const [book, setBook] = useState(null);

  // fetch or find the book
  useEffect(() => {
    if (!id) return;
    const foundBook = allBooks.find((b) => b.id === id);
    if (foundBook) setBook(foundBook);
    else dispatch(fetchBookById(id));
  }, [id, allBooks, dispatch]);

  useEffect(() => {
    if (currentBook && currentBook.id === id) setBook(currentBook);
  }, [currentBook, id]);

  if (loading && !book) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

const handleRead = () => {
  if (!currentUser) {
    dispatch(openLogin(`/player/${id}`));
  } else {
    router.push(`/player/${id}`);
  }
};

const handleListen = () => {
  if (!currentUser) {
    dispatch(openLogin(`/player/${id}?mode=audio`));
  } else {
    router.push(`/player/${id}?mode=audio`);
  }
};

const tagsArray = Array.isArray(book.tags)
  ? book.tags 
  : typeof book.tags === "string"
    ? book.tags.split(",").map(tag => tag.trim())
    : [];

  return (
    <div className={styles.books__wrapper}>
      {isLoginOpen && <Login onClose={() => dispatch(closeLogin())} />}
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
              <div className={styles.inner__book__author}>{book.author}</div>
              <div className={styles.inner__book__subtitle}>
                {book.subTitle}
              </div>
              <div className={styles.inner__book__wrapper}>
                <div className={styles.inner__book__description_wrapper}>
                  <div className={styles.inner__book__description}>
                    <div className={styles.inner__book__icon}>
                      <img src="star icon" alt="star" />
                    </div>
                    <div className="inner__book__overall__rating">
                      {book.averageRating}
                    </div>
                    <div className="inner__book__total__rating">
                      {book.totalRating} Ratings
                    </div>
                  </div>
                  <div className={styles.inner__book__description}>
                    <div className={styles.inner__book__icon}>
                      <img src="clock icon" alt="clock" />
                    </div>
                    <div className="inner__book__duration">03:24</div>
                  </div>
                  <div className={styles.inner__book__description}>
                    <div className={styles.inner__book__icon}>
                      <img src="audio icon" alt="audio" />
                    </div>
                    <div className="inner__book__type">Audio & Text</div>
                  </div>
                  <div className={styles.inner__book__description}>
                    <div className={styles.inner__book__icon}>
                      <img src="light icon" alt="light" />
                    </div>
                    <div className="inner__book__key_ideas">
                      {book.keyIdeas} Key Ideas
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.inner__book__read__btn_wrapper}>
                <button
                  className={styles.inner__book__read__btn}
                  onClick={handleRead}
                >
                  <div className={styles.inner__book__read_icon}>
                    <img src="book icon" alt="book" />
                  </div>
                  <div className="inner__book__read_text">Read</div>
                </button>
                <button
                  className={styles.inner__book__read__btn}
                  onClick={handleListen}
                >
                  <div className={styles.inner__book__read_icon}>
                    <img src="mic icon" alt="mic" />
                  </div>
                  <div className="inner__book__read_text">Listen</div>
                </button>
              </div>
              <div className={styles.inner__book__bookmark}>
                <div className={styles.inner__book__bookmark__icon}>
                  <img
                    src="save icon"
                    alt="save"
                    className={styles.icon__img}
                  />
                </div>
                <div className={styles.inner__book__bookmark__text}>
                  Add Title To My Library
                </div>
              </div>
              <div className={styles.inner__book__secondary__title}>
                What's it About
              </div>
              <div className={styles.inner__book__tags__wrapper}>
                {tagsArray.map((tag, index) => (
                  <div key={index} className={styles.inner__book__tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className={styles.inner__book__description}>
                {book.bookDescription}
              </div>
              <h2 className={styles.inner__book__secondary__title}>
                About The Author
              </h2>
              <div className={styles.inner__book__author__description}>
                {book.authorDescription}
              </div>
            </div>
            <div className={styles.inner__book__img_wrapper}>
              <figure className={styles.book__image__wrapper}>
                <img src="book image" alt="book pic" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
