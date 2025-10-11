import styles from "@/styles/Login.module.css";
import Image from "next/image";
import google_icon from "@/summarist-home-page-main/assets/google.png";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  login,
  signup,
  signInWithGoogle,
  signInAsGuest,
  sendPasswordReset,
  auth,
} from "@/firebase";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";

export default function Login({ onClose }) {
  const [signState, setSignState] = useState("Log in to Summarist");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Close modal on Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Helper: get redirect path from sessionStorage
  const getRedirect = () => sessionStorage.getItem("loginRedirect") || "/";

  // Helper: redirect after login and clean up sessionStorage
  const handleRedirect = () => {
    const redirectTo = getRedirect();
    sessionStorage.removeItem("loginRedirect");
    router.push(redirectTo);
  };

  // Email/password login or signup
  const handleUserAuth = async (event) => {
    event.preventDefault();
    try {
      if (signState === "Log in to Summarist") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }

      // Wait for Firebase auth state to ensure login is complete
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          onClose?.();
          handleRedirect();
          unsubscribe();
        }
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Google login
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          onClose?.();
          handleRedirect();
          unsubscribe();
        }
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Guest login
  const handleGuestSignIn = async () => {
    try {
      await signInAsGuest();

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          onClose?.();
          handleRedirect();
          unsubscribe();
        }
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Password reset
  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your email to reset password.");
    try {
      await sendPasswordReset(email);
      alert("Password reset link sent! Check your email.");
      onClose?.();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.login}>
        <div className={styles.login__form}>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
          <h1>{signState}</h1>

          {/* Guest login */}
          <button className={styles.guest__btn} onClick={handleGuestSignIn}>
            <FaRegUser />
            Login as a Guest
          </button>

          <hr className={styles.hr__text} data-content="OR" />

          {/* Google login */}
          <button className={styles.google__btn} onClick={handleGoogleSignIn}>
            <Image
              src={google_icon}
              alt="google"
              className={styles.google__img}
            />
            Login with Google
          </button>

          <hr className={styles.hr__text} data-content="OR" />

          {/* Email/password form */}
          <form onSubmit={handleUserAuth}>
            {signState === "Sign up to Summarist" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your Name"
                required
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
            <button className={styles.submit__btn} type="submit">
              {signState}
            </button>
            <div className={styles.form__help}>
              <div className={styles.remember}>
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              {signState === "Log in to Summarist" && (
                <p>
                  <span onClick={handleForgotPassword}>Forgot Password?</span>
                </p>
              )}
            </div>
          </form>

          {/* Switch login/sign up */}
          <div className={styles.form__switch}>
            {signState === "Log in to Summarist" ? (
              <p>
                New To Summarist?{" "}
                <span onClick={() => setSignState("Sign up to Summarist")}>
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p>
                Already Have Account?{" "}
                <span onClick={() => setSignState("Log in to Summarist")}>
                  Sign In Now
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}