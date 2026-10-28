import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Curated Client Testimonials (Nimmi & Mani removed as requested)
// Organized in luxury pairs matching the uploaded editorial layout
const testimonialPairs = [
  {
    pairId: '01-02',
    first: {
      num: '(01)',
      category: 'E-COMMERCE / 3D WEBGL',
      stars: 5,
      quote: "An unforgettable transformation! Nuzarox architected a truly world-class e-commerce platform for Gagner Sports with interactive 3D product customizers. Every detail was seamless — the performance, sub-second checkout, and craftsmanship. Truly elevated our brand internationally!",
      author: 'Balaji, Founder & CEO',
      company: 'Gagner Sports (Paris & Online)'
    },
    second: {
      num: '(02)',
      category: 'BRAND IDENTITY & MARKETING',
      stars: 5,
      quote: "Working with Nuzarox was transformative for our entire digital presence. From intuitive mobile UX to kinetic motion design, our customer engagement and European partner inquiries surged by over 120%. Their technical depth and aesthetic taste are unmatched.",
      author: 'Siva, Marketing Director',
      company: 'Gagner Sports'
    }
  },
  {
    pairId: '03-04',
    first: {
      num: '(03)',
      category: 'CREATIVE & DIGITAL IDENTITY',
      stars: 5,
      quote: "The custom WebGL animations, reactive shaders, and kinetic typography engineered by Nuzarox brought KE19 Portfolio to an international benchmark. Ultra-clean architecture that loads instantaneously across every device.",
      author: 'Keerthieswaran, Lead Developer',
      company: 'KE19 Studio'
    },
    second: {
      num: '(04)',
      category: 'STRATEGY & DESIGN SYSTEMS',
      stars: 5,
      quote: "The obsessive attention to UX detail, responsive fluidity, and brand storytelling sets Nuzarox apart in a crowded market. They don't just build websites; they engineer digital ecosystems that command absolute market authority.",
      author: 'Ruthra, Brand Strategist',
      company: 'Creative Consultant'
    }
  },
  {
    pairId: '05-06',
    first: {
      num: '(05)',
      category: 'LUXURY REAL ESTATE / ARCHITECTURE',
      stars: 5,
      quote: "The interactive 3D virtual tour experience and digital consultation interface created by Nuzarox delivered pure luxury. High-net-worth clients repeatedly praise the effortless navigation and stunning visual fidelity.",
      author: 'Lokesh, Operations & Tech Lead',
      company: 'Aura Luxury Residence'
    },
    second: {
      num: '(06)',
      category: 'ENTERPRISE DISTRIBUTION',
      stars: 5,
      quote: "From initial concept architecture to live production deployment, Nuzarox proved to be a powerhouse partner. Rock-solid security, lightning-quick response times, and exceptional global scalability.",
      author: 'David & Sophia',
      company: 'Global Retail Distribution, Dubai'
    }
  }
];

