import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-controls">
        <Link to="/privacy">Privacy</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}
