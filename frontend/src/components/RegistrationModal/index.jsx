import { useState, useEffect } from "react";
import { getUser, authHeaders } from "../../utils/auth";

export default function RegistrationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [clubName, setClubName] = useState("");
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [formMsg, setFormMsg] = useState("");

  useEffect(() => {
    const handleOpen = (e) => {
      setEventTitle(e.detail.eventTitle);
      setClubName(e.detail.clubName || "");
      setFormData({ email: "", phone: "" });
      setFormMsg("");
      setIsOpen(true);
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
        // authHeaders() sends the JWT — server extracts userId/username/rollno from it
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
      <div style={{
        background: "white", padding: "30px", borderRadius: "8px",
        width: "350px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
      }}>
        <h3 style={{ marginBottom: "15px", color: "#c8352e" }}>Register: {eventTitle}</h3>

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
          <button onClick={submitRegistration}
            style={{ flex: 1, padding: "8px", background: "#c8352e", color: "white", border: "none", cursor: "pointer", fontSize: "14px" }}>
            Submit
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
