import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════════════════════
   PREMIUM CLIENT TESTIMONIALS DATA
   (Nimmi & Mani removed, real high-impact projects only)
   ═══════════════════════════════════════════════════════════════ */
const clients = [
  {
    id: 1,
    name: 'Balaji',
    role: 'Founder & CEO',
    company: 'Gagner Sports',
    location: 'Paris & Online',
    project: 'Next.js 3D WebGL Storefront',
    tag: 'E-COMMERCE / 3D WEB',
    quote: "Nuzarox architected a truly world-class e-commerce platform for us — complete with interactive 3D product customizers, sub-second checkout, and craftsmanship that elevated our brand internationally across Europe.",
    stats: [
      { label: 'Mobile Conversion', val: '+120%' },
      { label: 'Avg Page Load', val: '0.6s' }
    ],
    avatarBg: 'linear-gradient(135deg, #0A2E5C, #00A896)',
    accentColor: '#00A896',
    verifiedId: 'NZ-VERIFIED-8491'
  },
  {
    id: 2,
    name: 'Siva',
    role: 'Marketing Director',
    company: 'Gagner Sports',
    location: 'Chennai, India',
    project: 'Brand Engine & Growth',
    tag: 'BRANDING & MARKETING',
    quote: "Working with Nuzarox was transformative for our entire digital presence. From intuitive mobile UX to kinetic motion design, our customer engagement and European partner inquiries surged by over 86%.",
    stats: [
      { label: 'Partner Inquiries', val: '+86%' },
      { label: 'Brand Reach', val: '3.4x' }
    ],
    avatarBg: 'linear-gradient(135deg, #00A896, #00E5FF)',
    accentColor: '#00E5FF',
    verifiedId: 'NZ-VERIFIED-9214'
  },
  {
    id: 3,
    name: 'Keerthieswaran',
    role: 'Lead Developer',
    company: 'KE19 Studio',
    location: 'Chennai, India',
    project: 'Kinetic Portfolio & Shaders',
    tag: 'INTERACTIVE WEBGL',
    quote: "The custom WebGL shaders, reactive mouse physics, and kinetic typography engineered by Nuzarox brought KE19 Portfolio to an international design benchmark. Ultra-clean code that loads instantaneously.",
    stats: [
      { label: 'Design Score', val: '9.8/10' },
      { label: 'Bounce Rate', val: '-42%' }
    ],
    avatarBg: 'linear-gradient(135deg, #0A2E5C, #3B82F6)',
    accentColor: '#3B82F6',
    verifiedId: 'NZ-VERIFIED-3810'
  },
  {
    id: 4,
    name: 'Ruthra',
    role: 'Brand Strategist',
    company: 'Creative Consultant',
    location: 'Tamil Nadu',
    project: 'Digital Identity & Systems',
    tag: 'BRAND STRATEGY',
    quote: "The obsessive attention to UX detail, responsive fluidity, and brand storytelling sets Nuzarox apart in a crowded market. They don't just build websites — they engineer digital ecosystems that command authority.",
    stats: [
      { label: 'Brand Recall', val: '3x' },
      { label: 'Client Retention', val: '98%' }
    ],
    avatarBg: 'linear-gradient(135deg, #00A896, #0A2E5C)',
    accentColor: '#00A896',
    verifiedId: 'NZ-VERIFIED-7104'
  },
  {
    id: 5,
    name: 'Lokesh',
    role: 'Operations & Tech Lead',
    company: 'Aura Luxury Residence',
    location: 'Mayiladuthurai',
    project: '3D VR Virtual Walkthroughs',
    tag: 'REAL ESTATE / 3D VR',
    quote: "The interactive 3D virtual tour experience and consultation interface created by Nuzarox delivered pure luxury. High-net-worth clients repeatedly praise the effortless navigation and visual fidelity.",
    stats: [
      { label: 'Inquiries', val: '+200%' },
      { label: 'Tour Time', val: '4.8m' }
    ],
    avatarBg: 'linear-gradient(135deg, #0A2E5C, #00E5FF)',
    accentColor: '#00E5FF',
    verifiedId: 'NZ-VERIFIED-5521'
  }
];

