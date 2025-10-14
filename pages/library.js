// pages/library.js
import { useEffect, useState } from "react";
import { getUserLibrary, getUserFinished } from "@/firebase";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/ForYou.module.css";
import Link from "next/link";
import { CiClock2, CiStar } from "react-icons/ci";
import { formatTime } from "@/components/formatTime";

export default function Library() {
  const [durations, setDurations] = useState({});
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [library, setLibrary] = useState([]);
  const [finished, setFinished] = useState([]);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        // Fetch saved library and finished books
        getUserLibrary(user.uid).then((books) => setLibrary(books));
        getUserFinished(user.uid).then((books) => setFinished(books));
      }
    });
    return () => unsubscribe();
  }, []);

  // Refresh library or finished if updated
  useEffect(() => {
    if (!firebaseUser) return;

    if (localStorage.getItem("libraryUpdated")) {
      localStorage.removeItem("libraryUpdated");
      getUserLibrary(firebaseUser.uid).then((books) => setLibrary(books));
    }
    if (localStorage.getItem("finishedUpdated")) {
      localStorage.removeItem("finishedUpdated");
      getUserFinished(firebaseUser.uid).then((books) => setFinished(books));
    }
  }, [firebaseUser]);

  if (!firebaseUser) return <p>Please log in to view your library.</p>;

  const renderBookList = (books) =>
    books.length === 0 ? (
      <p>No books here yet.</p>
    ) : (
      books.map((book) => (
        <Link
          key={book.bookId}
          className={styles.for_you_recommended_books_link}
          href={`/books/${book.bookId}`}
        >
          {book.subscriptionRequired && (
            <div className={styles.book__pill}>Premium</div>
          )}
          <audio
            controls
            src={book.audioLink || "/placeholder-audio.mp3"}
            style={{ display: "none" }}
            onLoadedMetadata={(e) =>
              setDurations((prev) => ({
                ...prev,
                [book.bookId]: e.target.duration || 0,
              }))
            }
          />
          <figure className={styles.book__image__wrapper}>
            <img className={styles.book__image} src={book.imageLink} alt={book.title} />
          </figure>
          <div className={styles.recommended__book__title}>{book.title}</div>
          <div className={styles.recommended__book__author}>{book.author}</div>
          <div className={styles.recommended__book__subtitle}>{book.subTitle}</div>
          <div className={styles.recommended__book__details_wrapper}>
            <div className={styles.recommended__book__details}>
              <div className={styles.recommended__book__details_icon}>
                <CiClock2 />
              </div>
              <div className={styles.recommended__book__details_text}>
                {formatTime(durations[book.bookId] || 0)}
              </div>
            </div>
            <div className={styles.recommended__book__details}>
              <div className={styles.recommended__book__details_icon}>
                <CiStar />
              </div>
              <div className={styles.recommended__book__details_text}>
                {book.averageRating}
              </div>
            </div>
          </div>
        </Link>
      ))
    );

  return (
    <div className={styles.for__you__wrapper}>
      <SearchBar />
      <Sidebar />
      <div className={styles.for__you__row}>
        <div className={styles.for__you__container}>
          {/* Saved Books Section */}
          <div className={styles.for_you_title}>
            Saved Books
          </div>
          <div className={styles.for_you_subtitle}>{library.length} Items</div>
          <div className={styles.for_you_recommended_books}>
            {renderBookList(library)}
          </div>

          {/* Finished Books Section */}
          <div className={styles.for_you_title}>
            Finished
          </div>
          <div className={styles.for_you_subtitle}>{finished.length} Items</div>
          <div className={styles.for_you_recommended_books}>
            {renderBookList(finished)}
          </div>
        </div>
      </div>
    </div>
  );
}
