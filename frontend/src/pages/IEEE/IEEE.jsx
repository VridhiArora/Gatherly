import "./IEEE.css";
import { useState, useEffect } from "react";
import { isLoggedIn } from "../../utils/auth";

const today = new Date();
const isPast = (dateStr) => new Date(dateStr) < today;

const getImageUrl = (img) => {
  if (!img) return "/event-placeholder.png";
  return img;
};

const teamMembers = [
  { img: "https://randomuser.me/api/portraits/men/22.jpg", name: "Rohan Mehta", role: "Chairperson" },
  { img: "https://randomuser.me/api/portraits/women/33.jpg", name: "Ananya Gupta", role: "Vice Chair" },
  { img: "https://randomuser.me/api/portraits/men/41.jpg", name: "Kunal Sharma", role: "Technical Lead" },
  { img: "https://randomuser.me/api/portraits/women/52.jpg", name: "Meera Kapoor", role: "Event Head" },
];

const galleryImgs = [
  "/iee1.png", "/iee2.png", "/iee3.png", "/iee4.png",
  "/iee5.png", "/iee6.png", "/iee7.png", "/iee8.png",
];

export default function IEEE() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events?clubName=IEEE")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  return (
    <div className="ieee-wrap">

      

      {/* HERO */}
      <section className="ieee-hero">
        <div className="hero-left">
          <h1>
            Advancing Technology For <br />
            <span>Humanity</span>
          </h1>
          <p>
            IEEE Student Chapter promotes innovation, research and technical excellence
            through conferences, workshops and collaborative projects.
          </p>
        </div>
        <div className="hero-right">
          <img src="/ieee.png" alt="IEEE" />
        </div>
      </section>

      <div className="hero-divider"></div>

      {/* MAJOR EVENTS */}
      <section>
        <h2>Major <span className="highlight">Events</span></h2>
        <div className="event-slider">
          <div className="event-track">
            {[...events, ...events].map((ev, i) => {
              const past = isPast(ev.date);
              return (
                <div key={i} className={`event-card${past ? " past-event" : ""}`}>
                  <img src={getImageUrl(ev.img)} alt={ev.eventName} />
                  <div className="event-info">
                    <h4>{ev.eventName}</h4>
                    <p>{ev.description}</p>
                    <button className="register-btn" disabled={past} onClick={() => {
                      if (!isLoggedIn()) { alert("Please login first!"); return; }
                      window.dispatchEvent(new CustomEvent("open-registration", { detail: { eventTitle: ev.eventName, clubName: "IEEE" } }));
                    }}>
                      {past ? "Event Ended" : "Register Now"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section>
        <h2>About <span className="highlight">IEEE Chapter</span></h2>
        <div className="about-section">
          <div className="about-text">
            <p>The IEEE Student Chapter at Chitkara University is dedicated to fostering technical growth and research culture.</p>
            <p>We organize national conferences, robotics expos, AI summits and industry-led seminars.</p>
            <p>Our goal is to bridge the gap between academics and real-world engineering challenges.</p>
          </div>
          <div className="about-highlights">
            <div className="about-box">⚡ Technical Conferences</div>
            <div className="about-box">🤖 Robotics & AI</div>
            <div className="about-box">📡 Research Projects</div>
            <div className="about-box">🌍 Global Networking</div>
          </div>
        </div>
      </section>

      {/* CORE TEAM */}
      <section>
        <h2>Core <span className="highlight">Team</span></h2>
        <div className="team">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-card">
              <img src={member.img} alt={member.name} />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section>
        <h2>Event <span className="highlight">Gallery</span></h2>
        <div className="gallery">
          {galleryImgs.map((src, i) => (
            <img key={i} src={src} alt={`gallery-${i}`} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section>
        <h2>Contact <span className="highlight">Us</span></h2>
        <div className="contact-box">
          <p>📧 ieee@chitkara.edu.in</p>
          <p>📍 Engineering Block – Room 305</p>
          <p>📱 Instagram: @ieee_chitkara</p>
        </div>
      </section>

      {/* FOOTER */}


    </div>
  );
}