import styles from "@/styles/Sidebar.module.css";
import Image from "next/image";
import logo from "@/summarist-home-page-main/assets/logo.png";
import { GoHome } from "react-icons/go";
import { TbBadge } from "react-icons/tb";
import { RiBallPenLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { RiFontSize } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { openLogin, closeLogin } from "@/redux/loginSlice";
import { useState, useEffect } from "react";
import Login from "@/pages/Home/Login";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function Sidebar({
  showFontSizeControls = false,
  onFontSizeChange,
  initialActiveTab = "medium",
}) {
  const handleFontSizeClick = (size) => {
    if (onFontSizeChange) onFontSizeChange(size); // notify parent
    setActiveTab(size); // mark button as active
  };
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoginOpen = useSelector((state) => state.login.isLoginOpen);
  const user = useSelector((state) => state?.user?.user || null);

  // 👀 Optional: Debug user state
  useEffect(() => {
    console.log("Sidebar detected user:", user);
  }, [user]);

  const handleLoginClick = async () => {
    if (user) {
      try {
        // ✅ Only sign out — Redux updates automatically via _app.js listener
        await signOut(auth);
      } catch (err) {
        console.error("Logout failed:", err);
      }
    } else {
      // ✅ If user not logged in → open login modal
      dispatch(openLogin("/for-you"));
    }
  };

  useEffect(() => {
    const path = router.pathname;

    if (path === "/for-you") {
      setActiveTab("For You");
    } else if (path === "/library") {
      setActiveTab("My Library");
    } else if (path === "/settings") {
      setActiveTab("Settings");
    }
  }, [router.pathname]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}>
        <figure>
          <Image src={logo} alt="Summarist Logo" />
        </figure>
      </div>

      <div className={styles.sidebar__wrapper}>
        <div className={styles.sidebar__top}>
          <a
            className={`${styles.sidebar__link__wrapper} ${
              activeTab === "For You" ? styles.active__tab : ""
            }`}
            href="/for-you"
            onClick={() => setActiveTab("For You")}
          >
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <GoHome />
            </div>
            <div className={styles.sidebar__link__text}>For You</div>
          </a>

          <a
            className={`${styles.sidebar__link__wrapper} ${
              activeTab === "My Library" ? styles.active__tab : ""
            }`}
            href="/library"
            onClick={() => setActiveTab("My Library")}
          >
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
          </div>
          {showFontSizeControls && (
            <div
              className={`${styles.sidebar__link__wrapper} ${styles.sidebar__font__size__wrapper}`}
            >
              <button
                onClick={() => handleFontSizeClick("small")}
                className={`${styles.sidebar__link__text} ${
                  styles.sidebar__font__size__icon
                } ${
                  activeTab === "small"
                    ? styles.sidebar__font__size__active
                    : ""
                }`}
              >
                <RiFontSize className={styles.font__size__icon__small} />
              </button>
              <button
                onClick={() => handleFontSizeClick("medium")}
                className={`${styles.sidebar__link__text} ${
                  styles.sidebar__font__size__icon
                } ${
                  activeTab === "medium"
                    ? styles.sidebar__font__size__active
                    : ""
                }`}
              >
                <RiFontSize className={styles.font__size__icon__medium} />
              </button>
              <button
                onClick={() => handleFontSizeClick("large")}
                className={`${styles.sidebar__link__text} ${
                  styles.sidebar__font__size__icon
                } ${
                  activeTab === "large"
                    ? styles.sidebar__font__size__active
                    : ""
                }`}
              >
                <RiFontSize className={styles.font__size__icon__large} />
              </button>
              <button
                onClick={() => handleFontSizeClick("xlarge")}
                className={`${styles.sidebar__link__text} ${
                  styles.sidebar__font__size__icon
                } ${
                  activeTab === "xlarge"
                    ? styles.sidebar__font__size__active
                    : ""
                }`}
              >
                <RiFontSize className={styles.font__size__icon__xlarge} />
              </button>
            </div>
          )}
        </div>
        <div className={styles.sidebar__bottom}>
          <a
            className={`${styles.sidebar__link__wrapper} ${
              activeTab === "Settings" ? styles.active__tab : ""
            }`}
            href="/settings"
            onClick={() => setActiveTab("Settings")}
          >
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

          {/* 🔥 LOGIN / LOGOUT */}
          <div className={styles.sidebar__link__wrapper}>
            <div className={styles.sidebar__link__line}></div>
            <div className={styles.sidebar__icon__wrapper}>
              <FiLogOut />
            </div>
            <div
              className={styles.sidebar__link__text}
              onClick={handleLoginClick}
              style={{ cursor: "pointer" }}
            >
              {user ? "Logout" : "Login"}
            </div>
          </div>
        </div>
      </div>

      {isLoginOpen && (
        <Login
          onClose={() => dispatch(closeLogin())}
          onLoginSuccess={() => router.push("/for-you")}
        />
      )}
    </div>
  );
}
