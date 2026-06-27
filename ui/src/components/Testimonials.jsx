import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const testimonials = [
  {
    client: 'TECHNOVA',
    quote: 'NUVAROX completely transformed our digital presence. Traffic increased by 420%.',
    role: 'Rajesh K. — CEO'
  },
  {
    client: 'FITPULSE',
    quote: 'The mobile app they built is flawless. Every stage was handled with absolute precision.',
    role: 'Priya V. — Founder'
  },
  {
    client: 'VERTEX',
    quote: 'They didn\'t just design a logo — they built an entire identity ecosystem.',
    role: 'Arjun M. — Director'
  },
  {
    client: 'LUMINA',
    quote: 'Best agency we have ever partnered with. True visionaries in WebGL.',
    role: 'Sarah J. — CMO'
  },
  {
    client: 'AETHER',
    quote: 'Their AI integrations optimized our platform workflows by 300%. Absolutely phenomenal.',
    role: 'Alex M. — CTO'
  },
  {
    client: 'NEXUS',
    quote: 'Sleek, fluid, and immersive. They set a new benchmark for web interaction.',
    role: 'Elena R. — Head of Product'
  },
  {
    client: 'KINETIC',
    quote: 'The custom physics engine and animations feel incredibly premium and responsive.',
    role: 'Marcus L. — VP of Design'
  },
  {
    client: 'SYNAPSE',
    quote: 'Highly scientific approach to UX. Every motion was backed by user psychology.',
    role: 'Dr. Kenji T. — Director'
  },
  {
    client: 'ECLIPSE',
    quote: 'Unbelievable branding execution. Our conversion rate rose by 250% in two weeks.',
    role: 'Sofia N. — Marketing Lead'
  },
  {
    client: 'APEX',
    quote: 'Flawless delivery under tight constraints. Their engineering is top-tier.',
    role: 'Vikram S. — Managing Partner'
  },
  {
    client: 'QUANTUM',
    quote: 'They took our complex data visualization concept and turned it into pure art.',
    role: 'Zoe C. — Co-Founder'
  }
];

const Testimonials = () => {
  const marqueeRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    // 1. Endless Marquee Animation - Accelerated 2x faster (10s duration instead of 20s)
    let marqueeTween = null;
    if (marqueeRef.current) {
      marqueeTween = gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 10,
        repeat: -1
      });
    }

    // 2. Direct CSS transform for tooltip — avoids creating GSAP tweens every frame
    const moveTooltip = (e) => {
      if (tooltipRef.current) {
        tooltipRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener('mousemove', moveTooltip, { passive: true });
    return () => {
      if (marqueeTween) marqueeTween.kill();
      window.removeEventListener('mousemove', moveTooltip);
    };
  }, []);

  // Update tooltip content and show it directly via DOM to prevent React re-renders
  const showTooltip = (t) => {
    if (tooltipRef.current) {
      const quoteEl = tooltipRef.current.querySelector('.tooltip-quote');
      const roleEl = tooltipRef.current.querySelector('.tooltip-role');
      if (quoteEl) quoteEl.innerText = `"${t.quote}"`;
      if (roleEl) roleEl.innerText = t.role;
      tooltipRef.current.style.opacity = '1';
    }
  };

  const hideTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '0';
    }
  };

  return (
    <section 
      id="testimonials" 
      style={{ 
        padding: '10rem 0', 
        backgroundColor: '#050505', 
        color: '#FFFFFF',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <div className="section-label" style={{ justifyContent: 'center', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
          Testimonials
        </div>
      </div>

      {/* CSS rules specifically for high-performance hover styling without JS overhead */}
      <style dangerouslySetInnerHTML={{__html: `
        .marquee-wrapper:hover .marquee-item {
          opacity: 0.25;
        }
        .marquee-wrapper .marquee-item:hover {
          opacity: 1 !important;
        }
        .marquee-wrapper .marquee-item:hover .testimonial-title {
          -webkit-text-stroke: 2.5px #00E5FF !important;
          text-shadow: 0 0 15px #00E5FF, 0 0 30px #00E5FF !important;
          animation: none !important;
        }
        
        .testimonial-title {
          font-size: clamp(5rem, 12vw, 15rem);
          font-family: var(--font-display);
          font-weight: 900;
          color: transparent;
          text-transform: uppercase;
          transition: opacity 0.3s ease, text-shadow 0.3s ease, -webkit-text-stroke 0.3s ease;
          display: inline-block;
        }
        
        /* Staggered CSS-only flicker animations so they don't reload on React render */
        .flicker-stagger-0 { animation: testimonial-flicker 2.1s infinite 0.0s; }
        .flicker-stagger-1 { animation: testimonial-flicker 2.7s infinite 0.3s; }
        .flicker-stagger-2 { animation: testimonial-flicker 3.3s infinite 0.6s; }
      `}} />

      {/* Kinetic Marquee wrapper */}
      <div className="marquee-wrapper" style={{ width: '200%', display: 'flex', whiteSpace: 'nowrap' }} ref={marqueeRef}>
        {[...testimonials, ...testimonials].map((t, i) => (
          <div 
            key={i}
            className="marquee-item"
            onMouseEnter={() => showTooltip(t)}
            onMouseLeave={hideTooltip}
            style={{
              padding: '0 4rem',
              display: 'inline-block',
              transition: 'opacity 0.3s ease'
            }}
          >
            <span className={`testimonial-title flicker-stagger-${i % 3}`}>
              {t.client}
            </span>
            <span style={{
              fontSize: 'clamp(3rem, 8vw, 10rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              color: '#FF2A54',
              marginLeft: '4rem'
            }}>
              —
            </span>
          </div>
        ))}
      </div>

      {/* Floating Magnetic Tooltip */}
      <div 
        ref={tooltipRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform, opacity',
          transition: 'opacity 0.3s ease',
        }}
      >
        <div style={{
          width: '350px',
          padding: '2rem',
          backgroundColor: 'rgba(11, 12, 16, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          borderRadius: '20px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
          transform: 'translate(-50%, -120%)' // Offset so it floats strictly above the mouse
        }}>
          <div style={{ color: '#00E5FF', fontSize: '1.5rem', marginBottom: '1rem' }}>★★★★★</div>
          <p className="tooltip-quote" style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#FFFFFF', marginBottom: '1.5rem', fontStyle: 'italic' }}>
            ""
          </p>
          <div className="tooltip-role" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ""
          </div>
        </div>
      </div>

    </section>
  );
};

export default Testimonials;
