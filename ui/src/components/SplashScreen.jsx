import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplashScreen({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // Prevent body scroll during splash animation
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const gridItems = gridRef.current.querySelectorAll('.grid-item-shape');
      const textLines = textRef.current.querySelectorAll('.splash-text-line');

      // Create a master timeline for the sequence
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }
      });

      // 1. Initial State: Background is dark charcoal, shapes & text invisible
      gsap.set(containerRef.current, { backgroundColor: "#0c0c0e" });
      gsap.set(gridItems, { opacity: 0, scale: 0.85 });
      gsap.set(textLines, { opacity: 0, y: 40 });
      gsap.set('.splash-light-sweep', { xPercent: -120, opacity: 0 });

      // 2. Doodle lines (geometric shapes) appear first
      tl.to(gridItems, {
        opacity: 0.28,
        scale: 1,
        duration: 1.2,
        stagger: {
          amount: 0.6,
          grid: "auto",
          from: "center"
        },
        ease: "power2.out"
      });

      // Micro-animation for floating shapes
      gsap.to(gridItems, {
        y: "random(-4, 4)",
        x: "random(-4, 4)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.05
      });

      // 3. Text appears in the center
      tl.to(textLines, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.2"); // overlap slightly with shapes finishing

      // Hold text on screen
      tl.to({}, { duration: 1.0 });

      // 4. Text fades out
      tl.to(textLines, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.in"
      });

      // 5. Light sweep comes across and transition to grey background
      tl.to('.splash-light-sweep', {
        xPercent: 120,
        opacity: 1,
        duration: 1.4,
        ease: "power3.inOut"
      }, "-=0.2");

      // Background changes to slate-grey as the light sweeps
      tl.to(containerRef.current, {
        backgroundColor: "#7f878f",
        duration: 1.0,
        ease: "power2.inOut"
      }, "<0.2");

      // Turn grid items white & more opaque to match Image 3 style
      tl.to(gridItems, {
        opacity: 0.8,
        duration: 0.8,
        ease: "power2.out"
      }, "<");

      // Let the grey background show for a brief moment
      tl.to({}, { duration: 0.6 });

      // 6. Outro: Slide up the entire splash screen to reveal the site
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.0,
        ease: "power4.inOut"
      });

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // Geometric shapes to render in the grid blocks to match Image 1/3
  const renderShape = (index) => {
    const strokeColor = "rgba(255, 255, 255, 0.28)";
    const shapes = [
      // 0: Concentric circles
      <svg viewBox="0 0 100 100" className="shape-svg">
        <circle cx="50" cy="50" r="40" stroke={strokeColor} strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="30" stroke={strokeColor} strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="20" stroke={strokeColor} strokeWidth="1" fill="none" />
      </svg>,
      // 1: Grid lines
      <svg viewBox="0 0 100 100" className="shape-svg">
        <line x1="20" y1="0" x2="20" y2="100" stroke={strokeColor} strokeWidth="1" />
        <line x1="40" y1="0" x2="40" y2="100" stroke={strokeColor} strokeWidth="1" />
        <line x1="60" y1="0" x2="60" y2="100" stroke={strokeColor} strokeWidth="1" />
        <line x1="80" y1="0" x2="80" y2="100" stroke={strokeColor} strokeWidth="1" />
        <line x1="0" y1="20" x2="100" y2="20" stroke={strokeColor} strokeWidth="1" />
        <line x1="0" y1="40" x2="100" y2="40" stroke={strokeColor} strokeWidth="1" />
        <line x1="0" y1="60" x2="100" y2="60" stroke={strokeColor} strokeWidth="1" />
        <line x1="0" y1="80" x2="100" y2="80" stroke={strokeColor} strokeWidth="1" />
      </svg>,
      // 2: Quadrant arc
      <svg viewBox="0 0 100 100" className="shape-svg">
        <path d="M 0 0 A 100 100 0 0 1 100 100" stroke={strokeColor} strokeWidth="1.5" fill="none" />
        <path d="M 0 0 A 80 80 0 0 1 80 80" stroke={strokeColor} strokeWidth="1" fill="none" />
        <path d="M 0 0 A 60 60 0 0 1 60 60" stroke={strokeColor} strokeWidth="1" fill="none" />
      </svg>,
      // 3: Vertical stripes
      <svg viewBox="0 0 100 100" className="shape-svg">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke={strokeColor} strokeWidth="0.8" />
        ))}
      </svg>,
      // 4: Diagonal stripes
      <svg viewBox="0 0 100 100" className="shape-svg">
        <line x1="0" y1="0" x2="100" y2="100" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="0" y1="50" x2="50" y2="100" stroke={strokeColor} strokeWidth="1" />
        <line x1="50" y1="0" x2="100" y2="50" stroke={strokeColor} strokeWidth="1" />
      </svg>,
      // 5: Double arc
      <svg viewBox="0 0 100 100" className="shape-svg">
        <path d="M 0 50 A 50 50 0 0 1 100 50" stroke={strokeColor} strokeWidth="1" fill="none" />
        <path d="M 0 50 A 30 30 0 0 1 100 50" stroke={strokeColor} strokeWidth="1" fill="none" />
        <line x1="0" y1="50" x2="100" y2="50" stroke={strokeColor} strokeWidth="1" />
      </svg>,
      // 6: Concentric squares
      <svg viewBox="0 0 100 100" className="shape-svg">
        <rect x="15" y="15" width="70" height="70" stroke={strokeColor} strokeWidth="1" fill="none" />
        <rect x="30" y="30" width="40" height="40" stroke={strokeColor} strokeWidth="1" fill="none" />
        <rect x="45" y="45" width="10" height="10" stroke={strokeColor} strokeWidth="1" fill="none" />
      </svg>,
      // 7: Dots grid
      <svg viewBox="0 0 100 100" className="shape-svg">
        {Array.from({ length: 5 }).map((_, r) => 
          Array.from({ length: 5 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={15 + c * 17.5} cy={15 + r * 17.5} r="2" fill={strokeColor} />
          ))
        )}
      </svg>,
      // 8: Semi-circle lines
      <svg viewBox="0 0 100 100" className="shape-svg">
        <path d="M 10 50 A 40 40 0 0 1 90 50" stroke={strokeColor} strokeWidth="1" fill="none" />
        <line x1="10" y1="50" x2="90" y2="50" stroke={strokeColor} strokeWidth="1" />
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={10 + i * 10} y1="50" x2={10 + i * 10} y2="100" stroke={strokeColor} strokeWidth="1" />
        ))}
      </svg>,
      // 9: Abstract triangles
      <svg viewBox="0 0 100 100" className="shape-svg">
        <polygon points="50,10 90,80 10,80" stroke={strokeColor} strokeWidth="1" fill="none" />
        <polygon points="50,25 78,73 22,73" stroke={strokeColor} strokeWidth="1" fill="none" />
      </svg>
    ];

    return shapes[index % shapes.length];
  };

  return (
    <div ref={containerRef} className="splash-screen">
      {/* Background Architectural Grid Pattern */}
      <div ref={gridRef} className="splash-geometric-grid">
        {Array.from({ length: 36 }).map((_, idx) => (
          <div key={idx} className="grid-item-shape">
            {renderShape(idx)}
          </div>
        ))}
      </div>

      {/* Diagonal Light Sweep Layer */}
      <div className="splash-light-sweep" />

      {/* Centered Typography taglines */}
      <div ref={textRef} className="splash-text-container">
        <div className="splash-text-line-wrapper">
          <h1 className="splash-text-line">YOUR GROWTH</h1>
        </div>
        <div className="splash-text-line-wrapper">
          <h1 className="splash-text-line">OUR MISSION.</h1>
        </div>
      </div>
    </div>
  );
}
