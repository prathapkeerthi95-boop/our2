import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import ZoomHero from './components/ZoomHero';
import Services from './components/Services';
import About from './components/About';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import CircularMotionFrameBackground from './components/CircularMotionFrameBackground';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import ContactForm from './components/OrderForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import WhatsAppBubbleWidget from './components/WhatsAppBubbleWidget';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const preloaderRef = useRef(null);
  const preloaderBgRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const waveCanvasRef = useRef(null);

  useEffect(() => {
    // 0. Force scroll to top on refresh and disable auto restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    // Canvas fluid wave ribbon animation in logo colors across center
    const canvas = waveCanvasRef.current;
    let waveAnimId;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let step = 0;

      const resize = () => {
        if (canvas) {
          canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
          canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
        }
      };
      resize();
      window.addEventListener('resize', resize);

      const waves = [
        { color1: 'rgba(72, 202, 228, 0.55)', color2: 'rgba(0, 229, 255, 0.75)', speed: 0.015, amplitude: 70, wavelength: 0.005, offset: 0, heightRatio: 0.52 },
        { color1: 'rgba(0, 180, 216, 0.65)', color2: 'rgba(2, 128, 144, 0.80)', speed: 0.022, amplitude: 55, wavelength: 0.007, offset: 2.1, heightRatio: 0.56 },
        { color1: 'rgba(10, 37, 64, 0.45)', color2: 'rgba(0, 119, 182, 0.70)', speed: 0.012, amplitude: 85, wavelength: 0.004, offset: 4.2, heightRatio: 0.60 }
      ];

      const draw = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        step += 1;

        waves.forEach((w) => {
          ctx.beginPath();
          const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
          grad.addColorStop(0, w.color1);
          grad.addColorStop(0.5, w.color2);
          grad.addColorStop(1, w.color1);
          ctx.fillStyle = grad;

          const centerY = canvas.height * w.heightRatio;

          ctx.moveTo(0, canvas.height);
          for (let x = 0; x <= canvas.width; x += 4) {
            const y = centerY + Math.sin(x * w.wavelength + step * w.speed + w.offset) * w.amplitude 
                             + Math.cos(x * 0.002 + step * (w.speed * 0.5)) * (w.amplitude * 0.4);
            ctx.lineTo(x, y);
          }
          ctx.lineTo(canvas.width, canvas.height);
          ctx.closePath();
          ctx.fill();
        });

        waveAnimId = requestAnimationFrame(draw);
      };

      draw();
    }

    // Seamless Morph Splash Screen Timeline (2.1s total)
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto'; // Unlock scroll
        ScrollTrigger.refresh();
      }
    });

    // 1. Official Vivid N Logo Scale & Soft Radiant Aura Reveal (0.0s -> 0.65s)
    if (logoWrapperRef.current) {
      tl.fromTo(logoWrapperRef.current,
        { scale: 0.7, opacity: 0, filter: 'drop-shadow(0 0 0px rgba(10, 37, 64, 0))' },
        {
          scale: 1,
          opacity: 1,
          filter: 'drop-shadow(0 15px 35px rgba(10, 37, 64, 0.22)) drop-shadow(0 0 25px rgba(0, 180, 216, 0.3))',
          duration: 0.65,
          ease: 'back.out(1.7)'
        },
        0
      );
    }

    // 2. NUZAROX Title 3D Kinetic Depth Split & Crisp Navy Reveal (0.35s -> 1.4s)
    if (titleRef.current) {
      const charEls = titleRef.current.querySelectorAll('.preloader-char');
      
      tl.fromTo(titleRef.current,
        { letterSpacing: '0.08em', filter: 'blur(14px)' },
        { letterSpacing: '0.44em', filter: 'blur(0px)', duration: 0.85, ease: 'expo.out' },
        0.35
      );

      tl.fromTo(charEls,
        { yPercent: 150, opacity: 0, rotateX: -110, scale: 0.65 },
        { 
          yPercent: 0, 
          opacity: 1, 
          rotateX: 0, 
          scale: 1, 
          duration: 0.75, 
          stagger: 0.05, 
          ease: 'back.out(1.8)' 
        },
        0.35
      );
    }

    // 3. YOUR GROWTH. OUR MISSION Metallic Wave Sweep (0.75s -> 1.8s)
    if (taglineRef.current) {
      tl.fromTo(taglineRef.current,
        { y: 25, opacity: 0, letterSpacing: '0.12em', filter: 'blur(10px)' },
        { 
          y: 0, 
          opacity: 1, 
          letterSpacing: '0.42em', 
          filter: 'blur(0px)',
          duration: 0.75, 
          ease: 'expo.out' 
        },
        0.75
      );
    }

    // 4. DYNAMIC 100% PIXEL-EXACT SEAMLESS LOGO FLIGHT TO NAVBAR LOGO (2.15s -> 3.05s)
    tl.add(() => {
      if (logoWrapperRef.current) {
        // Find the exact Navbar logo element by ID
        const navLogoEl = document.getElementById('mainNavbarLogo') || document.querySelector('img[alt="N Logo"]');
        
        if (navLogoEl && logoWrapperRef.current) {
          // Lock transformOrigin to top left for 1:1 coordinate matching
          gsap.set(logoWrapperRef.current, { transformOrigin: 'top left' });

          const splashRect = logoWrapperRef.current.getBoundingClientRect();
          const navRect = navLogoEl.getBoundingClientRect();

          const deltaX = navRect.left - splashRect.left;
          const deltaY = navRect.top - splashRect.top;
          const targetScale = navRect.height / splashRect.height;

          gsap.to(logoWrapperRef.current, {
            x: `+=${deltaX}`,
            y: `+=${deltaY}`,
            scale: targetScale,
            filter: 'drop-shadow(0 4px 14px rgba(10, 37, 64, 0.25))',
            duration: 0.88,
            ease: 'power3.inOut'
          });
        }
      }
    }, 2.15);

    // 5. 3D CAMERA ZOOM PARTICLE DISSOLVE FOR TEXTS (2.15s -> 2.8s)
    if (titleRef.current && taglineRef.current) {
      tl.to(titleRef.current, {
        scale: 1.25,
        letterSpacing: '0.72em',
        opacity: 0,
        filter: 'blur(12px)',
        y: -40,
        duration: 0.75,
        ease: 'power3.in'
      }, 2.15);

      tl.to(taglineRef.current, {
        scale: 1.15,
        letterSpacing: '0.65em',
        opacity: 0,
        filter: 'blur(10px)',
        y: 30,
        duration: 0.7,
        ease: 'power3.in'
      }, 2.15);
    }

    // Light backdrop dissolves smoothly into light mode revealing Hero section underneath
    if (preloaderBgRef.current) {
      tl.to(preloaderBgRef.current, {
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.88,
        ease: 'power2.inOut'
      }, 2.15);
    }

    // Fade splash logo seamlessly right as it seats on top of Navbar logo
    if (logoWrapperRef.current) {
      tl.to(logoWrapperRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: 'power1.out'
      }, 2.95);
    }

    // Complete preloader at 3.15s
    tl.set(preloaderRef.current, { display: 'none' });

    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.15,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const handleRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", handleRefresh);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    /* ═════════════════════════════════════════════════════════════════════
       METASKAPES-STYLE DIVERSE & HYPER-FAST BI-DIRECTIONAL TRANSITION ENGINE
       - Fast 0.38s - 0.52s durations for instant responsiveness
       - 5 Distinct Signature Animation Modes across Headings, Text & Containers
       - Re-triggers bi-directionally on scroll down AND scroll up
       ═════════════════════════════════════════════════════════════════════ */
    
    // 1. Headings (h1, h2, h3) — 5 Distinct Metaskapes Modes
    const headings = document.querySelectorAll('h1:not(.no-anim), h2:not(.no-anim), h3:not(.no-anim)');
    headings.forEach((el, idx) => {
      if (el.closest('#services') || el.closest('#process') || el.closest('.metaskapes-gsap-slide') || el.closest('#preloader') || el.closest('.anim-word')) return;
      
      const mode = idx % 5;
      let fromVars = { opacity: 0, y: 30, filter: 'blur(10px)' };
      let toVars = { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.48, ease: 'power4.out' };

      if (mode === 1) {
        // 3D Door Flip
        fromVars = { opacity: 0, rotateX: -65, y: 25, transformOrigin: '50% 100%' };
        toVars = { opacity: 1, rotateX: 0, y: 0, duration: 0.45, ease: 'back.out(1.7)' };
      } else if (mode === 2) {
        // Kinetic Letter Spacing Tracking Snap
        fromVars = { opacity: 0, letterSpacing: '-0.06em', x: -25 };
        toVars = { opacity: 1, letterSpacing: '-0.02em', x: 0, duration: 0.5, ease: 'expo.out' };
      } else if (mode === 3) {
        // Architectural Curtain Wipe
        fromVars = { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', x: -20 };
        toVars = { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', x: 0, duration: 0.52, ease: 'power3.out' };
      } else if (mode === 4) {
        // 3D Elastic Bounce Drop
        fromVars = { opacity: 0, y: -30, scale: 1.08, rotateZ: -2 };
        toVars = { opacity: 1, y: 0, scale: 1, rotateZ: 0, duration: 0.48, ease: 'back.out(2)' };
      }

      gsap.fromTo(el, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none'
        }
      });
    });

    // 2. Badges & Section Labels (.section-label, .metaskapes-badge, .badge)
    const badges = document.querySelectorAll('.section-label, .metaskapes-badge, .badge');
    badges.forEach((el, idx) => {
      const isEven = idx % 2 === 0;
      gsap.fromTo(el,
        { opacity: 0, x: isEven ? -30 : 30, letterSpacing: '0.04em' },
        {
          opacity: 1,
          x: 0,
          letterSpacing: '0.14em',
          duration: 0.42,
          ease: 'back.out(1.8)',
          scrollTrigger: {
            trigger: el,
            start: 'top 94%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 3. Paragraphs & Sentences (p, .metaskapes-subtext)
    const paragraphs = document.querySelectorAll('p:not(.no-anim), .metaskapes-subtext');
    paragraphs.forEach((el, idx) => {
      if (el.closest('#services') || el.closest('#process') || el.closest('.metaskapes-gsap-slide') || el.closest('#preloader')) return;
      
      const pMode = idx % 3;
      let pFrom = { opacity: 0, y: 22, filter: 'blur(6px)' };
      let pTo = { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' };

      if (pMode === 1) {
        pFrom = { opacity: 0, x: -25, filter: 'blur(4px)' };
        pTo = { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.48, ease: 'power2.out' };
      } else if (pMode === 2) {
        pFrom = { opacity: 0, y: 18, scale: 0.97 };
        pTo = { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: 'expo.out' };
      }

      gsap.fromTo(el, pFrom, {
        ...pTo,
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none'
        }
      });
    });

    // 4. Cards, Boxes & Containers (.card, .box, .reveal, .testimonial-card, .stat-card, etc.)
    const containers = document.querySelectorAll('.reveal, .card, .box, .metaskapes-card, .testimonial-card, .stat-card, .contact-card, .portfolio-card, .form-group');
    containers.forEach((el, idx) => {
      if (el.closest('#services') || el.closest('#process') || el.closest('#preloader')) return;

      let delay = 0;
      if (el.classList.contains('reveal-delay-1')) delay = 0.05;
      if (el.classList.contains('reveal-delay-2')) delay = 0.1;
      if (el.classList.contains('reveal-delay-3')) delay = 0.15;

      const isOdd = idx % 2 !== 0;

      gsap.fromTo(el, 
        { opacity: 0, y: 35, rotateX: 12, rotateZ: isOdd ? 1 : -1, scale: 0.94, filter: 'blur(6px)' },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          rotateZ: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.48, 
          delay: delay,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: el,
            start: "top 90%", 
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      
      {/* SEAMLESS MORPH SPLASH SCREEN — MATCHING REFERENCE IMAGE WITH LOGO WAVE EFFECT */}
      <div 
        ref={preloaderRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', overflow: 'hidden'
        }}
      >
        {/* LIGHT OFF-WHITE BACKDROP */}
        <div 
          ref={preloaderBgRef}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #F8FAFC 0%, #E9F0F8 50%, #E2E8F0 100%)',
            zIndex: 1
          }}
        />

        {/* LOGO COLOR WAVE CANVAS EFFECT */}
        <canvas 
          ref={waveCanvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />

        {/* CENTER CONTENT CONTAINER */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 2rem' }}>
          
          {/* 1. OFFICIAL CALIBRATED LOGO IMAGE WITH SOFT RADIANT SHADOW */}
          <div 
            ref={logoWrapperRef}
            style={{ 
              width: 'clamp(140px, 24vw, 240px)', 
              height: 'clamp(110px, 18vh, 180px)', 
              marginBottom: '1.2rem',
              position: 'relative',
              willChange: 'transform, opacity'
            }}
          >
            <img 
              src="/n-logo-vivid.png" 
              alt="Nuzarox Logo" 
              style={{
                width: '100%', height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          {/* 2. NUZAROX BRAND TITLE MATCHING IMAGE 2 (WITH CUSTOM CYAN-TEAL RIBBON A) */}
          <div style={{ overflow: 'hidden', marginBottom: '0.4rem', willChange: 'transform, opacity' }}>
            <h1 
              ref={titleRef}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)', 
                fontWeight: '900', 
                letterSpacing: '0.32em', 
                color: '#0B2545',
                margin: 0,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.04em'
              }}
            >
              <span className="preloader-char" style={{ display: 'inline-block', color: '#0B2545' }}>N</span>
              <span className="preloader-char" style={{ display: 'inline-block', color: '#0B2545' }}>U</span>
              <span className="preloader-char" style={{ display: 'inline-block', color: '#0B2545' }}>Z</span>
              
              {/* STYLIZED BRAND LETTER A MATCHING IMAGE 2 */}
              <span className="preloader-char" style={{ display: 'inline-flex', alignItems: 'center', position: 'relative', width: '0.78em', height: '0.78em', margin: '0 0.05em' }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="aGradientSwoosh" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0077B6" />
                      <stop offset="50%" stopColor="#00B4D8" />
                      <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                  </defs>
                  {/* Navy A Left Leg */}
                  <path fill="#0B2545" d="M12 90 L48 10 H60 L24 90 Z" />
                  {/* Navy A Right Leg */}
                  <path fill="#0B2545" d="M78 90 L48 10 H60 L90 90 Z" />
                  {/* Cyan-Teal Ribbon Crossbar Swoosh */}
                  <path fill="url(#aGradientSwoosh)" d="M15 62 Q50 35 92 52 Q50 62 25 72 Z" style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 229, 255, 0.5))' }} />
                </svg>
              </span>

              <span className="preloader-char" style={{ display: 'inline-block', color: '#0B2545' }}>R</span>
              <span className="preloader-char" style={{ display: 'inline-block', color: '#0B2545' }}>O</span>
              <span className="preloader-char" style={{ display: 'inline-block', color: '#0B2545' }}>X</span>
            </h1>
          </div>

          {/* 3. TAGLINE IN CRISP DARK CHARCOAL NAVY */}
          <div style={{ overflow: 'hidden', willChange: 'transform, opacity' }}>
            <p 
              ref={taglineRef}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.72rem, 1.4vw, 0.95rem)',
                fontWeight: 800,
                letterSpacing: '0.38em',
                color: '#1E293B',
                margin: 0,
                textTransform: 'uppercase',
                opacity: 0,
                textShadow: '0 2px 10px rgba(0, 180, 216, 0.2)'
              }}
            >
              YOUR GROWTH. OUR MISSION.
            </p>
          </div>

        </div>
      </div>

      <Navbar />

      {/* ============================================================
          PAGE SECTIONS — Clean sequential layout, no cube interference
          ============================================================ */}

      {/* HERO SECTION */}
      <section id="hero" style={{ 
        position: 'relative', 
        zIndex: 10,
        background: 'linear-gradient(to bottom, #FAFAFA, #F3F6FA)'
      }}>
        <ZoomHero />
      </section>

      {/* SERVICES SECTION */}
      <section id="services-wrapper" style={{ 
        position: 'relative', 
        zIndex: 10,
        backgroundColor: '#F5F3EF',
        overflow: 'hidden'
      }}>
        <Services />
      </section>

      {/* ABOUT SECTION */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        backgroundColor: '#F5F3EF' 
      }}>
        <About />
      </div>

      {/* UNIFIED CIRCULAR MOTION FRAME SYSTEM FOR STATS & PORTFOLIO */}
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: '#FAFAF8', overflow: 'hidden' }}>
        <CircularMotionFrameBackground />
        <Stats />
        <Portfolio />
      </div>

      {/* PROCESS + TESTIMONIALS */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        backgroundColor: '#020202' 
      }} className="section-dark">
        <Process />
        <Testimonials />
      </div>

      {/* CONTACT */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10
      }}>
        <ContactForm />
      </div>

      <Footer />
      <WhatsAppBubbleWidget />
    </>
  );
}

export default App;
