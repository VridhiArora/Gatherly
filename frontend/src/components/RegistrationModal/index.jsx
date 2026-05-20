import { useState, useEffect } from "react";
import { getUser, authHeaders } from "../../utils/auth";

export default function RegistrationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [clubName, setClubName] = useState("");
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [formMsg, setFormMsg] = useState("");

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [statusError, setStatusError] = useState("");
  const [capacity, setCapacity] = useState(null); // { eventName, maxSeats, registeredCount, remainingSeats, isFull }

  async function fetchCapacityStatus(title) {
    setLoadingStatus(true);
    setStatusError("");
    setCapacity(null);
    try {
      const res = await fetch(`http://localhost:5000/api/events/status?eventName=${encodeURIComponent(title)}`);
      if (res.ok) {
        const data = await res.json();
        setCapacity(data);
      } else {
        setStatusError("Failed to fetch seat availability.");
      }
    } catch (err) {
      setStatusError("Could not connect to seat capacity service.");
    } finally {
      setLoadingStatus(false);
    }
  }

  useEffect(() => {
    const handleOpen = (e) => {
      setEventTitle(e.detail.eventTitle);
      setClubName(e.detail.clubName || "");
      setFormData({ email: "", phone: "" });
      setFormMsg("");
      setIsOpen(true);
      fetchCapacityStatus(e.detail.eventTitle);
    };
    window.addEventListener("open-registration", handleOpen);
    return () => window.removeEventListener("open-registration", handleOpen);
  }, []);

  const onClose = () => setIsOpen(false);

  // Decode logged-in user from token for display
  const user = getUser();

  async function submitRegistration() {
    if (!formData.email) {
      setFormMsg("Please enter your email!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/register-event", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          email:     formData.email,
          phone:     formData.phone,
          clubName:  clubName,
          eventName: eventTitle
        })
      });
      const data = await res.json();
      if (res.ok) {
        setFormMsg("✅ Registered Successfully!");
        if (capacity) {
          setCapacity(prev => prev ? {
            ...prev,
            registeredCount: prev.registeredCount + 1,
            remainingSeats: Math.max(0, prev.remainingSeats - 1),
            isFull: (prev.registeredCount + 1) >= prev.maxSeats
          } : null);
        }
        setTimeout(() => onClose(), 1500);
      } else {
        setFormMsg(data.error || "Registration failed");
      }
    } catch {
      setFormMsg("Server not reachable!");
    }
  }

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.6)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <style>{`
        @keyframes spin-mini {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{
        background: "white", padding: "30px", borderRadius: "8px",
        width: "350px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
      }}>
        <h3 style={{ marginBottom: "15px", color: "#c8352e" }}>Register: {eventTitle}</h3>

        {/* Event Capacity / Seat Status Section */}
        <div style={{
          margin: "15px 0 20px 0",
          padding: "12px",
          borderRadius: "8px",
          background: loadingStatus
            ? "#f8f9fa"
            : statusError
            ? "#fff5f5"
            : capacity?.isFull
            ? "linear-gradient(135deg, #fff0f0 0%, #ffe0e0 100%)"
            : "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          border: loadingStatus
            ? "1px dashed #ced4da"
            : statusError
            ? "1px solid #feb2b2"
            : capacity?.isFull
            ? "1px solid #fecaca"
            : "1px solid #bbf7d0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          transition: "all 0.3s ease"
        }}>
          {loadingStatus ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6b7280", fontSize: "13px" }}>
              <span className="spinner-mini" style={{
                display: "inline-block",
                width: "14px", height: "14px", border: "2px solid #ccc",
                borderTop: "2px solid #6b7280", borderRadius: "50%",
                animation: "spin-mini 0.8s linear infinite"
              }}></span>
              Checking seat availability...
            </div>
          ) : statusError ? (
            <div style={{ color: "#e53e3e", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
              ⚠️ {statusError}
            </div>
          ) : capacity ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: capacity.isFull ? "#991b1b" : "#166534" }}>
                  {capacity.isFull ? "🔴 EVENT FULL" : "🟢 SEATS AVAILABLE"}
                </span>
                <span style={{
                  fontSize: "11px", fontWeight: "700", padding: "2px 6px", borderRadius: "4px",
                  background: capacity.isFull ? "#fee2e2" : "#dcfce7",
                  color: capacity.isFull ? "#991b1b" : "#15803d"
                }}>
                  {capacity.isFull ? "No Slots" : `${capacity.remainingSeats} Left`}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* Visual Progress Bar */}
                <div style={{ flex: 1, height: "6px", background: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{
                    width: `${Math.min(100, (capacity.registeredCount / capacity.maxSeats) * 100)}%`,
                    height: "100%",
                    background: capacity.isFull ? "#ef4444" : "#22c55e",
                    transition: "width 0.5s ease-out"
                  }}></div>
                </div>
                <span style={{ fontSize: "12px", color: "#4b5563", fontWeight: "500", whiteSpace: "nowrap" }}>
                  {capacity.registeredCount} / {capacity.maxSeats} Booked
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Show name and roll from token — read-only, can't be tampered */}
        <label style={{ fontSize: "13px", fontWeight: "500" }}>Full Name</label>
        <input
          value={user?.username || ""}
          readOnly
          style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#eef2f8", boxSizing: "border-box", color: "#555" }}
        />

        <label style={{ fontSize: "13px", fontWeight: "500" }}>Roll No</label>
        <input
          value={user?.rollno || ""}
          readOnly
          style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#eef2f8", boxSizing: "border-box", color: "#555" }}
        />

        <label style={{ fontSize: "13px", fontWeight: "500" }}>Email *</label>
        <input
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          placeholder="your@email.com"
          style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#dce6f4", boxSizing: "border-box" }}
        />

        <label style={{ fontSize: "13px", fontWeight: "500" }}>Phone</label>
        <input
          value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
          placeholder="Optional"
          style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#dce6f4", boxSizing: "border-box" }}
        />

        {formMsg && <p style={{ color: formMsg.includes("✅") ? "green" : "red", fontSize: "13px" }}>{formMsg}</p>}

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={submitRegistration}
            disabled={capacity?.isFull || loadingStatus}
            style={{
              flex: 1,
              padding: "8px",
              background: (capacity?.isFull || loadingStatus) ? "#cbd5e1" : "#c8352e",
              color: (capacity?.isFull || loadingStatus) ? "#64748b" : "white",
              border: "none",
              cursor: (capacity?.isFull || loadingStatus) ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "4px",
              transition: "all 0.2s ease"
            }}>
            {loadingStatus ? "Checking..." : capacity?.isFull ? "Event Full" : "Submit"}
          </button>
          <button onClick={onClose}
            style={{ flex: 1, padding: "8px", background: "#666", color: "white", border: "none", cursor: "pointer", fontSize: "14px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
