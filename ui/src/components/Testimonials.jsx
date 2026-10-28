import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS DATA — Curated enterprise reviews only
   ═══════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    id: 1,
    quote: "Nuzarox architected a truly world-class e-commerce platform for Gagner Sports — interactive 3D product customizers, sub-second checkout, and craftsmanship that elevated our brand internationally.",
    name: 'Balaji',
    role: 'Founder & CEO',
    company: 'Gagner Sports',
    location: 'Paris & Online',
    avatar: 'B',
    accentFrom: '#0A2E5C',
    accentTo: '#00A896',
    stars: 5,
    metric: '+120%',
    metricLabel: 'Mobile Conversions'
  },
  {
    id: 2,
    quote: "From intuitive mobile UX to kinetic motion design, our customer engagement and European partner inquiries surged. Their technical depth and aesthetic taste are genuinely unmatched in this market.",
    name: 'Siva',
    role: 'Marketing Director',
    company: 'Gagner Sports',
    location: 'Chennai',
    avatar: 'S',
    accentFrom: '#00A896',
    accentTo: '#00E5FF',
    stars: 5,
    metric: '+86%',
    metricLabel: 'Partner Inquiries'
  },
  {
    id: 3,
    quote: "The custom WebGL animations, reactive shaders, and kinetic typography brought KE19 Portfolio to an international benchmark. Ultra-clean architecture that loads instantaneously across every device.",
    name: 'Keerthieswaran',
    role: 'Lead Developer',
    company: 'KE19 Studio',
    location: 'Chennai',
    avatar: 'K',
    accentFrom: '#0A2E5C',
    accentTo: '#3B82F6',
    stars: 5,
    metric: '0.8s',
    metricLabel: 'Avg Load Time'
  },
  {
    id: 4,
    quote: "The obsessive attention to UX detail, responsive fluidity, and brand storytelling sets Nuzarox apart. They don't just build websites — they engineer digital ecosystems that command market authority.",
    name: 'Ruthra',
    role: 'Brand Strategist',
    company: 'Creative Consultant',
    location: 'Tamil Nadu',
    avatar: 'R',
    accentFrom: '#00A896',
    accentTo: '#0A2E5C',
    stars: 5,
    metric: '3x',
    metricLabel: 'Brand Recall'
  },
  {
    id: 5,
    quote: "The interactive 3D virtual tour and digital consultation interface delivered pure luxury. High-net-worth clients repeatedly praise the effortless navigation and stunning visual fidelity of the experience.",
    name: 'Lokesh',
    role: 'Operations & Tech Lead',
    company: 'Aura Luxury Residence',
    location: 'Mayiladuthurai',
    avatar: 'L',
    accentFrom: '#0A2E5C',
    accentTo: '#00E5FF',
    stars: 5,
    metric: '+200%',
    metricLabel: 'Client Bookings'
  }
];

/* ═══════════════════════════════════════════════════════════════
   STAR RENDERER
   ═══════════════════════════════════════════════════════════════ */
