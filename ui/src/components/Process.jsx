import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from './AnimatedHeading';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'DISCOVERY',
    subtitle: 'SYSTEM ARCHITECTURE',
    desc: 'We extract the core physics of your brand. Complete market analysis, technical auditing, and strategic blueprinting.',
    accent: '#00E5FF',
    rgb: '0, 229, 255',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '02',
    title: 'ENGINEERING',
    subtitle: 'NATIVE DEVELOPMENT',
    desc: 'Writing the algorithms of tomorrow. Clean architecture, scalable infrastructure, and zero-latency performance.',
    accent: '#7000FF',
    rgb: '112, 0, 255',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '03',
    title: 'IMMERSION',
    subtitle: 'WEBGL & PHYSICS',
    desc: 'We don\'t just design interfaces, we simulate environments. Heavy GSAP physics, WebGL shaders, and butter-smooth scrolling.',
    accent: '#00FFAD',
    rgb: '0, 255, 173',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '04',
    title: 'DOMINANCE',
    subtitle: 'MARKET DEPLOYMENT',
    desc: 'Flawless CI/CD pipelines and aggressive go-to-market strategies. We launch products that hijack attention.',
    accent: '#FF9900',
    rgb: '255, 153, 0',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80'
  }
];

const Process = () => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const panels = panelsRef.current;
    const totalPanels = panels.length;

    // Set initial states
    panels.forEach((panel, i) => {
      const num = panel.querySelector('.step-num');
      const textBlock = panel.querySelector('.step-text');
      const bgImg = panel.querySelector('.step-bg');
      
      if (i === 0) {
        gsap.set(panel, { zIndex: 10, opacity: 1 });
        gsap.set(bgImg, { opacity: 1, scale: 1, filter: 'blur(0px)' });
        gsap.set(num, { y: 0, opacity: 1, scale: 1 });
        gsap.set(textBlock, { opacity: 1, y: 0 });
      } else {
        gsap.set(panel, { zIndex: 10 - i, opacity: 0 });
        gsap.set(bgImg, { opacity: 0, scale: 1.08, filter: 'blur(12px)' });
        gsap.set(num, { y: -120, opacity: 0, scale: 1.3 });
        gsap.set(textBlock, { opacity: 0, y: 40 });
      }
    });

    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalPanels * 120}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6
      }
    });

    for (let i = 0; i < totalPanels - 1; i++) {
      const current = panels[i];
      const next = panels[i + 1];
      
      const currentNum = current.querySelector('.step-num');
      const currentText = current.querySelector('.step-text');
      const currentBg = current.querySelector('.step-bg');
      
      const nextNum = next.querySelector('.step-num');
      const nextText = next.querySelector('.step-text');
      const nextBg = next.querySelector('.step-bg');

      const start = i * 1.0;

      // Current step leaves smoothly
      masterTL.to(currentNum, { y: 100, opacity: 0, scale: 0.7, duration: 0.4, ease: 'power2.in' }, start + 0.3);
      masterTL.to(currentText, { y: -30, opacity: 0, duration: 0.35, ease: 'power2.in' }, start + 0.35);
      masterTL.to(currentBg, { opacity: 0, scale: 1.08, filter: 'blur(10px)', duration: 0.45, ease: 'power2.inOut' }, start + 0.3);
      masterTL.to(current, { opacity: 0, duration: 0.25 }, start + 0.6);

      // Next step enters smoothly full-screen
      masterTL.to(next, { opacity: 1, duration: 0.25 }, start + 0.45);
      masterTL.to(nextBg, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }, start + 0.5);
      masterTL.to(nextNum, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, start + 0.55);
      masterTL.to(nextText, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, start + 0.6);
    }

    // Hold Step 04 at 100% full opacity and crisp visibility before unpinning
    masterTL.to({}, { duration: 1.0 });

    return () => {
      masterTL.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars && t.vars.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <>
      {/* REPLICA PROCESS HEADER SECTION — EXACT MATCH TO PORTFOLIO HEADER BOX */}
      <div 
        className="metaskapes-projects-section" 
        style={{ 
          backgroundColor: '#0B0C10', 
          padding: '6rem 0 3.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="metaskapes-container">
          <div className="metaskapes-header-wrapper">
            <div className="metaskapes-badge">
              <span style={{ color: '#FF2A54', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                — OUR PROCESS
              </span>
            </div>

            <AnimatedHeading 
              text="How We Build \n Digital Dominance" 
              mode="scramble" 
              style={{ 
                color: '#FFFFFF', 
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', 
                lineHeight: 1.1, 
                fontWeight: 900, 
                letterSpacing: '-0.02em',
                marginBottom: '1rem'
              }} 
            />

            <p className="metaskapes-subtext">
              From architectural discovery to zero-latency deployment, we engineer digital ecosystems through rigorous technical precision, heavy WebGL physics, and rapid execution.
            </p>
          </div>
        </div>
      </div>

      <section
        id="process"
        ref={containerRef}
        style={{
          height: '100vh',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#020202', // Absolute deep black
          fontFamily: 'var(--font-display)'
        }}
      >
      {/* EXTREME NOISE GRAIN OVERLAY */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 99, pointerEvents: 'none',
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'5\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.8\'/%3E%3C/svg%3E")',
        mixBlendMode: 'overlay',
        opacity: 0.8
      }} />

      {steps.map((step, index) => (
        <div
          key={index}
          ref={el => panelsRef.current[index] = el}
          style={{
            position: 'absolute', 
            top: 0, left: 0, width: '100%', height: '100vh', minHeight: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          {/* CINEMATIC BACKGROUND */}
          <div 
            className="step-bg"
            style={{
              position: 'absolute', 
              top: 0, left: 0, width: '100%', height: '100vh', minHeight: '100vh', zIndex: 0,
              willChange: 'transform, opacity'
            }}
          >
            <img 
              src={step.image} 
              alt={step.title} 
              style={{ 
                width: '100%', 
                height: '100vh', 
                minHeight: '100vh',
                objectFit: 'cover', 
                objectPosition: 'center',
                filter: 'brightness(0.65) contrast(1.1) grayscale(0.2)' 
              }} 
            />
            {/* Liquid color overlay - Reduced darkness to make image pop */}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(${step.rgb},0.4) 100%)` }} />
          </div>

          {/* BRUTALIST CONTENT */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
            
            {/* Massive Dropping Number */}
            <div 
              className="step-num"
              style={{
                fontSize: 'clamp(7rem, 15vh, 12rem)',
                fontWeight: 900,
                color: 'transparent',
                WebkitTextStroke: `2.5px ${step.accent}`,
                filter: `drop-shadow(0 0 16px ${step.accent})`,
                lineHeight: 0.8,
                marginBottom: '-2.5vh',
                opacity: 0,
                willChange: 'transform, opacity'
              }}
            >
              {step.num}
            </div>

            {/* Glassmorphic Tech Text Block */}
            <div 
              className="step-text"
              style={{
                display: 'inline-block',
                background: 'rgba(8, 8, 12, 0.82)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: `1px solid rgba(255,255,255,0.15)`,
                borderTop: `3px solid ${step.accent}`,
                padding: 'clamp(1.5rem, 3vh, 2.5rem) clamp(2rem, 4vw, 4rem)',
                borderRadius: '8px',
                boxShadow: `0 30px 60px rgba(0,0,0,0.85), 0 0 40px rgba(${step.rgb},0.25)`,
                willChange: 'transform, opacity',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Corner target marks */}
              <div style={{ position: 'absolute', top: '10px', left: '10px', width: '10px', height: '10px', borderTop: `1px solid ${step.accent}`, borderLeft: `1px solid ${step.accent}` }} />
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '10px', height: '10px', borderBottom: `1px solid ${step.accent}`, borderRight: `1px solid ${step.accent}` }} />

              <div style={{ color: step.accent, fontSize: '0.85rem', letterSpacing: '0.4em', marginBottom: 'clamp(0.6rem, 1.5vh, 1rem)', fontWeight: 700, textShadow: `0 0 10px ${step.accent}80` }}>
                // {step.subtitle}
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vh, 3.5rem)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 clamp(0.8rem, 1.8vh, 1.5rem) 0', letterSpacing: '-0.02em', textTransform: 'uppercase', textShadow: '0 2px 14px rgba(0,0,0,0.9)' }}>
                {step.title}
              </h2>
              <p style={{ fontSize: 'clamp(0.95rem, 1.8vh, 1.1rem)', color: 'rgba(255,255,255,0.88)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, fontWeight: 400 }}>
                {step.desc}
              </p>
            </div>

          </div>
        </div>
      ))}

    </section>
    </>
  );
};

export default Process;
