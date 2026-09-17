import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'PROJECT\nSTRATEGY',
    desc: 'Every project is a canvas where we blend creative vision with strategic foresight. From the initial spark of an idea to the final flourish of execution, our seasoned strategists work hand-in-hand with your team to define goals, streamline processes, and chart a course to success.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '02',
    title: 'DESIGN\n& MOTION',
    desc: 'We craft immersive visual experiences that captivate and convert. Our design philosophy merges aesthetic beauty with functional precision — every pixel, every animation, every interaction is intentional.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '03',
    title: 'SMOOTH\nDEVELOPMENT',
    desc: 'Clean architecture, scalable infrastructure, and zero-latency performance. We write the algorithms of tomorrow with modern frameworks and bulletproof engineering practices.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '04',
    title: 'POWERFUL\nMARKETING',
    desc: 'Aggressive go-to-market strategies that hijack attention and dominate the market. Data-driven campaigns, SEO mastery, and conversion-focused funnels that deliver measurable results.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '05',
    title: 'ONGOING\nSUPPORT',
    desc: 'Round-the-clock monitoring, optimization, and support. We don\'t just launch and leave — we partner with you for the long haul to ensure continued growth and peak performance.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80'
  },
];

const VectorWavesBackground = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '350px', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <svg viewBox="0 0 1440 300" preserveAspectRatio="none" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
      <defs>
        <linearGradient id="waveGradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0A2E5C" />
          <stop offset="45%" stopColor="#006E8C" />
          <stop offset="100%" stopColor="#00A896" />
        </linearGradient>
        <linearGradient id="waveGradGrey" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>
      </defs>
      <path className="swoosh-anim-1" fill="url(#waveGradGrey)" d="M0,0 L1440,0 L1440,110 C1000,280 500,30 0,160 Z" opacity="0.8" />
      <path className="swoosh-anim-2" fill="#CBD5E1" d="M0,0 L1440,0 L1440,60 C900,180 400,0 0,110 Z" opacity="0.4" />
      <path className="swoosh-anim-3" fill="url(#waveGradBlue)" d="M0,0 L1440,0 L1440,25 C800,150 300,-30 0,90 Z" opacity="0.95" />
    </svg>
    <style>{`
      .swoosh-anim-1 { animation: waveBreathe 14s ease-in-out infinite alternate; transform-origin: top left; }
      .swoosh-anim-2 { animation: waveBreathe 18s ease-in-out infinite alternate-reverse; transform-origin: top right; }
      .swoosh-anim-3 { animation: waveBreathe 12s ease-in-out infinite alternate; transform-origin: center top; }
      @keyframes waveBreathe {
        0% { transform: scaleY(1) translateY(0); }
        100% { transform: scaleY(1.15) translateY(15px); }
      }
    `}</style>
  </div>
);

