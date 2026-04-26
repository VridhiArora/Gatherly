import "./Hero.css";

export default function Hero({ onRegisterClick }) {
  return (
    <section className="hero">
      <video autoPlay muted loop playsInline>
        <source src="/vid11.mp4" type="video/mp4" />
      </video>
      <div className="hero-content">
        <h3>Welcome to Chitkara University</h3>
        <h1>Gatherly</h1>
        <br />
        <br />
        <h2>Your Campus. Your Events. Your Vibe.</h2>
        <p>Explore, Register &amp; Celebrate!</p>
        <div className="highlight-box">
          <h4>Upcoming Highlight: Qwali Night- 20<sup>th</sup>March</h4>
          <p>Weekend Special</p>
          <button onClick={() => onRegisterClick("Qwali Night")}>Register Now</button>
        </div>
      </div>
    </section>
  );
}
