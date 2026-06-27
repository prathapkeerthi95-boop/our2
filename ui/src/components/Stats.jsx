import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: '2+',
    label: 'Exclusive Clients',
    sub: "Because we're still counting. Seriously, more are coming. We just don't like to brag… yet."
  },
  {
    value: '100%',
    label: 'Success Rate',
    sub: "Not 99.9%. That remaining 0.1% keeps other agencies up at night. Not us."
  },
  {
    value: '5+',
    label: 'Products Shipped',
    sub: "Planning to go higher — the moment you choose us, this number will need an update."
  },
  {
    value: '24/7',
    label: 'Always Building',
    sub: "Your growth is our mission. We don't clock out. Sleep is a myth in this studio."
  }
];

const Stats = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);
  const boardRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Count-up animation — re-triggers every time section enters view
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const text = stats[i].value;
        if (text === '24/7') { el.textContent = text; return; }
        const numericPart = parseInt(text);
        if (isNaN(numericPart)) return;
        const suffix = text.replace(/[0-9]/g, '');

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: numericPart, duration: 2, ease: 'power2.out',
              onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
            });
          },
          onEnterBack: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: numericPart, duration: 2, ease: 'power2.out',
              onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
            });
          }
        });
      });

      // Boards swing in from top when scrolled
      boardRefs.current.forEach((board, i) => {
        if (!board) return;
        gsap.fromTo(board,
          { y: -80, opacity: 0, rotateZ: i % 2 === 0 ? -8 : 8 },
          {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 1.2,
            delay: i * 0.18,
            ease: 'back.out(1.6)',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true }
          }
        );

        // Continuous gentle wind sway - whole board+content together
        gsap.to(board, {
          rotateZ: i % 2 === 0 ? 2 : -2,
          duration: 2.8 + i * 0.35,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          transformOrigin: 'top center',
          delay: i * 0.5
        });

        // Add dark teal drop-shadow to the board (swings with it via transform)
        board.style.filter = 'drop-shadow(0 18px 32px rgba(0,210,200,0.65)) drop-shadow(0 8px 12px rgba(0,210,200,0.4))';
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" className="stats-section" ref={sectionRef} style={{ position: 'relative', padding: '4rem 0 3rem' }}>

      {/* Teal Flickering Live Background */}
      <style>{`
        @keyframes tealFuse {
        0%   { opacity: 0.22; }
        3%   { opacity: 0.08; }
        5%   { opacity: 0.24; }
        7%   { opacity: 0.06; }
        9%   { opacity: 0.20; }
        11%  { opacity: 0.04; }
        13%  { opacity: 0.22; }
        100% { opacity: 0.22; }
      }
      @keyframes tealFuse2 {
        0%   { opacity: 0.14; }
        20%  { opacity: 0.05; }
        21%  { opacity: 0.16; }
        22%  { opacity: 0.04; }
        23%  { opacity: 0.15; }
        24%  { opacity: 0.03; }
        25%  { opacity: 0.14; }
        100% { opacity: 0.14; }
      }
      @keyframes tealFuse3 {
        0%   { opacity: 0.10; }
        55%  { opacity: 0.03; }
        57%  { opacity: 0.12; }
        59%  { opacity: 0.02; }
        61%  { opacity: 0.11; }
        100% { opacity: 0.10; }
      }
      .stat-top-card {
        flex: 1;
        text-align: center;
        padding: 2.5rem 1rem;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: rgba(255,255,255,0.07);
        position: relative;
        cursor: none;
        transition: background 0.3s ease;
        /* Triple teal outline using outline + box-shadow layers */
        outline: 1.5px solid rgba(0,210,200,0.55);
        outline-offset: 4px;
        box-shadow:
          0 0 0 6px rgba(0,210,200,0.18),
          0 0 0 11px rgba(0,210,200,0.07);
        border-radius: 4px;
        margin: 0 4px;
      }
      .stat-top-card:hover {
        background: rgba(0,210,200,0.08);
        box-shadow:
          0 0 0 6px rgba(0,210,200,0.3),
          0 0 0 11px rgba(0,210,200,0.12),
          0 0 40px rgba(0,210,200,0.22),
          0 0 80px rgba(0,210,200,0.10);
        outline-color: rgba(0,210,200,0.9);
      }
        .stat-board-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          max-width: 240px;
          perspective: 600px;
        }
        .stat-chain-line {
          width: 2px;
          height: 52px;
          background: linear-gradient(to bottom, rgba(0,210,200,0.8) 0%, rgba(0,210,200,0.15) 100%);
          position: relative;
          flex-shrink: 0;
        }
        .stat-chain-line::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: rgba(0,210,200,0.9);
          box-shadow: 0 0 8px rgba(0,210,200,0.7);
        }
        .stat-chain-line::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(0,210,200,0.6);
        }
        .stat-board-card {
          border: 1.5px solid rgba(0,210,200,0.5);
          border-radius: 14px;
          padding: 1.4rem 1.2rem 1.6rem;
          text-align: center;
          width: 100%;
          transform-origin: top center;
          cursor: none;
          transition: box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          background: rgba(0,210,200,0.04);
          backdrop-filter: blur(6px);
        }
        .stat-board-card:hover {
          border-color: rgba(0,210,200,1);
          background: rgba(0,210,200,0.10);
          box-shadow:
            0 0 30px rgba(0,210,200,0.25),
            0 0 60px rgba(0,210,200,0.10),
            inset 0 0 20px rgba(0,210,200,0.08);
        }
        .stat-board-sub-text {
          font-size: 0.77rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          font-style: italic;
        }
        .stat-board-card:hover .stat-board-sub-text {
          color: rgba(0,210,200,0.8);
        }
        .stat-board-active {
          border-color: rgba(0,210,200,1) !important;
          background: rgba(0,210,200,0.12) !important;
          box-shadow:
            0 0 30px rgba(0,210,200,0.35),
            0 0 60px rgba(0,210,200,0.15),
            inset 0 0 20px rgba(0,210,200,0.10) !important;
          filter: drop-shadow(0 20px 36px rgba(0,210,200,0.75)) drop-shadow(0 10px 16px rgba(0,210,200,0.5)) !important;
        }
        .stat-board-active .stat-board-sub-text {
          color: rgba(0,210,200,0.9) !important;
        }
      `}</style>

      {/* Teal Bulb-Fuse Flicker Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,210,200,0.28) 0%, transparent 70%)',
          top: '-150px', left: '50%', transform: 'translateX(-50%)',
          animation: 'tealFuse 7s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: '350px', height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,190,0.2) 0%, transparent 70%)',
          bottom: '-80px', left: '15%',
          animation: 'tealFuse2 11s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,220,200,0.18) 0%, transparent 70%)',
          bottom: '-60px', right: '12%',
          animation: 'tealFuse3 9s ease-in-out infinite'
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* TOP — Big numbers row with triple teal outline */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '0', padding: '12px 0' }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-top-card"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3
                ref={el => numberRefs.current[index] = el}
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#FFFFFF', lineHeight: 1, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}
              >
                {stat.value}
              </h3>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,210,200,0.75)', margin: 0 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM — Hanging Board Chains */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'flex-start', paddingTop: '0', perspective: '900px' }}>
          {stats.map((stat, index) => (
            <div key={index} className="stat-board-unit">
              <div className="stat-chain-line" />
              <div
                className={`stat-board-card${hoveredIndex === index ? ' stat-board-active' : ''}`}
                ref={el => boardRefs.current[index] = el}
              >
                <p className="stat-board-sub-text">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stats;
