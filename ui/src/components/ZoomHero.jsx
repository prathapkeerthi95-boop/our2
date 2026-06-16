import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ZoomHero = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const bgRefs = useRef([]);
  const pRef = useRef(null);

  const paragraphText = "Bespoke digital ecosystems engineered to command attention, dominate markets, and instantly convert visitors into high-value clients. No templates. No compromises.";

  useEffect(() => {
    // 1. Living Mesh Background — continuous breathing & rotation
    bgRefs.current.forEach((bg, i) => {
      if (!bg) return;
      gsap.to(bg, {
        scale: 1.3 + (i * 0.15),
        rotation: (i % 2 === 0 ? 1 : -1) * 360,
        x: `+=${(i % 2 === 0 ? 30 : -30)}`,
        y: `+=${(i % 2 === 0 ? -20 : 20)}`,
        duration: 15 + (i * 4),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Mouse parallax for background orbs
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      bgRefs.current.forEach((bg, i) => {
        if (!bg) return;
        gsap.to(bg, {
          x: x * (1 + i * 0.3),
          y: y * (1 + i * 0.3),
          duration: 1.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    };
    window.addEventListener('mousemove', onMouseMove);

    // 2. Cinematic Blur-Reveal Header (no overflow:hidden clipping)
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { y: 50, opacity: 0, filter: 'blur(15px)', scale: 1.04 },
        { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.2, delay: 0.15 + i * 0.12, ease: "power4.out" }
      );
    });

    // 3. Scroll Scrubber — word-by-word highlight on scroll
    if (pRef.current) {
      const words = pRef.current.querySelectorAll('.hero-word');
      if (words.length > 0) {
        gsap.fromTo(words,
          { color: 'rgba(0,0,0,0.12)' },
          {
            color: '#0B0C10',
            stagger: 0.05,
            scrollTrigger: {
              trigger: pRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1
            }
          }
        );
      }
    }

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        paddingTop: '10rem',
        paddingBottom: '6rem', // Tight padding — no blank space
        overflow: 'visible', // Allow blur to render
      }}
    >

      {/* LIVING MESH BACKGROUND — Strong, visible orbs */}
      <div style={{ position: 'absolute', inset: '-20%', overflow: 'visible', zIndex: 0, pointerEvents: 'none' }}>
        {/* Purple Orb — much stronger opacity */}
        <div
          ref={el => bgRefs.current[0] = el}
          style={{
            position: 'absolute', top: '-5%', right: '5%',
            width: '45vw', height: '45vw',
            background: 'radial-gradient(circle, rgba(112,0,255,0.15) 0%, rgba(112,0,255,0.05) 40%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(60px)'
          }}
        />
        {/* Cyan Orb */}
        <div
          ref={el => bgRefs.current[1] = el}
          style={{
            position: 'absolute', bottom: '-10%', left: '0%',
            width: '50vw', height: '50vw',
            background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.04) 40%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(60px)'
          }}
        />
        {/* Pink/Red Orb */}
        <div
          ref={el => bgRefs.current[2] = el}
          style={{
            position: 'absolute', top: '40%', left: '50%',
            width: '35vw', height: '35vw',
            background: 'radial-gradient(circle, rgba(255,42,84,0.10) 0%, rgba(255,42,84,0.03) 40%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(60px)'
          }}
        />
      </div>

      {/* FOREGROUND CONTENT */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', padding: '0 2rem',
        maxWidth: '950px', width: '100%'
      }}>

        {/* Label */}
        <div
          ref={el => textRefs.current[0] = el}
          style={{
            display: 'inline-block', color: 'var(--accent-violet)',
            fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: '2rem', opacity: 0
          }}
        >
          Premium Design Agency
        </div>

        {/* BLUR-REVEAL HEADER */}
        {["Digital", "Architecture", "for Leaders."].map((text, i) => (
          <div key={i}>
            <h1
              ref={el => textRefs.current[i + 1] = el}
              style={{
                fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
                lineHeight: '1.08',
                fontWeight: '900',
                letterSpacing: '-0.03em',
                color: text === "for Leaders." ? 'var(--accent-violet)' : '#0B0C10',
                fontFamily: 'var(--font-display)',
                marginBottom: '0.15rem',
                opacity: 0
              }}
            >
              {text}
            </h1>
          </div>
        ))}

        {/* SCROLL SCRUBBER CONTENT */}
        <div style={{ marginTop: '2.5rem', maxWidth: '750px', marginLeft: 'auto', marginRight: 'auto' }}>
          <p
            ref={pRef}
            style={{
              fontSize: '1.15rem',
              lineHeight: '1.75',
              fontWeight: '400',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.28em'
            }}
          >
            {paragraphText.split(' ').map((word, index) => (
              <span
                key={index}
                className="hero-word"
                style={{ color: 'rgba(0,0,0,0.12)', transition: 'color 0.1s ease' }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Action Buttons */}
        <div
          ref={el => textRefs.current[4] = el}
          style={{
            display: 'flex', gap: '1.5rem', justifyContent: 'center',
            marginTop: '3rem', opacity: 0
          }}
        >
          <a href="#services" className="btn-primary hover-target" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
            Explore Work
          </a>
          <a href="#contact" className="btn-outline hover-target" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
            Let's Talk
          </a>
        </div>
      </div>

    </section>
  );
};

export default ZoomHero;
