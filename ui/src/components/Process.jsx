import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Discovery',
    subtitle: 'SYSTEM ARCHITECTURE',
    desc: 'We extract the core physics of your brand. Complete market analysis, technical auditing, and strategic blueprinting to lay a flawless foundation.',
    accent: '#00E5FF',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '02',
    title: 'Engineering',
    subtitle: 'NATIVE DEVELOPMENT',
    desc: 'Writing the algorithms of tomorrow. Clean architecture, scalable infrastructure, and zero-latency performance optimized for scale.',
    accent: '#7000FF',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    num: '03',
    title: 'Immersion',
    subtitle: 'WEBGL & PHYSICS',
    // CHANGED IMAGE 03 to a massive, bright, modern abstract architecture shot
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1600&q=80',
    desc: 'We don\'t just design interfaces, we simulate environments. Heavy GSAP physics, WebGL shaders, and butter-smooth scrolling experiences.',
    accent: '#00FFAD',
  },
  {
    num: '04',
    title: 'Dominance',
    subtitle: 'MARKET DEPLOYMENT',
    desc: 'Flawless CI/CD pipelines and aggressive go-to-market strategies. We launch products that hijack attention and dominate the market.',
    accent: '#FF9900',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80'
  }
];

const VectorWavesBackground = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '600px', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <svg 
      viewBox="0 0 1440 500" 
      preserveAspectRatio="none" 
      style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
    >
      <defs>
        <linearGradient id="waveGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0052D4" />
          <stop offset="50%" stopColor="#4364F7" />
          <stop offset="100%" stopColor="#6FB1FC" />
        </linearGradient>
        <linearGradient id="waveGradGrey" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>
      </defs>

      {/* Background Light Grey Swoosh */}
      <path 
        className="swoosh-anim-1"
        fill="url(#waveGradGrey)" 
        d="M0,0 L1440,0 L1440,180 C1000,450 500,50 0,250 Z" 
        opacity="0.8"
      />
      
      {/* Mid Silver Swoosh */}
      <path 
        className="swoosh-anim-2"
        fill="#CBD5E1" 
        d="M0,0 L1440,0 L1440,100 C900,300 400,0 0,180 Z" 
        opacity="0.4"
      />

      {/* Foreground Deep Blue/Cyan Swoosh */}
      <path 
        className="swoosh-anim-3"
        fill="url(#waveGradBlue)" 
        d="M0,0 L1440,0 L1440,40 C800,250 300,-50 0,150 Z" 
        opacity="0.95"
      />
    </svg>

    <style>{`
      .swoosh-anim-1 {
        animation: waveBreathe 14s ease-in-out infinite alternate;
        transform-origin: top left;
      }
      .swoosh-anim-2 {
        animation: waveBreathe 18s ease-in-out infinite alternate-reverse;
        transform-origin: top right;
      }
      .swoosh-anim-3 {
        animation: waveBreathe 12s ease-in-out infinite alternate;
        transform-origin: center top;
      }
      @keyframes waveBreathe {
        0% { transform: scaleY(1) translateY(0); }
        100% { transform: scaleY(1.15) translateY(15px); }
      }
    `}</style>
  </div>
);

