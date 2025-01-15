import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="container">
        <ul>
          <li className="WorkoutBuddy">
            <Link to="/">
              <h1>Workout Buddy</h1>
            </Link>
          </li>
          <li>
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </li>
          <li>
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </li>
          <li>
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
