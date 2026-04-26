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
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="#120F17"
        borderRadius={20}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={['#c084fc', '#f472b6', '#38bdf8']}
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
