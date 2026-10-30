import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS DATA
   ═══════════════════════════════════════════════════════════════ */
const reviews = [
  {
    id: 1,
    quote: "Nuzarox architected a truly world-class e-commerce platform — interactive 3D customizers, sub-second checkout, and craftsmanship that elevated our brand internationally.",
    highlight: "world-class",
    name: 'Balaji',
    role: 'Founder & CEO',
    company: 'Gagner Sports',
    avatar: 'B',
    gradient: ['#0A2E5C', '#00A896'],
    metric: { value: '120', suffix: '%', label: 'Conversion Boost' }
  },
  {
    id: 2,
    quote: "Their technical depth and aesthetic taste are genuinely unmatched. Customer engagement surged and European partner inquiries grew by over eighty-six percent.",
    highlight: "unmatched",
    name: 'Siva',
    role: 'Marketing Director',
    company: 'Gagner Sports',
    avatar: 'S',
    gradient: ['#00A896', '#00E5FF'],
    metric: { value: '86', suffix: '%', label: 'Partner Growth' }
  },
  {
    id: 3,
    quote: "Custom WebGL animations, reactive shaders, and kinetic typography brought our portfolio to an international benchmark. Architecture that loads instantaneously.",
    highlight: "international benchmark",
    name: 'Keerthieswaran',
    role: 'Lead Developer',
    company: 'KE19 Studio',
    avatar: 'K',
    gradient: ['#0A2E5C', '#3B82F6'],
    metric: { value: '0.8', suffix: 's', label: 'Load Time' }
  },
  {
    id: 4,
    quote: "They don't just build websites — they engineer digital ecosystems that command absolute market authority. The attention to detail is obsessive and brilliant.",
    highlight: "digital ecosystems",
    name: 'Ruthra',
    role: 'Brand Strategist',
    company: 'Creative Consultant',
    avatar: 'R',
    gradient: ['#00A896', '#0A2E5C'],
    metric: { value: '3', suffix: 'x', label: 'Brand Recall' }
  },
  {
    id: 5,
    quote: "The interactive 3D virtual tour delivered pure luxury. High-net-worth clients repeatedly praise the effortless navigation and stunning visual fidelity.",
    highlight: "pure luxury",
    name: 'Lokesh',
    role: 'Operations Lead',
    company: 'Aura Residence',
    avatar: 'L',
    gradient: ['#0A2E5C', '#00E5FF'],
    metric: { value: '200', suffix: '%', label: 'Bookings Up' }
  }
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */
const AnimatedCounter = ({ value, suffix }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const numVal = parseFloat(value);
    const isDecimal = value.includes('.');
    const obj = { val: 0 };

    gsap.to(obj, {
      val: numVal,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplay(isDecimal ? obj.val.toFixed(1) : Math.round(obj.val).toString());
      }
    });
  }, [value]);

  return (
    <span ref={ref} className="t-counter-val">
      {display}<span className="t-counter-suffix">{suffix}</span>
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════════
   INFINITE MARQUEE TICKER
   ═══════════════════════════════════════════════════════════════ */
const Ticker = () => {
  const items = [...reviews, ...reviews, ...reviews, ...reviews];
  return (
    <div className="t-ticker-wrap">
      <div className="t-ticker-track">
        {items.map((r, i) => (
          <div key={i} className="t-ticker-item">
            <span className="t-ticker-dot" style={{ background: `linear-gradient(135deg, ${r.gradient[0]}, ${r.gradient[1]})` }} />
            <span className="t-ticker-name">{r.name}</span>
            <span className="t-ticker-sep">·</span>
            <span className="t-ticker-company">{r.company}</span>
            <span className="t-ticker-stars">★★★★★</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const quoteBoxRef = useRef(null);
  const metricBoxRef = useRef(null);
  const autoRef = useRef(null);

  const t = reviews[active];

  const switchTo = useCallback((idx) => {
    if (idx === active || animating) return;
    setAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(idx);
        setTimeout(() => setAnimating(false), 50);
      }
    });

    if (quoteBoxRef.current) {
      tl.to(quoteBoxRef.current, { opacity: 0, y: 30, duration: 0.3, ease: 'power3.in' }, 0);
    }
    if (metricBoxRef.current) {
      tl.to(metricBoxRef.current, { opacity: 0, x: 20, duration: 0.25, ease: 'power2.in' }, 0);
    }
  }, [active, animating]);

  // Animate IN on active change
  useEffect(() => {
    if (!quoteBoxRef.current) return;
    gsap.fromTo(quoteBoxRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' });
    if (metricBoxRef.current) {
      gsap.fromTo(metricBoxRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 });
    }
  }, [active]);

  // Auto rotate
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % reviews.length);
    }, 6500);
    return () => clearInterval(autoRef.current);
  }, []);

  const handleClick = (idx) => {
    clearInterval(autoRef.current);
    switchTo(idx);
    autoRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % reviews.length);
    }, 6500);
  };

  // Highlight the special word in the quote
  const renderQuote = (quote, highlight) => {
    if (!highlight) return quote;
    const idx = quote.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx === -1) return quote;
    const before = quote.slice(0, idx);
    const match = quote.slice(idx, idx + highlight.length);
    const after = quote.slice(idx + highlight.length);
    return (
      <>
        {before}
        <span className="t-highlight">{match}</span>
        {after}
      </>
    );
  };

  return (
    <section ref={sectionRef} id="testimonials" className="t-section">
      <style>{`
        /* ══════════════════════════════════════════════
           SECTION WRAPPER
           ══════════════════════════════════════════════ */
        .t-section {
          position: relative;
          padding: 0;
          background: #F5F3EF;
          overflow: hidden;
          font-family: var(--font-body);
        }

        /* ══════════════════════════════════════════════
           HERO QUOTE AREA — Full-width editorial
           ══════════════════════════════════════════════ */
        .t-hero {
          position: relative;
          padding: 7rem 2rem 5rem;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Soft radial glow behind quote */
        .t-radial-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 900px;
          height: 900px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,168,150,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Decorative floating rings */
        .t-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(10, 46, 92, 0.06);
          pointer-events: none;
          z-index: 0;
        }
        .t-ring-1 { width: 500px; height: 500px; top: 10%; right: -120px; border-color: rgba(0,168,150,0.08); }
        .t-ring-2 { width: 350px; height: 350px; bottom: 15%; left: -80px; border-color: rgba(10,46,92,0.06); }
        .t-ring-3 { width: 200px; height: 200px; top: 25%; left: 12%; border-style: dashed; border-color: rgba(0,168,150,0.07); }

        .t-hero-inner {
          max-width: 1100px;
          width: 100%;
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4rem;
          align-items: center;
        }

        /* ══════════════════════════════════════════════
           SECTION LABEL (matching site headers)
           ══════════════════════════════════════════════ */
        .t-label-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2.5rem;
        }

        .t-label-line {
          width: 22px;
          height: 2.5px;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          border-radius: 2px;
        }

        .t-label-text {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: var(--font-display);
        }

        /* ══════════════════════════════════════════════
           MASSIVE EDITORIAL QUOTE TEXT
           ══════════════════════════════════════════════ */
        .t-quote-mega {
          font-size: clamp(1.6rem, 3.5vw, 2.8rem);
          font-weight: 700;
          line-height: 1.45;
          color: #111827;
          font-family: var(--font-display);
          letter-spacing: -0.03em;
          margin: 0 0 3rem 0;
          position: relative;
        }

        .t-quote-mega::before {
          content: '"';
          position: absolute;
          top: -0.3em;
          left: -0.05em;
          font-size: 6em;
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400;
          line-height: 1;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0.1;
          pointer-events: none;
          user-select: none;
        }

        .t-highlight {
          position: relative;
          display: inline;
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }

        .t-highlight::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          right: 0;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          opacity: 0.3;
        }

        /* ══════════════════════════════════════════════
           AUTHOR ROW
           ══════════════════════════════════════════════ */
        .t-author-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .t-author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 800;
          color: #FFF;
          font-family: var(--font-display);
          box-shadow: 0 12px 32px rgba(10, 46, 92, 0.18);
          flex-shrink: 0;
          position: relative;
        }

        /* Pulse ring around avatar */
        .t-author-avatar::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 24px;
          border: 2px solid transparent;
          background: linear-gradient(135deg, rgba(10,46,92,0.15), rgba(0,168,150,0.15)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .t-author-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .t-author-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0B0C10;
          font-family: var(--font-display);
        }

        .t-author-role-text {
          font-size: 0.82rem;
          color: #666;
          font-weight: 500;
        }

        .t-author-company-text {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .t-stars-row {
          display: flex;
          gap: 2px;
          margin-top: 4px;
        }

        .t-stars-row span {
          font-size: 0.8rem;
          color: #FFB800;
          filter: drop-shadow(0 0 3px rgba(255,184,0,0.25));
        }

        /* ══════════════════════════════════════════════
           RIGHT SIDE — METRIC + NAV DOTS
           ══════════════════════════════════════════════ */
        .t-right-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        /* Big metric card */
        .t-metric-card {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          border: 2px solid rgba(10, 46, 92, 0.06);
          box-shadow:
            0 20px 50px rgba(10, 46, 92, 0.08),
            0 0 0 1px rgba(0, 168, 150, 0.04);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
        }

        .t-metric-card:hover {
          transform: scale(1.05);
          box-shadow:
            0 25px 60px rgba(10, 46, 92, 0.12),
            0 0 0 2px rgba(0, 168, 150, 0.1);
        }

        /* Spinning dashed orbit ring around metric */
        .t-metric-card::before {
          content: '';
          position: absolute;
          inset: -16px;
          border-radius: 50%;
          border: 1.5px dashed rgba(0, 168, 150, 0.2);
          animation: t-spin 25s linear infinite;
        }

        @keyframes t-spin {
          to { transform: rotate(360deg); }
        }

        .t-counter-val {
          font-size: 2.8rem;
          font-weight: 900;
          font-family: var(--font-display);
          line-height: 1;
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .t-counter-suffix {
          font-size: 0.55em;
          font-weight: 700;
        }

        .t-metric-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 6px;
          text-align: center;
        }

        /* Vertical navigation dots */
        .t-nav-dots {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }

        .t-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgba(10, 46, 92, 0.15);
          background: transparent;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .t-dot:hover {
          border-color: #00A896;
          transform: scale(1.2);
        }

        .t-dot.active {
          border-color: transparent;
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          transform: scale(1.3);
          box-shadow: 0 0 12px rgba(0, 168, 150, 0.35);
        }

        /* Connecting line between dots */
        .t-dot-line {
          width: 1.5px;
          height: 20px;
          background: rgba(10, 46, 92, 0.08);
        }

        /* Counter text (1/5) */
        .t-nav-counter {
          font-size: 0.75rem;
          font-family: var(--font-display);
          font-weight: 700;
          color: #999;
          margin-top: 4px;
          letter-spacing: 0.05em;
        }

        .t-nav-counter strong {
          color: #0A2E5C;
          font-size: 1rem;
        }

        /* ══════════════════════════════════════════════
           BOTTOM TICKER STRIP
           ══════════════════════════════════════════════ */
        .t-ticker-wrap {
          overflow: hidden;
          padding: 1.2rem 0;
          border-top: 1px solid rgba(10, 46, 92, 0.06);
          border-bottom: 1px solid rgba(10, 46, 92, 0.06);
          background: rgba(255, 255, 255, 0.5);
        }

        .t-ticker-track {
          display: flex;
          gap: 2.5rem;
          white-space: nowrap;
          animation: t-ticker-scroll 40s linear infinite;
          width: max-content;
        }

        @keyframes t-ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }

        .t-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .t-ticker-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .t-ticker-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: #333;
          font-family: var(--font-display);
        }

        .t-ticker-sep {
          color: #CCC;
          font-size: 0.9rem;
        }

        .t-ticker-company {
          font-size: 0.78rem;
          color: #888;
          font-weight: 500;
        }

        .t-ticker-stars {
          font-size: 0.6rem;
          color: #FFB800;
          letter-spacing: 1px;
        }

        /* ══════════════════════════════════════════════
           BOTTOM CTA BAR
           ══════════════════════════════════════════════ */
        .t-cta-bar {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .t-trust-row {
          display: flex;
          gap: 3rem;
        }

        .t-trust-item {
          display: flex;
          flex-direction: column;
        }

        .t-trust-big {
          font-size: 1.5rem;
          font-weight: 900;
          font-family: var(--font-display);
          color: #0B0C10;
          line-height: 1;
        }

        .t-trust-big span {
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .t-trust-sub {
          font-size: 0.7rem;
          color: #888;
          font-weight: 600;
          margin-top: 4px;
        }

        .t-cta-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .t-google-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.5rem 1rem;
          background: #FFF;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 999px;
          font-size: 0.8rem;
          color: #444;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }

        .t-google-badge strong { color: #0A2E5C; }

        .t-review-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.6rem 1.4rem;
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          border: none;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #FFF !important;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(10,46,92,0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .t-review-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(10,46,92,0.3);
        }

        /* ══════════════════════════════════════════════
           RESPONSIVE
           ══════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .t-hero { padding: 5.5rem 1.5rem 4rem; min-height: auto; }
          .t-hero-inner { gap: 3rem; }
          .t-metric-card { width: 150px; height: 150px; }
          .t-counter-val { font-size: 2.2rem; }
        }

        @media (max-width: 820px) {
          .t-hero { padding: 4.5rem 1.2rem 3rem; }
          .t-hero-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .t-right-col {
            flex-direction: row;
            justify-content: center;
            gap: 2rem;
          }
          .t-nav-dots {
            flex-direction: row;
            gap: 10px;
          }
          .t-dot-line {
            width: 16px;
            height: 1.5px;
          }
          .t-ring-1, .t-ring-3 { display: none; }
          .t-quote-mega::before { font-size: 4em; }
          .t-cta-bar {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 2rem 1.2rem;
          }
          .t-trust-row { gap: 2rem; }
          .t-cta-actions { justify-content: center; }
        }

        @media (max-width: 480px) {
          .t-hero { padding: 3.5rem 1rem 2.5rem; }
          .t-quote-mega { font-size: 1.35rem; line-height: 1.55; }
          .t-author-avatar { width: 48px; height: 48px; border-radius: 16px; }
          .t-metric-card { width: 120px; height: 120px; }
          .t-metric-card::before { inset: -10px; }
          .t-counter-val { font-size: 1.8rem; }
          .t-metric-label { font-size: 0.62rem; }
          .t-right-col { gap: 1.5rem; }
          .t-dot { width: 12px; height: 12px; }
          .t-trust-row { gap: 1.5rem; }
          .t-trust-big { font-size: 1.2rem; }
        }
      `}</style>

      {/* ══════════ HERO QUOTE AREA ══════════ */}
      <div className="t-hero">
        {/* Decorative elements */}
        <div className="t-radial-bg" />
        <div className="t-ring t-ring-1" />
        <div className="t-ring t-ring-2" />
        <div className="t-ring t-ring-3" />

        <div className="t-hero-inner">
          {/* LEFT: Quote + Author */}
          <div ref={quoteBoxRef}>
            <div className="t-label-row">
              <span className="t-label-line" />
              <span className="t-label-text">Client Testimonials</span>
            </div>

            <p className="t-quote-mega">
              {renderQuote(t.quote, t.highlight)}
            </p>

            <div className="t-author-row">
              <div
                className="t-author-avatar"
                style={{ background: `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})` }}
              >
                {t.avatar}
              </div>
              <div className="t-author-details">
                <span className="t-author-name">{t.name}</span>
                <span className="t-author-role-text">{t.role}</span>
                <span className="t-author-company-text">{t.company}</span>
                <div className="t-stars-row">
                  {Array.from({ length: 5 }, (_, i) => <span key={i}>★</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Metric Circle + Nav Dots */}
          <div className="t-right-col">
            <div ref={metricBoxRef} className="t-metric-card">
              <AnimatedCounter
                key={`${active}-${t.metric.value}`}
                value={t.metric.value}
                suffix={t.metric.suffix}
              />
              <span className="t-metric-label">{t.metric.label}</span>
            </div>

            <div className="t-nav-dots">
              {reviews.map((_, idx) => (
                <React.Fragment key={idx}>
                  <button
                    className={`t-dot ${idx === active ? 'active' : ''}`}
                    onClick={() => handleClick(idx)}
                    aria-label={`View review ${idx + 1}`}
                  />
                  {idx < reviews.length - 1 && <div className="t-dot-line" />}
                </React.Fragment>
              ))}
              <span className="t-nav-counter">
                <strong>0{active + 1}</strong> / 0{reviews.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ INFINITE TICKER STRIP ══════════ */}
      <Ticker />

      {/* ══════════ BOTTOM CTA BAR ══════════ */}
      <div className="t-cta-bar">
        <div className="t-trust-row">
          <div className="t-trust-item">
            <span className="t-trust-big"><span>50+</span></span>
            <span className="t-trust-sub">Projects Delivered</span>
          </div>
          <div className="t-trust-item">
            <span className="t-trust-big"><span>100%</span></span>
            <span className="t-trust-sub">Satisfaction Rate</span>
          </div>
          <div className="t-trust-item">
            <span className="t-trust-big"><span>5.0</span></span>
            <span className="t-trust-sub">Client Rating</span>
          </div>
        </div>

        <div className="t-cta-actions">
          <div className="t-google-badge">
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
            className="t-review-link"
          >
            ★ Leave a Review
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
