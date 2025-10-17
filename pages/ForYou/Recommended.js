import styles from "@/styles/ForYou.module.css";
import { CiClock2, CiStar } from "react-icons/ci";
import Link from "next/link";
import { formatTime } from "@/components/formatTime";
import { useState } from "react";

export default function Recommended({ recommended }) {
  const [durations, setDurations] = useState({});
  const [loading, setLoading] = useState({});

  const handleLoadedMetadata = (id, duration) => {
    setDurations((prev) => ({ ...prev, [id]: duration || 0 }));
  };

  const handleLoad = (id) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
  };


  return (
    <div>
      <div className={styles.for_you_title}>Recommended For You</div>
      <div className={styles.for_you_subtitle}>We think you'll like these</div>
      <div className={styles.for_you_recommended_books}>
        {recommended.map((recommend) => {
          const isLoaded = loading[recommend.id];

          return (
            <Link
              key={recommend.id}
              className={styles.for_you_recommended_books_link}
              href={`/books/${recommend.id}`}
              style={{ position: "relative" }}
            >
              {!isLoaded && (
                <div className={styles.recommended__skeleton__card}>
                  <div className={styles.recommended__skeleton__image}></div>
                  <div className={styles.recommended__skeleton__pill}></div>
                  <div className={styles.recommended__skeleton__text}></div>
                  <div
                    className={styles.recommended__skeleton__text__short}
                  ></div>
                </div>
              )}

              {isLoaded && recommend.subscriptionRequired && (
                <div className={styles.book__pill}>Premium</div>
              )}

              <audio
                hidden
                src={recommend.audioLink || "/placeholder-audio.mp3"}
                onLoadedMetadata={(e) =>
                  handleLoadedMetadata(recommend.id, e.target.duration)
                }
              />

              <figure
                className={styles.book__image__wrapper}
                style={{ display: isLoaded ? "block" : "none" }}
              >
                <img
                  className={styles.book__image}
                  src={recommend.imageLink}
                  alt={recommend.title}
                  onLoad={() => handleLoad(recommend.id)}
                />
              </figure>

              {isLoaded && (
                <>
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
                      <CiClock2 />
                      <span>{formatTime(durations[recommend.id] || 0)}</span>
                    </div>
                    <div className={styles.recommended__book__details}>
                      <CiStar />
                      <span>{recommend.averageRating}</span>
                    </div>
                  </div>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
