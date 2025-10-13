import styles from "@/styles/Plan.module.css";
import Footer from "./Home/Footer";
import Image from "next/image";
import plan_image from "@/summarist-home-page-main/assets/pricing-top.png";
import { IoIosPaper } from "react-icons/io";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function Plan() {
  return (
    <div className={`${styles.plan__wrapper} ${styles.wrapper__full}`}>
      <div className={styles.plan}>
        <div className={styles.plan__header__wrapper}>
          <div className={styles.plan__header}>
            <div className={styles.plan__title}>
              Get unlimited access to many amazing books to read
            </div>
            <div className={styles.plan__subtitle}>
              Turn ordinary moments into amazing learning opportunities
            </div>
            <figure className={styles.plan__img__mask}>
              <Image
                src={plan_image}
                alt="plan image"
                className={styles.plan__img__mask__img}
              />
            </figure>
          </div>
        </div>
        <div className={styles.plan__row}>
          <div className={styles.plan__container}>
            <div className={styles.plan__features__wrapper}>
              <div className={styles.plan__features}>
                <figure className={styles.plan__features__icon}>
                  <IoIosPaper className={styles.plan__features__icon_img} />
                </figure>
                <div className={styles.plan__features__text}>
                  <b>Key ideas in a few min</b> with many books to read
                </div>
              </div>
              <div className={styles.plan__features}>
                <figure className={styles.plan__features__icon}>
                  <RiPlantFill className={styles.plan__features__icon_img} />
                </figure>
                <div className={styles.plan__features__text}>
                  <b>3 million</b> people growing with Summarist everyday
                </div>
              </div>
              <div className={styles.plan__features}>
                <figure className={styles.plan__features__icon}>
                  <FaHandshake className={styles.plan__features__icon_img} />
                </figure>
                <div className={styles.plan__features__text}>
                  <b>Precise recommendations</b> collections curated by experts
                </div>
              </div>
            </div>
            <div className={styles.features__section__title}>
              Choose the plan that fits you
            </div>
            <div
              className={`${styles.plan__card} ${styles.plan__card__active}`}
            >
              <div className={styles.plan__card__circle}>
                <div className={styles.plan__card__dot}></div>
              </div>
              <div className={styles.plan__card__content}>
                <div className={styles.plan__card__title}>
                  Premium Plus Yearly
                </div>
                <div className={styles.plan__card__price}>$99.99/year</div>
                <div className={styles.plan__card__text}>
                  7-Day free trial included
                </div>
              </div>
            </div>
            <div className={styles.plan__card__separator}>
              <div className="plan__separator">or</div>
            </div>
            <div className={styles.plan__card}>
              <div className={styles.plan__card__circle}></div>
              <div className={styles.plan__card__content}>
                <div className={styles.plan__card__title}>Premium Monthly</div>
                <div className={styles.plan__card__price}>$9.99/moth</div>
                <div className={styles.plan__card__text}>No trial included</div>
              </div>
            </div>
            <div className={styles.plan__card__cta}>
              <span className={styles.btn__wrapper}>
                <button className={styles.plan__btn}>
                  Start Your Free 7-Day Trial
                </button>
              </span>
              <div className={styles.plan__disclaimer}>
                Cancel your trial at any time before it ends, and you won't be
                charged.
              </div>
            </div>
            <div className={styles.faq__wrapper}>
              <div className={styles.accordion__card}>
                <div className={styles.accordion__header}>
                  <div className={styles.accordion__title}>
                    How does the free 7-day trial work?
                  </div>
                  <IoIosArrowUp className={styles.accordion__icon} />
                </div>
                <div className={styles.collapse__show}>
                  <div className={styles.accordion__body}>
                    Begin your complimentary 7-day trial with a Summarist annual
                    membership. You are under no obligation to continue your
                    subscription, and you will only be billed when the trial
                    period expires. With Premium access, you can learn at your
                    own pace and as frequently as you desire, and you may
                    terminate your subscription prior to the conclusion of the
                    7-day free trial.
                  </div>
                </div>
              </div>
              <div className={styles.accordion__card}>
                <div className={styles.accordion__header}>
                  <div className={styles.accordion__title}>
                    Can I switch subscriptions from montly to yearly, or yearly
                    to monthly?
                  </div>
                  <IoIosArrowUp className={styles.accordion__icon} />
                </div>
                <div className={styles.collapse__show}>
                  <div className={styles.accordion__body}>
                    While an annual plan is active, it is not feasible to switch
                    to a monthly plan. However, once the current momth ends,
                    transitioning from a monthly plan to an annual plan is an
                    option.
                  </div>
                </div>
              </div>
              <div className={styles.accordion__card}>
                <div className={styles.accordion__header}>
                  <div className={styles.accordion__title}>
                    What's included in the Premium plan?
                  </div>
                  <IoIosArrowDown className={styles.accordion__icon} />
                </div>
                <div className={styles.collapse__show}>
                  <div className={styles.accordion__body}>
                    Premium membership provides you with the ultimate Summarist
                    experience, including unrestricted entry to many
                    best-selling books high-quality audio, the ability to
                    download titles for offline reading, and the option to send
                    your reads to your Kindle.
                  </div>
                </div>
              </div>
              <div className={styles.accordion__card}>
                <div className={styles.accordion__header}>
                  <div className={styles.accordion__title}>
                    Can I cancel during my trial subscription
                  </div>
                  <IoIosArrowDown className={styles.accordion__icon} />
                </div>
                <div className={styles.collapse__show}>
                  <div className={styles.accordion__body}>
                    You will not be charged if you cancel your trial before its
                    conclustion. While you will not have complete access to the
                    entire Summarist library, you can still expand your
                    knowledge with one curated book per day.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
