import { useState } from "react";
import "./ContactUs.css";
import { Link } from "react-router-dom";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", roll: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all required fields!");
      return;
    }
    setSent(true);
  }

  return (
    <div className="contact-wrap">

      

      {/* HERO */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h3>We'd Love to Hear From You</h3>
          <h1>Contact <span>Us</span></h1>
          <p>Reach out for queries, collaborations or just to say hi!</p>
          <div className="contact-hero-divider"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="contact-section">
        <div className="contact-grid">

          {/* LEFT — INFO */}
          <div className="contact-info">
            <h2>Get In <span>Touch</span></h2>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <div>
                <h4>Address</h4>
                <p>Chitkara University, Rajpura<br />Punjab – 140401, India</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📧</div>
              <div>
                <h4>Email</h4>
                <p>gatherly@chitkara.edu.in</p>
                <p>events@chitkara.edu.in</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📱</div>
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
                <p>+91 01762 123456</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">🕐</div>
              <div>
                <h4>Working Hours</h4>
                <p>Mon – Fri: 9:00 AM – 5:00 PM</p>
                <p>Sat: 10:00 AM – 2:00 PM</p>
              </div>
            </div>

            {/* SOCIALS */}
            <div className="socials">
              <a href="#" className="social-btn">📸 Instagram</a>
              <a href="#" className="social-btn">💼 LinkedIn</a>
              <a href="#" className="social-btn">🐦 Twitter</a>
              <a href="#" className="social-btn">▶️ YouTube</a>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="contact-form-box">
            <h2>Send a <span>Message</span></h2>

            {sent ? (
              <div className="success-box">
                <div className="success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We'll get back to you soon.</p>
                <button onClick={() => { setSent(false); setForm({ name:"", email:"", roll:"", message:"" }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <div className="form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Roll No</label>
                    <input
                      type="text" name="roll" value={form.roll}
                      onChange={handleChange} placeholder="e.g. 2210990123"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <select name="subject" onChange={handleChange}>
                    <option>Event Registration Query</option>
                    <option>Club Collaboration</option>
                    <option>Technical Issue</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} placeholder="Write your message here..."
                    rows={5}
                  />
                </div>

                <button className="submit-btn" onClick={handleSubmit}>
                  Send Message →
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* FAQ STRIP */}
      <section className="faq-section">
        <h2>Quick <span>FAQs</span></h2>
        <div className="faq-grid">
          {[
            { q: "How do I register for an event?", a: "Login to Gatherly, browse events and click Register on any event with available seats." },
            { q: "Can I cancel my registration?", a: "Currently cancellations are handled manually. Contact us via email for assistance." },
            { q: "How do I join a club?", a: "Visit the club's page on Gatherly and look for their hiring/recruitment event." },
            { q: "Who can I contact for technical issues?", a: "Email us at gatherly@chitkara.edu.in and we'll resolve it within 24 hours." },
            { q: "Is Gatherly available on mobile?", a: "Yes! Gatherly is fully responsive and works smoothly on all mobile browsers. A dedicated app is coming soon." },
            { q: "How do I stay updated about new events?", a: "Follow our Instagram @gatherly_chitkara and check the homepage regularly for the latest highlights and announcements." },
          ].map((faq, i) => (
            <div key={i} className="faq-card">
              <h4>❓ {faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}


    </div>
  );
}