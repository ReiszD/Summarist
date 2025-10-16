import styles from "@/styles/Plan.module.css";
import Footer from "./Home/Footer";
import Image from "next/image";
import plan_image from "@/summarist-home-page-main/assets/pricing-top.png";
import { IoIosPaper } from "react-icons/io";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import Accordion from "@/components/Accordian";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { openLogin, closeLogin } from "@/redux/loginSlice";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/router";

const Login = dynamic(() => import("./Home/Login"), { ssr: false });

export default function Plan() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activePlan, setActivePlan] = useState("");
  const user = useSelector((state) => state.user.user);
  const isLoginOpen = useSelector((state) => state.login.isLoginOpen);
  const [isPremium, setIsPremium] = useState(false);

  const accordionData = [
    {
      title: "How does the free 7-day trial work?",
      content:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires.",
    },
    {
      title:
        "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      content:
        "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    },
    {
      title: "What is included in the Premium plan?",
      content:
        "Premium membership provides unrestricted access to many best-selling books, high-quality audio, offline downloads, and Kindle sync.",
    },
    {
      title: "Can I cancel during my trial subscription?",
      content:
        "You will not be charged if you cancel your trial before its conclusion.",
    },
  ];

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  // ✅ Firestore subscription listener (the *correct* premium check)
  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "customers", user.uid, "subscriptions"),
      where("status", "in", ["trialing", "active"])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setIsPremium(!snapshot.empty);
    });

    return unsubscribe;
  }, [user?.uid]);

  // ✅ Redirect premium users away from plan page
  useEffect(() => {
    if (isPremium) {
      router.push("/for-you");
    }
  }, [isPremium, router]);

  const handleCheckout = async () => {
    if (!activePlan) return alert("Please select a plan first");

    if (!user?.uid) {
      sessionStorage.setItem("loginRedirect", "/choose-plan");
      dispatch(openLogin());
      return;
    }

    try {
      const priceIdMap = {
        "Premium Plus Yearly": process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY,
        "Premium Monthly": process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY,
      };

      const priceId = priceIdMap[activePlan];
      if (!priceId) {
        alert("Invalid plan selected");
        return;
      }

      const checkoutSessionRef = await addDoc(
        collection(db, "customers", user.uid, "checkout_sessions"),
        {
          price: priceId,
          success_url: window.location.origin + "/success",
          cancel_url: window.location.origin + "/choose-plan",
          allow_promotion_codes: true,
          trial_from_plan: activePlan === "Premium Plus Yearly",
        }
      );

      onSnapshot(checkoutSessionRef, (snap) => {
        const data = snap.data();
        if (data?.error) alert(`An error occurred: ${data.error.message}`);
        if (data?.url) window.location.assign(data.url);
      });
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

        {/* Features + Plan Cards */}
        <div className={styles.plan__row}>
          <div className={styles.plan__container}>
            {/* ... your existing UI below stays exactly the same ... */}

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
                  disabled={isPremium} // optional: disable if already premium
                >
                  {isPremium
                    ? "You are already Premium!"
                    : activePlan === "Premium Plus Yearly"
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

            <div className={styles.faq__wrapper}>
              <Accordion items={accordionData} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
      {isLoginOpen && <Login onClose={() => dispatch(closeLogin())} />}
    </div>
  );
}
