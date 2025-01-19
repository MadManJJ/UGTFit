import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/users/auth/check", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserId(data.userId);
          console.log(data.userId);
        } else {
          console.log("Unauthorized");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    try {
      const response = await fetch("/api/users/logout");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLinkClick = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    }
  };

  const openSidebar = () => {
    document.getElementById("navbar").classList.add("show");
    document
      .getElementById("open-sidebar-button")
      .setAttribute("aria-expanded", "true");
    document.getElementById("navbar").removeAttribute("inert");
  };

  const closeSidebar = () => {
    document.getElementById("navbar").classList.remove("show");
    document
      .getElementById("open-sidebar-button")
      .setAttribute("aria-expanded", "false");
    document.getElementById("navbar").setAttribute("inert", "");
  };

  return (
    <header>
      <button
        id="open-sidebar-button"
        onClick={openSidebar}
        aria-label="open sidebar"
        aria-expanded="false"
        aria-controls="navbar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#c9c9c9"
        >
          <path d="M165.13-254.62q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.86q7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.87q-7.22 7.12-17.9 7.12H165.13Zm0-200.25q-10.68 0-17.9-7.27-7.23-7.26-7.23-17.99 0-10.74 7.23-17.87 7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.27 7.23 7.26 7.23 17.99 0 10.74-7.23 17.87-7.22 7.13-17.9 7.13H165.13Zm0-200.26q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.87q7.22-7.12 17.9-7.12h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.86q-7.22 7.13-17.9 7.13H165.13Z" />
        </svg>
      </button>
      <div className="navbar container" id="navbar">
        <ul>
          <li id="close-sidebar-button">
            <button
              id="close-sidebar-button"
              onClick={closeSidebar}
              aria-label="close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#c9c9c9"
              >
                <path d="m480-444.62-209.69 209.7q-7.23 7.23-17.5 7.42-10.27.19-17.89-7.42-7.61-7.62-7.61-17.7 0-10.07 7.61-17.69L444.62-480l-209.7-209.69q-7.23-7.23-7.42-17.5-.19-10.27 7.42-17.89 7.62-7.61 17.7-7.61 10.07 0 17.69 7.61L480-515.38l209.69-209.7q7.23-7.23 17.5-7.42 10.27-.19 17.89 7.42 7.61 7.62 7.61 17.7 0 10.07-7.61 17.69L515.38-480l209.7 209.69q7.23 7.23 7.42 17.5.19 10.27-7.42 17.89-7.62 7.61-17.7 7.61-10.07 0-17.69-7.61L480-444.62Z" />
              </svg>
            </button>
          </li>
          <li className="WorkoutBuddy">
            <Link to="/" onClick={() => handleLinkClick("/")}>
              <span className="button-bg"></span>
              <h2>Workout Buddy</h2>
            </Link>
          </li>
          <li>
            {isLoggedIn && (
              <Link
                to={`/dashboard/${userId}`}
                onClick={() => handleLinkClick(`/dashboard/${userId}`)}
              >
                <span className="button-bg"></span>
                <h2>Dashboard</h2>
              </Link>
            )}
          </li>
          <li>
            <Link to="/ranking" onClick={() => handleLinkClick("/ranking")}>
              <span className="button-bg"></span>
              <h2>Ranking</h2>
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/" onClick={handleLogout}>
                <span className="button-bg"></span>
                <h2>Logout</h2>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={() => handleLinkClick("/login")}>
                <span className="button-bg"></span>
                <h2>Login</h2>
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div id="overlay" onClick={closeSidebar} aria-hidden="true"></div>
    </header>
  );
}

export default Navbar;
