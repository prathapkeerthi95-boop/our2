import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from './AnimatedHeading';
import CyberneticBackdropEngine from './CyberneticBackdropEngine';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    category: 'E-Commerce / Sports', 
    title: 'Gagner Sports', 
    image: 'https://images.unsplash.com/photo-1734574226134-9f0f07e62407?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fG1hcmF0aG9ufGVufDB8fDB8fHww', 
    link: 'https://gagnersports.com/' 
  },
  { 
    category: 'Own Product / Real Estate', 
    title: 'Premium Apartment', 
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', 
    link: '#' 
  },
  { 
    category: 'Creative / Digital Identity', 
    title: 'KE19 Portfolio', 
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', 
    link: 'https://ke19portfolio.netlify.app/' 
  }
];

const Portfolio = () => {
  const canvasRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const p3Ref = useRef(null);

  const [activeHero, setActiveHero] = useState(0);
  const activeHeroRef = useRef(0);
  const autoRotateTimer = useRef(null);
  const inactivityTimer = useRef(null);
  const isHovered = useRef(false);
  const isTransitioning = useRef(false);

  const cardRefs = [p1Ref, p2Ref, p3Ref];

  // Define fanned slots in the 60% right-hand projects column
  const slots = [
    // Slot 0: Top-Center Hero (Z-Index: 100, fully opaque, large & wide)
    { x: 0, y: -20, scaleX: 1.6, scaleY: 1.3, zIndex: 100, opacity: 1 },
    // Slot 1: Bottom-Right Background (Z-Index: 30, partially faded, small)
    { x: 160, y: 280, scaleX: 0.85, scaleY: 0.85, zIndex: 30, opacity: 1 },
    // Slot 2: Bottom-Left Background (Z-Index: 20, partially faded, small)
    { x: -160, y: 280, scaleX: 0.85, scaleY: 0.85, zIndex: 20, opacity: 1 }
  ];

  // Particle emission helper on lock
  const triggerLockParticles = (el) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const container = canvasRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const originX = rect.left - containerRect.left + rect.width / 2;
    const originY = rect.top - containerRect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'lock-particle';
      particle.style.cssText = `
        position: absolute;
        left: ${originX}px;
        top: ${originY}px;
        width: 6px;
        height: 6px;
        background: ${i % 2 === 0 ? '#00F0FF' : '#FF2A54'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
        box-shadow: 0 0 8px ${i % 2 === 0 ? '#00F0FF' : '#FF2A54'};
      `;
      container.appendChild(particle);

      const angle = (i / 12) * Math.PI * 2;
      const distance = 40 + Math.random() * 60;
      const destX = originX + Math.cos(angle) * distance;
      const destY = originY + Math.sin(angle) * distance;

      gsap.to(particle, {
        left: destX,
        top: destY,
        opacity: 0,
        scale: 0.2,
        duration: 0.6 + Math.random() * 0.4,
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
        }
      });
    }
  };

  const animateToSlots = (activeIdx, duration = 1.0) => {
    isTransitioning.current = true;
    cardRefs.forEach((ref, cardIdx) => {
      const el = ref.current;
      if (!el) return;

      const slotIdx = (cardIdx - activeIdx + 3) % 3;
      const slot = slots[slotIdx];

      // Add dynamic visual blur classes based on transitioning slots
      if (slotIdx === 0) {
        el.classList.add('p1-entering'); // Neon glow target edge
      } else if (slotIdx === 1) {
        el.classList.add('p2-entering'); // Velocity horizontal blur
      } else {
        el.classList.add('p3-entering'); // Velocity vertical blur
      }

      gsap.to(el, {
        x: slot.x,
        y: slot.y,
        scaleX: slot.scaleX,
        scaleY: slot.scaleY,
        opacity: slot.opacity,
        duration: duration,
        ease: "power3.inOut",
        onStart: () => {
          // Mid-point stacking context update
          gsap.delayedCall(duration / 2.2, () => {
            if (el) el.style.zIndex = slot.zIndex;
          });
        },
        onComplete: () => {
          el.classList.remove('p1-entering', 'p2-entering', 'p3-entering');
          el.classList.add('locked-state');

          // Trigger particle snap on the newly promoted Hero card
          if (slotIdx === 0) {
            triggerLockParticles(el);
          }
          isTransitioning.current = false;
        }
      });
    });
  };

  const startAutoRotation = () => {
    stopAutoRotation();
    autoRotateTimer.current = setInterval(() => {
      if (isHovered.current || isTransitioning.current) return;
      setActiveHero((prev) => {
        const next = (prev + 1) % 3;
        activeHeroRef.current = next;
        animateToSlots(next);
        return next;
      });
    }, 2000); // 2-second interval
  };

  const stopAutoRotation = () => {
    if (autoRotateTimer.current) {
      clearInterval(autoRotateTimer.current);
      autoRotateTimer.current = null;
    }
  };

  const clearInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = null;
    }
  };

  useEffect(() => {
    const isDesktop = window.innerWidth >= 992;
    
    const ctx = gsap.context(() => {
      if (isDesktop) {
        // Step 1: Establish Baseline "Before" scene (off-screen setup)
        gsap.set(p1Ref.current, { x: -300, y: slots[0].y, scaleX: 0.9, scaleY: 0.9, opacity: 0 });
        gsap.set(p2Ref.current, { x: 350, y: slots[1].y, scaleX: 0.7, scaleY: 0.7, opacity: 0 });
        gsap.set(p3Ref.current, { x: slots[2].x, y: 350, scaleX: 0.7, scaleY: 0.7, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: canvasRef.current,
            start: "top 70%",
            once: true
          }
        });

        // Frame 1: Project 1 (Robotics UI) slides in
        tl.to(p1Ref.current, {
          x: slots[0].x,
          y: slots[0].y,
          scaleX: slots[0].scaleX,
          scaleY: slots[0].scaleY,
          opacity: slots[0].opacity,
          duration: 1.1,
          ease: "power3.out",
          onStart: () => {
            if (p1Ref.current) {
              p1Ref.current.style.zIndex = slots[0].zIndex;
              p1Ref.current.classList.add('p1-entering');
            }
          }
        });

        // Frame 2: Project 1 locks & Project 2 slides in
        tl.to(p1Ref.current, {
          keyframes: [
            { scaleX: slots[0].scaleX * 1.02, scaleY: slots[0].scaleY * 1.02, duration: 0.12 },
            { scaleX: slots[0].scaleX, scaleY: slots[0].scaleY, duration: 0.15, ease: "power2.out" }
          ],
          onComplete: () => {
            if (p1Ref.current) {
              p1Ref.current.classList.remove('p1-entering');
              p1Ref.current.classList.add('locked-state');
              triggerLockParticles(p1Ref.current);
            }
          }
        });

        tl.to(p2Ref.current, {
          x: slots[1].x,
          y: slots[1].y,
          scaleX: slots[1].scaleX,
          scaleY: slots[1].scaleY,
          opacity: slots[1].opacity,
          duration: 0.8,
          ease: "back.out(1.15)",
          onStart: () => {
            if (p2Ref.current) {
              p2Ref.current.style.zIndex = slots[1].zIndex;
              p2Ref.current.classList.add('p2-entering');
            }
          },
          onComplete: () => {
            if (p2Ref.current) {
              p2Ref.current.classList.remove('p2-entering');
              p2Ref.current.classList.add('locked-state');
              triggerLockParticles(p2Ref.current);
            }
          }
        }, "-=0.3");

        // Frame 3 & 4: Project 3 rises to complete grid
        tl.to(p3Ref.current, {
          x: slots[2].x,
          y: slots[2].y,
          scaleX: slots[2].scaleX,
          scaleY: slots[2].scaleY,
          opacity: slots[2].opacity,
          duration: 1.0,
          ease: "power4.out",
          onStart: () => {
            if (p3Ref.current) {
              p3Ref.current.style.zIndex = slots[2].zIndex;
              p3Ref.current.classList.add('p3-entering');
            }
          },
          onComplete: () => {
            if (p3Ref.current) {
              p3Ref.current.classList.remove('p3-entering');
              p3Ref.current.classList.add('locked-state');
              triggerLockParticles(p3Ref.current);
              // Start automatic fan rotations
              startAutoRotation();
            }
          }
        }, "-=0.2");

      } else {
        // Mobile / Tablet fallback reveals
        gsap.fromTo([p1Ref.current, p2Ref.current, p3Ref.current],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: canvasRef.current,
              start: "top 80%",
              once: true
            }
          }
        );
      }
    }, canvasRef);

    return () => {
      ctx.revert();
      stopAutoRotation();
      clearInactivityTimer();
    };
  }, []);

  // Layer 4 Parallax & Coordinate Cursor Matrix
  const handleMouseMove = (e) => {
    const isDesktop = window.innerWidth >= 992;
    if (!isDesktop) return;

    isHovered.current = true; // Pause auto rotation on active interaction
    stopAutoRotation();
    clearInactivityTimer();

    // Resume rotation after 2 seconds of inactivity
    inactivityTimer.current = setTimeout(() => {
      isHovered.current = false;
      startAutoRotation();
    }, 2000);

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    cardRefs.forEach((ref, cardIdx) => {
      const el = ref.current;
      if (!el) return;

      const slotIdx = (cardIdx - activeHeroRef.current + 3) % 3;
      const slot = slots[slotIdx];

      // Dynamic parallax multipliers based on slot depth
      let parallaxMult = 16;
      let rotMult = 4;
      if (slotIdx === 0) {
        parallaxMult = 20; // Hero shifts the most
        rotMult = 5;
      } else if (slotIdx === 1) {
        parallaxMult = 8;  // Background right shifts the least
        rotMult = 2;
      } else {
        parallaxMult = 12; // Background left shifts moderately
        rotMult = 3;
      }

      gsap.to(el, {
        x: slot.x + normX * parallaxMult,
        y: slot.y + normY * parallaxMult,
        duration: 0.6,
        ease: "power2.out"
      });
    });
  };

  const handleMouseLeave = () => {
    clearInactivityTimer();
    isHovered.current = false; // Resume auto rotation
    startAutoRotation();
    
    // Reset cards to default coordinates in their active slots
    cardRefs.forEach((ref, cardIdx) => {
      const el = ref.current;
      if (!el) return;

      const slotIdx = (cardIdx - activeHeroRef.current + 3) % 3;
      const slot = slots[slotIdx];

      gsap.to(el, {
        x: slot.x,
        y: slot.y,
        duration: 1.0,
        ease: "power3.out"
      });
    });
  };

  // Click handler promoting clicked background card to Hero
  const handleCardClick = (cardIdx, e) => {
    const isDesktop = window.innerWidth >= 992;
    if (!isDesktop) return;

    const slotIdx = (cardIdx - activeHero + 3) % 3;
    if (slotIdx !== 0) {
      e.preventDefault();
      setActiveHero(cardIdx);
      activeHeroRef.current = cardIdx;
      animateToSlots(cardIdx);
      
      clearInactivityTimer();
      isHovered.current = true;
      inactivityTimer.current = setTimeout(() => {
        isHovered.current = false;
        startAutoRotation();
      }, 2000);
    }
  };

  return (
    <section id="portfolio" style={{ backgroundColor: '#F5F3EF', paddingTop: '3rem', paddingBottom: '0', position: 'relative' }}>
      
      {/* Background Layer: Cybernetic Backdrop Engine (Placed full-width absolute underneath the columns) */}
      <CyberneticBackdropEngine />

      <div style={{ width: '100%', maxWidth: '100%', padding: '0 4%', position: 'relative', zIndex: 2 }}>

        {/* Two-Column Grid: Left Column holds the Robot Head space, Right Column holds the Projects */}
        <div className="portfolio-grid-container">
          
          {/* Left Column: Empty spacer wrapper to preserve area for HUD core & Robot Head */}
          <div style={{ pointerEvents: 'none', height: '560px' }} />

          {/* Right Column: Title and Unified Dynamic Projects Canvas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Header Content moved to Right Column with bottom spacing */}
            <div style={{ marginBottom: '3.5rem' }}>
              <div className="section-label reveal" style={{ marginBottom: '1rem' }}>
                Selected Work
              </div>
              <AnimatedHeading 
                text="Projects That \n Speak Volumes" 
                mode="scramble" 
                style={{ color: 'var(--text-black)', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: 1.1, fontWeight: 900, letterSpacing: '-0.02em' }} 
              />
            </div>

            {/* Unified Dynamic Projects Canvas */}
            <div 
              ref={canvasRef}
              className="portfolio-interactive-canvas"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
            {/* Project 1: Robotics UI (Foreground Left/Top) */}
            <div ref={p1Ref} className="portfolio-card-wrapper portfolio-card-1">
              <div className="portfolio-card-inner-float-1">
                <a
                  href={projects[0].link} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => handleCardClick(0, e)}
                  className={`portfolio-item ${activeHero === 0 ? 'is-hero-card' : ''}`}
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    cursor: 'none',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    backgroundColor: '#FFF'
                  }}
                >
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={projects[0].image} alt={projects[0].title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div 
                      className="port-overlay"
                      style={{
                        position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                        opacity: 1, transition: 'opacity 0.4s ease', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem'
                      }}
                    >
                      <div style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        {projects[0].category}
                      </div>
                      <h3 style={{ color: 'white', fontSize: '1.8rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>
                        {projects[0].title}
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Project 2: Cyber Board (Background Right) */}
            <div ref={p2Ref} className="portfolio-card-wrapper portfolio-card-2">
              <div className="portfolio-card-inner-float-2">
                <a
                  href={projects[1].link} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => handleCardClick(1, e)}
                  className={`portfolio-item ${activeHero === 1 ? 'is-hero-card' : ''}`}
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    cursor: 'none',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    backgroundColor: '#FFF'
                  }}
                >
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={projects[1].image} alt={projects[1].title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div 
                      className="port-overlay"
                      style={{
                        position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                        opacity: 1, transition: 'opacity 0.4s ease', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem'
                      }}
                    >
                      <div style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        {projects[1].category}
                      </div>
                      <h3 style={{ color: 'white', fontSize: '1.6rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>
                        {projects[1].title}
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Project 3: Premium Apartment (Foreground Center) */}
            <div ref={p3Ref} className="portfolio-card-wrapper portfolio-card-3">
              <div className="portfolio-card-inner-float-3">
                <a
                  href={projects[2].link} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => handleCardClick(2, e)}
                  className={`portfolio-item ${activeHero === 2 ? 'is-hero-card' : ''}`}
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    cursor: 'none',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    backgroundColor: '#FFF'
                  }}
                >
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={projects[2].image} alt={projects[2].title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div 
                      className="port-overlay"
                      style={{
                        position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                        opacity: 1, transition: 'opacity 0.4s ease', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem'
                      }}
                    >
                      <div style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        {projects[2].category}
                      </div>
                      <h3 style={{ color: 'white', fontSize: '1.6rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>
                        {projects[2].title}
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
);
};

export default Portfolio;
