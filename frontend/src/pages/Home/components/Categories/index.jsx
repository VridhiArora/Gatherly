import AutoSlider from "../../../../components/AutoSlider";
import BorderGlow from "../../../../components/BorderGlow/BorderGlow";
import "./Categories.css";


const categories = [
  { href: "/technical", img: "./tech.png", label: "Technical" },
  { href: "/cultural", img: "./culture.png", label: "Cultural" },
  { href: "/sports", img: "./game.png", label: "Sports" },
  { href: "/hostel", img: "./hostel.png", label: "Hostel Events" },
];

export default function Categories() {
  return (
    <section className="section alt-bg">
      <h1 className="section-title">Event Categories</h1>
      <AutoSlider>




    {[...categories, ...categories, ...categories, ...categories].map((cat, i) => (
      <BorderGlow
        key={i}
        className="category"
        edgeSensitivity={25}
        glowColor="220 80 100"
        backgroundColor="#120F17"
        borderRadius={20}
        glowRadius={60}
        glowIntensity={1.5}
        coneSpread={35}
        animated={false}
        colors={['#818cf8', '#c084fc', '#38bdf8']}
      >
        <a href={cat.href} className="category-link">
          <img src={cat.img} alt={cat.label} />
          <span>{cat.label}</span>
        </a>
      </BorderGlow>
    ))}


      </AutoSlider>
    </section>
  );
}
