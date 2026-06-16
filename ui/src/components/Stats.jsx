import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '2+', label: 'Exclusive Clients' },
  { value: '100%', label: 'Success Rate' },
  { value: '5+', label: 'Products Shipped' },
  { value: '24/7', label: 'Always Building' }
];

const Stats = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

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

      // Scale up entrance
      gsap.from('.stat-item', {
        scale: 0.8,
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
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
    <section id="stats" className="stats-section" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3 ref={el => numberRefs.current[index] = el}>
                {stat.value}
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
