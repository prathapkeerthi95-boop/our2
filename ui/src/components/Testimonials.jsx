import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviewsRow1 = [
  {
    name: 'Rajesh Kumar', role: 'CEO, TechNova', avatar: 'RK',
    quote: 'Traffic increased by 420%. Absolutely transformed our digital presence and scaled our business overnight.',
    color: '#00E5FF',
    accent: 'linear-gradient(135deg, #00E5FF, #0077B6)'
  },
  {
    name: 'Priya Venkat', role: 'Founder, FitPulse', avatar: 'PV',
    quote: 'The mobile app is flawless. Every stage was handled with extreme precision and amazing design.',
    color: '#A855F7',
    accent: 'linear-gradient(135deg, #A855F7, #6D28D9)'
  },
  {
    name: 'Arjun Mehta', role: 'Director, Vertex', avatar: 'AM',
    quote: 'They built an entire identity ecosystem for our brand. It\'s not just a website, it\'s an experience.',
    color: '#10B981',
    accent: 'linear-gradient(135deg, #10B981, #047857)'
  },
  {
    name: 'Sarah Johnson', role: 'CMO, Lumina', avatar: 'SJ',
    quote: 'Best agency we\'ve partnered with. True WebGL visionaries that pushed our web presence to the future.',
    color: '#F59E0B',
    accent: 'linear-gradient(135deg, #F59E0B, #D97706)'
  }
];

const reviewsRow2 = [
  {
    name: 'Deepak Sharma', role: 'CTO, CloudSync', avatar: 'DS',
    quote: 'Complex microservices architecture delivered flawlessly. Unmatched technical depth and execution speed.',
    color: '#EF4444',
    accent: 'linear-gradient(135deg, #EF4444, #991B1B)'
  },
  {
    name: 'Ananya Iyer', role: 'Design Lead, Modo', avatar: 'AI',
    quote: 'The UI/UX is breathtaking. User engagement jumped 300% in the first month alone. Absolutely stunning work.',
    color: '#3B82F6',
    accent: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
  },
  {
    name: 'Marcus Lee', role: 'CEO, NexGen Labs', avatar: 'ML',
    quote: 'Concept to launch in 8 weeks. They move fast without compromising quality. The results speak for themselves.',
    color: '#EC4899',
    accent: 'linear-gradient(135deg, #EC4899, #9D174D)'
  },
  {
    name: 'Kavitha Rajan', role: 'Founder, StyleHive', avatar: 'KR',
    quote: 'Our e-commerce platform handles 10x traffic with zero downtime. Game-changing partnership for our growth.',
    color: '#14B8A6',
    accent: 'linear-gradient(135deg, #14B8A6, #0F766E)'
  }
];

// Duplicate loops for seamless horizontal scrolling feeling
const r1Cards = [...reviewsRow1, ...reviewsRow1, ...reviewsRow1, ...reviewsRow1];
const r2Cards = [...reviewsRow2, ...reviewsRow2, ...reviewsRow2, ...reviewsRow2];

const Card = ({ r }) => (
  <div className="rv-card">
    <div className="rv-glow" style={{ background: r.accent }}></div>
    <div className="rv-inner">
      <div className="rv-header">
        <div className="rv-avatar" style={{ background: r.accent }}>{r.avatar}</div>
        <div className="rv-meta">
          <span className="rv-name">{r.name}</span>
          <span className="rv-role" style={{ color: r.color }}>{r.role}</span>
        </div>
      </div>
      <div className="rv-stars">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <p className="rv-quote">{r.quote}</p>
    </div>
  </div>
);

const Testimonials = () => {
  const secRef = useRef(null);
  const r1Ref = useRef(null);
  const r2Ref = useRef(null);

  useEffect(() => {
    if (!secRef.current || !r1Ref.current || !r2Ref.current) return;

    const ctx = gsap.context(() => {
      // Row 1: Smoothly glides Left to Right
      gsap.to(r1Ref.current, {
        x: 450,
        ease: 'none',
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5, // Increased scrub for buttery momentum feel
        }
      });

      // Row 2: Smoothly glides Right to Left
      gsap.to(r2Ref.current, {
        x: -450,
        ease: 'none',
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5, // Increased scrub for buttery momentum feel
        }
      });
    }, secRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="testimonials">
      <style>{`
        #testimonials {
          padding: 6rem 0;
          background: #F2F4F7;
          overflow: hidden;
          position: relative;
        }

        /* Ambient blurred orbs in background for frosted glass effect */
        .rv-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          z-index: 0;
          pointer-events: none;
        }
        .orb-1 { width: 400px; height: 400px; background: #00E5FF; top: -100px; left: -100px; }
        .orb-2 { width: 500px; height: 500px; background: #A855F7; bottom: -200px; right: -100px; }
        .orb-3 { width: 300px; height: 300px; background: #10B981; top: 30%; left: 50%; transform: translateX(-50%); }

        .rv-head {
          text-align: center;
          margin-bottom: 4rem;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }
        
        .rv-head .section-label {
          justify-content: center;
          color: #555;
          margin-bottom: 0.8rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        
        .rv-head h2 {
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 900;
          color: #0A0A14;
          font-family: var(--font-display);
          margin: 0;
          letter-spacing: -1.5px;
        }

        .rv-row {
          overflow: visible;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 2;
        }

        .rv-track {
          display: flex;
          width: max-content;
          /* Offsets to make sure cards fill the screen edge-to-edge */
          margin-left: -35%; 
        }

        .rv-card {
          flex-shrink: 0;
          width: 280px;
          margin: 0 12px;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .rv-card:hover {
          transform: translateY(-8px);
        }

        /* Hover Glow behind card */
        .rv-glow {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          filter: blur(20px);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
        }

        .rv-card:hover .rv-glow {
          opacity: 0.5;
        }

        .rv-inner {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 24px;
          padding: 24px;
          position: relative;
          z-index: 1;
          box-shadow: 
            0 10px 30px rgba(0,0,0,0.03),
            inset 0 1px 0 rgba(255,255,255,1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .rv-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .rv-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 800;
          color: #FFF;
          font-family: var(--font-display);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .rv-meta {
          display: flex;
          flex-direction: column;
        }

        .rv-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: #111 !important;
          font-family: var(--font-display);
        }

        .rv-role {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 800;
        }

        .rv-stars {
          display: flex;
          gap: 2px;
          margin-bottom: 12px;
        }

        .rv-stars span {
          font-size: 0.85rem;
          color: #FFB800;
        }

        .rv-quote {
          font-size: 0.9rem !important;
          line-height: 1.6 !important;
          color: #333333 !important;
          font-weight: 500 !important;
          margin: 0 !important;
          flex-grow: 1;
        }
      `}</style>

      {/* Colorful background orbs */}
      <div className="rv-bg-orb orb-1"></div>
      <div className="rv-bg-orb orb-2"></div>
      <div className="rv-bg-orb orb-3"></div>

      <div className="rv-head">
        <div className="section-label">Testimonials</div>
        <h2>What Our Clients Say</h2>
      </div>

      {/* Top Row */}
      <div className="rv-row">
        <div ref={r1Ref} className="rv-track">
          {r1Cards.map((r, i) => <Card key={`r1-${i}`} r={r} />)}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="rv-row">
        <div ref={r2Ref} className="rv-track">
          {r2Cards.map((r, i) => <Card key={`r2-${i}`} r={r} />)}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
