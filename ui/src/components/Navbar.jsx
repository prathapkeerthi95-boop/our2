import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './MagneticElement';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const indicatorRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  // Adaptive dark/light navbar based on section background
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Light-background selectors — expand this list if new light sections are added
    const lightSelectors = ['.section-hero', '.section-about', '.about-section', '.services-wrapper', '.section-services'];

    const observers = [];
    const lightSectionStates = new Map();

    const updateNavTheme = () => {
      const isOverLight = Array.from(lightSectionStates.values()).some(v => v);
      if (isOverLight) {
        nav.classList.add('navbar--light-bg');
      } else {
        nav.classList.remove('navbar--light-bg');
      }
    };

    lightSelectors.forEach(selector => {
      const el = document.querySelector(selector);
      if (!el) return;

      lightSectionStates.set(selector, false);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            lightSectionStates.set(selector, entry.isIntersecting);
            updateNavTheme();
          });
        },
        {
          // rootMargin: only the top 60px strip where navbar sits
          rootMargin: '0px 0px -95% 0px',
          threshold: 0
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // HTML5 Canvas party popper particle explosion engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const triggerConfetti = (x, y) => {
    const colors = ['#FF2A54', '#7000FF', '#00E5FF', '#FFB800', '#FF5733', '#33FF57', '#00FFCC', '#FF00FF'];
    
    // Shoot 120 premium colored party poppers for performant festive burst
    for (let i = 0; i < 120; i++) {
      particlesRef.current.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 36, // wider horizontal spread
        vy: (Math.random() - 0.75) * 38 - 12, // higher upward force
        size: Math.random() * 9 + 4, // slightly larger particles for premium visibility
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        opacity: 1,
        decay: Math.random() * 0.0025 + 0.0015 // float much longer
      });
    }

    if (!animationRef.current) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      
      const update = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesRef.current = particlesRef.current.filter(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.16; // lower gravity to float longer
          p.vx *= 0.992; // lower friction to spread wider across the screen
          p.vy *= 0.992;
          p.rotation += p.rotationSpeed;
          p.opacity -= p.decay;

          if (p.opacity <= 0) return false;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          
          if (Math.random() > 0.45) {
            ctx.fillRect(-p.size / 2, -p.size, p.size, p.size * 1.5);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          
          ctx.restore();
          return true;
        });

        if (particlesRef.current.length > 0) {
          animationRef.current = requestAnimationFrame(update);
        } else {
          animationRef.current = null;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };
      update();
    }
  };

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

  const handleMouseMove = (e) => {
    const nav = navRef.current;
    if (!nav) return;
    const rect = nav.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    nav.style.setProperty('--nav-mx', `${x}px`);
    nav.style.setProperty('--nav-my', `${y}px`);
  };

  const handleMouseLeave = () => {
    const nav = navRef.current;
    if (!nav) return;
    nav.style.setProperty('--nav-mx', '50%');
    nav.style.setProperty('--nav-my', '50%');
  };

  return (
    <>
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 999999
        }} 
      />
      <nav 
        ref={navRef} 
        className="navbar" 
        style={{ position: 'fixed', zIndex: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
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
              backgroundColor: 'rgba(255, 255, 255, 0.45)', 
              border: '1px solid rgba(255, 255, 255, 0.55)',
              borderRadius: '50px', 
              zIndex: 0, 
              pointerEvents: 'none',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 12px rgba(0, 56, 103, 0.03)'
            }} 
          />

          <li>
            <a 
              ref={el => linksRef.current[0] = el}
              href="#about" 
              className="nav-item-link"
              style={{ padding: '0.4rem 1.1rem', display: 'inline-block', position: 'relative', zIndex: 1 }}
            >
              About
            </a>
          </li>
          <li>
            <a 
              ref={el => linksRef.current[1] = el}
              href="#services" 
              className="nav-item-link"
              style={{ padding: '0.4rem 1.1rem', display: 'inline-block', position: 'relative', zIndex: 1 }}
            >
              Services
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
              <a 
                href="#contact" 
                className="btn-outline glass-btn nav-cta-btn" 
                style={{ padding: '0.5rem 1.4rem', fontSize: '0.82rem', borderColor: 'rgba(0,0,0,0.15)', fontWeight: '600', position: 'relative', zIndex: 1 }}
                onMouseEnter={(e) => triggerConfetti(e.clientX, e.clientY)}
              >
                <span>Start a Project</span>
              </a>
            </MagneticElement>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
