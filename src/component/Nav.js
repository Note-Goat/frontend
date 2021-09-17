import {Link} from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/notebook">My Notebooks</Link>
        </li>
        <li>
          <Link to="/new-notebook">New Notebook</Link>
        </li>
        <li>
          <Link to="/account">My Account</Link>
        </li>
      </ul>
    </nav>
  );
}
