import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate()
  const username = localStorage.getItem("username")

  const [showForm, setShowForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState("")
  const [formData, setFormData] = useState({ name: "", rollno: "", email: "", phone: "" })
  const [formMsg, setFormMsg] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight - 100;
      document.querySelectorAll(".gallery-item").forEach((img, index) => {
        if (img.getBoundingClientRect().top < triggerPoint) {
          setTimeout(() => img.classList.add("show"), index * 200);
        }
      });
      document.querySelectorAll(".review-card").forEach((card, index) => {
        if (card.getBoundingClientRect().top < triggerPoint) {
          setTimeout(() => card.classList.add("show"), index * 300);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function openForm(eventTitle) {
    const userId = localStorage.getItem("userId")
    if (!userId) { alert("Please login first!"); return }
    setSelectedEvent(eventTitle)
    setFormData({
      name: localStorage.getItem("username") || "",
      rollno: localStorage.getItem("rollno") || "",
      email: "",
      phone: ""
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
          username: formData.name,
          rollno: formData.rollno,
          email: formData.email,
          phone: formData.phone,
          eventName: selectedEvent
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

  const categories = [
    { href: "/technical", img: "./tech.png", label: "Technical" },
    { href: "/cultural", img: "./culture.png", label: "Cultural" },
    { href: "/sports", img: "./game.png", label: "Sports" },
    { href: "/hostel", img: "https://images.unsplash.com/photo-1506157786151-b8491531f063", label: "Hostel Events" },
  ];

  const clubs = [
    { href: "/gfg", img: "/GFG.png", name: "GeeksforGeeks" },
    { href: "/cn", img: "/CN.png", name: "Coding Ninjas" },
    { href: "/ieee", img: "/ieee.png", name: "IEEE" },
    { href: "/vibin", img: "/vibin.png", name: "Vibin'z" },
    { href: "/bitsnbytes", img: "/bb4.png", name: "Bits N Bytes" },
    { href: "/iste", img: "/iste.png", name: "ISTE" },
  ];

  const eventsRow1 = [
    { img: "./harsh.png", title: "StandUp 2026", club: "Organized by: Vibin'z", time: "10 March 2026 | 2:00 PM", desc: "Standup Comedy By Harsh Gujral." },
    { img: "./qwali.jpeg", title: "Qwali Night", club: "Organized by: Vibin'z Club", time: "20 March 2026 | 6:00 PM", desc: "Music, dance and unforgettable performances under the stars." },
    { img: "./ieeevent.png", title: "IEEE Tech Conference", club: "Organized by: IEEE", time: "25 March 2026 | 11:00 AM", desc: "Industry experts discussing future trends in AI & Robotics." },
  ];

  const eventsRow2 = [
    { img: "./acm.png", title: "Hackathon 2026", club: "Organized by: ACM", time: "10 March 2026 | 9:00 AM", desc: "A 24-hour coding competition where innovation meets creativity." },
    { img: "./love.png", title: "Love Fest", club: "Organized by: Vibin'z Club", time: "20 February 2026 | 6:00 PM", desc: "Music, dance and unforgettable performances under the stars." },
    { img: "./g5.png", title: "GFG Tech Conference", club: "Organized by: GeeksForGeeks Club", time: "25 February 2026 | 11:00 AM", desc: "Industry experts discussing future trends in Telecom Industry." },
  ];

  const galleryImages = [
    { src: "./eve.png", cls: "gallery-item" },
    { src: "./eve2.png", cls: "gallery-item tall" },
    { src: "./eve3.png", cls: "gallery-item" },
    { src: "./eve4.png", cls: "gallery-item wide" },
    { src: "./eve5.png", cls: "gallery-item" },
    { src: "./eve6.png", cls: "gallery-item" },
    { src: "./eve7.png", cls: "gallery-item tall" },
    { src: "./eve8.png", cls: "gallery-item" },
    { src: "./eve9.png", cls: "gallery-item wide" },
    { src: "./eve10.png", cls: "gallery-item" },
  ];

  const reviews = [
    { text: '"Hackathon 2026 improved my coding confidence and teamwork skills."', author: "— Aryan Sharma, CSE", dir: "from-left" },
    { text: '"Cultural Night was beautifully organized and full of energy."', author: "— Simran Kaur, MBA", dir: "from-right" },
    { text: '"IEEE Conference helped me understand real industry expectations."', author: "— Rahul Verma, ECE", dir: "from-top" },
    { text: '"Being part of clubs enhanced my leadership and communication skills."', author: "— Mehak Gupta, BBA", dir: "from-bottom" },
  ];

  return (
    <div className="chitkara-wrap">

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
            <h3 style={{ marginBottom: "15px", color: "#c8352e" }}>Register: {selectedEvent}</h3>

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

            {formMsg && <p style={{ color: formMsg.includes("✅") ? "green" : "red", fontSize: "13px" }}>{formMsg}</p>}

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={submitRegistration}
                style={{ flex: 1, padding: "8px", background: "#c8352e", color: "white", border: "none", cursor: "pointer", fontSize: "14px" }}>
                Submit
              </button>
              <button onClick={() => setShowForm(false)}
                style={{ flex: 1, padding: "8px", background: "#666", color: "white", border: "none", cursor: "pointer", fontSize: "14px" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header>
        <div className="logo-section">
          <img src="./LOGO2.png" alt="Chitkara Logo" />
          <div className="uni-name">
            <span className="main-name">CHITKARA</span>
            <span className="sub-name">UNIVERSITY</span>
          </div>
        </div>
        <nav>
          <a href="#">Home</a>
          <a href="contact">Contact Us</a>
          <a href="about">About Us</a>
          {/* PROFILE BUTTON */}
          <Link to="/profile" style={{
            background: "#c8352e", color: "white",
            padding: "6px 14px", borderRadius: "4px",
            textDecoration: "none", fontSize: "14px", fontWeight: "500"
          }}>
            👤 {username || "Profile"}
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <video autoPlay muted loop playsInline>
          <source src="/vid11.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <h3>Welcome to Chitkara University</h3>
          <h1>Gatherly</h1>
          <br />
          <br />
          <h2>Your Campus. Your Events. Your Vibe.</h2>
          <p>Explore, Register &amp; Celebrate!</p>
          <div className="highlight-box">
            <h4>Upcoming Highlight: Qwali Night- 20<sup>th</sup>March</h4>
            <p>Weekend Special</p>
            <button onClick={() => openForm("Qwali Night")}>Register Now</button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <h2>Event Categories</h2>
        <div className="slider-wrapper">
          <div className="slider-track">
            {[...categories, ...categories].map((cat, i) => (
              <a key={i} href={cat.href} className="category">
                <img src={cat.img} alt={cat.label} />
                <span>{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section" style={{ background: "#0f172a", padding: "50px 100px" }}>
        <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", flexWrap: "wrap", gap: "40px" }}>
          {[
            { num: "120+", label: "Events Conducted" },
            { num: "10,000+", label: "Registrations" },
            { num: "35+", label: "Active Clubs" },
            { num: "50+", label: "Guest Speakers" },
          ].map((s, i) => (
            <div key={i}>
              <h1 style={{ color: "white" }}>{s.num}</h1>
              <p style={{ color: "white" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLUBS */}
      <section className="section">
        <h2>Explore Our Clubs</h2>
        <div className="slider-wrapper">
          <div className="slider-track">
            {[...clubs, ...clubs].map((club, i) => (
              <Link key={i} to={club.href} className="club-link">
                <div className="club-card">
                  <img src={club.img} alt={club.name} />
                  <p>{club.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="section">
        <h2>Upcoming Events</h2>
        <div className="events">
          {eventsRow1.map((ev, i) => (
            <div key={i} className="event">
              <div className="event-img"><img src={ev.img} alt={ev.title} /></div>
              <div className="event-content">
                <h4>{ev.title}</h4>
                <p className="club-name">{ev.club}</p>
                <p className="event-time">{ev.time}</p>
                <p className="event-desc">{ev.desc}</p>
                <div className="event-buttons">
                  <button onClick={() => openForm(ev.title)}>Register</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br /><br />
        <div className="events">
          {eventsRow2.map((ev, i) => (
            <div key={i} className="event">
              <div className="event-img"><img src={ev.img} alt={ev.title} /></div>
              <div className="event-content">
                <h4>{ev.title}</h4>
                <p className="club-name">{ev.club}</p>
                <p className="event-time">{ev.time}</p>
                <p className="event-desc">{ev.desc}</p>
                <div className="event-buttons">
                  <button onClick={() => openForm(ev.title)}>Register</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="section" id="gallery">
        <h2>Campus Moments</h2>
        <div className="gallery-grid">
          {galleryImages.map((img, i) => (
            <img key={i} src={img.src} className={img.cls} alt={`campus-${i}`} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="testimonials" style={{ background: "#2a0f0fff" }}>
        <h2 style={{ color: "white" }}>What Students Say</h2>
        <div className="review-grid">
          {reviews.map((rev, i) => (
            <div key={i} className={`review-card ${rev.dir}`}>
              <p>{rev.text}</p>
              <h4>{rev.author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>© 2026 Chitkara University | Event Portal</footer>

    </div>
  );
}