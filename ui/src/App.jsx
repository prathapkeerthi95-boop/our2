import React, { useEffect, useState, useRef } from 'react';
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
  const counterRef = useRef(null);
  const titleRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    // Cinematic Counter Preloader
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto'; // Unlock scroll
        ScrollTrigger.refresh();
      }
    });

    // 1. Counter animation
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2.2,
      ease: "power4.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(counter.value) + "%";
        }
      }
    });

    // 2. Hide counter
    tl.to(counterRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in"
    }, "-=0.2");

    // 3. Show NUVAROX text (Premium reveal)
    const letters = titleRef.current.querySelectorAll('.preloader-char');
    tl.fromTo(letters,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "expo.out" }
    );

    // 4. Slight pause, then pull text up
    tl.to(titleRef.current, {
      y: -50,
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "power2.in"
    }, "+=0.6");

    // 5. Cinematic Split Wipe (Dark background splits top and bottom)
    tl.to(panelsRef.current[0], {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "-=0.2");
    
    tl.to(panelsRef.current[1], {
      yPercent: 100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "<"); // start at the same time

    // Hide wrapper completely
    tl.set(preloaderRef.current, { display: 'none' });

    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Bulletproof Scroll Reveal setup
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      let delay = 0;
      if (el.classList.contains('reveal-delay-1')) delay = 0.15;
      if (el.classList.contains('reveal-delay-2')) delay = 0.3;
      if (el.classList.contains('reveal-delay-3')) delay = 0.45;
      if (el.classList.contains('reveal-delay-4')) delay = 0.6;

      gsap.fromTo(el, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%", 
            once: true
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      
      {/* ULTRA-PREMIUM CINEMATIC PRELOADER */}
      <div 
        ref={preloaderRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        {/* TOP SPLIT PANEL */}
        <div 
          ref={el => panelsRef.current[0] = el}
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '50vh', 
            backgroundColor: '#050505', zIndex: 1, willChange: 'transform' 
          }}
        />
        {/* BOTTOM SPLIT PANEL */}
        <div 
          ref={el => panelsRef.current[1] = el}
          style={{ 
            position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50vh', 
            backgroundColor: '#050505', zIndex: 1, willChange: 'transform' 
          }}
        />

        {/* PRELOADER CONTENT (Z-INDEX 2 to sit above panels) */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          
          {/* HUGE PERCENTAGE COUNTER */}
          <div 
            ref={counterRef} 
            style={{ 
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(5rem, 15vw, 12rem)', 
              fontWeight: '900', 
              color: 'rgba(255,255,255,0.05)',
              lineHeight: 1,
              letterSpacing: '-0.04em'
            }}
          >
            0%
          </div>

          {/* ELEGANT AGENCY TEXT */}
          <div style={{ overflow: 'hidden', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h1 
              ref={titleRef}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2rem, 5vw, 4rem)', 
                fontWeight: '900', 
                letterSpacing: '0.4em', 
                color: '#FFFFFF',
                margin: 0,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}
            >
              {"NUVAROX".split("").map((char, index) => (
                <span key={index} className="preloader-char" style={{ display: 'inline-block' }}>{char}</span>
              ))}
            </h1>
          </div>

        </div>
      </div>

      <Navbar />

      <main style={{ position: 'relative', zIndex: 10, overflowX: 'hidden' }}>
        
        <section className="section-divider">
          <ZoomHero />
        </section>

        <div style={{ backgroundColor: '#FAFAFA' }}>
          <Services />
        </div>

        <div style={{ backgroundColor: '#F5F3EF' }}>
          <About />
        </div>

        <div style={{ backgroundColor: '#0A0A0F', color: '#FFF' }}>
          <Stats />
        </div>

        <Portfolio />

        <div style={{ backgroundColor: '#FAFAFA' }}>
          <Process />
          <Testimonials />
        </div>

        <div style={{ backgroundColor: '#0D0D1A', color: '#FFF' }} className="section-dark">
          <CTABanner />
          <ContactForm />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