const Stars = ({ count }) => (
  <div className="nt-stars">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`nt-star ${i < count ? 'filled' : ''}`}>★</span>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const metricRef = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const progressRef = useRef(null);
  const autoPlayRef = useRef(null);

  const t = testimonials[active];

  const goTo = useCallback((idx) => {
    if (idx === active || isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(idx);
        setIsAnimating(false);
      }
    });

    // Animate out
    tl.to(quoteRef.current, { opacity: 0, y: -20, duration: 0.25, ease: 'power2.in' }, 0);
    tl.to(authorRef.current, { opacity: 0, y: -12, duration: 0.2, ease: 'power2.in' }, 0.05);
    tl.to(metricRef.current, { opacity: 0, scale: 0.9, duration: 0.2, ease: 'power2.in' }, 0);
  }, [active, isAnimating]);

  // Animate in when active changes
  useEffect(() => {
    if (!quoteRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(quoteRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0);
    tl.fromTo(authorRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.1);
    tl.fromTo(metricRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)' }, 0.1);
  }, [active]);

  // Auto-rotate every 7s
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(autoPlayRef.current);
  }, []);

  // Reset autoplay on manual click
  const handleSelect = (idx) => {
    clearInterval(autoPlayRef.current);
    goTo(idx);
    autoPlayRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 7000);
  };

  // Progress bar animation
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.fromTo(progressRef.current, { scaleX: 0 }, {
      scaleX: 1,
      duration: 7,
      ease: 'none',
      transformOrigin: 'left center'
    });
  }, [active]);

  return (
    <section ref={sectionRef} id="testimonials" className="nt-section">
      <style>{`
        /* ═══════════════════════════════════════════════
           BASE SECTION — Light premium, matching site theme
           ═══════════════════════════════════════════════ */
        .nt-section {
          position: relative;
          padding: 7rem 2rem;
          background: #F5F3EF;
          overflow: hidden;
          font-family: var(--font-body);
        }

        /* Decorative gradient mesh background */
        .nt-mesh-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .nt-mesh-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
        }
        .nt-orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(0,168,150,0.25), transparent 70%); top: -200px; right: -100px; }
        .nt-orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(10,46,92,0.2), transparent 70%); bottom: -150px; left: -100px; }
        .nt-orb-3 { width: 350px; height: 350px; background: radial-gradient(circle, rgba(0,229,255,0.15), transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); }

        .nt-container {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ═══════════════════════════════════════════════
           HEADER — Matching Services section style
           ═══════════════════════════════════════════════ */
        .nt-header {
          margin-bottom: 4rem;
        }

        .nt-label-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .nt-label-line {
          width: 22px;
          height: 2.5px;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          border-radius: 2px;
        }

        .nt-label-text {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: var(--font-display);
        }

        .nt-title {
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 900;
          color: #0B0C10;
          font-family: var(--font-display);
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin: 0;
        }

        .nt-title-accent {
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ═══════════════════════════════════════════════
           MAIN SHOWCASE LAYOUT
           ═══════════════════════════════════════════════ */
        .nt-showcase {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 3rem;
          align-items: stretch;
        }

        /* ═══════════════════════════════════════════════
           FEATURED QUOTE CARD — Large left side
           ═══════════════════════════════════════════════ */
        .nt-featured {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(10, 46, 92, 0.08);
          border-radius: 32px;
          padding: 3.5rem 3.5rem 3rem 3.5rem;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 400px;
          box-shadow:
            0 20px 60px rgba(10, 46, 92, 0.06),
            0 1px 3px rgba(0, 0, 0, 0.04);
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .nt-featured:hover {
          border-color: rgba(0, 168, 150, 0.18);
          box-shadow:
            0 25px 70px rgba(10, 46, 92, 0.1),
            0 1px 3px rgba(0, 0, 0, 0.04);
        }

        /* Corner gradient accent */
        .nt-corner-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 280px;
          height: 280px;
          border-radius: 0 32px 0 50%;
          opacity: 0.08;
          pointer-events: none;
          transition: opacity 0.6s ease;
        }

        .nt-featured:hover .nt-corner-glow {
          opacity: 0.14;
        }

        /* Big opening quote mark */
        .nt-big-quote {
          position: absolute;
          top: 28px;
          left: 32px;
          font-size: 8rem;
          font-family: Georgia, serif;
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0.08;
          pointer-events: none;
          user-select: none;
        }

        .nt-quote-text {
          font-size: clamp(1.1rem, 1.8vw, 1.35rem);
          line-height: 1.8;
          color: #1A1A2E;
          font-weight: 500;
          margin: 0 0 2.5rem 0;
          position: relative;
          z-index: 2;
          letter-spacing: -0.01em;
        }

        .nt-author-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .nt-author-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nt-avatar {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFF;
          font-family: var(--font-display);
          box-shadow: 0 8px 24px rgba(10, 46, 92, 0.15);
          flex-shrink: 0;
        }

        .nt-author-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .nt-author-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0B0C10;
          font-family: var(--font-display);
        }

        .nt-author-role {
          font-size: 0.78rem;
          color: #555;
          font-weight: 600;
        }

        .nt-author-company {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Metric highlight chip */
        .nt-metric-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 1.6rem;
          border-radius: 20px;
          background: rgba(10, 46, 92, 0.04);
          border: 1px solid rgba(10, 46, 92, 0.08);
        }

        .nt-metric-value {
          font-size: 1.8rem;
          font-weight: 900;
          font-family: var(--font-display);
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }

        .nt-metric-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 4px;
        }

        /* Progress bar below featured card */
        .nt-progress-track {
          height: 3px;
          background: rgba(10, 46, 92, 0.06);
          border-radius: 2px;
          margin-top: 1.5rem;
          overflow: hidden;
        }

        .nt-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          border-radius: 2px;
          transform-origin: left center;
        }

        /* ═══════════════════════════════════════════════
           RIGHT SIDE — Vertical Dot Navigator + Mini Cards
           ═══════════════════════════════════════════════ */
        .nt-sidebar {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nt-mini-card {
          position: relative;
          padding: 1.4rem 1.4rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.6);
          border: 1.5px solid rgba(10, 46, 92, 0.06);
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          gap: 14px;
          overflow: hidden;
        }

        .nt-mini-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          border-radius: 0 4px 4px 0;
          background: transparent;
          transition: background 0.35s ease;
        }

        .nt-mini-card:hover {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(0, 168, 150, 0.15);
          transform: translateX(-4px);
          box-shadow: 0 8px 24px rgba(10, 46, 92, 0.06);
        }

        .nt-mini-card.active {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(0, 168, 150, 0.25);
          box-shadow:
            0 12px 32px rgba(10, 46, 92, 0.08),
            0 0 0 1px rgba(0, 168, 150, 0.1);
          transform: translateX(-6px);
        }

        .nt-mini-card.active::before {
          background: linear-gradient(180deg, #0A2E5C, #00A896);
        }

        .nt-mini-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          color: #FFF;
          font-family: var(--font-display);
          flex-shrink: 0;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .nt-mini-card.active .nt-mini-avatar {
          opacity: 1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .nt-mini-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .nt-mini-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: #222;
          font-family: var(--font-display);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nt-mini-company {
          font-size: 0.68rem;
          font-weight: 600;
          color: #888;
        }

        .nt-mini-stars {
          display: flex;
          gap: 1px;
          margin-top: 2px;
        }

        .nt-mini-stars span {
          font-size: 0.6rem;
          color: #FFB800;
        }

        /* ═══════════════════════════════════════════════
           STARS
           ═══════════════════════════════════════════════ */
        .nt-stars {
          display: flex;
          gap: 3px;
          margin-bottom: 1.2rem;
        }

        .nt-star {
          font-size: 1rem;
          color: #D1D5DB;
        }

        .nt-star.filled {
          color: #FFB800;
          filter: drop-shadow(0 0 4px rgba(255, 184, 0, 0.3));
        }

        /* ═══════════════════════════════════════════════
           BOTTOM TRUST BAR
           ═══════════════════════════════════════════════ */
        .nt-trust-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 3.5rem;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(10, 46, 92, 0.06);
          border-radius: 20px;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .nt-trust-stats {
          display: flex;
          gap: 3rem;
        }

        .nt-trust-stat {
          display: flex;
          flex-direction: column;
        }

        .nt-trust-num {
          font-size: 1.6rem;
          font-weight: 900;
          font-family: var(--font-display);
          color: #0B0C10;
          line-height: 1;
        }

        .nt-trust-num span {
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nt-trust-label {
          font-size: 0.72rem;
          color: #777;
          font-weight: 600;
          margin-top: 4px;
        }

        .nt-trust-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .nt-google-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.55rem 1.1rem;
          background: #FFF;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 999px;
          font-size: 0.82rem;
          color: #333;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .nt-google-pill strong {
          color: #0A2E5C;
        }

        .nt-review-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.6rem 1.4rem;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          border: none;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #FFFFFF !important;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(10, 46, 92, 0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .nt-review-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(10, 46, 92, 0.3);
        }

        /* ═══════════════════════════════════════════════
           RESPONSIVE
           ═══════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .nt-section { padding: 5rem 1.5rem; }
          .nt-showcase { grid-template-columns: 1fr 280px; gap: 2rem; }
          .nt-featured { padding: 2.8rem 2.5rem 2.2rem 2.5rem; }
        }

        @media (max-width: 820px) {
          .nt-section { padding: 4rem 1rem; }
          .nt-showcase {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .nt-sidebar {
            flex-direction: row;
            overflow-x: auto;
            gap: 10px;
            padding-bottom: 4px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .nt-sidebar::-webkit-scrollbar { display: none; }
          .nt-mini-card {
            min-width: 180px;
            flex-shrink: 0;
          }
          .nt-mini-card:hover, .nt-mini-card.active {
            transform: translateY(-3px) translateX(0);
          }
          .nt-mini-card.active::before {
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 3px;
            border-radius: 3px 3px 0 0;
            background: linear-gradient(90deg, #0A2E5C, #00A896);
          }
          .nt-featured {
            padding: 2.2rem 1.6rem 1.8rem 1.6rem;
            border-radius: 24px;
            min-height: auto;
          }
          .nt-big-quote { font-size: 5rem; top: 16px; left: 18px; }
          .nt-author-section { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .nt-trust-bar {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.2rem;
            padding: 1.2rem 1.5rem;
          }
          .nt-trust-stats { gap: 2rem; }
          .nt-trust-actions { justify-content: center; }
        }

        @media (max-width: 480px) {
          .nt-section { padding: 3rem 0.8rem; }
          .nt-featured { padding: 1.8rem 1.3rem 1.5rem 1.3rem; border-radius: 20px; }
          .nt-quote-text { font-size: 1rem; line-height: 1.7; }
          .nt-avatar { width: 44px; height: 44px; border-radius: 12px; }
          .nt-metric-chip { padding: 0.8rem 1.2rem; }
          .nt-metric-value { font-size: 1.4rem; }
          .nt-mini-card { min-width: 160px; padding: 1rem 1rem; }
          .nt-trust-stats { gap: 1.5rem; }
        }
      `}</style>

      {/* Decorative background mesh */}
      <div className="nt-mesh-bg">
        <div className="nt-mesh-orb nt-orb-1" />
        <div className="nt-mesh-orb nt-orb-2" />
        <div className="nt-mesh-orb nt-orb-3" />
      </div>

      <div className="nt-container">
        {/* Section Header — same style as Services */}
        <div className="nt-header">
          <div className="nt-label-row">
            <span className="nt-label-line" />
            <span className="nt-label-text">Client Testimonials</span>
          </div>
          <h2 className="nt-title">
            What Our Clients <span className="nt-title-accent">Say About Us</span>
          </h2>
        </div>

        {/* Main Showcase: Featured Card + Sidebar Nav */}
        <div className="nt-showcase">
          {/* LEFT: Featured Review */}
          <div>
            <div ref={cardRef} className="nt-featured">
              <div
                className="nt-corner-glow"
                style={{ background: `linear-gradient(135deg, ${t.accentFrom}, ${t.accentTo})` }}
              />
              <span className="nt-big-quote">"</span>

              <div>
                <div ref={quoteRef}>
                  <Stars count={t.stars} />
                  <p className="nt-quote-text">"{t.quote}"</p>
                </div>

                <div ref={authorRef} className="nt-author-section">
                  <div className="nt-author-left">
                    <div
                      className="nt-avatar"
                      style={{ background: `linear-gradient(135deg, ${t.accentFrom}, ${t.accentTo})` }}
                    >
                      {t.avatar}
                    </div>
                    <div className="nt-author-info">
                      <span className="nt-author-name">{t.name}</span>
                      <span className="nt-author-role">{t.role}</span>
                      <span className="nt-author-company">{t.company} · {t.location}</span>
                    </div>
                  </div>

                  <div ref={metricRef} className="nt-metric-chip">
                    <span className="nt-metric-value">{t.metric}</span>
                    <span className="nt-metric-label">{t.metricLabel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="nt-progress-track">
              <div ref={progressRef} className="nt-progress-bar" key={active} />
            </div>
          </div>

          {/* RIGHT: Vertical Mini Card Navigator */}
          <div className="nt-sidebar">
            {testimonials.map((item, idx) => (
              <div
                key={item.id}
                className={`nt-mini-card ${idx === active ? 'active' : ''}`}
                onClick={() => handleSelect(idx)}
              >
                <div
                  className="nt-mini-avatar"
                  style={{ background: `linear-gradient(135deg, ${item.accentFrom}, ${item.accentTo})` }}
                >
                  {item.avatar}
                </div>
                <div className="nt-mini-info">
                  <span className="nt-mini-name">{item.name}</span>
                  <span className="nt-mini-company">{item.company}</span>
                  <div className="nt-mini-stars">
                    {Array.from({ length: item.stars }, (_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Bar — Stats + Google Review CTA */}
        <div className="nt-trust-bar">
          <div className="nt-trust-stats">
            <div className="nt-trust-stat">
              <span className="nt-trust-num"><span>50+</span></span>
              <span className="nt-trust-label">Projects Delivered</span>
            </div>
            <div className="nt-trust-stat">
              <span className="nt-trust-num"><span>100%</span></span>
              <span className="nt-trust-label">Client Satisfaction</span>
            </div>
            <div className="nt-trust-stat">
              <span className="nt-trust-num"><span>5.0</span></span>
              <span className="nt-trust-label">Average Rating</span>
            </div>
          </div>

          <div className="nt-trust-actions">
            <div className="nt-google-pill">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Rated <strong>4.9 / 5</strong></span>
            </div>

            <a
              href="https://search.google.com/local/writereview?placeid=ChIJ-3eN1XpUUrkR4aWfR6Y9nZ0"
              target="_blank"
              rel="noopener noreferrer"
              className="nt-review-btn"
            >
              ★ Leave a Review
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
