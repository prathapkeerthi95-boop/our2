import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './MagneticElement';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const indicatorRef = useRef(null);

  // Springs parameters for capsule
  const K = 0.08;
  const D = 0.72;

  useEffect(() => {
    // Scroll reveal/hide logic for Navbar
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
        if (self.direction === 1 && self.scrollY > 100) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }
      }
    });
  }, []);

  // Spring animation loop for capsule indicator on hover only
  useEffect(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;

    // Set initial opacity to 0 (hidden) and transitions
    indicator.style.opacity = '0';
    indicator.style.transition = 'opacity 0.25s ease, visibility 0.25s ease';
    indicator.style.visibility = 'hidden';

    let targetLeft = 0;
    let targetWidth = 0;
    let currentLeft = 0;
    let currentWidth = 0;
    let leftVel = 0;
    let widthVel = 0;

    let hoverIdx = null;

    const updateTarget = (idx) => {
      const el = linksRef.current[idx];
      if (el) {
        targetLeft = el.offsetLeft;
        targetWidth = el.offsetWidth;
      }
    };

    let rafId;
    const animate = () => {
      if (hoverIdx !== null) {
        updateTarget(hoverIdx);
        indicator.style.opacity = '1';
        indicator.style.visibility = 'visible';
      } else {
        indicator.style.opacity = '0';
      }

      // Spring calculations
      const forceL = (targetLeft - currentLeft) * K;
      leftVel = (leftVel + forceL) * D;
      currentLeft += leftVel;

      const forceW = (targetWidth - currentWidth) * K;
      widthVel = (widthVel + forceW) * D;
      currentWidth += widthVel;

      // Capsule gel-like stretch along velocity vector
      const stretch = 1 + Math.abs(leftVel) * 0.06;
      const transformOrigin = leftVel >= 0 ? 'left center' : 'right center';

      indicator.style.left = `${currentLeft}px`;
      indicator.style.width = `${currentWidth}px`;
      indicator.style.transform = `scaleX(${stretch})`;
      indicator.style.transformOrigin = transformOrigin;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // Mouse listeners for all links
    const handleMouseEnter = (idx) => {
      hoverIdx = idx;
    };
    const handleMouseLeave = () => {
      hoverIdx = null;
    };

    const links = linksRef.current;
    links.forEach((link, idx) => {
      if (link) {
        link.addEventListener('mouseenter', () => handleMouseEnter(idx));
        link.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      links.forEach((link, idx) => {
        if (link) {
          link.removeEventListener('mouseenter', () => handleMouseEnter(idx));
          link.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, []);

  return (
    <nav ref={navRef} className="navbar" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <div className="container">
        <MagneticElement>
          <a href="#" className="navbar-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="NUVAROX" style={{ height: '36px', width: 'auto', display: 'block' }} />
          </a>
        </MagneticElement>

        <ul className="navbar-links" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Spring Capsule Active Pill Indicator */}
          <div 
            ref={indicatorRef} 
            className="nav-indicator" 
            style={{ 
              position: 'absolute', 
              top: '50%',
              height: '32px', 
              marginTop: '-16px',
              backgroundColor: 'rgba(0, 56, 103, 0.06)', 
              border: '1px solid rgba(0, 56, 103, 0.12)',
              borderRadius: '50px', 
              zIndex: 0, 
              pointerEvents: 'none'
            }} 
          />

          <li>
            <a 
              ref={el => linksRef.current[0] = el}
              href="#services" 
              className="nav-item-link"
              style={{ padding: '0.4rem 1.1rem', display: 'inline-block', position: 'relative', zIndex: 1 }}
            >
              Services
            </a>
          </li>
          <li>
            <a 
              ref={el => linksRef.current[1] = el}
              href="#about" 
              className="nav-item-link"
              style={{ padding: '0.4rem 1.1rem', display: 'inline-block', position: 'relative', zIndex: 1 }}
            >
              About
            </a>
          </li>
          <li>
            <a 
              ref={el => linksRef.current[2] = el}
              href="#portfolio" 
              className="nav-item-link"
              style={{ padding: '0.4rem 1.1rem', display: 'inline-block', position: 'relative', zIndex: 1 }}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a 
              ref={el => linksRef.current[3] = el}
              href="#process" 
              className="nav-item-link"
              style={{ padding: '0.4rem 1.1rem', display: 'inline-block', position: 'relative', zIndex: 1 }}
            >
              Process
            </a>
          </li>
          <li>
            <a 
              ref={el => linksRef.current[4] = el}
              href="#testimonials" 
              className="nav-item-link"
              style={{ padding: '0.4rem 1.1rem', display: 'inline-block', position: 'relative', zIndex: 1 }}
            >
              Clients
            </a>
          </li>
          <li>
            <MagneticElement>
              <a href="#contact" className="btn-outline glass-btn nav-cta-btn" style={{ padding: '0.5rem 1.4rem', fontSize: '0.82rem', borderColor: 'rgba(0,0,0,0.15)', fontWeight: '600', position: 'relative', zIndex: 1 }}>
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
