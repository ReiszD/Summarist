import styles from "@/styles/Home.module.css";
import Image from "next/image";
import logo from "@/summarist-home-page-main/assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { openLogin, closeLogin } from "@/redux/loginSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav__wrapper}>
          <figure className={styles.nav__img__mask}>
            <Image className={styles.nav__img} src={logo} alt="logo" />
          </figure>
          <ul className={styles.nav__list__wrapper}>
            <li
              onClick={() => dispatch(openLogin("/for-you"))}
              className={`${styles.nav__list} ${styles.nav__list__login}`}
            >
              Login
            </li>
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
