import React, { useRef, useEffect, useState } from 'react';
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
  }
];

const Testimonials = () => {
  const marqueeRef = useRef(null);
  const tooltipRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(null);

  useEffect(() => {
    // 1. Endless Marquee Animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });
    }

    // 2. Custom Cursor Tooltip tracking
    const moveTooltip = (e) => {
      if (tooltipRef.current) {
        gsap.to(tooltipRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    };

    window.addEventListener('mousemove', moveTooltip);
    return () => window.removeEventListener('mousemove', moveTooltip);
  }, []);

  return (
    <section 
      id="testimonials" 
      style={{ 
        padding: '4rem 0', 
        backgroundColor: '#050505', 
        color: '#FFFFFF',
        overflow: 'hidden',
        position: 'relative',
        cursor: activeTestimonial ? 'none' : 'auto'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <div className="section-label" style={{ justifyContent: 'center', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
          Testimonials
        </div>
      </div>

      {/* Kinetic Marquee */}
      <div style={{ width: '200%', display: 'flex', whiteSpace: 'nowrap' }} ref={marqueeRef}>
        {[...testimonials, ...testimonials].map((t, i) => (
          <div 
            key={i}
            onMouseEnter={() => setActiveTestimonial(t)}
            onMouseLeave={() => setActiveTestimonial(null)}
            style={{
              padding: '0 4rem',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              opacity: activeTestimonial ? (activeTestimonial.client === t.client ? 1 : 0.2) : 1
            }}
          >
            <span style={{
              fontSize: 'clamp(5rem, 12vw, 15rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: activeTestimonial && activeTestimonial.client === t.client ? '2px #00E5FF' : '1px rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'all 0.3s ease'
            }}>
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
          opacity: activeTestimonial ? 1 : 0,
          transform: `scale(${activeTestimonial ? 1 : 0}) translate(-50%, -100%)`,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
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
          <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#FFFFFF', marginBottom: '1.5rem', fontStyle: 'italic' }}>
            "{activeTestimonial?.quote}"
          </p>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {activeTestimonial?.role}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Testimonials;
