import "./ISTE.css";
import { useState, useEffect } from "react";
import { isLoggedIn } from "../../utils/auth";

const today = new Date();
const isPast = (dateStr) => new Date(dateStr) < today;

const getImageUrl = (img) => {
  if (!img) return "/event-placeholder.png";
  return img;
};

const teamMembers = [
  { img: "https://randomuser.me/api/portraits/men/32.jpg",   name: "Aryan Sharma", role: "President" },
  { img: "https://randomuser.me/api/portraits/women/44.jpg", name: "Simran Kaur",  role: "Vice President" },
  { img: "https://randomuser.me/api/portraits/men/51.jpg",   name: "Rahul Verma",  role: "Technical Head" },
  { img: "https://randomuser.me/api/portraits/women/65.jpg", name: "Priya Mehta",  role: "Event Coordinator" },
];

const galleryImgs = [
  "/cn1.png", "/cn2.png", "/cn3.png", "/cn4.png",
  "/cn5.png", "/cn6.png", "/cn7.png", "/cn8.png",
];

export default function ISTE() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events?clubName=Iste")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  return (
    <div className="iste-wrap">

      

      {/* HERO */}
      <section className="iste-hero">
        <div className="hero-left">
          <h1>Shaping Future <br /><span>Engineers</span></h1>
          <p>
            The ISTE Student Chapter at Chitkara University promotes technical
            education, innovation and professional development through workshops,
            seminars and national level conferences.
          </p>
        </div>
        <div className="hero-right">
          <img src="/iste.png" alt="ISTE" />
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
                      window.dispatchEvent(new CustomEvent("open-registration", { detail: { eventTitle: ev.eventName, clubName: "ISTE" } }));
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
        <h2>About <span className="highlight">ISTE Chapter</span></h2>
        <div className="about-section">
          <div className="about-text">
            <p>
              The Indian Society for Technical Education (ISTE) Student Chapter
              focuses on developing strong technical foundations among students
              through seminars, technical competitions and industry collaborations.
            </p>
            <p>
              Our mission is to bridge the gap between academic learning and
              industry requirements by promoting innovation, leadership and
              professional skills.
            </p>
          </div>
          <div className="about-highlights">
            <div className="about-box">📚 Technical Education</div>
            <div className="about-box">💡 Innovation & Research</div>
            <div className="about-box">🎤 Expert Lectures</div>
            <div className="about-box">🏆 Technical Competitions</div>
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
          <p>📧 iste@chitkara.edu.in</p>
          <p>📍 Tech Block – Room 108</p>
          <p>📱 Instagram: @iste_chitkara</p>
        </div>
      </section>

      {/* FOOTER */}


    </div>
  );
}