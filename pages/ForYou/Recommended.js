import styles from "@/styles/ForYou.module.css";
import { CiClock2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import Link from "next/link";
import { formatTime } from "@/components/formatTime";
import { useEffect, useRef, useState } from "react";

export default function Recommended({ recommended }) {
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
  }, [recommended]);

  return (
    <div>
      <div className={styles.for_you_title}>Recommended For You</div>
      <div className={styles.for_you_subtitle}>We think you'll like these</div>

      {Array.isArray(recommended) && recommended.length > 0 ? (
        <div className={styles.for_you_recommended_books}>
          {recommended.map((recommend) => (
            <Link
              key={recommend.id}
              className={styles.for_you_recommended_books_link}
              href={`/books/${recommend.id}`}
            >
              {recommend.subscriptionRequired && (
                <div className={styles.book__pill}>Premium</div>
              )}
              <audio
                controls
                src={recommend.audioLink || "/placeholder-audio.mp3"}
                style={{ display: "none" }}
                onLoadedMetadata={(e) =>
                  setDurations((prev) => ({
                    ...prev,
                    [recommend.id]: e.target.duration || 0,
                  }))
                }
              ></audio>
              <figure className={styles.book__image__wrapper}>
                <img
                  className={styles.book__image}
                  src={recommend.imageLink}
                  alt={recommend.title}
                />
              </figure>
              <div className={styles.recommended__book__title}>
                {recommend.title}
              </div>
              <div className={styles.recommended__book__author}>
                {recommend.author}
              </div>
              <div className={styles.recommended__book__subtitle}>
                {recommend.subTitle}
              </div>
              <div className={styles.recommended__book__details_wrapper}>
                <div className={styles.recommended__book__details}>
                  <div className={styles.recommended__book__details_icon}>
                    <CiClock2 />
                  </div>
                  <div className={styles.recommended__book__details_text}>
                    {formatTime(durations[recommend.id] || 0)}
                  </div>
                </div>
                <div className={styles.recommended__book__details}>
                  <div className={styles.recommended__book__details_icon}>
                    <CiStar />
                  </div>
                  <div className={styles.recommended__book__details_text}>
                    {recommend.averageRating}
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
