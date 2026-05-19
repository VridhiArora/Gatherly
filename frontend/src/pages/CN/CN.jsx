import "./CN.css";

const today = new Date();

const isPast = (dateStr) => new Date(dateStr) < today;

const events = [
  { img: "/c1.png", title: "Code Sprint", desc: "Competitive programming contest.", date: "2026-08-20" },
  { img: "/c2.png", title: "Mock Interview Drive", desc: "Real interview simulations.", date: "2026-08-20" },
  { img: "/c5.png", title: "Mock Interview Drive", desc: "Real interview simulations.", date: "2024-09-10" },
  { img: "/c3.png", title: "DSA Bootcamp", desc: "Intensive algorithm training.", date: "2024-09-10" },
];

const teamMembers = [
  { img: "https://randomuser.me/api/portraits/men/32.jpg", name: "Aryan Sharma", role: "President" },
  { img: "https://randomuser.me/api/portraits/women/44.jpg", name: "Simran Kaur", role: "Vice President" },
  { img: "https://randomuser.me/api/portraits/men/51.jpg", name: "Rahul Verma", role: "Technical Head" },
  { img: "https://randomuser.me/api/portraits/women/65.jpg", name: "Priya Mehta", role: "Event Coordinator" },
];

const galleryImgs = [
  "/cn1.png", "/cn2.png", "/cn3.png", "/cn4.png",
  "/cn5.png", "/cn6.png", "/cn7.png", "/cn8.png",
];

export default function CodingNinjas() {
  return (
    <div className="cn-wrap">

      

      {/* HERO */}
      <section className="cn-hero">
        <div className="hero-left">
          <h1>
            Empowering The Next Generation <br />
            Of <span>Coders</span>
          </h1>
          <p>
            Coding Ninjas Student Chapter builds strong DSA foundations,
            competitive programming culture and placement readiness
            through structured learning and mentorship.
          </p>
        </div>
        <div className="hero-right">
          <img src="/CN.png" alt="Coding Ninjas" />
        </div>
      </section>

      <div className="hero-divider"></div>

      {/* MAJOR EVENTS */}
      <section>
        <h2>Major <span className="highlight">Events</span></h2>
        <div className="event-slider">
          <div className="event-track">
            {/* Original + Duplicate for infinite loop */}
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
        <h2>About <span className="highlight">Coding Ninjas</span></h2>
        <div className="about-section">
          <div className="about-text">
            <p>The Coding Ninjas Chapter focuses on disciplined coding and deep conceptual clarity.</p>
            <p>We conduct contests, mock interviews and placement bootcamps regularly.</p>
            <p>Our mission is to transform beginners into confident problem solvers ready for top tech companies.</p>
          </div>
          <div className="about-highlights">
            <div className="about-box">💻 Structured DSA Training</div>
            <div className="about-box">🏆 Weekly Contests</div>
            <div className="about-box">🎯 Placement Preparation</div>
            <div className="about-box">🤝 Peer Mentorship</div>
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
          <p>📧 codingninjas@chitkara.edu.in</p>
          <p>📍 Tech Block – Room 108</p>
          <p>📱 Instagram: @cn_chitkara</p>
        </div>
      </section>

      {/* FOOTER */}


    </div>
  );
}