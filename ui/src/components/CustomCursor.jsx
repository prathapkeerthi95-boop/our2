import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Guaranteed perfectly centered
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      // Extremely responsive, zero lag tracking
      gsap.to(cursorRef.current, { 
        x: e.clientX, 
        y: e.clientY, 
        duration: 0.15, // Very slight smoothing
        ease: "power2.out" 
      });
    };

    // Elegant Hover effects
    const onEnterHover = () => {
      gsap.to(cursorRef.current, { 
        scale: 3, 
        backgroundColor: 'rgba(112,0,255,0.8)',
        duration: 0.3, 
        ease: "back.out(1.5)" 
      });
    };
    
    const onLeaveHover = () => {
      gsap.to(cursorRef.current, { 
        scale: 1, 
        backgroundColor: '#0B0C10',
        duration: 0.3,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    const attachHover = () => {
      document.querySelectorAll('a, button, .hover-target, .btn-primary, .btn-outline').forEach(el => {
        el.style.cursor = 'none';
        el.addEventListener('mouseenter', onEnterHover);
        el.addEventListener('mouseleave', onLeaveHover);
      });
    };
    
    attachHover();
    setTimeout(attachHover, 1500); // Re-attach for lazy loaded

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed', 
        top: 0, 
        left: 0,
        width: '16px', 
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#0B0C10',
        pointerEvents: 'none',
        zIndex: 10000,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}
    />
  );
};

export default CustomCursor;
