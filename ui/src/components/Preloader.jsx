import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const flashRef = useRef(null);
  const logoScaleRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }
      });

      // 1. Initial State: Halves are pushed apart and blurred
      gsap.set(topHalfRef.current, { 
        xPercent: -30, 
        opacity: 0,
        filter: 'blur(15px)'
      });
      gsap.set(bottomHalfRef.current, { 
        xPercent: 30, 
        opacity: 0,
        filter: 'blur(15px)'
      });
      gsap.set(flashRef.current, { scale: 0, opacity: 0 });

      // 2. The Snap: Slices slam together to form the logo
      tl.to([topHalfRef.current, bottomHalfRef.current], {
        xPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'expo.out'
      })

      // 3. Flash impact exactly as they connect
      .to(flashRef.current, {
        scale: 1,
        opacity: 0.8,
        duration: 0.3,
        ease: 'power2.out'
      }, "-=0.8")
      .to(flashRef.current, {
        scale: 2,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, "-=0.5")

      // 4. Subtle scale up (breathe)
      .to(logoScaleRef.current, {
        scale: 1.05,
        duration: 1.2,
        ease: 'sine.inOut'
      }, "-=0.5")

      // 5. Exit: Drop logo and lift curtain
      .to(logoScaleRef.current, {
        y: -40,
        opacity: 0,
        scale: 1.1,
        duration: 0.6,
        ease: 'power3.in'
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'expo.inOut'
      }, "-=0.2")
      .set(containerRef.current, { display: 'none' });

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []); // <-- Empty dependency array to strictly run only ONCE on mount

  const imgStyle = {
    width: 'clamp(300px, 45vw, 550px)',
    height: 'auto',
    display: 'block'
  };

  return (
    <div
      ref={containerRef}
      className="preloader-container"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FFFFFF', // Solid white background
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform'
      }}
    >
      <div ref={logoScaleRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Flash Element */}
        <div 
          ref={flashRef}
          style={{
            position: 'absolute',
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00E5FF, #7000FF, transparent)',
            boxShadow: '0 0 20px 5px rgba(0, 229, 255, 0.6)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative' }}>
          {/* Top Half of the Logo */}
          <img 
            ref={topHalfRef}
            src="/nuzarox-logo-pure.png" 
            alt="Nuzarox Top" 
            style={{
              ...imgStyle,
              position: 'relative',
              zIndex: 2,
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)'
            }}
          />

          {/* Bottom Half of the Logo */}
          <img 
            ref={bottomHalfRef}
            src="/nuzarox-logo-pure.png" 
            alt="Nuzarox Bottom" 
            style={{
              ...imgStyle,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)'
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default Preloader;
