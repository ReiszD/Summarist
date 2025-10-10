import styles from "@/styles/ForYou.module.css";



export default function Selected({ selected }) {
  return (
    <>
      <div className={styles.for__you__title}>Selected Just For You</div>
      <audio src="install later"></audio>
      {Array.isArray(selected) && selected.length > 0 ? (
        selected.map((select) => (
          <a className={styles.selected__book} href="/" key={select.id}>
            <div className={styles.selected__book__subtitle}>
              {select.subTitle}
            </div>
            <div className={styles.selected__book__line}></div>
            <div className={styles.selected__book__content}>
              <figure className={styles.book__image__wrapper}>
                <img className={styles.book__image} src="image" alt="img" />
              </figure>
              <div className={styles.selected__book__text}>
                <div className={styles.selected__book__title}>
                  The Lean Startup
                </div>
                <div className={styles.selected__book__author}>Eric Ries</div>
                <div className={styles.selected__book__duration_wrapper}>
                  <div className={styles.selected__book__icon}>
                    <img
                      className={styles.selected__book__image}
                      src="image"
                      alt="img"
                    />
                  </div>
                  <div className={styles.selected__book__duration}>
                    3 min 23 sec
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))
      ) : (
        <p>No books found.</p>
      )}
    </>
  );
}
