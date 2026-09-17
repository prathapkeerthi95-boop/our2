import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './MagneticElement';

gsap.registerPlugin(ScrollTrigger);

const ZoomHero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Element Refs for Animations
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const glowRef = useRef(null);
  const carouselRef = useRef(null);
  const dividerRef = useRef(null);

  const splitChars = (text, className = '') => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className={`hero-char ${className}`}
        style={{
          display: 'inline-block',
          willChange: 'transform, opacity, filter',
          transformStyle: 'preserve-3d',
          ...(char === ' ' ? { width: '0.25em' } : {})
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    let carouselInterval;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 }); 

      tl.fromTo(glowRef.current,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );

      // Set 3D perspective context for explosive character reveal
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        perspective: 1000,
        transformStyle: 'preserve-3d'
      });

      const chars1 = line1Ref.current.querySelectorAll('.hero-char');
      tl.fromTo(chars1,
        { yPercent: 140, rotateX: -95, rotateY: 20, scale: 0.55, opacity: 0, filter: 'blur(12px)' },
        { yPercent: 0, rotateX: 0, rotateY: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.15, stagger: 0.028, ease: "back.out(1.9)" },
        "-=1.5"
      );

      const chars2 = line2Ref.current.querySelectorAll('.hero-char');
      tl.fromTo(chars2,
        { yPercent: 140, rotateX: -95, rotateY: -20, scale: 0.55, opacity: 0, filter: 'blur(12px)' },
        { yPercent: 0, rotateX: 0, rotateY: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.15, stagger: 0.028, ease: "back.out(1.9)" },
        "-=0.85"
      );

      const chars3 = line3Ref.current.querySelectorAll('.hero-char');
      tl.fromTo(chars3,
        { yPercent: 140, rotateX: -95, rotateY: 20, scale: 0.55, opacity: 0, filter: 'blur(12px)' },
        { yPercent: 0, rotateX: 0, rotateY: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.15, stagger: 0.028, ease: "back.out(1.9)" },
        "-=0.85"
      );

      tl.fromTo(dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        "-=0.5"
      );

      tl.fromTo(subtitleRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
      tl.fromTo(ctaRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      tl.fromTo(scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.5, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      if (carouselRef.current) {
        const items = carouselRef.current.querySelectorAll('.carousel-word');
        let currentIndex = 0;
        
        const rotateCarousel = () => {
          const current = items[currentIndex];
          const nextIndex = (currentIndex + 1) % items.length;
          const next = items[nextIndex];

          gsap.to(current, { 
            yPercent: -110, 
            opacity: 0, 
            duration: 0.5, 
            ease: "power2.in",
            onComplete: () => {
              current.style.visibility = 'hidden';
            }
          });
          gsap.fromTo(next,
            { yPercent: 110, opacity: 0, visibility: 'visible' },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.15 }
          );
          currentIndex = nextIndex;
        };

        carouselInterval = setInterval(rotateCarousel, 2800);
      }

      // Removed glowRef scroll scrub animation for performance (scrubbing a 60px blur kills GPU)

    }, containerRef);

    return () => {
      ctx.revert();
      if (carouselInterval) clearInterval(carouselInterval);
    };
  }, []);

  // CANVAS BACKGROUND: Premium Multiply Abstract Waves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Bolder, richer colors so they stand out more against a true grey background
    // PERFORMANCE: Reduced layers from 8/12/10/15 to 4/5/4/3 (total 16 vs 45)
    const waves = [
      { yOffset: 0.4, frequency: 0.003, amplitude: 130, speed: 1.5, color: 'rgba(255, 42, 84, 0.18)', layers: 4 },
      { yOffset: 0.5, frequency: 0.002, amplitude: 170, speed: 1.1, color: 'rgba(112, 0, 255, 0.18)', layers: 5 },
      { yOffset: 0.65, frequency: 0.004, amplitude: 100, speed: 1.8, color: 'rgba(0, 150, 255, 0.18)', layers: 4 },
      { yOffset: 0.8, frequency: 0.0015, amplitude: 220, speed: 0.8, color: 'rgba(112, 0, 255, 0.12)', layers: 3 }
    ];

    // Only render when hero is visible — PERF: truly stop rAF when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (!wasVisible && isVisible) render();
    }, { threshold: 0 });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) return; // PERF: truly stop — don't re-schedule rAF
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'multiply';

      time += 0.015;

      waves.forEach((wave) => {
        for (let j = 0; j < wave.layers; j++) {
          ctx.beginPath();
          // PERFORMANCE: step 40px instead of 20px — halves lineTo calls
          for(let i = 0; i <= canvas.width; i += 40) {
            const dx = i * wave.frequency;
            const yOffset = Math.sin(dx + time * wave.speed) * wave.amplitude 
                          + Math.cos(dx * 1.5 - time * (wave.speed * 0.8)) * (wave.amplitude * 0.4);
            const twist = Math.sin(dx * 0.8 + time + j * 0.15) * 40;
            const y = (canvas.height * wave.yOffset) + yOffset + twist + (j * 4);
            
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
          }
          ctx.strokeStyle = wave.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="zoom-hero-section"
      style={{
        position: 'relative', width: '100%',
        overflow: 'hidden', display: 'flex', alignItems: 'flex-start',
        paddingTop: '160px', paddingBottom: '4.5rem',
        minHeight: '100vh',
        /* TRUE PREMIUM GREY BACKGROUND */
        background: '#E2E6ED'
      }}
    >
      {/* 
        ================================================================
        CENTER ABSTRACT BACKGROUND IMAGE (Unique & Attractive)
        ================================================================
      */}
      <div 
        className="hero-bg-image"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'min(1000px, 200vw)',
          height: 'min(1000px, 200vw)',
          backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18, /* Soft opacity so it perfectly blends */
          mixBlendMode: 'multiply', /* Creates a beautiful ink-like overlay on the grey */
          WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)',
          maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '15%', left: '45%',
          width: 'min(700px, 150vw)', height: 'min(700px, 150vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(150, 150, 150, 0.02) 50%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 1,
          opacity: 0,
          pointerEvents: 'none'
        }}
      />

      <div
        ref={contentRef}
        className="container"
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '1300px',
          padding: '0 2rem'
        }}
      >
        <div className="zoom-hero-title-box" style={{ marginBottom: '1.5rem' }}>
          {/* Line 1 */}
          <div ref={line1Ref} className="hero-line-1" style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
            <h1 style={{
              fontSize: 'clamp(2.8rem, 8vw, 8rem)',
              fontWeight: '900',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              color: '#11131A',
              margin: 0
            }}>
              <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>{splitChars('Our Craft')}</span>
            </h1>
          </div>

          {/* Line 2 — UNIQUE VIBRANT GRADIENT TEXT */}
          <div ref={line2Ref} className="hero-line-2" style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.35em', paddingBottom: '0.15em' }}>
            <h1 className="hero-char" style={{
              fontSize: 'clamp(2.8rem, 8vw, 8rem)',
              fontWeight: '900',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              /* Extremely unique, attractive Crimson/Purple gradient */
              background: 'linear-gradient(135deg, #FF2A54 0%, #7000FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              margin: 0,
              marginRight: '0.28em'
            }}>
              Digital
            </h1>
            <h1 style={{
              fontSize: 'clamp(2.8rem, 8vw, 8rem)',
              fontWeight: '900',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              color: '#11131A',
              margin: 0
            }}>
              <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>{splitChars('Ecosystems')}</span>
            </h1>
          </div>

          {/* Line 3 — with rotating word */}
          <div ref={line3Ref} className="hero-line-3" style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.3em', paddingBottom: '0.15em' }}>
            <h1 style={{
              fontSize: 'clamp(2.8rem, 8vw, 8rem)',
              fontWeight: '900',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              color: '#11131A',
              margin: 0,
              marginRight: '0.32em'
            }}>
              <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>{splitChars('That')}</span>
            </h1>

            {/* ROTATING CAROUSEL WORD */}
            <div
              ref={carouselRef}
              style={{
                position: 'relative',
                display: 'inline-grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr',
                overflow: 'hidden',
                verticalAlign: 'baseline',
                paddingRight: '0.15em' 
              }}
            >
              {['Convert.', 'Dominate.', 'Inspire.', 'Scale.'].map((word, i) => (
                <span
                  key={i}
                  className="carousel-word"
                  style={{
                    gridArea: '1 / 1 / 2 / 2',
                    visibility: i === 0 ? 'visible' : 'hidden',
                    fontSize: 'clamp(2.8rem, 8vw, 8rem)',
                    fontWeight: '900',
                    fontFamily: 'var(--font-display)',
                    lineHeight: 1.1, 
                    letterSpacing: '-0.04em',
                    fontStyle: 'italic',
                    /* Beautiful deep purple to match the gradient */
                    color: '#7000FF',
                    whiteSpace: 'nowrap',
                    willChange: 'transform, opacity'
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER LINE */}
        <div
          ref={dividerRef}
          style={{
            width: '100%', height: '1px',
            background: 'rgba(0,0,0,0.12)', 
            marginBottom: '1.5rem',
            transformOrigin: 'left center'
          }}
        />

        {/* BOTTOM ROW — Subtitle + CTA */}
        <div className="hero-bottom-row" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          flexWrap: 'wrap', gap: '1.5rem'
        }}>
          <p
            ref={subtitleRef}
            style={{
              fontSize: '1.1rem', lineHeight: '1.7', fontWeight: '500',
              color: 'rgba(17,19,26,0.6)', maxWidth: '420px', margin: 0,
              opacity: 0
            }}
          >
            We architect high-performance websites and digital platforms 
            engineered to captivate your audience and deliver measurable growth.
          </p>

          <div ref={ctaRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', opacity: 0 }}>
            <MagneticElement>
              <a href="#portfolio" className="btn-hero-gradient">
                <span>See Our Work</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '0.5rem' }}>
                  <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </MagneticElement>
            <MagneticElement>
              <a href="#contact" className="btn-hero-glass">
                <span>Let's Talk</span>
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          opacity: 0
        }}
      >
        <div style={{
          width: '1px', height: '60px',
          background: 'linear-gradient(to bottom, rgba(112, 0, 255, 0.5), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite'
        }}/>
      </div>

      <style>{`
        /* 
          1. Frosted Liquid Glass Primary Button (Compact & Ultra-Refined)
        */
        .btn-hero-gradient {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.6rem;
          font-size: 0.85rem;
          background: linear-gradient(135deg, rgba(255, 42, 84, 0.85) 0%, rgba(112, 0, 255, 0.85) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #FFFFFF;
          font-weight: 800;
          font-family: var(--font-display);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-radius: 40px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.45);
          box-shadow: 0 8px 24px rgba(112, 0, 255, 0.28), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.7), inset 0 -1.5px 2px rgba(0, 0, 0, 0.2);
          transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .btn-hero-gradient:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 32px rgba(255, 42, 84, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.95);
          background: linear-gradient(135deg, rgba(255, 55, 95, 0.95) 0%, rgba(130, 30, 255, 0.95) 100%);
          border-color: rgba(255, 255, 255, 0.7);
        }

        /* 
          2. Frosted Liquid Glass Secondary Button (Compact & Ultra-Refined)
        */
        .btn-hero-glass {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.6rem;
          font-size: 0.85rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(240, 245, 255, 0.4) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #11131A;
          font-weight: 800;
          font-family: var(--font-display);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.75);
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95);
          transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .btn-hero-glass:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(235, 243, 255, 0.8) 100%);
          border-color: rgba(112, 0, 255, 0.45);
          color: #7000FF;
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(112, 0, 255, 0.18), inset 0 1.5px 2px #FFFFFF;
        }

        @keyframes scrollPulse {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        /* Abstract Image Animation */
        .hero-bg-image {
          animation: slowSpinBg 80s linear infinite;
          transform-origin: center center;
        }

        @keyframes slowSpinBg {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .zoom-hero-section { padding-top: 120px !important; padding-bottom: 2rem !important; }
        }

        @media (max-width: 768px) {
          .zoom-hero-section {
            min-height: 100dvh !important;
            height: auto !important;
            padding-top: 85px !important;
            padding-bottom: 2.5rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          .zoom-hero-section .container {
            padding: 0 1.2rem !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }
          .zoom-hero-title-box {
            margin-bottom: 1.8rem !important;
          }
          .hero-line-1, .hero-line-2, .hero-line-3 {
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: baseline !important;
          }
          .zoom-hero-section h1,
          .zoom-hero-section .carousel-word {
            font-size: clamp(2.6rem, 11vw, 4.2rem) !important;
            line-height: 1.08 !important;
            letter-spacing: -0.04em !important;
          }
          .hero-line-2 h1 {
            margin-right: 0.22em !important;
          }
          .hero-line-3 h1 {
            margin-right: 0.25em !important;
          }
          .hero-bottom-row {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.2rem !important;
          }
          .hero-bottom-row p {
            font-size: 0.95rem !important;
            line-height: 1.55 !important;
            max-width: 100% !important;
            color: rgba(17, 19, 26, 0.7) !important;
          }
          .btn-hero-gradient, .btn-hero-glass {
            padding: 0.8rem 1.5rem !important;
            font-size: 0.85rem !important;
            flex: 1 !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }

        @media (max-width: 480px) {
          .zoom-hero-section {
            padding-top: 80px !important;
            padding-bottom: 2rem !important;
          }
          .hero-line-1, .hero-line-2, .hero-line-3 {
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: baseline !important;
          }
          .zoom-hero-section h1,
          .zoom-hero-section .carousel-word {
            font-size: clamp(2.5rem, 10.5vw, 3.8rem) !important;
          }
          .hero-bottom-row p {
            font-size: 0.9rem !important;
          }
          .btn-hero-gradient, .btn-hero-glass {
            padding: 0.75rem 1.3rem !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ZoomHero;
