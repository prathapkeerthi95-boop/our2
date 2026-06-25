import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BackgroundEffect() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Primary spotlight sweep (slow diagonal motion)
      gsap.to('.metallic-spotlight-primary', {
        xPercent: 40,
        yPercent: 20,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Secondary soft spotlight sweep (offset timing and angle)
      gsap.to('.metallic-spotlight-secondary', {
        xPercent: -30,
        yPercent: -20,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="metallic-bg-container">
      {/* Smooth slate-grey metallic base gradient */}
      <div className="metallic-base" />

      {/* Main bright spotlight highlight */}
      <div className="metallic-spotlight-primary" />

      {/* Secondary soft metallic highlight */}
      <div className="metallic-spotlight-secondary" />
    </div>
  );
}
