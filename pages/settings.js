import styles from "@/styles/Settings.module.css";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import login__image from "@/summarist-home-page-main/assets/login.png";
import { useSelector, useDispatch } from "react-redux";
import { openLogin } from "@/redux/loginSlice";
import Login from "./Home/Login";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user || null);
  const isLoginOpen = useSelector((state) => state.login.isLoginOpen);
  const [subscriptionPlan, setSubscriptionPlan] = useState("Basic");

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "customers", user.uid, "subscriptions"),
      where("status", "in", ["trialing", "active"])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const subData = snapshot.docs[0].data();
        const planName =
          subData?.items?.[0]?.plan?.product?.name ||
          subData?.items?.[0]?.price?.product?.name ||
          subData?.role ||
          "Basic";

        setSubscriptionPlan(planName);
      } else {
        setSubscriptionPlan("Basic");
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);
  return (
    <div className={styles.settings__wrapper}>
      <SearchBar />
      <Sidebar />

      <div className={styles.settings__container}>
        <div className={styles.settings__row}>
          <div className={styles.settings__section__title}>Settings</div>

          {user ? (
            // Logged-in user → show subscription info and email
            <>
              <div className={styles.setting__content}>
                <div
                  className={`${styles.settings__subtitle} ${styles.subscription__subtitle}`}
                >
                  Your Subscription Plan
                </div>
                <div className={styles.settings__text}>{subscriptionPlan}</div>
                <Link
                  href={"/choose-plan"}
                  className={`${styles.settings__btn} ${styles.settings__login__btn}`}
                >
                  {subscriptionPlan === "Premium" ? "Manage" : "Change Plan"}
                </Link>
              </div>

              <div className={styles.setting__content}>
                <div className={styles.settings__subtitle}>Email</div>
                <div className={styles.settings__text}>{user.email}</div>
              </div>
            </>
          ) : (
            // Not logged in → show login prompt and modal
            <div className={styles.settings__login__wrapper}>
              <Image
                src={login__image}
                alt="login image"
                className={styles.login_img}
              />
              <div className={styles.settings__login__text}>
                Log in to your account to see your details.
              </div>
              <div
                className={`${styles.settings__btn} ${styles.settings__login__btn}`}
                onClick={() => dispatch(openLogin())}
              >
                Login
              </div>

              {isLoginOpen && <Login />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
