import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0); // Track which heading is active

  const headings1 = [
    "Enhance your knowledge",
    "Achieve greater success",
    "Improve your health",
    "Develop better parenting skills",
    "Increase happiness",
    "Be the best version of yourself!",
  ];

    // Automatically rotate headings every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % headings1.length);
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const headings2 = [
    "Expand your learning",
    "Accomplish your goals",
    "Strengthen your vitality",
    "Become a better caregiver",
    "Improve your mood",
    "Maximize your abilities",
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.section__title}>
            Understand books in few minutes
          </div>
          <div className={styles.features__wrapper}>
            <div className={styles.features}>
              <div className={styles.features__icon}><AiFillFileText /></div>
              <div className={styles.features__title}>Read or listen</div>
              <div className={styles.features__sub__title}>
                Save time by getting the core ideas from the best books.
              </div>
            </div>
            <div className={styles.features}>
              <div className={styles.features__icon}><AiFillBulb /></div>
              <div className={styles.features__title}>Find your next read</div>
              <div className={styles.features__sub__title}>
                Explore book lists and personalized recommendations.
              </div>
            </div>
            <div className={styles.features}>
              <div className={styles.features__icon}><AiFillAudio /></div>
              <div className={styles.features__title}>Briefcasts</div>
              <div className={styles.features__sub__title}>
                Gain valuable insights from briefcasts
              </div>
            </div>
          </div>

          {/* STATISTICS SECTION */}
          <div className={styles.statistics__wrapper}>
            <div className={styles.statistics__content__header}>
              {headings1.map((heading, index) => (
                <div
                  key={index}
                  className={`${styles.statistics__heading} ${
                    index === activeIndex ? styles["statistics__heading--active"] : ""
                  }`}
                  onClick={() => setActiveIndex(index)} // Click to activate
                >
                  {heading}
                </div>
              ))}
            </div>

            <div className={styles.statistics__content__details}>
              <div className={styles.statistics__data}>
                <div className={styles.statistics__data__number}>93%</div>
                <div className={styles.statistics__data__title}>
                  of Summarist members <b>significantly increase</b> reading frequency.
                </div>
              </div>
              <div className={styles.statistics__data}>
                <div className={styles.statistics__data__number}>96%</div>
                <div className={styles.statistics__data__title}>
                  of Summarist members <b>establish better</b> habits.
                </div>
              </div>
              <div className={styles.statistics__data}>
                <div className={styles.statistics__data__number}>90%</div>
                <div className={styles.statistics__data__title}>
                  have made <b>significant positive</b> change to their lives.
                </div>
              </div>
            </div>
          </div>

          {/* SECOND STATISTICS WRAPPER */}
          <div className={styles.statistics__wrapper}>
            <div className={`${styles.statistics__content__details} ${styles.statistics__content__details_second}`}>
              <div className={styles.statistics__data}>
                <div className={styles.statistics__data__number}>91%</div>
                <div className={styles.statistics__data__title}>
                  of Summarist members <b>report feeling more productive</b> after incorporating the service.
                </div>
              </div>
              <div className={styles.statistics__data}>
                <div className={styles.statistics__data__number}>94%</div>
                <div className={styles.statistics__data__title}>
                  of Summarist members have <b>noticed an improvement</b> in comprehension.
                </div>
              </div>
              <div className={styles.statistics__data}>
                <div className={styles.statistics__data__number}>88%</div>
                <div className={styles.statistics__data__title}>
                  of Summarist members <b>feel more informed</b> about current events.
                </div>
              </div>
            </div>
            <div className={`${styles.statistics__content__header} ${styles.statistics__content__header_second}`}>
              {headings2.map((heading, index) => (
                <div
                  key={index}
                  className={`${styles.statistics__heading} ${
                    index === activeIndex ? styles["statistics__heading--active"] : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {heading}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}