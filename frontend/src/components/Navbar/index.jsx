import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`global-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/home" className="logo-section">
          <img src="/LOGO2.png" alt="Chitkara Logo" className="nav-logo" />
          <div className="uni-name">
            <span className="main-name">CHITKARA</span>
            <span className="sub-name">UNIVERSITY</span>
          </div>
        </Link>
        
        <nav className="nav-links">
          <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </nav>

        <div className="nav-actions">
          {username ? (
            <Link to="/profile" className="profile-btn logged-in">
              <span className="avatar-circle">{username.charAt(0).toUpperCase()}</span>
              {username}
            </Link>
          ) : (
            <Link to="/" className="profile-btn login-btn">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
