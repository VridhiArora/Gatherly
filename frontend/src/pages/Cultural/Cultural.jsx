import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Cultural.css";
import { isLoggedIn } from "../../utils/auth";

const heroSlides = [
  { src: "/bhangra2.png", alt: "Bhangra" },
  { src: "/dh4.png", alt: "Dhwani" },
  { src: "/giddha.png", alt: "Gidda" },
];

const eventsData = [
  { date: "2026-02-15", label: "15 Feb 2026", title: "Jamming at Square One", desc: "A soothing surprise jamm bringing music and excitement to the campus hub.", img: "/jamm.png" },
  { date: "2026-03-01", label: "1 March 2026", title: "Rangrezz", desc: "Chitkara's annual cultural festival celebrating music, dance, fashion and art performances.", img: "/rangrez.png" },
  { date: "2026-04-12", label: "12 April 2026", title: "Sufi Night", desc: "A melodious night full of love and music.", img: "/sufi.png" },
  { date: "2026-04-20", label: "20 April 2026", title: "National Lit Fest", desc: "A literary festival featuring debates, poetry, storytelling and public speaking competitions.", img: "/lit.png" },
];

const clubsData = [
  {
    name: "The Bhangra Regiment",
    desc: "The Bhangra Regiment celebrates the vibrant energy of Punjabi folk dance. Members perform at university festivals and represent Chitkara at national cultural competitions.",
    big: "/bhangra2.png", s1: "/bh2.png", s2: "/bh3.png",
  },
  {
    name: "Dhwani – Music Club",
    desc: "Dhwani is the music society of the university. Students explore singing, instrumental music and live stage performances across cultural events and festivals.",
    big: "/dh3.png", s1: "/dh4.png", s2: "/dh5.png",
  },
  {
    name: "Lithal Gidda Squad",
    desc: "Lithal Gidda Squad represents the traditional Punjabi dance form Gidda, celebrating heritage and vibrant folk performances.",
    big: "/giddha.png", s1: "/gi2.png", s2: "/gi4.png",
  },
  {
    name: "Reflection – Dance Club",
    desc: "Reflection is the contemporary dance club where students experiment with modern dance styles and stage choreography.",
    big: "/ref1.png", s1: "/ref2.png", s2: "/ref4.png",
  },
  {
    name: "Panache – Fashion Club",
    desc: "Panache focuses on fashion, styling and runway events while organizing fashion shows and style competitions on campus.",
    big: "/pann2.png", s1: "/pa3.png", s2: "/pan2.png",
  },
];

const galleryImgs = [
  "/bh2.png", "/cus1.png", "/pa3.png", "/bhangra2.png", "/dh3.png", "/giddha.png",
  "/gi2.png", "/cus1.png", "/pa2.png", "/bhangra2.png", "/ref2.png", "/giddha.png",
];

const today = new Date();
function isPast(dateStr) { return new Date(dateStr) < today; }

export default function Cultural() {
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
    <div className="cu-wrap">



      {/* HERO */}
      <section className="cu-hero">
        <div className="cu-hero-slider">
          {heroSlides.map((s, i) => (
            <img key={i} ref={el => slidesRef.current[i] = el}
              className={`cu-slide${i === 0 ? " active" : ""}`}
              src={s.src} alt={s.alt} />
          ))}
        </div>
        <div className="cu-hero-content">
          <div className="cu-hero-tag">Cultural Events</div>
          <h1>Celebrating <span>Culture</span><br />At Chitkara</h1>
          <p>Where music, dance, theatre and creativity bring students together through unforgettable performances.</p>
          <div>
            <button onClick={() => document.querySelector(".cu-events-section").scrollIntoView({ behavior: "smooth" })}>
              Explore Events ↓
            </button>
          </div>
        </div>
        <div className="cu-hero-dots">
          {heroSlides.map((_, i) => (
            <div key={i} ref={el => dotsRef.current[i] = el}
              className={`cu-dot${i === 0 ? " active" : ""}`}
              onClick={() => goToSlide(i)} />
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="cu-section cu-events-section">
        <div className="cu-section-title">
          <h2>Cultural <span>Events</span></h2>
          <div className="cu-divider"></div>
          <p>Register before seats fill up</p>
        </div>
        <div className="cu-events-slider">
          <div className="cu-events-track">
            {allEvents.map((ev, i) => {
              const past = isPast(ev.date);
              return (
                <div key={i} className={`cu-event-card${past ? " past-event" : ""}`}>
                  <div className="cu-event-img-wrap"><img src={ev.img} alt={ev.title} /></div>
                  <div className="cu-event-info">
                    <span className="cu-event-date">{ev.label}</span>
                    <h3>{ev.title}</h3>
                    <p>{ev.desc}</p>
                    <button className="cu-reg-btn" disabled={past} onClick={() => {
                      if (!isLoggedIn()) { alert("Please login first!"); return; }
                      window.dispatchEvent(new CustomEvent("open-registration", { detail: { eventTitle: ev.title, clubName: "Vibin'z" } }));
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

      {/* OSA */}
      <section className="cu-osa-section">
        <h2>Featuring <span>OSA</span></h2>
        <p>The Office of Student Affairs (OSA) is responsible for organizing and managing cultural life at Chitkara University. Through vibrant festivals, performances and student initiatives, OSA ensures that every student gets an opportunity to showcase their talent. Under OSA, we have various Chitkara Cultural and Social Services (C2S2) clubs that actively contribute to the artistic and cultural atmosphere of the campus.</p>
      </section>

      {/* CLUBS */}
      <section className="cu-clubs-section">
        <div className="cu-section-title">
          <h2>C2S2 <span>Clubs</span></h2>
          <div className="cu-divider"></div>
          <p>The cultural heartbeat of Chitkara University</p>
        </div>
        {clubsData.map((club, i) => (
          <div key={i} className="cu-club-card">
            <div className="cu-club-text">
              <h3>{club.name}</h3>
              <p>{club.desc}</p>
            </div>
            <div className="cu-club-images">
              <div className="cu-big-img"><img src={club.big} alt={club.name} /></div>
              <div className="cu-small-imgs">
                <div className="cu-small-img"><img src={club.s1} alt="" /></div>
                <div className="cu-small-img"><img src={club.s2} alt="" /></div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* GALLERY */}
      <section className="cu-gallery-section">
        <div className="cu-section-title">
          <h2>Memories From <span>Cultural Events</span></h2>
          <div className="cu-divider"></div>
        </div>
        <div className="cu-gallery-slider">
          <div className="cu-gallery-track">
            {galleryImgs.map((src, i) => <img key={i} src={src} alt="" />)}
          </div>
        </div>
      </section>



    </div>
  );
}