import { Link } from "react-router-dom";
import AutoSlider from "../../../../components/AutoSlider";
import BorderGlow from "../../../../components/BorderGlow/BorderGlow";
import "./Clubs.css";

const clubs = [
  { href: "/gfg", img: "/GFG.png", name: "GeeksforGeeks" },
  { href: "/cn", img: "/CN.png", name: "Coding Ninjas" },
  { href: "/ieee", img: "/ieee.png", name: "IEEE" },
  { href: "/vibin", img: "/vibin.png", name: "Vibin'z" },
  { href: "/bitsnbytes", img: "/bb4.png", name: "Bits N Bytes" },
  { href: "/iste", img: "/iste.png", name: "ISTE" },
];

export default function Clubs() {
  return (
    <section className="section alt-bg">
      <h2 className="section-title-dark">Explore Our Clubs</h2>
      <AutoSlider>
        {[...clubs, ...clubs, ...clubs, ...clubs].map((club, i) => (
          <BorderGlow
            key={i}
            className="club-glow-card"
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={['#c8352e', '#ff4b4b', '#f87171']}
          >
            <Link to={club.href} className="club-content">
              <img src={club.img} alt={club.name} />
              <p>{club.name}</p>
            </Link>
          </BorderGlow>
        ))}
      </AutoSlider>
    </section>
  );
}
