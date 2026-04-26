import { useState, useEffect } from "react";

export default function RegistrationModal({ isOpen, onClose, eventTitle }) {
  const [formData, setFormData] = useState({ name: "", rollno: "", email: "", phone: "" });
  const [formMsg, setFormMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: localStorage.getItem("username") || "",
        rollno: localStorage.getItem("rollno") || "",
        email: "",
        phone: ""
      });
      setFormMsg("");
    }
  }, [isOpen]);

  async function submitRegistration() {
    const userId = localStorage.getItem("userId");
    if (!formData.name || !formData.rollno || !formData.email) {
      setFormMsg("Please fill all required fields!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/register-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          username: formData.name,
          rollno: formData.rollno,
          email: formData.email,
          phone: formData.phone,
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

        <label style={{ fontSize: "13px", fontWeight: "500" }}>Full Name *</label>
        <input value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#dce6f4", boxSizing: "border-box" }}
        />

        <label style={{ fontSize: "13px", fontWeight: "500" }}>Roll No *</label>
        <input value={formData.rollno}
          onChange={e => setFormData({...formData, rollno: e.target.value})}
          style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#dce6f4", boxSizing: "border-box" }}
        />

        <label style={{ fontSize: "13px", fontWeight: "500" }}>Email *</label>
        <input value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          style={{ width: "100%", padding: "7px", margin: "5px 0 10px", border: "1px solid #7fa3d8", background: "#dce6f4", boxSizing: "border-box" }}
        />

        <label style={{ fontSize: "13px", fontWeight: "500" }}>Phone</label>
        <input value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
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
