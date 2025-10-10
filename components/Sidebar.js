import styles from "@/styles/Sidebar.module.css";
import Image from "next/image";
import logo from "@/summarist-home-page-main/assets/logo.png";
import { GoHome } from "react-icons/go";
import { TbBadge } from "react-icons/tb";
import { RiBallPenLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}>
        <figure>
          <Image src={logo} alt="" />
        </figure>
      </div>
      <div className={styles.sidebar__wrapper}>
        <div className={styles.sidebar__top}>
          <a className={styles.sidebar__link__wrapper} href="/for-you">
            <div
              className={`${styles.sidebar__link__line} ${styles.active__tab}`}
            ></div>
            <div className={styles.sidebar__icon__wrapper}>
              <GoHome />
            </div>
            <div className={styles.sidebar__link__text}>For You</div>
          </a>
          <a className={styles.sidebar__link__wrapper} href="/library">
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <TbBadge />
            </div>
            <div className={styles.sidebar__link__text}>My Library</div>
          </a>
          <div
            className={`${styles.sidebar__link__wrapper} ${styles.sidebar__link__not_allowed}`}
          >
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <RiBallPenLine />
            </div>
            <div className={styles.sidebar__link__text}>Highlights</div>
          </div>
          <div
            className={`${styles.sidebar__link__wrapper} ${styles.sidebar__link__not_allowed}`}
          >
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <IoIosSearch />
            </div>
            <div className={styles.sidebar__link__text}>Search</div>
            <div className="search__icon"></div>
          </div>
        </div>
        <div className="sidebar__bottom">
          <a className={styles.sidebar__link__wrapper} href="/settings">
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <FiSettings />
            </div>
            <div className={styles.sidebar__link__text}>Settings</div>
          </a>
          <div
            className={`${styles.sidebar__link__wrapper} ${styles.sidebar__link__not_allowed}`}
          >
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <IoMdHelpCircleOutline />
            </div>
            <div className={styles.sidebar__link__text}>Help & Support</div>
          </div>
          <div className={styles.sidebar__link__wrapper}>
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <FiLogOut />
            </div>
            <div className={styles.sidebar__link__text}>
              <div className={styles.sidebar__link__text}>Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