const SpinningTechOrbitsBackground = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <div className="proc-orbit-system" style={{ position: 'absolute', top: '50%', left: '-180px', width: '560px', height: '560px', transform: 'translateY(-50%)' }}>
      <svg viewBox="0 0 560 560" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="topLogoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>
        </defs>
        <g className="spin-cw-slow" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="268" stroke="url(#topLogoBlueGrad)" strokeWidth="3" strokeDasharray="4 7" fill="none" opacity="0.85" />
          <circle cx="280" cy="280" r="245" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1.5" strokeDasharray="12 12" fill="none" />
        </g>
        <g className="spin-ccw-med" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="215" stroke="url(#topLogoBlueGrad)" strokeWidth="30" strokeDasharray="36 16" fill="none" opacity="0.3" />
          <circle cx="280" cy="280" r="192" stroke="#00E5FF" strokeWidth="2.5" strokeDasharray="7 7" fill="none" opacity="0.85" />
        </g>
        <g className="spin-cw-fast" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="168" stroke="url(#topLogoBlueGrad)" strokeWidth="5" fill="none" style={{ filter: 'drop-shadow(0 0 14px #00E5FF)' }} />
          <circle cx="280" cy="280" r="153" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.8" strokeDasharray="18 9 5 9" fill="none" />
        </g>
        <circle cx="280" cy="280" r="128" fill="#F0F9FF" stroke="rgba(255,255,255,0.95)" strokeWidth="3.5" />
        <circle cx="280" cy="280" r="100" fill="rgba(248, 250, 252, 0.98)" />
      </svg>
    </div>

    <div className="proc-orbit-system" style={{ position: 'absolute', top: '50%', right: '-180px', width: '560px', height: '560px', transform: 'translateY(-50%)' }}>
      <svg viewBox="0 0 560 560" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="bottomLogoGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFAD" />
            <stop offset="50%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>
        </defs>
        <g className="spin-ccw-slow" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="268" stroke="url(#bottomLogoGreenGrad)" strokeWidth="3" strokeDasharray="4 7" fill="none" opacity="0.85" />
          <circle cx="280" cy="280" r="245" stroke="rgba(0, 255, 173, 0.4)" strokeWidth="1.5" strokeDasharray="12 12" fill="none" />
        </g>
        <g className="spin-cw-med" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="215" stroke="url(#bottomLogoGreenGrad)" strokeWidth="30" strokeDasharray="36 16" fill="none" opacity="0.3" />
          <circle cx="280" cy="280" r="192" stroke="#00FFAD" strokeWidth="2.5" strokeDasharray="7 7" fill="none" opacity="0.85" />
        </g>
        <g className="spin-ccw-fast" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="168" stroke="url(#bottomLogoGreenGrad)" strokeWidth="5" fill="none" style={{ filter: 'drop-shadow(0 0 14px #00FFAD)' }} />
          <circle cx="280" cy="280" r="153" stroke="rgba(45, 212, 191, 0.6)" strokeWidth="1.8" strokeDasharray="18 9 5 9" fill="none" />
        </g>
        <circle cx="280" cy="280" r="128" fill="#F0FDF4" stroke="rgba(255,255,255,0.95)" strokeWidth="3.5" />
        <circle cx="280" cy="280" r="100" fill="rgba(248, 250, 252, 0.98)" />
      </svg>
    </div>

    <style>{`
      @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      .spin-cw-slow { animation: spinCW 38s linear infinite; }
      .spin-cw-med { animation: spinCW 24s linear infinite; }
      .spin-cw-fast { animation: spinCW 15s linear infinite; }
      .spin-ccw-slow { animation: spinCCW 32s linear infinite; }
      .spin-ccw-med { animation: spinCCW 20s linear infinite; }
      .spin-ccw-fast { animation: spinCCW 13s linear infinite; }
      @media (max-width: 768px) {
        .proc-orbit-system { display: none !important; }
      }
    `}</style>
  </div>
);

