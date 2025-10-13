import styles from "@/styles/ForYou.module.css";
import Link from "next/link";
import { CiClock2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { formatTime } from "@/components/formatTime";
import { useEffect, useRef, useState } from "react";

export default function Suggested({ suggested }) {
  const [durations, setDurations] = useState({});
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [suggested]);
  return (
    <div>
      <div className={styles.for_you_title}>Suggested Books</div>
      <div className={styles.for_you_subtitle}>Browse Those Books</div>
      {Array.isArray(suggested) && suggested.length > 0 ? (
        <div className={styles.for_you_recommended_books}>
          {suggested.map((suggest) => (
            <Link
              className={styles.for_you_recommended_books_link}
              href={`/books/${suggest.id}`}
            >
              {suggest.subscriptionRequired && (
                <div className={styles.book__pill}>Premium</div>
              )}
                 <audio
                controls
                src={suggest.audioLink || "/placeholder-audio.mp3"}
                style={{ display: "none" }}
                onLoadedMetadata={(e) =>
                  setDurations((prev) => ({
                    ...prev,
                    [suggest.id]: e.target.duration || 0,
                  }))
                }
              ></audio>
              <figure className={styles.book__image__wrapper}>
                <img
                  className={styles.book__image}
                  src={suggest.imageLink}
                  alt="img"
                />
              </figure>
              <div className={styles.recommended__book__title}>
                {suggest.title}
              </div>
              <div className={styles.recommended__book__author}>
                {suggest.author}
              </div>
              <div className={styles.recommended__book__subtitle}>
                {suggest.subTitle}
              </div>
              <div className={styles.recommended__book__details_wrapper}>
                <div className={styles.recommended__book__details}>
                  <div className={styles.recommended__book__details_icon}>
                    <CiClock2 />
                  </div>
                  <div className={styles.recommended__book__details_text}>
                    {formatTime(durations[suggest.id])}
                  </div>
                </div>
                <div className={styles.recommended__book__details}>
                  <div className={styles.recommended__book__details_icon}>
                    <CiStar />
                  </div>
                  <div className={styles.recommended__book__details_text}>
                    {suggest.averageRating}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}
