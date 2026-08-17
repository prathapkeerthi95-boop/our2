import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { 
    value: '2+', 
    label: 'Exclusive Clients', 
    badge: 'ACTIVE CLIENTS',
    accent: '#FF2A54',
    rgb: { r: 255, g: 42, b: 84 },
    accentGlow: 'rgba(255, 42, 84, 0.35)',
    sarcasm: 'We are aiming to do more. For now, these two get 100% of our caffeine.' 
  },
  { 
    value: '100%', 
    label: 'Success Rate', 
    badge: 'VERIFIED METRIC',
    accent: '#0052FF',
    rgb: { r: 0, g: 82, b: 255 },
    accentGlow: 'rgba(0, 82, 255, 0.35)',
    sarcasm: 'Because we are not even 99.9%. Hand sanitizers can settle for 99.9%, we don\'t.' 
  },
  { 
    value: '5+', 
    label: 'Products Shipped', 
    badge: 'SHIPPED LIVE',
    accent: '#FF7800',
    rgb: { r: 255, g: 120, b: 0 },
    accentGlow: 'rgba(255, 120, 0, 0.35)',
    sarcasm: 'We are shipping more and more hereafter. We don\'t sleep, we just ship.' 
  },
  { 
    value: '24/7', 
    label: 'Always Building', 
    badge: '24/7 ONLINE',
    accent: '#00E676',
    rgb: { r: 0, g: 230, b: 118 },
    accentGlow: 'rgba(0, 230, 118, 0.35)',
    sarcasm: 'Because we are working 24/7. Your growth is our mission (and our sleep debt).' 
  }
];

