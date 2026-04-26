import { useEffect, useState, useRef } from "react";
import "./AutoSlider.css";

export default function AutoSlider({ children }) {
  const trackRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const track = trackRef.current;
    
    const scrollStep = () => {
      if (!isHovered && !isDragging && track) {
        track.scrollLeft += 1.5; // adjust speed here
        // Reset scroll when reaching the halfway point
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  const handleMouseDown = (e) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div 
      className="slider-wrapper" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="slider-track" 
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
    </div>
  );
}
