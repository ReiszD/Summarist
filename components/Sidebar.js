import styles from "@/styles/Sidebar.module.css";
import Image from "next/image";
import logo from "@/summarist-home-page-main/assets/logo.png";
import { GoHome } from "react-icons/go";
import { TbBadge } from "react-icons/tb";
import { RiBallPenLine, RiFontSize } from "react-icons/ri";
import { IoIosSearch, IoMdClose, IoMdHelpCircleOutline } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";
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
  collapsed = false,
  bottomOffset = 0,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoginOpen = useSelector((state) => state.login.isLoginOpen);
  const user = useSelector((state) => state?.user?.user || null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleFontSizeClick = (size) => {
    if (onFontSizeChange) onFontSizeChange(size);
    setActiveTab(size);
  };

  const handleLoginClick = async () => {
    if (user) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error("Logout failed:", err);
      }
    } else {
      dispatch(openLogin("/for-you"));
    }
    setMenuOpen(false); // close mobile menu after login/logout
  };

  useEffect(() => {
    const path = router.pathname;
    if (path === "/for-you") setActiveTab("For You");
    else if (path === "/library") setActiveTab("My Library");
    else if (path === "/settings") setActiveTab("Settings");
  }, [router.pathname]);

  const linksTop = [
    { label: "For You", icon: <GoHome />, href: "/for-you" },
    { label: "My Library", icon: <TbBadge />, href: "/library" },
    { label: "Highlights", icon: <RiBallPenLine />, disabled: true },
    { label: "Search", icon: <IoIosSearch />, disabled: true },
  ];

  const linksBottom = [
    { label: "Settings", icon: <FiSettings />, href: "/settings" },
    {
      label: "Help & Support",
      icon: <IoMdHelpCircleOutline />,
      disabled: true,
    },
    {
      label: user ? "Logout" : "Login",
      icon: <FiLogOut />,
      onClick: handleLoginClick,
    },
  ];

  const renderLink = ({ label, icon, href, disabled, onClick }) => {
    const isActive = activeTab === label;
    return (
      <div
        key={label}
        className={`${styles.sidebar__link__wrapper} ${
          isActive ? styles.active__tab : ""
        } ${disabled ? styles.sidebar__link__not_allowed : ""}`}
        onClick={() => {
          if (href) router.push(href);
          if (onClick) onClick();
          if (!disabled) setActiveTab(label);
          if (menuOpen) setMenuOpen(false);
        }}
      >
        <div className={styles.sidebar__link__line}></div>
        <div className={styles.sidebar__icon__wrapper}>{icon}</div>
        <div className={styles.sidebar__link__text}>{label}</div>
      </div>
    );
  };

  return (
    <div
      className={`${styles.sidebar} ${
        collapsed ? styles.sidebar__collapsed : ""
      }`}
    >
      <button className={styles.btn__menu} onClick={toggleMenu}>
        {menuOpen ? <IoMdClose /> : <FaBars />}
      </button>

      {/* Mobile menu backdrop */}
      <div
        className={`${styles.sidebar__backdrop} ${menuOpen ? styles.open : ""}`}
      >
        <div className={styles.sidebar__menu}>
          <div className={styles.sidebar__logo}>
            <figure>
              <Image src={logo} alt="Summarist Logo" />
            </figure>
          </div>
          <div className={styles.sidebar__wrapper}>
            <div className={styles.sidebar__top}>
              {linksTop.map(renderLink)}
              {showFontSizeControls && (
                <div
                  className={`${styles.sidebar__link__wrapper} ${styles.sidebar__font__size__wrapper}`}
                >
                  {["small", "medium", "large", "xlarge"].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleFontSizeClick(size)}
                      className={`${styles.sidebar__link__text} ${
                        styles.sidebar__font__size__icon
                      } ${
                        activeTab === size
                          ? styles.sidebar__font__size__active
                          : ""
                      }`}
                    >
                      <RiFontSize
                        className={styles[`font__size__icon__${size}`]}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.sidebar__bottom} style={{ marginBottom: bottomOffset }}>
              {linksBottom.map(renderLink)}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={styles.sidebar__menu}>
        <div className={styles.sidebar__logo}>
          <figure>
            <Image src={logo} alt="Summarist Logo" />
          </figure>
        </div>
        <div className={styles.sidebar__wrapper}>
          <div className={styles.sidebar__top}>
            {linksTop.map(renderLink)}
            {showFontSizeControls && (
              <div
                className={`${styles.sidebar__link__wrapper} ${styles.sidebar__font__size__wrapper}`}
              >
                {["small", "medium", "large", "xlarge"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFontSizeClick(size)}
                    className={`${styles.sidebar__link__text} ${
                      styles.sidebar__font__size__icon
                    } ${
                      activeTab === size
                        ? styles.sidebar__font__size__active
                        : ""
                    }`}
                  >
                    <RiFontSize
                      className={styles[`font__size__icon__${size}`]}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className={styles.sidebar__bottom} style={{ marginBottom: bottomOffset }}>
            {linksBottom.map(renderLink)}
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
