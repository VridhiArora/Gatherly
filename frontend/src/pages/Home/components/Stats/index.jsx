export default function Stats() {
  const statsList = [
    { num: "120+", label: "Events Conducted" },
    { num: "10,000+", label: "Registrations" },
    { num: "35+", label: "Active Clubs" },
    { num: "50+", label: "Guest Speakers" },
  ];

  return (
    <section className="section" style={{ background: "transparent", padding: "50px 40px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        textAlign: "center", 
        flexWrap: "wrap", 
        gap: "60px",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        {statsList.map((s, i) => (
          <div key={i} style={{ 
            flex: "1", 
            minWidth: "200px",
            padding: "20px"
          }}>
            <h1 style={{ 
              color: "#f1f5f9", 
              fontSize: "3.5rem", 
              fontWeight: "900", 
              marginBottom: "8px",
              lineHeight: "1"
            }}>{s.num}</h1>
            <p style={{ 
              color: "#94a3b8", 
              fontSize: "1rem", 
              textTransform: "uppercase", 
              letterSpacing: "3px",
              fontWeight: "700"
            }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
