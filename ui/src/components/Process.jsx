import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'RESEARCH & ANALYSIS',
    description: 'We dive deep into your brand DNA, analyzing the market, competitors, and audience to uncover undeniable truths.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    accent: '#7000FF',
    tags: ['Research', 'Analysis', 'Insights', 'Data']
  },
  {
    number: '02',
    title: 'Strategy',
    subtitle: 'BLUEPRINT & ARCHITECTURE',
    description: 'Data drives every decision. We architect a flawless blueprint designed strictly for maximum market dominance.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    accent: '#00E5FF',
    tags: ['Planning', 'Wireframing', 'Logic', 'Roadmap']
  },
  {
    number: '03',
    title: 'Execution',
    subtitle: 'BUILD & ENGINEER',
    description: 'Our elite engineering and design teams build pixel-perfect, highly scalable platforms that refuse to be ignored.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    accent: '#FF2A54',
    tags: ['Code', 'Design', 'Systems', 'QA']
  },
  {
    number: '04',
    title: 'Scale',
    subtitle: 'LAUNCH & DOMINATE',
    description: 'We do not just launch. We continuously monitor, iterate, and aggressively scale your digital ecosystem.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    accent: '#FF8800',
    tags: ['Growth', 'Metrics', 'Optimization', 'ROI']
  }
];

