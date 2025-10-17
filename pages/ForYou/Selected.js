import styles from "@/styles/ForYou.module.css";
import { GiPlayButton } from "react-icons/gi";
import { formatTime } from "@/components/formatTime";
import { useState } from "react";
import Link from "next/link";

export default function Selected({ selected }) {
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
      <div className={styles.for_you_title}>Selected Just For You</div>

      {selected.map((book) => {
        const isLoaded = loading[book.id];

        return (
          <div
            key={book.id}
            className={styles.selected__book_wrapper}
            style={{ position: "relative" }}
          >
            <audio
              hidden
              src={book.audioLink || "/placeholder-audio.mp3"}
              onLoadedMetadata={(e) =>
                handleLoadedMetadata(book.id, e.target.duration)
              }
            />

            <a className={styles.selected__book} href={`/player/${book.id}`}>
              <div className={styles.selected__book__subtitle}>
                {book.subTitle}
              </div>
              <div className={styles.selected__book__line}></div>
              <div className={styles.selected__book__content}>
                <figure
                  className={styles.book__image__wrapper}
                  style={{ position: "relative" }}
                >
                  <img
                    className={styles.book__image}
                    src={book.imageLink}
                    alt={book.title}
                    onLoad={() => handleLoad(book.id)}
                    style={{ opacity: isLoaded ? 1 : 0 }}
                  />
                </figure>

                <div className={styles.selected__book__text}>
                  <div className={styles.selected__book__title}>
                    {book.title}
                  </div>
                  <div className={styles.selected__book__author}>
                    {book.author}
                  </div>
                  <div className={styles.selected__book__duration_wrapper}>
                    <div className={styles.selected__book__icon}>
                      <div className={styles.selected__book__image}>
                        <Link href={`/player/${book.id}`}>
                          <GiPlayButton className={styles.play__icon} />
                        </Link>
                      </div>
                    </div>
                    <div className={styles.selected__book__duration}>
                      {formatTime(durations[book.id] || 0)
                        .replace(":", " min ")
                        .concat(" sec")}
                    </div>
                  </div>
                </div>
              </div>
            </a>
            {!isLoaded && (
              <div className={styles.selected__skeleton__card}>
                <div className={styles.selected__skeleton__subtitle}></div>{" "}
                <div className={styles.selected__skeleton__content}>
                  <div className={styles.selected__skeleton__image}></div>{" "}
                  <div className={styles.selected__skeleton__text_wrapper}>
                    <div className={styles.selected__skeleton__text}></div>{" "}
                    <div
                      className={styles.selected__skeleton__text_short}
                    ></div>{" "}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
