import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  
  useEffect(() => {
    // 1. Bulletproof Scroll Reveal
    // We explicitly set from and to states to guarantee visibility.
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      // Find out if there's a delay class
      let delay = 0;
      if (el.classList.contains('reveal-delay-1')) delay = 0.15;
      if (el.classList.contains('reveal-delay-2')) delay = 0.3;
      if (el.classList.contains('reveal-delay-3')) delay = 0.45;
      if (el.classList.contains('reveal-delay-4')) delay = 0.6;

      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%", // Trigger when 90% down the viewport
            once: true,
            // If scrolltrigger fails to init, ensure it forces completion
            onLeaveBack: self => self.disable()
          }
        }
      );
    });

  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 10, overflowX: 'hidden' }}>
        
        <div style={{ backgroundColor: '#FAFAFA' }}>
          <ZoomHero />
        </div>

        {/* Removed massive margins, using standard section padding now */}
        <div style={{ backgroundColor: '#FAFAFA' }}>
          <Services />
        </div>

        <div style={{ backgroundColor: '#F5F3EF' }}>
          <About />
        </div>

        <div style={{ backgroundColor: '#0A0A0F', color: '#FFF' }} className="section-dark">
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
