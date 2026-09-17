import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { 
    value: '2+', label: 'Exclusive Clients', badge: 'ACTIVE', accent: '#FF2A54', accentGlow: 'rgba(255, 42, 84, 0.15)',
    details: 'Limited intake for 100% dedicated focus on every project.',
    pos: { left: '12vw', top: '40%', rotate: '-12deg', zIndex: 5 }
  },
  { 
    value: '100%', label: 'Success Rate', badge: 'VERIFIED', accent: '#0052FF', accentGlow: 'rgba(0, 82, 255, 0.15)',
    details: 'Every project delivered successfully, exceeding expectations.',
    pos: { left: '45vw', top: '15%', rotate: '15deg', zIndex: 3 }
  },
  { 
    value: '5+', label: 'Products Shipped', badge: 'SHIPPED', accent: '#FF7800', accentGlow: 'rgba(255, 120, 0, 0.15)',
    details: 'Enterprise-grade WebGL and e-commerce platforms deployed.',
    pos: { left: '78vw', top: '50%', rotate: '-8deg', zIndex: 6 }
  },
  { 
    value: '24/7', label: 'Always Building', badge: 'ONLINE', accent: '#00E676', accentGlow: 'rgba(0, 230, 118, 0.15)',
    details: 'Round-the-clock infrastructure monitoring and optimization.',
    pos: { left: '115vw', top: '25%', rotate: '6deg', zIndex: 4 }
  }
];

