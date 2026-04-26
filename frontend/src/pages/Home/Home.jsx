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
import Footer from "../../components/Footer";
import RegistrationModal from "../../components/RegistrationModal";

// --- GRAINIENT BACKGROUND COMPONENT ---
function GrainientBackground() {
  return (
    <div className="grainient-bg-wrapper">
      <Grainient
        color1="#F8fafc"
        color2="#d8b4fe"
        color3="#a5b4fc"
        timeSpeed={0.2}
        colorBalance={0.3}
        warpStrength={0.4}
        warpFrequency={1.5}
        warpSpeed={0.3}
        warpAmplitude={20}
        blendAngle={0}
        blendSoftness={0.08}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.08}
        grainScale={1.5}
        grainAnimated={false}
        contrast={1.1}
        gamma={1}
        saturation={0.9}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
  );
}

export default function Home() {
  const username = localStorage.getItem("username");

  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  function openForm(eventTitle) {
    const userId = localStorage.getItem("userId");
    if (!userId) { alert("Please login first!"); return; }
    setSelectedEvent(eventTitle);
    setShowForm(true);
  }

  return (
    <div className="chitkara-wrap">
      <GrainientBackground />
      
      <RegistrationModal 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
        eventTitle={selectedEvent} 
      />

      <Hero onRegisterClick={openForm} />
      <Categories />
      <Stats />
      <Clubs />
      <UpcomingEvents onRegisterClick={openForm} />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  );
}