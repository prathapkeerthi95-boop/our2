import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from './AnimatedHeading';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { category: 'E-Commerce / Sports', title: 'Gagner Sports', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&auto=format&fit=crop&q=80', link: 'https://gagnersports.com/', gridArea: 'span 2 / span 2', height: '420px' },
  { category: 'Own Product / Real Estate', title: 'Premium Apartment', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', link: '#', gridArea: 'span 1 / span 1', height: '420px' },
  { category: 'Creative / Digital Identity', title: 'KE19 Portfolio', image: 'https://images.unsplash.com/photo-1545665277-5937489579f2?w=1200&auto=format&fit=crop&q=80', link: 'https://ke19portfolio.netlify.app/', gridArea: 'span 1 / span 1', height: '420px' }
];

const Portfolio = () => {
  const containerRefs = useRef([]);
  const imgRefs = useRef([]);
  const cardRefs = useRef([]);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setBgLoaded(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px' });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // 1. Reveal Animation (Height expansion for image mask inside card)
    containerRefs.current.forEach((container, i) => {
      if (!container) return;
      const img = imgRefs.current[i];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true
        }
      });

      tl.fromTo(container,
        { height: 0 },
        { height: '180px', duration: 1.5, ease: "expo.inOut" } // height of image zone is 180px
      );

      tl.fromTo(img,
        { scale: 1.5 },
        { scale: 1, duration: 1.5, ease: "expo.inOut" },
        "<"
      );
    });

    // 2. Parallax effect on the sticky robot background image
    const parallaxTween = gsap.to('.robot-bg-image', {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: {
        trigger: '#portfolio',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // 3. Very lightweight canvas particle rendering (Max 15-20 particles)
    const canvas = canvasRef.current;
    let animationFrameId;
    let particles = [];
    let handleResize;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      
      handleResize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);

      // Initialize exactly 18 ambient floating particles
      const particleCount = 18;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.8,
          speedX: (Math.random() - 0.5) * 0.12,
          speedY: -(Math.random() * 0.2 + 0.05),
          opacity: Math.random() * 0.3 + 0.15
        });
      }

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fill();
          
          p.x += p.speedX;
          p.y += p.speedY;
          
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }
        
        animationFrameId = requestAnimationFrame(drawParticles);
      };

      drawParticles();
    }

    // 4. Entrance animation timeline (Text block first, cards staggered after)
    const entryTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#portfolio',
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play reverse play reverse'
      }
    });

    entryTimeline.fromTo('.portfolio-heading-block',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' }
    );

    entryTimeline.fromTo('.port-card',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
      '-=0.6'
    );

    // 5. Premium 3D Tilt and Shadow expansion on card hover
    const eventCleanups = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const img = imgRefs.current[index];
      let rect = null;

      const onMouseEnter = () => {
        rect = card.getBoundingClientRect();
        gsap.to(card, {
          y: -14,
          scale: 1.03,
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12), 0 0 25px rgba(0, 229, 255, 0.25)', // Visible black shadow with soft cyan outer glow on hover
          borderColor: 'rgba(0, 229, 255, 0.65)',
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto'
        });
        if (img) {
          gsap.to(img, {
            scale: 1.05,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      };

      const onMouseMove = (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = (x - xc) / xc;
        const dy = (y - yc) / yc;

        gsap.to(card, {
          rotateX: -dy * 4.5,
          rotateY: dx * 4.5,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      const onMouseLeave = () => {
        rect = null;
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          scale: 1,
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)', // Mild black drop shadow visible in default state
          borderColor: 'rgba(255, 255, 255, 0.35)',
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });
        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      };

      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);

      eventCleanups.push(() => {
        card.removeEventListener('mouseenter', onMouseEnter);
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      });
    });

    return () => {
      eventCleanups.forEach(cleanup => cleanup());
      
      if (parallaxTween.scrollTrigger) {
        parallaxTween.scrollTrigger.kill();
      }
      parallaxTween.kill();

      if (entryTimeline.scrollTrigger) {
        entryTimeline.scrollTrigger.kill();
      }
      entryTimeline.kill();

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} style={{ position: 'relative', backgroundColor: '#18bfd7', padding: '8rem 4%', overflow: 'hidden' }}>
      
      {/* ONE continuous shared background with the robot face */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, #22cee6 0%, #18bfd7 60%, #11a7bd 100%)',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        {/* Sticky Robot Face Wrapper - changed height to 100% to scale dynamically with the section */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100%',
          width: '100%',
          overflow: 'hidden'
        }}>
          {/* Robot background image - changed height/top to percentages to align relative to section container height */}
          <div
            className="robot-bg-image"
            style={{
              position: 'absolute',
              top: '-5%',
              left: '-5vw',
              width: '110vw',
              height: '110%',
              backgroundImage: bgLoaded ? `url('/images/page 4 background.png')` : 'none',
              backgroundPosition: 'left center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              willChange: 'transform'
            }}
          />
          
          {/* 3 Concentric Orbit Circles rotating behind robot */}
          <div className="orbit-container-1" />
          <div className="orbit-container-2">
            <div style={{ position: 'absolute', top: 0, left: '50%', width: '5px', height: '5px', backgroundColor: '#00E5FF', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 10px #00E5FF' }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', width: '5px', height: '5px', backgroundColor: '#00E5FF', borderRadius: '50%', transform: 'translate(-50%, 50%)', boxShadow: '0 0 10px #00E5FF' }} />
          </div>
          <div className="orbit-container-3">
            <div style={{ position: 'absolute', left: 0, top: '50%', width: '4px', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
          </div>
          
          {/* Ambient Breathing Radial Glow behind robot */}
          <div 
            className="ambient-robot-glow"
            style={{
              position: 'absolute',
              left: '12.5%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '45vw',
              height: '45vw',
              background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(0, 229, 255, 0) 70%)',
              zIndex: 2,
              pointerEvents: 'none',
            }} 
          />

          {/* Lightweight Ambient Canvas Particles */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 3
            }}
          />
        </div>
      </div>

      <style>{`
        .portfolio-grid-row {
          display: grid;
          grid-template-columns: 20% 20% 1fr; /* Uses fr to dynamically size card block and prevent overflow */
          gap: 2rem;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          align-items: center;
          position: relative;
          z-index: 2;
          transition: all 0.5s ease;
        }
        .portfolio-robot-column {
          pointer-events: none;
        }
        .portfolio-heading-block {
          position: relative;
          z-index: 2;
        }
        .portfolio-cards-block {
          display: flex;
          gap: 1.25rem;
          align-items: center;
          position: relative;
          z-index: 2;
          width: 100%;
        }
        @media (max-width: 1024px) {
          .portfolio-grid-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0;
            gap: 3rem;
          }
          .portfolio-robot-column {
            display: none;
          }
          .portfolio-heading-block {
            width: 100%;
          }
          .portfolio-cards-block {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
            gap: 2rem;
          }
        }
        
        .port-card {
          position: relative;
          will-change: transform;
          transform-style: preserve-3d;
          perspective: 1000px;
          border-radius: 36px !important; 
          border: 1.5px solid rgba(255, 255, 255, 0.35); 
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          padding: 20px; /* Standard 20px padding on all sides */
          box-sizing: border-box;
        }
        .port-card-glass-overlay {
          position: absolute;
          inset: 0;
          border-radius: 36px;
          pointer-events: none;
          z-index: 10;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        .port-img {
          transition: transform 0.6s ease;
        }
        .port-category {
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .port-title {
          transition: transform 0.4s ease 0.05s;
        }
        
        /* Concentric orbits centered around left 12.5% */
        .orbit-container-1 {
          position: absolute;
          top: 50%;
          left: 12.5%;
          width: 25vw;
          height: 25vw;
          margin-top: -12.5vw;
          margin-left: -12.5vw;
          border: 1.2px dashed rgba(255, 255, 255, 0.16);
          border-radius: 50%;
          animation: rotate-clockwise 45s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        .orbit-container-2 {
          position: absolute;
          top: 50%;
          left: 12.5%;
          width: 36vw;
          height: 36vw;
          margin-top: -18vw;
          margin-left: -18vw;
          border: 2px solid rgba(255, 255, 255, 0.12);
          border-radius: 50%;
          border-style: double dashed;
          animation: rotate-counter-clockwise 65s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        .orbit-container-3 {
          position: absolute;
          top: 50%;
          left: 12.5%;
          width: 46vw;
          height: 46vw;
          margin-top: -23vw;
          margin-left: -23vw;
          border: 1.5px dashed rgba(0, 229, 255, 0.22);
          border-radius: 50%;
          animation: rotate-clockwise 90s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes rotate-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotate-counter-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes orbit-pulse {
          0% { opacity: 0.35; }
          100% { opacity: 0.85; }
        }
        
        /* Ambient Breathing Glow Animation */
        @keyframes breathing-glow {
          0%, 100% {
            opacity: 0.35;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
        .ambient-robot-glow {
          animation: breathing-glow 10s ease-in-out infinite;
        }

        /* Autonomous staggered light sweeps looping every 3 seconds inside mask */
        .port-card-inner-mask::after {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.22) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          pointer-events: none;
          z-index: 8;
          will-change: left;
        }
        .port-card-inner-mask.sweep-0::after {
          animation: border-sweep 3s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          animation-delay: 0s;
        }
        .port-card-inner-mask.sweep-1::after {
          animation: border-sweep 3s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          animation-delay: 0.8s;
        }
        .port-card-inner-mask.sweep-2::after {
          animation: border-sweep 3s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          animation-delay: 1.6s;
        }
        @keyframes border-sweep {
          0% {
            left: -150%;
          }
          33% {
            left: 150%;
          }
          100% {
            left: 150%;
          }
        }

        /* Card Arrow Hover transitions */
        .port-card:hover .port-arrow-btn {
          background: rgba(255, 255, 255, 0.35) !important;
          border-color: rgba(0, 229, 255, 0.85) !important;
          box-shadow: 0 4px 15px rgba(0, 50, 60, 0.35), 0 0 20px rgba(0, 229, 255, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
          transform: scale(1.1) !important;
        }
        .port-card:hover .port-arrow-icon {
          transform: translateX(4px);
          stroke: #FFFFFF !important; /* Retain white color on hover */
        }
        
        /* CTA Button Hover transitions */
        .portfolio-cta-btn:hover {
          color: white !important;
          background: rgba(255, 255, 255, 0.22) !important;
          border-color: rgba(0, 229, 255, 0.6) !important;
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.4), 0 8px 25px rgba(0, 0, 0, 0.2) !important;
          transform: translateY(-2px) !important;
        }
        .portfolio-cta-btn:hover .cta-arrow-icon {
          transform: translateX(4px);
          stroke: white !important;
        }
      `}</style>

      <div className="portfolio-grid-row">
        
        {/* Column 1: Spacer for background robot */}
        <div className="portfolio-robot-column" />

        {/* Column 2: Heading Block (~20% width) */}
        <div className="portfolio-heading-block">
          <div 
            className="reveal" 
            style={{ 
              color: '#0B6B79', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase', 
              marginBottom: '18px', 
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.15)'
            }}
          >
            Selected Work
          </div>
          
          <div style={{ marginBottom: '20px' }}> 
            <AnimatedHeading
              text={"Projects That \n Speak Volumes"}
              mode="scramble"
              style={{ 
                color: 'white', 
                fontSize: 'clamp(2.2rem, 3.2vw, 3rem)', 
                lineHeight: 1.1, 
                fontWeight: 900, 
                letterSpacing: '-0.02em',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.35)'
              }}
            />
          </div>

          <p style={{
            color: '#0B6B79', 
            fontSize: '1.08rem', 
            fontWeight: 500, 
            lineHeight: 1.55, 
            margin: '0 0 28px 0', 
            maxWidth: '380px',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.35)' 
          }}>
            Every project listed here was engineered end-to-end by our team, from initial strategy through to production deployment.
          </p>

          <a 
            href="#contact" 
            className="portfolio-cta-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.8rem 1.6rem',
              borderRadius: '30px',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              color: 'white', 
              textDecoration: 'none',
              fontSize: '0.8rem', 
              fontWeight: 800, 
              letterSpacing: '0.05em',
              boxShadow: '0 0 12px rgba(0, 229, 255, 0.25)',
              transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
              cursor: 'none'
            }}
          >
            <span>Explore All Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cta-arrow-icon" style={{ transition: 'transform 0.3s ease' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        {/* Column 3: Cards Block (~60% dynamic width) */}
        <div className="portfolio-cards-block">
          
          {/* Overlapping Orbits behind cards */}
          <div className="cards-orbit-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            <div className="card-orbit-a" style={{
              position: 'absolute',
              right: '-10%',
              top: '50%',
              width: '45vw',
              height: '45vw',
              borderRadius: '50%',
              border: '1.5px dashed rgba(0, 229, 255, 0.12)',
              transform: 'translateY(-50%)',
              animation: 'rotate-clockwise 50s linear infinite'
            }}>
              <div style={{ position: 'absolute', top: '12%', left: '12%', width: '8px', height: '8px', backgroundColor: 'rgba(0, 229, 255, 0.7)', borderRadius: '50%', boxShadow: '0 0 12px #00E5FF', animation: 'orbit-pulse 2s infinite alternate' }} />
            </div>
            <div className="card-orbit-b" style={{
              position: 'absolute',
              right: '25%',
              top: '40%',
              width: '35vw',
              height: '35vw',
              borderRadius: '50%',
              border: '1px dashed rgba(255, 255, 255, 0.08)',
              transform: 'translateY(-50%)',
              animation: 'rotate-counter-clockwise 70s linear infinite'
            }}>
              <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: '6px', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '50%', boxShadow: '0 0 10px #FFFFFF', animation: 'orbit-pulse 3s infinite alternate' }} />
            </div>
          </div>

          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={el => cardRefs.current[index] = el}
              className="portfolio-item port-card"
              style={{
                display: 'block',
                position: 'relative',
                overflow: 'visible', // Changed to visible so shadows are NOT clipped by overflow
                textDecoration: 'none',
                cursor: 'none',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)', // Increased default drop shadow opacity to 20% for visible black drop shadow
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                height: project.height,
                borderRadius: '36px',
                border: '1.5px solid rgba(255, 255, 255, 0.35)', 
                boxSizing: 'border-box',
                flex: 1
              }}
            >
              {/* Inner mask container for sweep animation (prevents overflow leak while allowing outer card shadow) */}
              <div className={`port-card-inner-mask sweep-${index}`} style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '36px',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 1
              }} />

              {/* 1px glass border overlay for luxury depth */}
              <div className="port-card-glass-overlay" />

              {/* Top Zone: Image Only, padded inside the card */}
              <div
                ref={el => containerRefs.current[index] = el}
                style={{ width: '100%', overflow: 'hidden', position: 'relative', height: '180px', borderRadius: '20px', marginBottom: '20px', zIndex: 2 }}
              >
                {/* Image */}
                <img
                  ref={el => imgRefs.current[index] = el}
                  src={project.image}
                  alt={project.title}
                  className="port-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Bottom Zone: Content Panel, Centered Alignment, padded bottom by 55px to prevent overlay */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'center',
                flexGrow: 1,
                paddingBottom: '55px',
                zIndex: 2
              }}>
                <div className="port-category" style={{ color: '#0B6B79', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {project.category}
                </div>
                <h3 className="port-title" style={{ color: 'white', fontSize: '1.4rem', margin: '0 0 10px 0', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.25, textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
                  {project.title}
                </h3>
              </div>

              {/* Bottom Center Circular Glass Arrow Button Flanked by Horizontal Fading Lines - Absolutely positioned relative to the outer .port-card container for pixel-perfect vertical alignment */}
              <div className="port-arrow-divider-row" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'calc(100% - 40px)', // Takes full width minus card's left/right padding
                position: 'absolute',
                bottom: '22px', // Locked exactly 22px from the bottom edge of every card container
                left: '20px',
                right: '20px',
                height: '46px',
                zIndex: 5
              }}>
                {/* Left fading line */}
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(255,255,255,0.45), rgba(255,255,255,0))' }} />
                
                {/* Circular Button - Elevated contrast background and border */}
                <div className="port-arrow-btn" style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.22)', // More opaque white background
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.6)', // Higher opacity white border
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 50, 60, 0.25), 0 0 10px rgba(0, 229, 255, 0.35)', // Prominent drop shadow and cyan outer glow
                  transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                  zIndex: 2,
                  margin: '0 0.8rem'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="port-arrow-icon" style={{ transition: 'transform 0.4s ease' }}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>

                {/* Right fading line */}
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0))' }} />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