const Testimonials = () => {
  const [deck, setDeck] = useState(clients);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const cardRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const currentDrag = useRef({ x: 0, y: 0 });
  const audioIntervalRef = useRef(null);
  const [waveHeights, setWaveHeights] = useState([12, 24, 18, 30, 16, 22, 28, 14, 20, 26, 15, 23]);

  // Handle Voice Note simulation
  useEffect(() => {
    if (isAudioPlaying) {
      audioIntervalRef.current = setInterval(() => {
        setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * 26) + 8));
      }, 120);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setWaveHeights([10, 16, 12, 18, 14, 10, 16, 12, 14, 18, 10, 12]);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isAudioPlaying]);

  // Swipe Card Handlers
  const triggerSwipe = useCallback((direction) => {
    if (deck.length === 0) return;
    setSwipeDirection(direction);
    setIsAudioPlaying(false);

    const el = cardRef.current;
    if (el) {
      const flyX = direction === 'right' ? window.innerWidth * 0.8 : -window.innerWidth * 0.8;
      const flyRot = direction === 'right' ? 35 : -35;

      gsap.to(el, {
        x: flyX,
        y: 60,
        rotation: flyRot,
        opacity: 0,
        duration: 0.42,
        ease: 'power2.in',
        onComplete: () => {
          // Move top card to back of deck
          setDeck(prev => {
            const nextDeck = [...prev];
            const popped = nextDeck.shift();
            nextDeck.push(popped);
            return nextDeck;
          });
          setSwipeDirection(null);
          gsap.set(el, { x: 0, y: 0, rotation: 0, opacity: 1 });
        }
      });
    }
  }, [deck]);

  // Mouse / Touch Gesture Handlers for Physics Drag
  const onPointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    dragStart.current = { x: clientX, y: clientY };
    currentDrag.current = { x: 0, y: 0 };
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;
    currentDrag.current = { x: deltaX, y: deltaY };

    if (cardRef.current) {
      const rot = deltaX * 0.07;
      gsap.set(cardRef.current, {
        x: deltaX,
        y: deltaY * 0.35,
        rotation: rot,
        cursor: 'grabbing'
      });
    }
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaX = currentDrag.current.x;

    // Threshold check: swipe out if dragged more than 110px
    if (deltaX > 110) {
      triggerSwipe('right');
    } else if (deltaX < -110) {
      triggerSwipe('left');
    } else {
      // Snap back with natural rubber spring
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.65)'
        });
      }
    }
  };

  const activeCard = deck[0];
  const nextCard = deck[1];
  const thirdCard = deck[2];

  return (
    <section id="testimonials" className="nz-3d-testi-section">
      <style>{`
        /* ═══════════════════════════════════════════════
           SECTION CONTAINER & ATMOSPHERE
           ═══════════════════════════════════════════════ */
        .nz-3d-testi-section {
          position: relative;
          background: #F5F3EF;
          padding: 6.5rem 1.5rem 5.5rem;
          overflow: hidden;
          font-family: var(--font-body);
        }

        /* Architectural Blueprint grid lines in background */
        .nz-bg-blueprint {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(10, 46, 92, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(10, 46, 92, 0.04) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
          z-index: 0;
        }

        .nz-bg-glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .nz-glow-1 {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(0, 168, 150, 0.18) 0%, transparent 70%);
          top: -120px;
          left: -80px;
        }
        .nz-glow-2 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(10, 46, 92, 0.12) 0%, transparent 70%);
          bottom: -150px;
          right: -100px;
        }

        .nz-main-layout {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 4.5rem;
          align-items: center;
        }

        /* ═══════════════════════════════════════════════
           LEFT SIDE: EDITORIAL NARRATIVE & CONTROLS
           ═══════════════════════════════════════════════ */
        .nz-narrative-col {
          display: flex;
          flex-direction: column;
        }

        .nz-tagline-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.2rem;
        }

        .nz-badge-indicator {
          width: 24px;
          height: 2.5px;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          border-radius: 2px;
        }

        .nz-badge-text {
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: var(--font-display);
        }

        .nz-editorial-h2 {
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          font-weight: 900;
          color: #0B0C10;
          font-family: var(--font-display);
          line-height: 1.08;
          letter-spacing: -0.04em;
          margin: 0 0 1.4rem 0;
        }

        .nz-editorial-gradient {
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nz-editorial-desc {
          font-size: 1.02rem;
          line-height: 1.7;
          color: #4A5568;
          margin: 0 0 2.2rem 0;
          max-width: 480px;
        }

        /* Swipe Instruction Badge */
        .nz-gesture-hint {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 0.65rem 1.2rem;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(10, 46, 92, 0.08);
          border-radius: 999px;
          margin-bottom: 2.5rem;
          width: fit-content;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        }

        .nz-gesture-hand-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          animation: handWiggle 2s ease-in-out infinite;
        }

        @keyframes handWiggle {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(4px) rotate(8deg); }
        }

        .nz-gesture-text {
          font-size: 0.8rem;
          font-weight: 700;
          color: #1A202C;
          letter-spacing: 0.02em;
        }

        /* Client Deck Queue Indicator */
        .nz-deck-queue {
          display: flex;
          align-items: center;
          gap: 1.4rem;
        }

        .nz-action-arrows {
          display: flex;
          gap: 10px;
        }

        .nz-btn-round {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid rgba(10, 46, 92, 0.1);
          color: #0A2E5C;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.25rem;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(10, 46, 92, 0.05);
        }

        .nz-btn-round:hover {
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          color: #FFFFFF;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 168, 150, 0.3);
        }

        .nz-deck-counter {
          font-family: var(--font-display);
          font-size: 0.85rem;
          color: #718096;
          font-weight: 700;
        }

        .nz-deck-counter strong {
          color: #0A2E5C;
          font-size: 1.15rem;
        }

        /* ═══════════════════════════════════════════════
           RIGHT SIDE: 3D TINDER PHYSICAL CARD DECK
           ═══════════════════════════════════════════════ */
        .nz-deck-viewport {
          position: relative;
          width: 100%;
          height: 520px;
          perspective: 1200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Background Layer 3 (Deepest) */
        .nz-card-depth-3 {
          position: absolute;
          width: 100%;
          max-width: 470px;
          height: 430px;
          background: #EAE6DF;
          border-radius: 32px;
          border: 1px solid rgba(10, 46, 92, 0.06);
          transform: translateY(34px) scale(0.88);
          opacity: 0.45;
          z-index: 1;
          pointer-events: none;
        }

        /* Background Layer 2 (Middle) */
        .nz-card-depth-2 {
          position: absolute;
          width: 100%;
          max-width: 490px;
          height: 450px;
          background: #FBF9F5;
          border-radius: 32px;
          border: 1px solid rgba(10, 46, 92, 0.08);
          transform: translateY(18px) scale(0.94);
          opacity: 0.75;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
          z-index: 2;
          pointer-events: none;
        }

        /* Top Active Draggable Card (Physics Surface) */
        .nz-card-active-top {
          position: absolute;
          width: 100%;
          max-width: 510px;
          background: #FFFFFF;
          border-radius: 32px;
          border: 1.5px solid rgba(10, 46, 92, 0.08);
          padding: 2.4rem 2.4rem 2rem 2.4rem;
          z-index: 5;
          cursor: grab;
          user-select: none;
          touch-action: none;
          box-shadow: 
            0 25px 60px -10px rgba(10, 46, 92, 0.12),
            0 0 1px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          transform-origin: 50% 100%;
          will-change: transform;
        }

        .nz-card-active-top:active {
          cursor: grabbing;
        }

        /* Verified Security Ribbon */
        .nz-card-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.4rem;
        }

        .nz-industry-pill {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          background: rgba(0, 168, 150, 0.08);
          color: #00A896;
          border: 1px solid rgba(0, 168, 150, 0.2);
        }

        .nz-verified-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          color: #0A2E5C;
          letter-spacing: 0.05em;
        }

        .nz-check-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00A896;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.6rem;
          font-weight: 900;
        }

        /* 5 Golden Stars */
        .nz-card-stars-row {
          display: flex;
          gap: 3px;
          margin-bottom: 1.2rem;
        }

        .nz-card-stars-row span {
          color: #FFB800;
          font-size: 1rem;
          filter: drop-shadow(0 0 4px rgba(255, 184, 0, 0.3));
        }

        /* Editorial Client Quote */
        .nz-card-quote-content {
          font-size: 1.05rem;
          line-height: 1.72;
          color: #1A202C;
          font-weight: 500;
          margin: 0 0 1.8rem 0;
          letter-spacing: -0.01em;
        }

        /* Audio Voice Note Simulator Pill */
        .nz-audio-voice-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.65rem 1rem;
          background: #F7FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          margin-bottom: 1.8rem;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .nz-audio-voice-pill:hover {
          background: #EDF2F7;
          border-color: #CBD5E0;
        }

        .nz-play-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 3px 8px rgba(0, 168, 150, 0.3);
        }

        .nz-wave-bars-container {
          display: flex;
          align-items: center;
          gap: 3px;
          flex-grow: 1;
          height: 32px;
        }

        .nz-wave-bar {
          width: 3px;
          background: #00A896;
          border-radius: 2px;
          transition: height 0.12s ease;
        }

        .nz-audio-duration-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #718096;
          font-family: var(--font-display);
        }

        /* Real Performance Impact Stats inside Card */
        .nz-card-metrics-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 1.8rem;
          padding-top: 1.2rem;
          border-top: 1px dashed rgba(10, 46, 92, 0.1);
        }

        .nz-card-metric-cell {
          background: #F8FAFC;
          border: 1px solid rgba(10, 46, 92, 0.05);
          border-radius: 14px;
          padding: 0.75rem 1rem;
        }

        .nz-cell-val {
          font-size: 1.35rem;
          font-weight: 900;
          font-family: var(--font-display);
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }

        .nz-cell-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 4px;
        }

        /* Author Metadata Footer */
        .nz-card-author-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nz-author-profile {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .nz-avatar-square {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          color: #fff;
          font-weight: 800;
          font-family: var(--font-display);
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(10, 46, 92, 0.15);
        }

        .nz-author-text {
          display: flex;
          flex-direction: column;
        }

        .nz-author-title-name {
          font-size: 1rem;
          font-weight: 800;
          color: #0B0C10;
          font-family: var(--font-display);
        }

        .nz-author-subtitle {
          font-size: 0.76rem;
          color: #718096;
          font-weight: 500;
        }

        .nz-author-company-highlight {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Swipe visual stamp badges */
        .nz-swipe-stamp {
          position: absolute;
          top: 30px;
          padding: 0.4rem 1rem;
          border-radius: 10px;
          font-weight: 900;
          font-size: 1.1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          pointer-events: none;
          z-index: 10;
          opacity: 0;
          transform: rotate(-12deg);
        }

        /* ═══════════════════════════════════════════════
           RESPONSIVE TWEAKS FOR MOBILE & TABLET
           ═══════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .nz-main-layout {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .nz-deck-viewport {
            height: 480px;
          }
          .nz-narrative-col {
            text-align: center;
            align-items: center;
          }
          .nz-editorial-desc {
            max-width: 100%;
          }
        }

        @media (max-width: 600px) {
          .nz-3d-testi-section {
            padding: 4.5rem 1rem 3.5rem;
          }
          .nz-deck-viewport {
            height: 520px;
          }
          .nz-card-active-top {
            padding: 1.8rem 1.4rem 1.6rem 1.4rem;
            border-radius: 24px;
          }
          .nz-card-quote-content {
            font-size: 0.95rem;
            line-height: 1.6;
          }
          .nz-editorial-h2 {
            font-size: 2.1rem;
          }
          .nz-card-depth-2, .nz-card-depth-3 {
            border-radius: 24px;
          }
        }
      `}</style>

      {/* Ambient background meshes */}
      <div className="nz-bg-blueprint" />
      <div className="nz-bg-glow-orb nz-glow-1" />
      <div className="nz-bg-glow-orb nz-glow-2" />

      <div className="nz-main-layout">
        {/* ── LEFT: EDITORIAL STORY & SWIPE CONTROLS ── */}
        <div className="nz-narrative-col">
          <div className="nz-tagline-badge">
            <span className="nz-badge-indicator" />
            <span className="nz-badge-text">Client Testimonials</span>
          </div>

          <h2 className="nz-editorial-h2">
            Engineered For Impact. <br />
            <span className="nz-editorial-gradient">Proven By Leaders.</span>
          </h2>

          <p className="nz-editorial-desc">
            We don't collect standard reviews. We build long-term partnerships with founders, marketing chiefs, and enterprises who demand measurable superiority.
          </p>

          <div className="nz-gesture-hint">
            <div className="nz-gesture-hand-icon">✋</div>
            <span className="nz-gesture-text">Drag or Swipe cards to explore reviews</span>
          </div>

          {/* Interactive Arrow Controls */}
          <div className="nz-deck-queue">
            <div className="nz-action-arrows">
              <button 
                className="nz-btn-round" 
                onClick={() => triggerSwipe('left')}
                aria-label="Previous client testimonial"
              >
                ‹
              </button>
              <button 
                className="nz-btn-round" 
                onClick={() => triggerSwipe('right')}
                aria-label="Next client testimonial"
              >
                ›
              </button>
            </div>

            <div className="nz-deck-counter">
              <strong>0{clients.findIndex(c => c.id === activeCard.id) + 1}</strong> / 0{clients.length} Curated Partners
            </div>
          </div>
        </div>

        {/* ── RIGHT: 3D TINDER PHYSICAL CARD DECK ── */}
        <div className="nz-deck-viewport">
          {/* Depth Layer 3 */}
          <div className="nz-card-depth-3" />

          {/* Depth Layer 2 */}
          <div className="nz-card-depth-2">
            <div style={{ padding: '2.5rem', opacity: 0.3 }}>
              <div style={{ height: '14px', width: '35%', background: '#94A3B8', borderRadius: '4px', marginBottom: '16px' }} />
              <div style={{ height: '18px', width: '85%', background: '#CBD5E1', borderRadius: '4px', marginBottom: '10px' }} />
              <div style={{ height: '18px', width: '70%', background: '#CBD5E1', borderRadius: '4px' }} />
            </div>
          </div>

          {/* Active Top Card (Drag-enabled with spring physics) */}
          <div
            ref={cardRef}
            className="nz-card-active-top"
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseUp={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={onPointerUp}
          >
            {/* Header: Industry tag + Verified Badge */}
            <div className="nz-card-header-bar">
              <span className="nz-industry-pill">{activeCard.tag}</span>
              <div className="nz-verified-badge">
                <span className="nz-check-icon">✓</span>
                <span>{activeCard.verifiedId}</span>
              </div>
            </div>

            {/* 5 Golden Stars */}
            <div className="nz-card-stars-row">
              {Array.from({ length: 5 }, (_, i) => <span key={i}>★</span>)}
            </div>

            {/* Testimonial Quote */}
            <p className="nz-card-quote-content">
              "{activeCard.quote}"
            </p>

            {/* Interactive Audio Voice Note Simulation */}
            <div 
              className="nz-audio-voice-pill" 
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              title="Click to play client audio review"
            >
              <button className="nz-play-btn" aria-label="Play audio snippet">
                {isAudioPlaying ? '❚❚' : '▶'}
              </button>
              <div className="nz-wave-bars-container">
                {waveHeights.map((h, i) => (
                  <div key={i} className="nz-wave-bar" style={{ height: `${h}px` }} />
                ))}
              </div>
              <span className="nz-audio-duration-tag">
                {isAudioPlaying ? '0:14 / 0:28' : 'Voice Memo (0:28)'}
              </span>
            </div>

            {/* Direct Performance Impact Stats */}
            <div className="nz-card-metrics-row">
              {activeCard.stats.map((st, i) => (
                <div key={i} className="nz-card-metric-cell">
                  <div className="nz-cell-val">{st.val}</div>
                  <div className="nz-cell-label">{st.label}</div>
                </div>
              ))}
            </div>

            {/* Author details */}
            <div className="nz-card-author-footer">
              <div className="nz-author-profile">
                <div className="nz-avatar-square" style={{ background: activeCard.avatarBg }}>
                  {activeCard.name.charAt(0)}
                </div>
                <div className="nz-author-text">
                  <span className="nz-author-title-name">{activeCard.name}</span>
                  <span className="nz-author-subtitle">{activeCard.role}</span>
                  <span className="nz-author-company-highlight">{activeCard.company} · {activeCard.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
