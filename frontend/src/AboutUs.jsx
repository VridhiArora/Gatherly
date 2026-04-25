import "./AboutUs.css";
import { Link } from "react-router-dom";

const features = [
  { icon: "🏛️", title: "Centralized Event Hub",   desc: "All university events — technical, cultural, sports, hostel and more — on one single platform. No more missing out." },
  { icon: "🎟️", title: "Smart Registration",       desc: "Register with real-time seat tracking. System auto-updates availability and closes registration when seats are full." },
  { icon: "🏆", title: "Club-wise Organization",   desc: "Events organized club-by-club — GFG, IEEE, Vibin'z, ISTE and more — so you explore based on your interests." },
  { icon: "🔒", title: "Secure Authentication",    desc: "Students log in with Roll No and credentials. Each user gets a profile to track all their registered events." },
  { icon: "📅", title: "Live Event Status",        desc: "Events auto-update to Upcoming, Ongoing or Completed — keeping every student always in the loop." },
  { icon: "🌟", title: "Featured Highlights",      desc: "Major events like Love Fest, celebrity visits and fests are prominently showcased on the homepage." },
];

const steps = [
  { num: "1", title: "Register & Login",  desc: "Create your account using Roll No and credentials." },
  { num: "2", title: "Browse Events",     desc: "Explore events club-wise or from homepage highlights." },
  { num: "3", title: "View Details",      desc: "Check date, venue, description and seat availability." },
  { num: "4", title: "Register",          desc: "Click register — system checks seats instantly." },
  { num: "5", title: "Confirmation",      desc: "Seat booked! Count updates automatically." },
  { num: "6", title: "Attend & Enjoy",    desc: "After the event, it moves to completed history." },
];

const team = [
  { img: "/female.png",   name: "Vridhi Arora", branch: "B.E. CSE" },
  { img: "/male.png", name: "Vikas Kumar",     branch: "B.E. CSE" },
  { img: "/female.png",   name: "Vanshika Chauhan" ,  branch: "B.E. CSE" },
  { img: "/male.png", name: "Vishrut Kathwal",     branch: "B.E. CSE" },
];

export default function AboutUs() {
  return (
    <div className="aboutus-wrap">

      {/* NAVBAR */}
      <header>
        <div className="logo-section">
          <img src="/LOGO2.png" alt="Chitkara Logo" />
          <div className="uni-name">
            <span className="main-name">CHITKARA</span>
            <span className="sub-name">UNIVERSITY</span>
          </div>
        </div>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/contact">Contact Us</Link>
          <a href="#">About Us</a>
        </nav>
      </header>

      {/* HERO — purple gradient, no video */}
      <div className="aboutus-hero">
        <div className="aboutus-hero-content">
          <h3>Welcome to Chitkara University</h3>
          <h1>About <span>Gatherly</span></h1>
          <p>Your Campus. Your Events. Your Vibe.</p>
          <div className="about-hero-divider"></div>
        </div>
      </div>

      {/* WHAT IS GATHERLY */}
      <section className="aboutus-section">
        <h2>What is <span>Gatherly?</span></h2>
        <div className="what-grid">
          <div className="what-text">
            <p>
              Gatherly is a centralized web-based event management portal designed exclusively
              for Chitkara University. It solves a real campus problem — events scattered across
              notice boards, WhatsApp groups, Instagram pages and emails, causing students to
              miss opportunities they'd actually love.
            </p>
            <p>
              With Gatherly, every event — whether it's a hackathon by GFG, a Qawwali Night by
              Vibin'z, an IEEE Tech Conference, or a hostel game night — is available in one
              place, organized, easy to browse and simple to register for.
            </p>
            <p>
              Built as a semester project for Chitkara University, Gatherly reflects what a
              modern campus event experience should look like.
            </p>
          </div>
          <div className="what-visual">
            <div className="big-g">G</div>
            <p>Gatherly – University Event Portal</p>
            <p style={{ marginTop: "6px", fontSize: "12px", opacity: "0.35" }}>Chitkara University | 2026</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="aboutus-section alt-bg">
        <h2>Key <span>Features</span></h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="aboutus-section">
        <h2>How It <span>Works</span></h2>
        <div className="workflow">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      

      {/* MISSION */}
      <section className="aboutus-section alt-bg">
        <h2>Our <span>Mission</span></h2>
        <div className="mission-box">
          <h3>"One Platform. Every Event. Every Student."</h3>
          <p>
            Our mission is to eliminate the fragmentation of campus event information and create a
            seamless experience where every Chitkara student can discover, register and celebrate
            every event happening around them — without missing a single moment. Gatherly is not
            just a portal, it's a community hub where campus life truly thrives.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="aboutus-section">
        <h2>Meet the <span>Team</span></h2>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="about-team-card">
              <img src={member.img} alt={member.name} />
              <h4>{member.name}</h4>
              <p className="role">{member.role}</p>
              <p className="branch">{member.branch}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>© 2026 Gatherly | Chitkara University Event Portal</footer>

    </div>
  );
}