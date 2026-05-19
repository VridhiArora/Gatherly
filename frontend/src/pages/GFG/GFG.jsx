import { useEffect, useRef } from "react";
import "./GFG.css";

const today = new Date();
const isPast = (dateStr) => new Date(dateStr) < today;

const events = [
  { img: "/g1.png", title: "Innovation in AR/VR Frontier", desc: "Hands On Experience on New Tech Field.", date: "2026-08-20" },
  { img: "/g9.png", title: "Career Canvas", desc: "Intensive workshop.", date: "2026-08-20" },
  { img: "/g8.png", title: "Code Drip", desc: "Industry expert sessions.", date: "2026-08-20" },
  { img: "/g4.png", title: "Meet Your Alumni", desc: "Industry Expert Talk.", date: "2026-01-20" },
  { img: "/g7.png", title: "Web Dev Workshop", desc: "Hands-on development training.", date: "2026-01-20" },
];

const teamMembers = [
  { img: "https://randomuser.me/api/portraits/men/32.jpg", name: "Aryan Sharma", role: "President" },
  { img: "https://randomuser.me/api/portraits/women/44.jpg", name: "Simran Kaur", role: "Vice President" },
  { img: "https://randomuser.me/api/portraits/men/51.jpg", name: "Rahul Verma", role: "Technical Head" },
  { img: "https://randomuser.me/api/portraits/women/65.jpg", name: "Priya Mehta", role: "Event Coordinator" },
];

const galleryImgs = [
  "/gfg1.png", "/gfg2.png", "/gfg3.png", "/gfg4.png", "/gfg5.png",
  "/gfg6.png", "/gfg7.png", "/gfg8.png", "/gfg9.png", "/gfg10.png",
];

export default function GFG() {
  const galleryRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;
      const position = galleryRef.current.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      if (position < screenPosition) {
        galleryRef.current.classList.add("show");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="gfg-wrap">

      

      {/* HERO */}
      <section className="gfg-hero">
        <div className="hero-left">
          <h1>Empowering The Next Generation <br />Of <span>Developers</span></h1>
          <p>GeeksforGeeks Student Chapter at Chitkara University builds coders, innovators and leaders.</p>
        </div>
        <div className="hero-right">
          <img src="/GFG.png" alt="GFG" />
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
                    <button className="register-btn" disabled={past} onClick={() => {
                      const userId = localStorage.getItem("userId");
                      if (!userId) { alert("Please login first!"); return; }
                      window.dispatchEvent(new CustomEvent("open-registration", { detail: { eventTitle: ev.title } }));
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
        <h2>About <span className="highlight">GFG Chapter</span></h2>
        <div className="about-section">
          <div className="about-text">
            <p>The GeeksforGeeks Student Chapter at Chitkara University is a community of passionate developers, competitive programmers and tech enthusiasts. Our mission is to create a strong coding culture on campus by organizing workshops, hackathons, technical bootcamps and industry sessions.</p>
            <p>We focus on building problem-solving skills, improving DSA knowledge, encouraging innovation and preparing students for top tech careers. From beginners to advanced coders — we help everyone grow.</p>
          </div>
          <div className="about-highlights">
            <div className="about-box">🚀 Skill Development</div>
            <div className="about-box">💻 Competitive Programming</div>
            <div className="about-box">🤝 Industry Exposure</div>
            <div className="about-box">🏆 Hackathons & Events</div>
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
        <div className="gallery" ref={galleryRef}>
          {galleryImgs.map((src, i) => (
            <img key={i} src={src} alt={`gallery-${i}`} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section>
        <h2>Contact <span className="highlight">Us</span></h2>
        <div className="contact-box">
          <p>📧 gfg@chitkara.edu.in</p>
          <p>📍 Innovation Block – Room 204</p>
          <p>📱 Instagram: @gfg_chitkara</p>
          <p>💼 LinkedIn: GeeksforGeeks Chitkara University</p>
        </div>
      </section>

      {/* FOOTER */}


    </div>
  );
}