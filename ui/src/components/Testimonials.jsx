import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviewsRow1 = [
  {
    name: 'Balaji', role: 'Founder, Gagner Sports', avatar: 'B',
    quote: 'Excellent work by Nuzarox. They understood our requirements clearly and delivered a professional, user-friendly platform that has made our event management much easier.',
    stars: 5,
    color: '#00E5FF',
    accent: 'linear-gradient(135deg, #00E5FF, #0077B6)'
  },
  {
    name: 'Siva', role: 'Marketing, Gagner Sports', avatar: 'S',
    quote: 'Nuzarox made the entire process smooth and simple. The website looks professional, works seamlessly, and has helped us present Gagner Sports much better online.',
    stars: 4.5,
    color: '#A855F7',
    accent: 'linear-gradient(135deg, #A855F7, #6D28D9)'
  },
  {
    name: 'Keerthieswaran', role: 'Student', avatar: 'K',
    quote: 'KE19 Portfolio gave me a clear and professional way to showcase my skills and projects. The design is clean, modern, and easy to explore.',
    stars: 5,
    color: '#10B981',
    accent: 'linear-gradient(135deg, #10B981, #047857)'
  },
  {
    name: 'Ruthra', role: 'Student', avatar: 'R',
    quote: 'The portfolio looks simple, creative, and professional. It helped me present my projects and skills in a much better way.',
    stars: 5,
    color: '#F59E0B',
    accent: 'linear-gradient(135deg, #F59E0B, #D97706)'
  }
];

const reviewsRow2 = [
  {
    name: 'Mani', role: 'President, Apartment', avatar: 'M',
    quote: 'The apartment management process has become much easier and more organized. The platform helps us manage residents, updates, and day-to-day activities efficiently.',
    stars: 4.5,
    color: '#EF4444',
    accent: 'linear-gradient(135deg, #EF4444, #991B1B)'
  },
  {
    name: 'Lokesh', role: 'Vice President, Apartment', avatar: 'L',
    quote: 'Everything is well organized and easy to manage. It has made communication and apartment operations much more convenient for our residents.',
    stars: 4,
    color: '#3B82F6',
    accent: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
  },
  {
    name: 'Nimmi', role: 'Digital Marketing', avatar: 'N',
    quote: 'The website has a clean and professional look, making it easy for residents to access important information. A simple and effective digital solution for apartment management.',
    stars: 4.5,
    color: '#14B8A6',
    accent: 'linear-gradient(135deg, #14B8A6, #0F766E)'
  }
];

// Duplicate loops for seamless horizontal infinite circular scrolling
// PERF: Massively reduce the number of duplicated DOM nodes on mobile to prevent layout thrashing
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
const r1Cards = isMobile 
  ? [...reviewsRow1, ...reviewsRow1] 
  : [...reviewsRow1, ...reviewsRow1, ...reviewsRow1, ...reviewsRow1, ...reviewsRow1, ...reviewsRow1];
const r2Cards = isMobile 
  ? [...reviewsRow2, ...reviewsRow2] 
  : [...reviewsRow2, ...reviewsRow2, ...reviewsRow2, ...reviewsRow2, ...reviewsRow2, ...reviewsRow2];

// Render stars with half-star support
const renderStars = (count) => {
  const stars = [];
  const full = Math.floor(count);
  const hasHalf = count % 1 !== 0;
  for (let i = 0; i < full; i++) stars.push(<span key={`f${i}`}>★</span>);
  if (hasHalf) stars.push(<span key="half" style={{ position: 'relative', display: 'inline-block', width: '0.85em' }}><span style={{ position: 'absolute', overflow: 'hidden', width: '50%', color: '#FFB800' }}>★</span><span style={{ color: '#D1D5DB' }}>★</span></span>);
  for (let i = full + (hasHalf ? 1 : 0); i < 5; i++) stars.push(<span key={`e${i}`} style={{ color: '#D1D5DB' }}>★</span>);
  return stars;
};

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
        {renderStars(r.stars)}
      </div>
      <p className="rv-quote">{r.quote}</p>
    </div>
  </div>
);

const useDragScroll = () => {
  const ref = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const checkLoop = () => {
    const el = ref.current;
    if (!el || el.scrollWidth === 0) return;

    // 1/3 of total scroll length (2 full sets out of 6)
    const chunkWidth = el.scrollWidth / 3;

    // Infinite teleport loop
    if (el.scrollLeft < 150) {
      el.scrollLeft += chunkWidth;
    } else if (el.scrollLeft > el.scrollWidth - el.clientWidth - 150) {
      el.scrollLeft -= chunkWidth;
    }
  };

  const onMouseDown = (e) => {
    isDown.current = true;
    if (!ref.current) return;
    ref.current.classList.add('active-dragging');
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    if (ref.current) ref.current.classList.remove('active-dragging');
  };

  const onMouseUp = () => {
    isDown.current = false;
    if (ref.current) ref.current.classList.remove('active-dragging');
  };

  const onMouseMove = (e) => {
    if (!isDown.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    ref.current.scrollLeft = scrollLeft.current - walk;
    if (!isMobile) checkLoop();
  };

  const onScroll = () => {
    if (!isMobile) checkLoop();
  };

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove, onScroll };
};

