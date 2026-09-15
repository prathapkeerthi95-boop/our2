import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [isTouch, setIsTouch] = useState(false);
  const [isStatsSection, setIsStatsSection] = useState(false);
  const isStatsSectionRef = useRef(false);

  useEffect(() => {
    // Detect touch device to avoid rendering custom cursor on mobile/tablets
    const checkTouch = () => {
      return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    };

    if (checkTouch()) {
      setIsTouch(true);
      return;
    }

    // Hide default cursor globally
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // Initial setup
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, scale: 1 });

    // Use gsap.quickTo for instant, lag-free mouse tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.08, ease: "power2.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.08, ease: "power2.out" });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Standard Link Hover
    const onEnterLink = () => {
      gsap.to(cursorRef.current, { 
        scale: 2.2, 
        backgroundColor: isStatsSectionRef.current ? 'var(--accent-crimson, #FF2A54)' : 'rgba(112,0,255,0.85)', 
        duration: 0.18, 
        ease: "power2.out" 
      });
    };
    
    const onLeaveLink = () => {
      gsap.to(cursorRef.current, { 
        scale: 1, 
        backgroundColor: isStatsSectionRef.current ? 'var(--accent-crimson, #FF2A54)' : '#FFFFFF', 
        duration: 0.18, 
        ease: "power2.out" 
      });
    };

    // Standard Portfolio "VIEW" Hover (Cyan background)
    const onEnterPortfolio = () => {
      setCursorText("VIEW");
      gsap.to(cursorRef.current, { 
        scale: 3.5, 
        backgroundColor: 'var(--accent-cyan, #00E5FF)', 
        duration: 0.22, 
        ease: "power2.out" 
      });
      gsap.to(textRef.current, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.18 
      });
    };
    
    const onLeavePortfolio = () => {
      gsap.to(textRef.current, { 
        opacity: 0, 
        scale: 0.5, 
        duration: 0.15 
      });
      gsap.to(cursorRef.current, { 
        scale: 1, 
        backgroundColor: '#FFFFFF', 
        duration: 0.22, 
        ease: "power2.out", 
        onComplete: () => setCursorText("") 
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Event delegation for robust hover states across dynamic React lifecycle
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Stats section detection for cursor visibility
      const statsSec = target.closest('.stats-section');
      setIsStatsSection(!!statsSec);
      isStatsSectionRef.current = !!statsSec;

      const portfolioItem = target.closest('.portfolio-item');
      if (portfolioItem) {
        onEnterPortfolio();
        return;
      }

      const linkOrBtn = target.closest('a, button, .btn-primary, .btn-outline, [role="button"], .svc-row, .stat-item');
      if (linkOrBtn) {
        onEnterLink();
        return;
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const relatedTarget = e.relatedTarget;

      // Stats section exit detection
      const statsSec = target.closest('.stats-section');
      if (statsSec && (!relatedTarget || !relatedTarget.closest('.stats-section'))) {
        setIsStatsSection(false);
        isStatsSectionRef.current = false;
      }

      const portfolioItem = target.closest('.portfolio-item');
      if (portfolioItem && (!relatedTarget || !relatedTarget.closest('.portfolio-item'))) {
        onLeavePortfolio();
        return;
      }

      const linkOrBtn = target.closest('a, button, .btn-primary, .btn-outline, [role="button"], .svc-row, .stat-item');
      if (linkOrBtn && (!relatedTarget || !relatedTarget.closest('a, button, .btn-primary, .btn-outline, [role="button"], .svc-row, .stat-item'))) {
        onLeaveLink();
        return;
      }
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      
      const injectedStyle = document.getElementById('custom-cursor-style');
      if (injectedStyle) {
        injectedStyle.remove();
      }
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '24px',
        height: '24px',
        borderRadius: '50%', 
        backgroundColor: 'rgba(56, 189, 248, 0.25)', 
        border: '1.5px solid rgba(56, 189, 248, 0.8)',
        pointerEvents: 'none',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: 'normal',
        overflow: 'hidden',
        willChange: 'transform'
      }}
    >
      {/* Morphing Text Inside Cursor */}
      <div 
        ref={textRef}
        style={{
          color: '#000',
          fontSize: '5px',
          fontWeight: 900,
          letterSpacing: '0.1em',
          opacity: 0,
          transform: 'scale(0.5)'
        }}
      >
        {cursorText}
      </div>
    </div>
  );
};

export default CustomCursor;
