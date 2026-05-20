import { useState, useEffect } from "react";
import "./UpcomingEvents.css";

const getImageUrl = (img) => {
  if (!img) return "/event-placeholder.png";
  return img;
};

export default function UpcomingEvents({ onRegisterClick }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        // Filter out past events
        const today = new Date();
        // Clear time to just compare dates properly
        today.setHours(0, 0, 0, 0);
        
        const upcoming = data.filter(ev => {
          if (!ev.date) return false;
          const evDate = new Date(ev.date);
          evDate.setHours(0, 0, 0, 0);
          return evDate >= today;
        });
        
        // Sort by closest date first
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(upcoming);
      })
      .catch(err => console.error("Error fetching upcoming events", err));
  }, []);

  // Split events into chunks of 3 for rows
  const row1 = events.slice(0, 3);
  const row2 = events.slice(3, 6);

  return (
    <section className="section" id="events" style={{ background: "transparent" }}>
      <h2 className="section-title-dark">Upcoming Events</h2>
      <div className="events">
        {row1.map((ev, i) => (
          <div key={i} className="event">
            <div className="event-img"><img src={getImageUrl(ev.img)} alt={ev.eventName} /></div>
            <div className="event-content">
              <h4>{ev.eventName}</h4>
              <p className="club-name">Organized by: {ev.clubName || "General"}</p>
              <p className="event-time">{ev.date ? new Date(ev.date).toLocaleDateString() : ""}</p>
              <p className="event-desc">{ev.description}</p>
              <div className="event-buttons">
                <button onClick={() => onRegisterClick(ev.eventName)}>Register</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {row2.length > 0 && (
        <>
          <div style={{ height: "40px" }}></div>
          <div className="events">
            {row2.map((ev, i) => (
              <div key={i} className="event">
                <div className="event-img"><img src={getImageUrl(ev.img)} alt={ev.eventName} /></div>
                <div className="event-content">
                  <h4>{ev.eventName}</h4>
                  <p className="club-name">Organized by: {ev.clubName || "General"}</p>
                  <p className="event-time">{ev.date ? new Date(ev.date).toLocaleDateString() : ""}</p>
                  <p className="event-desc">{ev.description}</p>
                  <div className="event-buttons">
                    <button onClick={() => onRegisterClick(ev.eventName)}>Register</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
