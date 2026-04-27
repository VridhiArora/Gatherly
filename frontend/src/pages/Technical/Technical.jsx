import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Technical.css";

const heroSlides = [
  { src: "/eve9.png", alt: "Tech 1" },
  { src: "/tech2.png", alt: "Tech 2" },
  { src: "/tech3.png", alt: "Tech 3" },
];

const eventsData = [
  { date: "2026-02-10", label: "10 Feb 2026", title: "Code Drip", desc: "Industry expert sessions.", img: "/g8.png" },
  { date: "2026-02-28", label: "28 Feb 2026", title: "Code Sprint", desc: "Competitive programming contest.", img: "/c1.png" },
  { date: "2026-04-10", label: "10 April 2026", title: "HackTU 7.O", desc: "A High-Tech National Level Hackathon.", img: "/is4.png" },
  { date: "2026-04-22", label: "22 April 2026", title: "Career Canvas", desc: "Intensive workshop.", img: "/g9.png" },
  { date: "2026-05-15", label: "15 May 2026", title: "Hack With Her 4.O", desc: "24-hour hackathon for girls.", img: "/ie3.png" },
];

const reviewsData = [
  {
    tag: "AI / ML Talk", img: "/tech3.png", stars: "★★★★★",
    quote: '"The AI lecture explained the future so clearly."',
    backText: "The AI lecture gave us deeper insights into machine learning applications used in real industry projects. It completely changed how I think about building software. Truly eye-opening!",
    avatar: "/male.png", name: "Aryan Sharma", info: "CSE • 3rd Year", backStars: "★★★★★",
  },
  {
    tag: "Blockchain", img: "/tech1.png", stars: "★★★★★",
    quote: '"Blockchain finally made complete sense."',
    backText: "The blockchain masterclass simplified decentralized technology with practical real-world examples. Concepts I had struggled with for months finally clicked. Best session of the semester!",
    avatar: "/female.png", name: "Priya Singh", info: "CSE • 2nd Year", backStars: "★★★★★",
  },
  {
    tag: "Cybersecurity", img: "/tech5.png", stars: "★★★★☆",
    quote: '"Cybersecurity conference felt incredibly real."',
    backText: "The cybersecurity conference helped us understand ethical hacking and modern digital defense strategies in a hands-on way. I left feeling genuinely prepared for real-world challenges.",
    avatar: "/male.png", name: "Rahul Mehta", info: "IT • 4th Year", backStars: "★★★★☆",
  },
  {
    tag: "HackTU 7.0", img: "/iee9.png", stars: "★★★★★",
    quote: '"HackTU pushed my limits like nothing before."',
    backText: "24 hours of pure adrenaline. Our team built something we never thought possible. The mentors were incredible and the energy on campus was electric throughout the night.",
    avatar: "/male.png", name: "Karan Verma", info: "CSE • 3rd Year", backStars: "★★★★★",
  },
  {
    tag: "Code Sprint", img: "/cn5.png", stars: "★★★★★",
    quote: '"Code Sprint sharpened my problem solving completely."',
    backText: "The competitive environment of Code Sprint really challenged me to think faster and smarter. Competing against students from other colleges was a great learning experience overall.",
    avatar: "/female.png", name: "Simran Kaur", info: "CSE • 2nd Year", backStars: "★★★★★",
  },
  {
    tag: "Career Canvas", img: "/gfg8.png", stars: "★★★★★",
    quote: '"Career Canvas gave me clarity about my future path."',
    backText: "The workshop had industry professionals who gave real, actionable advice. I left with a clear roadmap for my career and connections I'll carry throughout my professional life.",
    avatar: "/male.png", name: "Aditya Nair", info: "IT • 3rd Year", backStars: "★★★★★",
  },
];

const galleryImgs = [
  "/tech6.png", "/tech7.png", "/tech8.png", "/tech9.png",
  "/tech10.png", "/tech2.png", "/tech5.png", "/gfg8.png",
  "/tech6.png", "/tech7.png", "/tech8.png", "/tech9.png",
  "/tech10.png", "/tech2.png", "/tech5.png", "/gfg8.png",
];

const today = new Date();
function isPast(dateStr) { return new Date(dateStr) < today; }

