import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './MagneticElement';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navContainerRef = useRef(null);
  const navInnerRef = useRef(null);
  const progressRef = useRef(null);
  const logoTextRef = useRef(null);
  const logoImgRef = useRef(null);
  const linksRef = useRef([]);
  const btnRef = useRef(null);

  useEffect(() => {
    const navContainer = navContainerRef.current;
    const navInner = navInnerRef.current;
    const progress = progressRef.current;
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
          
          // Animate to Pill (Dark Section Mode)
          gsap.to(navInner, {
            backgroundColor: 'rgba(10, 10, 15, 0.85)',
            backdropFilter: 'blur(24px) saturate(180%)',
            webkitBackdropFilter: 'blur(24px) saturate(180%)', // For Safari
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50px',
            margin: '1rem auto 0',
            maxWidth: '900px',
            padding: '0 2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.05)',
            duration: 0.5,
            ease: "power3.out"
          });

          gsap.to([logoText, ...links], { color: '#FFFFFF', duration: 0.3 });
          gsap.to(logoImg, { filter: 'invert(1) brightness(2)', duration: 0.3 });
          gsap.to(btn, { 
            borderColor: 'rgba(255,255,255,0.3)', 
            color: '#FFFFFF', 
            duration: 0.3 
          });
          
          gsap.to(progress.parentElement, { opacity: 1, duration: 0.3 });
          
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
            duration: 0.5,
            ease: "power3.out"
          });

          gsap.to([logoText, ...links], { color: '#000000', duration: 0.3 });
          gsap.to(logoImg, { filter: 'none', duration: 0.3 });
          gsap.to(btn, { 
            borderColor: 'rgba(0,0,0,0.3)', 
            color: '#000000', 
            duration: 0.3 
          });
          
          gsap.to(progress.parentElement, { opacity: 0, duration: 0.3 });
        }

        // Update scroll progress bar
        const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        if (progress) {
          progress.style.transform = `scaleX(${scrollProgress})`;
        }
      }
    });

    // Hover logic for the button needs to read the current state
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
        borderColor: isPill ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
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
        width: '100%', 
        zIndex: 9999,
        pointerEvents: 'none' // Let clicks pass through the invisible container
      }}
    >
      <nav 
        ref={navInnerRef}
        style={{
          pointerEvents: 'auto', // Re-enable clicks on the actual nav
          margin: '0 auto',
          maxWidth: '1600px',
          height: '64px',
          backgroundColor: 'transparent',
          border: '1px solid transparent',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '0 3rem',
          position: 'relative',
          overflow: 'hidden'
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
              fontWeight: 900, 
              letterSpacing: '0.08em', 
              fontSize: '1rem',
              textDecoration: 'none'
            }}
          >
            <img 
              ref={logoImgRef}
              src="/logo.png" 
              alt="Logo" 
              onError={(e) => e.target.style.display = 'none'} 
              style={{ 
                marginRight: '8px', 
                height: '24px', 
                width: 'auto'
              }} 
            />
            NUVAROX
          </a>
        </MagneticElement>

        <ul style={{ 
          display: 'flex', 
          gap: '2rem', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0, 
          alignItems: 'center' 
        }}>
          {['Services', 'About', 'Portfolio', 'Process', 'Clients'].map((item, index) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`} 
                ref={el => linksRef.current[index] = el}
                style={{ 
                  color: '#000000', 
                  textDecoration: 'none', 
                  fontSize: '0.85rem', 
                  fontWeight: 600,
                  opacity: 0.8,
                  transition: 'opacity 0.2s',
                  position: 'relative',
                  letterSpacing: '0.02em'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                {item}
              </a>
            </li>
          ))}
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
                  display: 'inline-block'
                }}
              >
                Start a Project
              </a>
            </MagneticElement>
          </li>
        </ul>

        {/* Scroll Progress Indicator - Only visible when in Pill mode */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: 'rgba(255,255,255,0.05)',
            opacity: 0
          }}
        >
          <div 
            ref={progressRef}
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #7000FF, #00E5FF, #FF2A54)',
              transformOrigin: 'left',
              transform: 'scaleX(0)',
              transition: 'none'
            }}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