const Process = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mobilePinnedRef = useRef(null);

  useEffect(() => {
    if (!mobilePinnedRef.current) return;

    const ctx = gsap.context(() => {
      const container = mobilePinnedRef.current;
      if (!container) return;
      const slides = Array.from(container.querySelectorAll('.proc-mobile-card'));
      if (slides.length === 0) return;

      slides.forEach((slide, i) => {
        if (i === 0) {
          gsap.set(slide, { yPercent: 0, opacity: 1 });
        } else {
          gsap.set(slide, { yPercent: 100, opacity: 1 });
        }
      });

      const mm = gsap.matchMedia();
      mm.add("(max-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top+=75px",
            end: () => `+=${slides.length * 45}%`,
            pin: true,
            scrub: 0.3,
            refreshPriority: 2,
            invalidateOnRefresh: true
          }
        });

        slides.forEach((slide, i) => {
          if (i === 0) return;

          tl.to(slide, {
            yPercent: 0,
            ease: "none",
            duration: 1
          });

          tl.to({}, { duration: 0.35 });
        });
      });
    }, mobilePinnedRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="process-section">

      {/* TOP ANIMATED VECTOR WAVES */}
      <VectorWavesBackground />

      {/* ── HEADER ── */}
      <div ref={headerRef} className="proc-header-container">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', overflow: 'hidden' }}>
          <span className="proc-hdr-line" style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #0A2E5C, #00A896)', transformOrigin: 'left' }} />
          <span className="proc-hdr-label" style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.2em', color: '#00A896', textTransform: 'uppercase' }}>
            Our Process
          </span>
          <span className="proc-hdr-line" style={{ width: '40px', height: '2px', background: 'linear-gradient(270deg, #0A2E5C, #00A896)', transformOrigin: 'right' }} />
        </div>
        
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 900, fontFamily: 'var(--font-display)', 
          color: '#11131A', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1,
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.3em', perspective: '1000px'
        }}>
          <span className="proc-hdr-word" style={{ display: 'inline-block' }}>How</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block' }}>We</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block' }}>Build</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block', color: 'transparent', WebkitTextStroke: '2px rgba(17, 19, 26, 0.55)' }}>Digital</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block', color: 'transparent', WebkitTextStroke: '2px rgba(17, 19, 26, 0.55)' }}>Dominance</span>
        </h2>
      </div>

      {/* SPINNING ORBITS */}
      <div style={{ position: 'relative' }}>
        <SpinningTechOrbitsBackground />

        {/* ── BUZZWORTHY ACCORDION (DESKTOP VIEW) ── */}
        <div className="proc-accordion">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`proc-strip ${activeIndex === i ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {/* Top: Dot + Number */}
              <div className="strip-top">
                <span className="strip-dot" />
                <span className="strip-num">{step.num}</span>
              </div>

              {/* Expanded Content (only visible when active) */}
              <div className="strip-expanded-content">
                <div className="strip-text-side">
                  <h3 className="strip-title">
                    {step.title.split('\n').map((line, li) => (
                      <span key={li}>{line}<br/></span>
                    ))}
                  </h3>
                  <p className="strip-desc">{step.desc}</p>
                </div>
                <div className="strip-image-side">
                  <img src={step.image} alt={step.title.replace('\n', ' ')} className="strip-img" />
                </div>
              </div>

              {/* Rotated Title (only visible when NOT active) */}
              <div className="strip-rotated">
                <span className="strip-rotated-text">
                  {step.title.replace('\n', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── MOBILE PINNED OVERLAPPING CARDS (MOBILE VIEW ONLY) ── */}
        <div ref={mobilePinnedRef} className="proc-mobile-pinned-section">
          <div className="proc-mobile-header-box">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
              <span className="proc-hdr-line" style={{ width: '30px', height: '2px', background: 'linear-gradient(90deg, #0A2E5C, #00A896)' }} />
              <span className="proc-hdr-label" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', color: '#00A896', textTransform: 'uppercase' }}>
                Our Process
              </span>
              <span className="proc-hdr-line" style={{ width: '30px', height: '2px', background: 'linear-gradient(270deg, #0A2E5C, #00A896)' }} />
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#11131A', margin: 0, lineHeight: 1.15 }}>
              How We Build <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(17, 19, 26, 0.55)' }}>Digital Dominance</span>
            </h2>
          </div>

          <div className="proc-mobile-slides-wrapper">
            {steps.map((step, idx) => (
              <div key={idx} className="proc-mobile-card" style={{ zIndex: idx + 1 }}>
                <div className="proc-mobile-card-header">
                  <div className="proc-mobile-num-badge">
                    <span className="proc-mobile-dot" />
                    <span className="proc-mobile-num">{step.num}</span>
                  </div>
                  <h3 className="proc-mobile-title">{step.title.replace('\n', ' ')}</h3>
                </div>
                <div className="proc-mobile-img-box">
                  <img src={step.image} alt={step.title.replace('\n', ' ')} className="proc-mobile-img" />
                </div>
                <p className="proc-mobile-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .process-section {
          background: transparent;
          position: relative;
          font-family: var(--font-body);
          padding: 8rem 5% 6rem;
          overflow: hidden;
        }

        .proc-header-container {
          position: relative;
          z-index: 10;
          max-width: 1300px;
          margin: 0 auto;
          padding: 8rem 5% 4rem;
          text-align: center;
        }

        .process-title {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 900;
          font-family: var(--font-display);
          color: #11131A;
          letter-spacing: -0.03em;
          margin: 0;
          line-height: 1.1;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.3em;
          perspective: 1000px;
        }

        .proc-hdr-word {
          display: inline-block;
        }

        .proc-outline {
          color: transparent;
          -webkit-text-stroke: 2px rgba(17, 19, 26, 0.55);
        }

        /* ═══════════════════════════════════════
           BUZZWORTHY ACCORDION (DESKTOP)
           ═══════════════════════════════════════ */
        .proc-accordion {
          display: flex;
          max-width: 1300px;
          margin: 0 auto;
          height: 520px;
          border-radius: 20px;
          overflow: hidden;
          background: #FFFFFF;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .proc-strip {
          flex: 1;
          position: relative;
          background: #FFFFFF;
          border-right: 1px solid #E8EBF0;
          transition: flex 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          cursor: pointer;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .proc-strip:last-child {
          border-right: none;
        }

        .proc-strip.active {
          flex: 6;
          cursor: default;
          padding: 2.5rem 3rem;
        }

        /* Top: Dot + Number */
        .strip-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
          flex-shrink: 0;
        }

        .strip-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #00E5FF;
          box-shadow: 0 0 8px rgba(0, 229, 255, 0.5);
          flex-shrink: 0;
        }

        .strip-num {
          font-size: 0.85rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: #11131A;
          letter-spacing: 0.05em;
        }

        /* Expanded Content */
        .strip-expanded-content {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s;
          pointer-events: none;
          flex: 1;
          display: flex;
          gap: 2.5rem;
          align-items: stretch;
        }

        .proc-strip.active .strip-expanded-content {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .strip-text-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .strip-image-side {
          flex: 1;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }

        .strip-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .strip-title {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 900;
          font-family: var(--font-display);
          color: #11131A;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 1.5rem 0;
          text-transform: uppercase;
        }

        .strip-desc {
          font-size: 0.92rem;
          line-height: 1.7;
          color: #555555;
          font-weight: 500;
          margin: 0;
        }

        /* Rotated Title (Collapsed Strips) */
        .strip-rotated {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-90deg);
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .proc-strip.active .strip-rotated {
          opacity: 0;
        }

        .strip-rotated-text {
          font-size: 0.85rem;
          font-weight: 900;
          font-family: var(--font-display);
          color: #11131A;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .proc-mobile-pinned-section {
          display: none;
        }

        /* ═══════════════════════════════════════
           MOBILE PINNED CARDS STACK (<769px)
           ═══════════════════════════════════════ */
        @media (max-width: 768px) {
          .process-section {
            padding: 1rem 4% 2.5rem !important;
            background: transparent !important;
            position: relative !important;
            z-index: 5 !important;
          }

          .proc-header-container {
            display: none !important;
          }

          .proc-accordion {
            display: none !important;
          }

          .proc-mobile-pinned-section {
            display: flex !important;
            flex-direction: column;
            position: relative;
            width: 100%;
            height: calc(100vh - 150px);
            margin: 0 auto 2.5rem;
            overflow: hidden;
            box-sizing: border-box;
            background: transparent !important;
          }

          .proc-mobile-header-box {
            flex-shrink: 0;
            text-align: center;
            padding-bottom: 0.8rem;
            background: transparent !important;
          }

          .proc-mobile-slides-wrapper {
            flex: 1;
            position: relative;
            width: 100%;
            height: 100%;
          }

          .proc-mobile-card {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background: #FFFFFF;
            border-radius: 20px;
            padding: 1rem 1.1rem;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.08);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            overflow: hidden;
          }

          .proc-mobile-card-header {
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .proc-mobile-num-badge {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .proc-mobile-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #00E5FF;
            box-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
          }

          .proc-mobile-num {
            font-size: 0.85rem;
            font-weight: 800;
            font-family: var(--font-display);
            color: #11131A;
          }

          .proc-mobile-title {
            font-size: 1.2rem;
            font-weight: 900;
            font-family: var(--font-display);
            color: #11131A;
            letter-spacing: -0.02em;
            margin: 0;
            text-transform: uppercase;
          }

          .proc-mobile-img-box {
            flex: 1;
            min-height: 110px;
            max-height: 180px;
            width: 100%;
            border-radius: 14px;
            overflow: hidden;
            margin: 8px 0;
            position: relative;
            background: #F1F5F9;
          }

          .proc-mobile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .proc-mobile-desc {
            flex-shrink: 0;
            font-size: 0.78rem;
            line-height: 1.4;
            color: #555555;
            font-weight: 500;
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </section>
  );
};

export default Process;
