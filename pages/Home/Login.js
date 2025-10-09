import styles from "@/styles/Login.module.css";
import { useEffect, useRef, useState } from "react";
import { login, signup } from "@/firebase";

export default function Login({ onClose }) {
  const [signState, setSignState] = useState("Sign In");
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
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
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
            <form>
              {signState === "Sign Up" ? (
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
              {signState === "Sign In" ? (
                <p>
                  New To Summarist?{" "}
                  <span
                    onClick={() => {
                      setSignState("Sign Up");
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
                      setSignState("Sign In");
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
