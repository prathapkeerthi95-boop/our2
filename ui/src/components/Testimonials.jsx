import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clientReels = [
  {
    id: 'gagner',
    client: 'Gagner Sports',
    person: 'Balaji',
    role: 'Founder & CEO',
    location: 'Paris & Online',
    projectType: '3D Headless E-Commerce Platform',
    accent: '#00E5FF',
    accentGradient: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)',
    bgImage: '/gagner-showcase-new.jpg',
    videoPreview: '/black-website-car-rental-car-display-promo.mp4',
    highlightTitle: 'REVOLUTIONIZING SPORTS APPAREL COMMERCE',
    quote: 'Nuzarox completely reimagined how athletes and clubs order bespoke gear. The real-time 3D customizer with Shopify headless architecture pushed our European market conversion through the roof.',
    impact: '120% Conversion Surge',
    deliverables: ['3D WebGL Configurator', 'Headless Next.js Architecture', 'European Multi-Currency Checkout']
  },
  {
    id: 'ke19',
    client: 'KE19 Studio',
    person: 'Keerthieswaran',
    role: 'Lead Architect',
    location: 'Chennai, India',
    projectType: 'Kinetic Digital Identity & Portfolio',
    accent: '#38BDF8',
    accentGradient: 'linear-gradient(135deg, #00A896 0%, #38BDF8 100%)',
    bgImage: '/ke19-showcase-new.jpg',
    videoPreview: '/illustration-explainer-purple-ai-business-company-presentation.mp4',
    highlightTitle: 'KINETIC GL INTERACTIVITY AT SCALE',
    quote: 'The craftsmanship, custom shader physics, and fluid page transitions engineered by Nuzarox created an award-level interactive benchmark that loads in under 0.8 seconds globally.',
    impact: 'Sub-Second WebGL Rendering',
    deliverables: ['Custom GLSL Shaders', 'Zero-Latency Transitions', 'Dynamic Typography Physics']
  },
  {
    id: 'aura',
    client: 'Aura Luxury Residence',
    person: 'Lokesh',
    role: 'Operations & Tech Lead',
    location: 'Mayiladuthurai, India',
    projectType: 'Virtual Architectural Experience',
    accent: '#00A896',
    accentGradient: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)',
    bgImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80',
    videoPreview: '/realistic-floral-nature-cosmetics-3d-booth-website-landing-page-ad-promo.mp4',
    highlightTitle: 'HIGH-NET-WORTH ESTATE SHOWCASING',
    quote: 'Selling luxury real estate online requires breathtaking visual poise. Nuzarox created a virtual walkthrough platform so intuitive that high-net-worth investors committed during their initial digital tour.',
    impact: '+200% Private Bookings',
    deliverables: ['360° Interactive Walkthroughs', 'Smart Floorplan Switcher', 'Private Consultation Engine']
  },
  {
    id: 'consulting',
    client: 'Creative Consultant',
    person: 'Ruthra',
    role: 'Brand Strategist',
    location: 'Tamil Nadu, India',
    projectType: 'Brand Strategy & Design Ecosystem',
    accent: '#0A2E5C',
    accentGradient: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)',
    bgImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=80',
    videoPreview: '/black-website-car-rental-car-display-promo.mp4',
    highlightTitle: 'ENGINEERING REVENUE-FIRST DIGITAL ECOSYSTEMS',
    quote: 'They do not simply design screens; they map out psychological buyer journeys and execute with razor-sharp code. The level of strategic foresight and aesthetic discipline is extraordinary.',
    impact: '3x Brand Authority',
    deliverables: ['Design System Architecture', 'Conversion Funnel Strategy', 'Ultra-Responsive Motion UI']
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const reelContentRef = useRef(null);
  const timerRef = useRef(null);

  const currentReel = clientReels[activeIndex];

  // Auto advance reels every 9s if playing
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % clientReels.length);
    }, 9000);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, activeIndex]);

  // Smooth entrance transition on reel change
  useEffect(() => {
    if (reelContentRef.current) {
      gsap.fromTo(
        reelContentRef.current.querySelectorAll('.cin-anim-fade'),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' }
      );
    }
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeIndex]);

  const handleSelectReel = (idx) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  return (
    <section id="testimonials" className="cin-testimonials-section">
      <style>{`
        .cin-testimonials-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #F5F3EF;
          color: #0A0A10;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 85px 4% 50px 4%;
          font-family: var(--font-body);
          box-sizing: border-box;
        }

        /* Ambient video motion layer blended cleanly into #F5F3EF */
        .cin-backdrop-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .cin-bg-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.15;
          filter: grayscale(0.5) contrast(1.1);
          mix-blend-mode: multiply;
          transition: opacity 0.8s ease;
        }

        .cin-backdrop-overlay {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 80% 20%, rgba(0, 168, 150, 0.12) 0%, transparent 55%),
            radial-gradient(circle at 20% 80%, rgba(10, 46, 92, 0.08) 0%, transparent 60%),
            linear-gradient(180deg, rgba(245, 243, 239, 0.7) 0%, rgba(245, 243, 239, 0.45) 50%, #F5F3EF 100%);
          z-index: 2;
        }

        /* Blueprint grid line overlay matching Process/Services */
        .cin-blueprint-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(10, 46, 92, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(10, 46, 92, 0.035) 1px, transparent 1px);
          background-size: 72px 72px;
          z-index: 3;
          pointer-events: none;
        }

        /* Top Header Bar */
        .cin-header-bar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto 3rem auto;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .cin-badge-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(10, 46, 92, 0.08);
          backdrop-filter: blur(16px);
          box-shadow: 0 4px 16px rgba(10, 46, 92, 0.04);
        }

        .cin-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00A896;
          box-shadow: 0 0 10px #00A896;
          animation: cinPulse 1.8s ease-in-out infinite alternate;
        }

        @keyframes cinPulse {
          0% { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(1.25); opacity: 1; }
        }

        .cin-badge-text {
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: var(--font-display);
        }

        .cin-header-right {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* Google Review Pill in Header */
        .cin-google-pill {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 16px;
          background: #FFFFFF;
          border: 1px solid rgba(10, 46, 92, 0.1);
          border-radius: 999px;
          box-shadow: 0 4px 14px rgba(10, 46, 92, 0.05);
          font-size: 0.82rem;
          color: #1E293B;
          font-weight: 600;
        }

        .cin-google-pill strong {
          color: #0A2E5C;
        }

        .cin-google-write-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 18px;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          color: #FFFFFF !important;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(0, 168, 150, 0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .cin-google-write-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 168, 150, 0.4);
        }

        .cin-ctrl-btn {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(10, 46, 92, 0.12);
          color: #0A2E5C;
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(10, 46, 92, 0.04);
          transition: all 0.25s ease;
        }

        .cin-ctrl-btn:hover {
          border-color: #00A896;
          color: #00A896;
          transform: translateY(-1px);
        }

        /* Central Layout */
        .cin-main-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 4.5rem;
          align-items: center;
          min-height: 480px;
        }

        .cin-story-panel {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .cin-client-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-display);
        }

        .cin-client-company {
          font-size: 1.28rem;
          font-weight: 800;
          color: #0A2E5C;
          letter-spacing: -0.01em;
        }

        .cin-client-sep {
          color: rgba(10, 46, 92, 0.25);
        }

        .cin-client-type {
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cin-headline-title {
          font-size: clamp(2.2rem, 3.8vw, 3.6rem);
          font-weight: 900;
          line-height: 1.1;
          font-family: var(--font-display);
          letter-spacing: -0.03em;
          color: #0B0C10;
          margin: 0;
          text-transform: uppercase;
        }

        .cin-quote-block {
          position: relative;
          padding-left: 24px;
          border-left: 3px solid #00A896;
        }

        .cin-quote-text {
          font-size: clamp(1.05rem, 1.4vw, 1.25rem);
          line-height: 1.75;
          color: #2D3748;
          font-weight: 450;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .cin-author-card {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cin-author-avatar {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 900;
          color: #FFFFFF;
          font-family: var(--font-display);
          box-shadow: 0 10px 25px rgba(10, 46, 92, 0.15);
        }

        .cin-author-name {
          font-size: 1.08rem;
          font-weight: 800;
          color: #0B0C10;
          font-family: var(--font-display);
        }

        .cin-author-sub {
          font-size: 0.82rem;
          color: #64748B;
          margin-top: 2px;
          font-weight: 500;
        }

        .cin-deliverables-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 0.4rem;
        }

        .cin-deliv-tag {
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(10, 46, 92, 0.08);
          color: #0A2E5C;
          box-shadow: 0 2px 6px rgba(10, 46, 92, 0.03);
        }

        /* Right Side: Showcase Frame */
        .cin-preview-panel {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .cin-preview-card {
          position: relative;
          width: 100%;
          max-width: 480px;
          aspect-ratio: 16/11;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 
            0 24px 60px rgba(10, 46, 92, 0.12),
            0 2px 10px rgba(0, 168, 150, 0.08);
          background: #FFFFFF;
        }

        .cin-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .cin-preview-card:hover .cin-card-image {
          transform: scale(1.04);
        }

        .cin-card-gradient-shim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(10, 46, 92, 0.9) 100%);
          pointer-events: none;
        }

        .cin-impact-floating-tag {
          position: absolute;
          top: 18px;
          right: 18px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(0, 168, 150, 0.3);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 10px 25px rgba(10, 46, 92, 0.12);
        }

        .cin-impact-spark {
          color: #00A896;
          font-size: 0.95rem;
        }

        .cin-impact-val {
          font-size: 0.84rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: #0A2E5C;
        }

        .cin-card-client-footer {
          position: absolute;
          bottom: 20px;
          left: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 5;
        }

        .cin-card-name-box {
          display: flex;
          flex-direction: column;
        }

        .cin-card-client-label {
          font-size: 1.15rem;
          font-weight: 900;
          font-family: var(--font-display);
          color: #FFFFFF;
          margin: 0;
        }

        .cin-card-sub-loc {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.75);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 2px;
        }

        .cin-card-stars {
          color: #FFB800;
          font-size: 0.9rem;
          letter-spacing: 2px;
        }

        /* Bottom Filmstrip Carousel Navigation */
        .cin-filmstrip-bar {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1440px;
          margin: 3.5rem auto 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .cin-strip-tab {
          position: relative;
          padding: 1.2rem 1.4rem;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(10, 46, 92, 0.08);
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
          box-shadow: 0 4px 16px rgba(10, 46, 92, 0.03);
        }

        .cin-strip-tab:hover {
          background: #FFFFFF;
          border-color: rgba(0, 168, 150, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(10, 46, 92, 0.08);
        }

        .cin-strip-tab.active {
          background: #FFFFFF;
          border-color: #00A896;
          box-shadow: 0 10px 30px rgba(0, 168, 150, 0.15);
        }

        .cin-tab-progress-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3.5px;
          border-radius: 18px 18px 0 0;
          background: transparent;
        }

        .cin-strip-tab.active .cin-tab-progress-line {
          background: linear-gradient(90deg, #0A2E5C, #00A896);
        }

        .cin-tab-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cin-tab-num {
          font-size: 0.75rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: rgba(10, 46, 92, 0.4);
        }

        .cin-strip-tab.active .cin-tab-num {
          color: #00A896;
        }

        .cin-tab-person {
          font-size: 0.72rem;
          font-weight: 600;
          color: #64748B;
        }

        .cin-tab-client-title {
          font-size: 1rem;
          font-weight: 800;
          color: #0B0C10;
          font-family: var(--font-display);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cin-tab-impact-sub {
          font-size: 0.75rem;
          font-weight: 700;
          color: #00A896;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .cin-main-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .cin-filmstrip-bar {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cin-testimonials-section {
            padding: 60px 1.2rem 35px 1.2rem;
          }
          .cin-headline-title {
            font-size: 1.95rem;
          }
          .cin-quote-text {
            font-size: 0.98rem;
          }
          .cin-filmstrip-bar {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }
          .cin-preview-card {
            max-width: 100%;
          }
        }
      `}</style>

      {/* Cinematic Background Video Blended with Project Theme #F5F3EF */}
      <div className="cin-backdrop-media">
        <video
          ref={videoRef}
          key={currentReel.videoPreview}
          className="cin-bg-video"
          src={currentReel.videoPreview}
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        <div className="cin-backdrop-overlay" />
        <div className="cin-blueprint-grid" />
      </div>

      {/* Top Header Bar with Google Verified Review + Controls */}
      <div className="cin-header-bar">
        <div className="cin-badge-label">
          <span className="cin-pulse-dot" />
          <span className="cin-badge-text">Cinematic Client Showcases</span>
        </div>

        <div className="cin-header-right">
          {/* Google Review Badge & CTA Button */}
          <div className="cin-google-pill">
            <svg width="17" height="17" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Rated <strong>4.9 / 5.0</strong> on Google</span>
          </div>

          <a
            href="https://search.google.com/local/writereview?placeid=ChIJ-3eN1XpUUrkR4aWfR6Y9nZ0"
            target="_blank"
            rel="noopener noreferrer"
            className="cin-google-write-btn"
          >
            <span>★ Leave Review</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>

          <button
            className="cin-ctrl-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label="Toggle autoplay"
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            className="cin-ctrl-btn"
            onClick={() => setIsMuted(!isMuted)}
            aria-label="Toggle sound"
          >
            {isMuted ? '🔇 Sound' : '🔊 Sound'}
          </button>
        </div>
      </div>

      {/* Central Interactive Story Panel */}
      <div ref={reelContentRef} className="cin-main-container">
        {/* Left Side: Client Editorial Story */}
        <div className="cin-story-panel">
          <div className="cin-client-meta-pill cin-anim-fade">
            <span className="cin-client-company">{currentReel.client}</span>
            <span className="cin-client-sep">/</span>
            <span className="cin-client-type">{currentReel.projectType}</span>
          </div>

          <h2 className="cin-headline-title cin-anim-fade">
            {currentReel.highlightTitle}
          </h2>

          <div className="cin-quote-block cin-anim-fade">
            <p className="cin-quote-text">"{currentReel.quote}"</p>
          </div>

          <div className="cin-author-card cin-anim-fade">
            <div
              className="cin-author-avatar"
              style={{ background: currentReel.accentGradient }}
            >
              {currentReel.person.charAt(0)}
            </div>
            <div>
              <div className="cin-author-name">{currentReel.person}</div>
              <div className="cin-author-sub">{currentReel.role} · {currentReel.location}</div>
            </div>
          </div>

          <div className="cin-deliverables-row cin-anim-fade">
            {currentReel.deliverables.map((item, i) => (
              <span key={i} className="cin-deliv-tag">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Showcase Card */}
        <div className="cin-preview-panel cin-anim-fade">
          <div className="cin-preview-card">
            <img
              src={currentReel.bgImage}
              alt={currentReel.client}
              className="cin-card-image"
            />
            <div className="cin-card-gradient-shim" />

            <div className="cin-impact-floating-tag">
              <span className="cin-impact-spark">⚡</span>
              <span className="cin-impact-val">{currentReel.impact}</span>
            </div>

            <div className="cin-card-client-footer">
              <div className="cin-card-name-box">
                <h3 className="cin-card-client-label">{currentReel.client}</h3>
                <span className="cin-card-sub-loc">{currentReel.location}</span>
              </div>
              <div className="cin-card-stars">★★★★★</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filmstrip Tabs Navigation */}
      <div className="cin-filmstrip-bar">
        {clientReels.map((reel, idx) => (
          <button
            key={reel.id}
            className={`cin-strip-tab ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => handleSelectReel(idx)}
          >
            <div className="cin-tab-progress-line" />
            <div className="cin-tab-top-row">
              <span className="cin-tab-num">0{idx + 1}</span>
              <span className="cin-tab-person">{reel.person}</span>
            </div>
            <div className="cin-tab-client-title">{reel.client}</div>
            <div className="cin-tab-impact-sub">{reel.impact}</div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
