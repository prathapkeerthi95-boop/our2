import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// Audio-Visual / Podcast-Story Testimonials Data
const stories = [
  {
    id: 1,
    client: 'Balaji',
    role: 'Founder & CEO',
    org: 'Gagner Sports',
    location: 'Paris & Online',
    project: 'Next.js 14 · Headless 3D WebGL Storefront',
    duration: '0:42',
    audioPeak: [28, 45, 75, 92, 54, 80, 100, 65, 88, 70, 95, 60, 48, 85, 98, 72, 50, 88, 64, 40],
    quote: "Nuzarox architected a truly world-class e-commerce platform for Gagner Sports. Interactive 3D product customizers, sub-second checkout, and craftsmanship that elevated our brand internationally.",
    keyTakeaway: "120% Increase in Global Mobile Conversions",
    accent: '#00E5FF',
    badge: 'Flagship Showcase',
    avatarChar: 'B',
    stats: [
      { label: 'Conversion', val: '+120%' },
      { label: 'Page Load', val: '0.6s' }
    ]
  },
  {
    id: 2,
    client: 'Siva',
    role: 'Marketing Director',
    org: 'Gagner Sports',
    location: 'Chennai & Europe',
    project: 'Kinetic Motion · Multi-Currency Funnels',
    duration: '0:36',
    audioPeak: [20, 60, 85, 45, 90, 70, 82, 100, 68, 88, 52, 75, 92, 60, 80, 95, 48, 70, 55, 30],
    quote: "The entire journey was seamless. From intuitive mobile UX to micro-interactions, customer engagement surged and European partner inquiries grew by over eighty-six percent in 60 days.",
    keyTakeaway: "86% Surge in Enterprise Partner Enquiries",
    accent: '#00A896',
    badge: 'Growth Story',
    avatarChar: 'S',
    stats: [
      { label: 'Engagement', val: '+86%' },
      { label: 'Bounce Rate', val: '-44%' }
    ]
  },
  {
    id: 3,
    client: 'Keerthieswaran',
    role: 'Lead Architect',
    org: 'KE19 Studio',
    location: 'Chennai, TN',
    project: 'Custom WebGL Shaders & Kinetic Typography',
    duration: '0:29',
    audioPeak: [35, 70, 90, 60, 85, 100, 75, 58, 92, 80, 64, 88, 96, 70, 52, 85, 62, 78, 45, 25],
    quote: "The WebGL shaders, reactive physics, and brutalist typography engineered by Nuzarox established an international standard. Clean architecture that runs at 60fps locked on mobile.",
    keyTakeaway: "60 FPS Locked Canvas · 0.8s Global LCP",
    accent: '#0A2E5C',
    badge: 'Engineering Excellence',
    avatarChar: 'K',
    stats: [
      { label: 'FPS Performance', val: '60fps' },
      { label: 'Design Score', val: '9.8/10' }
    ]
  },
  {
    id: 4,
    client: 'Lokesh',
    role: 'Operations & Tech Lead',
    org: 'Aura Luxury Residence',
    location: 'Mayiladuthurai',
    project: '360° Architectural VR & Booking Engine',
    duration: '0:38',
    audioPeak: [25, 50, 78, 90, 65, 82, 95, 70, 88, 60, 92, 74, 58, 86, 100, 68, 52, 75, 60, 35],
    quote: "The interactive 3D virtual tour experience and consultation interface delivered pure luxury. High-net-worth buyers repeatedly praise the effortless navigation and stunning visual fidelity.",
    keyTakeaway: "3x Private Villa Walkthrough Bookings",
    accent: '#00A896',
    badge: 'Immersive Real Estate',
    avatarChar: 'L',
    stats: [
      { label: 'Tour Bookings', val: '300%' },
      { label: 'Avg Session', val: '4m 12s' }
    ]
  },
  {
    id: 5,
    client: 'Ruthra',
    role: 'Brand Strategist',
    org: 'Creative Consultant',
    location: 'Tamil Nadu',
    project: 'Brand Identity · Multi-channel UX System',
    duration: '0:32',
    audioPeak: [30, 65, 80, 95, 60, 75, 90, 70, 85, 100, 64, 82, 90, 55, 70, 88, 60, 74, 48, 28],
    quote: "They don't just build websites — they engineer digital ecosystems that command absolute market authority. The attention to typography, contrast, and micro-delights is obsessive.",
    keyTakeaway: "Dominant Brand Recall & Enterprise Positioning",
    accent: '#0A2E5C',
    badge: 'Strategy Review',
    avatarChar: 'R',
    stats: [
      { label: 'Brand Lift', val: '+240%' },
      { label: 'Inbound Leads', val: '4.2x' }
    ]
  }
];

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(18); // default progress preview
  const animFrameRef = useRef(null);
  const containerRef = useRef(null);
  const quoteRef = useRef(null);

  const activeStory = stories[activeIdx];

  // Simulated Audio Playback & Waveform Animation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1.2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleSelectStory = (idx) => {
    if (idx === activeIdx) {
      setIsPlaying(!isPlaying);
      return;
    }
    setPlaybackProgress(0);
    setIsPlaying(true);
    setActiveIdx(idx);

    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section ref={containerRef} id="testimonials" className="av-testimonials-root">
      <style>{`
        .av-testimonials-root {
          position: relative;
          background: #F4F6F9;
          padding: 6.5rem 1.5rem;
          color: #0A192F;
          overflow: hidden;
          font-family: var(--font-body, 'Inter', sans-serif);
        }

        /* Ambient Dynamic Noise & Mesh Gradients */
        .av-bg-gradient-1 {
          position: absolute;
          width: 650px;
          height: 650px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 168, 150, 0.12) 0%, transparent 70%);
          top: -150px;
          right: -100px;
          filter: blur(80px);
          pointer-events: none;
        }

        .av-bg-gradient-2 {
          position: absolute;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(10, 46, 92, 0.1) 0%, transparent 70%);
          bottom: -150px;
          left: -100px;
          filter: blur(90px);
          pointer-events: none;
        }

        .av-container {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Section Header with Live Studio Indicator */
        .av-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .av-header-left {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .av-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid rgba(0, 168, 150, 0.25);
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          box-shadow: 0 4px 15px rgba(0, 168, 150, 0.08);
          width: fit-content;
        }

        .av-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00A896;
          box-shadow: 0 0 10px #00A896;
          animation: avPulse 1.6s infinite ease-in-out;
        }

        @keyframes avPulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }

        .av-live-text {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: var(--font-display, sans-serif);
        }

        .av-title {
          font-size: clamp(2.3rem, 4.5vw, 3.6rem);
          font-weight: 900;
          font-family: var(--font-display, sans-serif);
          color: #0A192F;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0;
        }

        .av-title-gradient {
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .av-header-desc {
          font-size: 0.95rem;
          color: #5A6E85;
          max-width: 420px;
          line-height: 1.55;
          margin: 0;
        }

        /* ══════════════════════════════════════════════════════════
           MAIN AUDIO-VISUAL STAGE
           ══════════════════════════════════════════════════════════ */
        .av-stage {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 2rem;
          align-items: stretch;
          margin-bottom: 3.5rem;
        }

        /* The Soundstage / Active Voice Hero Card */
        .av-hero-deck {
          background: #FFFFFF;
          border-radius: 32px;
          border: 1px solid rgba(10, 46, 92, 0.08);
          box-shadow: 
            0 25px 65px -15px rgba(10, 46, 92, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          padding: 3rem 2.8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .av-deck-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* Deck Header: Category badge & Audio status */
        .av-deck-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .av-badge {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 0.4rem 0.95rem;
          border-radius: 999px;
          background: rgba(0, 168, 150, 0.08);
          color: #00A896;
          border: 1px solid rgba(0, 168, 150, 0.2);
        }

        .av-meta-project {
          font-size: 0.8rem;
          font-weight: 600;
          color: #8C9BAE;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Interactive Master Quote */
        .av-quote-body {
          position: relative;
          z-index: 2;
          margin-bottom: 2rem;
        }

        .av-quote-mark {
          font-size: 5.5rem;
          line-height: 0.7;
          font-family: Georgia, serif;
          color: rgba(10, 46, 92, 0.08);
          margin-bottom: -1.2rem;
          display: block;
          user-select: none;
        }

        .av-quote-text {
          font-size: clamp(1.2rem, 2vw, 1.55rem);
          line-height: 1.6;
          color: #0E1E38;
          font-weight: 600;
          letter-spacing: -0.015em;
          margin: 0;
        }

        .av-takeaway-box {
          margin-top: 1.2rem;
          padding: 0.75rem 1.1rem;
          background: #F8FAFC;
          border-left: 3px solid #00A896;
          border-radius: 0 12px 12px 0;
          font-size: 0.85rem;
          color: #0A2E5C;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Dynamic Interactive Waveform Player Bar */
        .av-player-strip {
          background: #F8FAFC;
          border-radius: 24px;
          border: 1px solid rgba(10, 46, 92, 0.06);
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          position: relative;
          z-index: 2;
        }

        .av-play-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          border: none;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0, 168, 150, 0.3);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          flex-shrink: 0;
        }

        .av-play-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 12px 25px rgba(0, 168, 150, 0.45);
        }

        .av-waveform-container {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 4px;
          height: 48px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
        }

        .av-waveform-bar {
          flex: 1;
          background: #D9E2EC;
          border-radius: 4px;
          transition: height 0.2s ease, background 0.3s ease;
          min-height: 8px;
        }

        .av-waveform-bar.active {
          background: linear-gradient(180deg, #00A896 0%, #0A2E5C 100%);
        }

        .av-waveform-bar.playing {
          animation: avWavePulse 1.2s infinite ease-in-out alternate;
        }

        @keyframes avWavePulse {
          0% { transform: scaleY(0.7); }
          100% { transform: scaleY(1.2); }
        }

        .av-duration-badge {
          font-size: 0.78rem;
          font-family: var(--font-display, sans-serif);
          font-weight: 700;
          color: #486581;
          background: #FFFFFF;
          padding: 0.35rem 0.65rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          white-space: nowrap;
        }

        /* ══════════════════════════════════════════════════════════
           RIGHT SIDE: EPISODE / CLIENT PLAYLIST SELECTOR
           ══════════════════════════════════════════════════════════ */
        .av-playlist {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .av-track-item {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 1.25rem 1.4rem;
          border: 1.5px solid rgba(10, 46, 92, 0.06);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .av-track-item:hover {
          border-color: rgba(0, 168, 150, 0.3);
          transform: translateX(4px);
          box-shadow: 0 8px 24px rgba(10, 46, 92, 0.06);
        }

        .av-track-item.selected {
          border-color: #00A896;
          background: #FFFFFF;
          box-shadow: 
            0 12px 30px rgba(0, 168, 150, 0.12),
            0 0 0 1px #00A896;
          transform: translateX(6px);
        }

        .av-track-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .av-avatar {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 900;
          color: #FFFFFF;
          font-family: var(--font-display, sans-serif);
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          box-shadow: 0 4px 12px rgba(10, 46, 92, 0.15);
          flex-shrink: 0;
        }

        .av-track-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .av-track-name {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0E1E38;
          font-family: var(--font-display, sans-serif);
        }

        .av-track-org {
          font-size: 0.76rem;
          color: #627D98;
          font-weight: 600;
        }

        .av-track-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .av-miniwaves {
          display: flex;
          align-items: center;
          gap: 2px;
          height: 20px;
        }

        .av-miniwave-bar {
          width: 3px;
          background: #00A896;
          border-radius: 2px;
          animation: avMiniWave 0.8s infinite alternate ease-in-out;
        }

        @keyframes avMiniWave {
          0% { height: 4px; }
          100% { height: 18px; }
        }

        .av-listen-pill {
          font-size: 0.72rem;
          font-weight: 800;
          color: #0A2E5C;
          background: #F0F4F8;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          transition: all 0.25s ease;
        }

        .av-track-item.selected .av-listen-pill {
          background: #00A896;
          color: #FFFFFF;
        }

        /* ══════════════════════════════════════════════════════════
           BOTTOM CREDIBILITY & GOOGLE REVIEWS STRIP
           ══════════════════════════════════════════════════════════ */
        .av-trust-strip {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(10, 46, 92, 0.08);
          padding: 1.6rem 2.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          box-shadow: 0 10px 30px rgba(10, 46, 92, 0.04);
        }

        .av-stat-cluster {
          display: flex;
          align-items: center;
          gap: 2.8rem;
          flex-wrap: wrap;
        }

        .av-stat-block {
          display: flex;
          flex-direction: column;
        }

        .av-stat-number {
          font-size: 1.6rem;
          font-weight: 900;
          color: #0A2E5C;
          font-family: var(--font-display, sans-serif);
          line-height: 1;
        }

        .av-stat-number span {
          color: #00A896;
        }

        .av-stat-subtitle {
          font-size: 0.74rem;
          color: #627D98;
          font-weight: 600;
          margin-top: 4px;
        }

        .av-action-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .av-google-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F8FAFC;
          border: 1px solid rgba(10, 46, 92, 0.08);
          border-radius: 999px;
          padding: 0.55rem 1.1rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: #334E68;
        }

        .av-google-chip strong {
          color: #0A2E5C;
        }

        .av-google-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          color: #FFFFFF !important;
          font-size: 0.84rem;
          font-weight: 700;
          padding: 0.65rem 1.4rem;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 6px 18px rgba(0, 168, 150, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .av-google-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 168, 150, 0.4);
        }

        /* ══════════════════════════════════════════════════════════
           RESPONSIVE DESIGN (Zero Horizontal Overflow)
           ══════════════════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .av-stage {
            grid-template-columns: 1fr;
          }
          .av-hero-deck {
            padding: 2.4rem 2rem;
          }
        }

        @media (max-width: 768px) {
          .av-testimonials-root {
            padding: 4.5rem 1rem;
          }
          .av-header {
            margin-bottom: 2.2rem;
          }
          .av-hero-deck {
            padding: 2rem 1.4rem;
            border-radius: 24px;
          }
          .av-quote-text {
            font-size: 1.15rem;
          }
          .av-player-strip {
            padding: 1rem 1.1rem;
            gap: 0.8rem;
          }
          .av-play-btn {
            width: 44px;
            height: 44px;
          }
          .av-trust-strip {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem 1.4rem;
          }
          .av-stat-cluster {
            gap: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .av-track-item {
            padding: 1rem 1rem;
          }
          .av-avatar {
            width: 40px;
            height: 40px;
            font-size: 0.95rem;
          }
          .av-track-name {
            font-size: 0.9rem;
          }
          .av-duration-badge {
            display: none;
          }
        }
      `}</style>

      {/* Atmospheric Brand Glows */}
      <div className="av-bg-gradient-1" />
      <div className="av-bg-gradient-2" />

      <div className="av-container">
        {/* Header */}
        <div className="av-header">
          <div className="av-header-left">
            <div className="av-live-badge">
              <span className="av-pulse-dot" />
              <span className="av-live-text">Voice of Our Clients</span>
            </div>
            <h2 className="av-title">
              What Founders & Brands <span className="av-title-gradient">Say About Us</span>
            </h2>
          </div>
          <p className="av-header-desc">
            Explore authentic audio-story takeaways from visionary founders who scaled their revenue and international presence with Nuzarox.
          </p>
        </div>

        {/* Audio-Visual Stage */}
        <div className="av-stage">
          {/* Active Audio-Story Soundstage Hero Card */}
          <div className="av-hero-deck">
            <div className="av-deck-glow" />

            <div>
              <div className="av-deck-top">
                <span className="av-badge">{activeStory.badge}</span>
                <span className="av-meta-project">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {activeStory.duration} Case Study
                </span>
              </div>

              <div ref={quoteRef} className="av-quote-body">
                <span className="av-quote-mark">“</span>
                <p className="av-quote-text">{activeStory.quote}</p>
                
                <div className="av-takeaway-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A896" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{activeStory.keyTakeaway}</span>
                </div>
              </div>
            </div>

            {/* Interactive Audio Waveform Player Strip */}
            <div className="av-player-strip">
              <button 
                className="av-play-btn" 
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause client story audio' : 'Play client story audio'}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                )}
              </button>

              <div className="av-waveform-container" onClick={togglePlay}>
                {activeStory.audioPeak.map((peak, idx) => {
                  const barProgress = (idx / activeStory.audioPeak.length) * 100;
                  const isActive = barProgress <= playbackProgress;
                  return (
                    <div
                      key={idx}
                      className={`av-waveform-bar ${isActive ? 'active' : ''} ${isPlaying && isActive ? 'playing' : ''}`}
                      style={{
                        height: `${Math.max(15, peak * 0.42)}px`,
                        animationDelay: `${idx * 0.05}s`
                      }}
                    />
                  );
                })}
              </div>

              <span className="av-duration-badge">
                {isPlaying ? `${Math.round((playbackProgress / 100) * 38)}s` : activeStory.duration}
              </span>
            </div>
          </div>

          {/* Episode / Client Story Playlist */}
          <div className="av-playlist">
            {stories.map((item, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <div
                  key={item.id}
                  className={`av-track-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectStory(idx)}
                >
                  <div className="av-track-left">
                    <div className="av-avatar">{item.avatarChar}</div>
                    <div className="av-track-info">
                      <span className="av-track-name">{item.client}</span>
                      <span className="av-track-org">{item.role} · {item.org}</span>
                    </div>
                  </div>

                  <div className="av-track-right">
                    {isSelected && isPlaying ? (
                      <div className="av-miniwaves">
                        <span className="av-miniwave-bar" style={{ animationDelay: '0s' }} />
                        <span className="av-miniwave-bar" style={{ animationDelay: '0.2s' }} />
                        <span className="av-miniwave-bar" style={{ animationDelay: '0.4s' }} />
                      </div>
                    ) : (
                      <span className="av-listen-pill">
                        {isSelected ? 'Active' : item.duration}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credibility & Verified Google Review Strip */}
        <div className="av-trust-strip">
          <div className="av-stat-cluster">
            <div className="av-stat-block">
              <span className="av-stat-number">50<span>+</span></span>
              <span className="av-stat-subtitle">Projects Engineered</span>
            </div>
            <div className="av-stat-block">
              <span className="av-stat-number">100<span>%</span></span>
              <span className="av-stat-subtitle">Client Success Rate</span>
            </div>
            <div className="av-stat-block">
              <span className="av-stat-number">4.9<span>★</span></span>
              <span className="av-stat-subtitle">Overall Client Rating</span>
            </div>
          </div>

          <div className="av-action-group">
            <div className="av-google-chip">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Verified <strong>4.9/5.0</strong> on Google</span>
            </div>

            <a
              href="https://search.google.com/local/writereview?placeid=ChIJ-3eN1XpUUrkR4aWfR6Y9nZ0"
              target="_blank"
              rel="noopener noreferrer"
              className="av-google-cta"
            >
              <span>Write a Review</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
