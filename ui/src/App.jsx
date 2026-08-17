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
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import ContactForm from './components/OrderForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const preloaderRef = useRef(null);
  const preloaderBgRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    // 0. Force scroll to top on refresh and disable auto restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    // Seamless Morph Splash Screen Timeline (2.1s total)
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto'; // Unlock scroll
        ScrollTrigger.refresh();
      }
    });

    // 1. Official Vivid N Logo Scale & Radiant Neon Aura Reveal (0.0s -> 0.65s)
    if (logoWrapperRef.current) {
      tl.fromTo(logoWrapperRef.current,
        { scale: 0.7, opacity: 0, filter: 'drop-shadow(0 0 0px rgba(0, 229, 255, 0))' },
        {
          scale: 1,
          opacity: 1,
          filter: 'drop-shadow(0 0 45px rgba(0, 229, 255, 0.85)) drop-shadow(0 0 60px rgba(255, 42, 84, 0.65))',
          duration: 0.65,
          ease: 'back.out(1.7)'
        },
        0
      );
    }

    // 2. NUZAROX Title 3D Kinetic Depth Split & Chromatic Shimmer Reveal (0.35s -> 1.4s) [+1.0s duration]
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

    // 3. YOUR GROWTH, OUR MISSION Metallic Laser Wave Sweep & Neon Pulse (0.75s -> 1.8s) [+1.0s breath hold]
    if (taglineRef.current) {
      tl.fromTo(taglineRef.current,
        { y: 25, opacity: 0, letterSpacing: '0.12em', filter: 'blur(10px)' },
        { 
          y: 0, 
          opacity: 1, 
          letterSpacing: '0.42em', 
          filter: 'blur(0px)',
          textShadow: '0 0 28px rgba(0, 229, 255, 0.95), 0 0 50px rgba(0, 229, 255, 0.7)',
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
            filter: 'drop-shadow(0 0 16px rgba(0, 229, 255, 0.8))',
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

    // Dark backdrop dissolves smoothly into light mode revealing Hero section underneath
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
          toggleActions: 'play reverse play reverse'
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
            toggleActions: 'play reverse play reverse'
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
          toggleActions: 'play reverse play reverse'
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
            toggleActions: "play reverse play reverse"
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
      
      {/* SEAMLESS MORPH SPLASH SCREEN — STRICTLY 3 BRANDING ELEMENTS */}
      <div 
        ref={preloaderRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', overflow: 'hidden'
        }}
      >
        {/* DARK CINEMATIC BACKDROP */}
        <div 
          ref={preloaderBgRef}
          style={{
            position: 'absolute', inset: 0,
            backgroundColor: '#060609',
            zIndex: 1
          }}
        />

        {/* CENTER CONTENT CONTAINER */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 2rem' }}>
          
          {/* 1. OFFICIAL CALIBRATED LOGO IMAGE WITH NEON CYAN & CRIMSON RADIANT AURA */}
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

          {/* 2. NUZAROX BRAND TITLE */}
          <div style={{ overflow: 'hidden', marginBottom: '0.4rem', willChange: 'transform, opacity' }}>
            <h1 
              ref={titleRef}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2.2rem, 4.8vw, 4.2rem)', 
                fontWeight: '900', 
                letterSpacing: '0.38em', 
                color: '#FFFFFF',
                margin: 0,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}
            >
              {["N", "U", "Z", "A", "R", "O", "X"].map((char, index) => (
                <span key={index} className="preloader-char" style={{ display: 'inline-block' }}>{char}</span>
              ))}
            </h1>
          </div>

          {/* 3. TAGLINE IN VIBRANT CYAN */}
          <div style={{ overflow: 'hidden', willChange: 'transform, opacity' }}>
            <p 
              ref={taglineRef}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.72rem, 1.4vw, 0.95rem)',
                fontWeight: 800,
                letterSpacing: '0.38em',
                color: '#00E5FF',
                margin: 0,
                textTransform: 'uppercase',
                opacity: 0,
                textShadow: '0 0 16px rgba(0, 229, 255, 0.85), 0 0 30px rgba(0, 229, 255, 0.5)'
              }}
            >
              YOUR GROWTH, OUR MISSION
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
        backgroundColor: '#F5F3EF'
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

      {/* STATS SECTION */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        backgroundColor: '#F5F3EF'
      }}>
        <Stats />
      </div>

      {/* PORTFOLIO SECTION */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10
      }}>
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

      {/* CTA + CONTACT */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        backgroundColor: '#0D0D1A', 
        color: '#FFF' 
      }} className="section-dark">
        <CTABanner />
        <ContactForm />
      </div>

      <Footer />
    </>
  );
}

export default App;
