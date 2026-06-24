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
    accent: '#7000FF'
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
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    const cards = cardsRef.current;

    if (!section || !scrollContainer) return;

    // 1. Horizontal Scroll Pinning
    const totalWidth = scrollContainer.scrollWidth - window.innerWidth;
    
    const scrollTween = gsap.to(scrollContainer, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1, // Smooth scrubbing
        start: "top top",
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true
      }
    });

    // 2. Velocity-based Skew Effect (Ultra-Premium Physics)
    let proxy = { skew: 0 };
    let skewSetter = gsap.quickSetter(cards, "skewX", "deg"); // Fast DOM updater
    let clamp = gsap.utils.clamp(-20, 20); // Limit maximum skew

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${totalWidth}`,
      onUpdate: (self) => {
        // Calculate skew based on scroll velocity
        // self.getVelocity() returns pixels per second
        const velocity = self.getVelocity();
        // Scale down the velocity drastically to get a nice small degree amount
        const skewAmount = clamp(velocity / -150);
        
        // Animate proxy to smooth out the physics
        gsap.to(proxy, {
          skew: skewAmount,
          duration: 0.8,
          ease: "power3",
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew)
        });
      }
    });

    // Bring skew back to 0 when scrolling stops
    const makeZero = () => {
      gsap.to(proxy, {
        skew: 0,
        duration: 0.8,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewSetter(proxy.skew)
      });
    };

    ScrollTrigger.addEventListener("scrollEnd", makeZero);

    return () => {
      ScrollTrigger.removeEventListener("scrollEnd", makeZero);
      if (scrollTween) scrollTween.kill();
      ScrollTrigger.getAll().forEach(t => {
        if(t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      style={{ 
        height: '100vh', 
        backgroundColor: '#050505', // Dark premium background
        color: '#FFFFFF',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      
      {/* Background massive ambient typography */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '5%',
        transform: 'translateY(-50%)',
        fontSize: 'clamp(8rem, 20vw, 25rem)',
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        color: 'rgba(255,255,255,0.02)',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        zIndex: 0
      }}>
        SERVICES
      </div>

      <div style={{ position: 'absolute', top: '5rem', left: '5rem', zIndex: 10 }}>
        <div className="section-label reveal" style={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}>
          <span className="pulse-dot" style={{ background: '#00E5FF' }}></span> Core Capabilities
        </div>
        <AnimatedHeading 
          text="Engineered for \n Market Dominance" 
          mode="mask" 
          style={{ color: '#FFFFFF', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, fontWeight: 900, letterSpacing: '-0.02em', marginTop: '1rem' }} 
        />
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: '5rem',
          height: '100%',
          alignItems: 'center',
          paddingLeft: '50vw', // Start half-screen offset
          paddingRight: '20vw',
          width: 'max-content',
          willChange: 'transform',
          zIndex: 2,
          position: 'relative'
        }}
      >
        {services.map((service, index) => (
          <div 
            key={index}
            ref={el => cardsRef.current[index] = el}
            style={{
              width: '600px',
              height: '70vh',
              backgroundColor: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '24px',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              transformOrigin: 'bottom center', // Important for skewing naturally
              willChange: 'transform'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: service.accent }}>
                {service.num}
              </span>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="10 5 19 5 19 14"></polyline>
                </svg>
              </div>
            </div>

            <h3 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '2rem', fontWeight: 800 }}>
              {service.title}
            </h3>

            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 'auto' }}>
              {service.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '3rem' }}>
              {service.tags.map((tag, j) => (
                <span key={j} style={{
                  padding: '0.4rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Hover Image Overlay via pseudo-element is cool, but a simple embedded image works beautifully for performance */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1,
              opacity: 0.1, borderRadius: '24px', overflow: 'hidden'
            }}>
              <img src={service.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

export default Services;
