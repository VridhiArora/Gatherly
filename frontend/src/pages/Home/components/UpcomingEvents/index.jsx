import "./UpcomingEvents.css";

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

export default function UpcomingEvents({ onRegisterClick }) {
  return (
    <section className="section" id="events" style={{ background: "transparent" }}>
      <h2 className="section-title-dark">Upcoming Events</h2>
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
                <button onClick={() => onRegisterClick(ev.title)}>Register</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: "40px" }}></div>
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
                <button onClick={() => onRegisterClick(ev.title)}>Register</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
