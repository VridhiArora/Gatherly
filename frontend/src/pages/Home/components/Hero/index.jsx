import { useState, useEffect } from "react";
import "./Hero.css";

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
};

export default function Hero({ onRegisterClick }) {
  const [highlightEvent, setHighlightEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = data.filter((ev) => {
          if (!ev.date) return false;
          const evDate = new Date(ev.date);
          evDate.setHours(0, 0, 0, 0);
          return evDate >= today;
        });

        // Sort by closest date first (ascending)
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (upcoming.length > 0) {
          setHighlightEvent(upcoming[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events for Hero highlight:", err);
        setLoading(false);
      });
  }, []);

  return (
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
        {!loading && highlightEvent && (
          <div className="highlight-box">
            <h4>
              Upcoming Highlight: {highlightEvent.eventName} -{" "}
              {highlightEvent.date ? (
                <>
                  {new Date(highlightEvent.date).getDate()}
                  <sup>{getOrdinalSuffix(new Date(highlightEvent.date).getDate())}</sup>{" "}
                  {new Date(highlightEvent.date).toLocaleDateString("en-US", { month: "long" })}
                </>
              ) : (
                ""
              )}
            </h4>
            <p>{highlightEvent.description || "Campus Event"}</p>
            <button onClick={() => onRegisterClick(highlightEvent.eventName)}>Register Now</button>
          </div>
        )}
      </div>
    </section>
  );
}

