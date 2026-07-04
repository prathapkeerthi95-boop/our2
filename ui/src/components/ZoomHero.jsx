import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './MagneticElement';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   3D EXTRUDED METALLIC N LOGO — SVG Sub-component
   Extruded in depth with chrome front faces & dark blue-green side walls
   ═══════════════════════════════════════════════════ */
const NLogoSVG = () => (
  <svg viewBox="0 0 380 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
    <defs>
      {/* Front Face Gradients */}
      <linearGradient id="blueOuterGrad" x1="0" y1="1" x2="0.6" y2="0">
        <stop offset="0%" stopColor="#0b3b90"/>
        <stop offset="50%" stopColor="#1e90ff"/>
        <stop offset="100%" stopColor="#00d5bc"/>
      </linearGradient>

      <linearGradient id="tealInnerGrad" x1="0" y1="1" x2="0.6" y2="0">
        <stop offset="0%" stopColor="#0a6aa0"/>
        <stop offset="60%" stopColor="#00e5cc"/>
        <stop offset="100%" stopColor="#2dfac5"/>
      </linearGradient>
      
      <linearGradient id="greenOuterGrad" x1="0.2" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#007a8a"/>
        <stop offset="50%" stopColor="#00c0a0"/>
        <stop offset="85%" stopColor="#2dfac5"/>
        <stop offset="100%" stopColor="#80fff0"/>
      </linearGradient>

      {/* Extrusion Side Wall Gradient (Dark Blue-Teal) */}
      <linearGradient id="extrusionGrad" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#031b40"/>
        <stop offset="50%" stopColor="#053648"/>
        <stop offset="100%" stopColor="#004535"/>
      </linearGradient>

      {/* Overlap Shadow filter for 3D crossing depth */}
      <filter id="overlapShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="-3" dy="5" stdDeviation="4" floodColor="#020715" floodOpacity="0.8"/>
      </filter>

      {/* Main Glow Filter */}
      <filter id="nGlow" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* ── 3D EXTRUSION SIDE WALLS (Stacked offset copies in dark gradient) ── */}
    <g filter="url(#nGlow)" transform="skewX(-14) rotate(-4) translate(40, 10)">
      {[8, 7, 6, 5, 4, 3, 2, 1].map((offset) => (
        <g key={offset} transform={`translate(${offset * 1.2}, ${offset * 0.8})`} opacity="0.6">
          <path d="M 80,270 L 115,80 C 120,60 140,60 145,80 L 205,220 C 210,235 195,250 185,245 L 160,180" fill="none" stroke="url(#extrusionGrad)" strokeWidth="15.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 100,270 L 135,80 C 140,60 160,60 165,80 L 225,220 C 230,235 215,250 205,245 L 180,180" fill="none" stroke="url(#extrusionGrad)" strokeWidth="11.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 150,270 L 185,80 C 190,60 210,60 215,80 L 275,220 C 280,235 265,250 255,245 L 230,180" fill="none" stroke="url(#extrusionGrad)" strokeWidth="15.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 170,270 L 205,80 C 210,60 230,60 235,80 L 295,220 C 300,235 285,250 275,245 L 250,180" fill="none" stroke="url(#extrusionGrad)" strokeWidth="11.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}

      {/* ── SHINY FRONT CHROME FACES ── */}
      <g transform="translate(0, 0)">
        {/* Blue Outer Ribbon */}
        <path 
          d="M 80,270 L 115,80 C 120,60 140,60 145,80 L 205,220 C 210,235 195,250 185,245 L 160,180" 
          fill="none"
          stroke="url(#blueOuterGrad)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Teal Inner Ribbon */}
        <path 
          d="M 100,270 L 135,80 C 140,60 160,60 165,80 L 225,220 C 230,235 215,250 205,245 L 180,180" 
          fill="none"
          stroke="url(#tealInnerGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Green Outer Ribbon */}
        <path 
          d="M 150,270 L 185,80 C 190,60 210,60 215,80 L 275,220 C 280,235 265,250 255,245 L 230,180" 
          fill="none"
          stroke="url(#greenOuterGrad)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#overlapShadow)"
        />
        {/* Green Inner Ribbon */}
        <path 
          d="M 170,270 L 205,80 C 210,60 230,60 235,80 L 295,220 C 300,235 285,250 275,245 L 250,180" 
          fill="none"
          stroke="url(#tealInnerGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#overlapShadow)"
        />
      </g>
    </g>
  </svg>
);

const ZoomHero = () => {
  const containerRef  = useRef(null);
  const contentRef   = useRef(null);
  const nWrapRef     = useRef(null);
  const platformRef1 = useRef(null);
  const platformRef2 = useRef(null);
  const reflectionRef = useRef(null);
  const orbitalRef   = useRef(null);
  const line1Ref     = useRef(null);
  const line2Ref     = useRef(null);
  const line3Ref     = useRef(null);
  const line4Ref     = useRef(null);
  const subRef       = useRef(null);
  const ctaRef       = useRef(null);
  const leftContentRef = useRef(null);
  const logoContainerRef = useRef(null);
  const aboutContentRef = useRef(null);
  
  // Blend Transition Refs
  const blendBgRef = useRef(null);
  const glowRef = useRef(null);
  const overlapRef = useRef(null);

  // Dynamic Word Switching Carousel (every 1.5s)
  const words = ['Dominate.', 'Scale.', 'Innovate.', 'Transform.', 'Lead.'];
  const [wordIdx, setWordIdx] = React.useState(0);
  const [currentWord, setCurrentWord] = React.useState(words[0]);
  const [fadeClass, setFadeClass] = React.useState('word-fade-in');

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeClass('word-fade-out');
      setTimeout(() => {
        setWordIdx((prev) => {
          const nextIdx = (prev + 1) % words.length;
          setCurrentWord(words[nextIdx]);
          return nextIdx;
        });
        setFadeClass('word-fade-in');
      }, 350);
    }, 1500);
    return () => clearInterval(timer);
  }, []);


  /* ═══════════════════════════════════════
     EFFECT 2 — N LOGO LEVITATION & ROTATION
     ═══════════════════════════════════════ */
  useEffect(() => {
    const el = nWrapRef.current;
    const refl = reflectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Float up/down (dynamic 35px range for high levitation)
      gsap.to(el, { y: -35, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      // Subtle 3D rotation
      gsap.to(el, { rotateY: 8, rotateX: -4, rotateZ: 1.5, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      
      // Pulse reflection glow (smaller/brighter when logo lands close, larger/dimmer when it floats high)
      if (refl) {
        gsap.to(refl, {
          opacity: 0.3,
          scaleX: 0.75,
          scaleY: 0.75,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });
    return () => ctx.revert();
  }, []);

  /* ═══════════════════════════════════════
     EFFECT 3 — PEDESTAL PULSE GLOW
     ═══════════════════════════════════════ */
  useEffect(() => {
    const ref = platformRef1.current;
    if (!ref) return;
    const ctx = gsap.context(() => {
      gsap.to(ref, {
        boxShadow: `0 0 50px 20px rgba(0,229,204,0.6), 0 0 110px 40px rgba(0,180,240,0.25)`,
        duration: 2.0,
        repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    });
    return () => ctx.revert();
  }, []);

  /* ═══════════════════════════════════════
     EFFECT 4 — ORBITAL CURSOR LIGHT
     ═══════════════════════════════════════ */
  useEffect(() => {
    const wrap = nWrapRef.current;
    const dot  = orbitalRef.current;
    if (!wrap || !dot) return;

    let hovering   = false;
    let autoAngle  = 0;
    let mouseAngle = 0;
    let curAngle   = 0;
    let animId;
    const RX = 185, RY = 62;

    const onMove = (e) => {
      const r  = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top  + r.height / 2;
      mouseAngle = Math.atan2(e.clientY - cy, e.clientX - cx);
    };
    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };

    const tick = () => {
      autoAngle += 0.012;

      if (hovering) {
        let diff = mouseAngle - curAngle;
        while (diff >  Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        curAngle += diff * 0.10;
        dot.style.opacity = '1';
      } else {
        curAngle += (autoAngle - curAngle) * 0.04;
        if (Math.abs(autoAngle - curAngle) < 0.01) curAngle = autoAngle;
        dot.style.opacity = '0.30';
      }

      const x = Math.cos(curAngle) * RX;
      const y = Math.sin(curAngle) * RY;
      dot.style.transform = `translate(${x}px, ${y}px) scale(${hovering ? 1.6 : 1})`;

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    wrap.addEventListener('mousemove',  onMove);

    return () => {
      cancelAnimationFrame(animId);
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
      wrap.removeEventListener('mousemove',  onMove);
    };
  }, []);

  /* ═══════════════════════════════════════
     EFFECT 5 — ENTRANCE ANIMATIONS
     ═══════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.6 });

      // Text lines slide up
      [line1Ref, line2Ref, line3Ref, line4Ref].forEach((ref, i) => {
        if (!ref.current) return;
        tl.fromTo(ref.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out' },
          i === 0 ? '-=1.2' : '-=0.75'
        );
      });

      // Subtitle
      tl.fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.4'
      );

      // CTA
      tl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      );

      // N Logo
      tl.fromTo(nWrapRef.current,
        { scale: 0.4, opacity: 0, rotateY: -30 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.4, ease: 'back.out(1.3)' },
        '-=1.8'
      );

      // Pedestal tiers
      [platformRef1, platformRef2].forEach((ref, i) => {
        if (!ref.current) return;
        tl.fromTo(ref.current,
          { opacity: 0, scaleX: 0.4 },
          { opacity: 1, scaleX: 1, duration: 1, ease: 'power3.out' },
          `-=${1.2 - i * 0.2}`
        );
      });

      // Scroll Transition (Horizontal Wipe)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        }
      });

      scrollTl.to(leftContentRef.current, { xPercent: -50, opacity: 0, duration: 1 }, 0)
              .to(logoContainerRef.current, { xPercent: -100, duration: 1 }, 0)
              .fromTo(aboutContentRef.current, 
                 { x: 300, opacity: 0 }, 
                 { x: 0, opacity: 1, duration: 0.8 }, 
                 0.75);

      // Simple Gradient/Blur Overlap Transition
      const blendTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'bottom bottom', // When bottom of Hero hits bottom of viewport
          end: 'bottom top',      // As it scrolls up
          scrub: true,
        }
      });

      blendTl.fromTo(overlapRef.current, 
              { opacity: 0, filter: 'blur(10px)' }, 
              { opacity: 1, filter: 'blur(0px)', duration: 1 }, 0);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'url(/premium_hero_bg.png) no-repeat center center',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '90px',
        marginBottom: 0,
        paddingBottom: 0
      }}
    >

      {/* ════════════════════════════════════
          MAIN CONTENT — SPLIT LAYOUT
         ════════════════════════════════════ */}
      <div
        ref={contentRef}
        style={{
          position: 'relative', zIndex: 10,
          display: 'flex', alignItems: 'center',
          width: '100%', maxWidth: '1300px',
          margin: '0 auto', padding: '0 2.5rem',
          gap: '2.5rem'
        }}
      >
        {/* ════════════════════════════════════
            LEFT: TEXT CONTENT
           ════════════════════════════════════ */}
        <div ref={leftContentRef} style={{ flex: '0 0 50%', maxWidth: '620px' }}>
          
          {/* Line 1 — "We Craft" */}
          <div ref={line1Ref} style={{ overflow: 'hidden', paddingBottom: '0.25em', opacity: 0 }}>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 6vw, 4rem)',
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.15,
              letterSpacing: '-3px',
              color: '#EDEDED',
              margin: 0
            }}>
              We Craft
            </h1>
          </div>

          {/* Line 2 — "Digital" */}
          <div ref={line2Ref} style={{ overflow: 'hidden', paddingBottom: '0.25em', opacity: 0 }}>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 6vw, 4rem)',
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.15,
              letterSpacing: '-3px',
              background: 'linear-gradient(90deg, #1A5CFF 0%, #46F3D3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              color: 'transparent',
              margin: 0
            }}>
              Digital
            </h1>
          </div>

          {/* Line 3 — "Ecosystems" */}
          <div ref={line3Ref} style={{ overflow: 'hidden', paddingBottom: '0.25em', opacity: 0 }}>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 6vw, 4rem)',
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.15,
              letterSpacing: '-3px',
              color: '#EDEDED',
              margin: 0
            }}>
              Ecosystems
            </h1>
          </div>

          {/* Dynamic Word Swapping Keyframe Animations */}
          <style>{`
            @keyframes wordFadeIn {
              from { opacity: 0; transform: translateY(12px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes wordFadeOut {
              from { opacity: 1; transform: translateY(0); }
              to { opacity: 0; transform: translateY(-12px); }
            }
            .word-fade-in {
              display: inline-block;
              animation: wordFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .word-fade-out {
              display: inline-block;
              animation: wordFadeOut 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>

          {/* Line 4 — Dynamic Word Carousel */}
          <div ref={line4Ref} style={{ overflow: 'hidden', paddingBottom: '0.25em', opacity: 0 }}>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 6vw, 4rem)',
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.15,
              letterSpacing: '-3px',
              color: '#EDEDED',
              whiteSpace: 'nowrap',
              margin: 0
            }}>
              That <span 
                className={fadeClass} 
                style={{
                  background: 'linear-gradient(90deg, #1A5CFF 0%, #46F3D3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block'
                }}
              >
                {currentWord}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            ref={subRef}
            style={{
              fontSize: '20px', lineHeight: 1.4,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '440px',
              margin: '1.2rem 0 1.6rem',
              opacity: 0
            }}
          >
            High-performance websites and digital platforms that drive growth and deliver impact.
          </p>

          {/* CTA Buttons - Outlined pill styles with white border, white text */}
          <div ref={ctaRef} style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', opacity: 0 }}>
            <MagneticElement>
              <a 
                href="#portfolio" 
                className="custom-pill-btn btn-see-work"
                style={{ cursor: 'none' }}
              >
                <span>See Our Work</span>
              </a>
            </MagneticElement>

            <MagneticElement>
              <a 
                href="#contact" 
                className="custom-pill-btn btn-lets-talk"
                style={{ cursor: 'none' }}
              >
                <span>Let's Talk</span>
                <span className="arrow-icon">→</span>
              </a>
            </MagneticElement>
          </div>
        </div>

        {/* ════════════════════════════════════
            RIGHT: Logo on Pedestal
           ════════════════════════════════════ */}
        <div ref={logoContainerRef} style={{
          flex: 1, position: 'relative',
          alignSelf: 'stretch',
          willChange: 'transform'
        }}>
          {/* Static Floor Glow under the stage */}
          <div
            ref={platformRef1}
            style={{
              position: 'absolute',
              bottom: '-25px',
              left: 'calc(43% - 190px)',
              width: '380px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(0, 229, 204, 0.25)',
              filter: 'blur(20px)',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />

          {/* Static Stage Pedestal (resting on the ground) */}
          <div
            style={{
              position: 'absolute',
              bottom: '-45px',
              left: '43%',
              transform: 'translateX(-50%)',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img 
              ref={platformRef2}
              src="/nuvarox_stage.png" 
              alt="Nuvarox 3D Stage Pedestal" 
              style={{
                width: '580px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(0, 229, 204, 0.45)) drop-shadow(0 0 25px rgba(0, 229, 204, 0.2))'
              }}
            />
          </div>

          {/* Ambient Reflection Glow cast by the levitating logo onto the stage top platform */}
          <div
            ref={reflectionRef}
            style={{
              position: 'absolute',
              bottom: '78px',
              left: '43%',
              transform: 'translateX(-50%)',
              width: '240px',
              height: '35px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(0, 229, 204, 0.65) 0%, rgba(26, 92, 255, 0.3) 50%, transparent 80%)',
              filter: 'blur(10px)',
              zIndex: 2,
              pointerEvents: 'none',
              opacity: 0.85
            }}
          />

          {/* Levitating N Logo (floats/levitates independently above the stage) */}
          <div 
            ref={nWrapRef}
            style={{
              position: 'absolute',
              bottom: '-215px',
              left: '43%',
              transform: 'translateX(-50%)',
              zIndex: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img 
              src="/nuvarox_pedestal.png" 
              alt="Nuvarox 3D Logo" 
              style={{
                width: '1250px',
                height: '832px',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>

        {/* ════════════════════════════════════
            RIGHT: "WHO WE ARE" (Hidden initially)
           ════════════════════════════════════ */}
        <div ref={aboutContentRef} style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%) translateZ(0)',
          paddingLeft: '4rem',
          paddingRight: '4rem',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform, opacity' // Prevents the sudden rendering shift when GSAP finishes
        }}>
          <div style={{
            position: 'relative',
            background: 'rgba(40, 45, 65, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '2.5rem',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
            transform: 'translateZ(0)'
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.5px' }}>
              Who We Are
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '480px', marginBottom: '1.25rem' }}>
              We're a tiny team with outsized ambition. Based in Tamil Nadu, India, we build premium digital products, brands, and experiences that help forward-thinking companies shape the future.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '480px', margin: 0 }}>
              NUVAROX is a boutique digital studio born in Chennai. We're not a 200-person agency churning out templates. We're a focused, obsessive crew that treats every project like it's our own product launch.
            </p>
          </div>
        </div>
      </div>



      {/* ── SCROLL INDICATOR ── */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        opacity: 0.35
      }}>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, rgba(0,229,204,0.35), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite'
        }}/>
      </div>

      {/* ════════════════════════════════════
          GRADIENT BLEND TRANSITION
         ════════════════════════════════════ */}
      <div 
        ref={blendBgRef}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '25vh',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 59, 154, 0.4) 50%, rgba(0, 59, 154, 1) 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      {/* Subtle Cyan Glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          bottom: '-30px', left: '50%', transform: 'translateX(-50%)',
          width: '40vw', height: '100px',
          background: 'rgba(0, 229, 255, 0.25)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      {/* Section 2 Overlap Reveal */}
      <div 
        ref={overlapRef}
        style={{
          position: 'absolute',
          bottom: '-120px', left: 0, right: 0,
          height: '240px',
          background: 'url(/images/page\\ 2\\ background.png) no-repeat top center',
          backgroundSize: '100% 100%',
          opacity: 0,
          filter: 'blur(10px)',
          pointerEvents: 'none',
          zIndex: 2,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)'
        }}
      />

      <style>{`
        @keyframes scrollPulse {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
};

export default ZoomHero;
