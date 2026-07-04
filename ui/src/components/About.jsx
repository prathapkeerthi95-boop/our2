import React, { useRef, useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════
   CARD DIMENSIONS — All cards are the exact same size
   ═══════════════════════════════════════════════════════ */
const CARD_W = 560, CARD_H = 280;

/* ═══════════════════════════════════════════════════════
   6 CARDS — Left-to-Right layout (12, 34, 56) with swapped accents
   ═══════════════════════════════════════════════════════ */
const steps = [
  {
    id: 'step-01', number: '01',
    title: 'Optimized Speed',
    description: 'Blazing fast load times under 1.2s — we obsess over every millisecond others ignore.',
    icon: ZapIcon, accent: '#00F0FF', // Cyan
    cx: 340, cy: 220, // Row 1 Left (Long)
  },
  {
    id: 'step-02', number: '02',
    title: 'Rock-Solid Security',
    description: 'Enterprise-grade zero-trust architecture that others simply can\'t match.',
    icon: ShieldIcon, accent: '#00A3FF', // Blue
    cx: 1470, cy: 220, // Row 1 Right (Short)
  },
  {
    id: 'step-03', number: '03',
    title: 'Pixel-Perfect Design',
    description: 'Award-winning UI/UX crafted with surgical precision — no generic templates ever.',
    icon: PaletteIcon, accent: '#00A3FF', // Blue
    cx: 450, cy: 540, // Row 2 Left (Short)
  },
  {
    id: 'step-04', number: '04',
    title: 'Clean Architecture',
    description: 'Scalable, maintainable codebases built with SOLID principles from day one.',
    icon: CodeIcon, accent: '#00F0FF', // Cyan
    cx: 1580, cy: 540, // Row 2 Right (Long)
  },
  {
    id: 'step-05', number: '05',
    title: 'AI-Powered Testing',
    description: 'Intelligent automated QA with coverage that catches bugs before they exist.',
    icon: CpuIcon, accent: '#00F0FF', // Cyan
    cx: 340, cy: 860, // Row 3 Left (Long)
  },
  {
    id: 'step-06', number: '06',
    title: 'Zero-Downtime Deploy',
    description: 'Seamless CI/CD with instant rollback — your users never notice a thing.',
    icon: RocketIcon, accent: '#00A3FF', // Blue
    cx: 1470, cy: 860, // Row 3 Right (Short)
  }
];

// Swapped card icons inline to keep lucide imports lightweight
function ZapIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>; }
function ShieldIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function PaletteIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03461 19.176 5.28253 19.2413 5.51747 19.1729C5.7524 19.1044 5.9388 18.9138 6.00977 18.6756C6.18434 18.0898 6.47543 17.5619 6.86241 17.1121C7.45266 16.4259 8.27218 16 9.20002 16H14.8C15.4627 16 16 15.4627 16 14.8V13.2C16 12.5373 15.4627 12 14.8 12H9.20002C7.54317 12 6.20002 13.3431 6.20002 15C6.20002 15.2289 6.17429 15.452 6.126 15.6669C6.07923 15.875 5.92211 16.0357 5.71966 16.0825C5.10515 16.2246 4.54228 16.5165 4.07221 16.9242C2.7844 15.626 2 13.9056 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/></svg>; }
function CodeIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>; }
function CpuIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>; }
function RocketIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5L18.5 4.5 19.5 5.5l-14 11.002Z"/><path d="m12 5 3 3L8.5 14.5l-3-3L12 5Z"/><path d="m19 9 1.5 1.5-3 3-1.5-1.5 3-3Z"/></svg>; }

// Organic randomized Timing delays and pop durations for the 6 cards (approx 2.5s desynchronized cycle)
const popDelays = [0.4, 1.6, 0.8, 2.0, 1.2, 0.0];
const popDurations = [2.4, 2.6, 2.3, 2.7, 2.5, 2.8];

// Staggered timing values for the 20 main lines
const delays = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 0.1, 0.3, 0.5, 0.7, 0.9, 1.1, 1.3, 1.5, 1.7, 1.9, 0.25, 0.75, 1.25, 1.75];

/* ═══════════════════════════════════════════════════════
   20 Motherboard/PCB Style SVG Paths with 45-degree bends (Image 1 Style)
   ═══════════════════════════════════════════════════════ */
