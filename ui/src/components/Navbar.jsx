import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './MagneticElement';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'About Us', href: '/#about' },
  { label: 'Our Work', href: '/#portfolio' },
  { label: 'Process', href: '/#process' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Careers', href: '/careers', isRoute: true }
];

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
          
          const isMobile = window.innerWidth <= 768 || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
          
          // Animate to Pill (Light Glass Mode)
          gsap.to(navInner, {
            backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.97)' : 'rgba(255, 255, 255, 0.75)',
            backdropFilter: isMobile ? 'none' : 'blur(32px) saturate(200%)',
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

    return () => {
      st.kill();
      showAnim.kill();
    };
  }, []);

  return (
    <header 
      ref={navContainerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      <style>{`
        @keyframes smoothBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(0, 229, 255, 0.2), inset 0 0 10px rgba(0, 229, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 229, 255, 0.4), inset 0 0 15px rgba(0, 229, 255, 0.2);
          }
        }
        .navbar-links a {
          position: relative;
          color: #11131A !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .navbar-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background: linear-gradient(90deg, #0A2E5C, #00A896);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .navbar-links a:hover {
          color: #00A896 !important;
          opacity: 1 !important;
        }
        .navbar-links a:hover::after {
          width: 100%;
        }
        .nav-start-btn {
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0.55rem 1.4rem;
          font-size: 0.85rem;
          color: #11131A;
          border-radius: 50px;
          font-weight: 700;
          background-color: #FFFFFF;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          text-decoration: none;
          display: inline-block;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-start-btn:hover {
          background-color: #11131A !important;
          color: #FFFFFF !important;
          border-color: #11131A !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18) !important;
          transform: translateY(-1px);
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

        {/* DESKTOP NAV LINKS (Exact match to Footer Company List) */}
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
          {navItems.map((item, index) => {
            if (item.isRoute) {
              return (
                <li key={item.label}>
                  <Link 
                    to={item.href} 
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
                    {item.label}
                  </Link>
                </li>
              );
            }
            return (
              <li key={item.label}>
                <a 
                  href={item.href} 
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
                  {item.label}
                </a>
              </li>
            );
          })}
          <li>
            <MagneticElement>
              <a 
                href="/#contact" 
                ref={btnRef}
                className="nav-start-btn"
              >
                Contact
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
            backgroundColor: 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            padding: 0,
            zIndex: 10001,
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ width: '20px', height: '14px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{
              display: 'block',
              width: '100%',
              height: '2px',
              backgroundColor: '#111827',
              borderRadius: '2px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(4px, 4.5px)' : 'none'
            }} />
            <span style={{
              display: 'block',
              width: '100%',
              height: '2px',
              backgroundColor: '#111827',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
              opacity: mobileMenuOpen ? 0 : 1,
              transform: mobileMenuOpen ? 'scaleX(0)' : 'none'
            }} />
            <span style={{
              display: 'block',
              width: '100%',
              height: '2px',
              backgroundColor: '#111827',
              borderRadius: '2px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(4px, -4.5px)' : 'none'
            }} />
          </div>
        </button>

        {/* MOBILE POPUP MENU */}
        {mobileMenuOpen && (
          <div
            className="mobile-nav-drawer"
            style={{
              position: 'absolute',
              top: '76px',
              left: '16px',
              right: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.9)',
              padding: '1.25rem',
              zIndex: 9999,
              pointerEvents: 'auto',
              animation: 'mobileMenuSlideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {navItems.map((item) => {
                if (item.isRoute) {
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href}
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
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
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
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <a
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.9rem',
                    background: 'linear-gradient(135deg, #0A2E5C 0%, #00A896 100%)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderRadius: '16px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    boxShadow: '0 8px 24px rgba(0, 168, 150, 0.35)',
                    letterSpacing: '0.02em'
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
