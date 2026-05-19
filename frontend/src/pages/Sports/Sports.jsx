import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Sports.css";

const heroSlides = [
  { src: "/basket2.png", alt: "Basketball" },
  { src: "/s4.png", alt: "Table Tennis" },
  { src: "/s10.png", alt: "Badminton" },
];

const eventsData = [
  { date: "2026-02-10", label: "10 Feb 2026", title: "Badminton Championship", desc: "Campus-wide badminton tournament for singles and doubles categories.", img: "/bad3.png", alt: "Badminton" },
  { date: "2026-02-20", label: "20 Feb 2026", title: "Basketball League", desc: "Fast-paced inter-department basketball matches with 3v3 and 5v5 formats.", img: "/basket3.png", alt: "Basketball" },
  { date: "2026-04-25", label: "25 April 2026", title: "Football Tournament", desc: "Thrilling football matches between university teams from across the region.", img: "/foot3.png", alt: "Football" },
  { date: "2026-04-28", label: "28 April 2026", title: "Cricket Tournament", desc: "Exciting cricket tournament between student department teams.", img: "/cricket3.png", alt: "Cricket" },
  { date: "2026-05-15", label: "15 May 2026", title: "Volleyball Championship", desc: "Mixed and open category volleyball tournaments across all departments.", img: "/s9.png", alt: "Volleyball" },
  { date: "2026-05-22", label: "22 May 2026", title: "Table Tennis Open", desc: "Indoor table tennis competitions for singles and doubles categories.", img: "/s4.png", alt: "Table Tennis" },
];

const sportsGrid = [
  { img: "/s3.png", alt: "Pickleball", name: "Pickleball", desc: "Fast paced paddle sport gaining popularity on campus.", side: "left" },
  { img: "/s10.png", alt: "Badminton", name: "Badminton", desc: "Indoor courts for competitive matches and practice.", side: "right" },
  { img: "/foot2.png", alt: "Football", name: "Football", desc: "Full-size ground hosting inter-university tournaments.", side: "left" },
  { img: "/basket2.png", alt: "Basketball", name: "Basketball", desc: "Exciting inter-department basketball leagues.", side: "right" },
  { img: "/chess2.png", alt: "Chess", name: "Chess", desc: "Strategic board game competitions hosted at university and national level.", side: "left" },
  { img: "/s9.png", alt: "Volleyball", name: "Volleyball", desc: "Mixed and open category volleyball tournaments across all departments.", side: "right" },
  { img: "/s4.png", alt: "Table Tennis", name: "Table Tennis", desc: "Indoor table tennis competitions for singles and doubles categories.", side: "left" },
  { img: "/s1.png", alt: "Cricket", name: "Cricket", desc: "University cricket ground hosting state-level tournaments.", side: "right" },
];

const galleryImgs = [
  "/s8.png", "/s9.png", "/s2.png", "/s7.png", "/s5.png", "/s4.png",
  "/s6.png", "/s5.png", "/s7.png", "/s2.png", "/s9.png", "/s8.png",
];

const today = new Date();
function isPast(dateStr) {
  return new Date(dateStr) < today;
}

export default function Sports() {
  const slideIdx = useRef(0);
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const slides = slidesRef.current;
    const dots = dotsRef.current;
    const interval = setInterval(() => {
      slides[slideIdx.current]?.classList.remove("active");
      dots[slideIdx.current]?.classList.remove("active");
      slideIdx.current = (slideIdx.current + 1) % heroSlides.length;
      slides[slideIdx.current]?.classList.add("active");
      dots[slideIdx.current]?.classList.add("active");
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

  useEffect(() => {
    const boxes = document.querySelectorAll(".sp-sport-box");
    const onScroll = () => {
      boxes.forEach(box => {
        if (box.getBoundingClientRect().top < window.innerHeight - 100)
          box.classList.add("show");
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allEvents = [...eventsData, ...eventsData];

  return (
    <div className="sp-wrap">



      {/* HERO */}
      <section className="sp-hero">
        <div className="sp-hero-slider">
          {heroSlides.map((s, i) => (
            <img
              key={i}
              ref={el => slidesRef.current[i] = el}
              className={`sp-slide${i === 0 ? " active" : ""}`}
              src={s.src}
              alt={s.alt}
            />
          ))}
        </div>
        <div className="sp-hero-content">
          <div className="sp-hero-tag">⚡ Sports Events</div>
          <h1>Compete.<br /><span>Win. Repeat.</span></h1>
          <p>From the football ground to the basketball court — Chitkara's sports culture pushes every student to their limits.</p>
          <div>
            <button onClick={() => document.querySelector(".sp-events-section").scrollIntoView({ behavior: "smooth" })}>
              Explore Events ↓
            </button>
          </div>
        </div>
        <div className="sp-hero-dots">
          {heroSlides.map((_, i) => (
            <div
              key={i}
              ref={el => dotsRef.current[i] = el}
              className={`sp-dot${i === 0 ? " active" : ""}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="sp-section sp-events-section">
        <div className="sp-section-title">
          <h2>Sports <span>Events</span></h2>
          <div className="sp-divider"></div>
          <p>Register before seats fill up</p>
        </div>
        <div className="sp-events-slider">
          <div className="sp-events-track">
            {allEvents.map((ev, i) => {
              const past = isPast(ev.date);
              return (
                <div key={i} className={`sp-event-card${past ? " past-event" : ""}`} data-date={ev.date}>
                  <div className="sp-event-img">
                    <img src={ev.img} alt={ev.alt} />
                  </div>
                  <div className="sp-event-info">
                    <span className="sp-event-date">{ev.label}</span>
                    <h3>{ev.title}</h3>
                    <p>{ev.desc}</p>
                    <button className="sp-reg-btn" disabled={past} onClick={() => {
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

      {/* SPIRIT SECTION */}
      <section className="sp-dsw-section">
        <h2>Building <span>Strength, Spirit & Teamwork</span></h2>
        <p>At Chitkara University, students are encouraged to actively participate in a wide range of sports events and tournaments. From competitive team games to individual strength and strategy sports, these events promote discipline, teamwork and a healthy lifestyle across the campus.</p>
      </section>

      {/* SPORTS GRID */}
      <section className="sp-sports-grid-section">
        <div className="sp-section-title">
          <h2>Sports Available at <span>Chitkara</span></h2>
          <div className="sp-divider"></div>
          <p>World-class facilities for every sport</p>
        </div>
        <div className="sp-sports-grid">
          {sportsGrid.map((s, i) => (
            <div key={i} className={`sp-sport-box ${s.side}`}>
              <img src={s.img} alt={s.alt} />
              <div className="sp-sport-overlay">
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="sp-gallery-section">
        <div className="sp-section-title">
          <h2>Memories From <span>Sports Events</span></h2>
          <div className="sp-divider"></div>
        </div>
        <div className="sp-gallery-slider">
          <div className="sp-gallery-track">
            {galleryImgs.map((src, i) => (
              <img key={i} src={src} alt="" />
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}