const getLinePath = (i) => {
  switch (i) {
    case 0: return "M 750 440 L 530 220 L 620 220"; 
    case 1: return "M 1170 440 L 1390 220 L 1190 220"; 
    case 2: return "M 750 540 L 730 540"; 
    case 3: return "M 1170 540 L 1300 540"; 
    case 4: return "M 750 640 L 530 860 L 620 860"; 
    case 5: return "M 1170 640 L 1390 860 L 1190 860"; 
    
    case 6: return "M 750 380 L 490 120 L 100 120 L -50 120"; 
    case 7: return "M 1170 380 L 1430 120 L 1820 120 L 1970 120"; 
    case 8: return "M 750 700 L 490 960 L 100 960 L -50 960"; 
    case 9: return "M 1170 700 L 1430 960 L 1820 960 L 1970 960"; 
    case 10: return "M 900 330 L 830 260 L 500 260 L 340 100 L -50 100"; 
    case 11: return "M 1020 330 L 1090 260 L 1420 260 L 1580 100 L 1970 100"; 
    case 12: return "M 900 750 L 830 820 L 500 820 L 340 980 L -50 980"; 
    case 13: return "M 1020 750 L 1090 820 L 1420 820 L 1580 980 L 1970 980"; 
    case 14: return "M 750 490 L 560 300 L 100 300 L -50 300"; 
    case 15: return "M 1170 490 L 1360 300 L 1820 300 L 1970 300"; 
    case 16: return "M 750 590 L 560 780 L 100 780 L -50 780"; 
    case 17: return "M 1170 590 L 1360 780 L 1820 780 L 1970 780"; 
    case 18: return "M 960 330 L 960 150 L 860 50 L 700 50 L 700 -50"; 
    case 19: return "M 960 750 L 960 930 L 1060 1030 L 1220 1030 L 1220 1130"; 
    default: return "";
  }
};

/* Helper to parse coordinates and return start & end terminals */
const getTerminals = (i) => {
  const path = getLinePath(i);
  if (!path) return { x1: 0, y1: 0, x2: 0, y2: 0 };
  const coords = path.replace(/[M L]/g, '').trim().split(/\s+/).map(Number);
  return {
    x1: coords[0] || 0,
    y1: coords[1] || 0,
    x2: coords[coords.length - 2] || 0,
    y2: coords[coords.length - 1] || 0
  };
};

/* ═══════════════════════════════════════════════════════
   36 Motherboard style scatter lines (6 per card, 6 cards - 45 degree bends matching Image 1)
   ═══════════════════════════════════════════════════════ */
const getScatterPath = (cIdx, sIdx) => {
  switch (cIdx) {
    case 0: // Card 0 (Step 01 - cx: 340, cy: 220)
      switch (sIdx) {
        case 0: return "M 60 150 L -50 40";
        case 1: return "M 60 220 L -50 220";
        case 2: return "M 60 290 L -50 400";
        case 3: return "M 340 80 L 340 -50";
        case 4: return "M 200 80 L 70 -50";
        case 5: return "M 480 80 L 610 -50";
        default: return "";
      }
    case 1: // Card 1 (Step 02 - cx: 1470, cy: 220)
      switch (sIdx) {
        case 0: return "M 1750 150 L 1860 40";
        case 1: return "M 1750 220 L 1970 220";
        case 2: return "M 1750 290 L 1860 400";
        case 3: return "M 1470 80 L 1470 -50";
        case 4: return "M 1330 80 L 1200 -50";
        case 5: return "M 1610 80 L 1740 -50";
        default: return "";
      }
    case 2: // Card 2 (Step 03 - cx: 450, cy: 540)
      switch (sIdx) {
        case 0: return "M 170 470 L -50 250";
        case 1: return "M 170 540 L -50 540";
        case 2: return "M 170 610 L -50 830";
        case 3: return "M 450 400 L 350 300";
        case 4: return "M 450 680 L 350 780";
        case 5: return "M 170 500 L -50 280";
        default: return "";
      }
    case 3: // Card 3 (Step 04 - cx: 1580, cy: 540)
      switch (sIdx) {
        case 0: return "M 1860 470 L 1970 360";
        case 1: return "M 1860 540 L 1970 540";
        case 2: return "M 1860 610 L 1970 720";
        case 3: return "M 1580 400 L 1480 300";
        case 4: return "M 1580 680 L 1480 780";
        case 5: return "M 1860 500 L 1970 390";
        default: return "";
      }
    case 4: // Card 4 (Step 05 - cx: 340, cy: 860)
      switch (sIdx) {
        case 0: return "M 60 790 L -50 680";
        case 1: return "M 60 860 L -50 860";
        case 2: return "M 60 930 L -50 1040";
        case 3: return "M 340 1000 L 340 1130";
        case 4: return "M 200 1000 L 70 1130";
        case 5: return "M 480 1000 L 610 1130";
        default: return "";
      }
    case 5: // Card 5 (Step 06 - cx: 1470, cy: 860)
      switch (sIdx) {
        case 0: return "M 1750 790 L 1860 680";
        case 1: return "M 1750 860 L 1970 860";
        case 2: return "M 1750 930 L 1860 1040";
        case 3: return "M 1470 1000 L 1470 1130";
        case 4: return "M 1330 1000 L 1200 1130";
        case 5: return "M 1610 1000 L 1740 1130";
        default: return "";
      }
    default: return "";
  }
};

