import styles from "@/styles/Login.module.css";
import Image from "next/image";
import google_icon from "@/summarist-home-page-main/assets/google.png";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { login, signup, signInWithGoogle, signInAsGuest } from "@/firebase";

export default function Login({ onClose }) {
  const [signState, setSignState] = useState("Log in to Summarist");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const user_auth = async (event) => {
    event.preventDefault();
    if (signState === "Log in to Summarist") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    onClose();
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    onClose();
  };

  const handleGuestSignIn = async () => {
    await signInAsGuest();
    onClose();
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.login}>
          <div className={styles.login__form}>
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>
            <h1>{signState}</h1>
            <button className={styles.guest__btn} onClick={handleGuestSignIn}>
                <FaRegUser />
                Login as a Guest</button>
            <hr className={styles.hr__text} data-content="OR" />
            <button className={styles.google__btn} onClick={handleGoogleSignIn}>
                <Image src={google_icon} alt="google" className={styles.google__img} />
                Login with Google</button>
            <hr className={styles.hr__text} data-content="OR" />
            <form>
              {signState === "Sign up to Summarist" ? (
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Your Name"
                />
              ) : (
                <></>
              )}
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
              />
              <button className={styles.submit__btn} onClick={user_auth} type="submit">
                {signState}
              </button>
              <div className={styles.form__help}>
                <div className={styles.remember}>
                  <input type="checkbox" />
                  <label htmlFor="">Remember Me</label>
                </div>
                <p>Need Help?</p>
              </div>
            </form>
            <div className={styles.form__switch}>
              {signState === "Log in to Summarist" ? (
                <p>
                  New To Summarist?{" "}
                  <span
                    onClick={() => {
                      setSignState("Sign up to Summarist");
                    }}
                  >
                    Sign Up Now
                  </span>
                </p>
              ) : (
                <p>
                  Already Have Account?{" "}
                  <span
                    onClick={() => {
                      setSignState("Log in to Summarist");
                    }}
                  >
                    Sign In Now
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
