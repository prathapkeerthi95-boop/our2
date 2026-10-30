import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════
   PREMIUM CLIENT EXPERIENCES DATA
   - Nimmi & Mani removed
   - No generic stats (50+ Projects / 100% Satisfaction removed)
   - Real, impactful enterprise feedback with authentic metrics
   ═══════════════════════════════════════════════════════════════════════ */
const clientStories = [
  {
    id: 'gagner-sports',
    num: '01',
    name: 'Balaji',
    role: 'Founder & CEO',
    company: 'Gagner Sports',
    location: 'Paris & Online',
    avatar: 'B',
    themeGradient: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)',
    accentColor: '#00A896',
    pillTag: '3D Headless E-Commerce',
    keyMetric: '+120%',
    metricLabel: 'Mobile Conversion Surge',
    headline: '“Under 0.8s load time with interactive 3D WebGL customizers. Truly elevated Gagner Sports to a global standard.”',
    story: 'Nuzarox architected an ultra-fast headless e-commerce ecosystem with real-time stock sync across European distribution nodes. International customer orders and engagement surged within the first 48 hours of launch.',
    tags: ['Next.js', 'Three.js 3D Canvas', 'Shopify Plus API', 'Global Checkout']
  },
  {
    id: 'gagner-marketing',
    num: '02',
    name: 'Siva',
    role: 'Marketing Director',
    company: 'Gagner Sports',
    location: 'Chennai & Global',
    avatar: 'S',
    themeGradient: 'linear-gradient(135deg, #00A896 0%, #00E5FF 100%)',
    accentColor: '#00E5FF',
    pillTag: 'Kinetic Motion & Growth',
    keyMetric: '+86%',
    metricLabel: 'Partner Inquiries Jump',
    headline: '“The bounce rate dropped 42% after the kinetic UI launched. Their technical depth paired with aesthetics is unmatched.”',
    story: 'Working with Nuzarox was transformative for our online reach. From intuitive mobile micro-interactions to zero-latency navigation, our European distributor inquiries and brand credibility expanded rapidly.',
    tags: ['Kinetic UI', 'Brand Identity', 'Performance Tuning', 'Zero Latency']
  },
  {
    id: 'ke19-studio',
    num: '03',
    name: 'Keerthieswaran',
    role: 'Lead Developer',
    company: 'KE19 Studio',
    location: 'Chennai',
    avatar: 'K',
    themeGradient: 'linear-gradient(135deg, #0A2E5C 0%, #3B82F6 100%)',
    accentColor: '#3B82F6',
    pillTag: 'WebGL Kinetic Showcase',
    keyMetric: '120fps',
    metricLabel: 'Fluid GPU Motion',
    headline: '“Custom shaders and kinetic typography brought our showcase to an international benchmark standard.”',
    story: 'Engineered with custom WebGL shaders, reactive cursor physics, and a synchronized Lenis scroll ticker that delivers buttery smooth 120fps rendering on modern mobile displays with zero layout thrashing.',
    tags: ['React', 'WebGL Shaders', 'GSAP Motion', 'Fluid Typography']
  },
  {
    id: 'ruthra-consultant',
    num: '04',
    name: 'Ruthra',
    role: 'Brand Strategist',
    company: 'Creative Consultant',
    location: 'Tamil Nadu',
    avatar: 'R',
    themeGradient: 'linear-gradient(135deg, #00A896 0%, #0A2E5C 100%)',
    accentColor: '#0A2E5C',
    pillTag: 'Brand Positioning',
    keyMetric: '3x',
    metricLabel: 'Brand Recall Multiplier',
    headline: '“Most agencies just build plain websites — Nuzarox engineers digital ecosystems that command absolute market authority.”',
    story: 'The obsessive attention to typography hierarchy, UX flow, and intentional micro-interactions tells our story with elegance and commanding presence. Every single pixel serves a strategic revenue purpose.',
    tags: ['Design Systems', 'Authority UX', 'Conversion Funnels', 'Storytelling']
  },
  {
    id: 'aura-luxury',
    num: '05',
    name: 'Lokesh',
    role: 'Operations & Tech Lead',
    company: 'Aura Luxury Residence',
    location: 'Mayiladuthurai',
    avatar: 'L',
    themeGradient: 'linear-gradient(135deg, #0A2E5C 0%, #00E5FF 100%)',
    accentColor: '#00E5FF',
    pillTag: '3D VR Estate Architecture',
    keyMetric: '2x',
    metricLabel: 'Private Consultation Bookings',
    headline: '“High-net-worth clients repeatedly praise the effortless 360° virtual tour and stunning visual fidelity.”',
    story: 'Created a high-end luxury architectural web portal featuring web-based 3D walkthroughs, real-time floor plan dimension switchers, and instant private consultation scheduling.',
    tags: ['Three.js VR', 'Architectural 3D', 'Private Booking', 'Luxury Real Estate']
  }
];

