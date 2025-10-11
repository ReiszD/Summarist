import styles from "@/styles/ForYou.module.css";
import { CiClock2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import Link from "next/link";

export default function Recommended({ recommended }) {
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
              <audio src={recommend.audioLink}></audio>
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
                    03:24
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
