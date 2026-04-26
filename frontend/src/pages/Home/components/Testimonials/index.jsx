import { useEffect } from "react";
import "./Testimonials.css";

const reviews = [
  { text: '"Hackathon 2026 improved my coding confidence and teamwork skills."', author: "— Aryan Sharma, CSE", dir: "from-left" },
  { text: '"Cultural Night was beautifully organized and full of energy."', author: "— Simran Kaur, MBA", dir: "from-right" },
  { text: '"IEEE Conference helped me understand real industry expectations."', author: "— Rahul Verma, ECE", dir: "from-top" },
  { text: '"Being part of clubs enhanced my leadership and communication skills."', author: "— Mehak Gupta, BBA", dir: "from-bottom" },
];

export default function Testimonials() {
  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight - 100;
      document.querySelectorAll(".review-card").forEach((card, index) => {
        if (card.getBoundingClientRect().top < triggerPoint) {
          setTimeout(() => card.classList.add("show"), index * 300);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="section" id="testimonials" style={{ background: "#2a0f0fff" }}>
      <h2 className="section-title-light">What Students Say</h2>
      <div className="review-grid">
        {reviews.map((rev, i) => (
          <div key={i} className={`review-card ${rev.dir}`}>
            <p>{rev.text}</p>
            <h4>{rev.author}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
