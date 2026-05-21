import { useState, useEffect } from "react";
import { authHeaders } from "../../utils/auth";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    eventName: "",
    clubName: "General",
    category: "General",
    description: "",
    date: "",
    maxSeats: 50,
    image: null
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingId(event._id);
      setFormData({
        eventName: event.eventName,
        clubName: event.clubName || "General",
        category: event.category || "General",
        description: event.description || "",
        date: event.date || "",
        maxSeats: event.maxSeats || 50,
        image: null // clear file input
      });
    } else {
      setEditingId(null);
      setFormData({
        eventName: "",
        clubName: "General",
        category: "General",
        description: "",
        date: "",
        maxSeats: 50,
        image: null
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("eventName", formData.eventName);
    data.append("clubName", formData.clubName);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("date", formData.date);
    data.append("maxSeats", formData.maxSeats);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const url = editingId
        ? `/api/events/${editingId}`
        : "/api/events";
      const method = editingId ? "PUT" : "POST";

      // Do NOT set Content-Type header when sending FormData! Browser sets it with boundary.
      const headers = authHeaders();
      delete headers["Content-Type"];

      const res = await fetch(url, {
        method,
        headers,
        body: data
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Failed to save event");
        return;
      }

      setShowModal(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event? This will also delete all registrations for it!")) return;
    
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: authHeaders()
      });
      if (res.ok) {
        fetchEvents();
      } else {
        alert("Failed to delete event");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getImageUrl = (img) => {
    if (!img) return "/event-placeholder.png";
    return img;
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin <span className="highlight">Dashboard</span></h1>
        <button className="add-btn" onClick={() => handleOpenModal()}>
          + Create New Event
        </button>
      </div>

      {loading ? (
        <div className="loading-state">Loading Events...</div>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Banner</th>
                <th>Event Name</th>
                <th>Club</th>
                <th>Date</th>
                <th>Seats (Used / Max)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev._id}>
                  <td>
                    <img src={getImageUrl(ev.img)} alt={ev.eventName} className="table-img" />
                  </td>
                  <td>{ev.eventName}</td>
                  <td>{ev.clubName}</td>
                  <td>{ev.date ? new Date(ev.date).toLocaleDateString() : "N/A"}</td>
                  <td>{ev.registeredCount} / {ev.maxSeats}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleOpenModal(ev)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(ev._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <h2>{editingId ? "Edit Event" : "Create Event"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Event Name</label>
                <input type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Club Name</label>
                <select name="clubName" value={formData.clubName} onChange={handleInputChange}>
                  <option value="Bits N Bytes">Bits N Bytes</option>
                  <option value="Coding Ninjas">Coding Ninjas</option>
                  <option value="GeeksforGeeks">GeeksforGeeks</option>
                  <option value="IEEE">IEEE</option>
                  <option value="Iste">Iste</option>
                  <option value="Vibin">Vibin'z</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Hostel">Hostel</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Max Seats</label>
                <input type="number" name="maxSeats" value={formData.maxSeats} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
              </div>
              <div className="form-group">
                <label>Event Image Banner</label>
                <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
