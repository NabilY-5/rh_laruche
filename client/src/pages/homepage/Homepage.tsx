import "./homepage.css";
import { Link } from "react-router";

export default function Homepage() {
  return (
    <div className="homepage">
      <h1>Module RH</h1>

      <nav>
        <Link to="/pointage">Pointage</Link>
        <Link to="/conge">Congé</Link>
      </nav>
    </div>
  );
}
