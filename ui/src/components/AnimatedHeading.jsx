import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function AnimatedHeading({ text, mode = 'mask', className = '', style = {}, delay = 0 }) {
  const containerRef = useRef(null);

  // Split text into words, preserving spaces and supporting \n for line breaks
  const words = text.split(' ').map((word, i) => ({
    text: word,
    key: `word-${i}`,
    hasSpace: i !== text.split(' ').length - 1,
    isBreak: word === '\\n'
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    
    // We wait a tiny bit to ensure layout is done
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true
        },
        delay: delay
      });

      if (mode === 'mask') {
        const wordEls = el.querySelectorAll('.anim-word-inner');
        tl.fromTo(wordEls, 
          { yPercent: 120, rotateZ: 3 },
          { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.05, ease: "expo.out" }
        );
      } 
      else if (mode === 'blur') {
        const wordEls = el.querySelectorAll('.anim-word');
        tl.fromTo(wordEls,
          { filter: "blur(20px)", opacity: 0, scale: 1.2 },
          { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.5, stagger: 0.05, ease: "power3.out" }
        );
      }
      else if (mode === 'rotate') {
        const charEls = el.querySelectorAll('.anim-char');
        tl.fromTo(charEls,
          { rotateX: -90, opacity: 0, transformOrigin: "50% 50% -50px" },
          { rotateX: 0, opacity: 1, duration: 1, stagger: 0.02, ease: "back.out(1.7)" }
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
          }, i * 0.03); // stagger manually
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [mode, delay]);

  return (
    <h2 ref={containerRef} className={className} style={{ ...style, margin: 0 }}>
      {words.map((w, wordIndex) => {
        if (w.isBreak) return <br key={w.key} />;
        return (
          <span key={w.key} className="anim-word" style={{ display: 'inline-block', overflow: mode === 'mask' ? 'hidden' : 'visible', verticalAlign: 'top' }}>
            {mode === 'mask' || mode === 'blur' ? (
              <span className={mode === 'mask' ? "anim-word-inner" : ""} style={{ display: 'inline-block' }}>
                {w.text}
              </span>
            ) : (
              // For rotate and scramble, we need character level
              w.text.split('').map((char, charIndex) => (
                <span 
                  key={charIndex} 
                  className="anim-char" 
                  data-char={char}
                  style={{ display: 'inline-block', opacity: mode === 'scramble' || mode === 'rotate' ? 0 : 1 }}
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
