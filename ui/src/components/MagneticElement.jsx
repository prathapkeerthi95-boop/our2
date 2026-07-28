import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';

const MagneticElement = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const rectRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || !rectRef.current) return;
    const rect = rectRef.current;
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(ref.current, { x, y, duration: 0.3, ease: 'power2.out', overwrite: true });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)', overwrite: true });
    }
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  );
};

export default MagneticElement;
