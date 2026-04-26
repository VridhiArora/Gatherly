import Masonry from "../../../../components/Masonry";

const masonryItems = [
  { id: 1, img: "./eve.png", height: 400 },
  { id: 2, img: "./eve2.png", height: 600 },
  { id: 3, img: "./eve3.png", height: 400 },
  { id: 4, img: "./eve4.png", height: 500 },
  { id: 5, img: "./eve5.png", height: 400 },
  { id: 6, img: "./eve6.png", height: 400 },
  { id: 7, img: "./eve7.png", height: 600 },
  { id: 8, img: "./eve8.png", height: 400 },
  { id: 9, img: "./eve9.png", height: 500 },
  { id: 10, img: "./eve10.png", height: 400 },
];

export default function Gallery() {
  return (
    <section className="section alt-bg" id="gallery">
      <h2 className="section-title">Campus Moments</h2>
      <div style={{ width: '100%', minHeight: '600px', marginTop: '30px' }}>
        <Masonry
          items={masonryItems}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </section>
  );
}
