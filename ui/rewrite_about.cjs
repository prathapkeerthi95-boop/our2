const fs = require('fs');
const path = 'd:/Our Pro 2/ui/src/components/About.jsx';

const newContent = `import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_CARDS = [
  {
    step: '01',
    title: 'Optimized Speed',
    description: 'Blazing fast load times under 1.2s — we obsess over every millisecond others ignore.',
    accent: '#00E5CC'
  },
  {
    step: '02',
    title: 'Rock-Solid Security',
    description: 'Enterprise-grade zero-trust architecture that others simply can\\'t match.',
    accent: '#0066FF'
  },
  {
    step: '03',
    title: 'Pixel-Perfect Design',
    description: 'Award-winning UI/UX crafted with surgical precision — no generic templates ever.',
    accent: '#00E5CC'
  },
  {
    step: '04',
    title: 'Clean Architecture',
    description: 'Scalable, maintainable codebases built with SOLID principles from day one.',
    accent: '#0066FF'
  },
  {
    step: '05',
    title: 'AI-Powered Testing',
    description: 'Intelligent automated QA with coverage that catches bugs before they exist.',
    accent: '#00E5CC'
  },
  {
    step: '06',
    title: 'Zero-Downtime Deploy',
    description: 'Seamless CI/CD with instant rollback — your users never notice a thing.',
    accent: '#0066FF'
  }
];

const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade up for cards
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#060C14',
        padding: '8rem 5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(0, 229, 204, 0.05) 0%, transparent 70%)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem', zIndex: 1, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1rem' }}>
          <div style={{ width: '40px', height: '1px', background: '#00E5CC' }} />
          <span style={{ color: '#00E5CC', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
            Our Creative Process
          </span>
          <div style={{ width: '40px', height: '1px', background: '#00E5CC' }} />
        </div>
        <h2 style={{ 
          fontSize: '3.5rem', fontWeight: 800, color: '#FFFFFF', 
          fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-1px', margin: 0 
        }}>
          How We Build <span style={{ color: 'rgba(255,255,255,0.4)' }}>Excellence</span>
        </h2>
      </div>

      {/* Premium Bounded Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        width: '100%',
        maxWidth: '1200px',
        zIndex: 1,
        position: 'relative'
      }}>
        {ABOUT_CARDS.map((card, idx) => (
          <div
            key={idx}
            ref={el => cardsRef.current[idx] = el}
            className="premium-process-card"
            style={{
              background: 'rgba(13, 22, 38, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '24px',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.4s ease',
              cursor: 'none'
            }}
          >
            {/* Hover Glow Background (handled by CSS) */}
            <div className="card-hover-glow" style={{
              position: 'absolute', inset: 0, opacity: 0,
              background: \`radial-gradient(circle at top right, \${card.accent}15 0%, transparent 70%)\`,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
              zIndex: 0
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ 
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '3rem', fontWeight: 800, 
                color: 'rgba(255,255,255,0.1)', marginBottom: '1.5rem', lineHeight: 1 
              }}>
                {card.step}
              </div>
              <h3 style={{ 
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', fontWeight: 700, 
                color: '#FFFFFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' 
              }}>
                <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: card.accent }} />
                {card.title}
              </h3>
              <p style={{ 
                fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.65)', 
                lineHeight: 1.6, margin: 0 
              }}>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{\`
        .premium-process-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .premium-process-card:hover .card-hover-glow {
          opacity: 1 !important;
        }
      \`}</style>
    </section>
  );
};

export default About;
`;

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully rewrote About.jsx with premium bounded grid layout');