const Process = () => {
  const sectionRef = useRef(null);
  const horizontalWrapperRef = useRef(null);
  const headerRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    // 1. UNIQUE HEADER SCROLL REVEAL EFFECT (Triggers EVERY time on scroll up/down)
    const headerCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse' // Plays when scrolling down, reverses when scrolling up
        }
      });

      tl.fromTo('.proc-hdr-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }
      );
      
      tl.fromTo('.proc-hdr-label',
        { y: 30, opacity: 0, filter: 'blur(12px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // Extreme 3D staggering pop-up
      tl.fromTo('.proc-hdr-word',
        { y: 100, opacity: 0, rotateX: 60, rotateZ: 8, scale: 0.7 },
        { y: 0, opacity: 1, rotateX: 0, rotateZ: 0, scale: 1, duration: 0.75, stagger: 0.12, ease: 'back.out(1.7)' },
        '-=0.4'
      );
    }, headerRef);

    // 2. MASSIVE HORIZONTAL SCROLL EFFECT
    const scrollCtx = gsap.context(() => {
      const wrapper = horizontalWrapperRef.current;
      const totalWidth = wrapper.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      // Calculate exactly how far to move left so the last item stops at the right edge
      const moveAmount = totalWidth - viewportWidth;

      gsap.to(wrapper, {
        x: -moveAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${moveAmount}`,
          pin: true,
          scrub: 1, // Smooth buttery scrub
          invalidateOnRefresh: true,
        }
      });

      // Parallax effect on the images inside the horizontal scroll
      stepRefs.current.forEach((step) => {
        if (!step) return;
        const img = step.querySelector('.proc-img');
        if (img) {
          gsap.fromTo(img, 
            { objectPosition: '0% 50%' },
            { 
              objectPosition: '100% 50%', 
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current, // Same pin trigger
                start: 'top top',
                end: () => `+=${moveAmount}`,
                scrub: 1,
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => {
      headerCtx.revert();
      scrollCtx.revert();
    };
  }, []);

  return (
    <section
      id="process"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 100%)',
        position: 'relative',
        fontFamily: 'var(--font-body)',
        overflow: 'hidden' // Important for horizontal scroll
      }}
    >
      {/* NEW ANIMATED VECTOR WAVES BACKGROUND */}
      <VectorWavesBackground />

      {/* ── UNIQUE ANIMATED HEADER ── */}
      <div 
        ref={headerRef} 
        style={{ 
          position: 'relative', // Ensures header stays above the waves
          zIndex: 10,
          maxWidth: '1300px', 
          margin: '0 auto', 
          padding: '8rem 5% 4rem', 
          textAlign: 'center' 
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', overflow: 'hidden' }}>
          <span className="proc-hdr-line" style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #00E5FF, #7000FF)', transformOrigin: 'left' }} />
          <span className="proc-hdr-label" style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.2em', color: '#7000FF', textTransform: 'uppercase' }}>
            Our Process
          </span>
          <span className="proc-hdr-line" style={{ width: '40px', height: '2px', background: 'linear-gradient(270deg, #00E5FF, #7000FF)', transformOrigin: 'right' }} />
        </div>
        
        <h2 style={{ 
          fontSize: 'clamp(3rem, 6vw, 5rem)', 
          fontWeight: 900, 
          fontFamily: 'var(--font-display)', 
          color: '#11131A', 
          letterSpacing: '-0.03em', 
          margin: 0, 
          lineHeight: 1.1,
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.3em',
          perspective: '1000px'
        }}>
          <span className="proc-hdr-word" style={{ display: 'inline-block' }}>How</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block' }}>We</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block' }}>Build</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block', color: 'transparent', WebkitTextStroke: '2px rgba(17, 19, 26, 0.15)' }}>Digital</span>
          <span className="proc-hdr-word" style={{ display: 'inline-block', color: 'transparent', WebkitTextStroke: '2px rgba(17, 19, 26, 0.15)' }}>Dominance</span>
        </h2>
      </div>

      {/* ── MASSIVE HORIZONTAL PINNED SECTION ── */}
      <div 
        ref={sectionRef} 
        style={{ 
          height: '100vh', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center',
          borderTop: '1px solid rgba(0,0,0,0.05)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <div 
          ref={horizontalWrapperRef}
          style={{ 
            display: 'flex', 
            height: '100%',
            willChange: 'transform'
          }}
        >
          {steps.map((step, index) => (
            <div 
              key={index}
              ref={(el) => stepRefs.current[index] = el}
              style={{
                width: '85vw', // Reduced from 100vw so you can peek the next item & less empty space
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0 2vw', // Reduced padding
                gap: '4vw', // Reduced gap between text and image
                flexShrink: 0
              }}
            >
              
              {/* LEFT HALF - MASSIVE CONTENT */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ 
                  position: 'absolute',
                  top: '-10%',
                  left: '-5%',
                  fontSize: 'clamp(10rem, 25vw, 20rem)', 
                  fontWeight: 900, 
                  fontFamily: 'var(--font-display)', 
                  color: 'rgba(0,0,0,0.02)', 
                  lineHeight: 0.8,
                  letterSpacing: '-0.05em',
                  zIndex: 0,
                  userSelect: 'none'
                }}>
                  {step.num}
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 20px', 
                    borderRadius: '50px', 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.03)',
                    color: step.accent,
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    marginBottom: '2.5rem',
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: step.accent, boxShadow: `0 0 10px ${step.accent}` }} />
                    {step.subtitle}
                  </div>

                  <h3 style={{ 
                    fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
                    fontWeight: 900, 
                    fontFamily: 'var(--font-display)', 
                    color: '#11131A', 
                    margin: '0 0 1.5rem 0',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1
                  }}>
                    {step.title}
                  </h3>

                  <p style={{ 
                    fontSize: '1.15rem', 
                    lineHeight: 1.7, 
                    color: 'rgba(0,0,0,0.65)', 
                    fontWeight: 500,
                    maxWidth: '480px' 
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* RIGHT HALF - HUGE PARALLAX IMAGE */}
              <div style={{
                flex: '1',
                height: '70%',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 30px 60px rgba(0,0,0,0.08)'
              }}>
                <img 
                  className="proc-img"
                  src={step.image} 
                  alt={step.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    willChange: 'object-position' // Crucial for smooth parallax
                  }}
                />
                {/* Beautiful Soft Inner Shadow */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04), inset 0 0 20px rgba(0,0,0,0.02)',
                  pointerEvents: 'none'
                }} />
              </div>

            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Process;
