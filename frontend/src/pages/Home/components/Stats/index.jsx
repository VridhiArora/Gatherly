export default function Stats() {
  const statsList = [
    { num: "120+", label: "Events Conducted" },
    { num: "10,000+", label: "Registrations" },
    { num: "35+", label: "Active Clubs" },
    { num: "50+", label: "Guest Speakers" },
  ];

  return (
    <section className="section" style={{ background: "#0f172a", padding: "50px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", flexWrap: "wrap", gap: "40px" }}>
        {statsList.map((s, i) => (
          <div key={i}>
            <h1 style={{ color: "white" }}>{s.num}</h1>
            <p style={{ color: "white" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
