import styles from "@/styles/Plan.module.css";
import Footer from "./Home/Footer";
import Image from "next/image";
import plan_image from "@/summarist-home-page-main/assets/pricing-top.png";
import { IoIosPaper } from "react-icons/io";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import Accordion from "@/components/Accordian";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux"; // <- import Redux hook

export default function Plan() {
  const [activePlan, setActivePlan] = useState("");
  const user = useSelector((state) => state.user.user); // <- get user from Redux

  const accordionData = [
    {
      title: "How does the free 7-day trial work?",
      content:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
      title:
        "Can I switch subscriptions from montly to yearly, or yearly to monthly?",
      content:
        "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    },
    {
      title: "What is included in the Premium plan?",
      content:
        "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
    },
    {
      title: "Can I cancel during my trial subscription?",
      content:
        "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
    },
  ];

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const handleCheckout = async () => {
    if (!activePlan) return alert("Please select a plan first");
    if (!user?.email) return alert("You must be logged in");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: activePlan, userEmail: user.email }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong during checkout");
    }
  };

  return (
    <div className={`${styles.plan__wrapper} ${styles.wrapper__full}`}>
      <div className={styles.plan}>
        {/* Plan Header */}
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

        {/* Features */}
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

            {/* Plan Selection */}
            <div className={styles.features__section__title}>
              Choose the plan that fits you
            </div>

            {/* Premium Plus Yearly */}
            <div
              className={`${styles.plan__card} ${
                activePlan === "Premium Plus Yearly"
                  ? styles.plan__card__active
                  : ""
              }`}
              onClick={() => setActivePlan("Premium Plus Yearly")}
            >
              <div className={styles.plan__card__circle}>
                <div
                  className={`${styles.plan__card__dot} ${
                    activePlan === "Premium Plus Yearly"
                      ? styles.filled__dot
                      : ""
                  }`}
                ></div>
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

            {/* Separator */}
            <div className={styles.plan__card__separator}>
              <div className="plan__separator">or</div>
            </div>

            {/* Premium Monthly */}
            <div
              className={`${styles.plan__card} ${
                activePlan === "Premium Monthly"
                  ? styles.plan__card__active
                  : ""
              }`}
              onClick={() => setActivePlan("Premium Monthly")}
            >
              <div className={styles.plan__card__circle}>
                <div
                  className={`${styles.plan__card__dot} ${
                    activePlan === "Premium Monthly" ? styles.filled__dot : ""
                  }`}
                ></div>
              </div>
              <div className={styles.plan__card__content}>
                <div className={styles.plan__card__title}>Premium Monthly</div>
                <div className={styles.plan__card__price}>$9.99/month</div>
                <div className={styles.plan__card__text}>No trial included</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className={styles.plan__card__cta}>
              <span className={styles.btn__wrapper}>
                <button
                  onClick={handleCheckout}
                  className={`${styles.plan__btn} ${
                    activePlan ? styles.plan__btn__active : ""
                  }`}
                >
                  {activePlan === "Premium Plus Yearly"
                    ? "Start Your Free 7-Day Trial"
                    : activePlan === "Premium Monthly"
                    ? "Start Monthly Plan"
                    : "Select a Plan"}
                </button>
              </span>
              <div
                className={`${styles.plan__disclaimer} ${
                  activePlan ? styles.plan__disclaimer__active : ""
                }`}
              >
                {activePlan === "Premium Plus Yearly"
                  ? "Cancel your trial at any time before it ends, and you won't be charged."
                  : activePlan === "Premium Monthly"
                  ? "30-Day money back guarantee, no questions asked."
                  : ""}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className={styles.faq__wrapper}>
              <Accordion items={accordionData} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}