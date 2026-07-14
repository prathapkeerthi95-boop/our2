import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
          left: e.clientX,
          top: e.clientY,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto"
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
        padding: '3rem 0', 
        backgroundColor: '#FFFFFF', 
        color: 'var(--text-black)',
        position: 'relative',
        cursor: activeTestimonial ? 'none' : 'auto',
      }}
      onClick={() => setActiveTestimonial(null)}
    >
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="section-label" style={{ justifyContent: 'center', color: '#666666' }}>
          Testimonials
        </div>
      </div>
 
      {/* Kinetic Marquee Wrapper */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        {/* Kinetic Marquee */}
        <div style={{ width: '200%', display: 'flex', whiteSpace: 'nowrap' }} ref={marqueeRef}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i}
              onMouseEnter={() => setActiveTestimonial(t)}
              onMouseLeave={() => setActiveTestimonial(null)}
              onClick={(e) => {
                e.stopPropagation();
                if (activeTestimonial && activeTestimonial.client === t.client) {
                  setActiveTestimonial(null);
                } else {
                  setActiveTestimonial(t);
                  if (tooltipRef.current) {
                    gsap.set(tooltipRef.current, {
                      left: e.clientX,
                      top: e.clientY
                    });
                  }
                }
              }}
              style={{
                padding: '0 2rem',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                opacity: activeTestimonial ? (activeTestimonial.client === t.client ? 1 : 0.2) : 0.8
              }}
            >
              <span style={{
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                color: '#00E5FF',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 0.3s ease'
              }}>
                {t.client}
              </span>
              <span style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                color: 'rgba(0, 229, 255, 0.4)',
                marginLeft: '2rem'
              }}>
                —
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Magnetic Tooltip rendered outside containing hierarchies */}
      {createPortal(
        <div 
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 99999,
            opacity: activeTestimonial ? 1 : 0,
            transform: `translate3d(-50%, -110%, 0) scale(${activeTestimonial ? 1 : 0.85})`,
            transformOrigin: 'bottom center',
            transition: 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{
            width: '350px',
            padding: '2rem',
            backgroundColor: '#000000',
            border: '1px solid rgba(0, 229, 255, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          }}>
            <div style={{ color: '#FFD700', fontSize: '1.5rem', marginBottom: '1rem' }}>★★★★★</div>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#FFFFFF', marginBottom: '1.5rem', fontStyle: 'italic' }}>
              "{activeTestimonial?.quote}"
            </p>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {activeTestimonial?.role}
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

export default Testimonials;
