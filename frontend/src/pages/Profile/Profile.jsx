import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const rollno = localStorage.getItem("rollno");
  const session = localStorage.getItem("session");

  useEffect(() => {
    if (!userId) { navigate("/"); return; }
    fetchMyEvents();
  }, []);

  async function fetchMyEvents() {
    try {
      const res = await fetch(`http://localhost:5000/api/my-events/${userId}`);
      const data = await res.json();
      
      // Sort events by registration date (newest first)
      const sorted = data.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
      setEvents(sorted);
    } catch {
      console.log("Server error");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  const clubColors = {
    "Bits N Bytes":  "#e65c00",
    "GeeksforGeeks": "#2f8d46",
    "Coding Ninjas": "#e74c3c",
    "IEEE":          "#003087",
    "Vibin'z":       "#8e44ad",
    "ISTE":          "#c8352e",
    "General":       "#a78bfa"
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">
          
          {/* ================= LEFT COLUMN: SIDEBAR ================= */}
          <div className="dash-card profile-sidebar">
            <div className="profile-avatar">
              {(username || "U")[0].toUpperCase()}
            </div>
            
            <h2>{username}</h2>
            <p className="profile-roll">{rollno}</p>
            
            <div className="sidebar-stats">
              <div className="stat-row">
                <span>Session</span>
                <b>{session || "Jan-Jun 2026"}</b>
              </div>
              <div className="stat-row highlight">
                <span>Total Events</span>
                <b>{events.length}</b>
              </div>
            </div>
            
            <button className="profile-logout-btn" onClick={logout}>
              ⎋ Logout
            </button>

            <div className="quick-links-section">
              <h3>Discover Categories</h3>
              <Link to="/technical" className="quick-link-btn">
                <span>💻</span> Technical Events
              </Link>
              <Link to="/cultural" className="quick-link-btn">
                <span>🎭</span> Cultural Events
              </Link>
              <Link to="/sports" className="quick-link-btn">
                <span>🏆</span> Sports Events
              </Link>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: DASHBOARD ================= */}
          <div className="dash-card right-column">
            <div className="dash-header">
              <span>My Registered Events</span>
              <span className="dash-header-count">{events.length} Registrations</span>
            </div>

            {loading ? (
              <p className="no-events">Loading events...</p>
            ) : events.length === 0 ? (
              <div className="empty-state-wrapper">
                <div className="empty-icon">🎟️</div>
                <h3>No Registrations Yet</h3>
                <p>You haven't registered for any events yet. Explore the campus events and find your vibe!</p>
                <Link to="/home" className="explore-btn">
                  Explore Events
                </Link>
              </div>
            ) : (
              <div className="events-list">
                {/* Table Header Row */}
                <div className="events-table-header">
                  <span>Event Name</span>
                  <span>Club</span>
                  <span>Date</span>
                  <span style={{ textAlign: "center" }}>Status</span>
                </div>

                {/* Event Rows */}
                {events.map((ev, i) => {
                  const clubName = ev.clubName || "General";
                  const clubColor = clubColors[clubName] || clubColors["General"];

                  return (
                    <div key={i} className="event-row">
                      <p className="event-name" title={ev.eventName}>{ev.eventName}</p>
                      
                      <div className="event-club">
                        <span className="club-dot" style={{ background: clubColor }}></span>
                        {clubName}
                      </div>

                      <span className="event-date">
                        {new Date(ev.registeredAt).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric"
                        })}
                      </span>
                      
                      <div className="event-status">
                        Registered
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
    </div>
  );
}