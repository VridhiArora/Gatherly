import "./Vibin.css";
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
  "/vv1.png", "/vv2.png", "/vv3.png", "/eve4.png",
  "/vv5.png", "/vv6.png", "/eve6.png", "/eve8.png",
];

export default function Vibin() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events?clubName=Vibin")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  return (
    <div className="vibin-wrap">

      

      {/* HERO */}
      <section className="vibin-hero">
        <div className="hero-left">
          <h1>Feel the Vibe with <br /><span>Vibin'z</span></h1>
          <p className="hero-subtitle">The Ultimate Entertainment Club for Hostellers</p>
        </div>
        <div className="hero-right">
          <img src="/vibin.png" alt="Vibin'z" />
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
                      window.dispatchEvent(new CustomEvent("open-registration", { detail: { eventTitle: ev.eventName, clubName: "Vibin" } }));
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
        <h2>About <span className="highlight">Vibin'z</span></h2>
        <div className="about-section">
          <div className="about-text">
            <p>
              Vibin'z is the entertainment hub for hostellers, bringing students together through
              DJ nights, comedy shows, open mics, games, and unforgettable campus events. We create
              the perfect space to relax, celebrate, and make memories beyond the classroom.
            </p>
          </div>
          <div className="about-highlights">
            <div className="about-box">🎧 DJ Parties</div>
            <div className="about-box">🌟 Starry Nights</div>
            <div className="about-box">🎤 Comedy Shows</div>
            <div className="about-box">🎉 Fests</div>
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
          <p>📧 vibinz@chitkara.edu.in</p>
          <p>📍 Hostel Block – Common Room</p>
          <p>📱 Instagram: @vibinz_chitkara</p>
        </div>
      </section>

      {/* FOOTER */}


    </div>
  );
}