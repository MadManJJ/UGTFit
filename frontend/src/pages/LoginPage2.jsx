import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage2.module.css";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const LoginPage2 = () => {
  const navigate = useNavigate();

  const { apiBaseUrl } = useWorkoutsContext();

  const containerRef = useRef(null);
  const registerBtnRef = useRef(null);
  const loginBtnRef = useRef(null);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    const registerBtn = registerBtnRef.current;
    const loginBtn = loginBtnRef.current;

    const handleRegisterToggle = () => container.classList.add(styles.active);
    const handleLoginToggle = () => container.classList.remove(styles.active);

    registerBtn.addEventListener("click", handleRegisterToggle);
    loginBtn.addEventListener("click", handleLoginToggle);

    return () => {
      registerBtn.removeEventListener("click", handleRegisterToggle);
      loginBtn.removeEventListener("click", handleLoginToggle);
    };
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful");
        console.log(data.message);
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterError("");
        window.location.reload();
      } else {
        console.log("Registration failed");
        console.log(data.message);
        setRegisterError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.user._id);
        console.log("Login successful");
        console.log(data.message);
        setLoginEmail("");
        setLoginPassword("");
        setLoginError("");
        navigate(`/dashboard/${data.user._id}`);
      } else {
        console.log("Login failed");
        console.log(data.message);
        setLoginError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Sign Up Form */}
      <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
        <form onSubmit={handleRegisterSubmit}>
          <h1>Create Account</h1>
          {/* <div className={styles["social-icons"]}>
            <a href="#" className={styles.icon}>
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className={styles.icon}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={styles.icon}>
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className={styles.icon}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div> */}
          {/* <span>or use your email for registration</span> */}
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          {registerError && <div className={styles.error}>{registerError}</div>}
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className={`${styles["form-container"]} ${styles["sign-in"]}`}>
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign In</h1>
          {/* <div className={styles["social-icons"]}>
            <a href="#" className={styles.icon}>
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className={styles.icon}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={styles.icon}>
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className={styles.icon}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div> */}
          {/* <span>or use your email password</span> */}
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          {loginError && <div className={styles.error}>{loginError}</div>}
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className={styles["toggle-container"]}>
        <div className={styles.toggle}>
          <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className={styles.hidden} ref={loginBtnRef}>
              Sign In
            </button>
          </div>
          <div
            className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
          >
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button className={styles.hidden} ref={registerBtnRef}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage2;
