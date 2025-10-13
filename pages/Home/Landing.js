import styles from "@/styles/Home.module.css";
import Login from "./Login";
import Image from "next/image";
import landing__img from "@/summarist-home-page-main/assets/landing.png";
import { useDispatch, useSelector } from "react-redux";
import { openLogin, closeLogin } from "@/redux/loginSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/router";

export default function Landing() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user || null);
  const isLoginOpen = useSelector((state) => state.login.isLoginOpen);

  const handleLoginClick = (redirect = "/for-you") => {
    if (!user) {
      sessionStorage.setItem("loginRedirect", redirect);
      dispatch(openLogin());
    }
  };

  // Logout user
  const handleLogoutClick = async () => {
    if (user) {
      try {
        await signOut(auth); // Redux updates via _app.js listener
      } catch (err) {
        console.error("Logout failed:", err);
      }
    }
  };

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
                <button
                  onClick={user ? handleLogoutClick : () => handleLoginClick("/for-you")}
                  className={`${styles.btn} ${styles.home__cta__btn}`}
                >
                  {user ? "Logout" : "Login"}
                </button>
              </div>
              <figure className={styles.landing__image__mask}>
                <Image src={landing__img} alt="landing" />
              </figure>
            </div>
          </div>
        </div>
      </section>
       {isLoginOpen && !user && (
        <Login onClose={() => dispatch(closeLogin())} />
      )}
    </>
  );
}
