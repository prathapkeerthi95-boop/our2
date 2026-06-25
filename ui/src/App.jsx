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
import NeuralGlobe from './components/NeuralGlobe';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import ContactForm from './components/OrderForm';
import Footer from './components/Footer';
import LiquidCursor from './components/LiquidCursor';
import InteractiveDripDivider from './components/InteractiveDripDivider';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const preloaderRef = useRef(null);
  const counterRef   = useRef(null);
  const titleRef     = useRef(null);
  const panelsRef    = useRef([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // ── Cinematic Preloader ──────────────────────────────
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        ScrollTrigger.refresh();
      }
    });

    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2.2,
      ease: 'power4.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(counter.value) + '%';
        }
      }
    });

    tl.to(counterRef.current, {
      y: -50, opacity: 0, duration: 0.6, ease: 'power3.in'
    }, '-=0.2');

    const letters = titleRef.current.querySelectorAll('.preloader-char');
    tl.fromTo(letters,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'expo.out' }
    );

    tl.to(titleRef.current, {
      y: -50, opacity: 0, scale: 0.9, duration: 0.6, ease: 'power2.in'
    }, '+=0.6');

    tl.to(panelsRef.current[0], {
      yPercent: -100, duration: 1.2, ease: 'power4.inOut'
    }, '-=0.2');

    tl.to(panelsRef.current[1], {
      yPercent: 100, duration: 1.2, ease: 'power4.inOut'
    }, '<');

    tl.set(preloaderRef.current, { display: 'none' });

    // ── Lenis Smooth Scrolling ────────────────────────────
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
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // ── Scroll Reveal ─────────────────────────────────────
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
          delay,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
          }
        }
      );
    });

    // ── Section entry effects ─────────────────────────────
    // Services cards: stagger float-in
    gsap.utils.toArray('.service-card-new').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.9, delay: i * 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true }
        }
      );
    });

    // Process steps: sequential stagger
    gsap.utils.toArray('.process-step').forEach((step, i) => {
      gsap.fromTo(step,
        { y: 40, opacity: 0, rotateX: 15 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.7, delay: i * 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: step, start: 'top 92%', once: true }
        }
      );
    });

    // Testimonial cards: slide from left/right alternating
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
      gsap.fromTo(card,
        { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8, delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true }
        }
      );
    });

    // Portfolio cards: scale up reveal
    gsap.utils.toArray('.portfolio-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0, scale: 0.93 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.85, delay: i * 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true }
        }
      );
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* iOS Liquid Glass Cursor */}
      <LiquidCursor />

      {/* ── CINEMATIC PRELOADER ─────────────────────── */}
      <div
        ref={preloaderRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        {/* Top split panel */}
        <div
          ref={el => panelsRef.current[0] = el}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '50vh',
            backgroundColor: '#050505', zIndex: 1, willChange: 'transform'
          }}
        />
        {/* Bottom split panel */}
        <div
          ref={el => panelsRef.current[1] = el}
          style={{
            position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50vh',
            backgroundColor: '#050505', zIndex: 1, willChange: 'transform'
          }}
        />

        {/* Preloader content */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div
            ref={counterRef}
            style={{
              position: 'absolute', top: '50%', left: '50%',
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
              {'NUVAROX'.split('').map((char, i) => (
                <span key={i} className="preloader-char" style={{ display: 'inline-block' }}>{char}</span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      <Navbar />

      <main style={{ position: 'relative', zIndex: 10, overflowX: 'hidden' }}>

        {/* ① HERO */}
        <section className="section-hero">
          <ZoomHero />
          <InteractiveDripDivider color="#FFFFFF" />
        </section>

        {/* ② SERVICES — frosted violet tint */}
        <section className="section-services">
          <Services />
          <InteractiveDripDivider color="#050505" />
        </section>

        {/* ③ ABOUT — warm cream, clipped polygon */}
        <section className="section-about">
          <About />
          <InteractiveDripDivider color="#F2F0EC" />
        </section>

        {/* ④ STATS — dark glass */}
        <div className="section-stats-wrapper" style={{ position: 'relative' }}>
          <div style={{ backgroundColor: '#0A0A0F', color: '#FFF' }}>
            <Stats />
          </div>
          <InteractiveDripDivider color="#0A0A0F" />
        </div>

        {/* ⑤ PORTFOLIO — dark grid */}
        <section className="section-portfolio">
          <Portfolio />
        </section>

        {/* ⑥ NEURAL GLOBE — antigravity engine */}
        <div style={{ position: 'relative' }}>
          <NeuralGlobe />
          <InteractiveDripDivider color="#050505" />
        </div>

        {/* ⑦ PROCESS — frosted white, angled */}
        <div className="section-process-wrapper" style={{ position: 'relative' }}>
          <div style={{ backgroundColor: '#F8F8FC' }}>
            <Process />
          </div>
          <InteractiveDripDivider color="#F8F8FC" />
        </div>

        {/* ⑧ TESTIMONIALS — glassmorphic mid-dark */}
        <section className="section-testimonials" style={{ position: 'relative' }}>
          <Testimonials />
          <InteractiveDripDivider color="#07070F" />
        </section>

        {/* ⑨ CTA + CONTACT — vivid dark */}
        <div className="section-cta-contact">
          <div style={{ backgroundColor: '#0D0D1A', color: '#FFF' }} className="section-dark">
            <CTABanner />
            <ContactForm />
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}

export default App;
