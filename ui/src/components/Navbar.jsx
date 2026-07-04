import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    // Basic setup on load
  }, []);

  const handleMouseEnter = (idx) => {
    const linkEl = linksRef.current[idx];
    const navEl = navRef.current;
    const indicator = indicatorRef.current;
    if (!linkEl || !navEl || !indicator) return;

    // Calculate relative coordinates
    const linkRect = linkEl.getBoundingClientRect();
    const navRect = navEl.getBoundingClientRect();

    const left = linkRect.left - navRect.left;
    const width = linkRect.width;
    const top = linkRect.top - navRect.top;
    const height = linkRect.height;

    // Slide indicator smoothly with a liquid power4 ease deceleration
    gsap.to(indicator, {
      left: left,
      width: width,
      top: top,
      height: height,
      opacity: 1,
      duration: 0.5,
      ease: 'power4.out'
    });
  };

  const handleMouseLeave = () => {
    const indicator = indicatorRef.current;
    if (!indicator) return;

    // Fade out indicator smoothly when cursor leaves navigation area
    gsap.to(indicator, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <>
      <style>{`
        .nav-logo-text {
          font-family: 'Outfit', 'Montserrat', 'Inter', sans-serif;
          font-weight: 900;
          font-size: 1.12rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #ffffff 50%, #b0c4de 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          text-align: center;
          width: 100%;
          transition: letter-spacing 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-logo-text:hover {
          letter-spacing: 0.16em; /* Symmetrical expansion from center outward */
        }
        .nav-btn-link {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1.1rem;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #FFFFFF;
          text-decoration: none;
          opacity: 0.85;
          position: relative;
          z-index: 5;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-btn-link:hover {
          opacity: 1;
          letter-spacing: 0.18em; /* Horizontal expansion only, no rectangular double-highlights! */
        }
      `}</style>

      <nav 
        ref={navRef} 
        style={{
          position: 'fixed',
          top: '0.8rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 4rem)',
          maxWidth: '1200px',
          padding: '0.55rem 2.2rem',
          zIndex: 1000,
          background: 'rgba(15, 20, 32, 0.45)', // Frosted dark theme rounded glass capsule
          border: '1.2px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '50px',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseLeave={handleMouseLeave}
      >
        {/* SLIDING LIQUID GLASS INDICATOR + UNDERLINE */}
        <div 
          ref={indicatorRef} 
          style={{
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1.2px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '50px', // Perfect rounded edges matching the glass pill style
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0,
            display: 'block'
          }}
        >
          {/* Cyan outline colored underline */}
          <div style={{
            position: 'absolute',
            bottom: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '45%',
            height: '2px',
            background: '#00e5cc',
            borderRadius: '2px'
          }}/>
        </div>

        {/* LOGO TEXT: Stylized name "NUVAROX" centered in container so that expansion acts from the center outward */}
        <a 
          href="#" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            outline: 'none',
            width: '140px', // Anchor container width for centered expansion
            zIndex: 5
          }}
        >
          <span className="nav-logo-text">
            NUVAROX
          </span>
        </a>

        {/* NAV LINKS: spaced evenly, white, uppercase (no magnetic pull, simple horizontal letterSpacing expansion) */}
        <ul style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.5rem', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0,
          zIndex: 5
        }}>
          {['ABOUT', 'SERVICES', 'PORTFOLIO', 'PROCESS', 'CLIENTS'].map((link, idx) => (
            <li key={link}>
              <a 
                ref={el => linksRef.current[idx] = el}
                href={`#${link.toLowerCase()}`} 
                className="nav-btn-link"
                onMouseEnter={() => handleMouseEnter(idx)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA BUTTON: Styled like "See Our Work" with premium gradient border outline */}
        <a 
          href="#contact" 
          className="custom-pill-btn"
        >
          <span>Start a Project</span>
          <span className="arrow-icon">→</span>
        </a>
      </nav>
    </>
  );
};

export default Navbar;