const About = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const [scale, setScale] = useState(1);
  const [bgLoaded, setBgLoaded] = useState(false);

  // Scale Wrapper to viewport
  useEffect(() => {
    let tid = null;
    const calc = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080, 1.15);
      setScale(s);
    };
    const onResize = () => { clearTimeout(tid); tid = setTimeout(calc, 80); };
    calc();
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(tid); };
  }, []);

  // Lazy load heavy background image
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setBgLoaded(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px' });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Direct DOM Hover Highlight mutations - completely bypasses :has() parent tree recalculation passes
  const handleCardEnter = (idx) => {
    const baseTrack = document.querySelector(`[data-base-link="${idx}"]`);
    if (baseTrack) {
      baseTrack.style.opacity = '0.55';
      baseTrack.style.strokeWidth = '2.2px';
    }
    const pulseTracks = document.querySelectorAll(`[data-card-link="${idx}"]`);
    pulseTracks.forEach(el => {
      el.style.opacity = '0.95';
      el.style.strokeWidth = '6.5px';
    });
    const scatterTracks = document.querySelectorAll(`[data-scatter-link="${idx}"]`);
    scatterTracks.forEach(el => {
      el.style.opacity = '0.95';
    });
  };

  const handleCardLeave = (idx) => {
    const baseTrack = document.querySelector(`[data-base-link="${idx}"]`);
    if (baseTrack) {
      baseTrack.style.opacity = '0.22';
      baseTrack.style.strokeWidth = '1.5px';
    }
    const pulseTracks = document.querySelectorAll(`[data-card-link="${idx}"]`);
    pulseTracks.forEach(el => {
      el.style.opacity = '0.72';
      el.style.strokeWidth = '5.0px';
    });
    const scatterTracks = document.querySelectorAll(`[data-scatter-link="${idx}"]`);
    scatterTracks.forEach(el => {
      el.style.opacity = '0.15';
    });
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="about-section"
      style={{
        height: '100vh',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundImage: bgLoaded ? "url('/images/page 2 background.png')" : 'none',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 
        PURE CSS ANIMATION SYSTEM (GPU COMPOSITED)
        - Offloads 100% of calculations to the browser's paint pipeline
        - Zero JS timers during scroll/swipe guarantees maximal UI fluid speeds matching the Hero section
        - Uses hardware-accelerated opacity layers to fully eliminate CSS box-shadow repaint triggers
      */}
      <style>{`
        @keyframes spinCW   { from{transform:translate(-50%,-50%) rotate(0deg)}   to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes fanSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        
        /* Neon bulb flicker repeating every 2 seconds */
        @keyframes bulbFlicker {
          0%, 78%, 100% { opacity: 1; }
          80% { opacity: 0.35; }
          82% { opacity: 0.95; }
          84% { opacity: 0.22; }
          86% { opacity: 1; }
          88% { opacity: 0.4; }
          90%, 98% { opacity: 1; }
        }

        /* 2-Second Main Path Pulse */
        @keyframes pulseMain {
          0% { stroke-dashoffset: 1200; opacity: 0; }
          10% { opacity: 1; }
          50%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        /* 
          SLOW AUTO-POP KEYFRAMES (Cycle ~2.5s)
          - Slow, smooth pop transition as requested ("slow pop irundha podhum")
          - Runs out of order using randomized delays for a natural feel
        */
        @keyframes cardAutoPop {
          0%, 35%, 75%, 100% {
            transform: translate(-50%, -50%) scale(1.0) translate3d(0,0,0);
          }
          50%, 60% {
            transform: translate(-50%, -50%) scale(1.04) translate3d(0,0,0);
          }
        }

        /* Separate GPU track for card body borders to avoid layout repaint calculations */
        @keyframes borderAutoPop {
          0%, 35%, 75%, 100% { border-color: rgba(255, 255, 255, 0.5); }
          50%, 60% { border-color: #00F0FF; }
        }

        /* Separate GPU track for pseudo-element shadow opacity (0% CPU cost) */
        @keyframes shadowAutoPop {
          0%, 35%, 75%, 100% { opacity: 0; }
          50%, 60% { opacity: 1; }
        }

        /* Scatter lines fire from card outward exactly at 50% of the cycle */
        @keyframes pulseScatter {
          0%, 50% { stroke-dashoffset: 800; opacity: 0; }
          52% { opacity: 1; }
          75%, 100% { stroke-dashoffset: 0; opacity: 0; }
        }

        .cpu-fan-blades { 
          animation: fanSpin 4s infinite linear; 
          transform-origin: center; 
          transform: translate3d(0,0,0);
        }
        .bulb-flicker-text { animation: bulbFlicker 2s infinite; }

        /* Hardware acceleration layer setups to lock cursor at 144 FPS */
        .circuit-board-wrapper,
        .circuit-board-wrapper svg,
        .circuit-card,
        .card-body,
        .card-glow-overlay,
        .about-section svg,
        .about-section div[style*="radial-gradient"] {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          will-change: transform;
        }

        /* ─── CARD LAYOUT & STYLING ─── */
        .circuit-card { 
          position:absolute; 
          transform:translate(-50%,-50%) translate3d(0,0,0); 
          z-index:10; 
          transition:transform .4s cubic-bezier(.16,1,.3,1); 
          backface-visibility: hidden;
          will-change: transform;
        }
        .circuit-card.sz-big { width:${CARD_W}px; height:${CARD_H}px; }
        .circuit-card:hover { transform:translate(-50%,-50%) scale(1.06)!important; z-index:15; }

        /* Outer boxes: 90% OPAQUE Slate Grey (0% backdrop-filter blur overhead) */
        .card-body {
          position:relative; width:100%; height:100%;
          background:rgba(37, 40, 48, 0.90);
          border:2px solid rgba(255, 255, 255, 0.5); border-radius:18px;
          padding:26px 30px; display:flex; flex-direction:column;
          justify-content:flex-start; gap:14px;
          box-shadow:0 8px 32px 0 rgba(0, 0, 0, 0.35); overflow:hidden;
          transition:border-color 0.4s, background-color 0.4s;
        }
        
        /* 
          GPU composited shadow pseudo-element
          - Bypasses Chrome shadow blur re-rasterizations on card scale updates
        */
        .card-glow-overlay {
          position: absolute;
          inset: -2px;
          border-radius: 18px;
          border: 2px solid #00F0FF;
          background: rgba(45, 49, 60, 0.94);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }
        .circuit-card:hover .card-glow-overlay {
          opacity: 1 !important;
          animation: none !important;
        }

        /* ─── CHIP PINS — HIGH DENSITY GLOWING PINS ─── */
        .chip-pins { position:absolute; z-index:1; }
        .chip-pins.lp { left:-11px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:12px; }
        .chip-pins.rp { right:-11px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:12px; }
        .chip-pins.tp { top:-11px; left:50%; transform:translateX(-50%); display:flex; gap:18px; }
        .chip-pins.bp { bottom:-11px; left:50%; transform:translateX(-50%); display:flex; gap:18px; }

        .pin-h {
          width:12px; height:5px; 
          background:#00F0FF; border:1px solid #00F0FF; border-radius:1px;
          box-shadow:0 0 8px rgba(0, 240, 255, 0.6);
        }
        .pin-v {
          width:5px; height:12px; 
          background:#00F0FF; border:1px solid #00F0FF; border-radius:1px;
          box-shadow:0 0 8px rgba(0, 240, 255, 0.6);
        }

        /* Decorative Corners */
        .corner { position:absolute; width:14px; height:14px; border-color:rgba(0, 240, 255, 0.65); border-style:solid; pointer-events:none; transition:border-color .3s; }
        .circuit-card:hover .corner { border-color:var(--ha)!important; }
        .corner.tl { top:8px; left:8px; border-width:1.8px 0 0 1.8px; }
        .corner.tr { top:8px; right:8px; border-width:1.8px 1.8px 0 0; }
        .corner.bl { bottom:8px; left:8px; border-width:0 0 1.8px 1.8px; }
        .corner.br { bottom:8px; right:8px; border-width:0 1.8px 1.8px 0; }

        /* Typography sizing & Glowing title style */
        .card-header { display:flex; justify-content:space-between; align-items:center; position:relative; z-index:2; }
        
        /* 
          Blue Color Numbers and Icons (contrasted nicely with the cyan card headers)
        */
        .icon-wrapper {
          width:56px; height:56px; border-radius:50%;
          border:1px solid rgba(0, 163, 255, 0.45); background:rgba(0, 163, 255, 0.08);
          display:flex; align-items:center; justify-content:center; 
          color: #00A3FF;
          transition:all .4s ease;
        }
        .step-num { 
          font-family:var(--font-display),sans-serif; 
          font-size:2.3rem; 
          font-weight:800; 
          letter-spacing:-0.02em;
          color: #00A3FF;
          text-shadow: 0 0 8px rgba(0, 163, 255, 0.65);
        }
        
        /* Cyan Glow Card Title - Increased size for better readability */
        .card-title { 
          font-family:var(--font-display),sans-serif; 
          font-size:2.15rem; 
          font-weight:700; 
          color:#00F0FF; 
          margin:0 0 6px; 
          letter-spacing:0.01em; 
          text-shadow: 0 0 8px rgba(0, 255, 255, 0.65), 0 0 20px rgba(0, 255, 255, 0.3);
        }
        
        /* Card description paragraph - Increased size for readability */
        .card-desc { font-size:1.45rem; color:rgba(255,255,255,0.92); margin:0; line-height:1.55; }
      `}</style>

      {/* GIGANTIC BACKGROUND CPU FAN */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) translate3d(0,0,0)',
        width: '92vh',
        height: '92vh',
        opacity: 0.032,
        pointerEvents: 'none',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', animation: 'fanSpin 24s infinite linear' }} shapeRendering="optimizeSpeed">
          <g>
            <circle cx="100" cy="100" r="30" fill="none" stroke="#00F0FF" strokeWidth="2.0" />
            {Array.from({ length: 5 }).map((_, idx) => {
              const angle = (idx * 72) * Math.PI / 180;
              const x1 = 100 + 30 * Math.cos(angle);
              const y1 = 100 + 30 * Math.sin(angle);
              const x2 = 100 + 95 * Math.cos(angle + 0.35);
              const y2 = 100 + 95 * Math.sin(angle + 0.35);
              const x3 = 100 + 100 * Math.cos(angle + 0.7);
              const y3 = 100 + 100 * Math.sin(angle + 0.7);
              const x4 = 100 + 38 * Math.cos(angle + 0.3);
              const y4 = 100 + 38 * Math.sin(angle + 0.3);
              return (
                <path
                  key={idx}
                  d={`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3} Q ${x4} ${y4} ${x1} ${y1}`}
                  fill="#00F0FF"
                  stroke="rgba(0, 240, 255, 0.4)"
                  strokeWidth="0.5"
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Background grid */}
      <div style={{ position:'absolute', inset:0, zIndex:0, opacity:0.06, pointerEvents:'none', backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'65px 65px', maskImage:'radial-gradient(circle at 50% 50%,black 40%,transparent 85%)', WebkitMaskImage:'radial-gradient(circle at 50% 50%,black 40%,transparent 85%)' }} />

      {/* Ambient Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '30%', left: '40%',
          width: '60vw', height: '60vw',
          background: `radial-gradient(circle, #00F0FF12 0%, transparent 70%)`,
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'translate3d(0,0,0)'
        }} 
      />

      {/* ═══ CANVAS WRAPPER (Hardware accelerated to prevent cursor lag) ═══ */}
      <div 
        ref={wrapperRef} 
        className="circuit-board-wrapper"
        style={{ 
          position:'relative', 
          width:'1920px', 
          height:'1080px', 
          flexShrink:0, 
          zIndex:5, 
          transform: `translate3d(0, 0, 0) scale(${scale})`,
          willChange: 'transform'
        }}
      >

        {/* ═══ SVG CONTAINER FOR LIGHT FLOW CIRCUIT LINES ═══ */}
        <svg viewBox="0 0 1920 1080" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:1 }} shapeRendering="optimizeSpeed">
          
          {/* 20 Motherboard style base tracks with 45-degree bends & circle terminals */}
          {Array.from({ length: 20 }).map((_, idx) => (
            <path
              key={`base-track-${idx}`}
              d={getLinePath(idx)}
              stroke="#00F0FF"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.22"
              data-base-link={idx < 6 ? idx : -1}
              style={{ transition: 'opacity 0.4s, stroke-width 0.4s' }}
            />
          ))}

          {/* Hollow circle terminals at start and end of tracks */}
          {Array.from({ length: 20 }).map((_, idx) => {
            const term = getTerminals(idx);
            return (
              <g key={`terminals-${idx}`}>
                <circle cx={term.x1} cy={term.y1} r="4.5" fill="none" stroke="#00F0FF" strokeWidth="1.5" />
                <circle cx={term.x2} cy={term.y2} r="4.5" fill="none" stroke="#00F0FF" strokeWidth="1.5" />
              </g>
            );
          })}

          {/* 20 Dual-Layered Active Pulse Groups (Pure CSS infinite loop animation) */}
          {Array.from({ length: 20 }).map((_, idx) => (
            <g
              key={`active-pulse-g-${idx}`}
              fill="none"
              strokeLinecap="round"
            >
              {/* Outer light glow stroke */}
              <path
                d={getLinePath(idx)}
                stroke="rgba(0, 240, 255, 0.42)"
                strokeWidth="5.0"
                strokeDasharray="55 1200"
                strokeDashoffset="1200"
                opacity="0.72"
                data-card-link={idx < 6 ? idx : -1}
                style={{
                  animation: `pulseMain 2.0s infinite linear`,
                  animationDelay: `${delays[idx]}s`,
                  transition: 'opacity 0.4s, stroke-width 0.4s'
                }}
              />
              {/* Inner bright core stroke */}
              <path
                d={getLinePath(idx)}
                stroke="#E0FFFF"
                strokeWidth="1.6"
                strokeDasharray="55 1200"
                strokeDashoffset="1200"
                opacity="0.95"
                style={{
                  animation: `pulseMain 2.0s infinite linear`,
                  animationDelay: `${delays[idx]}s`
                }}
              />
            </g>
          ))}

          {/* 6 Cards * 6 Scatter Lines = 36 lines that fire outwards when card is reached (Pure CSS Synced loop) */}
          {Array.from({ length: 6 }).map((_, cIdx) => (
            <g key={`scatter-g-card-${cIdx}`}>
              {Array.from({ length: 6 }).map((_, sIdx) => {
                const d = getScatterPath(cIdx, sIdx);
                if (!d) return null;
                const coords = d.replace(/[M L]/g, '').trim().split(/\s+/).map(Number);
                const x1 = coords[0], y1 = coords[1];
                const x2 = coords[coords.length - 2], y2 = coords[coords.length - 1];

                return (
                  <g key={`scatter-g-line-${sIdx}`} fill="none" strokeLinecap="round">
                    {/* Base Track */}
                    <path
                      d={d}
                      stroke="#00F0FF"
                      strokeWidth="1.2"
                      opacity="0.15"
                      data-scatter-link={cIdx}
                      style={{ transition: 'opacity 0.4s' }}
                    />
                    {/* Hollow endpoints */}
                    <circle cx={x1} cy={y1} r="4.5" fill="none" stroke="#00F0FF" strokeWidth="1.5" />
                    <circle cx={x2} cy={y2} r="4.5" fill="none" stroke="#00F0FF" strokeWidth="1.5" />

                    {/* Outer glow stroke */}
                    <path
                      d={d}
                      stroke="rgba(0, 240, 255, 0.42)"
                      strokeWidth="5"
                      strokeDasharray="35 800"
                      strokeDashoffset="800"
                      opacity="0.72"
                      data-scatter-link={cIdx}
                      style={{
                        animation: `pulseScatter 2.0s infinite linear`,
                        animationDelay: `${delays[cIdx]}s`,
                        transition: 'opacity 0.4s'
                      }}
                    />
                    {/* Inner core stroke */}
                    <path
                      d={d}
                      stroke="#E0FFFF"
                      strokeWidth="1.6"
                      strokeDasharray="35 800"
                      strokeDashoffset="800"
                      opacity="0.95"
                      style={{
                        animation: `pulseScatter 2.0s infinite linear`,
                        animationDelay: `${delays[cIdx]}s`
                      }}
                    />
                  </g>
                );
              })}
            </g>
          ))}
        </svg>

        {/* ═══ CENTER CPU CHIP (Enlarged size: 420px x 420px, Solid Opaque Dark Grey) ═══ */}
        <div style={{
          position:'absolute', top:'540px', left:'960px', transform:'translate(-50%,-50%) translate3d(0,0,0)',
          width:'420px', height:'420px', zIndex:12,
          background:'rgba(27, 30, 36, 0.98)',
          border:'2.5px solid #00F0FF',
          boxShadow:'0 0 35px rgba(0, 240, 255, 0.7), 0 0 70px rgba(0, 240, 255, 0.45), inset 0 0 25px rgba(0, 240, 255, 0.5)',
          borderRadius:'24px', display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          {/* 
            5 CONCENTRIC INNER SQUARE BORDERS (Highlights the square socket inner edge)
            - Intense Cyan (glowing highlights) and Vivid Blue (contrast detailing)
          */}
          <div style={{ position: 'absolute', inset: '4px', border: '2.2px solid #00F0FF', borderRadius: '22px', boxShadow: '0 0 15px rgba(0, 240, 255, 0.75), inset 0 0 10px rgba(0, 240, 255, 0.45)', pointerEvents: 'none', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: '10px', border: '1.5px dashed rgba(0, 163, 255, 0.85)', borderRadius: '20px', boxShadow: '0 0 12px rgba(0, 163, 255, 0.5)', pointerEvents: 'none', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: '16px', border: '1.2px solid #00F0FF', borderRadius: '18px', boxShadow: '0 0 10px rgba(0, 240, 255, 0.65)', pointerEvents: 'none', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: '22px', border: '1.2px dashed rgba(0, 163, 255, 0.75)', borderRadius: '16px', pointerEvents: 'none', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: '28px', border: '1.8px solid #00F0FF', borderRadius: '14px', boxShadow: '0 0 12px rgba(0, 240, 255, 0.6)', pointerEvents: 'none', zIndex: 1 }} />

          {/* Dashed ring */}
          <div className="center-glow-ring outer-dashed" style={{
            position:'absolute', top:'50%', left:'50%', width:'390px', height:'390px',
            border:'1.5px dashed rgba(255,255,255,0.2)', borderRadius:'50%',
            animation:'spinCW 25s infinite linear', zIndex:1
          }}/>
          {/* Pulsing solid ring */}
          <div className="center-glow-ring inner-solid" style={{
            position:'absolute', top:'50%', left:'50%', width:'360px', height:'360px',
            border:'2px solid rgba(255,255,255,0.25)', borderRadius:'50%',
            zIndex:1, transition:'all .3s ease'
          }}/>

          {/* 35 Glowing Pins around Center CPU Box (Distributed: 9 left, 9 top, 9 bottom, 8 right) */}
          <div className="chip-pins lp" style={{ left: '-11px', gap: '30px' }}>
            {[0,1,2,3,4,5,6,7,8].map(k => <span key={k} className="pin-h" />)}
          </div>
          <div className="chip-pins rp" style={{ right: '-11px', gap: '35px' }}>
            {[0,1,2,3,4,5,6,7].map(k => <span key={k} className="pin-h" />)}
          </div>
          <div className="chip-pins tp" style={{ top: '-11px', gap: '30px' }}>
            {[0,1,2,3,4,5,6,7,8].map(k => <span key={k} className="pin-v" />)}
          </div>
          <div className="chip-pins bp" style={{ bottom: '-11px', gap: '30px' }}>
            {[0,1,2,3,4,5,6,7,8].map(k => <span key={k} className="pin-v" />)}
          </div>

          {/* Core Circle — STRICTLY SOLID SLATE GREY (Image 2 Shade #606870) */}
          <div style={{
            position:'relative', width:'330px', height:'330px', borderRadius:'50%',
            background:'#606870', border:'2px solid rgba(255, 255, 255, 0.45)',
            boxShadow:'0 8px 32px rgba(0,0,0,0.3)',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            textAlign:'center', padding:'25px', zIndex:2, overflow:'hidden',
            transform: 'translate3d(0,0,0)'
          }}>
            {/* Spinning fan inside Core (5 Large Wings, High visibility) */}
            <svg width="300" height="300" viewBox="0 0 300 300" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%) translate3d(0,0,0)', zIndex:0, pointerEvents:'none' }} shapeRendering="optimizeSpeed">
              <g className="cpu-fan-blades" opacity="0.65">
                <circle cx="150" cy="150" r="28" fill="rgba(0,240,255,0.35)" stroke="#00F0FF" strokeWidth="2.0"/>
                {Array.from({length:5}).map((_,idx)=>{
                  const a=(idx*72)*Math.PI/180;
                  const x1=150+28*Math.cos(a), y1=150+28*Math.sin(a);
                  const x2=150+105*Math.cos(a+0.4), y2=150+105*Math.sin(a+0.4);
                  const x3=150+112*Math.cos(a+0.7), y3=150+112*Math.sin(a+0.7);
                  const x4=150+38*Math.cos(a+0.35), y4=150+38*Math.sin(a+0.35);
                  return <path key={idx} d={`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3} Q ${x4} ${y4} ${x1} ${y1}`} fill="rgba(0,240,255,0.45)" stroke="rgba(0,240,255,0.85)" strokeWidth="2.0"/>;
                })}
              </g>
              <circle cx="150" cy="150" r="110" fill="none" stroke="rgba(0,240,255,0.08)" strokeWidth="1" strokeDasharray="15 8"/>
              <circle cx="150" cy="150" r="85" fill="none" stroke="rgba(0,240,255,0.1)" strokeWidth="1" strokeDasharray="40 12"/>
            </svg>

            {/* Texts — "OUR CREATIVE PROCESS" with Neon bulb flicker & Custom Glow Shadow */}
            <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center' }}>
              <h3 className="bulb-flicker-text" style={{ 
                margin:0, fontSize:'3.15rem', fontWeight:900, textTransform:'uppercase', 
                letterSpacing:'0.07em', lineHeight:1.15, textAlign:'center',
                color: 'white',
                textShadow: '0 0 8px rgba(0,255,255,.5), 0 0 20px rgba(0,255,255,.25)'
              }}>
                Our Creative<br/>Process
              </h3>
            </div>
          </div>
        </div>

        {/* ═══ 6 CARDS — Same Big Size, Spaced Alternatingly (12, 34, 56 Layout) ═══ */}
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.id} ref={el => cardsRef.current[i] = el}
              className="circuit-card sz-big"
              data-card-idx={i}
              onMouseEnter={() => handleCardEnter(i)}
              onMouseLeave={() => handleCardLeave(i)}
              style={{ 
                left:`${step.cx}px`, 
                top:`${step.cy}px`, 
                '--ha':step.accent, 
                '--hag':`${step.accent}70`, 
                '--hai':`${step.accent}30`,
                animation: `cardAutoPop ${popDurations[i]}s infinite linear`,
                animationDelay: `${popDelays[i]}s`
              }}
            >
              {/* 4-SIDED CHIP PINS — 30 Pins Total (10 left, 10 right, 5 top, 5 bottom) */}
              <div className="chip-pins lp">
                {[0,1,2,3,4,5,6,7,8,9].map(k=><span key={k} className="pin-h"/>)}
              </div>
              <div className="chip-pins rp">
                {[0,1,2,3,4,5,6,7,8,9].map(k=><span key={k} className="pin-h"/>)}
              </div>
              <div className="chip-pins tp">
                {[0,1,2,3,4].map(k=><span key={k} className="pin-v"/>)}
              </div>
              <div className="chip-pins bp">
                {[0,1,2,3,4].map(k=><span key={k} className="pin-v"/>)}
              </div>

              {/* Card Body — 90% Opaque slate grey (0% backdrop-filter blur overhead for 144 FPS) */}
              <div className="card-body" style={{
                animation: `borderAutoPop ${popDurations[i]}s infinite linear`,
                animationDelay: `${popDelays[i]}s`
              }}>
                {/* Glow pseudo-element overlay animation mapped to custom delays */}
                <div 
                  className="card-glow-overlay"
                  style={{
                    boxShadow: `0 0 50px ${step.accent}70, inset 0 0 20px ${step.accent}30`,
                    animation: `shadowAutoPop ${popDurations[i]}s infinite linear`,
                    animationDelay: `${popDelays[i]}s`
                  }} 
                />

                <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:1}}>
                  <span className="corner tl"/><span className="corner tr"/>
                  <span className="corner bl"/><span className="corner br"/>
                </div>

                <div className="card-header">
                  <div className="icon-wrapper">
                    <Icon size={32}/>
                  </div>
                  <span className="step-num">{step.number}</span>
                </div>

                <div style={{ marginTop:'10px', position:'relative', zIndex:2 }}>
                  <h4 className="card-title">{step.title}</h4>
                  <p className="card-desc">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default About;
