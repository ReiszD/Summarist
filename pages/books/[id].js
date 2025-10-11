// pages/books/[id].js
import styles from "@/styles/Books.module.css";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBookById } from "@/redux/booksSlice";
import { openLogin, closeLogin } from "@/redux/loginSlice";
import Login from "../Home/Login";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { TbBadge } from "react-icons/tb";
import { CiStar, CiClock2 } from "react-icons/ci";
import { MdMicNone } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa6";
import { LuBookOpenText } from "react-icons/lu";

export default function BookPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const { isLoginOpen } = useSelector((state) => state.login);
  const { recommended, selected, suggested, currentBook, loading } =
    useSelector((state) => state.books);

  const allBooks = [...recommended, ...selected, ...(suggested || [])];
  const [book, setBook] = useState(null);

  // ✅ Track Firebase auth state directly
  const [firebaseUser, setFirebaseUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

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

  const tagsArray = Array.isArray(book.tags)
    ? book.tags
    : typeof book.tags === "string"
    ? book.tags.split(",").map((tag) => tag.trim())
    : [];

  // ✅ Handles Read and Listen buttons
  const handleClick = (type = "listen") => {
    if (!firebaseUser) {
      sessionStorage.setItem("loginRedirect", type === "listen" ? `/player/${id}` : `/reader/${id}`);
      dispatch(openLogin());
      return;
    }

    // Navigate directly if logged in
    router.push(type === "listen" ? `/player/${id}` : `/reader/${id}`);
  };

  return (
    <div className={styles.books__wrapper}>
      {isLoginOpen && <Login onClose={() => dispatch(closeLogin())} />}
      <SearchBar />
      <Sidebar />

      <div className={styles.books__row}>
        <div className={styles.books__container}>
          <div className={styles.inner__wrapper}>
            <div className={styles.inner__book}>
              {/* Book Title & Author */}
              <div className={styles.inner__book__title}>
                {book.title}
                {book.subscriptionRequired && <span className={styles.premium__badge}> (Premium)</span>}
              </div>
              <div className={styles.inner__book__author}>{book.author}</div>
              <div className={styles.inner__book__subtitle}>{book.subTitle}</div>

              {/* Book Info */}
              <div className={styles.inner__book__wrapper}>
              <div className={styles.inner__book__description_wrapper}>
                <div className={styles.inner__book__description}>
                  <CiStar /> {book.averageRating} ({book.totalRating} Ratings)
                </div>
                <div className={styles.inner__book__description}>
                  <CiClock2 /> 03:24
                </div>
                <div className={styles.inner__book__description}>
                  <MdMicNone /> Audio & Text
                </div>
                <div className={styles.inner__book__description}>
                  <FaRegLightbulb /> {book.keyIdeas} Key Ideas
                </div>
              </div>
              </div>

              {/* Read & Listen Buttons */}
              <div className={styles.inner__book__read__btn_wrapper}>
                <button
                  type="button"
                  className={styles.inner__book__read__btn}
                  onClick={() => handleClick("read")}
                >
                  <LuBookOpenText />
                  Read
                </button>
                <button
                  type="button"
                  className={styles.inner__book__read__btn}
                  onClick={() => handleClick("listen")}
                >
                  <MdMicNone />
                  Listen
                </button>
              </div>

              {/* Bookmark */}
              <div className={styles.inner__book__bookmark}>
                <TbBadge /> Add Title To My Library
              </div>

              {/* Tags */}
              <div className={styles.inner__book__tags__wrapper}>
                {tagsArray.map((tag, index) => (
                  <div key={index} className={styles.inner__book__tag}>
                    {tag}
                  </div>
                ))}
              </div>

              {/* Book Description */}
              <div className={styles.inner__book__book_description}>
                {book.bookDescription}
              </div>
              <h2 className={styles.inner__book__secondary__title}>About The Author</h2>
              <div className={styles.inner__book__author__description}>
                {book.authorDescription}
              </div>
            </div>

            {/* Book Image */}
            <div className={styles.inner__book__img_wrapper}>
              <figure className={styles.book__image__wrapper}>
                <img src={book.imageLink} alt="book pic" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
