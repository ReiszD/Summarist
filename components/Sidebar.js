import styles from "@/styles/Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.search__logo}>
        <figure>
          <img src="logo" alt="logo" />
        </figure>
      </div>
      <div className={styles.sidebar__wrapper}>
        <div className={styles.sidebar__top}>
          <a className={styles.sidebar__link__wrapper} href="/for-you">
            <div
              className={`${styles.sidebar__link__line} ${styles.active__tab}`}
            ></div>
            <div className={styles.sidebar__icon__wrapper}>
              <img src="search icon" alt="icon" />
            </div>
            <div className={styles.sidebar__link__text}>For You</div>
          </a>
          <a className={styles.sidebar__link__wrapper} href="/library">
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <img src="search icon" alt="icon" />
            </div>
            <div className={styles.sidebar__link__text}>My Library</div>
          </a>
          <div
            className={`${styles.sidebar__link__wrapper} ${styles.sidebar__link__not_allowed}`}
          >
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <img src="highlight icon" alt="icon" />
            </div>
            <div className={styles.sidebar__link__text}>Highlights</div>
          </div>
          <div
            className={`${styles.sidebar__link__wrapper} ${styles.sidebar__link__not_allowed}`}
          >
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <img src="search icon" alt="icon" />
            </div>
            <div className={styles.sidebar__link__text}>Search</div>
            <div className="search__icon"></div>
          </div>
        </div>
        <div className="sidebar__bottom">
          <a className={styles.sidebar__link__wrapper} href="/settings">
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <img src="settings icon" alt="icon" />
            </div>
            <div className={styles.sidebar__link__text}>Settings</div>
          </a>
          <div
            className={`${styles.sidebar__link__wrapper} ${styles.sidebar__link__not_allowed}`}
          >
            <div className={styles.sidebar__link__line}></div>
              <div className={styles.sidebar__icon__wrapper}>
                <img src="help icon" alt="icon" />
              </div>
              <div className={styles.sidebar__link__text}>Help & Support</div>
          </div>
          <div className={styles.sidebar__link__wrapper}>
            <div className={styles.sidebar__link__line}></div>
              <div className={styles.sidebar__icon__wrapper}>
                <img src="logout icon" alt="icon" />
              </div>
              <div className={styles.sidebar__link__text}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
}
