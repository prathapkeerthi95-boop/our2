import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'DISCOVERY',
    subtitle: 'SYSTEM ARCHITECTURE',
    desc: 'We extract the core physics of your brand. Complete market analysis, technical auditing, and strategic blueprinting.',
    accent: '#00E5FF',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '02',
    title: 'ENGINEERING',
    subtitle: 'NATIVE DEVELOPMENT',
    desc: 'Writing the algorithms of tomorrow. Clean architecture, scalable infrastructure, and zero-latency performance.',
    accent: '#7000FF',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '03',
    title: 'IMMERSION',
    subtitle: 'WEBGL & PHYSICS',
    desc: 'We don\'t just design interfaces, we simulate environments. Heavy GSAP physics, WebGL shaders, and butter-smooth scrolling.',
    accent: '#FF2A54',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '04',
    title: 'DOMINANCE',
    subtitle: 'MARKET DEPLOYMENT',
    desc: 'Flawless CI/CD pipelines and aggressive go-to-market strategies. We launch products that hijack attention.',
    accent: '#FF8800',
    image: 'https://images.unsplash.com/photo-1558470598-a5f1f1d77a06?auto=format&fit=crop&w=1600&q=80' // Deep intense fiery abstract
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
        gsap.set(panel, { zIndex: 10 });
        gsap.set(bgImg, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1 });
        gsap.set(num, { y: 0, opacity: 1, scale: 1 });
        gsap.set(textBlock, { opacity: 1, y: 0 });
      } else {
        gsap.set(panel, { zIndex: 10 - i });
        // Initial clip-path is a tiny sliver in the center
        gsap.set(bgImg, { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', scale: 1.2 });
        gsap.set(num, { y: -200, opacity: 0, scale: 1.5 });
        gsap.set(textBlock, { opacity: 0, y: 50 });
      }
    });

    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${totalPanels * 150}%`,
        pin: true,
        scrub: 1.5 // Extra smoothing for that Metaskapes heavy inertia feel
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

      const start = i * 2;

      // Current leaves
      masterTL.to(currentNum, { y: 200, opacity: 0, scale: 0.5, duration: 0.8, ease: 'power2.in' }, start);
      masterTL.to(currentText, { y: -50, opacity: 0, duration: 0.6, ease: 'power2.in' }, start);
      // Background collapses violently
      masterTL.to(currentBg, { 
        clipPath: 'polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)', 
        scale: 1.1,
        opacity: 0,
        duration: 0.8, 
        ease: 'power3.inOut' 
      }, start + 0.2);

      // Next enters
      masterTL.to(nextBg, { 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 
        scale: 1,
        duration: 1.2, 
        ease: 'expo.inOut' 
      }, start + 0.6);
      
      masterTL.to(nextNum, { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: 'back.out(1.5)' // Heavy spring/bounce
      }, start + 1);

      masterTL.to(nextText, { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out' 
      }, start + 1.2);
    }

    return () => {
      masterTL.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars && t.vars.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      style={{
        height: '100vh',
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
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          {/* CINEMATIC BACKGROUND */}
          <div 
            className="step-bg"
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              willChange: 'clip-path, transform, opacity'
            }}
          >
            <img src={step.image} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) contrast(1.1) grayscale(0.2)' }} />
            {/* Liquid color overlay - Reduced darkness to make image pop */}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(${step.accent === '#00E5FF' ? '0,229,255' : step.accent === '#7000FF' ? '112,0,255' : step.accent === '#FF2A54' ? '255,42,84' : '255,136,0'},0.4) 100%)` }} />
          </div>

          {/* BRUTALIST CONTENT */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
            
            {/* Massive Dropping Number */}
            <div 
              className="step-num"
              style={{
                fontSize: 'clamp(12rem, 25vw, 22rem)',
                fontWeight: 900,
                color: 'transparent',
                WebkitTextStroke: `2px ${step.accent}`,
                lineHeight: 0.8,
                marginBottom: '-4rem',
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
                background: 'rgba(10, 10, 12, 0.4)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: `1px solid rgba(255,255,255,0.05)`,
                borderTop: `2px solid ${step.accent}`,
                padding: '3rem 4rem',
                borderRadius: '0', // Brutalist square edges
                boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(${step.accent === '#00E5FF' ? '0,229,255' : step.accent === '#7000FF' ? '112,0,255' : step.accent === '#FF2A54' ? '255,42,84' : '255,136,0'},0.15)`,
                willChange: 'transform, opacity',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Corner target marks */}
              <div style={{ position: 'absolute', top: '10px', left: '10px', width: '10px', height: '10px', borderTop: `1px solid ${step.accent}`, borderLeft: `1px solid ${step.accent}` }} />
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '10px', height: '10px', borderBottom: `1px solid ${step.accent}`, borderRight: `1px solid ${step.accent}` }} />

              <div style={{ color: step.accent, fontSize: '0.8rem', letterSpacing: '0.4em', marginBottom: '1rem', fontWeight: 600 }}>
                // {step.subtitle}
              </div>
              <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, color: '#FFF', margin: '0 0 1.5rem 0', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                {step.title}
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
                {step.desc}
              </p>
            </div>

          </div>
        </div>
      ))}

    </section>
  );
};

export default Process;
