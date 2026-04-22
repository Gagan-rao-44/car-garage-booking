import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT SECTION */}
        <div className="footer-section">
          <h2 className="footer-logo">GarageBook</h2>
          <p className="footer-desc">
            Book trusted car services easily. Fast, reliable, and hassle-free
            experience for your vehicle care.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>Oil Change</li>
            <li>Car Wash</li>
            <li>Engine Repair</li>
            <li>Brake Service</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: support@garagebook.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: India</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GarageBook. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;