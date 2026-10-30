import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clientReviews = [
  {
    id: 'gagner-1',
    client: 'Gagner Sports',
    category: 'E-Commerce / 3D WebGL',
    quote: 'Nuzarox completely reimagined how athletes and clubs order bespoke gear. The interactive 3D customizer combined with ultra-fast Shopify headless architecture pushed our European market conversion through the roof. Their engineering precision, zero-friction checkout, and round-the-clock technical excellence made our international digital expansion an extraordinary success. World-class engineering from start to finish.',
    person: 'Balaji',
    role: 'Founder & CEO, Gagner Sports · Paris & Online',
    avatar: 'B',
    avatarBg: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)',
    statNum: '+120%',
    statLabel: 'Conversion Growth'
  },
  {
    id: 'gagner-2',
    client: 'Gagner Sports',
    category: 'Growth & Marketing',
    quote: 'Their technical depth and aesthetic taste are genuinely unmatched. Our digital customer engagement and European partner inquiries grew by over eighty-six percent in 90 days. Every micro-interaction feels intentional, fluid, and designed to inspire buyer trust on every single screen.',
    person: 'Siva',
    role: 'Marketing Director, Gagner Sports',
    avatar: 'S',
    avatarBg: 'linear-gradient(135deg, #00A896 0%, #00E5FF 100%)',
    statNum: '+86%',
    statLabel: 'Partner Inquiries'
  },
  {
    id: 'ke19',
    client: 'KE19 Studio',
    category: 'Digital Identity & Motion',
    quote: 'The kinetic motion physics, reactive GLSL shaders, and fluid page transitions engineered by Nuzarox created an international interactive benchmark that loads in under 0.8 seconds globally. An unmatched fusion of art and high-speed code.',
    person: 'Keerthieswaran',
    role: 'Lead Architect, KE19 Studio · Chennai',
    avatar: 'K',
    avatarBg: 'linear-gradient(135deg, #0A2E5C 0%, #38BDF8 100%)',
    statNum: '0.8s',
    statLabel: 'Global Page Load'
  },
  {
    id: 'aura',
    client: 'Aura Luxury Residence',
    category: 'Virtual 3D Architecture',
    quote: 'Selling luxury architecture online requires extreme visual poise. Nuzarox created a 3D virtual walkthrough platform so intuitive that high-net-worth buyers booked during initial tours with complete confidence.',
    person: 'Lokesh',
    role: 'Tech & Operations, Aura Residence',
    avatar: 'L',
    avatarBg: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)',
    statNum: '+200%',
    statLabel: 'Private Bookings'
  }
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const featuredContentRef = useRef(null);

  // GSAP 3D Kinetic Text Reveal Animation for Section Header
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({ paused: true });

      entranceTl
        .fromTo('.testi-hdr-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: 'power3.inOut' }
        )
        .fromTo('.testi-hdr-label',
          { x: -35, opacity: 0, letterSpacing: '0.05em', filter: 'blur(8px)' },
          { x: 0, opacity: 1, letterSpacing: '0.22em', filter: 'blur(0px)', duration: 0.45, ease: 'back.out(1.7)' },
          '-=0.25'
        )
        .fromTo('.testi-hdr-char',
          { x: -35, opacity: 0, scale: 0.6, rotateY: -35, filter: 'blur(8px)' },
          { x: 0, opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)', duration: 0.55, stagger: 0.035, ease: 'back.out(2.0)' },
          '-=0.2'
        )
        .fromTo('.bento-card',
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' },
          '-=0.3'
        );

      ScrollTrigger.create({
        trigger: section,
        start: 'top 82%',
        once: true,
        onEnter: () => entranceTl.play()
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Auto-cycle through reviews for the Flagship Bento Card
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % clientReviews.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Smooth fade transition on index change
  useEffect(() => {
    if (featuredContentRef.current) {
      gsap.fromTo(
        featuredContentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeIdx]);

  const activeReview = clientReviews[activeIdx];

  // Animated words breakdown for Header Title
  const titleWords = [
    { text: "What", isAccent: false },
    { text: "Founders", isAccent: false },
    { text: "&", isAccent: false },
    { text: "Brands", isAccent: false },
    { text: "Say", isAccent: true },
    { text: "About", isAccent: true },
    { text: "Us", isAccent: true }
  ];

  return (
    <section ref={sectionRef} id="testimonials" className="bento-testimonials-section">
      <style>{`
        .bento-testimonials-section {
          position: relative;
          width: 100%;
          background: #F5F3EF;
          padding: 100px 4% 90px 4%;
          font-family: var(--font-body);
          color: #0A0A10;
          overflow: hidden;
          box-sizing: border-box;
        }

        .bento-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.45;
        }

        .bento-glow-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 168, 150, 0.15) 0%, transparent 70%);
          top: -100px;
          right: -100px;
        }

        .bento-glow-2 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(10, 46, 92, 0.12) 0%, transparent 70%);
          bottom: -150px;
          left: -120px;
        }

        .bento-container {
          position: relative;
          z-index: 2;
          max-width: 1360px;
          margin: 0 auto;
        }

        /* 3D Kinetic Section Header */
        .testi-section-header {
          margin-bottom: 3.5rem;
          perspective: 800px;
        }

        .testi-hdr-meta {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .testi-hdr-line {
          width: 24px;
          height: 2.5px;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          border-radius: 2px;
          transform-origin: left center;
          display: inline-block;
        }

        .testi-hdr-label {
          background: linear-gradient(90deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          font-family: var(--font-display);
        }

        .testi-hdr-h2 {
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 900;
          font-family: var(--font-display);
          color: #0A0A10;
          letter-spacing: -0.035em;
          margin: 0;
          line-height: 1.08;
          display: flex;
          gap: 0.3em;
          flex-wrap: wrap;
          overflow: hidden;
        }

        .testi-word-wrap {
          display: inline-flex;
          transform-style: preserve-3d;
        }

        .testi-hdr-char {
          position: relative;
          display: inline-block;
          transform-style: preserve-3d;
          will-change: transform, opacity, filter;
        }

        .testi-accent-char {
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: minmax(180px, auto);
          gap: 1.5rem;
        }

        .bento-card {
          position: relative;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(10, 46, 92, 0.08);
          border-radius: 28px;
          padding: 2.2rem;
          box-shadow: 
            0 16px 40px rgba(10, 46, 92, 0.04),
            0 1px 2px rgba(0, 0, 0, 0.03);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .bento-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 168, 150, 0.25);
          box-shadow: 
            0 24px 60px rgba(10, 46, 92, 0.08),
            0 0 0 1px rgba(0, 168, 150, 0.1);
        }

        .bento-featured {
          grid-column: span 7;
          grid-row: span 2;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 100%);
          border: 1px solid rgba(0, 168, 150, 0.22);
        }

        .bento-watermark-quote {
          position: absolute;
          top: 15px;
          right: 25px;
          font-size: 7.5rem;
          font-family: Georgia, serif;
          font-weight: 700;
          color: rgba(10, 46, 92, 0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .bento-featured-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .bento-client-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(10, 46, 92, 0.06);
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0A2E5C;
          font-family: var(--font-display);
        }

        .bento-auto-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bento-cycle-pill {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(10, 46, 92, 0.2);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .bento-cycle-pill.active {
          width: 22px;
          border-radius: 999px;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
        }

        .bento-stars-gold {
          color: #FFB800;
          font-size: 1rem;
          letter-spacing: 2px;
        }

        .bento-featured-quote {
          font-size: clamp(1.15rem, 1.7vw, 1.38rem);
          line-height: 1.75;
          font-weight: 500;
          color: #1E293B;
          margin: 0 0 2rem 0;
          position: relative;
          z-index: 2;
          letter-spacing: -0.01em;
        }

        .bento-featured-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
          gap: 1.2rem;
          padding-top: 1.5rem;
          border-top: 1px dashed rgba(10, 46, 92, 0.1);
        }

        .bento-author-profile {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .bento-avatar-lg {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 900;
          color: #FFFFFF;
          font-family: var(--font-display);
          box-shadow: 0 8px 20px rgba(10, 46, 92, 0.18);
        }

        .bento-author-info-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0B0C10;
          font-family: var(--font-display);
        }

        .bento-author-info-sub {
          font-size: 0.8rem;
          color: #64748B;
          font-weight: 500;
        }

        .bento-stat-chip {
          padding: 10px 18px;
          border-radius: 16px;
          background: rgba(0, 168, 150, 0.08);
          border: 1px solid rgba(0, 168, 150, 0.2);
          text-align: right;
        }

        .bento-stat-num {
          font-size: 1.4rem;
          font-weight: 900;
          font-family: var(--font-display);
          color: #00A896;
          line-height: 1;
        }

        .bento-stat-desc {
          font-size: 0.68rem;
          font-weight: 700;
          color: #0A2E5C;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 3px;
        }

        .bento-google-card {
          grid-column: span 5;
          grid-row: span 1;
          background: #FFFFFF;
          border: 1px solid rgba(10, 46, 92, 0.1);
          justify-content: center;
        }

        .bento-google-inner {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .bento-google-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .bento-google-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .bento-google-brand {
          font-size: 1.05rem;
          font-weight: 800;
          color: #1E293B;
          font-family: var(--font-display);
        }

        .bento-google-score-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bento-google-big-score {
          font-size: 2.2rem;
          font-weight: 900;
          font-family: var(--font-display);
          color: #0A2E5C;
          line-height: 1;
        }

        .bento-google-score-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .bento-google-verified-text {
          font-size: 0.72rem;
          font-weight: 700;
          color: #00A896;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .bento-write-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 22px;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          color: #FFFFFF !important;
          border-radius: 999px;
          font-size: 0.84rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(0, 168, 150, 0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .bento-write-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 168, 150, 0.4);
        }

        .bento-card-ke19 {
          grid-column: span 5;
          grid-row: span 1;
          background: rgba(255, 255, 255, 0.92);
        }

        .bento-card-aura {
          grid-column: span 4;
          grid-row: span 1;
          background: rgba(255, 255, 255, 0.92);
        }

        .bento-card-siva {
          grid-column: span 4;
          grid-row: span 1;
          background: rgba(255, 255, 255, 0.92);
        }

        .bento-card-ruthra {
          grid-column: span 4;
          grid-row: span 1;
          background: rgba(255, 255, 255, 0.92);
        }

        .bento-mini-quote {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #334155;
          font-weight: 500;
          margin: 0 0 1.4rem 0;
        }

        .bento-mini-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 1rem;
          border-top: 1px solid rgba(10, 46, 92, 0.06);
        }

        .bento-avatar-sm {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 900;
          color: #FFFFFF;
          font-family: var(--font-display);
          flex-shrink: 0;
        }

        .bento-mini-name {
          font-size: 0.92rem;
          font-weight: 800;
          color: #0B0C10;
          font-family: var(--font-display);
        }

        .bento-mini-role {
          font-size: 0.72rem;
          color: #64748B;
        }

        @media (max-width: 1080px) {
          .bento-featured {
            grid-column: span 12;
            grid-row: span 1;
          }
          .bento-google-card {
            grid-column: span 12;
          }
          .bento-card-ke19 {
            grid-column: span 6;
          }
          .bento-card-aura {
            grid-column: span 6;
          }
          .bento-card-siva {
            grid-column: span 6;
          }
          .bento-card-ruthra {
            grid-column: span 6;
          }
        }

        @media (max-width: 768px) {
          .bento-testimonials-section {
            padding: 70px 1.2rem 60px 1.2rem;
          }
          .bento-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .bento-featured,
          .bento-google-card,
          .bento-card-ke19,
          .bento-card-aura,
          .bento-card-siva,
          .bento-card-ruthra {
            grid-column: span 1;
            grid-row: auto;
          }
          .bento-card {
            padding: 1.6rem;
            border-radius: 22px;
          }
          .bento-featured-quote {
            font-size: 1.1rem;
          }
        }
      `}</style>

      {/* Ambient glowing radial orbs */}
      <div className="bento-ambient-glow bento-glow-1" />
      <div className="bento-ambient-glow bento-glow-2" />

      <div className="bento-container">
        {/* Section Header with 3D Kinetic Entrance Animation */}
        <div ref={headerRef} className="testi-section-header">
          <div className="testi-hdr-meta">
            <span className="testi-hdr-line" />
            <span className="testi-hdr-label">Verified Client Reviews</span>
          </div>

          <h2 className="testi-hdr-h2">
            {titleWords.map((wordObj, wIdx) => (
              <div key={wIdx} className="testi-word-wrap">
                {wordObj.text.split('').map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className={`testi-hdr-char ${wordObj.isAccent ? 'testi-accent-char' : ''}`}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Card 1: Flagship Featured (Auto-cycling across reviews on hover pause) */}
          <div 
            className="bento-card bento-featured"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <span className="bento-watermark-quote">“</span>

            <div ref={featuredContentRef}>
              <div className="bento-featured-top">
                <span className="bento-client-pill">⚡ {activeReview.category}</span>
                <div className="bento-auto-controls">
                  {clientReviews.map((_, idx) => (
                    <span
                      key={idx}
                      className={`bento-cycle-pill ${idx === activeIdx ? 'active' : ''}`}
                      onClick={() => setActiveIdx(idx)}
                      title={`Review ${idx + 1}`}
                    />
                  ))}
                  <span className="bento-stars-gold" style={{ marginLeft: '8px' }}>★★★★★</span>
                </div>
              </div>

              <p className="bento-featured-quote">
                “{activeReview.quote}”
              </p>
            </div>

            <div className="bento-featured-footer">
              <div className="bento-author-profile">
                <div className="bento-avatar-lg" style={{ background: activeReview.avatarBg }}>
                  {activeReview.avatar}
                </div>
                <div>
                  <div className="bento-author-info-title">{activeReview.person}</div>
                  <div className="bento-author-info-sub">{activeReview.role}</div>
                </div>
              </div>

              <div className="bento-stat-chip">
                <div className="bento-stat-num">{activeReview.statNum}</div>
                <div className="bento-stat-desc">{activeReview.statLabel}</div>
              </div>
            </div>
          </div>

          {/* Card 2: Official Google Verified Score Card */}
          <div className="bento-card bento-google-card">
            <div className="bento-google-inner">
              <div className="bento-google-top">
                <div className="bento-google-logo-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span className="bento-google-brand">Google Reviews</span>
                </div>
                <span className="bento-stars-gold">★★★★★</span>
              </div>

              <div className="bento-google-score-box">
                <span className="bento-google-big-score">4.9</span>
                <div className="bento-google-score-details">
                  <span className="bento-google-verified-text">✓ 100% Verified Rating</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>5-Star client feedback across enterprise projects</span>
                </div>
              </div>

              <a
                href="https://www.google.com/search?q=NUZAROX+Technology+Chennai+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="bento-write-btn"
              >
                <span>★ View & Write Review on Google</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Card 3: KE19 Studio */}
          <div className="bento-card bento-card-ke19">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="bento-client-pill" style={{ color: '#00A896' }}>Digital Identity</span>
                <span className="bento-stars-gold" style={{ fontSize: '0.85rem' }}>★★★★★</span>
              </div>
              <p className="bento-mini-quote">
                “The kinetic motion physics, reactive GLSL shaders, and fluid page transitions engineered by Nuzarox created an international interactive benchmark that loads in under 0.8 seconds globally.”
              </p>
            </div>

            <div className="bento-mini-author">
              <div className="bento-avatar-sm" style={{ background: 'linear-gradient(135deg, #0A2E5C 0%, #38BDF8 100%)' }}>K</div>
              <div>
                <div className="bento-mini-name">Keerthieswaran</div>
                <div className="bento-mini-role">Lead Architect, KE19 Studio · Chennai</div>
              </div>
            </div>
          </div>

          {/* Card 4: Aura Luxury Residence */}
          <div className="bento-card bento-card-aura">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="bento-client-pill">Luxury Real Estate</span>
                <span className="bento-stars-gold" style={{ fontSize: '0.85rem' }}>★★★★★</span>
              </div>
              <p className="bento-mini-quote">
                “Selling luxury architecture online requires extreme visual poise. Nuzarox created a 3D virtual walkthrough platform so intuitive that high-net-worth buyers booked during initial tours.”
              </p>
            </div>

            <div className="bento-mini-author">
              <div className="bento-avatar-sm" style={{ background: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)' }}>L</div>
              <div>
                <div className="bento-mini-name">Lokesh</div>
                <div className="bento-mini-role">Tech & Operations, Aura Residence</div>
              </div>
            </div>
          </div>

          {/* Card 5: Siva (Marketing Director) */}
          <div className="bento-card bento-card-siva">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="bento-client-pill">Growth & Marketing</span>
                <span className="bento-stars-gold" style={{ fontSize: '0.85rem' }}>★★★★★</span>
              </div>
              <p className="bento-mini-quote">
                “Their technical depth and aesthetic taste are genuinely unmatched. Our digital customer engagement and European partner inquiries grew by over eighty-six percent in 90 days.”
              </p>
            </div>

            <div className="bento-mini-author">
              <div className="bento-avatar-sm" style={{ background: 'linear-gradient(135deg, #00A896 0%, #00E5FF 100%)' }}>S</div>
              <div>
                <div className="bento-mini-name">Siva</div>
                <div className="bento-mini-role">Marketing Director, Gagner Sports</div>
              </div>
            </div>
          </div>

          {/* Card 6: Ruthra (Brand Strategy) */}
          <div className="bento-card bento-card-ruthra">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="bento-client-pill">Strategy & Systems</span>
                <span className="bento-stars-gold" style={{ fontSize: '0.85rem' }}>★★★★★</span>
              </div>
              <p className="bento-mini-quote">
                “They don't just build websites — they engineer digital ecosystems that command absolute market authority. The attention to detail is obsessive, strategic, and brilliant.”
              </p>
            </div>

            <div className="bento-mini-author">
              <div className="bento-avatar-sm" style={{ background: 'linear-gradient(135deg, #0A2E5C 0%, #6366F1 100%)' }}>R</div>
              <div>
                <div className="bento-mini-name">Ruthra</div>
                <div className="bento-mini-role">Brand Strategist & Creative Consultant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
