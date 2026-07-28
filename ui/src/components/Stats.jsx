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
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate numbers counting up
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

      // Entry animation for cards
      gsap.fromTo('.stat-card-premium', 
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Global mouse tracker for the spotlight effect
  const handleMouseMove = (e) => {
    cardsRef.current.forEach(card => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <section 
      ref={sectionRef} 
      onMouseMove={handleMouseMove}
      style={{ 
        background: 'transparent',
        padding: '8rem 4%', 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>
        {`
          .stat-card-premium {
            position: relative;
            background: #FFFFFF;
            border-radius: 12px;
            padding: 3rem 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
            overflow: hidden;
            cursor: pointer;
            border: 1px solid rgba(0,0,0,0.03);
          }

          .stat-card-premium:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          }

          .stat-value {
            font-size: clamp(3rem, 4.5vw, 4.5rem);
            font-weight: 900;
            font-family: var(--font-display);
            line-height: 1;
            margin-bottom: 0.5rem;
            z-index: 2;
            color: #1A1A1A;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .stat-card-premium:hover .stat-value {
            transform: scale(1.05);
          }

          .stat-label {
            font-size: 0.85rem;
            color: #666666;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            font-weight: 600;
            font-family: var(--font-body);
            z-index: 2;
            transition: color 0.3s ease;
          }

          .stat-card-premium:hover .stat-label {
            color: #1A1A1A;
          }

          .sarcasm-reveal {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 2rem;
            background: #111111;
            transform: translateY(101%);
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 3;
            font-size: 0.95rem;
            color: #F8FAFC;
            line-height: 1.6;
            font-weight: 400;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .stat-card-premium:hover .sarcasm-reveal {
            transform: translateY(0);
          }
        `}
      </style>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card-premium"
              ref={el => cardsRef.current[index] = el}
            >
              <h3 
                className="stat-value"
                ref={el => numberRefs.current[index] = el}
              >
                {stat.value}
              </h3>
              <p className="stat-label">{stat.label}</p>

              <div className="sarcasm-reveal">
                {stat.sarcasm}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
