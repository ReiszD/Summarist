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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        setLoading(true);
        const [lib, fin] = await Promise.all([
          getUserLibrary(user.uid),
          getUserFinished(user.uid),
        ]);
        setLibrary(lib);
        setFinished(fin);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!firebaseUser) return;

    const fetchUpdated = async () => {
      if (localStorage.getItem("libraryUpdated")) {
        localStorage.removeItem("libraryUpdated");
        const lib = await getUserLibrary(firebaseUser.uid);
        setLibrary(lib);
      }
      if (localStorage.getItem("finishedUpdated")) {
        localStorage.removeItem("finishedUpdated");
        const fin = await getUserFinished(firebaseUser.uid);
        setFinished(fin);
      }
    };
    fetchUpdated();
  }, [firebaseUser]);

  if (!firebaseUser) return <p>Please log in to view your library.</p>;

  const renderSkeleton = (count = 4) => {
    return Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className={styles.for_you_recommended_books_link}>
        <div className={styles.recommended__skeleton__card}>
          <div className={styles.recommended__skeleton__image}></div>
          <div className={styles.recommended__skeleton__pill}></div>
          <div className={styles.recommended__skeleton__text}></div>
          <div className={styles.recommended__skeleton__text__short}></div>
        </div>
      </div>
    ));
  };

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
          <div className={styles.for_you_title}>Saved Books</div>
          <div className={styles.for_you_subtitle}>{library.length} Items</div>
          <div className={styles.for_you_recommended_books}>
            {loading ? renderSkeleton(4) : renderBookList(library)}
          </div>

          {/* Finished Books Section */}
          <div className={styles.for_you_title}>Finished</div>
          <div className={styles.for_you_subtitle}>{finished.length} Items</div>
          <div className={styles.for_you_recommended_books}>
            {loading ? renderSkeleton(4) : renderBookList(finished)}
          </div>
        </div>
      </div>
    </div>
  );
}