const Testimonials = () => {
  const [activePairIndex, setActivePairIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const showcaseRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  const activePair = testimonialPairs[activePairIndex];

  // Smooth pair switch handler
  const handleSelectPair = (index) => {
    if (index === activePairIndex || isTransitioning) return;
    setIsTransitioning(true);

    if (card1Ref.current && card2Ref.current) {
      gsap.to([card1Ref.current, card2Ref.current], {
        opacity: 0,
        y: 14,
        duration: 0.28,
        ease: 'power2.in',
        onComplete: () => {
          setActivePairIndex(index);
          gsap.fromTo(
            [card1Ref.current, card2Ref.current],
            { opacity: 0, y: -14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.08,
              ease: 'power2.out',
              onComplete: () => setIsTransitioning(false)
            }
          );
        }
      });
    } else {
      setActivePairIndex(index);
      setIsTransitioning(false);
    }
  };

  const handleNext = () => {
    handleSelectPair((activePairIndex + 1) % testimonialPairs.length);
  };

  const handlePrev = () => {
    handleSelectPair((activePairIndex - 1 + testimonialPairs.length) % testimonialPairs.length);
  };

  // Auto cycle pairs every 9 seconds, pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePairIndex((prev) => (prev + 1) % testimonialPairs.length);
    }, 9500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="nz-testi-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .nz-testi-wrapper {
          position: relative;
          background: #06090F;
          padding: 6.5rem 1.5rem;
          color: #FFFFFF;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Ambient background glow accents matching Nuzarox brand */
        .nz-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.45;
        }
        .nz-glow-cyan {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.28) 0%, rgba(0, 229, 255, 0) 70%);
          top: -100px;
          right: -80px;
        }
        .nz-glow-teal {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 168, 150, 0.22) 0%, rgba(0, 168, 150, 0) 70%);
          bottom: -100px;
          left: -80px;
        }
        .nz-glow-navy {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(10, 46, 92, 0.35) 0%, rgba(10, 46, 92, 0) 70%);
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        /* Outer Frame / Showcase Box matching the luxury preview image */
        .nz-testi-frame {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          background: radial-gradient(120% 120% at 50% 10%, #0B111D 0%, #05080E 100%);
          border-radius: 36px;
          border: 1px solid rgba(0, 229, 255, 0.15);
          box-shadow: 
            0 30px 100px -20px rgba(0, 0, 0, 0.8),
            0 0 50px -10px rgba(0, 229, 255, 0.08),
            inset 0 1px 1px rgba(255, 255, 255, 0.12);
          padding: 4.5rem 4rem 3.5rem 4rem;
          min-height: 640px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        /* Subtle grid blueprint line overlay */
        .nz-frame-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(0, 229, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.035) 1px, transparent 1px);
          background-size: 72px 72px;
          pointer-events: none;
          z-index: 0;
        }

        /* Top Bar: 5 Golden Stars */
        .nz-top-bar {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .nz-stars-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .nz-stars-row {
          display: flex;
          gap: 4px;
        }

        .nz-star-icon {
          color: #FFB800;
          font-size: 1.15rem;
          filter: drop-shadow(0 0 6px rgba(255, 184, 0, 0.45));
        }

        .nz-stars-subtext {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Center Giant Typography Watermark: "What they say?" */
        .nz-watermark-center {
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          text-align: center;
          pointer-events: none;
          z-index: 1;
          user-select: none;
        }

        .nz-watermark-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(4.2rem, 11vw, 9.8rem);
          line-height: 0.95;
          letter-spacing: -0.02em;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 4px 30px rgba(0, 0, 0, 0.6));
        }

        /* Floating Testimonial Cards Layout (Staggered Grid) */
        .nz-cards-layout {
          position: relative;
          z-index: 4;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          margin-top: 1rem;
          margin-bottom: 3rem;
          min-height: 380px;
          align-items: center;
        }

        /* Card (01) Positioned top-right relative offset */
        .nz-card-col-right {
          grid-column: 2;
          display: flex;
          justify-content: flex-end;
          align-self: flex-start;
          transform: translateY(-10px);
        }

        /* Card (02) Positioned bottom-left relative offset */
        .nz-card-col-left {
          grid-column: 1;
          display: flex;
          justify-content: flex-start;
          align-self: flex-end;
          transform: translateY(20px);
        }

        /* Glassmorphism Testimonial Card Styling */
        .nz-testi-card {
          width: 100%;
          max-width: 440px;
          background: rgba(14, 21, 35, 0.72);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(0, 229, 255, 0.18);
          border-radius: 24px;
          padding: 2rem 2.2rem 1.8rem 2.2rem;
          position: relative;
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(0, 168, 150, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .nz-testi-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 229, 255, 0.38);
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.65),
            0 0 35px rgba(0, 229, 255, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .nz-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
        }

        .nz-card-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.05em;
        }

        .nz-card-tag {
          font-size: 0.64rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          background: rgba(0, 229, 255, 0.08);
          color: #00E5FF;
          border: 1px solid rgba(0, 229, 255, 0.2);
        }

        .nz-card-quote {
          font-size: 0.94rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.82);
          font-weight: 400;
          margin: 0 0 1.6rem 0;
          letter-spacing: -0.01em;
        }

        .nz-card-author-row {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          text-align: right;
        }

        .nz-card-author-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nz-card-author-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.92);
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.01em;
        }

        .nz-card-author-name::before {
          content: '— ';
          color: #00E5FF;
        }

        .nz-card-author-company {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.45);
          font-weight: 500;
        }

        /* Bottom Row: Stats on Right & Navigation / Controls */
        .nz-bottom-bar {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        /* Interactive Pair Switcher / Navigator */
        .nz-nav-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nz-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(0, 229, 255, 0.25);
          background: rgba(14, 21, 35, 0.8);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.25s ease;
        }

        .nz-arrow-btn:hover {
          background: #00E5FF;
          color: #06090F;
          border-color: #00E5FF;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 229, 255, 0.35);
        }

        .nz-pairs-indicator {
          display: flex;
          gap: 8px;
        }

        .nz-pair-pill {
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          font-size: 0.76rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: 0.06em;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .nz-pair-pill.active {
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(0, 168, 150, 0.2) 100%);
          border-color: #00E5FF;
          color: #00E5FF;
          box-shadow: 0 0 16px rgba(0, 229, 255, 0.2);
        }

        /* Luxury Typography Stats (1200+ Reviews, 10,000+ Happy Clients) */
        .nz-stats-row {
          display: flex;
          align-items: flex-end;
          gap: 3.5rem;
          margin-left: auto;
        }

        .nz-stat-item {
          display: flex;
          flex-direction: column;
        }

        .nz-stat-num {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 3.8vw, 3.4rem);
          font-weight: 500;
          line-height: 1;
          color: #FFFFFF;
          letter-spacing: -0.03em;
          display: flex;
          align-items: flex-start;
        }

        .nz-stat-plus {
          font-size: 0.65em;
          color: #00E5FF;
          margin-left: 2px;
          font-weight: 400;
        }

        .nz-stat-label {
          font-size: 0.84rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.45rem;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        /* Google Verified Review Sub-Bar below the framed showpiece */
        .nz-google-bar {
          max-width: 1200px;
          margin: 2.2rem auto 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.5rem;
          flex-wrap: wrap;
          gap: 1.2rem;
          position: relative;
          z-index: 3;
        }

        .nz-google-verified-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(14, 21, 35, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          padding: 0.55rem 1.25rem;
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .nz-google-verified-pill strong {
          color: #00E5FF;
          font-weight: 700;
        }

        .nz-google-review-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          border: 1px solid rgba(0, 229, 255, 0.3);
          border-radius: 999px;
          padding: 0.6rem 1.4rem;
          font-size: 0.84rem;
          font-weight: 700;
          color: #FFFFFF !important;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(0, 229, 255, 0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .nz-google-review-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 229, 255, 0.4);
          border-color: #00E5FF;
        }

        /* Responsive Breakpoints for Tablet & Mobile */
        @media (max-width: 1024px) {
          .nz-testi-frame {
            padding: 3.5rem 2.5rem 3rem 2.5rem;
          }
          .nz-cards-layout {
            gap: 1.8rem;
          }
          .nz-stats-row {
            gap: 2.2rem;
          }
        }

        @media (max-width: 820px) {
          .nz-testi-wrapper {
            padding: 4.5rem 1rem;
          }
          .nz-testi-frame {
            padding: 2.8rem 1.6rem 2.4rem 1.6rem;
            border-radius: 28px;
            min-height: auto;
          }
          .nz-watermark-center {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            width: 100%;
            margin: 1.5rem 0 2rem 0;
          }
          .nz-watermark-text {
            font-size: clamp(3rem, 13vw, 4.8rem);
            line-height: 1.05;
          }
          .nz-cards-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: 0;
            margin-bottom: 2.5rem;
          }
          .nz-card-col-right,
          .nz-card-col-left {
            grid-column: 1;
            transform: none;
            justify-content: center;
          }
          .nz-testi-card {
            max-width: 100%;
            padding: 1.6rem 1.6rem 1.4rem 1.6rem;
          }
          .nz-bottom-bar {
            flex-direction: column-reverse;
            align-items: center;
            gap: 2rem;
          }
          .nz-stats-row {
            width: 100%;
            justify-content: space-around;
            margin-left: 0;
          }
          .nz-nav-controls {
            width: 100%;
            justify-content: center;
          }
          .nz-google-bar {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .nz-testi-frame {
            padding: 2.2rem 1.2rem 2rem 1.2rem;
            border-radius: 22px;
          }
          .nz-card-quote {
            font-size: 0.88rem;
            line-height: 1.6;
          }
          .nz-stats-row {
            gap: 1.5rem;
          }
          .nz-stat-num {
            font-size: 2.2rem;
          }
          .nz-stat-label {
            font-size: 0.76rem;
          }
        }
      `}</style>

      {/* Atmospheric Nuzarox Brand Glows */}
      <div className="nz-ambient-glow nz-glow-cyan" />
      <div className="nz-ambient-glow nz-glow-teal" />
      <div className="nz-ambient-glow nz-glow-navy" />

      {/* Main Luxury Framed Showcase Box */}
      <div ref={showcaseRef} className="nz-testi-frame">
        <div className="nz-frame-grid" />

        {/* Top Bar: 5 Golden Glowing Stars + Rating Tag */}
        <div className="nz-top-bar">
          <div className="nz-stars-badge">
            <div className="nz-stars-row">
              <span className="nz-star-icon">★</span>
              <span className="nz-star-icon">★</span>
              <span className="nz-star-icon">★</span>
              <span className="nz-star-icon">★</span>
              <span className="nz-star-icon">★</span>
            </div>
            <span className="nz-stars-subtext">5.0 CLIENT VERIFIED</span>
          </div>
        </div>

        {/* Center Editorial Watermark Typography */}
        <div className="nz-watermark-center">
          <div className="nz-watermark-text">
            <span>What</span>
            <span>they say?</span>
          </div>
        </div>

        {/* Floating Testimonial Cards Layout (Staggered Stacking) */}
        <div className="nz-cards-layout">
          {/* Card (02) - Lower Left Offset */}
          <div className="nz-card-col-left">
            <div ref={card2Ref} className="nz-testi-card">
              <div className="nz-card-top">
                <span className="nz-card-num">{activePair.second.num}</span>
                <span className="nz-card-tag">{activePair.second.category}</span>
              </div>
              <p className="nz-card-quote">"{activePair.second.quote}"</p>
              <div className="nz-card-author-row">
                <div className="nz-card-author-text">
                  <span className="nz-card-author-name">{activePair.second.author}</span>
                  <span className="nz-card-author-company">{activePair.second.company}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card (01) - Upper Right Offset */}
          <div className="nz-card-col-right">
            <div ref={card1Ref} className="nz-testi-card">
              <div className="nz-card-top">
                <span className="nz-card-num">{activePair.first.num}</span>
                <span className="nz-card-tag">{activePair.first.category}</span>
              </div>
              <p className="nz-card-quote">"{activePair.first.quote}"</p>
              <div className="nz-card-author-row">
                <div className="nz-card-author-text">
                  <span className="nz-card-author-name">{activePair.first.author}</span>
                  <span className="nz-card-author-company">{activePair.first.company}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Interactive Pair Switcher + Luxury Typography Stats */}
        <div className="nz-bottom-bar">
          {/* Switcher & Arrows */}
          <div className="nz-nav-controls">
            <button 
              className="nz-arrow-btn" 
              onClick={handlePrev}
              aria-label="Previous client reviews"
            >
              ‹
            </button>
            <div className="nz-pairs-indicator">
              {testimonialPairs.map((pair, idx) => (
                <button
                  key={pair.pairId}
                  className={`nz-pair-pill ${idx === activePairIndex ? 'active' : ''}`}
                  onClick={() => handleSelectPair(idx)}
                >
                  {pair.pairId}
                </button>
              ))}
            </div>
            <button 
              className="nz-arrow-btn" 
              onClick={handleNext}
              aria-label="Next client reviews"
            >
              ›
            </button>
          </div>

          {/* Luxury Typography Stats (matching image: 1200+ Reviews, 10,000+ Happy Clients) */}
          <div className="nz-stats-row">
            <div className="nz-stat-item">
              <div className="nz-stat-num">
                1200<span className="nz-stat-plus">+</span>
              </div>
              <span className="nz-stat-label">Verified Reviews</span>
            </div>
            <div className="nz-stat-item">
              <div className="nz-stat-num">
                10,000<span className="nz-stat-plus">+</span>
              </div>
              <span className="nz-stat-label">Happy Users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Google Reviews Action Bar */}
      <div className="nz-google-bar">
        <div className="nz-google-verified-pill">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Rated <strong>4.9 / 5.0</strong> by Global Enterprise Clients</span>
        </div>

        <a 
          href="https://search.google.com/local/writereview?placeid=ChIJ-3eN1XpUUrkR4aWfR6Y9nZ0" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nz-google-review-link"
        >
          <span>★ Write a Review on Google</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Testimonials;
