import styles from "@/styles/Player.module.css";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { formatTime } from "@/components/formatTime";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchBookById } from "@/redux/booksSlice";
import { GiPlayButton } from "react-icons/gi";
import { GiPauseButton } from "react-icons/gi";
import { MdOutlineForward10, MdOutlineReplay10 } from "react-icons/md";

export default function Audio() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { recommended, selected, suggested, currentBook, loading } =
    useSelector((state) => state.books);

  const allBooks = [...recommended, ...selected, ...(suggested || [])];
  const [book, setBook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // Fetch book by ID
  useEffect(() => {
    if (!id) return;
    const foundBook = allBooks.find((b) => b.id === id);
    if (foundBook) setBook(foundBook);
    else dispatch(fetchBookById(id));
  }, [id, allBooks, dispatch]);

  // Update when currentBook is fetched
  useEffect(() => {
    if (currentBook && currentBook.id === id) setBook(currentBook);
  }, [currentBook, id]);

  // Handle audio metadata and time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [book]);

  // Play/pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Skip controls
  const skipForward = () => {
    if (audioRef.current)
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        duration
      );
  };

  const skipBackward = () => {
    if (audioRef.current)
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
  };

  // Progress bar
  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

//   const formatTime = (time) => {
//     const mins = Math.floor(time / 60);
//     const secs = Math.floor(time % 60);
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

  if (loading && !book) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className={styles.audio__wrapper}>
      <SearchBar />
      <Sidebar />
      <div className={styles.player__summary}>
        <div className={styles.audio__book__summary}>
          <div className={styles.audio__book__summary__title}>{book.title}</div>
          <div className={styles.audio__book__summary__text}>
            {book.summary}
          </div>
        </div>

        <div className={styles.audio__player__wrapper}>
          <audio ref={audioRef} src={book.audioLink}></audio>

          <div className={styles.audio__track__wrapper}>
            <figure className={styles.audio__track__img__mask}>
              <figure className={styles.player__book__image__wrapper}>
                <img
                  src={book.imageLink}
                  alt="book image"
                  className={styles.player__book__image}
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
              <button
                className={styles.audio__controls__btn}
                onClick={skipBackward}
              >
                <MdOutlineReplay10 className={styles.controls__btn__img} />
              </button>

              <button
                className={`${styles.audio__controls__btn} ${styles.audio__controls__play}`}
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <GiPauseButton className={styles.controls__btn__play__img} />
                ) : (
                  <GiPlayButton className={styles.controls__btn__play__img} />
                )}
              </button>

              <button
                className={styles.audio__controls__btn}
                onClick={skipForward}
              >
                <MdOutlineForward10 className={styles.controls__btn__img} />
              </button>
            </div>
          </div>

          <div className={styles.audio__progress__wrapper}>
            <div className={styles.audio__time}>{formatTime(currentTime)}</div>
            <input
              type="range"
              className={styles.audio__progress__bar}
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleProgressChange}
            />
            <div className={styles.audio__time}>{formatTime(duration)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
