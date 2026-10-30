import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    num: '01',
    shortTitle: 'Healthcare',
    title: 'HEALTHCARE & MEDTECH',
    desc: 'Empowering hospitals, clinical networks, and digital health startups with secure, HIPAA-compliant patient management portals, real-time doctor consultation apps, and AI-assisted health diagnostics. We engineer zero-latency medical platforms that streamline workflows and improve patient care outcomes.',
    image: '/industry_healthcare.png',
    tags: ['Patient Portals', 'Telemedicine Apps', 'HIPAA Security', 'Hospital Management']
  },
  {
    num: '02',
    shortTitle: 'Sports & Entertainment',
    title: 'SPORTS & ENTERTAINMENT',
    desc: 'Transforming fan experiences worldwide with ultra-responsive ticketing engines, interactive 3D club gear configurators, live match streaming portals, and tournament management ecosystems. Engineered for peak traffic spikes with sub-second response times.',
    image: '/industry_sports.png',
    tags: ['3D WebGL Configurator', 'Live Match Streaming', 'Fan Portals', 'Ticketing Engines']
  },
  {
    num: '03',
    shortTitle: 'IT Services',
    title: 'IT SERVICES & CONSULTING',
    desc: 'Partnering with enterprises and consultancies to accelerate digital modernization. From robust cloud migrations and microservice architectures to bespoke API platforms and 24/7 DevOps pipelines, we build scalable software systems that drive continuous enterprise growth.',
    image: '/industry_it_services.png',
    tags: ['Cloud Solutions', 'Enterprise Architecture', 'Custom API Systems', 'DevOps & Maintenance']
  },
  {
    num: '04',
    shortTitle: 'Banking & Finance',
    title: 'BANKING & FINANCES',
    desc: 'Architecting next-generation FinTech platforms with institutional-grade encryption, real-time transaction tracking, microfinance loan origination dashboards, and frictionless multi-currency payment gateways engineered for maximum compliance and trust.',
    image: '/industry_banking.png',
    tags: ['Secure Payment Gateways', 'FinTech Dashboards', 'Multi-Currency Systems', 'Micro-Lending Platforms']
  },
  {
    num: '05',
    shortTitle: 'E-Learning',
    title: 'EDUCATION & E-LEARNING',
    desc: 'Reimagining the future of digital education with intuitive Learning Management Systems (LMS), interactive virtual classrooms, live video lectures, gamified student progress tracking, and scalable institution administration portals.',
    image: '/industry_elearning.png',
    tags: ['Custom LMS Architecture', 'Virtual Classrooms', 'Student Analytics', 'Interactive Courseware']
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
          <linearGradient id="topTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A896" />
            <stop offset="50%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#99F6E4" />
          </linearGradient>
        </defs>
        <g className="spin-ccw-slow" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="268" stroke="url(#topTealGrad)" strokeWidth="3" strokeDasharray="4 7" fill="none" opacity="0.85" />
          <circle cx="280" cy="280" r="245" stroke="rgba(0, 168, 150, 0.4)" strokeWidth="1.5" strokeDasharray="12 12" fill="none" />
        </g>
        <g className="spin-cw-med" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="215" stroke="url(#topTealGrad)" strokeWidth="30" strokeDasharray="36 16" fill="none" opacity="0.3" />
          <circle cx="280" cy="280" r="192" stroke="#00A896" strokeWidth="2.5" strokeDasharray="7 7" fill="none" opacity="0.85" />
        </g>
        <g className="spin-ccw-fast" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="168" stroke="url(#topTealGrad)" strokeWidth="5" fill="none" style={{ filter: 'drop-shadow(0 0 14px #00A896)' }} />
          <circle cx="280" cy="280" r="153" stroke="rgba(45, 212, 191, 0.6)" strokeWidth="1.8" strokeDasharray="18 9 5 9" fill="none" />
        </g>
        <circle cx="280" cy="280" r="128" fill="#F0FDF4" stroke="rgba(255,255,255,0.95)" strokeWidth="3.5" />
        <circle cx="280" cy="280" r="100" fill="rgba(248, 250, 252, 0.98)" />
      </svg>
    </div>

    <style>{`
      @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      .spin-cw-slow { animation: spinCW 55s linear infinite; }
      .spin-ccw-slow { animation: spinCCW 55s linear infinite; }
      .spin-cw-med { animation: spinCW 32s linear infinite; }
      .spin-ccw-med { animation: spinCCW 32s linear infinite; }
      .spin-cw-fast { animation: spinCW 18s linear infinite; }
      .spin-ccw-fast { animation: spinCCW 18s linear infinite; }
    `}</style>
  </div>
);

