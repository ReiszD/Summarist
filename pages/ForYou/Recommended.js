import styles from "@/styles/ForYou.module.css";

export default function Recommended({ recommended }) {
  return (
    <div>
      <div className={styles.for_you_title}>Recommended For You</div>
      <div className={styles.for_you_subtitle}>We think you'll like these</div>

      {Array.isArray(recommended) && recommended.length > 0 ? (
        <div className={styles.for_you_recommended_books}> {/* <-- single container */}
          {recommended.map((recommend) => (
            <a
              key={recommend.id}
              className={styles.for_you_recommended_books_link}
              href="/"
            >
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
                    <img
                      className={styles.recommended__book__details_img}
                      src="book clock icon"
                      alt="duration"
                    />
                  </div>
                  <div className={styles.recommended__book__details_text}>
                    03:24
                  </div>
                </div>
                <div className={styles.recommended__book__details}>
                  <div className={styles.recommended__book__details_icon}>
                    <img src="star icon" alt="star" />
                  </div>
                  <div className={styles.recommended__book__details_text}>
                    {recommend.averageRating}
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