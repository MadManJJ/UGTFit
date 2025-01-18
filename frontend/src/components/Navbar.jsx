import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const handleLinkClick = (path) => {
    if (location.pathname === path) {
      window.location.reload();
    }
  };

  return (
    <header>
      <div className="container">
        <ul>
          <li className="WorkoutBuddy">
            <Link to="/" onClick={() => handleLinkClick("/")}>
              <span className="button-bg"></span>
              <h2>Workout Buddy</h2>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => handleLinkClick("/")}>
              <span className="button-bg"></span>
              <h2>Home</h2>
            </Link>
          </li>
          <li>
            <Link to="/ranking" onClick={() => handleLinkClick("/ranking")}>
              <span className="button-bg"></span>
              <h2>Ranking</h2>
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => handleLinkClick("/login")}>
              <span className="button-bg"></span>
              <h2>Login</h2>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
