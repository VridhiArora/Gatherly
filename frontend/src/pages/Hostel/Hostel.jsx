import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Hostel.css";

const heroSlides = [
  { src: "/eve4.png", alt: "DJ Night" },
  { src: "/cmem.png", alt: "Stand Up" },
  { src: "/abhi.png", alt: "Open Mic" },
];

const eventsData = [
  { date: "2026-09-12", label: "12 Sept 2026", title: "Stand-Up Comedy Night", desc: "A laughter packed evening with comedians performing live inside the hostel common area.", img: "/harsh.png", btn: "View Event" },
  { date: "2026-09-25", label: "25 Sept 2026", title: "DJ Night", desc: "Music, lights and energy as students dance together at the hostel DJ party.", img: "/dj.png", btn: "View Event" },
  { date: "2026-10-02", label: "2 Oct 2026", title: "Qawwali Night", desc: "A soulful musical evening celebrating traditional qawwali performances.", img: "/qwali.jpeg", btn: "View Event" },
  { date: "2026-10-15", label: "15 Oct 2026", title: "Open Mic", desc: "Students showcase poetry, music and storytelling talents.", img: "/open.png", btn: "Register Event" },
  { date: "2026-01-30", label: "30 Jan 2026", title: "Antakshari Night", desc: "A nostalgic musical battle between hostel floors and friends.", img: "/jamm.png", btn: "View Event" },
];

const polaroids = [
  { img: "/uno.png", title: "Late Night Games", desc: "Where conversations stretch till 3AM and friendships grow stronger." },
  { img: "/walk2.png", title: "Evening Walks", desc: "Short walks around campus that somehow turn into deep life talks." },
  { img: "/group.png", title: "Evening Study Sessions", desc: "Assignments, group study and last-minute exam preparation." },
  { img: "/room.png", title: "Roommates", desc: "Strangers at first, family by the end of the semester." },
  { img: "/maggie2.png", title: "Midnight Maggi", desc: "The unofficial hostel meal shared with laughter and stories." },
];

const galleryImgs = [
  "/cmem.png", "/cmem2.png", "/cmem3.png", "/cmem4.png", "/cmem5.png", "/cmem6.png", "/cmem7.png", "/cmem8.png",
  "/cmem.png", "/cmem2.png", "/cmem3.png", "/cmem4.png", "/cmem5.png", "/cmem6.png", "/cmem7.png", "/cmem8.png",
];

const today = new Date();
function isPast(dateStr) { return new Date(dateStr) < today; }

export default function Hostel() {
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
    <div className="ho-wrap">



      {/* HERO */}
      <section className="ho-hero">
        <div className="ho-hero-slider">
          {heroSlides.map((s, i) => (
            <img key={i} ref={el => slidesRef.current[i] = el}
              className={`ho-slide${i === 0 ? " active" : ""}`}
              src={s.src} alt={s.alt} />
          ))}
        </div>
        <div className="ho-hero-content">
          <div className="ho-hero-tag">HOSTEL EVENTS</div>
          <h1>Life In The <span>Hostel</span><br />Beyond The Classroom</h1>
          <p>From DJ nights and stand-up comedy to late night gatherings, hostel life creates memories and friendships that last forever.</p>
          <div>
            <button onClick={() => document.querySelector(".ho-events-section").scrollIntoView({ behavior: "smooth" })}>
              Explore Events ↓
            </button>
          </div>
        </div>
        <div className="ho-hero-dots">
          {heroSlides.map((_, i) => (
            <div key={i} ref={el => dotsRef.current[i] = el}
              className={`ho-dot${i === 0 ? " active" : ""}`}
              onClick={() => goToSlide(i)} />
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="ho-section ho-events-section">
        <div className="ho-section-title">
          <h2>Hostel <span>Events</span></h2>
          <div className="ho-divider"></div>
          <p>Some of the most fun nights happen inside the hostels</p>
        </div>
        <div className="ho-events-slider">
          <div className="ho-events-track">
            {allEvents.map((ev, i) => {
              const past = isPast(ev.date);
              return (
                <div key={i} className={`ho-event-card${past ? " past-event" : ""}`}>
                  <div className="ho-event-img-wrap">
                    <img src={ev.img} alt={ev.title} />
                  </div>
                  <div className="ho-event-info">
                    <span className="ho-event-date">{ev.label}</span>
                    <h3>{ev.title}</h3>
                    <p>{ev.desc}</p>
                    <button className="ho-reg-btn" disabled={past}>
                      {past ? "Event Expired" : ev.btn}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOSTEL STRIP */}
      <section className="ho-hostel-strip">
        <h2>Where <span>Friends</span> become <span>Family</span></h2>
        <p>Life in the hostel is more than just sharing rooms — it's about late night conversations, spontaneous celebrations, music, laughter and unforgettable memories created with friends who become family. Throughout the year, students come together for exciting gatherings like DJ nights, stand-up comedy shows, qawwali evenings and open mic sessions. Most of these vibrant hostel events are brought to life through <b style={{ color: "#cffafe" }}>Vibin'z</b>, the student initiative that keeps the hostel atmosphere energetic, creative and full of life.</p>
      </section>

      {/* POLAROID CAROUSEL */}
      <section className="ho-hostel-home">
        <div className="ho-section-title">
          <h2>A <span>Home Far Away</span> From Home</h2>
          <div className="ho-divider"></div>
          <p>Moments that turn hostels into family</p>
        </div>
        <div className="ho-carousel">
          <div className="ho-carousel-track">
            {polaroids.map((p, i) => (
              <div key={i} className="ho-polaroid">
                <img src={p.img} alt={p.title} />
                <div className="ho-caption">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="ho-gallery">
        <div className="ho-section-title">
          <h2>Memory <span>Gallery</span></h2>
          <div className="ho-divider"></div>
        </div>
        <div className="ho-gallery-slider">
          <div className="ho-gallery-track">
            {galleryImgs.map((src, i) => <img key={i} src={src} alt="" />)}
          </div>
        </div>
      </section>



    </div>
  );
}