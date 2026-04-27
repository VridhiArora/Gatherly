import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/LOGO2.png" alt="Chitkara Logo" />
              <div className="brand-text">
                <span className="main-name">CHITKARA</span>
                <span className="sub-name">UNIVERSITY</span>
              </div>
            </div>
            <p className="brand-desc">
              Gatherly is the centralized hub for all university events. 
              Discover, register, and experience campus life like never before.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-group">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="footer-group">
              <h4>Categories</h4>
              <ul>
                <li><Link to="/technical">Technical</Link></li>
                <li><Link to="/sports">Sports</Link></li>
                <li><Link to="/cultural">Cultural</Link></li>
                <li><Link to="/hostel">Hostel</Link></li>
              </ul>
            </div>
            <div className="footer-group">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#" aria-label="Instagram">Instagram</a>
                <a href="#" aria-label="LinkedIn">LinkedIn</a>
                <a href="#" aria-label="Twitter">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Gatherly | Chitkara University. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