export default function Technical() {
  const slideIdx = useRef(0);
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      slidesRef.current[slideIdx.current]?.classList.remove("active");
      dotsRef.current[slideIdx.current]?.classList.remove("active");
      slideIdx.current = (slideIdx.current + 1) % heroSlides.length;
      slidesRef.current[slideIdx.current]?.classList.add("active");
      dotsRef.current[slideIdx.current]?.classList.add("active");
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function goToSlide(n) {
    slidesRef.current[slideIdx.current]?.classList.remove("active");
    dotsRef.current[slideIdx.current]?.classList.remove("active");
    slideIdx.current = n;
    slidesRef.current[n]?.classList.add("active");
    dotsRef.current[n]?.classList.add("active");
  }

  const allEvents = [...eventsData, ...eventsData];

  return (
    <div className="te-wrap">



      {/* HERO */}
      <section className="te-hero">
        <div className="te-hero-slider">
          {heroSlides.map((s, i) => (
            <img key={i} ref={el => slidesRef.current[i] = el}
              className={`te-slide${i === 0 ? " active" : ""}`}
              src={s.src} alt={s.alt} />
          ))}
        </div>
        <div className="te-hero-content">
          <div className="te-hero-tag">Technical Events</div>
          <h1>Exploring <span>Technology</span><br />Beyond The Classroom</h1>
          <p>Guest lectures, conferences and workshops that expose students to emerging technologies like AI, blockchain and cybersecurity.</p>
          <div>
            <button onClick={() => document.querySelector(".te-events-section").scrollIntoView({ behavior: "smooth" })}>
              Explore Events ↓
            </button>
          </div>
        </div>
        <div className="te-hero-dots">
          {heroSlides.map((_, i) => (
            <div key={i} ref={el => dotsRef.current[i] = el}
              className={`te-dot${i === 0 ? " active" : ""}`}
              onClick={() => goToSlide(i)} />
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="te-section te-events-section">
        <div className="te-section-title">
          <h2>Technical <span>Events</span></h2>
          <div className="te-divider"></div>
          <p>Experiences and insights gained by students after attending expert lectures and technical conferences.</p>
        </div>
        <div className="te-events-slider">
          <div className="te-events-track">
            {allEvents.map((ev, i) => {
              const past = isPast(ev.date);
              return (
                <div key={i} className={`te-event-card${past ? " past-event" : ""}`}>
                  <div className="te-event-img-wrap"><img src={ev.img} alt={ev.title} /></div>
                  <div className="te-event-info">
                    <span className="te-event-date">{ev.label}</span>
                    <h3>{ev.title}</h3>
                    <p>{ev.desc}</p>
                    <button className="te-reg-btn" disabled={past}>
                      {past ? "Event Expired" : "Register"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH STRIP */}
      <section className="te-tech-strip">
        <h2>Learning From <span>Industry Leaders</span></h2>
        <p>Technical events bring global experts and professionals to campus to share insights on emerging technologies. These sessions bridge the gap between classroom learning and real-world innovation.</p>
      </section>

      {/* STUDENT REVIEWS */}
      <section className="te-reviews-section">
        <div className="te-section-title">
          <h2>Student <span>Reviews</span></h2>
          <div className="te-divider"></div>
          <p>Students sharing their experiences after attending technical talks, industry lectures and conferences.</p>
        </div>
        <div className="te-reviews-grid">
          {reviewsData.map((r, i) => (
            <div key={i} className="te-review-card">
              <div className="te-review-inner">
                {/* FRONT */}
                <div className="te-review-front">
                  <div className="te-review-event-tag">{r.tag}</div>
                  <div className="te-review-img"><img src={r.img} alt={r.tag} /></div>
                  <div className="te-big-quote">"</div>
                  <div className="te-review-front-body">
                    <div className="te-stars">{r.stars}</div>
                    <h4>{r.quote}</h4>
                  </div>
                </div>
                {/* BACK */}
                <div className="te-review-back">
                  <div>
                    <div className="te-back-quote-icon">"</div>
                    <div className="te-back-event-tag">{r.tag}</div>
                    <p className="te-back-review-text">{r.backText}</p>
                  </div>
                  <div>
                    <div className="te-review-divider"></div>
                    <div className="te-reviewer">
                      <div className="te-reviewer-img"><img src={r.avatar} alt={r.name} /></div>
                      <div className="te-reviewer-info">
                        <h5>{r.name}</h5>
                        <span>{r.info}</span>
                        <div className="te-back-stars">{r.backStars}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="te-gallery">
        <div className="te-section-title">
          <h2>Technical <span>Moments</span></h2>
          <div className="te-divider"></div>
        </div>
        <div className="te-gallery-slider">
          <div className="te-gallery-track">
            {galleryImgs.map((src, i) => <img key={i} src={src} alt="" />)}
          </div>
        </div>
      </section>



    </div>
  );
}