const Process = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const mobilePinnedRef = useRef(null);

  // High-Impact Kinetic Header Entrance Animation with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerWords = headerRef.current?.querySelectorAll('.proc-hdr-char');
      const headerLines = headerRef.current?.querySelectorAll('.proc-hdr-line');
      const headerLabel = headerRef.current?.querySelector('.proc-hdr-label');
      const headerSubtext = headerRef.current?.querySelector('.proc-hdr-subtext');
      const headerBtn = headerRef.current?.querySelector('.proc-hdr-cta');

      if (headerLines && headerLabel) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });

        tl.fromTo(headerLines,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power3.inOut" }
        )
        .fromTo(headerLabel,
          { opacity: 0, y: -20, letterSpacing: '0.05em', filter: 'blur(8px)' },
          { opacity: 1, y: 0, letterSpacing: '0.22em', filter: 'blur(0px)', duration: 0.5, ease: "back.out(1.8)" },
          "-=0.3"
        )
        .fromTo(headerWords,
          { opacity: 0, y: 40, rotateX: -40, scale: 0.7, filter: 'blur(10px)' },
          { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.025, ease: "back.out(2.0)" },
          "-=0.25"
        );

        if (headerSubtext) {
          tl.fromTo(headerSubtext,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          );
        }

        if (headerBtn) {
          tl.fromTo(headerBtn,
            { opacity: 0, scale: 0.85, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2.2)" },
            "-=0.2"
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mobile Pinned Animation
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
      mm.add("(max-width: 900px)", () => {
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

  const titleWords = [
    { text: "Technology", isAccent: false },
    { text: "That", isAccent: false },
    { text: "Transforms", isAccent: true },
    { text: "Every", isAccent: false },
    { text: "Industry.", isAccent: false }
  ];

  return (
    <section ref={containerRef} id="process" className="process-section">
      <VectorWavesBackground />

      {/* ── HEADER (Tight Padding, High-Impact 3D Kinetic Entrance) ── */}
      <div ref={headerRef} className="proc-header-container">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', overflow: 'hidden' }}>
          <span className="proc-hdr-line" style={{ width: '35px', height: '2px', background: 'linear-gradient(90deg, #0A2E5C, #00A896)', transformOrigin: 'left' }} />
          <span className="proc-hdr-label" style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.22em', color: '#00A896', textTransform: 'uppercase' }}>
            INDUSTRIES WE SERVE
          </span>
          <span className="proc-hdr-line" style={{ width: '35px', height: '2px', background: 'linear-gradient(270deg, #0A2E5C, #00A896)', transformOrigin: 'right' }} />
        </div>
        
        <h2 style={{ 
          fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', fontWeight: 900, fontFamily: 'var(--font-display)', 
          color: '#11131A', letterSpacing: '-0.035em', margin: '0 auto 0.6rem auto', lineHeight: 1.1,
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.3em', perspective: '1000px',
          maxWidth: '1100px'
        }}>
          {titleWords.map((wordObj, wIdx) => (
            <div key={wIdx} className="proc-word-wrap" style={{ display: 'inline-flex', transformStyle: 'preserve-3d' }}>
              {wordObj.text.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  className={`proc-hdr-char ${wordObj.isAccent ? 'proc-accent-char' : ''}`}
                  style={{
                    display: 'inline-block',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </h2>

        {/* Subtitle Paragraph */}
        <p className="proc-hdr-subtext" style={{
          fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
          lineHeight: 1.6,
          color: '#475569',
          maxWidth: '750px',
          margin: '0 auto 0.8rem auto',
          fontWeight: 450
        }}>
          We partner with businesses across diverse industries to create innovative digital experiences, scalable solutions and meaningful business outcomes.
        </p>

        {/* Contact CTA Button linking directly to #contact page */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="/#contact"
            className="proc-hdr-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 22px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.88rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.03em',
              boxShadow: '0 8px 24px rgba(0, 168, 150, 0.35)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 168, 150, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 168, 150, 0.35)';
            }}
          >
            <span>Discuss Your Industry Project</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>

      {/* SPINNING ORBITS & ACCORDION (TIGHT GAP) */}
      <div style={{ position: 'relative' }}>
        <SpinningTechOrbitsBackground />

        {/* ── BUZZWORTHY ACCORDION (DESKTOP VIEW) ── */}
        <div className="proc-accordion">
          {industries.map((ind, i) => (
            <div
              key={i}
              className={`proc-strip ${activeIndex === i ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {/* Top: Dot + Number */}
              <div className="strip-top">
                <span className="strip-dot" />
                <span className="strip-num">{ind.num}</span>
              </div>

              {/* Expanded Content (only visible when active) */}
              <div className="strip-expanded-content">
                <div className="strip-text-side">
                  <h3 className="strip-title">{ind.title}</h3>
                  <p className="strip-desc">{ind.desc}</p>
                  
                  {/* Industry Capabilities Tags */}
                  <div className="strip-tags-box">
                    {ind.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="strip-tag-badge">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>

                  {/* Individual Industry Contact Button */}
                  <div style={{ marginTop: '1rem' }}>
                    <a
                      href="/#contact"
                      className="strip-cta-btn"
                    >
                      <span>Get a Solution</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>

                <div className="strip-image-side">
                  <img src={ind.image} alt={ind.title} className="strip-img" />
                </div>
              </div>

              {/* Rotated Title (only visible when NOT active) */}
              <div className="strip-rotated">
                <span className="strip-rotated-text">
                  {ind.shortTitle}
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
                INDUSTRIES WE SERVE
              </span>
              <span className="proc-hdr-line" style={{ width: '30px', height: '2px', background: 'linear-gradient(270deg, #0A2E5C, #00A896)' }} />
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#11131A', margin: 0, lineHeight: 1.15 }}>
              Technology That <span style={{ color: '#00A896' }}>Transforms Every Industry</span>
            </h2>
            <div style={{ marginTop: '0.8rem' }}>
              <a
                href="/#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textDecoration: 'none'
                }}
              >
                <span>Discuss Your Project →</span>
              </a>
            </div>
          </div>

          <div className="proc-mobile-slides-wrapper">
            {industries.map((ind, idx) => (
              <div key={idx} className="proc-mobile-card" style={{ zIndex: idx + 1 }}>
                <div className="proc-mobile-card-header">
                  <div className="proc-mobile-num-badge">
                    <span className="proc-mobile-dot" />
                    <span className="proc-mobile-num">{ind.num}</span>
                  </div>
                  <h3 className="proc-mobile-title">{ind.title}</h3>
                </div>
                <div className="proc-mobile-img-box">
                  <img src={ind.image} alt={ind.title} className="proc-mobile-img" />
                </div>
                <p className="proc-mobile-desc">{ind.desc}</p>
                <div style={{ marginTop: '1rem' }}>
                  <a
                    href="/#contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '999px',
                      background: '#0B0C10',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <span>Contact Us for {ind.shortTitle} →</span>
                  </a>
                </div>
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
          padding: 1rem 5% 1.5rem; /* Tight, proportional section padding */
          overflow: hidden;
        }

        .proc-header-container {
          position: relative;
          z-index: 10;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2rem 1rem; /* Clean tight gap above accordion */
          text-align: center;
        }

        .proc-hdr-char {
          display: inline-block;
        }

        .proc-accent-char {
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ═══════════════════════════════════════
           BUZZWORTHY ACCORDION (DESKTOP)
           ═══════════════════════════════════════ */
        .proc-accordion {
          display: flex;
          max-width: 1360px;
          margin: 0 auto;
          min-height: 480px;
          border-radius: 28px;
          overflow: hidden;
          background: #FFFFFF;
          box-shadow: 0 25px 70px rgba(10, 46, 92, 0.08);
          border: 1px solid rgba(10, 46, 92, 0.08);
        }

        .proc-strip {
          flex: 1;
          position: relative;
          background: #FFFFFF;
          border-right: 1px solid #E8EBF0;
          transition: flex 0.55s cubic-bezier(0.25, 1, 0.5, 1);
          overflow: hidden;
          cursor: pointer;
          padding: 1.6rem 1.2rem;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .proc-strip:last-child {
          border-right: none;
        }

        .proc-strip.active {
          flex: 7;
          cursor: default;
          padding: 2rem 2.5rem;
          background: #FFFFFF;
        }

        /* Top: Dot + Number */
        .strip-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }

        .strip-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #00A896;
          box-shadow: 0 0 10px rgba(0, 168, 150, 0.6);
          flex-shrink: 0;
        }

        .strip-num {
          font-size: 0.88rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: #0A2E5C;
          letter-spacing: 0.05em;
        }

        /* Expanded Content */
        .strip-expanded-content {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s;
          pointer-events: none;
          flex: 1;
          display: flex;
          gap: 2rem;
          align-items: center;
          width: 100%;
        }

        .proc-strip.active .strip-expanded-content {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .strip-text-side {
          flex: 1.25;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .strip-image-side {
          flex: 1;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          min-height: 300px;
          max-height: 100%;
          align-self: stretch;
          box-shadow: 0 12px 32px rgba(10, 46, 92, 0.10);
          border: 1px solid rgba(10, 46, 92, 0.08);
          background: #F8FAFC;
        }

        .strip-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .strip-title {
          font-size: clamp(1.4rem, 2vw, 1.9rem);
          font-weight: 900;
          font-family: var(--font-display);
          color: #0B0C10;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0 0 0.6rem 0;
        }

        .strip-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #475569;
          margin: 0;
          font-weight: 450;
        }

        .strip-tags-box {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 0.8rem;
        }

        .strip-tag-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 999px;
          background: rgba(10, 46, 92, 0.05);
          border: 1px solid rgba(0, 168, 150, 0.2);
          color: #0A2E5C;
        }

        .strip-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 999px;
          background: #0B0C10;
          color: #FFFFFF !important;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          transition: background 0.25s ease, transform 0.25s ease;
        }

        .strip-cta-btn:hover {
          background: #00A896;
          transform: translateY(-2px);
        }

        /* Perfectly Centered Rotated Vertical Title */
        .strip-rotated {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          transition: opacity 0.25s ease;
          padding-top: 2rem;
        }

        .proc-strip.active .strip-rotated {
          opacity: 0;
        }

        .strip-rotated-text {
          display: block;
          transform: rotate(-90deg);
          white-space: nowrap;
          font-size: 0.82rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: #64748B;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* ═══════════════════════════════════════
           MOBILE PINNED OVERLAPPING STACK
           ═══════════════════════════════════════ */
        .proc-mobile-pinned-section {
          display: none;
        }

        @media (max-width: 900px) {
          .process-section {
            padding: 1rem 1rem 1.5rem !important;
          }

          .proc-header-container {
            display: none !important;
          }

          .proc-accordion {
            display: none !important;
          }

          .proc-mobile-pinned-section {
            display: block !important;
            position: relative;
            width: 100%;
            padding-top: 10px;
          }

          .proc-mobile-header-box {
            text-align: center;
            margin-bottom: 2rem;
            padding: 0 0.5rem;
          }

          .proc-mobile-slides-wrapper {
            position: relative;
            width: 100%;
            height: 520px;
          }

          .proc-mobile-card {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #FFFFFF;
            border-radius: 24px;
            padding: 1.6rem 1.4rem;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.06);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            box-sizing: border-box;
            will-change: transform, opacity;
          }

          .proc-mobile-card-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 1rem;
          }

          .proc-mobile-num-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(0, 168, 150, 0.1);
            padding: 4px 10px;
            border-radius: 20px;
            border: 1px solid rgba(0, 168, 150, 0.3);
          }

          .proc-mobile-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #00A896;
          }

          .proc-mobile-num {
            font-size: 0.75rem;
            font-weight: 800;
            font-family: var(--font-display);
            color: #0A2E5C;
          }

          .proc-mobile-title {
            font-size: 1.15rem;
            font-weight: 900;
            font-family: var(--font-display);
            color: #11131A;
            margin: 0;
            line-height: 1.15;
          }

          .proc-mobile-img-box {
            width: 100%;
            height: 190px;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 1rem;
            box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          }

          .proc-mobile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .proc-mobile-desc {
            font-size: 0.85rem;
            line-height: 1.55;
            color: #475569;
            margin: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Process;
