import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { 
    value: '2+', 
    label: 'Exclusive Clients', 
    badge: 'ACTIVE',
    accent: '#FF2A54',
    accentGlow: 'rgba(255, 42, 84, 0.15)',
    details: 'Limited intake for 100% dedicated focus on every project.'
  },
  { 
    value: '100%', 
    label: 'Success Rate', 
    badge: 'VERIFIED',
    accent: '#0052FF',
    accentGlow: 'rgba(0, 82, 255, 0.15)',
    details: 'Every project delivered successfully, exceeding expectations.'
  },
  { 
    value: '5+', 
    label: 'Products Shipped', 
    badge: 'SHIPPED',
    accent: '#FF7800',
    accentGlow: 'rgba(255, 120, 0, 0.15)',
    details: 'Enterprise-grade WebGL and e-commerce platforms deployed.'
  },
  { 
    value: '24/7', 
    label: 'Always Building', 
    badge: 'ONLINE',
    accent: '#00E676',
    accentGlow: 'rgba(0, 230, 118, 0.15)',
    details: 'Round-the-clock infrastructure monitoring and optimization.'
  }
];

const Stats = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const text = stats[i].value;
        if (text === '24/7') {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 24,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + text.replace(/[0-9]/g, '');
          }
        });
      });

      // Card Entry Reveal
      gsap.fromTo('.stat-card', 
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="stats">
      <style>{`
        #stats {
          /* Very compact section padding */
          padding: 4rem 5%;
          /* Plain, ultra-clean premium background */
          background: #FAFAFA;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          width: 100%;
          max-width: 1200px;
        }

        /* ——— COMPACT, CLEAN CARD ——— */
        .stat-card {
          background: #FFFFFF;
          /* Standard, elegant rounded shape */
          border-radius: 16px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          
          /* Fixed compact size so it never pushes the layout */
          height: 150px;
          padding: 20px;
          
          cursor: default;
          border: 1px solid rgba(0,0,0,0.04);
          
          /* Very subtle clean shadow */
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          
          overflow: hidden; 
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--card-accent);
          box-shadow: 0 12px 30px var(--card-glow);
        }

        /* Container for the main visible text */
        .stat-content-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: translateY(10px); /* Centered initially */
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .stat-card:hover .stat-content-main {
          transform: translateY(-15px); /* Slides up smoothly on hover */
        }

        /* Badge - Top Right */
        .stat-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px;
          border-radius: 12px;
          background: #F8F9FA;
          font-size: 0.5rem;
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
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--card-accent);
        }

        /* Huge Value Text */
        .stat-value {
          font-size: clamp(2.4rem, 3.5vw, 3rem);
          font-weight: 900;
          font-family: var(--font-display);
          color: #111111;
          margin: 0 0 2px 0;
          line-height: 1;
          letter-spacing: -1px;
          transition: color 0.4s ease;
        }

        .stat-card:hover .stat-value {
          color: var(--card-accent);
        }

        /* Label Text */
        .stat-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #888888;
          margin: 0;
          transition: color 0.4s ease;
        }

        .stat-card:hover .stat-label {
          color: #333333;
        }

        /* Hidden Details Section - Fades in from bottom */
        .stat-details {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          font-size: 0.72rem;
          line-height: 1.4;
          color: #666666;
          font-weight: 500;
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .stat-card:hover .stat-details {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.05s; /* Slight delay for smooth sequence */
        }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        }

        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="stat-card"
            style={{
              '--card-accent': stat.accent,
              '--card-glow': stat.accentGlow,
            }}
          >
            <div className="stat-badge">
              <span className="stat-badge-dot" />
              {stat.badge}
            </div>
            
            <div className="stat-content-main">
              <h3 className="stat-value" ref={el => numberRefs.current[i] = el}>
                {stat.value}
              </h3>
              <p className="stat-label">{stat.label}</p>
            </div>

            {/* This reveals smoothly inside the fixed card box */}
            <div className="stat-details">
              {stat.details}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
