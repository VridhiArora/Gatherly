import { useEffect, useRef } from "react";
import "./AutoSlider.css";

export default function AutoSlider({ children }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const touchStartXRef = useRef(0);
  const touchOffsetRef = useRef(0);
  const rafRef = useRef(null);

  const applyTransform = (offset) => {
    if (!trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let looped = offset;
    if (looped > 0) looped -= halfWidth;
    if (looped < -halfWidth) looped += halfWidth;
    offsetRef.current = looped;
    trackRef.current.style.transform = `translateX(${looped}px)`;
  };

  // ── Auto-scroll rAF loop ──────────────────────────────────────
  useEffect(() => {
    let lastTime = null;

    const step = (timestamp) => {
      if (!isHoveredRef.current && !isDraggingRef.current) {
        if (lastTime !== null) {
          applyTransform(offsetRef.current - (timestamp - lastTime) * 0.06);
        }
        lastTime = timestamp;
      } else {
        lastTime = null;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Non-passive wheel listener (required to call preventDefault) ──
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Only intercept horizontal swipes (two-finger left/right on trackpad)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        applyTransform(offsetRef.current - e.deltaX);
      }
      // Vertical scroll (deltaY dominant) is ignored — page scrolls normally
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // ── Mouse drag ───────────────────────────────────────────────
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragOffsetRef.current = offsetRef.current;
    if (wrapperRef.current) wrapperRef.current.style.cursor = "grabbing";
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    applyTransform(dragOffsetRef.current + (e.clientX - startXRef.current));
  };

  const stopDrag = () => {
    isDraggingRef.current = false;
    if (wrapperRef.current) wrapperRef.current.style.cursor = "grab";
  };

  // ── Touch (touchscreen / tablet) ────────────────────────────
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchOffsetRef.current = offsetRef.current;
    isHoveredRef.current = true;
  };

  const handleTouchMove = (e) => {
    applyTransform(touchOffsetRef.current + (e.touches[0].clientX - touchStartXRef.current));
  };

  const handleTouchEnd = () => {
    isHoveredRef.current = false;
  };

  return (
    <div
      ref={wrapperRef}
      className="slider-wrapper"
      style={{ cursor: "grab" }}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; stopDrag(); }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slider-track" ref={trackRef}>
        {children}
      </div>
    </div>
  );
}
