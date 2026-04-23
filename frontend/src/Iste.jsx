import "./ISTE.css";

const today = new Date();
const isPast = (dateStr) => new Date(dateStr) < today;

const events = [
  { img: "/is1.png", title: "Master Of Creators",  desc: "Competitive programming contest.",        date: "2026-08-20" },
  { img: "/is2.png", title: "Armageddon 26.O",      desc: "National Level Tech Fest.",               date: "2026-08-20" },
  { img: "/is3.png", title: "Mock Interview Drive", desc: "Real interview simulations.",             date: "2026-01-20" },
  { img: "/is4.png", title: "HackTU 7.O",           desc: "A High-Tech National Level Hackathon.",  date: "2026-01-20" },
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

export default function ISTE() {
  return (
    <div className="iste-wrap">

      {/* HEADER */}
      <header>
        <div className="logo-section">
          <img src="/LOGO2.png" alt="Chitkara Logo" />
          <div>
            <div className="main-name">CHITKARA</div>
            <div className="sub-name">UNIVERSITY</div>
          </div>
        </div>
       <nav>
          <a href="/home">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </header>

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
                  <img src={ev.img} alt={ev.title} />
                  <div className="event-info">
                    <h4>{ev.title}</h4>
                    <p>{ev.desc}</p>
                    <button className="register-btn" disabled={past}>
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
      <footer>© 2026 ISTE Student Chapter | Chitkara University</footer>

    </div>
  );
}