const Stats = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    let ctx = gsap.context(() => {
      // Counter animation
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const text = stats[i].value;
        if (text === '24/7') {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 24,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { 
              trigger: sectionRef.current, 
              start: 'top 75%',
              toggleActions: "restart none none reset" 
            },
            onUpdate: () => { el.textContent = `${Math.floor(obj.val)}/7`; }
          });
          return;
        }

        const numericPart = parseInt(text);
        if (isNaN(numericPart)) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericPart,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 75%',
            toggleActions: "restart none none reset"
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + text.replace(/[0-9]/g, '');
          }
        });
      });

      // Desktop Horizontal Scroll & Parallax Logic
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        
        // Pin and scroll horizontally
        // The track is 160vw wide, viewport is 100vw, so we move -60vw.
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
        
        // Floating parallax effect for cards as we scroll
        gsap.utils.toArray('.stat-card').forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -120 : 120, // Parallax vertical drift
            rotation: i % 2 === 0 ? "+=10" : "-=10",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${track.scrollWidth}`,
              scrub: 1
            }
          });
        });
        
        // Parallax for the massive background text
        gsap.to('.stats-bg-text', {
          x: "15vw", 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: 1
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="stats" className="stats-section">
      <div className="stats-track" ref={trackRef}>
        
        {/* MASSIVE BACKGROUND TEXT */}
        <div className="stats-bg-text">
          <span>S</span><span>T</span><span>A</span><span>T</span><span>S</span>
        </div>

        <div className="stats-pill-badge">
          TAP / HOVER TO REVEAL &rarr;
        </div>

        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="stat-card"
            style={{ 
              '--card-accent': stat.accent, 
              '--card-glow': stat.accentGlow,
              left: stat.pos.left,
              top: stat.pos.top,
              rotate: stat.pos.rotate,
              zIndex: stat.pos.zIndex
            }}
          >
            <div className="stat-content-main">
              <h3 className="stat-value" ref={el => numberRefs.current[i] = el}>
                0
              </h3>
              <p className="stat-label">{stat.label}</p>
            </div>

            <div className="stat-badge">
              <span className="stat-badge-dot"></span>
              {stat.badge}
            </div>

            <div className="stat-details">
              {stat.details}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .stats-section {
          position: relative;
          width: 100%;
          height: 100vh;
          background-color: #F1F4F9; /* Project Light Theme Background */
          overflow: hidden;
          z-index: 10;
        }

        .stats-track {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 160vw; /* Wide enough to allow horizontal scrolling */
          display: flex;
          align-items: center;
        }

        /* The massive background text */
        .stats-bg-text {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 4vw;
          font-family: var(--font-display);
          font-size: clamp(15rem, 32vw, 45rem);
          font-weight: 900;
          color: #E2E8F5; /* Very subtle text for light background */
          text-transform: uppercase;
          line-height: 0.8;
          pointer-events: none;
          z-index: 0;
          user-select: none;
        }

        .stats-pill-badge {
          position: absolute;
          top: 15%;
          left: 5vw;
          background: #000000;
          color: #FFFFFF;
          font-family: var(--font-body);
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          padding: 12px 24px;
          border-radius: 30px;
          text-transform: uppercase;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          animation: pulseBadge 2s infinite ease-in-out;
          z-index: 20;
        }

        @keyframes pulseBadge {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        /* The SCATTERED Card */
        .stat-card {
          position: absolute;
          width: 320px;
          height: 220px;
          background: #FFFFFF;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
          cursor: default;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
          border: 2px solid transparent;
        }

        .stat-card:hover {
          border-color: var(--card-accent);
          box-shadow: 0 40px 80px var(--card-glow);
        }

        .stat-content-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: translateY(12px);
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .stat-card:hover .stat-content-main {
          transform: translateY(-15px);
        }

        .stat-value {
          font-size: 3.5rem;
          font-weight: 900;
          font-family: var(--font-display);
          color: #111111;
          margin: 0 0 6px 0;
          line-height: 1;
          letter-spacing: -0.02em;
          transition: color 0.4s ease;
        }

        .stat-card:hover .stat-value {
          color: var(--card-accent);
        }

        .stat-label {
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #888888;
          margin: 0;
          transition: color 0.4s ease;
        }

        .stat-card:hover .stat-label {
          color: #111111;
        }

        .stat-details {
          position: absolute;
          bottom: 24px;
          left: 20px;
          right: 20px;
          font-size: 0.85rem;
          line-height: 1.4;
          color: #555555;
          font-weight: 600;
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .stat-card:hover .stat-details {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.05s;
        }

        .stat-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 12px;
          background: #F8F9FA;
          font-size: 0.55rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--card-accent);
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.4s ease;
        }

        .stat-card:hover .stat-badge {
          opacity: 1;
          transform: translateY(0);
          background: var(--card-glow);
        }

        .stat-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--card-accent);
        }

        /* Tablet Adjustments */
        @media (max-width: 1024px) {
          .stats-section {
            height: auto;
            min-height: auto;
          }
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .stats-section {
            height: auto;
            min-height: auto;
            padding: 4rem 0;
            overflow-x: hidden;
            overflow-y: auto;
          }
          
          .stats-bg-text {
            font-size: 6rem;
            flex-direction: column;
            text-align: center;
            top: 10%;
            transform: none;
            gap: 1rem;
          }

          .stats-track {
            position: relative;
            width: 100%;
            height: auto;
            flex-direction: column;
            align-items: center;
            gap: 2.5rem;
            padding-bottom: 2rem;
          }

          .stats-pill-badge {
            display: none !important;
          }

          .stat-card {
            position: relative;
            left: 0 !important;
            top: 0 !important;
            transform: none !important;
            width: 85vw;
            max-width: 340px;
            height: auto;
            min-height: 180px;
          }

          .stat-card .stat-content-main {
            transform: translateY(-15px);
          }
          .stat-card .stat-details,
          .stat-card .stat-badge {
            opacity: 1;
            transform: translateY(0);
          }
          .stat-value {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 480px) {
          .stats-section {
            padding: 3rem 0;
          }
          .stats-bg-text {
            font-size: 4rem;
          }
          .stat-card {
            width: 90vw;
            padding: 18px;
          }
          .stat-value {
            font-size: 2.4rem;
          }
          .stat-label {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;
