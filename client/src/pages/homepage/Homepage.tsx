import "./homepage.css";
import { Link } from "react-router";

export default function Homepage() {
  return (
    <div className="homepage">
      <h1>Module RH</h1>

      <nav>
        <Link to="/conge">Uploader un congé</Link>
        <Link to="/pointage">Uploader un pointage</Link>
      </nav>
    </div>
  );
}
