import { useState } from "react";
import "./Home.css";
import Grainient from '../../components/Grainient';

import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Stats from "./components/Stats";
import Clubs from "./components/Clubs";
import UpcomingEvents from "./components/UpcomingEvents";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";


// --- GRAINIENT BACKGROUND COMPONENT ---
function GrainientBackground() {
  return (
    <div className="grainient-bg-wrapper">
      <Grainient
        color1="#0f172a"
        color2="#1e1b4b"
        color3="#162032"
        timeSpeed={0.15}
        colorBalance={0.4}
        warpStrength={0.3}
        warpFrequency={1.2}
        warpSpeed={0.2}
        warpAmplitude={15}
        blendAngle={0}
        blendSoftness={0.1}
        rotationAmount={400}
        noiseScale={2}
        grainAmount={0.05}
        grainScale={1.5}
        grainAnimated={false}
        contrast={1.0}
        gamma={1}
        saturation={0.6}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
  );
}

export default function Home() {
  const username = localStorage.getItem("username");

  function openForm(eventTitle) {
    const userId = localStorage.getItem("userId");
    if (!userId) { alert("Please login first!"); return; }
    window.dispatchEvent(new CustomEvent("open-registration", { detail: { eventTitle } }));
  }

  return (
    <div className="chitkara-wrap">
      <GrainientBackground />


      <Hero onRegisterClick={openForm} />
      <Categories />
      <Stats />
      <Clubs />
      <UpcomingEvents onRegisterClick={openForm} />
      <Gallery />
      <Testimonials />

    </div>
  );
}