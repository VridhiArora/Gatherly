import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUser, logout, authHeaders } from "../../utils/auth";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [notification, setNotification] = useState(null);

  // Decode user info from the JWT — no more individual localStorage reads
  const user = getUser();

  useEffect(() => {
    if (!user) { navigate("/"); return; }
    fetchMyEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    return () => clearTimeout(timer);
  };

  async function fetchMyEvents() {
    try {
      // Authorization header carries the JWT — server identifies the user from it
      const res = await fetch("/api/my-events", {
        headers: authHeaders()
      });

      if (res.status === 401) {
        // Token expired or invalid — log out and redirect
        logout();
        navigate("/");
        return;
      }

      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
      setEvents(sorted);
    } catch {
      console.log("Server error");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelRegistration(registrationId, eventName) {
    setCancellingId(registrationId);
    setConfirmingId(null);

    // Save previous events for optimistic rollback
    const originalEvents = [...events];

    // Optimistically update frontend state immediately
    setEvents(events.filter(ev => ev._id !== registrationId));

    try {
      const res = await fetch(`/api/register-event/${registrationId}`, {
        method: "DELETE",
        headers: authHeaders()
      });

      if (res.status === 401) {
        logout();
        navigate("/");
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to cancel registration.");
      }

      showNotification(`Successfully cancelled registration for ${eventName}!`, "success");
    } catch (err) {
      console.error("Cancellation Error:", err);
      // Rollback optimistic update on error
      setEvents(originalEvents);
      showNotification(err.message || "Failed to cancel registration. Please try again.", "error");
    } finally {
      setCancellingId(null);
    }
  }

  function handleLogout() {
    logout();
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
      {notification && (
        <div className={`toast-notification ${notification.type}`}>
          <span className="toast-icon">
            {notification.type === "success" ? "✓" : "⚠"}
          </span>
          <span className="toast-message">{notification.message}</span>
          <button className="toast-close-btn" onClick={() => setNotification(null)}>×</button>
        </div>
      )}
      <div className="profile-container">

          {/* ================= LEFT COLUMN: SIDEBAR ================= */}
          <div className="dash-card profile-sidebar">
            <div className="profile-avatar">
              {(user?.username || "U")[0].toUpperCase()}
            </div>

            <h2>{user?.username}</h2>
            <p className="profile-roll">{user?.rollno}</p>

            <div className="sidebar-stats">
              <div className="stat-row">
                <span>Session</span>
                <b>{user?.session || "Jan-Jun 2026"}</b>
              </div>
              <div className="stat-row highlight">
                <span>Total Events</span>
                <b>{events.length}</b>
              </div>
            </div>

            <button className="profile-logout-btn" onClick={handleLogout}>
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
                  <span style={{ textAlign: "center" }}>Action</span>
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

                      <div className="event-action">
                        {cancellingId === ev._id ? (
                          <span className="cancelling-text">Cancelling...</span>
                        ) : confirmingId === ev._id ? (
                          <div className="confirm-actions">
                            <button
                              onClick={() => handleCancelRegistration(ev._id, ev.eventName)}
                              className="confirm-btn"
                              title="Confirm Cancellation"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setConfirmingId(null)}
                              className="keep-btn"
                              title="Keep Registration"
                            >
                              Keep
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmingId(ev._id)}
                            className="cancel-reg-btn"
                          >
                            Cancel
                          </button>
                        )}
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