import "./Vibin.css";

const today = new Date();
const isPast = (dateStr) => new Date(dateStr) < today;

const events = [
  { img: "/qwali.jpeg", title: "Mehfil-E-Qawwali", desc: "A Night full of Love and Music.", date: "2026-08-20" },
  { img: "/v2.png",     title: "Infinia 2026",      desc: "A Starry Night.",               date: "2026-08-20" },
  { img: "/v1.png",     title: "Love Fest",          desc: "Valentine's Special.",          date: "2026-08-20" },
  { img: "/v3.png",     title: "WISH DJ",            desc: "A PowerPack Energetic Night.",  date: "2026-01-20" },
  { img: "/v4.png",     title: "Dil Se Dil Tak",     desc: "An Evening full of Love & Shayari's.", date: "2026-01-20" },
];

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
  return (
    <div className="vibin-wrap">

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
      <footer>© 2026 Vibin'z Club | Chitkara University</footer>

    </div>
  );
}