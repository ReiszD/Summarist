// pages/books/[id].js
import styles from "@/styles/Books.module.css";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { formatTime } from "@/components/formatTime";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { fetchBookById } from "@/redux/booksSlice";
import { openLogin, closeLogin } from "@/redux/loginSlice";
import Login from "../Home/Login";
import {
  auth,
  addBookToLibrary,
  removeBookFromLibrary,
  getUserLibrary,
} from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

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
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState("free");

  // ----------------------- Audio Duration -----------------------
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () =>
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [book]);

  // ----------------------- Auth Listener -----------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (user && book?.id) {
        // Check if book is in library immediately after login
        const savedBooks = await getUserLibrary(user.uid);
        const exists = savedBooks.some((b) => b.bookId === book.id);
        setIsInLibrary(exists);
      }
    });
    return () => unsubscribe();
  }, [book?.id]);

  // ----------------------- Subscription Listener -----------------------
  useEffect(() => {
    if (!firebaseUser?.uid) return;

    const q = query(
      collection(db, "customers", firebaseUser.uid, "subscriptions"),
      where("status", "in", ["trialing", "active"])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const subData = snapshot.docs[0].data();
        const planName =
          subData?.items?.[0]?.plan?.product?.name ||
          subData?.items?.[0]?.price?.product?.name ||
          "free";

        if (planName.toLowerCase().includes("plus"))
          setSubscriptionPlan("premium_plus");
        else if (planName.toLowerCase().includes("premium"))
          setSubscriptionPlan("premium");
        else setSubscriptionPlan("free");
      } else {
        setSubscriptionPlan("free");
      }
    });

    return () => unsubscribe();
  }, [firebaseUser?.uid]);

  // ----------------------- Add/Remove Library -----------------------
  const handleLibraryToggle = async () => {
    if (!firebaseUser) {
      dispatch(openLogin());
      return;
    }

    if (isInLibrary) {
      const confirmRemove = confirm("Remove this book from your library?");
      if (!confirmRemove) return;

      await removeBookFromLibrary(firebaseUser.uid, book.id);
      setIsInLibrary(false);
      return;
    }

    await addBookToLibrary(firebaseUser.uid, book);
    setIsInLibrary(true);
  };

  // ----------------------- Fetch Book -----------------------
  useEffect(() => {
    if (!id) return;
    const foundBook = allBooks.find((b) => b.id === id);
    if (foundBook) setBook(foundBook);
    else dispatch(fetchBookById(id));
  }, [id, allBooks, dispatch]);

  useEffect(() => {
    if (currentBook && currentBook.id === id) setBook(currentBook);
  }, [currentBook, id]);

  const tagsArray = book
    ? Array.isArray(book.tags)
      ? book.tags
      : typeof book.tags === "string"
      ? book.tags.split(",").map((tag) => tag.trim())
      : []
    : [];

  // ----------------------- Read/Listen -----------------------
  const handleClick = (type = "listen") => {
    if (!firebaseUser) {
      sessionStorage.setItem("loginRedirect", `/player/${id}`);
      dispatch(openLogin());
      return;
    }

    if (book.subscriptionRequired) {
      const planRank = { free: 0, premium: 1, premium_plus: 2 };
      const currentPlan = subscriptionPlan; // reactive value
      const requiredPlan = (
        typeof book.subscriptionRequired === "string"
          ? book.subscriptionRequired
          : "premium"
      ).toLowerCase();

      if (planRank[currentPlan] < planRank[requiredPlan]) {
        const goToUpgrade = confirm(
          `This book requires a ${requiredPlan} plan. Would you like to upgrade?`
        );
        if (goToUpgrade) router.push("/choose-plan");
        return;
      }
    }

    router.push(`/player/${id}`);
  };

  const isLoading = !book;

  return (
    <div className={styles.books__wrapper}>
      {isLoginOpen && <Login onClose={() => dispatch(closeLogin())} />}
      <SearchBar />
      <Sidebar />

      <div className={styles.books__row}>
        {isLoading ? (
          // Skeleton for image, title, author, and a block of text
          <div className={styles.books__container}>
            <div className={styles.inner__wrapper}>
              <div className={styles.inner__book}>
                <div className={styles.book__skeleton__title}></div>
                <div className={styles.book__skeleton__author}></div>
                <div className={styles.book__skeleton__subtitle}></div>

                {/* Description skeleton - mimic multiple paragraphs */}
                <div className={styles.book__skeleton__description_block}>
                  <div
                    className={styles.book__skeleton__description__title}
                  ></div>
                  <div className={styles.book__skeleton__description}></div>
                  <div
                    className={styles.book__skeleton__description__title}
                  ></div>
                  <div className={styles.book__skeleton__description}></div>
                </div>
              </div>
              <div className={styles.inner__book__img_wrapper}>
                <div className={styles.book__skeleton__image}></div>
              </div>
            </div>
          </div>
        ) : (
          book && (
            <>
              <div className={styles.books__container}>
                <div className={styles.inner__wrapper}>
                  <div className={styles.inner__book}>
                    <div className={styles.inner__book__title}>
                      {book.title}{" "}
                      {book.subscriptionRequired && (
                        <span className={styles.premium__badge}>
                          {" "}
                          (Premium)
                        </span>
                      )}
                    </div>
                    <div className={styles.inner__book__author}>
                      {book.author}
                    </div>
                    <div className={styles.inner__book__subtitle}>
                      {book.subTitle}
                    </div>

                    <div className={styles.inner__book__wrapper}>
                      <div className={styles.inner__book__description_wrapper}>
                        <div className={styles.inner__book__description}>
                          <CiStar /> {book.averageRating} ({book.totalRating}{" "}
                          Ratings)
                        </div>
                        <div className={styles.inner__book__description}>
                          <audio
                            ref={audioRef}
                            src={book.audioLink}
                            preload="metadata"
                            style={{ display: "none" }}
                          />
                          <CiClock2 /> {formatTime(duration)}
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
                        className={styles.inner__book__read__btn}
                        onClick={() => handleClick("read")}
                      >
                        <LuBookOpenText /> Read
                      </button>
                      <button
                        className={styles.inner__book__read__btn}
                        onClick={() => handleClick("listen")}
                      >
                        <MdMicNone /> Listen
                      </button>
                    </div>

                    {/* Add to Library */}
                    <div
                      className={`${styles.inner__book__bookmark} ${
                        isInLibrary ? styles.added__bookmark : ""
                      }`}
                      onClick={handleLibraryToggle}
                    >
                      {isInLibrary ? (
                        <>
                          <TbBadge className={styles.added__bookmark__icon} />{" "}
                          Added to Library
                        </>
                      ) : (
                        <>
                          <TbBadge /> Add Title To My Library
                        </>
                      )}
                    </div>

                    {/* Tags */}
                    <div className={styles.inner__book__tags__wrapper}>
                      {tagsArray.map((tag, i) => (
                        <div key={i} className={styles.inner__book__tag}>
                          {tag}
                        </div>
                      ))}
                    </div>

                    {/* Book Description */}
                    <div className={styles.inner__book__book_description}>
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
                      <img src={book.imageLink} alt="book pic" />
                    </figure>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
