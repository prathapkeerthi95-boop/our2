import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { 
    value: '2+', 
    label: 'Exclusive Clients', 
    sarcasm: 'We are aiming to do more. For now, these two get 100% of our caffeine.' 
  },
  { 
    value: '100%', 
    label: 'Success Rate', 
    sarcasm: 'Because we are not even 99.9%. Hand sanitizers can settle for 99.9%, we don\'t.' 
  },
  { 
    value: '5+', 
    label: 'Products Shipped', 
    sarcasm: 'We are shipping more and more hereafter. We don\'t sleep, we just ship.' 
  },
  { 
    value: '24/7', 
    label: 'Always Building', 
    sarcasm: 'Because we are working 24/7. Your growth is our mission (and our sleep debt).' 
  }
];

const Stats = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each stat number counting up from 0
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const text = stats[i].value;
        
        // Skip animation for non-standard formats like 24/7
        if (text === '24/7') {
          el.textContent = text;
          return;
        }

        const numericPart = parseInt(text);
        if (isNaN(numericPart)) return;

        const suffix = text.replace(/[0-9]/g, '');
        const obj = { val: 0 };

        gsap.to(obj, {
          val: numericPart,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          }
        });
      });

      // Staggered card entrance reveal
      gsap.from('.stat-card', {
        scale: 0.85,
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="stats" 
      className="stats-section" 
      ref={sectionRef}
      style={{
        padding: '3rem 0 5rem', // Tighter spacing, enough room for slide-out drawers
      }}
    >
      <div className="container" style={{ position: 'relative' }}>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              style={{ width: '100%', position: 'relative', minHeight: '220px' }}
            >
              {/* 3D ground shadow that responds in reverse sync with card float */}
              <div 
                className={`shadow-pulse-${index}`}
                style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '12.5%',
                  width: '75%',
                  height: '10px',
                  background: 'rgba(0, 0, 0, 0.45)',
                  borderRadius: '50%',
                  zIndex: 0,
                  pointerEvents: 'none',
                  willChange: 'transform, opacity, filter'
                }}
              />

              <div 
                className={`stat-card float-card-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ 
                  position: 'relative', 
                  cursor: 'pointer', 
                  zIndex: hoveredIndex === index ? 30 : 2,
                }}
              >
                {/* Main Card (Glassmorphic layout) */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.14)',
                  border: '1.5px solid rgba(255, 255, 255, 0.35)',
                  borderRadius: '24px',
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  boxShadow: hoveredIndex === index ? '0 24px 50px rgba(0,0,0,0.12)' : '0 8px 30px rgba(0,0,0,0.03)',
                  transform: hoveredIndex === index ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease, background 0.3s ease',
                  position: 'relative',
                  zIndex: 2,
                  backdropFilter: 'blur(10px)',
                }}>
                  <h3 ref={el => numberRefs.current[index] = el} style={{
                    fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    margin: '0 0 0.4rem',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1
                  }}>
                    {stat.value}
                  </h3>
                  <p style={{
                    margin: 0,
                    color: '#0A0A10',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 700,
                    fontFamily: 'var(--font-body)'
                  }}>{stat.label}</p>
                </div>

                {/* Sarcastic Slide-Out Card (White) */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '80%', // Starts overlapping inside the main card
                    left: '5%',
                    width: '90%',
                    background: '#FFFFFF',
                    borderRadius: '0 0 20px 20px',
                    boxShadow: '0 18px 40px rgba(0,0,0,0.12)',
                    padding: '24px 16px 16px', // Extra top padding to handle overlay overlap
                    zIndex: 1,
                    pointerEvents: 'none',
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? 'translateY(15px)' : 'translateY(-15px)',
                    transition: 'opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    textAlign: 'center',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                >
                  <p 
                    style={{ 
                      margin: 0, 
                      fontSize: '0.74rem', 
                      color: 'rgba(10,10,16,0.75)', 
                      lineHeight: 1.45,
                      fontWeight: 600,
                      textTransform: 'none',
                      letterSpacing: 'normal',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {stat.sarcasm}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll/Hover reveal label */}
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          right: '20px',
          fontSize: '0.62rem',
          color: 'rgba(255, 255, 255, 0.35)',
          letterSpacing: '0.24em',
          fontFamily: 'var(--font-body)',
          textTransform: 'uppercase',
          pointerEvents: 'none'
        }}>
          [ Move mouse to reveal ]
        </div>
      </div>
    </section>
  );
};

export default Stats;
