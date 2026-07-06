import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';

const servicesList = [
  {
    title: "Web Platforms",
    subtitle: "IMMERSIVE DIGITAL EXPERIENCES",
  },
  {
    title: "Mobile Engineering",
    subtitle: "NATIVE & CROSS-PLATFORM",
  },
  {
    title: "Brand Identity",
    subtitle: "SYSTEMS & STRATEGY",
  },
  {
    title: "Growth Marketing",
    subtitle: "DATA-DRIVEN DOMINANCE",
  }
];

const Services = () => {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // References for right-side visual containers and their interactive elements
  const visualRefs = useRef([]);
  const bgRef = useRef(null);
  
  // Interactive element refs
  const followerImageRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  const morphShapeRef = useRef(null);
  const cardGroupRef = useRef(null);

  // Mouse tracking state for GSAP ticker
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, normalizedX: 0, normalizedY: 0 });

  const handleMouseEnter = useCallback((index) => {
    if (index === activeIdx) return;
    setActiveIdx(index);
  }, [activeIdx]);

  const handleMouseMove = useCallback((e) => {
    // We only need local coordinates relative to the right panel for some effects
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
    
    // Normalized coordinates (-1 to 1)
    mouseRef.current.normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
  }, []);

  // Main Effect: Handle visibility and background color changes when activeIdx changes
  useEffect(() => {
    const activeVisual = visualRefs.current[activeIdx];
    
    // Hide all visuals
    visualRefs.current.forEach((el, i) => {
      if (i !== activeIdx && el) {
        gsap.to(el, { opacity: 0, scale: 0.95, duration: 0.6, ease: "power2.out", pointerEvents: 'none' });
      }
    });

    // Show active visual
    if (activeVisual) {
      gsap.to(activeVisual, { opacity: 1, scale: 1, duration: 0.8, ease: "expo.out", pointerEvents: 'auto' });
    }

    // Background shift logic
    if (activeIdx === 2) {
      // Brand Identity: Premium Deep Violet
      gsap.to(bgRef.current, { backgroundColor: '#0a0214', duration: 0.6, ease: "power2.out" });
    } else {
      gsap.to(bgRef.current, { backgroundColor: '#050508', duration: 0.6, ease: "power2.out" });
    }

    // Entrance animations for specific visuals
    if (activeIdx === 3 && cardGroupRef.current) {
      const cards = cardGroupRef.current.querySelectorAll('.fan-card');
      gsap.fromTo(cards[0], { x: 0, y: 0, rotation: 0 }, { x: -80, y: 30, rotation: -20, duration: 0.8, ease: "back.out(1.2)" });
      gsap.fromTo(cards[1], { x: 0, y: 0, rotation: 0 }, { x: 0, y: 0, rotation: 0, duration: 0.8, ease: "back.out(1.2)" });
      gsap.fromTo(cards[2], { x: 0, y: 0, rotation: 0 }, { x: 80, y: 30, rotation: 20, duration: 0.8, ease: "back.out(1.2)" });
    }

  }, [activeIdx]);

  // High-Performance GSAP Ticker for all Mouse Physics
  useEffect(() => {
    // 0: Liquid Follower Setup
    const xTo = gsap.quickTo(followerImageRef.current, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(followerImageRef.current, "y", { duration: 0.8, ease: "power3" });

    // 1: Marquee Setup
    let marqueeProgress = 0;
    
    const updatePhysics = () => {
      const { normalizedX, normalizedY } = mouseRef.current;

      // Effect 0: Liquid Follower
      if (activeIdx === 0 && followerImageRef.current) {
        xTo(normalizedX * 250);
        yTo(normalizedY * 250);
        gsap.to(followerImageRef.current, {
          rotationX: -normalizedY * 25,
          rotationY: normalizedX * 25,
          scale: 1.1 + Math.abs(normalizedX * 0.1),
          duration: 0.5,
          ease: "power2.out"
        });
      }

      // Effect 1: Kinetic Marquee
      if (activeIdx === 1 && marqueeContainerRef.current) {
        // Base speed + massive mouse influence
        const speed = 2 + (normalizedX * 8); 
        marqueeProgress += speed;
        gsap.set(marqueeContainerRef.current, { 
          x: -(marqueeProgress % 2500),
          skewX: -speed * 2 // Text physically leans into the speed!
        });
      }

      // Effect 2: Morphing Shape
      if (activeIdx === 2 && morphShapeRef.current) {
        gsap.to(morphShapeRef.current, {
          rotationX: normalizedY * 80,
          rotationY: normalizedX * 80,
          skewX: normalizedX * 30,
          skewY: normalizedY * 30,
          scale: 1 + Math.abs(normalizedX * 0.2),
          duration: 0.4,
          ease: "power1.out"
        });
      }

      // Effect 3: 3D Perspective Cards
      if (activeIdx === 3 && cardGroupRef.current) {
        gsap.to(cardGroupRef.current, {
          rotationX: -normalizedY * 40,
          rotationY: normalizedX * 40,
          z: 50,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    };

    gsap.ticker.add(updatePhysics);

    return () => {
      gsap.ticker.remove(updatePhysics);
    };
  }, [activeIdx]);

  return (
    <section 
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem 2rem',
        overflow: 'hidden'
      }}
    >
      {/* Dynamic Background */}
      <div 
        ref={bgRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundColor: '#050508',
          transition: 'none'
        }} 
      />
      {/* Noise overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.25\'/%3E%3C/svg%3E")',
        mixBlendMode: 'overlay',
      }} />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: '4rem', height: '100%', alignItems: 'center' }}>
        
        {/* LEFT: Typography Accordion */}
        <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: 600 }}>// OUR EXPERTISE</p>
          
          {servicesList.map((service, index) => {
            const isActive = activeIdx === index;
            return (
              <div 
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                style={{
                  cursor: 'pointer',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  transition: 'padding 0.4s cubic-bezier(0.16,1,0.3,1)',
                  paddingLeft: isActive ? '3rem' : '0'
                }}
              >
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: isActive ? '#00E5FF' : 'rgba(255,255,255,0.3)', 
                  letterSpacing: '0.15em', 
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  transition: 'color 0.4s'
                }}>
                  {service.subtitle}
                </div>
                <h2 style={{ 
                  fontSize: 'clamp(2.5rem, 4.5vw, 5rem)', 
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  margin: 0,
                  color: isActive ? '#FFFFFF' : 'transparent',
                  WebkitTextStroke: isActive ? 'none' : '1px rgba(255,255,255,0.2)',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: 'left center',
                  letterSpacing: '-0.02em'
                }}>
                  {service.title}
                </h2>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Unique Interactive Physics Playground */}
        <div style={{ flex: '1', height: '600px', position: 'relative', overflow: 'hidden' }}>
          
          {/* VISUAL 0: Web Platforms - Liquid Follower */}
          <div 
            ref={el => visualRefs.current[0] = el}
            style={{ position: 'absolute', inset: 0, opacity: 1, scale: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Inner wrapper that moves with mouse */}
            <div 
              ref={followerImageRef}
              style={{ 
                width: '350px', height: '450px', borderRadius: '30px', overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,229,255,0.2)',
                willChange: 'transform',
                position: 'relative'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                alt="Web" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,229,255,0.3), transparent)' }} />
            </div>
          </div>

          {/* VISUAL 1: Mobile Engineering - Kinetic 3D Marquee */}
          <div 
            ref={el => visualRefs.current[1] = el}
            style={{ position: 'absolute', inset: 0, opacity: 0, scale: 0.95, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}
          >
            <div 
              style={{
                display: 'flex', flexDirection: 'column', gap: '1rem',
                transform: 'rotate(-5deg) scale(1.2)'
              }}
            >
              <div ref={marqueeContainerRef} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
                {[...Array(6)].map((_, i) => (
                  <h1 key={i} style={{ 
                    fontSize: '5rem', fontWeight: 900, color: 'transparent', 
                    WebkitTextStroke: '2px #FFF', margin: '0 30px', fontFamily: 'var(--font-display)',
                    opacity: 0.6
                  }}>
                    REACT NATIVE • SWIFT • KOTLIN • FLUTTER • DART •
                  </h1>
                ))}
              </div>
            </div>
            {/* Visual hint */}
            <div style={{ position: 'absolute', bottom: '2rem', width: '100%', textAlign: 'center', color: '#00E5FF', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              [ MOVE MOUSE TO CONTROL SPEED ]
            </div>
          </div>

          {/* VISUAL 2: Brand Identity - Morphing Neon Shape */}
          <div 
            ref={el => visualRefs.current[2] = el}
            style={{ position: 'absolute', inset: 0, opacity: 0, scale: 0.95, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1500px' }}
          >
            {/* The background of the whole section changes to neon purple! */}
            <div 
              ref={morphShapeRef}
              style={{ 
                width: '450px', height: '450px', 
                border: '6px solid #FFF', borderRadius: '60px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                willChange: 'transform',
                boxShadow: '0 0 80px rgba(255,255,255,0.4), inset 0 0 80px rgba(255,255,255,0.4)'
              }}
            >
              <div style={{ 
                width: '350px', height: '350px', 
                border: '4px dashed rgba(255,255,255,0.9)', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'spin 10s linear infinite reverse'
              }}>
                <div style={{ 
                  width: '200px', height: '200px', 
                  border: '2px solid #FFF', borderRadius: '30px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'spin 15s linear infinite'
                }}>
                  <div style={{ width: '80px', height: '80px', background: '#FFF', borderRadius: '50%', boxShadow: '0 0 50px #FFF' }} />
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL 3: Growth Marketing - Interactive 3D Deck */}
          <div 
            ref={el => visualRefs.current[3] = el}
            style={{ position: 'absolute', inset: 0, opacity: 0, scale: 0.95, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px' }}
          >
            <div ref={cardGroupRef} style={{ position: 'relative', width: '350px', height: '450px', transformStyle: 'preserve-3d', willChange: 'transform' }}>
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="fan-card"
                  style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '24px',
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                    display: 'flex', flexDirection: 'column', padding: '2.5rem',
                    willChange: 'transform'
                  }}
                >
                  <div style={{ width: '100%', height: '180px', background: 'rgba(255,136,0,0.3)', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(255,136,0,0.5)' }} />
                  <div style={{ width: '60%', height: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '8px', marginBottom: '1.5rem' }} />
                  <div style={{ width: '90%', height: '10px', background: 'rgba(255,255,255,0.15)', borderRadius: '5px', marginBottom: '1rem' }} />
                  <div style={{ width: '70%', height: '10px', background: 'rgba(255,255,255,0.15)', borderRadius: '5px' }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
