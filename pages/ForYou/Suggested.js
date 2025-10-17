import styles from "@/styles/ForYou.module.css";
import Link from "next/link";
import { CiClock2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { formatTime } from "@/components/formatTime";
import { useEffect, useRef, useState } from "react";

export default function Suggested({ suggested = [] }) {
  const [durations, setDurations] = useState({});
  // const audioRef = useRef(null);
  const [loading, setLoading] = useState({});

  const handleLoadedMetadata = (id, duration) => {
    setDurations((prev) => ({ ...prev, [id]: duration || 0 }));
  };

  const handleLoad = (id) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div>
      <div className={styles.for_you_title}>Suggested Books</div>
      <div className={styles.for_you_subtitle}>Browse Those Books</div>
        <div className={styles.for_you_recommended_books}>
          {suggested.map((suggest) => {
            const isLoaded = loading[suggest.id];
            return (
            <Link
              className={styles.for_you_recommended_books_link}
              href={`/books/${suggest.id}`}
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

              {isLoaded && suggest.subscriptionRequired && (
                <div className={styles.book__pill}>Premium</div>
              )}
              <audio
                hidden
                src={suggest.audioLink || "/placeholder-audio.mp3"}
               onLoadedMetadata={(e) =>
                  handleLoadedMetadata(suggest.id, e.target.duration)
                }
              ></audio>
              <figure className={styles.book__image__wrapper}
              style={{ display: isLoaded ? "block" : "none" }}>
                <img
                  className={styles.book__image}
                  src={suggest.imageLink}
                  alt="img"
                  onLoad={() => handleLoad(suggest.id)}
                />
              </figure>
              {isLoaded && (
                <>
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
              </>
              )}
            </Link>
            );
          })}
        </div>
    </div>
  );
}
