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
import SoftWavesBackground from './components/SoftWavesBackground';
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
          toggleActions: 'restart none none reset'
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
            toggleActions: 'restart none none reset'
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
          toggleActions: 'restart none none reset'
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
            toggleActions: "restart none none reset"
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

      {/* UNIFIED CIRCULAR MOTION FRAME SYSTEM FOR PORTFOLIO */}
      <div style={{ position: 'relative', zIndex: 15, backgroundColor: '#F1F4F9' }}>
        <SoftWavesBackground />
        <Portfolio />
      </div>

      {/* PROCESS + TESTIMONIALS */}
      <div style={{ 
        position: 'relative', 
        zIndex: 20, 
        backgroundColor: '#FFFFFF' 
      }}>
        <Process />
        <Testimonials />
      </div>

      {/* STATS (Floating Cards like Buzzworthy Awards) */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Stats />
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
