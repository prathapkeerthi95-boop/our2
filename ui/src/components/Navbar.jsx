import React, { useRef, useEffect } from 'react';
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
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light translucent glass base
            backdropFilter: 'blur(32px) saturate(200%)',
            webkitBackdropFilter: 'blur(32px) saturate(200%)',
            border: '1.5px solid rgba(255, 255, 255, 0.5)', 
            borderRadius: '50px',
            margin: '1.2rem auto 0',
            maxWidth: '920px',
            padding: '0 2.2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)',
            duration: 0.55,
            ease: "power3.out"
          });

          gsap.to([logoText, ...links], { color: '#000000', duration: 0.3 }); // Keep text dark
          gsap.to(logoImg, { filter: 'none', duration: 0.3 }); // No brightness invert needed
          gsap.to(btn, { 
            borderColor: 'rgba(0,0,0,0.3)', 
            color: '#000000', 
            duration: 0.3 
          });
          
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

          gsap.to([logoText, ...links], { color: '#000000', duration: 0.3 });
          gsap.to(logoImg, { filter: 'none', duration: 0.3 });
          gsap.to(btn, { 
            borderColor: 'rgba(0,0,0,0.3)', 
            color: '#000000', 
            duration: 0.3 
          });
        }
      }
    });

    // Hover logic for the button
    const handleBtnEnter = () => {
      gsap.to(btn, {
        backgroundColor: isPill ? '#FFFFFF' : '#000000',
        color: isPill ? '#000000' : '#FFFFFF',
        borderColor: isPill ? '#FFFFFF' : '#000000',
        duration: 0.2
      });
    };
    
    const handleBtnLeave = () => {
      gsap.to(btn, {
        backgroundColor: 'transparent',
        color: isPill ? '#FFFFFF' : '#000000',
        borderColor: isPill ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)',
        duration: 0.2
      });
    };

    btn.addEventListener('mouseenter', handleBtnEnter);
    btn.addEventListener('mouseleave', handleBtnLeave);

    return () => {
      st.kill();
      btn.removeEventListener('mouseenter', handleBtnEnter);
      btn.removeEventListener('mouseleave', handleBtnLeave);
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
        padding: '0 1.5rem' // Ensure container padding is correct
      }}
    >
      <nav 
        ref={navInnerRef}
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
        <MagneticElement>
          <a 
            href="#" 
            ref={logoTextRef}
            style={{ 
              color: '#000000', 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none'
            }}
          >
            <style>
              {`
                @keyframes smoothBounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
              `}
            </style>
            <img 
              id="mainNavbarLogo"
              ref={logoImgRef}
              src="/n-logo-clean.png" 
              alt="N Logo" 
              onError={(e) => { e.target.onerror = null; e.target.src = '/n-icon.png'; }} 
              style={{ 
                height: '52px', 
                width: 'auto',
                animation: 'smoothBounce 2s ease-in-out infinite',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
              }} 
            />
          </a>
        </MagneticElement>

        <ul 
          className="navbar-links"
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
                    color: '#000000', 
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
                  padding: '0.5rem 1.2rem', 
                  fontSize: '0.8rem', 
                  border: `1px solid rgba(0,0,0,0.3)`, 
                  color: '#000000',
                  borderRadius: '50px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'border-color 0.3s, color 0.3s'
                }}
              >
                Start a Project
              </a>
            </MagneticElement>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
