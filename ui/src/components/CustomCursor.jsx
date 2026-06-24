import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      // Very slight lag for premium weight feel
      gsap.to(cursorRef.current, { 
        x: e.clientX, 
        y: e.clientY, 
        duration: 0.2, 
        ease: "power2.out" 
      });
    };

    // Standard Link Hover
    const onEnterLink = () => {
      gsap.to(cursorRef.current, { scale: 3, backgroundColor: 'rgba(112,0,255,0.8)', duration: 0.3, ease: "back.out(1.5)" });
    };
    const onLeaveLink = () => {
      gsap.to(cursorRef.current, { scale: 1, backgroundColor: '#0B0C10', duration: 0.3, ease: "power2.out" });
    };

    // Portfolio "VIEW" Hover
    const onEnterPortfolio = () => {
      setCursorText("VIEW");
      gsap.to(cursorRef.current, { scale: 6, backgroundColor: 'var(--accent-cyan)', duration: 0.4, ease: "expo.out" });
      gsap.to(textRef.current, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
    };
    const onLeavePortfolio = () => {
      gsap.to(textRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to(cursorRef.current, { scale: 1, backgroundColor: '#0B0C10', duration: 0.4, ease: "expo.out", onComplete: () => setCursorText("") });
    };

    window.addEventListener('mousemove', onMouseMove);

    const attachHovers = () => {
      // Standard links
      document.querySelectorAll('a:not(.portfolio-item), button, .btn-primary, .btn-outline').forEach(el => {
        el.style.cursor = 'none';
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });

      // Portfolio items
      document.querySelectorAll('.portfolio-item').forEach(el => {
        el.style.cursor = 'none';
        el.addEventListener('mouseenter', onEnterPortfolio);
        el.addEventListener('mouseleave', onLeavePortfolio);
      });
    };
    
    attachHovers();
    setTimeout(attachHovers, 2000); // Re-attach after preloader finishes

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '16px', height: '16px',
        borderRadius: '50%', backgroundColor: '#0B0C10', pointerEvents: 'none',
        zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)', overflow: 'hidden'
      }}
    >
      {/* Morphing Text Inside Cursor */}
      <div 
        ref={textRef}
        style={{
          color: '#000', fontSize: '2.5px', // Tiny because the parent scales 6x
          fontWeight: 900, letterSpacing: '0.1em', opacity: 0, transform: 'scale(0.5)'
        }}
      >
        {cursorText}
      </div>
    </div>
  );
};

export default CustomCursor;
