import React, { useRef, useEffect, useState } from 'react';
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
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const shadowRefs = useRef([]);

  const [isMobile, setIsMobile] = useState(false);

  // Screen size tracking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // --- Mobile Layout Setup ---
    if (isMobile) {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray('.service-card-mobile');
        cards.forEach((card) => {
          gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      });
      return () => ctx.revert();
    }

    // --- Desktop 3D Cylinder Animation ---
    const section = sectionRef.current;
    const rightCol = rightColRef.current;
    const scrollContainer = scrollContainerRef.current;
    const cards = cardsRef.current;

    if (!section || !rightCol || !scrollContainer) return;

    // 3D Cylinder configuration properties
    const getRadius = () => Math.min(550, window.innerWidth * 0.35);
    let radius = getRadius();
    const angleStep = 55; // 55 degree separation between cards
    const maxIndex = services.length - 1;
    const totalRotationY = maxIndex * angleStep; // 165 degrees total span

    // Drives vertical scrolling space for the timeline
    const scrollLength = maxIndex * 600;

    const updateCardTransforms = (baseAngle) => {
      cards.forEach((card, idx) => {
        if (card) {
          const theta = baseAngle + idx * angleStep;
          let normalizedTheta = theta % 360;
          if (normalizedTheta > 180) normalizedTheta -= 360;
          if (normalizedTheta < -180) normalizedTheta += 360;
          
          const absTheta = Math.abs(normalizedTheta);
          const cardOpacity = gsap.utils.clamp(0.08, 1, 1 - absTheta / 120);
          
          card.style.transform = `translate3d(-50%, -50%, 0) rotateY(${idx * angleStep}deg) translateZ(${radius}px)`;
          card.style.opacity = cardOpacity.toFixed(3);
          card.style.boxShadow = 'none';

          // Floor shadow element — lives in 3D space with the card
          const shadow = shadowRefs.current[idx];
          if (shadow) {
            // Shadow shifts left/right as card rotates
            const shiftX = normalizedTheta * 1.8;
            // Shadow shrinks/grows with proximity
            const shadowScale = gsap.utils.clamp(0.4, 1, 1 - absTheta / 180);
            // Shadow darkens for front card
            const shadowOpacity = gsap.utils.clamp(0, 0.55, 0.55 - absTheta / 200);
            shadow.style.transform = `translateX(calc(-50% + ${shiftX}px)) scaleX(${shadowScale.toFixed(3)})`;
            shadow.style.opacity = shadowOpacity.toFixed(3);
          }
          
          // Prevent interactions with out-of-focus background cards
          if (absTheta > 45) {
            card.style.pointerEvents = 'none';
          } else {
            card.style.pointerEvents = 'auto';
          }
        }
      });
    };

    let scrollTriggerInstance = null;
    const rotationObj = { y: 0 };

    const ctx = gsap.context(() => {
      // Set static starting layout on the cards and scroll container immediately on load
      scrollContainer.style.transform = `translate3d(-50%, -50%, ${-radius}px) rotateY(0deg)`;
      updateCardTransforms(0);

      // 1. GSAP ScrollTrigger to rotate the 3D track
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
            scrollContainer.style.transform = `translate3d(-50%, -50%, ${-radius}px) rotateY(${baseAngle}deg)`;
            updateCardTransforms(baseAngle);
          }
        }
      });

      scrollTriggerInstance = scrollTween.scrollTrigger;

      // Animate Left Column (Fade and Slide) with replay on scroll up/down
      const leftCol = leftColRef.current;
      if (leftCol) {
        gsap.fromTo(leftCol,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: () => `+=${scrollLength + 500}`,
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger to calculate offsets correctly on load
    ScrollTrigger.refresh();

    // Dynamic resize handler
    const handleResize = () => {
      radius = getRadius();
      scrollContainer.style.transform = `translate3d(-50%, -50%, ${-radius}px) rotateY(${rotationObj.y}deg)`;
      updateCardTransforms(rotationObj.y);
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 2. Horizontal Drag and Snapping Interaction mapped to page scroll
    let isDragging = false;
    let startMouseX = 0;
    let startScrollY = 0;

    const getRatio = () => {
      if (!scrollTriggerInstance) return 1.5;
      const scrollRange = scrollTriggerInstance.end - scrollTriggerInstance.start;
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
      if (!isDragging || !scrollTriggerInstance) return;
      const deltaX = e.clientX - startMouseX;
      const ratio = getRatio();
      const scrollDelta = -deltaX / ratio;
      const targetScrollY = Math.max(
        scrollTriggerInstance.start,
        Math.min(scrollTriggerInstance.end, startScrollY + scrollDelta)
      );
      window.scrollTo(0, targetScrollY);
    };

    const handleMouseUpOrLeave = () => {
      if (!isDragging || !scrollTriggerInstance) return;
      isDragging = false;

      const scrollRange = scrollTriggerInstance.end - scrollTriggerInstance.start;
      const currentScroll = window.scrollY - scrollTriggerInstance.start;
      const progress = currentScroll / scrollRange;
      const nearestIndex = Math.round(progress * maxIndex);
      const clampedIndex = Math.max(0, Math.min(nearestIndex, maxIndex));

      const snapScrollY = scrollTriggerInstance.start + (clampedIndex / maxIndex) * scrollRange;

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
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && scrollTriggerInstance) {
        e.preventDefault();
        window.scrollBy(0, e.deltaX * 1.5);
      }
    };

    rightCol.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUpOrLeave, { passive: true });
    rightCol.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      rightCol.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUpOrLeave);
      rightCol.removeEventListener('wheel', handleWheel);
    };
  }, [isMobile]);

  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`;

  if (isMobile) {
    return (
      <div 
        ref={wrapperRef}
        className="services-wrapper" 
        style={{ 
          width: '100%', 
          backgroundColor: '#C8C8C8',
          position: 'relative',
          padding: '6rem 1.5rem',
          scrollMarginTop: '80px'
        }}
      >
        {/* Live Animated Paper Overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: paperTexture,
            backgroundSize: '250px 250px',
            opacity: 0.8,
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', margin: '0 auto' }}>
          {/* Header */}
          <div className="section-label" style={{ color: '#111', borderColor: 'rgba(0,0,0,0.2)', marginBottom: '1.5rem', display: 'inline-block', width: 'fit-content', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            <span className="pulse-dot" style={{ background: '#FF2A54', display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '10px' }}></span> Core Capabilities
          </div>
          
          <h2 style={{ 
            color: '#111111', 
            fontSize: 'clamp(2.2rem, 8vw, 3.2rem)', 
            lineHeight: 1.15, 
            fontWeight: 900, 
            letterSpacing: '-0.02em', 
            marginBottom: '3rem'
          }}>
            Engineered for <br/> Market Dominance
          </h2>

          {/* Cards Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {services.map((service, index) => (
              <div 
                key={index}
                className="service-card-mobile"
                style={{
                  width: '100%',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255, 0.78)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Accent line indicator at the top */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: service.accent
                }} />

                {/* Card Image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: '12px',
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
                    backgroundColor: 'rgba(5, 5, 10, 0.75)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '30px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    color: service.accent
                  }}>
                    {service.num}
                  </div>
                </div>

                {/* Card Info */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.5rem', lineHeight: 1.2, fontWeight: 800, color: '#111111', margin: 0 }}>
                      {service.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: 'rgba(0,0,0,0.65)', lineHeight: 1.5, margin: 0 }}>
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                    {service.tags.map((tag, j) => (
                      <span key={j} style={{
                        padding: '0.3rem 0.8rem',
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.08)',
                        borderRadius: '50px',
                        fontSize: '0.72rem',
                        color: 'rgba(0,0,0,0.7)'
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
      </div>
    );
  }

  return (
    <div 
      ref={wrapperRef}
      className="services-wrapper" 
      style={{ 
        width: '100%', 
        background: '#C8C8C8',
        position: 'relative'
      }}
    >
      {/* Live Animated Paper Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: '-200%',
          backgroundImage: paperTexture,
          backgroundSize: '250px 250px',
          opacity: 0.8,
          pointerEvents: 'none',
          animation: 'paperDrift 40s linear infinite'
        }}
      />
      <style>{`
        @keyframes paperDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50%, 50%); }
        }
      `}</style>
 
      <section 
        id="services" 
        ref={sectionRef} 
        style={{ 
          height: '100vh', 
          color: '#111111',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          width: '100%',
          scrollMarginTop: '80px'
        }}
      >
        {/* LEFT COLUMN (STATIC — NEVER MOVES) */}
        <div 
          ref={leftColRef}
          style={{ 
            width: '42%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            paddingLeft: 'clamp(2rem, 6vw, 5rem)', 
            paddingTop: '5rem',
            paddingBottom: '0',
            zIndex: 20, 
            position: 'relative',
            backgroundColor: 'transparent',
            overflow: 'visible',
            opacity: 1
          }}
        >
          <div className="section-label" style={{ color: '#111', borderColor: 'rgba(0,0,0,0.2)', marginBottom: '1.5rem', display: 'inline-block', width: 'fit-content', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            <span className="pulse-dot" style={{ background: '#FF2A54', display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '10px' }}></span> Core Capabilities
          </div>
          
          <AnimatedHeading 
            text="Engineered for \n Market \n Dominance" 
            mode="mask" 
            style={{ 
              color: '#111111', 
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
            perspectiveOrigin: '50% 58%',
            paddingTop: '5rem'
          }}
        >
          {/* 3D Rotating Cylinder Track */}
          <div 
            ref={scrollContainerRef}
            style={{
              position: 'absolute',
              left: '46%',
              top: 'calc(50% + 40px)',
              transform: 'translate3d(-50%, -50%, -550px) rotateY(0deg)',
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              willChange: 'transform',
              pointerEvents: 'none'
            }}
          >
            {services.map((service, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="glass-card"
                style={{
                  width: 'min(440px, 80vw)',
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
                  pointerEvents: 'auto',
                  backgroundColor: 'rgba(255, 255, 255, 0.72)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: 'none'
                }}
              >
                {/* Floor shadow — sits below the card in 3D space */}
                <div
                  ref={el => shadowRefs.current[index] = el}
                  style={{
                    position: 'absolute',
                    bottom: '-60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '50px',
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 75%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: -1,
                    opacity: 0.5,
                    filter: 'blur(4px)',
                    transformOrigin: 'center center'
                  }}
                />
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
                    <h3 style={{ fontSize: '1.65rem', lineHeight: 1.2, fontWeight: 800, color: '#111111', margin: 0 }}>
                      {service.title}
                    </h3>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      border: '1px solid rgba(0,0,0,0.1)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginLeft: '1rem'
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="19" x2="19" y2="5"></line>
                        <polyline points="10 5 19 5 19 14"></polyline>
                      </svg>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.65)', lineHeight: 1.5, marginBottom: 'auto' }}>
                    {service.description}
                  </p>

                  {/* Tags list */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                    {service.tags.map((tag, j) => (
                      <span key={j} style={{
                        padding: '0.3rem 0.8rem',
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.08)',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        color: 'rgba(0,0,0,0.7)'
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
    </div>
  );
};

export default Services;