const Stats = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const numberRefs = useRef([]);
  const cardsRef = useRef([]);

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const activeColorRef = useRef({ r: 255, g: 42, b: 84 });
  const hoveredIdxRef = useRef(null);

  // Synchronize active card index for RAF loop
  useEffect(() => {
    hoveredIdxRef.current = hoveredIdx;
    if (hoveredIdx !== null) {
      activeColorRef.current = stats[hoveredIdx].rgb;
    } else {
      activeColorRef.current = { r: 255, g: 42, b: 84 };
    }
  }, [hoveredIdx]);

  // Number Counter & Scroll Entry
  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const text = stats[i].value;
        if (text === '24/7') {
          el.textContent = text;
          return;
        }

        const numericPart = parseInt(text);
        if (isNaN(numericPart)) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericPart,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + text.replace(/[0-9]/g, '');
          }
        });
      });

      gsap.fromTo('.stat-card-premium', 
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Live Canvas Interactive Particles Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      if (!sectionRef.current || !canvas) return;
      canvas.width = sectionRef.current.clientWidth;
      canvas.height = sectionRef.current.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Increased background particle density to 110 fine granules
    const particleCount = 110;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 400),
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      radius: Math.random() * 1.0 + 0.5,
      alpha: Math.random() * 0.45 + 0.25,
      phase: Math.random() * Math.PI * 2,
    }));

    // Dynamic Card Emitter Burst Particles Array
    let burstParticles = [];

    let curR = 255, curG = 42, curB = 84;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth color lerp towards target card color
      const targetRGB = activeColorRef.current;
      curR += (targetRGB.r - curR) * 0.08;
      curG += (targetRGB.g - curG) * 0.08;
      curB += (targetRGB.b - curB) * 0.08;

      const r = Math.round(curR);
      const g = Math.round(curG);
      const b = Math.round(curB);

      // 1. Render Constellation Connection Lines between close background particles
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * 0.20;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 2. Draw and move background particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Screen boundary wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.phase += 0.02;
        const currentAlpha = p.alpha * (0.7 + Math.sin(p.phase) * 0.3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Emit live glowing fine granules from the active hovered card
      const activeIdx = hoveredIdxRef.current;
      if (activeIdx !== null && cardsRef.current[activeIdx] && sectionRef.current) {
        const card = cardsRef.current[activeIdx];
        const cardRect = card.getBoundingClientRect();
        const secRect = sectionRef.current.getBoundingClientRect();

        // Calculate card position relative to section canvas
        const cardLeft = cardRect.left - secRect.left;
        const cardTop = cardRect.top - secRect.top;
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;

        // Spawn 3-4 fine granule burst particles per frame from hovered card boundaries
        for (let k = 0; k < 3; k++) {
          burstParticles.push({
            x: cardLeft + Math.random() * cardWidth,
            y: cardTop + Math.random() * cardHeight,
            vx: (Math.random() - 0.5) * 1.8,
            vy: (Math.random() - 0.5) * 1.8 - 0.4,
            radius: Math.random() * 1.2 + 0.6,
            alpha: 0.85,
            life: 1.0,
            colorRGB: stats[activeIdx].rgb
          });
        }
      }

      // 4. Update and render Card Hover Fine Granule Particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.life -= 0.022;
        bp.radius += 0.015;

        if (bp.life <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        const bRGB = bp.colorRGB;
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${bRGB.r}, ${bRGB.g}, ${bRGB.b}, ${bp.life * 0.75})`;
        ctx.shadowColor = `rgba(${bRGB.r}, ${bRGB.g}, ${bRGB.b}, 0.8)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Card 3D tilt + mouse tracking
  const handleCardMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = (x / rect.width) - 0.5;
    const yc = (y / rect.height) - 0.5;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    gsap.to(card, {
      rotateX: -yc * 16,
      rotateY: xc * 16,
      scale: 1.04,
      duration: 0.25,
      ease: "power2.out"
    });
  };

  const handleCardMouseLeave = (index) => {
    setHoveredIdx(null);
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.45,
      ease: "power2.out"
    });
  };

  const activeStat = hoveredIdx !== null ? stats[hoveredIdx] : null;

  return (
    <section 
      ref={sectionRef} 
      style={{ 
        background: 'linear-gradient(180deg, rgba(248,249,252,0.7) 0%, rgba(240,242,248,0.95) 50%, rgba(248,249,252,0.7) 100%)',
        padding: '4rem 4%', 
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s ease'
      }}
    >
      {/* Dynamic Background Volumetric Glow matched to active card color */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: activeStat 
            ? `radial-gradient(ellipse 950px 450px at 50% 50%, ${activeStat.accentGlow} 0%, rgba(245, 247, 252, 0) 75%)`
            : 'radial-gradient(ellipse 700px 300px at 50% 50%, rgba(255, 42, 84, 0.05) 0%, transparent 70%)',
          transition: 'background 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* HTML5 Canvas for Live Color-Morphing Background & Card Emitter Particles */}
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <style>
        {`
          @keyframes statDotPulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.5); opacity: 1; }
          }

          .stat-card-premium {
            position: relative;
            background: #FFFFFF;
            border-radius: 20px;
            padding: 2.4rem 1.4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: border-color 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.015);
            overflow: hidden;
            cursor: pointer;
            border: 1px solid rgba(0,0,0,0.06);
            transform-style: preserve-3d;
            perspective: 1000px;
            z-index: 2;
          }

          .stat-card-premium.is-active {
            border-color: var(--card-accent);
            box-shadow: 0 24px 60px var(--card-glow), 0 8px 24px rgba(0,0,0,0.04);
          }

          .stat-card-premium.is-dimmed {
            opacity: 0.72;
          }

          /* Top Accent Indicator Bar */
          .stat-card-accent-line {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3.5px;
            background: var(--card-accent);
            opacity: 0.45;
            transition: opacity 0.35s ease, height 0.35s ease, box-shadow 0.35s ease;
          }

          .stat-card-premium:hover .stat-card-accent-line {
            opacity: 1;
            height: 4.5px;
            box-shadow: 0 0 14px var(--card-accent);
          }

          /* Cursor Following Spotlight Glow */
          .stat-spotlight {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle 220px at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--card-glow), transparent 70%);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.35s ease;
            z-index: 1;
          }

          .stat-card-premium:hover .stat-spotlight {
            opacity: 1;
          }

          /* Live Status Badge */
          .stat-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.58rem;
            font-weight: 800;
            letter-spacing: 0.12em;
            color: var(--card-accent);
            background: rgba(0,0,0,0.035);
            padding: 0.2rem 0.55rem;
            border-radius: 20px;
            z-index: 2;
            transition: background 0.3s ease;
          }

          .stat-card-premium:hover .stat-badge {
            background: rgba(0,0,0,0.07);
          }

          .stat-badge-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--card-accent);
            animation: statDotPulse 1.8s ease-in-out infinite;
          }

          .stat-value {
            font-size: clamp(2.8rem, 4.2vw, 4.2rem);
            font-weight: 900;
            font-family: var(--font-display);
            line-height: 1;
            margin-bottom: 0.55rem;
            margin-top: 0.6rem;
            z-index: 2;
            color: #0A0A10;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.4s ease;
            transform: translateZ(25px);
          }

          .stat-card-premium:hover .stat-value {
            transform: translateZ(38px) scale(1.05);
            text-shadow: 0 6px 24px var(--card-glow);
          }

          .stat-label {
            font-size: 0.82rem;
            color: rgba(10, 10, 16, 0.60);
            text-transform: uppercase;
            letter-spacing: 0.16em;
            font-weight: 700;
            font-family: var(--font-body);
            z-index: 2;
            transition: color 0.3s ease, transform 0.4s ease;
            transform: translateZ(15px);
          }

          .stat-card-premium:hover .stat-label {
            color: #0A0A10;
          }

          /* Interactive Secret Reveal Sheet on Hover */
          .sarcasm-reveal {
            position: absolute;
            inset: 0;
            padding: 1.8rem 1.4rem;
            background: #0D0F14;
            transform: translateY(101%);
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 10;
            font-size: 0.92rem;
            color: #F8FAFC;
            line-height: 1.55;
            font-weight: 450;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-radius: 20px;
            box-shadow: inset 0 0 0 1.5px var(--card-accent);
          }

          .sarcasm-reveal-badge {
            font-size: 0.6rem;
            font-weight: 800;
            letter-spacing: 0.18em;
            color: var(--card-accent);
            text-transform: uppercase;
            margin-bottom: 0.5rem;
          }

          .stat-card-premium:hover .sarcasm-reveal {
            transform: translateY(0);
          }

          .stats-cards-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.4rem;
          }

          @media (max-width: 992px) {
            .stats-cards-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 576px) {
            .stats-cards-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
        <div className="stats-cards-grid">
          {stats.map((stat, index) => {
            const isHovered = hoveredIdx === index;
            const isDimmed = hoveredIdx !== null && !isHovered;

            return (
              <div 
                key={index} 
                className={`stat-card-premium ${isHovered ? 'is-active' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                ref={el => cardsRef.current[index] = el}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                style={{
                  '--card-accent': stat.accent,
                  '--card-glow': stat.accentGlow,
                }}
              >
                {/* Accent Indicator Top Bar */}
                <div className="stat-card-accent-line" />

                {/* Cursor Spotlight Layer */}
                <div className="stat-spotlight" />

                {/* Live Status Badge */}
                <div className="stat-badge">
                  <span className="stat-badge-dot" />
                  {stat.badge}
                </div>

                {/* Stat Counter Value */}
                <h3 
                  className="stat-value"
                  ref={el => numberRefs.current[index] = el}
                >
                  {stat.value}
                </h3>

                {/* Stat Label */}
                <p className="stat-label">{stat.label}</p>

                {/* Secret Reveal Sheet on Hover */}
                <div className="sarcasm-reveal">
                  <div className="sarcasm-reveal-badge">✦ INSIGHT</div>
                  <div>{stat.sarcasm}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
