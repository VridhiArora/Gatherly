import { useState } from "react";
import "./BitsNBytes.css";

const today = new Date();
const isPast = (dateStr) => new Date(dateStr) < today;

const events = [
  { img: "/bb1.png", title: "Rang-e-Henna",    desc: "A Fun Event for Girls.",  date: "2026-08-20" },
  { img: "/bb2.png", title: "Next Gen AI Quest", desc: "An Innovation Quest.",   date: "2026-01-20" },
  { img: "/bb3.png", title: "Hirings",           desc: "Join Our Team.",         date: "2026-08-20" },
];

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

export default function BitsNBytes() {



  return (
    <div className="bnb-wrap">



      

      {/* HERO */}
      <section className="bnb-hero">
        <div className="hero-left">
          <h1>Innovate. Build. Rise With <br /><span>Bits N Bytes</span></h1>
          <p>
            Bits N Bytes Club is a community of innovators, coders and tech enthusiasts
            focused on building impactful technology and nurturing future engineers.
          </p>
        </div>
        <div className="hero-right">
          <img src="/bb4.png" alt="Bits N Bytes" />
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
                  <img src={ev.img} alt={ev.title} />
                  <div className="event-info">
                    <h4>{ev.title}</h4>
                    <p>{ev.desc}</p>
                    <button
                      className="register-btn"
                      disabled={past}
                      onClick={() => {
                        if (!past) {
                          const userId = localStorage.getItem("userId");
                          if (!userId) { alert("Please login first!"); return; }
                          window.dispatchEvent(new CustomEvent("open-registration", { detail: { eventTitle: ev.title } }));
                        }
                      }}
                    >
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
        <h2>About <span className="highlight">Bits N Bytes</span></h2>
        <div className="about-section">
          <div className="about-text">
            <p>
              Bits N Bytes Club at Chitkara University is dedicated to fostering innovation,
              technical excellence and collaborative learning among students.
            </p>
            <p>
              The club organizes workshops, coding competitions, hackathons and
              industry sessions to help students gain real-world technical skills.
            </p>
          </div>
          <div className="about-highlights">
            <div className="about-box">💡 Innovation</div>
            <div className="about-box">💻 Coding Culture</div>
            <div className="about-box">⚡ Tech Workshops</div>
            <div className="about-box">🏆 Competitions</div>
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
          <p>📧 bitsnbytes@chitkara.edu.in</p>
          <p>📍 Tech Block – Room 108</p>
          <p>📱 Instagram: @bitsnbytes_chitkara</p>
        </div>
      </section>

      {/* FOOTER */}


    </div>
  );
}