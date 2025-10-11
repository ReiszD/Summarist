import styles from "@/styles/ForYou.module.css";
import { CiClock2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";

export default function Suggested({ suggested }) {
  return (
    <div>
      <div className={styles.for_you_title}>Suggested Books</div>
      <div className={styles.for_you_subtitle}>Browse Those Books</div>
      {Array.isArray(suggested) && suggested.length > 0 ? (
        <div className={styles.for_you_recommended_books}>
          {suggested.map((suggest) => (
            <a className={styles.for_you_recommended_books_link}>
              {suggest.subscriptionRequired && (
                <div className={styles.book__pill}>Premium</div>
              )}
              <audio src={suggest.audioLink}></audio>
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
                    03:24
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
            </a>
          ))}
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}
