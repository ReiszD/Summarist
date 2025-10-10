import styles from "@/styles/ForYou.module.css";

export default function Recommended() {
  return (
    <div>
      <div className={styles.for_you_title}>Recommended For You</div>
      <div className={styles.for_you_subtitle}>We think you'll like these</div>
      <div className={styles.for_you_recommended_books}>
        <a className={styles.for_you_recommended_books_link}>
          <audio src="install later"></audio>
          <figure className={styles.book__image__wrapper}>
            <img className={styles.book__image} src="book" alt="img" />
          </figure>
          <div className={styles.recommended__book__title}>
            How to Win Friends and Influence People
          </div>
          <div className={styles.recommended__book__author}>Dale Carnegie</div>
          <div className={styles.recommended__book__subtitle}>
            Time-tested advice for the digital age
          </div>
          <div className={styles.recommended__book__details_wrapper}>
            <div className={styles.recommended__book__details}>
              <div className={styles.recommended__book__details_icon}>
                <img
                  className={styles.recommended__book__details_img}
                  src="book clock icon"
                />
              </div>
              <div className={styles.recommended__book__details_text}>03:24</div>
            </div>
            <div className={styles.recommended__book__details}>
              <div className={styles.recommended__book__details_icon}>
                <img src="star icon" alt="star" />
              </div>
              <div className={styles.recommended__book__details_text}>4.4</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
