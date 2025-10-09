import styles from "@/styles/Home.module.css";
import Image from "next/image";
import landing__img from "@/summarist-home-page-main/assets/landing.png";

export default function Landing() {
  return (
    <>
      <section className="landing">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.landing__wrapper}>
              <div className={styles.landing__content}>
                <div className={styles.landing__content__title}>
                  Gain more knowledge <br className={styles.remove__tablet} />
                  in less time
                </div>
                <div className={styles.landing__content__subtitle}>
                  Great summaries for busy people,
                  <br className={styles.remove__tablet} />
                  individuals who barely have time to read,
                  <br className={styles.remove__tablet} />
                  and even people who don’t like to read.
                </div>
                <button className={`${styles.btn} ${styles.home__cta__btn}`}>Login</button>
              </div>
              <figure className={styles.landing__image__mask}>
                <Image src={landing__img} alt="landing" />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
