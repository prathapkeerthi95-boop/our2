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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop Header Entrance
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
            toggleActions: 'play none none none'
          }
        }
      );

      // Mobile pinned cards GSAP scroll animation
      const container = mobilePinnedRef.current;
      if (container) {
        const slides = Array.from(container.querySelectorAll('.proc-mobile-card'));
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
            tl.to({}, { duration: 0.25 });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
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
        <div className="proc-accordion">
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

        .strip-tagline-chip {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00A896;
          margin-bottom: 0.75rem;
          font-family: var(--font-display);
        }

        .strip-title {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 900;
          font-family: var(--font-display);
          color: #11131A;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 1.2rem 0;
          text-transform: uppercase;
        }

        .strip-desc {
          font-size: 0.92rem;
          line-height: 1.7;
          color: #555555;
          font-weight: 500;
          margin: 0 0 1.6rem 0;
        }

        .strip-cta-wrap {
          display: flex;
          align-items: center;
        }

        .strip-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 22px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0A2E5C 0%, #00A896 100%);
          color: #FFFFFF !important;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(0, 168, 150, 0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .strip-contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 168, 150, 0.4);
        }

        /* ── EXACT PREVIOUS IMAGE CONTAINER SIZING & PROPORTIONS ── */
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
