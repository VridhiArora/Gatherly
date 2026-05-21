import { useState, useEffect } from "react";

export default function GlobalImageModal() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleClick = (e) => {
      // Check if clicked element is an image
      if (e.target.tagName === "IMG") {
        // Exclude specific elements like nav logo, profile avatars, etc.
        if (
          e.target.closest(".nav-logo") ||
          e.target.closest(".logo") ||
          e.target.closest(".avatar-circle") ||
          e.target.closest(".te-reviewer-img") ||
          e.target.closest(".cu-reviewer-img") ||
          e.target.closest("button")
        ) {
          return;
        }

        // Only allow image to open in modal if it is an upcoming event or club page event
        if (
          e.target.closest(".event-card") ||         // Club page event cards (BitsNBytes, CN, etc.)
          e.target.closest(".event-img") ||          // Home page upcoming events wrapper
          e.target.closest(".event") ||              // Home page upcoming events card
          e.target.closest(".table-img") ||          // Admin table image wrapper
          e.target.classList.contains("table-img")   // Direct class check on admin table img
        ) {
          setSelectedImage(e.target.src);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!selectedImage) return null;

  return (
    <div
      className="global-image-modal-overlay"
      onClick={() => setSelectedImage(null)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999999,
        cursor: "zoom-out",
        opacity: 1,
        transition: "opacity 0.3s ease"
      }}
    >
      <div
        className="global-image-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "85vh",
          position: "relative",
          cursor: "default",
          animation: "modalPopIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards"
        }}
      >
        <button
          onClick={() => setSelectedImage(null)}
          style={{
            position: "absolute",
            top: "-16px",
            right: "-16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(4px)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            zIndex: 10
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img
          src={selectedImage}
          alt="Full view"
          style={{
            maxWidth: "100%",
            maxHeight: "85vh",
            borderRadius: "16px",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            objectFit: "contain"
          }}
        />
      </div>
      <style>
        {`
          @keyframes modalPopIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
