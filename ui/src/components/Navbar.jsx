import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './MagneticElement';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const showAnim = gsap.from(navRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // Hide on scroll down, show on scroll up. Always show at very top.
        if (self.direction === 1 && self.scrollY > 100) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }

        // Add glassmorphism background only when scrolled down a bit
        if (self.scrollY > 60) {
          navRef.current.classList.add('scrolled');
          navRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
          navRef.current.style.backdropFilter = 'blur(16px)';
          navRef.current.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
          // Text stays black since background is white
          navRef.current.style.color = '#0B0C10';
        } else {
          navRef.current.classList.remove('scrolled');
          navRef.current.style.backgroundColor = 'transparent';
          navRef.current.style.backdropFilter = 'none';
          navRef.current.style.borderBottom = 'none';
          // At the top, over the bright hero, text should be black
          navRef.current.style.color = '#0B0C10';
        }
      }
    });

    // Make sure initial state over bright hero is black
    navRef.current.style.color = '#0B0C10';
    const links = navRef.current.querySelectorAll('a');
    links.forEach(link => {
      if (!link.classList.contains('btn-primary')) {
        link.style.color = '#0B0C10';
      }
    });

  }, []);

  return (
    <nav ref={navRef} className="navbar" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, transition: 'background-color 0.3s, backdrop-filter 0.3s' }}>
      <div className="container">
        <MagneticElement>
          <a href="#" className="navbar-logo" style={{ color: '#0B0C10', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Logo" onError={(e) => e.target.style.display = 'none'} style={{ marginRight: '8px' }} />
            NUVAROX
          </a>
        </MagneticElement>

        <ul className="navbar-links">
          <li><a href="#services" style={{ color: '#0B0C10' }}>Services</a></li>
          <li><a href="#about" style={{ color: '#0B0C10' }}>About</a></li>
          <li><a href="#portfolio" style={{ color: '#0B0C10' }}>Portfolio</a></li>
          <li><a href="#process" style={{ color: '#0B0C10' }}>Process</a></li>
          <li><a href="#testimonials" style={{ color: '#0B0C10' }}>Clients</a></li>
          <li>
            <MagneticElement>
              <a href="#contact" className="btn-outline" style={{ padding: '0.5rem 1.4rem', fontSize: '0.82rem', borderColor: 'rgba(0,0,0,0.15)', fontWeight: '600' }}>
                <span>Start a Project</span>
              </a>
            </MagneticElement>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
