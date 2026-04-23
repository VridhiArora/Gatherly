import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Profile() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const userId   = localStorage.getItem("userId")
  const username = localStorage.getItem("username")
  const rollno   = localStorage.getItem("rollno")
  const session  = localStorage.getItem("session")

  useEffect(() => {
    if (!userId) { navigate("/"); return }
    fetchMyEvents()
  }, [])

  async function fetchMyEvents() {
    try {
      const res  = await fetch(`http://localhost:5000/api/my-events/${userId}`)
      const data = await res.json()
      setEvents(data)
    } catch {
      console.log("Server error")
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    localStorage.clear()
    navigate("/")
  }

  // ── Group events by clubName ──
  const grouped = events.reduce((acc, ev) => {
    const club = ev.clubName || "General"
    if (!acc[club]) acc[club] = []
    acc[club].push(ev)
    return acc
  }, {})

  const clubColors = {
    "Bits N Bytes":  "#e65c00",
    "GeeksforGeeks": "#2f8d46",
    "Coding Ninjas": "#e74c3c",
    "IEEE":          "#003087",
    "Vibin'z":       "#8e44ad",
    "ISTE":          "#c8352e",
    "General":       "#555"
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6fb", fontFamily: "Segoe UI, Arial" }}>

      {/* NAVBAR */}
      <div style={{
        background: "#c8352e", padding: "12px 30px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <Link to="/home" style={{ color: "white", textDecoration: "none", fontSize: "20px", fontWeight: "bold" }}>
          🏠 Gatherly
        </Link>
        <button onClick={logout} style={{
          background: "white", color: "#c8352e", border: "none",
          padding: "7px 18px", borderRadius: "4px", cursor: "pointer",
          fontWeight: "bold", fontSize: "13px"
        }}>
          Logout
        </button>
      </div>

      <div style={{ maxWidth: "700px", margin: "30px auto", padding: "0 15px" }}>

        {/* PROFILE CARD */}
        <div style={{
          background: "white", borderRadius: "8px",
          padding: "25px 30px", marginBottom: "20px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex", alignItems: "center", gap: "20px"
        }}>
          <div style={{
            width: "70px", height: "70px", borderRadius: "50%",
            background: "#c8352e", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", fontWeight: "bold", flexShrink: 0
          }}>
            {(username || "U")[0].toUpperCase()}
          </div>
          <div>
            <h2 style={{ margin: 0, color: "#1c1c2e", fontSize: "22px" }}>{username}</h2>
            <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>Roll No: <b>{rollno}</b></p>
            <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>Session: <b>{session || "JanJun2026"}</b></p>
            <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
              Total Registrations: <b style={{ color: "#c8352e" }}>{events.length}</b>
            </p>
          </div>
        </div>

        {/* EVENTS GROUPED BY CLUB */}
        <div style={{
          background: "white", borderRadius: "8px",
          padding: "25px 30px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
        }}>
          <h3 style={{
            margin: "0 0 20px", color: "#1c1c2e",
            borderBottom: "3px solid #c8352e", paddingBottom: "10px"
          }}>
            My Registered Events
          </h3>

          {loading ? (
            <p style={{ color: "#888", textAlign: "center" }}>Loading...</p>

          ) : events.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <p style={{ color: "#888", fontSize: "15px" }}>No registrations yet.</p>
              <Link to="/home" style={{
                display: "inline-block", marginTop: "12px",
                background: "#c8352e", color: "white",
                padding: "8px 20px", borderRadius: "4px",
                textDecoration: "none", fontSize: "14px"
              }}>
                Explore Events
              </Link>
            </div>

          ) : (
            // ── Each Club Section ──
            Object.entries(grouped).map(([clubName, clubEvents]) => (
              <div key={clubName} style={{ marginBottom: "25px" }}>

                {/* Club Header */}
                <div style={{
                  background: clubColors[clubName] || "#555",
                  color: "white", padding: "8px 15px",
                  borderRadius: "6px", marginBottom: "10px",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    🏛️ {clubName}
                  </span>
                  <span style={{
                    background: "rgba(255,255,255,0.25)",
                    padding: "2px 10px", borderRadius: "20px", fontSize: "12px"
                  }}>
                    {clubEvents.length} event{clubEvents.length > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Events under this club */}
                {clubEvents.map((ev, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 15px", marginBottom: "8px",
                    background: "#f4f6fb", borderRadius: "6px",
                    borderLeft: `4px solid ${clubColors[clubName] || "#555"}`
                  }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: "bold", color: "#1c1c2e", fontSize: "15px" }}>
                        {ev.eventName}
                      </p>
                      <p style={{ margin: "3px 0 0", color: "#888", fontSize: "12px" }}>
                        Registered: {new Date(ev.registeredAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </p>
                    </div>
                    <span style={{
                      background: clubColors[clubName] || "#555",
                      color: "white", padding: "3px 10px",
                      borderRadius: "20px", fontSize: "11px"
                    }}>
                      ✓ Registered
                    </span>
                  </div>
                ))}

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}