const Process = () => {
  const containerRef = useRef(null);
  const numbersRef = useRef([]);
  const imagesRef = useRef([]);
  const textsRef = useRef([]);
  const progressRef = useRef(null);
  const progressFillRef = useRef(null);
  const stepDotsRef = useRef([]);
  const glowRef = useRef(null);
  const imageFrameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Animate the progress bar fill
            if (progressFillRef.current) {
              gsap.set(progressFillRef.current, { scaleY: self.progress });
            }
            // Animate the step dots based on strict progress boundaries
            const progressPerStep = 1 / (steps.length - 1);
            const currentStep = Math.min(
              Math.max(Math.floor((self.progress + (progressPerStep / 2)) / progressPerStep), 0),
              steps.length - 1
            );
            
            stepDotsRef.current.forEach((dot, i) => {
              if (dot) {
                dot.style.background = i <= currentStep ? steps[currentStep].accent : 'rgba(255,255,255,0.15)';
                dot.style.transform = i === currentStep ? 'scale(1.8)' : 'scale(1)';
                dot.style.boxShadow = i === currentStep ? `0 0 20px ${steps[currentStep].accent}` : 'none';
              }
            });
            // Animate glow color
            if (glowRef.current) {
              glowRef.current.style.background = `radial-gradient(circle, ${steps[currentStep].accent}33 0%, transparent 70%)`;
            }
          }
        }
      });

      // Initial State Setup
      gsap.set(imagesRef.current[0], { clipPath: 'inset(0% 0 0 0)', scale: 1, opacity: 1 });
      gsap.set(numbersRef.current[0], { yPercent: 0, opacity: 1 });
      gsap.set(textsRef.current[0], { y: 0, opacity: 1 });

      for (let i = 1; i < steps.length; i++) {
        gsap.set(imagesRef.current[i], { clipPath: 'inset(100% 0 0 0)', scale: 1, opacity: 1 });
        gsap.set(numbersRef.current[i], { yPercent: 100, opacity: 0 });
        gsap.set(textsRef.current[i], { y: 60, opacity: 0 });

        // Transition bundle
        tl.to(imagesRef.current[i], { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: "none" }, `step${i}`)
          .to(imagesRef.current[i-1], { scale: 1.15, opacity: 0, duration: 1, ease: "none" }, `step${i}`)
          .to(numbersRef.current[i], { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, `step${i}`)
          .to(numbersRef.current[i-1], { yPercent: -120, opacity: 0, duration: 0.8, ease: "power3.in" }, `step${i}`)
          .to(textsRef.current[i], { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, `step${i}`)
          .to(textsRef.current[i-1], { y: -60, opacity: 0, duration: 0.8, ease: "power3.in" }, `step${i}`)
          // Animate image frame border glow
          .to(imageFrameRef.current, { 
            borderColor: steps[i].accent + '40',
            boxShadow: `0 0 80px ${steps[i].accent}15, inset 0 0 80px ${steps[i].accent}08`,
            duration: 1 
          }, `step${i}`);
          
        if (i < steps.length - 1) {
          tl.to({}, { duration: 0.3 });
        }
      }
    }, containerRef); // Scope to container

    return () => ctx.revert(); // Proper cleanup for React StrictMode
  }, []);

  return (
    <section 
      id="process" 
      ref={containerRef}
      style={{ 
        height: '100vh',
        background: 'linear-gradient(180deg, #030303 0%, #0A0A12 50%, #050510 100%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex'
      }}
    >
      {/* ANIMATED AMBIENT GLOW */}
      <div 
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '30%', left: '40%',
          width: '60vw', height: '60vw',
          background: `radial-gradient(circle, ${steps[0].accent}33 0%, transparent 70%)`,
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.8s ease'
        }} 
      />

      {/* NOISE TEXTURE */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3, pointerEvents: 'none',
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
      }} />

      {/* VERTICAL PROGRESS BAR — LEFT EDGE */}
      <div 
        ref={progressRef}
        style={{
          position: 'absolute',
          left: '2.5vw', top: '50%',
          transform: 'translateY(-50%)',
          width: '2px', height: '40vh',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '4px',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Fill bar */}
        <div 
          ref={progressFillRef}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'linear-gradient(180deg, #7000FF, #00E5FF, #FF2A54, #FF8800)',
            borderRadius: '4px',
            transformOrigin: 'top',
            transform: 'scaleY(0)'
          }}
        />
        {/* Step dots on the line */}
        {steps.map((step, i) => (
          <div 
            key={i}
            ref={el => stepDotsRef.current[i] = el}
            style={{
              position: 'absolute',
              left: '50%',
              top: `${(i / (steps.length - 1)) * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: i === 0 ? steps[0].accent : 'rgba(255,255,255,0.15)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 2
            }}
          />
        ))}
      </div>

      {/* LEFT CONTENT AREA */}
      <div 
        style={{ 
          flex: '0 0 50%',
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          paddingLeft: '6vw',
          zIndex: 2
        }}
      >
        {/* Section Header */}
        <div style={{ position: 'absolute', top: '8vh', left: '6vw' }}>
          <div className="section-label" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}>
            <span className="pulse-dot" style={{ background: '#FF2A54' }}></span> How We Build
          </div>
        </div>

        {/* MASSIVE NUMBERS */}
        <div style={{ position: 'relative', height: '25vh', overflow: 'hidden', marginBottom: '1rem' }}>
          {steps.map((step, i) => (
            <div 
              key={i}
              ref={el => numbersRef.current[i] = el}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                display: 'flex', alignItems: 'center',
                fontSize: 'clamp(8rem, 18vw, 18rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                background: `linear-gradient(135deg, ${step.accent}, ${step.accent}66)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 0.85,
                letterSpacing: '-0.06em',
                opacity: 0
              }}
            >
              {step.number}
            </div>
          ))}
        </div>

        {/* TEXT CONTENT */}
        <div style={{ position: 'relative', height: '22vh' }}>
          {steps.map((step, i) => (
            <div 
              key={i}
              ref={el => textsRef.current[i] = el}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%',
                maxWidth: '440px',
                opacity: 0
              }}
            >
              <div style={{
                fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.3em', textTransform: 'uppercase',
                color: step.accent,
                marginBottom: '0.8rem'
              }}>
                {step.subtitle}
              </div>
              <h3 style={{ 
                fontSize: 'clamp(2.5rem, 4vw, 4rem)', 
                fontWeight: 800, 
                marginBottom: '1.2rem', 
                color: '#FFFFFF', 
                letterSpacing: '-0.03em',
                lineHeight: 1.1
              }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>
                {step.description}
              </p>

              {/* Decorative Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                {step.tags.map((tag, j) => (
                  <span key={j} style={{
                    padding: '0.3rem 0.8rem',
                    border: `1px solid ${step.accent}30`,
                    borderRadius: '50px',
                    fontSize: '0.72rem',
                    color: step.accent,
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: CINEMATIC IMAGE WITH PREMIUM FRAME */}
      <div 
        style={{ 
          flex: '0 0 50%',
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          padding: '6vh 4vw'
        }}
      >
        {/* Premium Glowing Frame */}
        <div 
          ref={imageFrameRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '75vh',
            borderRadius: '24px',
            overflow: 'hidden',
            border: `1px solid ${steps[0].accent}40`,
            boxShadow: `0 0 80px ${steps[0].accent}15, inset 0 0 80px ${steps[0].accent}08`,
            transition: 'border-color 0.8s ease, box-shadow 0.8s ease'
          }}
        >
          {steps.map((step, i) => (
            <div 
              key={i}
              ref={el => imagesRef.current[i] = el}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                clipPath: 'inset(100% 0 0 0)',
                willChange: 'clip-path, transform'
              }}
            >
              {/* Cinematic Overlay */}
              <div style={{ 
                position: 'absolute', inset: 0, zIndex: 1,
                background: `linear-gradient(180deg, ${step.accent}15 0%, rgba(0,0,0,0.4) 100%)`
              }} />
              <img 
                src={step.image} 
                alt={step.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: 'contrast(1.1) saturate(1.2)'
                }} 
              />
            </div>
          ))}

          {/* Corner Accent Lines */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', width: '30px', height: '30px', borderTop: '2px solid rgba(255,255,255,0.3)', borderLeft: '2px solid rgba(255,255,255,0.3)', zIndex: 5 }} />
          <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '30px', height: '30px', borderBottom: '2px solid rgba(255,255,255,0.3)', borderRight: '2px solid rgba(255,255,255,0.3)', zIndex: 5 }} />
        </div>
      </div>

    </section>
  );
};

export default Process;
