import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function AnimatedHeading({ text, mode = 'mask', className = '', style = {}, delay = 0, wordStyles = {} }) {
  const containerRef = useRef(null);

  const words = text.split(' ').map((word, i) => ({
    text: word,
    key: `word-${i}`,
    hasSpace: i !== text.split(' ').length - 1,
    isBreak: word === '\\n'
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "restart none none reset"
        },
        delay: delay
      });

      if (mode === 'mask') {
        const wordEls = el.querySelectorAll('.anim-word-inner');
        tl.fromTo(wordEls, 
          { yPercent: 130, rotateZ: 4, opacity: 0 },
          { yPercent: 0, rotateZ: 0, opacity: 1, duration: 0.55, stagger: 0.03, ease: "expo.out" }
        );
      } 
      else if (mode === 'blur') {
        const wordEls = el.querySelectorAll('.anim-word');
        tl.fromTo(wordEls,
          { filter: "blur(25px)", opacity: 0, scale: 1.28 },
          { filter: "blur(0px)", opacity: 1, scale: 1, duration: 0.6, stagger: 0.03, ease: "power3.out" }
        );
      }
      else if (mode === 'rotate') {
        const charEls = el.querySelectorAll('.anim-char');
        tl.fromTo(charEls,
          { rotateX: -90, opacity: 0, transformOrigin: "50% 100% -40px" },
          { rotateX: 0, opacity: 1, duration: 0.5, stagger: 0.015, ease: "back.out(1.7)" }
        );
      }
      else if (mode === 'slide') {
        const wordEls = el.querySelectorAll('.anim-word');
        tl.fromTo(wordEls,
          { x: -50, opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
          { x: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.55, stagger: 0.03, ease: "power4.out" }
        );
      }
      else if (mode === 'bounce') {
        const wordEls = el.querySelectorAll('.anim-word');
        tl.fromTo(wordEls,
          { y: -65, opacity: 0, rotateZ: -5 },
          { y: 0, opacity: 1, rotateZ: 0, duration: 0.6, stagger: 0.03, ease: "power2.out" }
        );
      }
      else if (mode === 'tracking') {
        const wordEls = el.querySelectorAll('.anim-word');
        tl.fromTo(wordEls,
          { opacity: 0, letterSpacing: '-0.08em', y: 30 },
          { opacity: 1, letterSpacing: '0.02em', y: 0, duration: 0.55, stagger: 0.03, ease: "power3.out" }
        );
      }
      else if (mode === 'scramble') {
        const charEls = el.querySelectorAll('.anim-char');
        charEls.forEach((charEl, i) => {
          const originalChar = charEl.dataset.char;
          const dummyChars = Array.from({length: 10}).map(() => chars[Math.floor(Math.random() * chars.length)]);
          
          tl.to(charEl, {
            opacity: 1,
            duration: 0.8,
            ease: "none",
            onUpdate: function() {
              const progress = this.progress();
              if (progress < 1) {
                charEl.innerText = dummyChars[Math.floor(progress * dummyChars.length)];
                charEl.style.color = "var(--accent-cyan)";
              } else {
                charEl.innerText = originalChar;
                charEl.style.color = ""; // reset
              }
            }
          }, i * 0.03);
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [mode, delay]);

  const isCharLevel = mode === 'scramble' || mode === 'rotate';

  return (
    <h2 ref={containerRef} className={className} style={{ ...style, margin: 0 }}>
      {words.map((w, wordIndex) => {
        if (w.isBreak) return <br key={w.key} />;
        const wordClean = w.text.replace(/[^a-zA-Z0-9]/g, '');
        const customWordStyle = wordStyles[w.text] || wordStyles[wordClean] || {};

        return (
          <span 
            key={w.key} 
            className="anim-word" 
            style={{ 
              display: 'inline-block', 
              overflow: mode === 'mask' ? 'hidden' : 'visible', 
              verticalAlign: 'top',
              willChange: 'transform, opacity, filter',
              ...customWordStyle
            }}
          >
            {!isCharLevel ? (
              <span className={mode === 'mask' ? "anim-word-inner" : ""} style={{ display: 'inline-block', ...customWordStyle }}>
                {w.text}
              </span>
            ) : (
              w.text.split('').map((char, charIndex) => (
                <span 
                  key={charIndex} 
                  className="anim-char" 
                  data-char={char}
                  style={{ display: 'inline-block', opacity: mode === 'scramble' || mode === 'rotate' ? 0 : 1, perspective: 400 }}
                >
                  {char}
                </span>
              ))
            )}
            {w.hasSpace && <span style={{ display: 'inline-block', width: '0.25em' }}>&nbsp;</span>}
          </span>
        );
      })}
    </h2>
  );
}
