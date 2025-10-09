import styles from "@/styles/Home.module.css";
import { BiCrown } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

export default function Numbers() {
  return (
    <>
      <section className={styles.number}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.section__title}>Start growing with Summarist now</div>
            <div className={styles.numbers__wrapper}>
              <div className={styles.numbers}>
                <div className={styles.numbers__icon}>
                  <BiCrown />
                </div>
                <div className={styles.numbers__title}>3 Million</div>
                <div className={styles.numbers__sub__title}>
                  Downloads on all platforms
                </div>
              </div>
              <div className={styles.numbers}>
                <div className={`${styles.numbers__icon} ${styles.numbers__star__icon}`}>
                  <BsStarFill />
                  <BsStarHalf />
                </div>
                <div className={styles.numbers__title}>4.5 Stars</div>
                <div className={styles.numbers__sub__title}>
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className={styles.numbers}>
                <div className={styles.numbers__icon}>
                  <RiLeafLine />
                </div>
                <div className={styles.numbers__title}>97%</div>
                <div className={styles.numbers__sub__title}>
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
