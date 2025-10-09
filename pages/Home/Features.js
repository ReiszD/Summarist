import styles from "@/styles/Home.module.css";
import { AiFillFileText } from "react-icons/ai";
import { AiFillBulb } from "react-icons/ai";
import { AiFillAudio } from "react-icons/ai";

export default function Features() {
  return (
    <>
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.section__title}>
              Understand books in few minutes
            </div>
            <div className={styles.features__wrapper}>
              <div className={styles.features}>
                <div className={styles.features__icon}>
                  <AiFillFileText />
                </div>
                <div className={styles.features__title}>Read or listen</div>
                <div className={styles.features__sub__title}>
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className={styles.features}>
                <div className={styles.features__icon}>
                  <AiFillBulb />
                </div>
                <div className={styles.features__title}>
                  Find your next read
                </div>
                <div className={styles.features__sub__title}>
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className={styles.features}>
                <div className={styles.features__icon}>
                  <AiFillAudio />
                </div>
                <div className={styles.features__title}>Briefcasts</div>
                <div className={styles.features__sub__title}>
                  Gain valuable insights from briefcasts
                </div>
              </div>
            </div>
            <div className={styles.statistics__wrapper}>
              <div className={styles.statistics__content__header}>
                <div className={styles.statistics__heading}>
                  Enhance your knowledge
                </div>
                <div className={styles.statistics__heading}>
                  Achieve greater success
                </div>
                <div className={styles.statistics__heading}>
                  Improve your health
                </div>
                <div className={styles.statistics__heading}>
                  Develop better parenting skills
                </div>
                <div className={styles.statistics__heading}>
                  Increase happiness
                </div>
                <div className={styles.statistics__heading}>
                  Be the best version of yourself!
                </div>
              </div>
              <div className={styles.statistics__content__details}>
                <div className={styles.statistics__data}>
                  <div className={styles.statistics__data__number}>93%</div>
                  <div className={styles.statistics__data__title}>
                    of Summarist members <b>significantly increase</b> reading
                    frequency.
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
            <div className={styles.statistics__wrapper}>
              <div
                className={`${styles.statistics__content__details} ${styles.statistics__content__details_second}`}
              >
                <div className={styles.statistics__data}>
                  <div className={styles.statistics__data__number}>91%</div>
                  <div className={styles.statistics__data__title}>
                    of Summarist members <b>report feeling more productive</b>
                    after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className={styles.statistics__data}>
                  <div className={styles.statistics__data__number}>94%</div>
                  <div className={styles.statistics__data__title}>
                    of Summarist members have <b>noticed an improvement</b> in
                    their overall comprehension and retention of information.
                  </div>
                </div>
                <div className={styles.statistics__data}>
                  <div className={styles.statistics__data__number}>88%</div>
                  <div className={styles.statistics__data__title}>
                    of Summarist members <b>feel more informed</b> about current
                    events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div
                className={`${styles.statistics__content__header} ${styles.statistics__content__header_second}`}
              >
                <div className={styles.statistics__heading}>
                  Expand your learning
                </div>
                <div className={styles.statistics__heading}>
                  Accomplish your goals
                </div>
                <div className={styles.statistics__heading}>
                  Strengthen your vitality
                </div>
                <div className={styles.statistics__heading}>
                  Become a better caregiver
                </div>
                <div className={styles.statistics__heading}>
                  Improve your mood
                </div>
                <div className={styles.statistics__heading}>
                  Maximize your abilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
