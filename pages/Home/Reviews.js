import styles from "@/styles/Home.module.css";
import Login from "./Login";
import { BsStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { openLogin, closeLogin } from "@/redux/loginSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function Reviews() {
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
      <section className={styles.reviews}>
        <div className={styles.row}>
          <div className={styles.container}>
            <div className={styles.section__title}>What our members say</div>
            <div className={styles.reviews__wrapper}>
              <div className={styles.review}>
                <div className={styles.review__header}>
                  <div className={styles.review__name}>Hanna M.</div>
                  <div className={styles.review__stars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.review__body}>
                  This app has been a <b>game-changer</b> for me! It's saved me
                  so much time and effort in reading and comprehending books.
                  Highly recommend it to all book lovers.
                </div>
              </div>
              <div className={styles.review}>
                <div className={styles.review__header}>
                  <div className={styles.review__name}>David B.</div>
                  <div className={styles.review__stars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.review__body}>
                  I love this app! It provides
                  <b>concise and accurate summaries</b> of books in a way that
                  is easy to understand. It's also very user-friendly and
                  intuitive.
                </div>
              </div>
              <div className={styles.review}>
                <div className={styles.review__header}>
                  <div className={styles.review__name}>Nathan S.</div>
                  <div className={styles.review__stars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.review__body}>
                  This app is a great way to get the main takeaways from a book
                  without having to read the entire thing.
                  <b>The summaries are well-written and informative.</b>
                  Definitely worth downloading.
                </div>
              </div>
              <div className={styles.review}>
                <div className={styles.review__header}>
                  <div className={styles.review__name}>Ryan R.</div>
                  <div className={styles.review__stars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.review__body}>
                  If you're a busy person who
                  <b>loves reading but doesn't have the time</b> to read every
                  book in full, this app is for you! The summaries are thorough
                  and provide a great overview of the book's content.
                </div>
              </div>
            </div>
            <div className={styles.reviews__btn__wrapper}>
              <button
                onClick={
                  user ? handleLogoutClick : () => handleLoginClick("/for-you")
                }
                className={`${styles.btn} ${styles.home__cta__btn}`}
              >
                {user ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </section>
      {isLoginOpen && !user && <Login onClose={() => dispatch(closeLogin())} />}
    </>
  );
}
