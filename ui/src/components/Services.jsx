import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from './AnimatedHeading';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Immersive Web Platforms',
    description: 'We architect high-performance websites with cinematic visuals, buttery scroll physics, and sub-second load times. Every pixel is intentional.',
    tags: ['React', 'Next.js', 'GSAP', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    accent: '#B066FF'
  },
  {
    num: '02',
    title: 'Mobile App Engineering',
    description: 'Cross-platform mobile applications engineered for scale. From fintech dashboards to e-commerce ecosystems, we ship production-grade apps.',
    tags: ['React Native', 'iOS', 'Android', 'Flutter'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    accent: '#00E5FF'
  },
  {
    num: '03',
    title: 'Brand & Visual Identity',
    description: 'Complete brand ecosystems — from strategic logo design to typography systems, color theory, and comprehensive brand guidelines.',
    tags: ['Logo Design', 'UI/UX', 'Figma', 'Design Systems'],
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    accent: '#FF2A54'
  },
  {
    num: '04',
    title: 'Performance Marketing',
    description: 'Data-obsessed growth strategies. We combine creative with analytics to engineer campaigns that convert browsers into loyal customers.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    accent: '#FF8800'
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const rightColRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const rightCol = rightColRef.current;
    const scrollContainer = scrollContainerRef.current;
    const cards = cardsRef.current;

    if (!section || !rightCol || !scrollContainer) return;

    // 3D Cylinder configuration properties
    const radius = 550; // Curves beautifully in 3D
    const angleStep = 55; // 55 degree separation between cards
    const maxIndex = services.length - 1;
    const totalRotationY = maxIndex * angleStep; // 165 degrees total span

    // Drives vertical scrolling space for the timeline
    const scrollLength = maxIndex * 600;

    // Set static starting layout on the cards
    cards.forEach((card, idx) => {
      if (card) {
        card.style.transform = `translate3d(-50%, -50%, 0) rotateY(${idx * angleStep}deg) translateZ(${radius}px)`;
        card.style.opacity = idx === 0 ? '1' : '0.2';
      }
    });

    // 1. GSAP ScrollTrigger to rotate the 3D track
    const rotationObj = { y: 0 };
    const scrollTween = gsap.to(rotationObj, {
      y: -totalRotationY,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: () => `+=${scrollLength}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const baseAngle = rotationObj.y;
          // Spin container in 3D
          scrollContainer.style.transform = `translate3d(-50%, -50%, ${-radius}px) rotateY(${baseAngle}deg)`;
          
          // Apply dynamic opacity depth fade
          cards.forEach((card, idx) => {
            if (card) {
              const theta = baseAngle + idx * angleStep;
              let normalizedTheta = theta % 360;
              if (normalizedTheta > 180) normalizedTheta -= 360;
              if (normalizedTheta < -180) normalizedTheta += 360;
              
              const absTheta = Math.abs(normalizedTheta);
              const opacity = gsap.utils.clamp(0.08, 1, 1 - absTheta / 120);
              card.style.opacity = opacity.toFixed(3);
              
              // Prevent interactions with out-of-focus background cards
              if (absTheta > 45) {
                card.style.pointerEvents = 'none';
              } else {
                card.style.pointerEvents = 'auto';
              }
            }
          });
        }
      }
    });

    const scrollTrigger = scrollTween.scrollTrigger;

    // 2. Horizontal Drag and Snapping Interaction mapped to page scroll
    let isDragging = false;
    let startMouseX = 0;
    let startScrollY = 0;

    const getRatio = () => {
      if (!scrollTrigger) return 1.5;
      const scrollRange = scrollTrigger.end - scrollTrigger.start;
      return totalRotationY / scrollRange;
    };

    const handleMouseDown = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      isDragging = true;
      startMouseX = e.clientX;
      startScrollY = window.scrollY;
      gsap.killTweensOf(window);
    };

    const handleMouseMove = (e) => {
      if (!isDragging || !scrollTrigger) return;
      const deltaX = e.clientX - startMouseX;
      const ratio = getRatio();
      const scrollDelta = -deltaX / ratio;
      const targetScrollY = Math.max(
        scrollTrigger.start,
        Math.min(scrollTrigger.end, startScrollY + scrollDelta)
      );
      window.scrollTo(0, targetScrollY);
    };

    const handleMouseUpOrLeave = () => {
      if (!isDragging || !scrollTrigger) return;
      isDragging = false;

      const scrollRange = scrollTrigger.end - scrollTrigger.start;
      const currentScroll = window.scrollY - scrollTrigger.start;
      const progress = currentScroll / scrollRange;
      const nearestIndex = Math.round(progress * maxIndex);
      const clampedIndex = Math.max(0, Math.min(nearestIndex, maxIndex));

      const snapScrollY = scrollTrigger.start + (clampedIndex / maxIndex) * scrollRange;

      const scrollObj = { y: window.scrollY };
      gsap.to(scrollObj, {
        y: snapScrollY,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y);
        }
      });
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && scrollTrigger) {
        e.preventDefault();
        window.scrollBy(0, e.deltaX * 1.5);
      }
    };

    rightCol.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUpOrLeave);
    rightCol.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (scrollTween) scrollTween.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === section) t.kill();
      });
      rightCol.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUpOrLeave);
      rightCol.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      style={{ 
        height: '100vh', 
        backgroundColor: '#050505', 
        color: '#FFFFFF',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%'
      }}
    >
      {/* Live Volumetric Light Rays Background */}
      <div className="services-rays-bg">
        <div className="ray-glow" />
        <div className="ray ray-1" />
        <div className="ray ray-2" />
        <div className="ray ray-3" />
      </div>

      {/* LEFT COLUMN (STATIC — NEVER MOVES) */}
      <div 
        style={{ 
          width: '42%', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          paddingLeft: 'clamp(2rem, 6vw, 5rem)', 
          zIndex: 20, 
          position: 'relative',
          backgroundColor: 'transparent',
          overflow: 'visible'
        }}
      >
        <div className="section-label reveal" style={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.2)', marginBottom: '1.5rem' }}>
          <span className="pulse-dot" style={{ background: '#00E5FF' }}></span> Core Capabilities
        </div>
        
        <AnimatedHeading 
          text="Engineered for \n Market \n Dominance" 
          mode="mask" 
          style={{ 
            color: '#FFFFFF', 
            fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', 
            lineHeight: 1.1, 
            fontWeight: 900, 
            letterSpacing: '-0.02em', 
            margin: 0 
          }} 
        />
      </div>

      {/* RIGHT COLUMN (3D Viewport) */}
      <div 
        ref={rightColRef}
        style={{ 
          width: '58%', 
          height: '100%', 
          position: 'relative', 
          overflow: 'hidden', 
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          perspective: '2000px',
          perspectiveOrigin: '50% 50%'
        }}
      >
        {/* 3D Rotating Cylinder Track */}
        <div 
          ref={scrollContainerRef}
          style={{
            position: 'absolute',
            left: '46%', // Center of rotation relative to right viewport
            top: '50%',
            transform: 'translate3d(-50%, -50%, -550px) rotateY(0deg)',
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform',
            pointerEvents: 'none' // enable clicking straight through container to cards
          }}
        >
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="glass-card-dark"
              style={{
                width: 'min(440px, 80vw)', // Snug fit for beautiful rotation curve
                height: '62vh',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate3d(-50%, -50%, 0) rotateY(${index * 55}deg) translateZ(550px)`,
                transformOrigin: '50% 50%',
                willChange: 'transform',
                userSelect: 'none',
                backfaceVisibility: 'hidden',
                pointerEvents: 'auto'
              }}
            >
              {/* Card Image element (Fully visible at the top) */}
              <div style={{
                width: '100%',
                height: '42%',
                borderRadius: '14px',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                position: 'relative'
              }}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(5, 5, 10, 0.65)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: service.accent
                }}>
                  {service.num}
                </div>
              </div>

              {/* Card Text details below the image */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.65rem', lineHeight: 1.2, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    {service.title}
                  </h3>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginLeft: '1rem'
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="19" x2="19" y2="5"></line>
                      <polyline points="10 5 19 5 19 14"></polyline>
                    </svg>
                  </div>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 'auto' }}>
                  {service.description}
                </p>

                {/* Tags list */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                  {service.tags.map((tag, j) => (
                    <span key={j} style={{
                      padding: '0.3rem 0.8rem',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.9)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
