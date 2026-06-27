import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from './AnimatedHeading';
import MagneticElement from './MagneticElement';
import GridBackground from './GridBackground';

gsap.registerPlugin(ScrollTrigger);

const ZoomHero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const glowRef = useRef(null);
  const carouselRef = useRef(null);
  const tagRightRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Master entrance timeline
      const tl = gsap.timeline({ delay: 3.6 });

      // Ambient glow pulse in
      tl.fromTo(glowRef.current,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );

      // Line 1 chars stagger
      const chars1 = line1Ref.current.querySelectorAll('.hero-char');
      tl.fromTo(chars1,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "expo.out" },
        "-=1.5"
      );

      // Line 2 chars stagger (slight delay)
      const chars2 = line2Ref.current.querySelectorAll('.hero-char');
      tl.fromTo(chars2,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "expo.out" },
        "-=0.7"
      );

      // Line 3 chars stagger
      const chars3 = line3Ref.current.querySelectorAll('.hero-char');
      tl.fromTo(chars3,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "expo.out" },
        "-=0.7"
      );

      // Divider line grows
      tl.fromTo(dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        "-=0.5"
      );

      // Tag slides in from side right above buttons
      tl.fromTo(tagRightRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

      // Subtitle + CTA
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

      // Scroll indicator
      tl.fromTo(scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.4, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // Carousel rotation
      if (carouselRef.current) {
        const items = carouselRef.current.querySelectorAll('.carousel-word');
        let currentIndex = 0;
        
        const rotateCarousel = () => {
          const current = items[currentIndex];
          const nextIndex = (currentIndex + 1) % items.length;
          const next = items[nextIndex];

          gsap.to(current, { yPercent: -110, opacity: 0, duration: 0.5, ease: "power2.in" });
          gsap.fromTo(next,
            { yPercent: 110, opacity: 0, display: 'block' },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.15 }
          );
          currentIndex = nextIndex;
        };

        setInterval(rotateCarousel, 2800);
      }

      // Parallax on scroll
      gsap.to(contentRef.current, {
        y: 200,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "80% top",
          scrub: 1.5
        }
      });

      // Glow parallax
      gsap.to(glowRef.current, {
        y: 100,
        scale: 1.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Character split helper
  const splitChars = (text, className = '') => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className={`hero-char ${className}`}
        style={{
          display: 'inline-block',
          willChange: 'transform',
          ...(char === ' ' ? { width: '0.25em' } : {})
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative', width: '100%', height: '100vh',
        overflow: 'hidden', display: 'flex', alignItems: 'center',
        background: '#FAFAFA',
        paddingTop: '80px', // Push content down to avoid overlapping the navbar
        paddingBottom: '40px' // Shift content up slightly to avoid overlapping the bottom drip divider
      }}
    >
      {/* AMBIENT GLOW */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '15%', left: '55%',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(112,0,255,0.08) 0%, rgba(255,42,84,0.04) 50%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 1,
          opacity: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* INTERACTIVE GRID BACKGROUND */}
      <GridBackground />

      {/* MAIN CONTENT */}
      <div
        ref={contentRef}
        className="container"
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '1300px',
          padding: '0 2rem'
        }}
      >
        {/* We removed the legacy top tag bar to clear up space and prevent text clashes */}

        {/* HEADLINE — EDITORIAL SPLIT */}
        <div style={{ marginBottom: '1.5rem' }}>
          {/* Line 1 */}
          <div ref={line1Ref} style={{ overflow: 'hidden', paddingBottom: '0.2em' }}>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              fontWeight: '800',
              fontFamily: 'var(--font-display)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#0B0C10',
              margin: 0
            }}>
              {splitChars('We Craft')}
            </h1>
          </div>

          {/* Line 2 — with accent word */}
          <div ref={line2Ref} style={{ overflow: 'hidden', display: 'flex', alignItems: 'baseline', gap: '0.3em', paddingBottom: '0.2em' }}>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              fontWeight: '800',
              fontFamily: 'var(--font-display)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              margin: 0
            }}>
              <span className="hero-char" style={{ 
                display: 'inline-block', 
                willChange: 'transform',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Digital
              </span>
            </h1>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              fontWeight: '800',
              fontFamily: 'var(--font-display)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#0B0C10',
              margin: 0
            }}>
              {splitChars('Ecosystems')}
            </h1>
          </div>

          {/* Line 3 — with rotating word */}
          <div ref={line3Ref} style={{ overflow: 'hidden', display: 'flex', alignItems: 'baseline', gap: '0.3em', paddingBottom: '0.2em' }}>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              fontWeight: '800',
              fontFamily: 'var(--font-display)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#0B0C10',
              margin: 0
            }}>
              {splitChars('That')}
            </h1>

            {/* ROTATING CAROUSEL WORD */}
            <div
              ref={carouselRef}
              style={{
                position: 'relative',
                display: 'inline-block',
                height: 'clamp(3.5rem, 9vw, 8rem)',
                minWidth: 'clamp(200px, 30vw, 450px)',
                overflow: 'hidden',
                verticalAlign: 'baseline'
              }}
            >
              {['Convert.', 'Dominate.', 'Inspire.', 'Scale.'].map((word, i) => (
                <span
                  key={i}
                  className="carousel-word"
                  style={{
                    position: i === 0 ? 'relative' : 'absolute',
                    top: 0, left: 0,
                    display: i === 0 ? 'block' : 'none',
                    fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                    fontWeight: '800',
                    fontFamily: 'var(--font-display)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    fontStyle: 'italic',
                    color: 'var(--accent-crimson)',
                    whiteSpace: 'nowrap'
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
            background: 'rgba(11,12,16,0.1)',
            marginBottom: '1.5rem',
            transformOrigin: 'left center'
          }}
        />

        {/* BOTTOM ROW — Subtitle + CTA */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          flexWrap: 'wrap', gap: '2rem'
        }}>
          <p
            ref={subtitleRef}
            style={{
              fontSize: '1.05rem', lineHeight: '1.7', fontWeight: '400',
              color: 'rgba(11,12,16,0.5)', maxWidth: '420px', margin: 0,
              opacity: 0
            }}
          >
            We architect high-performance websites and digital platforms 
            engineered to captivate your audience and deliver measurable growth.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-start' }}>
            {/* Scroll indicator label repositioned directly above buttons */}
            <div ref={tagRightRef} style={{
              fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'rgba(11,12,16,0.35)', opacity: 0
            }}>
              Scroll to Explore ↓
            </div>

            <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: 0 }}>
              <MagneticElement>
                <a href="#portfolio" className="btn-premium">
                  <span>See Our Work</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '0.5rem' }}>
                    <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </MagneticElement>
              <MagneticElement>
                <a href="#contact" className="btn-outline" style={{ padding: '1.2rem 2.5rem' }}>
                  <span>Let's Talk</span>
                </a>
              </MagneticElement>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
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
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, rgba(11,12,16,0.2), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite'
        }}/>
      </div>

      {/* CSS ANIMATIONS */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes scrollPulse {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
};

export default ZoomHero;
