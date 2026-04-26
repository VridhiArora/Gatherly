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

  const [showForm, setShowForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState("")
  const [formData, setFormData] = useState({ name: "", rollno: "", email: "", phone: "" })
  const [formMsg, setFormMsg] = useState("")

  function openForm(eventTitle) {
    const userId = localStorage.getItem("userId")
    if (!userId) { alert("Please login first!"); return }
    setSelectedEvent(eventTitle)
    setFormData({
      name:   localStorage.getItem("username") || "",
      rollno: localStorage.getItem("rollno") || "",
      email:  "",
      phone:  ""
    })
    setFormMsg("")
    setShowForm(true)
  }

  async function submitRegistration() {
    const userId = localStorage.getItem("userId")
    if (!formData.name || !formData.rollno || !formData.email) {
      setFormMsg("Please fill all required fields!")
      return
    }
    try {
      const res = await fetch("http://localhost:5000/api/register-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          username:  formData.name,
          rollno:    formData.rollno,
          email:     formData.email,
          phone:     formData.phone,
          eventName: selectedEvent,
          clubName:  "Bits N Bytes"
        })
      })
      const data = await res.json()
      if (res.ok) {
        setFormMsg("✅ Registered Successfully!")
        setTimeout(() => setShowForm(false), 1500)
      } else {
        setFormMsg(data.error || "Registration failed")
      }
    } catch {
      setFormMsg("Server not reachable!")
    }
  }

  return (
    <div className="bnb-wrap">

      {/* REGISTRATION FORM POPUP */}
      {showForm && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.6)", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "white", padding: "30px", borderRadius: "8px",
            width: "350px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
          }}>
            <h3 style={{ marginBottom: "15px", color: "#c8352e" }}>
              Register: {selectedEvent}
            </h3>
            <p style={{ fontSize: "12px", color: "#888", marginBottom: "15px" }}>
              Club: Bits N Bytes
            </p>

            <label style={{ fontSize: "13px", fontWeight: "500" }}>Full Name *</label>
            <input value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#dce6f4", boxSizing: "border-box" }}
            />

            <label style={{ fontSize: "13px", fontWeight: "500" }}>Roll No *</label>
            <input value={formData.rollno}
              onChange={e => setFormData({...formData, rollno: e.target.value})}
              style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#dce6f4", boxSizing: "border-box" }}
            />

            <label style={{ fontSize: "13px", fontWeight: "500" }}>Email *</label>
            <input value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#dce6f4", boxSizing: "border-box" }}
            />

            <label style={{ fontSize: "13px", fontWeight: "500" }}>Phone</label>
            <input value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#dce6f4", boxSizing: "border-box" }}
            />

            {formMsg && (
              <p style={{ color: formMsg.includes("✅") ? "green" : "red", fontSize: "13px" }}>
                {formMsg}
              </p>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={submitRegistration} style={{
                flex: 1, padding: "8px", background: "#c8352e",
                color: "white", border: "none", cursor: "pointer", fontSize: "14px"
              }}>
                Submit
              </button>
              <button onClick={() => setShowForm(false)} style={{
                flex: 1, padding: "8px", background: "#666",
                color: "white", border: "none", cursor: "pointer", fontSize: "14px"
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      

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
                      onClick={() => !past && openForm(ev.title)}
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
      <footer>© 2026 Bits N Bytes Club | Chitkara University</footer>

    </div>
  );
}