const Testimonials = () => {
  const secRef = useRef(null);
  const row1TrackRef = useRef(null);
  const row2TrackRef = useRef(null);

  const row1Drag = useDragScroll();
  const row2Drag = useDragScroll();

  useEffect(() => {
    if (!secRef.current || !row1TrackRef.current || !row2TrackRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: secRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        });

        // Top row scrolls LEFT when page scrolls DOWN (and RIGHT when page scrolls UP)
        tl.to(row1TrackRef.current, {
          x: -450,
          ease: "none"
        }, 0);

        // Bottom row scrolls RIGHT when page scrolls DOWN (and LEFT when page scrolls UP)
        tl.fromTo(row2TrackRef.current,
          { x: -450 },
          { x: 0, ease: "none" },
          0
        );
      });
    }, secRef);

    const r1El = row1Drag.ref.current;
    const r2El = row2Drag.ref.current;

    const initScrollPositions = () => {
      if (r1El && r1El.scrollWidth > 0) {
        r1El.scrollLeft = r1El.scrollWidth * 0.33;
      }
      if (r2El && r2El.scrollWidth > 0) {
        r2El.scrollLeft = r2El.scrollWidth * 0.45;
      }
    };

    initScrollPositions();
    const timer = setTimeout(initScrollPositions, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
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

        /* Ambient blurred orbs in background for frosted glass effect - uses radial gradients instead of expensive CSS blur */
        .rv-bg-orb {
          position: absolute;
          border-radius: 50%;
          opacity: 0.5;
          z-index: 0;
          pointer-events: none;
        }
        .orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(0,229,255,0.7) 0%, rgba(0,229,255,0) 70%); top: -150px; left: -150px; }
        .orb-2 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(168,85,247,0) 70%); bottom: -250px; right: -150px; }
        .orb-3 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(16,185,129,0) 70%); top: 30%; left: 50%; transform: translateX(-50%); }

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
          overflow-x: auto;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 2;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          will-change: scroll-position;
        }

        .rv-row::-webkit-scrollbar {
          display: none;
        }

        .rv-row.active-dragging {
          cursor: grabbing !important;
        }

        .rv-track {
          display: flex;
          width: max-content;
          margin-left: 0 !important;
          will-change: transform;
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
          background: rgba(255, 255, 255, 0.95);
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

        @media (max-width: 1024px) {
          #testimonials {
            padding: 4rem 0;
          }
          .rv-card {
            width: 260px;
          }
        }

        @media (max-width: 768px) {
          #testimonials {
            padding: 3.5rem 0 !important;
            background: #F2F4F7 !important;
          }
          .rv-head {
            margin-bottom: 2rem !important;
            padding: 0 1.2rem !important;
          }
          .rv-track {
            margin-left: 0 !important;
          }
          .rv-card {
            width: 270px !important;
            min-width: 270px !important;
            max-width: 270px !important;
            margin: 0 10px !important;
          }
          .rv-inner {
            padding: 20px !important;
            border-radius: 20px !important;
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04) !important;
          }
          .rv-avatar {
            width: 40px !important;
            height: 40px !important;
            font-size: 0.8rem !important;
          }
          .rv-name {
            font-size: 0.98rem !important;
          }
          .rv-role {
            font-size: 0.62rem !important;
          }
          .rv-quote {
            font-size: 0.86rem !important;
            line-height: 1.55 !important;
            color: #222222 !important;
          }
          .rv-row {
            margin-bottom: 1.8rem !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }
          .rv-row::-webkit-scrollbar {
            display: none !important;
          }
          .rv-mobile-swipe-hint {
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
            padding: 0 !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            color: #475569 !important;
            font-size: 0.78rem !important;
            font-weight: 700 !important;
            letter-spacing: 0.04em !important;
          }
          .swipe-arrow-left {
            color: #00A896 !important;
            font-size: 1.05rem !important;
            font-weight: 900 !important;
            animation: pulseLeft 1.4s ease-in-out infinite alternate !important;
          }
          .swipe-arrow-right {
            color: #00A896 !important;
            font-size: 1.05rem !important;
            font-weight: 900 !important;
            animation: pulseRight 1.4s ease-in-out infinite alternate !important;
          }
          .rv-mobile-row-divider {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin: 0.3rem 0 1.2rem 0 !important;
          }
        }

        .rv-mobile-swipe-hint, .rv-mobile-row-divider {
          display: none;
        }

        @keyframes pulseLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-4px); }
        }
        @keyframes pulseRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(4px); }
        }

        @media (max-width: 480px) {
          #testimonials {
            padding: 3rem 0 !important;
          }
          .rv-card {
            width: 260px !important;
            min-width: 260px !important;
            max-width: 260px !important;
            margin: 0 8px !important;
          }
          .rv-inner {
            padding: 18px !important;
          }
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
      <div 
        ref={row1Drag.ref}
        className="rv-row"
        onMouseDown={row1Drag.onMouseDown}
        onMouseLeave={row1Drag.onMouseLeave}
        onMouseUp={row1Drag.onMouseUp}
        onMouseMove={row1Drag.onMouseMove}
        onScroll={row1Drag.onScroll}
      >
        <div ref={row1TrackRef} className="rv-track">
          {r1Cards.map((r, i) => <Card key={`r1-${i}`} r={r} />)}
        </div>
      </div>

      {/* Clean Text Swipe Hint on Mobile (Between Rows) */}
      <div className="rv-mobile-row-divider">
        <div className="rv-mobile-swipe-hint">
          <span className="swipe-arrow-left">‹</span>
          <span>Swipe to see reviews</span>
          <span className="swipe-arrow-right">›</span>
        </div>
      </div>

      {/* Bottom Row */}
      <div 
        ref={row2Drag.ref}
        className="rv-row"
        onMouseDown={row2Drag.onMouseDown}
        onMouseLeave={row2Drag.onMouseLeave}
        onMouseUp={row2Drag.onMouseUp}
        onMouseMove={row2Drag.onMouseMove}
        onScroll={row2Drag.onScroll}
      >
        <div ref={row2TrackRef} className="rv-track">
          {r2Cards.map((r, i) => <Card key={`r2-${i}`} r={r} />)}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
