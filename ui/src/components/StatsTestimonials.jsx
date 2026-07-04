import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: '2+',
    label: 'Exclusive Clients',
    sub: "Because we're still counting. Seriously, more are coming. We just don't like to brag… yet."
  },
  {
    value: '100%',
    label: 'Success Rate',
    sub: "Not 99.9%. That remaining 0.1% keeps other agencies up at night. Not us."
  },
  {
    value: '5+',
    label: 'Products Shipped',
    sub: "Planning to go higher — the moment you choose us, this number will need an update."
  },
  {
    value: '24/7',
    label: 'Always Building',
    sub: "Your growth is our mission. We don't clock out. Sleep is a myth in this studio."
  }
];

const testimonials = [
  {
    client: 'TECHNOVA',
    quote: 'NUVAROX completely transformed our digital presence. Traffic increased by 420%.',
    role: 'Rajesh K. — CEO'
  },
  {
    client: 'FITPULSE',
    quote: 'The mobile app they built is flawless. Every stage was handled with absolute precision.',
    role: 'Priya V. — Founder'
  },
  {
    client: 'VERTEX',
    quote: 'They didn\'t just design a logo — they built an entire identity ecosystem.',
    role: 'Arjun M. — Director'
  },
  {
    client: 'LUMINA',
    quote: 'Best agency we have ever partnered with. True visionaries in WebGL.',
    role: 'Sarah J. — CMO'
  },
  {
    client: 'AETHER',
    quote: 'Their AI integrations optimized our platform workflows by 300%. Absolutely phenomenal.',
    role: 'Alex M. — CTO'
  },
  {
    client: 'NEXUS',
    quote: 'Sleek, fluid, and immersive. They set a new benchmark for web interaction.',
    role: 'Elena R. — Head of Product'
  },
  {
    client: 'KINETIC',
    quote: 'The custom physics engine and animations feel incredibly premium and responsive.',
    role: 'Marcus L. — VP of Design'
  },
  {
    client: 'SYNAPSE',
    quote: 'Highly scientific approach to UX. Every motion was backed by user psychology.',
    role: 'Dr. Kenji T. — Director'
  },
  {
    client: 'ECLIPSE',
    quote: 'Unbelievable branding execution. Our conversion rate rose by 250% in two weeks.',
    role: 'Sofia N. — Marketing Lead'
  },
  {
    client: 'APEX',
    quote: 'Flawless delivery under tight constraints. Their engineering is top-tier.',
    role: 'Vikram S. — Managing Partner'
  },
  {
    client: 'QUANTUM',
    quote: 'They took our complex data visualization concept and turned it into pure art.',
    role: 'Zoe C. — Co-Founder'
  }
];