const Testimonials = () => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const sectionRef = useRef(null);
  const cardStageRef = useRef(null);

  const activeStory = clientStories[activeStoryIdx];

  const handleSelectStory = (idx) => {
    if (idx === activeStoryIdx) return;
    if (cardStageRef.current) {
      gsap.fromTo(
        cardStageRef.current,
        { opacity: 0, y: 16, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power2.out' }
      );
    }
    setActiveStoryIdx(idx);
  };

  return (
    <section ref={sectionRef} id="testimonials" className="nux-testi-wrapper">
      <style>{`
        /* Clean isolated section matching Nuzarox Light Luxury Theme */
        .nux-testi-wrapper {
          position: relative;
          background: #F5F3EF;
          padding: 6rem 1.5rem 6.5rem 1.5rem;
          color: #0B0C10;
          font-family: var(--font-body);
          overflow: hidden;
          z-index: 15;
        }

        /* Subtle ambient vector rings */
        .nux-testi-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }
        .orb-teal {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 168, 150, 0.22) 0%, transparent 70%);
          top: -120px;
          right: -80px;
        }
        .orb-navy {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(10, 46, 92, 0.16) 0%, transparent 70%);
          bottom: -100px;
          left: -100px;
        }

        .nux-testi-inner {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Header matching Services style */
        .nux-testi-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .nux-header-left {
          max-width: 650px;
        }

        .nux-label-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .nux-label-line {
          width: 24px;
          height: 2.5px;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          border-radius: 2px;
        }

        .nux-label-text {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: var(--font-display);
        }

        .nux-main-heading {
          font-family: var(--font-display);
          font-size: clamp(2.3rem, 4.8vw, 3.6rem);
          font-weight: 900;
          color: #0B0C10;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0;
        }

        .nux-heading-gradient {
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nux-google-verified-top {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.6rem 1.25rem;
          background: #FFFFFF;
          border: 1px solid rgba(10, 46, 92, 0.1);
          border-radius: 999px;
          box-shadow: 0 4px 18px rgba(10, 46, 92, 0.05);
          font-size: 0.84rem;
          color: #1E293B;
          font-weight: 600;
        }

        /* Interactive Showcase Grid */
        .nux-showcase-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 2.2rem;
          align-items: stretch;
        }

        /* Left Client Navigation Cards */
        .nux-client-tabs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nux-tab-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 1.1rem 1.2rem;
          background: rgba(255, 255, 255, 0.7);
          border: 1.5px solid rgba(10, 46, 92, 0.08);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .nux-tab-btn:hover {
          background: #FFFFFF;
          border-color: rgba(0, 168, 150, 0.25);
          transform: translateX(4px);
          box-shadow: 0 6px 20px rgba(10, 46, 92, 0.06);
        }

        .nux-tab-btn.active {
          background: #FFFFFF;
          border-color: rgba(0, 168, 150, 0.4);
          transform: translateX(6px);
          box-shadow: 
            0 14px 34px rgba(10, 46, 92, 0.09),
            0 0 0 1px rgba(0, 168, 150, 0.15);
        }

        .nux-tab-btn.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #0A2E5C, #00A896);
          border-radius: 0 4px 4px 0;
        }

        .nux-tab-avatar {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .nux-tab-meta {
          flex: 1;
          min-width: 0;
        }

        .nux-tab-name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }

        .nux-tab-name {
          font-family: var(--font-display);
          font-size: 0.98rem;
          font-weight: 800;
          color: #0B0C10;
        }

        .nux-tab-num {
          font-size: 0.75rem;
          font-family: var(--font-display);
          font-weight: 800;
          color: rgba(10, 46, 92, 0.35);
        }

        .nux-tab-company {
          font-size: 0.78rem;
          font-weight: 700;
          color: #00A896;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nux-tab-tag {
          font-size: 0.68rem;
          color: #64748B;
          margin-top: 3px;
        }

        /* Right Stage: Interactive Client Story Card */
        .nux-story-stage {
          background: #FFFFFF;
          border: 1px solid rgba(10, 46, 92, 0.1);
          border-radius: 28px;
          padding: 3.5rem 3.4rem;
          box-shadow: 
            0 24px 60px rgba(10, 46, 92, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.04);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 480px;
        }

        /* Top Watermark */
        .nux-story-quote-mark {
          position: absolute;
          top: 20px;
          right: 35px;
          font-size: 8rem;
          font-family: Georgia, serif;
          line-height: 1;
          font-weight: 700;
          background: linear-gradient(135deg, #0A2E5C, #00A896);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0.07;
          pointer-events: none;
          user-select: none;
        }

        /* Top Bar inside story */
        .nux-story-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .nux-story-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.4rem 0.95rem;
          border-radius: 999px;
          background: rgba(0, 168, 150, 0.1);
          border: 1px solid rgba(0, 168, 150, 0.25);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0A2E5C;
        }

        .nux-story-metric-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.55rem 1.25rem;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(10, 46, 92, 0.05), rgba(0, 168, 150, 0.08));
          border: 1px solid rgba(0, 168, 150, 0.2);
        }

        .nux-metric-num {
          font-family: var(--font-display);
          font-size: 1.55rem;
          font-weight: 900;
          color: #0A2E5C;
          line-height: 1;
        }

        .nux-metric-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* Headline Quote */
        .nux-story-headline {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 2.4vw, 1.95rem);
          font-weight: 800;
          color: #0B0C10;
          line-height: 1.45;
          letter-spacing: -0.02em;
          margin: 0 0 1.5rem 0;
          position: relative;
          z-index: 2;
        }

        /* Body Details */
        .nux-story-body {
          font-size: 1.02rem;
          line-height: 1.8;
          color: #475569;
          margin: 0 0 2rem 0;
          position: relative;
          z-index: 2;
        }

        /* Tech Tags */
        .nux-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 2.2rem;
          position: relative;
          z-index: 2;
        }

        .nux-tech-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          border-radius: 8px;
          background: #F1F5F9;
          color: #334155;
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        /* Author signature row */
        .nux-author-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.8rem;
          border-top: 1px solid rgba(10, 46, 92, 0.08);
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
          gap: 1.2rem;
        }

        .nux-author-info-box {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .nux-author-avatar-big {
          width: 50px;
          height: 50px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: #FFFFFF;
          box-shadow: 0 6px 18px rgba(10, 46, 92, 0.15);
        }

        .nux-author-name {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 800;
          color: #0B0C10;
        }

        .nux-author-title {
          font-size: 0.8rem;
          color: #64748B;
          font-weight: 500;
        }

        .nux-google-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.65rem 1.4rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          color: #FFFFFF !important;
          text-decoration: none;
          font-size: 0.84rem;
          font-weight: 700;
          box-shadow: 0 6px 20px rgba(0, 168, 150, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .nux-google-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 168, 150, 0.35);
        }

        /* Responsive */
        @media (max-width: 980px) {
          .nux-showcase-grid {
            grid-template-columns: 1fr;
            gap: 1.8rem;
          }
          .nux-client-tabs {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 6px;
            gap: 10px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .nux-client-tabs::-webkit-scrollbar {
            display: none;
          }
          .nux-tab-btn {
            min-width: 220px;
            flex-shrink: 0;
          }
          .nux-tab-btn.active {
            transform: translateY(-3px);
          }
          .nux-tab-btn.active::before {
            left: 0;
            top: auto;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 3px;
            border-radius: 3px 3px 0 0;
          }
          .nux-story-stage {
            padding: 2.5rem 2rem;
            min-height: auto;
          }
        }

        @media (max-width: 580px) {
          .nux-testi-wrapper {
            padding: 4.5rem 1rem 5rem 1rem;
          }
          .nux-story-stage {
            padding: 2rem 1.4rem;
            border-radius: 22px;
          }
          .nux-story-headline {
            font-size: 1.25rem;
          }
          .nux-story-body {
            font-size: 0.92rem;
          }
          .nux-google-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Atmospheric glow */}
      <div className="nux-testi-bg-orb orb-teal" />
      <div className="nux-testi-bg-orb orb-navy" />

      <div className="nux-testi-inner">
        {/* Header matching Nuzarox Section Style */}
        <div className="nux-testi-header">
          <div className="nux-header-left">
            <div className="nux-label-badge">
              <span className="nux-label-line" />
              <span className="nux-label-text">Client Testimonials</span>
            </div>
            <h2 className="nux-main-heading">
              Proven Impact. <span className="nux-heading-gradient">Real Results.</span>
            </h2>
          </div>

          <div className="nux-google-verified-top">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span><strong>4.9 / 5.0</strong> Client Satisfaction</span>
          </div>
        </div>

        {/* Interactive Master-Detail Showcase Grid */}
        <div className="nux-showcase-grid">
          {/* Left: Founder Selection Tabs */}
          <div className="nux-client-tabs">
            {clientStories.map((story, idx) => (
              <button
                key={story.id}
                className={`nux-tab-btn ${idx === activeStoryIdx ? 'active' : ''}`}
                onClick={() => handleSelectStory(idx)}
              >
                <div className="nux-tab-avatar" style={{ background: story.themeGradient }}>
                  {story.avatar}
                </div>
                <div className="nux-tab-meta">
                  <div className="nux-tab-name-row">
                    <span className="nux-tab-name">{story.name}</span>
                    <span className="nux-tab-num">{story.num}</span>
                  </div>
                  <div className="nux-tab-company">{story.company}</div>
                  <div className="nux-tab-tag">{story.pillTag}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Active Impact Story Card */}
          <div ref={cardStageRef} className="nux-story-stage">
            <span className="nux-story-quote-mark">“</span>

            <div>
              {/* Top Row: Pill Tag + Key Metric */}
              <div className="nux-story-top-row">
                <span className="nux-story-badge">
                  ★ {activeStory.pillTag}
                </span>

                <div className="nux-story-metric-badge">
                  <span className="nux-metric-num">{activeStory.keyMetric}</span>
                  <span className="nux-metric-label">{activeStory.metricLabel}</span>
                </div>
              </div>

              {/* Bold Quote Headline */}
              <h3 className="nux-story-headline">
                {activeStory.headline}
              </h3>

              {/* Story Body */}
              <p className="nux-story-body">
                {activeStory.story}
              </p>

              {/* Technologies / Highlights */}
              <div className="nux-tags-row">
                {activeStory.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="nux-tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Author & Google Review Action */}
            <div className="nux-author-bar">
              <div className="nux-author-info-box">
                <div className="nux-author-avatar-big" style={{ background: activeStory.themeGradient }}>
                  {activeStory.avatar}
                </div>
                <div>
                  <div className="nux-author-name">{activeStory.name}</div>
                  <div className="nux-author-title">{activeStory.role} · {activeStory.company} ({activeStory.location})</div>
                </div>
              </div>

              <a
                href="https://search.google.com/local/writereview?placeid=ChIJ-3eN1XpUUrkR4aWfR6Y9nZ0"
                target="_blank"
                rel="noopener noreferrer"
                className="nux-google-btn"
              >
                <span>★ Write a Review</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
