import styles from "@/styles/Home.module.css";
import Image from "next/image";
import logo from "@/summarist-home-page-main/assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { openLogin, closeLogin } from "@/redux/loginSlice";
import { useEffect, useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  // Use optional chaining and default value to prevent SSR errors
  const user = useSelector((state) => state.user?.user || null);

  // Optional: only render after mounting (client-side) to avoid SSR mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Handle login click with dynamic redirect
  const handleLoginClick = (redirect = "/for-you") => {
    if (!user) {
      sessionStorage.setItem("loginRedirect", redirect);
      dispatch(openLogin());
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav__wrapper}>
          <figure className={styles.nav__img__mask}>
            <Image className={styles.nav__img} src={logo} alt="logo" />
          </figure>
          <ul className={styles.nav__list__wrapper}>
            {user ? (
              <li className={`${styles.nav__list} ${styles.nav__list__login}`}>
                Welcome, {user.name || "Guest"}
              </li>
            ) : (
              <li
                onClick={() => handleLoginClick("/for-you")}
                className={`${styles.nav__list} ${styles.nav__list__login}`}
              >
                Login
              </li>
            )}

            <li className={`${styles.nav__list} ${styles.nav__list__mobile}`}>
              About
            </li>
            <li className={`${styles.nav__list} ${styles.nav__list__mobile}`}>
              Contact
            </li>
            <li className={`${styles.nav__list} ${styles.nav__list__mobile}`}>
              Help
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
