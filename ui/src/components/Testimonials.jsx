import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clientCases = [
  {
    id: 'gagner',
    client: 'Gagner Sports',
    person: 'Balaji',
    role: 'Founder & CEO',
    location: 'Paris & Online',
    projectType: '3D Headless E-Commerce Platform',
    accent: '#00E5FF',
    accentGradient: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)',
    image: '/gagner-showcase-new.jpg',
    metricVal: '120%',
    metricLabel: 'Conversion Surge',
    badge: 'FLAGSHIP E-COMMERCE',
    quote: 'Nuzarox completely reimagined how athletes and clubs order bespoke gear. The real-time 3D customizer with Shopify headless architecture pushed our European market conversion through the roof.',
    deliverables: ['3D WebGL Configurator', 'Headless Next.js Engine', 'European Multi-Currency Checkout', 'Sub-second Edge Deployment']
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
    image: '/ke19-showcase-new.jpg',
    metricVal: '0.8s',
    metricLabel: 'Global Page Render',
    badge: 'CREATIVE TECH',
    quote: 'The craftsmanship, custom shader physics, and fluid page transitions engineered by Nuzarox created an award-level interactive benchmark that loads in under 0.8 seconds globally.',
    deliverables: ['Custom GLSL Shaders', 'Zero-Latency Page Transitions', 'Dynamic Typography Physics', 'High-FPS Motion Architecture']
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
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80',
    metricVal: '200%',
    metricLabel: 'Private Consultations',
    badge: 'LUXURY REAL ESTATE',
    quote: 'Selling luxury real estate online requires breathtaking visual poise. Nuzarox created a virtual walkthrough platform so intuitive that high-net-worth investors committed during their initial digital tour.',
    deliverables: ['360° Interactive Walkthroughs', 'Smart Floorplan Layer Switcher', 'Direct Consultation Engine', 'Retina 3D Rendering']
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
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=80',
    metricVal: '3x',
    metricLabel: 'Brand Market Authority',
    badge: 'STRATEGY & IDENTITY',
    quote: 'They do not simply design screens; they map out psychological buyer journeys and execute with razor-sharp code. The level of strategic foresight and aesthetic discipline is extraordinary.',
    deliverables: ['Design System Architecture', 'Conversion Funnel Strategy', 'Ultra-Responsive Motion UI', 'Executive Brand Voice']
  }
];

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const showcaseCardRef = useRef(null);
  const timerRef = useRef(null);

  const activeCase = clientCases[activeIdx];

  // Auto rotation
  useEffect(() => {
    if (!isAutoplay) return;
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % clientCases.length);
    }, 8000);
    return () => clearInterval(timerRef.current);
  }, [isAutoplay, activeIdx]);

  // Smooth entrance transition on case switch
  useEffect(() => {
    if (showcaseCardRef.current) {
      gsap.fromTo(
        showcaseCardRef.current.querySelectorAll('.ts-anim-fade'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
      );
    }
  }, [activeIdx]);

  const handleSelect = (idx) => {
    setActiveIdx(idx);
    setIsAutoplay(false);
  };

  return (
    <section id="testimonials" className="ts-wrapper">
      <style>{`
        .ts-wrapper {
          position: relative;
          width: 100%;
          background: #F5F3EF;
          color: #0A0A10;
          padding: 100px 4% 80px 4%;
          font-family: var(--font-body);
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Ambient subtle radial glow matching Services and Process */
        .ts-ambient-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: 
            radial-gradient(circle at 15% 20%, rgba(0, 168, 150, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(10, 46, 92, 0.06) 0%, transparent 50%);
        }

        .ts-container {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* ── SECTION HEADER (Matches Services & Process header design) ── */
        .ts-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .ts-header-left {
          display: flex;
          flex-direction: column;
        }

        .ts-label-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .ts-label-bar {
          width: 24px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
        }

        .ts-label-text {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: var(--font-display);
        }

        .ts-title {
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.1;
          color: #0A0A10;
          font-family: var(--font-display);
          letter-spacing: -1.5px;
          margin: 0;
        }

        .ts-title-accent {
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Google Verified Review Badge in Header */
        .ts-header-right {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .ts-google-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: #FFFFFF;
          border: 1px solid rgba(10, 46, 92, 0.1);
          border-radius: 999px;
          box-shadow: 0 4px 16px rgba(10, 46, 92, 0.05);
          font-size: 0.85rem;
          color: #1E293B;
          font-weight: 600;
        }

        .ts-google-stars {
          color: #FFB800;
          font-size: 0.88rem;
          letter-spacing: 1px;
        }

        .ts-google-review-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          color: #FFFFFF !important;
          border-radius: 999px;
          font-size: 0.84rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(0, 168, 150, 0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .ts-google-review-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 168, 150, 0.4);
        }

        /* ── TWO-COLUMN SHOWCASE ARCHITECTURE ── */
        .ts-showcase-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 2.5rem;
          align-items: stretch;
        }

        /* Left Column: Interactive Client Nav Cards */
        .ts-nav-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ts-nav-card {
          position: relative;
          padding: 1.4rem 1.6rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.7);
          border: 1.5px solid rgba(10, 46, 92, 0.08);
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
        }

        .ts-nav-card:hover {
          background: #FFFFFF;
          border-color: rgba(0, 168, 150, 0.3);
          transform: translateX(4px);
          box-shadow: 0 8px 24px rgba(10, 46, 92, 0.06);
        }

        .ts-nav-card.active {
          background: #FFFFFF;
          border-color: #00A896;
          box-shadow: 0 12px 32px rgba(0, 168, 150, 0.15);
          transform: translateX(8px);
        }

        .ts-nav-card.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 14px;
          bottom: 14px;
          width: 4px;
          border-radius: 0 4px 4px 0;
          background: linear-gradient(180deg, #0A2E5C, #00A896);
        }

        .ts-nav-avatar {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 900;
          color: #FFFFFF;
          font-family: var(--font-display);
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(10, 46, 92, 0.12);
        }

        .ts-nav-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .ts-nav-client {
          font-size: 1rem;
          font-weight: 800;
          color: #0A0A10;
          font-family: var(--font-display);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ts-nav-sub {
          font-size: 0.74rem;
          color: #64748B;
          font-weight: 500;
        }

        .ts-nav-metric {
          font-size: 0.76rem;
          font-weight: 800;
          color: #00A896;
          font-family: var(--font-display);
          margin-top: 2px;
        }

        /* Right Column: Hero Showcase Glass Box */
        .ts-hero-card {
          position: relative;
          background: #FFFFFF;
          border-radius: 28px;
          border: 1px solid rgba(10, 46, 92, 0.08);
          box-shadow: 
            0 24px 60px rgba(10, 46, 92, 0.08),
            0 2px 6px rgba(0, 0, 0, 0.02);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          min-height: 480px;
        }

        /* Card Left Side: Big Imagery with Impact Pill */
        .ts-card-visual-col {
          position: relative;
          overflow: hidden;
          background: #0A1929;
        }

        .ts-case-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .ts-hero-card:hover .ts-case-image {
          transform: scale(1.04);
        }

        .ts-visual-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10, 46, 92, 0.2) 0%, rgba(10, 25, 41, 0.85) 100%);
        }

        .ts-floating-metric-badge {
          position: absolute;
          top: 24px;
          left: 24px;
          padding: 10px 18px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
        }

        .ts-metric-num {
          font-size: 1.55rem;
          font-weight: 900;
          line-height: 1;
          font-family: var(--font-display);
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ts-metric-txt {
          font-size: 0.68rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 3px;
        }

        .ts-visual-bottom-meta {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 5;
        }

        .ts-visual-client-title {
          font-size: 1.25rem;
          font-weight: 900;
          color: #FFFFFF;
          font-family: var(--font-display);
          margin: 0;
        }

        .ts-visual-loc {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.75);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 2px;
        }

        .ts-visual-stars {
          color: #FFB800;
          font-size: 0.95rem;
          letter-spacing: 2px;
        }

        /* Card Right Side: Story, Quote & Deliverables */
        .ts-card-story-col {
          padding: 3rem 2.8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .ts-case-tag-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ts-badge-pill {
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(0, 168, 150, 0.1);
          color: #00A896;
          border: 1px solid rgba(0, 168, 150, 0.2);
        }

        .ts-quote-mark {
          font-size: 4rem;
          font-family: Georgia, serif;
          line-height: 0.8;
          color: #0A2E5C;
          opacity: 0.15;
          margin-bottom: -15px;
          user-select: none;
        }

        .ts-story-quote {
          font-size: clamp(1.05rem, 1.4vw, 1.22rem);
          line-height: 1.75;
          color: #1E293B;
          font-weight: 450;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .ts-deliverables-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(10, 46, 92, 0.08);
        }

        .ts-deliverables-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #64748B;
        }

        .ts-tags-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .ts-deliverable-chip {
          padding: 4px 12px;
          border-radius: 999px;
          background: #F8FAFC;
          border: 1px solid rgba(10, 46, 92, 0.06);
          font-size: 0.72rem;
          font-weight: 600;
          color: #0A2E5C;
        }

        /* Author Info Footer */
        .ts-author-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(10, 46, 92, 0.08);
        }

        .ts-author-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ts-author-avatar-sm {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
          font-family: var(--font-display);
        }

        .ts-author-name {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0A0A10;
          font-family: var(--font-display);
        }

        .ts-author-role {
          font-size: 0.76rem;
          color: #64748B;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .ts-showcase-grid {
            grid-template-columns: 1fr;
          }
          .ts-nav-list {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 8px;
            scrollbar-width: none;
          }
          .ts-nav-list::-webkit-scrollbar {
            display: none;
          }
          .ts-nav-card {
            min-width: 240px;
            flex-shrink: 0;
            transform: none !important;
          }
          .ts-hero-card {
            grid-template-columns: 1fr;
          }
          .ts-card-visual-col {
            min-height: 280px;
          }
        }

        @media (max-width: 768px) {
          .ts-wrapper {
            padding: 70px 1.2rem 50px 1.2rem;
          }
          .ts-title {
            font-size: 2.2rem;
          }
          .ts-card-story-col {
            padding: 2rem 1.6rem;
          }
          .ts-story-quote {
            font-size: 0.98rem;
          }
        }
      `}</style>

      <div className="ts-ambient-layer" />

      <div className="ts-container">
        {/* ── SECTION HEADER ── */}
        <div className="ts-header">
          <div className="ts-header-left">
            <div className="ts-label-row">
              <span className="ts-label-bar" />
              <span className="ts-label-text">Client Testimonials</span>
            </div>
            <h2 className="ts-title">
              What Our Clients <span className="ts-title-accent">Say About Us</span>
            </h2>
          </div>

          <div className="ts-header-right">
            <div className="ts-google-badge">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Rated <strong>4.9 / 5.0</strong></span>
              <span className="ts-google-stars">★★★★★</span>
            </div>

            <a
              href="https://www.google.com/search?q=Nuzarox+Technology+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="ts-google-review-btn"
            >
              <span>★ View Google Reviews</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── TWO-COLUMN SHOWCASE ARCHITECTURE ── */}
        <div className="ts-showcase-grid">
          {/* Left Column: Interactive Client Nav Cards */}
          <div className="ts-nav-list">
            {clientCases.map((item, idx) => (
              <div
                key={item.id}
                className={`ts-nav-card ${idx === activeIdx ? 'active' : ''}`}
                onClick={() => handleSelect(idx)}
              >
                <div
                  className="ts-nav-avatar"
                  style={{ background: item.accentGradient }}
                >
                  {item.person.charAt(0)}
                </div>
                <div className="ts-nav-info">
                  <div className="ts-nav-client">{item.client}</div>
                  <div className="ts-nav-sub">{item.person} · {item.role}</div>
                  <div className="ts-nav-metric">{item.metricVal} {item.metricLabel}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Hero Showcase Glass Card */}
          <div ref={showcaseCardRef} className="ts-hero-card">
            {/* Visual Column */}
            <div className="ts-card-visual-col">
              <img
                src={activeCase.image}
                alt={activeCase.client}
                className="ts-case-image"
              />
              <div className="ts-visual-gradient" />

              <div className="ts-floating-metric-badge ts-anim-fade">
                <span className="ts-metric-num">{activeCase.metricVal}</span>
                <span className="ts-metric-txt">{activeCase.metricLabel}</span>
              </div>

              <div className="ts-visual-bottom-meta ts-anim-fade">
                <div>
                  <h3 className="ts-visual-client-title">{activeCase.client}</h3>
                  <div className="ts-visual-loc">{activeCase.location}</div>
                </div>
                <div className="ts-visual-stars">★★★★★</div>
              </div>
            </div>

            {/* Story & Deliverables Column */}
            <div className="ts-card-story-col">
              <div className="ts-case-tag-row ts-anim-fade">
                <span className="ts-badge-pill">{activeCase.badge}</span>
              </div>

              <div className="ts-anim-fade">
                <div className="ts-quote-mark">“</div>
                <p className="ts-story-quote">"{activeCase.quote}"</p>
              </div>

              <div className="ts-deliverables-box ts-anim-fade">
                <span className="ts-deliverables-label">Delivered by Nuzarox:</span>
                <div className="ts-tags-grid">
                  {activeCase.deliverables.map((item, i) => (
                    <span key={i} className="ts-deliverable-chip">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ts-author-footer ts-anim-fade">
                <div className="ts-author-left">
                  <div
                    className="ts-author-avatar-sm"
                    style={{ background: activeCase.accentGradient }}
                  >
                    {activeCase.person.charAt(0)}
                  </div>
                  <div>
                    <div className="ts-author-name">{activeCase.person}</div>
                    <div className="ts-author-role">{activeCase.role} · {activeCase.client}</div>
                  </div>
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
