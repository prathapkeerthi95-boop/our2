import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    num: '01',
    title: 'HEALTHCARE',
    desc: 'Empowering hospitals, clinical networks, and healthtech innovators with HIPAA-compliant patient portals, automated appointment engines, telemedicine ecosystems, and secure real-time diagnostic workflows.',
    tagline: 'Precision Care · HIPAA Compliant · Zero-Latency Telehealth',
    image: '/industry-healthcare.png'
  },
  {
    num: '02',
    title: 'SPORTS &\nENTERTAINMENT',
    desc: 'Engineering interactive 3D merchandise customizers, high-traffic streaming architectures, fan-engagement platforms, and digital ticketing hubs that turn supporters into lifelong brand advocates.',
    tagline: 'Headless 3D Customizers · High-Traffic Scalability · Fan Portals',
    image: '/industry-sports.png'
  },
  {
    num: '03',
    title: 'IT SERVICES &\nCONSULTING',
    desc: 'Building intelligent cloud infrastructure, enterprise SaaS applications, microservices architecture, and automated devops pipelines that accelerate operational velocity and slash engineering overhead.',
    tagline: 'Cloud Infrastructure · Enterprise SaaS · Microservices Velocity',
    image: '/industry-it-services.png'
  },
  {
    num: '04',
    title: 'BANKING &\nFINANCES',
    desc: 'Architecting ultra-secure fintech platforms, multi-currency payment gateways, automated AML/KYC compliance tools, and high-performance financial dashboards engineered with bank-grade encryption.',
    tagline: 'Bank-Grade Security · Fast Multi-Currency Pay · Fintech Portals',
    image: '/industry-banking.png'
  },
  {
    num: '05',
    title: 'EDUCATION &\nE-LEARNING',
    desc: 'Creating interactive LMS platforms, gamified curriculum portals, real-time virtual classroom dashboards, and responsive multi-device learning environments designed for peak student retention.',
    tagline: 'Interactive LMS · Gamified Learning · Real-Time Progress Engine',
    image: '/industry-education.png'
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
          <linearGradient id="topLogoGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A896" />
            <stop offset="50%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <g className="spin-ccw-slow" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="268" stroke="url(#topLogoGreenGrad)" strokeWidth="3" strokeDasharray="4 7" fill="none" opacity="0.85" />
          <circle cx="280" cy="280" r="245" stroke="rgba(0, 168, 150, 0.4)" strokeWidth="1.5" strokeDasharray="12 12" fill="none" />
        </g>
        <g className="spin-cw-med" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="215" stroke="url(#topLogoGreenGrad)" strokeWidth="30" strokeDasharray="36 16" fill="none" opacity="0.3" />
          <circle cx="280" cy="280" r="192" stroke="#00A896" strokeWidth="2.5" strokeDasharray="7 7" fill="none" opacity="0.85" />
        </g>
        <g className="spin-ccw-fast" style={{ transformOrigin: '280px 280px' }}>
          <circle cx="280" cy="280" r="168" stroke="url(#topLogoGreenGrad)" strokeWidth="5" fill="none" style={{ filter: 'drop-shadow(0 0 14px #00A896)' }} />
          <circle cx="280" cy="280" r="153" stroke="rgba(0, 229, 255, 0.6)" strokeWidth="1.8" strokeDasharray="18 9 5 9" fill="none" />
        </g>
        <circle cx="280" cy="280" r="128" fill="#F0FDF4" stroke="rgba(255,255,255,0.95)" strokeWidth="3.5" />
        <circle cx="280" cy="280" r="100" fill="rgba(248, 250, 252, 0.98)" />
      </svg>
    </div>
  </div>
);

const Process = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mobilePinnedRef = useRef(null);
  const accordionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop Header Entrance - replayable on scroll
      gsap.fromTo(
        headerRef.current.querySelectorAll('.proc-hdr-word'),
        { opacity: 0, y: 40, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'restart reverse restart reverse'
          }
        }
      );

      const mm = gsap.matchMedia();

      // ── DESKTOP (>= 769px): Dramatic, Paced Card Entrance from Right ──
      mm.add("(min-width: 769px)", () => {
        if (accordionRef.current) {
          const strips = accordionRef.current.querySelectorAll('.proc-strip');
          gsap.fromTo(
            strips,
            {
              opacity: 0,
              x: 280,
              rotateY: -18,
              scale: 0.92,
              filter: 'blur(8px)',
              transformOrigin: 'right center'
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.3,
              stagger: 0.16,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: accordionRef.current,
                start: 'top 78%',
                toggleActions: 'restart reverse restart reverse'
              }
            }
          );
        }
      });

      // ── MOBILE (<= 768px): Pinned Overlapping Stack Sliding from RIGHT to LEFT on Scroll ──
      mm.add("(max-width: 768px)", () => {
        const container = mobilePinnedRef.current;
        if (!container) return;
        const slides = Array.from(container.querySelectorAll('.proc-mobile-card'));
        if (slides.length === 0) return;

        slides.forEach((slide, i) => {
          if (i === 0) {
            gsap.set(slide, { xPercent: 0, opacity: 1, scale: 1, rotate: 0 });
          } else {
            // Each card starts parked out to the RIGHT
            gsap.set(slide, { xPercent: 115, opacity: 0.85, scale: 0.95, rotate: 2 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top+=75px",
            end: () => `+=${slides.length * 55}%`,
            pin: true,
            scrub: 0.35,
            refreshPriority: 2,
            invalidateOnRefresh: true
          }
        });

        slides.forEach((slide, i) => {
          if (i === 0) return;
          tl.to(slide, {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            ease: "power2.out",
            duration: 1
          });
          tl.to({}, { duration: 0.25 });
        });
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="process" ref={sectionRef} className="process-section">
      {/* TOP ANIMATED VECTOR WAVES */}
      <VectorWavesBackground />

      {/* ── HEADER ── */}
      <div ref={headerRef} className="proc-header-container">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem', overflow: 'hidden' }}>
          <span className="proc-hdr-line" style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #0A2E5C, #00A896)', transformOrigin: 'left' }} />
          <span className="proc-hdr-label" style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.22em', color: '#00A896', textTransform: 'uppercase' }}>
            INDUSTRIES WE SERVE
          </span>
          <span className="proc-hdr-line" style={{ width: '40px', height: '2px', background: 'linear-gradient(270deg, #0A2E5C, #00A896)', transformOrigin: 'right' }} />
        </div>
        
        <h2 style={{ 
          fontSize: 'clamp(2.4rem, 4.8vw, 4.8rem)', fontWeight: 900, fontFamily: 'var(--font-display)', 
          color: '#11131A', letterSpacing: '-0.03em', margin: '0 0 1rem 0', lineHeight: 1.12,
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.3em', perspective: '1000px'
        }}>
          <span className="proc-hdr-word" style={{ display: 'inline-block' }}>Technology</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block' }}>That</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block', color: '#00A896' }}>Transforms</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block' }}>Every</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block', color: 'transparent', WebkitTextStroke: '2px rgba(17, 19, 26, 0.55)' }}>Industry.</span>
        </h2>

        <p className="proc-header-subtitle">
          We partner with businesses across diverse industries to create innovative digital experiences, scalable solutions and meaningful business outcomes.
        </p>
      </div>

      {/* SPINNING ORBITS BACKGROUND */}
      <div style={{ position: 'relative' }}>
        <SpinningTechOrbitsBackground />

        {/* ── BUZZWORTHY ACCORDION (DESKTOP VIEW) ── */}
        <div ref={accordionRef} className="proc-accordion">
          {industries.map((ind, i) => (
            <div
              key={i}
              className={`proc-strip ${activeIndex === i ? 'active' : ''}`}
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
                  <div className="strip-tagline-chip">{ind.tagline}</div>

                  <h3 className="strip-title">
                    {ind.title.split('\n').map((line, li) => (
                      <span key={li}>{line}<br/></span>
                    ))}
                  </h3>

                  <p className="strip-desc">{ind.desc}</p>

                  <div className="strip-cta-wrap">
                    <a href="/#contact" className="strip-contact-btn">
                      <span>Consult With Our Specialists</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="strip-image-side">
                  <img src={ind.image} alt={ind.title.replace('\n', ' ')} className="strip-img" />
                  <div className="strip-img-gradient-shim" />
                </div>
              </div>

              {/* Rotated Title (only visible when NOT active) */}
              <div className="strip-rotated">
                <span className="strip-rotated-text">
                  {ind.title.replace('\n', ' ')}
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
              <span className="proc-hdr-label" style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.15em', color: '#00A896', textTransform: 'uppercase' }}>
                INDUSTRIES WE SERVE
              </span>
              <span className="proc-hdr-line" style={{ width: '30px', height: '2px', background: 'linear-gradient(270deg, #0A2E5C, #00A896)' }} />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#11131A', margin: '0 0 0.4rem 0', lineHeight: 1.15 }}>
              Technology That Transforms <span style={{ color: '#00A896' }}>Every Industry.</span>
            </h2>
            <p style={{ fontSize: '0.74rem', color: '#555', margin: '0 auto', maxWidth: '340px', lineHeight: 1.4 }}>
              We partner with businesses across diverse industries to create innovative digital experiences.
            </p>
          </div>

          <div className="proc-mobile-slides-wrapper">
            {industries.map((ind, idx) => (
              <div key={idx} className="proc-mobile-card" style={{ zIndex: idx + 1 }}>
                <div className="proc-mobile-card-header">
                  <div className="proc-mobile-num-badge">
                    <span className="proc-mobile-dot" />
                    <span className="proc-mobile-num">{ind.num}</span>
                  </div>
                  <h3 className="proc-mobile-title">{ind.title.replace('\n', ' ')}</h3>
                </div>

                <div className="proc-mobile-img-box">
                  <img src={ind.image} alt={ind.title.replace('\n', ' ')} className="proc-mobile-img" />
                </div>

                <p className="proc-mobile-desc">{ind.desc}</p>

                <div style={{ marginTop: '0.6rem' }}>
                  <a href="/#contact" className="proc-mobile-contact-btn">
                    <span>Contact Specialists</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ═══════════════════════════════════════
           BACKGROUND SPINNING ORBIT KEYFRAMES
           ═══════════════════════════════════════ */
        @keyframes spinCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinCCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .spin-cw-slow, .spin-ccw-slow, .spin-cw-med, .spin-ccw-med, .spin-cw-fast, .spin-ccw-fast {
          transform-box: fill-box;
          transform-origin: center;
        }
        .spin-cw-slow { animation: spinCW 55s linear infinite; }
        .spin-ccw-slow { animation: spinCCW 55s linear infinite; }
        .spin-cw-med { animation: spinCW 32s linear infinite; }
        .spin-ccw-med { animation: spinCCW 32s linear infinite; }
        .spin-cw-fast { animation: spinCW 18s linear infinite; }
        .spin-ccw-fast { animation: spinCCW 18s linear infinite; }

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
          padding: 4rem 5% 3.5rem;
          text-align: center;
        }

        .proc-header-subtitle {
          max-width: 780px;
          margin: 1.2rem auto 0 auto;
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          line-height: 1.65;
          color: #4A5568;
          font-weight: 500;
        }

        .proc-hdr-word {
          display: inline-block;
        }

        /* ═══════════════════════════════════════
           BUZZWORTHY ACCORDION (DESKTOP)
           ═══════════════════════════════════════ */
        .proc-accordion {
          display: flex;
          max-width: 1300px;
          margin: 0 auto;
          height: 540px;
          border-radius: 24px;
          overflow: hidden;
          background: #FFFFFF;
          box-shadow: 0 20px 60px rgba(10, 46, 92, 0.08);
          border: 1px solid rgba(10, 46, 92, 0.08);
          position: relative;
          z-index: 5;
        }

        .proc-strip {
          flex: 0.65;
          min-width: 62px;
          max-width: 76px;
          position: relative;
          background: #FFFFFF;
          border-right: 1px solid #E8EBF0;
          transition: flex 0.75s cubic-bezier(0.2, 0.9, 0.3, 1), max-width 0.75s cubic-bezier(0.2, 0.9, 0.3, 1);
          overflow: hidden;
          cursor: pointer;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
        }

        .proc-strip:last-child {
          border-right: none;
        }

        .proc-strip.active {
          flex: 8.5;
          max-width: 1050px;
          cursor: default;
          padding: 2.5rem 3rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
        }

        /* Top: Dot + Number */
        .strip-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.5rem;
          flex-shrink: 0;
        }

        .strip-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #00A896;
          box-shadow: 0 0 10px rgba(0, 168, 150, 0.6);
          flex-shrink: 0;
        }

        .strip-num {
          font-size: 0.85rem;
          font-weight: 800;
          font-family: var(--font-display);
          color: #0A2E5C;
          letter-spacing: 0.05em;
        }

        /* Expanded Content - Glides in from the RIGHT */
        .strip-expanded-content {
          pointer-events: none;
          flex: 1;
          display: flex;
          gap: 2.8rem;
          align-items: stretch;
          width: 100%;
        }

        .proc-strip.active .strip-expanded-content {
          pointer-events: auto;
        }

        .strip-text-side {
          flex: 0.95;
          min-width: 360px;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .strip-tagline-chip {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00A896;
          margin-bottom: 0.75rem;
          font-family: var(--font-display);
          opacity: 0;
          transform: translateX(60px);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, opacity 0.6s ease 0.05s;
        }

        .proc-strip.active .strip-tagline-chip {
          opacity: 1;
          transform: translateX(0);
        }

        .strip-title {
          font-size: clamp(2rem, 2.6vw, 3rem);
          font-weight: 900;
          font-family: var(--font-display);
          color: #0B0C10;
          letter-spacing: -0.025em;
          line-height: 1.08;
          margin: 0 0 1.2rem 0;
          text-transform: uppercase;
          opacity: 0;
          transform: translateX(90px);
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, opacity 0.7s ease 0.1s;
        }

        .proc-strip.active .strip-title {
          opacity: 1;
          transform: translateX(0);
        }

        .strip-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #4A5568;
          font-weight: 450;
          margin: 0 0 1.8rem 0;
          opacity: 0;
          transform: translateX(80px);
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, opacity 0.75s ease 0.15s;
        }

        .proc-strip.active .strip-desc {
          opacity: 1;
          transform: translateX(0);
        }

        .strip-cta-wrap {
          display: flex;
          align-items: center;
          opacity: 0;
          transform: translateX(60px);
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.8s ease 0.2s;
        }

        .proc-strip.active .strip-cta-wrap {
          opacity: 1;
          transform: translateX(0);
        }

        .strip-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 11px 24px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          color: #FFFFFF !important;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(0, 168, 150, 0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .strip-contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 168, 150, 0.4);
        }

        /* ── EXPANSIVE LANDSCAPE IMAGE CANVAS (NO VERTICAL CROPPING) ── */
        .strip-image-side {
          flex: 1.4;
          height: 100%;
          min-height: 360px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 16px 40px rgba(10, 46, 92, 0.12);
          border: 1px solid rgba(10, 46, 92, 0.08);
          background: #F1F5F9;
          opacity: 0;
          transform: translateX(140px) scale(0.92);
          filter: blur(4px);
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.12s, opacity 0.85s ease 0.12s, filter 0.85s ease 0.12s;
        }

        .proc-strip.active .strip-image-side {
          opacity: 1;
          transform: translateX(0) scale(1);
          filter: blur(0px);
        }

        .strip-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.6s ease;
        }

        .proc-strip.active:hover .strip-img {
          transform: scale(1.03);
        }

        .strip-img-gradient-shim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 65%, rgba(10, 46, 92, 0.3) 100%);
          pointer-events: none;
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
            will-change: transform;
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
            min-height: 120px;
            max-height: 190px;
            width: 100%;
            border-radius: 14px;
            overflow: hidden;
            margin: 8px 0;
            position: relative;
            background: #0A192F;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          }

          .proc-mobile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
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

          .proc-mobile-contact-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 8px 16px;
            background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
            color: #FFFFFF !important;
            font-size: 0.76rem;
            font-weight: 700;
            border-radius: 999px;
            text-decoration: none;
            box-shadow: 0 4px 14px rgba(0, 168, 150, 0.25);
          }
        }
      `}</style>
    </section>
  );
};

export default Process;