const StatsTestimonials = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const isTooltipActive = useRef(false);
  const lineRef = useRef(null);
  const orbRef = useRef(null);
  const labelRef = useRef(null);
  const marqueeRef = useRef(null);
  const tooltipRef = useRef(null);
  const numberRefs = useRef([]);
  const cardsRef = useRef([]);
  const innerCardsRef = useRef([]);
  const particlesRef = useRef([]);



  const [bgLoaded, setBgLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Intersection Observer for lazy loading background
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



  // Combined Mouse Move System (Active ONLY when section is hovered)
  useEffect(() => {
    if (!isHovered) return;

    let bgX, bgY, pillX, pillY, tooltipX, tooltipY;

    if (bgRef.current) {
      bgX = gsap.quickTo(bgRef.current, 'x', { duration: 0.9, ease: 'power3.out' });
      bgY = gsap.quickTo(bgRef.current, 'y', { duration: 0.9, ease: 'power3.out' });
    }
    if (labelRef.current) {
      pillX = gsap.quickTo(labelRef.current, 'x', { duration: 0.5, ease: 'power3.out' });
      pillY = gsap.quickTo(labelRef.current, 'y', { duration: 0.5, ease: 'power3.out' });
    }
    if (tooltipRef.current) {
      tooltipX = gsap.quickTo(tooltipRef.current, 'x', { duration: 0.22, ease: 'power2.out' });
      tooltipY = gsap.quickTo(tooltipRef.current, 'y', { duration: 0.22, ease: 'power2.out' });
    }

    const handleMouseMoveCombined = (e) => {


      // 3. Move Floating Tooltip smoothly
      if (tooltipX && tooltipY) {
        tooltipX(e.clientX);
        tooltipY(e.clientY);
      }

      // 4. Background Parallax
      if (bgX && bgY) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.007; // ~8px shift
        const moveY = (e.clientY - window.innerHeight / 2) * 0.007;
        bgX(moveX);
        bgY(moveY);
      }

      // 5. Tactile Pill Magnetics
      if (pillX && pillY && labelRef.current) {
        const rect = labelRef.current.getBoundingClientRect();
        const pX = rect.left + rect.width / 2;
        const pY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - pX, e.clientY - pY);

        if (distance < 75) {
          pillX((e.clientX - pX) * 0.35);
          pillY((e.clientY - pY) * 0.35);
        } else {
          pillX(0);
          pillY(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMoveCombined, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMoveCombined);
  }, [isHovered]);

  // Section hover enter/leave handlers
  const handleSectionEnter = () => {
    setIsHovered(true);
  };

  const handleSectionLeave = () => {
    setIsHovered(false);
    resetCursor();
  };

  // 3. Scroll entry, count up, and floating animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cards = cardsRef.current;
      const innerCards = innerCardsRef.current;
      const line = lineRef.current;
      const orb = orbRef.current;
      const marquee = marqueeRef.current;
      const label = labelRef.current;

      // Initial state of components before entry
      gsap.set(cards, { opacity: 0, y: 70, scale: 0.94, filter: 'blur(8px)' });
      gsap.set(line, { scaleX: 0 });
      gsap.set(orb, { scale: 0, opacity: 0 });
      gsap.set(marquee, { opacity: 0, y: 30 });
      gsap.set(label, { opacity: 0, scale: 0.9 });

      // Staggered entry timeline on scroll trigger (Created ONCE to prevent scroll fight loops)
      const entryTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      entryTimeline.to(section, { opacity: 1, duration: 1.0 })
        .to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.0,
          stagger: 0.12,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
        }, '-=0.6')
        .to(line, {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.inOut'
        }, '-=0.2')
        .to(orb, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(2)'
        }, '<')
        .to(marquee, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.2')
        .to(label, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        }, '<');

      // Stats numbers count up triggers (Triggered ONCE on scroll in view)
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const text = stats[i].value;
        if (text === '24/7') { el.textContent = text; return; }
        const numericPart = parseInt(text);
        if (isNaN(numericPart)) return;
        const suffix = text.replace(/[0-9]/g, '');

        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericPart,
          duration: 2.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
        });
      });

      // Subtle desynced INNER card float animations (no property conflicts with outer containers)
      innerCards.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: '+=4',
          duration: 5.2 + i * 0.45,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.3
        });
      });

      // Drifting particles animation
      particlesRef.current.forEach((p, i) => {
        if (!p) return;
        gsap.to(p, {
          x: `+=${35 + i * 8}`,
          y: `-=${60 + i * 12}`,
          opacity: 0.18,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.4
        });
      });

      // Scrolling marquee (extremely slow, imperceptible drift)
      let marqueeTween = null;
      if (marqueeRef.current) {
        marqueeTween = gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: 'none',
          duration: 36, // Slightly faster speed per user request
          repeat: -1
        });
      }

      return () => {
        if (marqueeTween) marqueeTween.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Luxury Tooltip Content updates
  const showTooltip = (t) => {
    if (tooltipRef.current) {
      const quoteEl = tooltipRef.current.querySelector('.tooltip-quote');
      const roleEl = tooltipRef.current.querySelector('.tooltip-role');
      const stars = tooltipRef.current.querySelectorAll('.tooltip-star');

      if (isTooltipActive.current) {
        // Tooltip is already open, just cross-fade the text inside to avoid jumpy scale/blur animations
        gsap.killTweensOf([quoteEl, roleEl, stars]);
        gsap.timeline()
          .to([quoteEl, roleEl], {
            opacity: 0,
            y: -5,
            duration: 0.12,
            ease: 'power2.in'
          })
          .to(stars, {
            opacity: 0.2,
            scale: 0.8,
            duration: 0.1,
            stagger: 0.02
          }, '<')
          .add(() => {
            if (quoteEl) quoteEl.innerText = `"${t.quote}"`;
            if (roleEl) roleEl.innerText = t.role;
          })
          .to([quoteEl, roleEl], {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out'
          })
          .to(stars, {
            opacity: 1,
            scale: 1,
            duration: 0.25,
            stagger: 0.05,
            ease: 'back.out(1.8)'
          }, '-=0.15');
      } else {
        isTooltipActive.current = true;
        if (quoteEl) quoteEl.innerText = `"${t.quote}"`;
        if (roleEl) roleEl.innerText = t.role;

        // Spring-loaded popup trigger
        gsap.killTweensOf(tooltipRef.current);
        gsap.fromTo(tooltipRef.current,
          { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'back.out(1.3)' }
        );

        // Star reveal sequentially
        gsap.killTweensOf(stars);
        gsap.fromTo(stars,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, stagger: 0.08, duration: 0.35, ease: 'back.out(2)' }
        );

        // Quote text fade upward
        gsap.killTweensOf(quoteEl);
        gsap.fromTo(quoteEl,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.45, delay: 0.15, ease: 'power2.out' }
        );
      }
    }
  };

  const hideTooltip = () => {
    isTooltipActive.current = false;
    if (tooltipRef.current) {
      gsap.killTweensOf(tooltipRef.current);
      gsap.to(tooltipRef.current, {
        opacity: 0,
        scale: 0.94,
        duration: 0.3,
        ease: 'power3.in'
      });
    }
  };

  return (
    <section
      id="stats-testimonials"
      ref={sectionRef}
      onMouseEnter={handleSectionEnter}
      onMouseLeave={handleSectionLeave}
      style={{
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '14vh 0 6vh 0',
        boxSizing: 'border-box',
        backgroundColor: '#F4F5F7',
        color: '#0F172A'
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `

        /* Layered Background Styling */
        .parallax-bg {
          position: absolute;
          inset: -20px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
        }

        .ambient-veil {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.35);
          pointer-events: none;
          z-index: 1;
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.025;
          z-index: 2;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='noiseFilter'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.65'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: noiseShift 0.8s steps(4) infinite;
        }

        @keyframes noiseShift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-1%, 1%); }
          50% { transform: translate(1%, -1%); }
          75% { transform: translate(-1%, -1%); }
        }

        .ambient-glow-blob {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.11) 0%, transparent 60%);
          filter: blur(160px);
          pointer-events: none;
          z-index: 2;
        }

        .edge-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 40%, rgba(15, 23, 42, 0.04) 100%);
          pointer-events: none;
          z-index: 3;
        }

        /* Ambient Blobs in Background */
        .ambient-blob-left {
          position: absolute;
          width: 450px;
          height: 450px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 217, 255, 0.09) 0%, transparent 70%);
          left: 8%;
          top: 15%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 2;
        }

        .ambient-blob-right {
          position: absolute;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 217, 255, 0.07) 0%, transparent 70%);
          right: 12%;
          bottom: 12%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 2;
        }

        /* Ambient Drift Particles */
        .particle-node {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: rgba(0, 217, 255, 0.35);
          filter: blur(0.5px);
          pointer-events: none;
          z-index: 3;
        }

        /* Stats Cards Redesign */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          width: 90%;
          margin: 0 auto;
          align-items: start;
        }

        .stat-card-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          perspective: 1200px;
        }

        .stat-main-card {
          width: 100%;
          padding: 2.2rem 1.5rem;
          background: rgba(255, 255, 255, 0.42);
          border: 1.5px solid rgba(0, 217, 255, 0.35); /* Always show cyan border per user request */
          border-radius: 20px;
          text-align: center;
          z-index: 10;
          transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), 
                      border-color 0.45s ease, 
                      box-shadow 0.45s ease, 
                      background-color 0.45s ease;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        /* Diagonal Specular sweep effect */
        .specular-sweep {
          position: absolute;
          top: 0;
          left: -150%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.42) 40%, rgba(255,255,255,0.1) 45%, transparent 70%);
          transition: left 0.45s ease-in-out;
          pointer-events: none;
          z-index: 11;
        }

        .stat-card-container:hover .specular-sweep {
          left: 150%;
        }

        /* Inner Highlight Top reflection edge */
        .inner-highlight {
          position: absolute;
          top: 0;
          left: 5%;
          right: 5%;
          height: 1.5px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent);
          pointer-events: none;
          z-index: 12;
        }

        .stat-card-container:hover .stat-main-card {
          transform: translateY(-20px) scale(1.03);
          border-color: rgba(0, 217, 255, 0.65);
          background: #FFFFFF;
          box-shadow: 0 15px 45px rgba(0, 217, 255, 0.12); /* Optimized light glow box-shadow */
        }

        .stat-number {
          font-size: clamp(2.5rem, 5vh, 4rem);
          font-weight: 900;
          font-family: var(--font-display);
          color: #0F172A;
          line-height: 1;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
          transition: color 0.45s ease, text-shadow 0.45s ease;
        }

        .stat-card-container:hover .stat-number {
          color: #00D9FF;
          text-shadow: 0 0 10px rgba(0, 217, 255, 0.15);
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(15, 23, 42, 0.58);
          margin: 0;
          transition: color 0.45s ease;
        }

        .stat-card-container:hover .stat-label {
          color: #0F172A;
        }

        /* Spring-Like Sliding reveal panel drawer */
        .stat-reveal-panel {
          position: absolute;
          top: 100%;
          width: 90%;
          background: #0B1020;
          border: 1.5px solid rgba(0, 217, 255, 0.22);
          border-top: none;
          border-radius: 0 0 16px 16px;
          padding: 2.4rem 1.2rem 1.2rem;
          z-index: 5;
          opacity: 0;
          transform: translateY(-16px) scaleY(0);
          transform-origin: top center;
          transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      opacity 0.35s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          pointer-events: none;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
        }

        .stat-card-container:hover .stat-reveal-panel {
          opacity: 1;
          transform: translateY(-16px) scaleY(1);
        }

        .stat-sub-text {
          font-size: 0.78rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.82);
          text-align: center;
          margin: 0;
          font-style: italic;
        }

        /* BETWEEN STATS & TESTIMONIALS DIVIDER */
        .divider-container {
          position: relative;
          width: 80%;
          max-width: 1000px;
          margin: 0.8vh auto;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2; /* Put line behind the cards/panels */
        }

        .divider-neon-line {
          width: 100%;
          height: 1.5px;
          background: rgba(0, 217, 255, 0.45);
          position: relative;
          overflow: hidden;
        }

        .energy-sweep {
          position: absolute;
          top: -1px;
          width: 100%;
          height: 3px;
          background: #00D9FF;
          box-shadow: 0 0 15px #00D9FF, 0 0 30px #00D9FF;
          animation: lineGlow 2.5s infinite ease-in-out;
        }

        @keyframes lineGlow {
          0%, 100% { opacity: 0.7; box-shadow: 0 0 12px #00D9FF; }
          50% { opacity: 1; box-shadow: 0 0 20px #00D9FF, 0 0 40px #00D9FF; }
        }

        .line-hint-above {
          position: absolute;
          right: 0;
          bottom: calc(100% + 8px);
          font-size: 0.68rem;
          font-family: var(--font-display);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(15, 23, 42, 0.65);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          white-space: nowrap;
        }

        .line-hint-below {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          font-size: 0.68rem;
          font-family: var(--font-display);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(15, 23, 42, 0.65);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          white-space: nowrap;
        }

        /* Testimonials Label Tactile Pill */
        .testimonials-header {
          text-align: center;
          margin-bottom: 1.5vh;
          z-index: 10;
        }

        .testimonials-label {
          display: inline-block;
          padding: 0.5rem 1.6rem;
          border: 1.5px solid rgba(0, 217, 255, 0.45); /* Always show cyan border per user request */
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0F172A;
          background: rgba(255, 255, 255, 0.85); /* Premium light backdrop */
          cursor: pointer;
          transition: letter-spacing 0.4s ease, 
                      color 0.4s ease, 
                      border-color 0.4s ease, 
                      box-shadow 0.4s ease, 
                      transform 0.4s ease,
                      background-color 0.4s ease;
          box-shadow: 0 4px 15px rgba(0, 217, 255, 0.08);
          will-change: transform, letter-spacing;
        }

        .testimonials-label:hover {
          color: #0F172A;
          border-color: rgba(0, 217, 255, 0.75);
          box-shadow: 0 8px 24px rgba(0, 217, 255, 0.18);
          letter-spacing: 0.28em;
          transform: translateY(-2px);
          background: #FFFFFF;
        }

        /* Scrolling Marquee & Outline Fill Left-to-Right */
        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 1.5vh 0;
          z-index: 10;
        }

        .marquee-wrapper:hover .marquee-item {
          opacity: 0.25;
        }

        .marquee-wrapper .marquee-item:hover {
          opacity: 1 !important;
        }

        .testimonial-title {
          font-size: clamp(3.5rem, 8vh, 7.5rem);
          font-family: var(--font-display);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(15, 23, 42, 0.58);
          text-transform: uppercase;
          background-image: linear-gradient(#00D9FF, #00D9FF);
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          background-size: 0% 100%;
          transition: background-size 0.55s cubic-bezier(0.22, 1, 0.36, 1), 
                      -webkit-text-stroke 0.55s ease,
                      text-shadow 0.4s ease;
          display: inline-block;
          position: relative; /* Make it a relative anchor for the underline-streak */
        }

        .marquee-wrapper .marquee-item:hover .testimonial-title {
          background-size: 100% 100%;
          -webkit-text-stroke: 1.5px #000000;
          text-shadow: 0 0 25px rgba(0, 217, 255, 0.42);
        }

        /* GPU Accelerated Underline Scale Transition */
        .underline-streak {
          display: block;
          position: absolute;
          bottom: -6px; /* Offset below the font baseline */
          left: 10%;
          width: 80%;
          height: 2px;
          background: #00D9FF;
          box-shadow: 0 0 8px #00D9FF;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .marquee-item:hover .underline-streak {
          transform: scaleX(1);
        }

        .testimonial-divider {
          font-size: clamp(2rem, 5vh, 5rem);
          font-family: var(--font-display);
          font-weight: 900;
          color: #FF2A54;
          margin-left: 3.5rem;
          display: inline-block;
        }
      `}} />

      {/* Layered Background Elements */}
      <div
        ref={bgRef}
        className="parallax-bg"
        style={{
          backgroundImage: bgLoaded ? `url('/images/page 5 background.png')` : 'none'
        }}
      />
      <div className="noise-overlay" />
      <div className="edge-vignette" />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="particle-node"
          style={{
            left: `${15 + i * 11}%`,
            top: `${20 + (i % 3) * 20}%`,
            opacity: 0
          }}
        />
      ))}

      {/* Top 50% - Stats Grid (Lifted upwards to prevent overlay issues when cards reveal on hover) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10, transform: 'translateY(-28px)' }}>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="stat-card-container"
            >
              <div
                ref={(el) => (innerCardsRef.current[index] = el)}
                className="stat-main-card"
              >
                <div className="specular-sweep" />
                <div className="inner-highlight" />
                <h3
                  ref={(el) => (numberRefs.current[index] = el)}
                  className="stat-number"
                >
                  {stat.value}
                </h3>
                <p className="stat-label">{stat.label}</p>
              </div>
              <div className="stat-reveal-panel">
                <p className="stat-sub-text">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Energy Divider Line */}
      <div className="divider-container">
        <div className="line-hint-above">
          MOVE CURSOR ↑
        </div>
        <div ref={lineRef} className="divider-neon-line">
          <div className="energy-sweep" />
        </div>
        <div className="line-hint-below">
          TO REVEAL MORE
        </div>
      </div>

      {/* Bottom 50% - Testimonials */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
        <div className="testimonials-header">
          <div
            ref={labelRef}
            className="testimonials-label"
          >
            Testimonials
          </div>
        </div>

        <div className="marquee-container">
          <div
            className="marquee-wrapper"
            ref={marqueeRef}
            style={{ width: '200%', display: 'flex', whiteSpace: 'nowrap' }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="marquee-item"
                onMouseEnter={() => { showTooltip(t); }}
                onMouseLeave={() => { hideTooltip(); }}
                style={{
                  padding: '0 3.5rem',
                  display: 'inline-block',
                  transition: 'opacity 0.3s ease',
                  position: 'relative'
                }}
              >
                <span className="testimonial-title">
                  {t.client}
                  <span className="underline-streak" />
                </span>
                <span className="testimonial-divider">—</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Dark Luxury Testimonial Tooltip/Popup */}
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 999999,
          opacity: 0,
          willChange: 'transform, opacity, filter'
        }}
      >
        <div
          style={{
            width: '290px', // Reduced width per user request
            padding: '1.4rem', // Reduced padding per user request
            background: 'linear-gradient(135deg, #08111E, #0E1328, #070B16)',
            borderRadius: '20px',
            border: '1px solid rgba(0, 217, 255, 0.16)',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.45), inset 0 0 15px rgba(0, 217, 255, 0.04)',
            transform: 'translate(-50%, -120%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle quote watermark */}
          <svg
            style={{
              position: 'absolute',
              right: '1.1rem',
              bottom: '0.8rem',
              width: '60px', // Scaled down watermark
              height: '60px',
              color: 'rgba(0, 217, 255, 0.03)',
              pointerEvents: 'none'
            }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.765 2.827-4.765 6.21h6.217v9.64h-11.43zm-13 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4.77 2.827-4.77 6.21h6.217v9.64h-11.443z" />
          </svg>

          {/* Sequential Stars Animation Container */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '0.9rem' }}>
            {[...Array(5)].map((_, idx) => (
              <span
                key={idx}
                className="tooltip-star"
                style={{ color: '#00D9FF', fontSize: '1.2rem', display: 'inline-block' }}
              >
                ★
              </span>
            ))}
          </div>

          <p
            className="tooltip-quote"
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: '#FFFFFF',
              fontStyle: 'italic',
              margin: '0 0 1.2rem 0',
              willChange: 'transform, opacity'
            }}
          >
            ""
          </p>
          
          <div
            className="tooltip-role"
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.65)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            ""
          </div>
        </div>
      </div>

    </section>
  );
};

export default StatsTestimonials;
