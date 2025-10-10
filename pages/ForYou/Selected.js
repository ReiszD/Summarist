import styles from "@/styles/ForYou.module.css";
import { GiPlayButton } from "react-icons/gi";

export default function Selected({ selected }) {
  return (
    <>
      <div className={styles.for__you__title}>Selected Just For You</div>
      {Array.isArray(selected) && selected.length > 0 ? (
        selected.map((select) => (
          <div key={select.id} className={styles.selected__book_wrapper}>
            <audio
              controls
              src={select.audioLink || "/placeholder-audio.mp3"}
            ></audio>
            <a className={styles.selected__book} href="/">
              <div className={styles.selected__book__subtitle}>
                {select.subTitle}
              </div>
              <div className={styles.selected__book__line}></div>
              <div className={styles.selected__book__content}>
                <figure className={styles.book__image__wrapper}>
                  <img
                    className={styles.book__image}
                    src={select.imageLink}
                    alt="img"
                  />
                </figure>
                <div className={styles.selected__book__text}>
                  <div className={styles.selected__book__title}>
                    {select.title}
                  </div>
                  <div className={styles.selected__book__author}>
                    {select.author}
                  </div>
                  <div className={styles.selected__book__duration_wrapper}>
                    <div className={styles.selected__book__icon}>
                      <div className={styles.selected__book__image}>
                        <GiPlayButton />
                      </div>
                    </div>
                    <div className={styles.selected__book__duration}>
                      3 min 23 sec
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))
      ) : (
        <p>No books found.</p>
      )}
    </>
  );
}
