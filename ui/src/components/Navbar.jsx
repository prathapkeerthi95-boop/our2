import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './MagneticElement';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navContainerRef = useRef(null);
  const navInnerRef = useRef(null);
  const logoTextRef = useRef(null);
  const logoImgRef = useRef(null);
  const linksRef = useRef([]);
  const btnRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const navContainer = navContainerRef.current;
    const navInner = navInnerRef.current;
    const logoText = logoTextRef.current;
    const logoImg = logoImgRef.current;
    const links = linksRef.current;
    const btn = btnRef.current;

    let isPill = false;

    // Smart show/hide animation for the whole container
    const showAnim = gsap.from(navContainer, { 
      yPercent: -150,
      paused: true,
      duration: 0.5,
      ease: "power3.out"
    }).progress(1);

    const st = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // Always show the navbar
        showAnim.play();

        // Morphing header logic: direct DOM manipulation for performance
        const heroHeight = window.innerHeight * 0.8;
        if (window.scrollY > heroHeight && !isPill) {
          isPill = true;
          
          // Animate to Pill (Light Glass Mode)
          gsap.to(navInner, {
            backgroundColor: 'rgba(255, 255, 255, 0.75)', // Light translucent glass base
            backdropFilter: 'blur(32px) saturate(200%)',
            webkitBackdropFilter: 'blur(32px) saturate(200%)',
            border: '1.5px solid rgba(0, 0, 0, 0.08)', 
            borderRadius: '50px',
            margin: '1.2rem auto 0',
            maxWidth: '920px',
            padding: '0 2.2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.5)',
            duration: 0.55,
            ease: "power3.out"
          });

          if (logoText) gsap.to(logoText, { color: '#11131A', duration: 0.3 });
          if (links.length) gsap.to(links.filter(Boolean), { color: '#11131A', duration: 0.3 });
          if (logoImg) gsap.to(logoImg, { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))', duration: 0.3 });
          if (btn) {
            gsap.to(btn, { 
              borderColor: 'rgba(0, 0, 0, 0.15)', 
              color: '#11131A', 
              duration: 0.3 
            });
          }
          
        } else if (window.scrollY <= heroHeight && isPill) {
          isPill = false;
          
          // Animate to Transparent (Light Hero Mode)
          gsap.to(navInner, {
            backgroundColor: 'transparent',
            backdropFilter: 'none',
            webkitBackdropFilter: 'none',
            border: '1px solid transparent',
            borderRadius: '0px',
            margin: '0 auto',
            maxWidth: '1600px',
            padding: '0 3rem',
            boxShadow: 'none',
            duration: 0.55,
            ease: "power3.out"
          });

          if (logoText) gsap.to(logoText, { color: '#11131A', duration: 0.3 });
          if (links.length) gsap.to(links.filter(Boolean), { color: '#11131A', duration: 0.3 });
          if (logoImg) gsap.to(logoImg, { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))', duration: 0.3 });
          if (btn) {
            gsap.to(btn, { 
              borderColor: 'rgba(0, 0, 0, 0.15)', 
              color: '#11131A', 
              duration: 0.3 
            });
          }
        }
      }
    });

    // Hover logic for the button
    const handleBtnEnter = () => {
      if (!btn) return;
      gsap.to(btn, {
        backgroundColor: '#11131A',
        color: '#FAFAFA',
        borderColor: '#11131A',
        duration: 0.2
      });
    };
    
    const handleBtnLeave = () => {
      if (!btn) return;
      gsap.to(btn, {
        backgroundColor: isPill ? 'rgba(255, 255, 255, 0.4)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 245, 255, 0.6) 100%)',
        color: '#11131A',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        duration: 0.2
      });
    };

    if (btn) {
      btn.addEventListener('mouseenter', handleBtnEnter);
      btn.addEventListener('mouseleave', handleBtnLeave);
    }

    return () => {
      st.kill();
      if (btn) {
        btn.removeEventListener('mouseenter', handleBtnEnter);
        btn.removeEventListener('mouseleave', handleBtnLeave);
      }
    };
  }, []);

  return (
    <div 
      ref={navContainerRef}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0,
        right: 0,
        width: '100%', 
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1rem'
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav-links {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .nav-inner-container {
            padding: 0 1.2rem !important;
            height: 60px !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .desktop-nav-links {
            display: flex !important;
          }
        }
        @keyframes smoothBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes mobileMenuSlideDown {
          from { opacity: 0; transform: translateY(-16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <nav 
        ref={navInnerRef}
        className="nav-inner-container"
        style={{
          pointerEvents: 'auto',
          margin: '0 auto',
          maxWidth: '1600px',
          width: '100%',
          height: '64px',
          backgroundColor: 'transparent',
          border: '1px solid transparent',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '0 3rem',
          position: 'relative'
        }}
      >
        {/* LOGO TOP LEFT */}
        <MagneticElement>
          <a 
            href="#" 
            ref={logoTextRef}
            style={{ 
              color: '#11131A', 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none'
            }}
          >
            <img 
              id="mainNavbarLogo"
              ref={logoImgRef}
              src="/n-logo-clean.png" 
              alt="N Logo" 
              onError={(e) => { e.target.onerror = null; e.target.src = '/n-icon.png'; }} 
              style={{ 
                height: '48px', 
                width: 'auto',
                animation: 'smoothBounce 2s ease-in-out infinite',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
              }} 
            />
          </a>
        </MagneticElement>

        {/* DESKTOP NAV LINKS */}
        <ul 
          className="desktop-nav-links navbar-links"
          style={{ 
            display: 'flex', 
            gap: '2.5rem', 
            listStyle: 'none', 
            margin: 0, 
            padding: 0, 
            alignItems: 'center'
          }}
        >
          {['Services', 'About', 'Portfolio', 'Process', 'Clients'].map((item, index) => {
            const href = item === 'Clients' ? '#testimonials' : `#${item.toLowerCase()}`;
            return (
              <li key={item}>
                <a 
                  href={href} 
                  ref={el => linksRef.current[index] = el}
                  style={{ 
                    color: '#11131A', 
                    textDecoration: 'none', 
                    fontSize: '0.85rem', 
                    fontWeight: 600,
                    opacity: 0.8,
                    transition: 'opacity 0.2s, color 0.3s',
                    position: 'relative',
                    letterSpacing: '0.02em'
                  }}
                >
                  {item}
                </a>
              </li>
            );
          })}
          <li>
            <MagneticElement>
                <a 
                  href="#contact" 
                  ref={btnRef}
                  style={{ 
                    padding: '0.5rem 1.15rem', 
                    fontSize: '0.8rem', 
                    border: '1px solid rgba(0, 0, 0, 0.15)', 
                    color: '#11131A',
                    borderRadius: '40px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 245, 255, 0.6) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 4px 15px rgba(255,255,255,0.05), inset 0 1px 1px rgba(255,255,255,0.1)',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                  }}
                >
                Start a Project
              </a>
            </MagneticElement>
          </li>
        </ul>

        {/* MOBILE MENU TOGGLE BUTTON (TOP RIGHT) */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            padding: 0,
            zIndex: 10001,
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ width: '20px', height: '15px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{
              width: '100%', height: '2.5px', backgroundColor: '#111827', borderRadius: '2px',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              transition: 'transform 0.3s ease'
            }} />
            <span style={{
              width: '100%', height: '2.5px', backgroundColor: '#111827', borderRadius: '2px',
              opacity: mobileMenuOpen ? 0 : 1,
              transition: 'opacity 0.2s ease'
            }} />
            <span style={{
              width: '100%', height: '2.5px', backgroundColor: '#111827', borderRadius: '2px',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              transition: 'transform 0.3s ease'
            }} />
          </div>
        </button>
      </nav>

      {/* MOBILE NAV DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              zIndex: 9998,
              pointerEvents: 'auto'
            }}
          />

          {/* Mobile Menu Panel */}
          <div
            style={{
              position: 'fixed',
              top: '72px',
              left: '16px',
              right: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              border: '1.5px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.9)',
              padding: '1.25rem',
              zIndex: 9999,
              pointerEvents: 'auto',
              animation: 'mobileMenuSlideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {['Services', 'About', 'Portfolio', 'Process', 'Clients'].map((item) => {
                const href = item === 'Clients' ? '#testimonials' : `#${item.toLowerCase()}`;
                return (
                  <li key={item}>
                    <a
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '0.8rem 1.1rem',
                        color: '#111827',
                        textDecoration: 'none',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        borderRadius: '14px',
                        backgroundColor: 'transparent',
                        transition: 'all 0.2s ease',
                        letterSpacing: '-0.01em'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
              <li style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.9rem 1.2rem',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #00E5FF 0%, #00A896 100%)',
                    boxShadow: '0 8px 25px rgba(0, 229, 255, 0.35)',
                    letterSpacing: '0.02em',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;

