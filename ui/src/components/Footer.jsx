import React, { useEffect, useRef } from 'react';

const Footer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const waves = [
      { yOffset: 0.35, frequency: 0.003, amplitude: 55, speed: 1.4, color: 'rgba(0, 229, 255, 0.60)', layers: 5 },
      { yOffset: 0.50, frequency: 0.002, amplitude: 75, speed: 1.0, color: 'rgba(0, 136, 255, 0.45)', layers: 6 },
      { yOffset: 0.65, frequency: 0.004, amplitude: 45, speed: 1.6, color: 'rgba(0, 230, 118, 0.42)', layers: 5 },
      { yOffset: 0.80, frequency: 0.0018, amplitude: 85, speed: 0.8, color: 'rgba(50, 130, 255, 0.40)', layers: 4 }
    ];

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) { animationFrameId = requestAnimationFrame(render); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Use source-over for light theme waves to avoid darkening them
      ctx.globalCompositeOperation = 'source-over';

      time += 0.015;

      waves.forEach((wave) => {
        for (let j = 0; j < wave.layers; j++) {
          ctx.beginPath();
          for (let i = 0; i <= canvas.width; i += 30) {
            const dx = i * wave.frequency;
            const yOffset = Math.sin(dx + time * wave.speed) * wave.amplitude 
                          + Math.cos(dx * 1.5 - time * (wave.speed * 0.8)) * (wave.amplitude * 0.4);
            const twist = Math.sin(dx * 0.8 + time + j * 0.15) * 25;
            const y = (canvas.height * wave.yOffset) + yOffset + twist + (j * 4);
            
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
          }
          ctx.strokeStyle = wave.color;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <footer className="footer" style={{ position: 'relative', overflow: 'hidden', background: '#F8F9FA' }}>
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.6
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="footer-grid" style={{ textAlign: 'center' }}>
          {/* Brand */}
          <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.2rem' }}>
              <img 
                src="/nuzarox-full-logo.png" 
                alt="Nuzarox Company Logo" 
                style={{
                  height: '58px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
            <p style={{ color: '#475569', textAlign: 'center', margin: '0 auto' }}>
              An elite digital agency engineering next-generation websites, mobile apps,
              brand identities, and growth strategies for ambitious businesses.
            </p>
          </div>

          {/* Services */}
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 className="footer-unique-heading" style={{ textAlign: 'center' }}>Services</h4>
            <ul style={{ padding: 0, margin: 0, textAlign: 'center' }}>
              <li><a href="#services" style={{ color: '#475569' }}>Web Development</a></li>
              <li><a href="#services" style={{ color: '#475569' }}>Mobile Apps</a></li>
              <li><a href="#services" style={{ color: '#475569' }}>Digital Marketing</a></li>
              <li><a href="#services" style={{ color: '#475569' }}>Brand & Logo Design</a></li>
              <li><a href="#services" style={{ color: '#475569' }}>UI/UX Design</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 className="footer-unique-heading" style={{ textAlign: 'center' }}>Company</h4>
            <ul style={{ padding: 0, margin: 0, textAlign: 'center' }}>
              <li><a href="#about" style={{ color: '#475569' }}>About Us</a></li>
              <li><a href="#portfolio" style={{ color: '#475569' }}>Our Work</a></li>
              <li><a href="#process" style={{ color: '#475569' }}>Process</a></li>
              <li><a href="#testimonials" style={{ color: '#475569' }}>Testimonials</a></li>
              <li><a href="#contact" style={{ color: '#475569' }}>Contact</a></li>
            </ul>
          </div>

          {/* Follow Us (Replaces Contact) */}
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 className="footer-unique-heading" style={{ textAlign: 'center' }}>Follow Us</h4>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', marginTop: '0.8rem', justifyContent: 'center', alignItems: 'center' }}>
              <a href="https://www.instagram.com/nuza_rox?stkn=MTB1eWNtZnpsYmdiOA==" target="_blank" rel="noopener noreferrer" className="social-list-item" aria-label="Instagram">
                <span className="footer-social-pill">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </span>
              </a>
              <a href="https://www.linkedin.com/in/nuzarox-techies-b504b5429/" target="_blank" rel="noopener noreferrer" className="social-list-item" aria-label="LinkedIn">
                <span className="footer-social-pill">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </span>
              </a>
              <a href="#" className="social-list-item" aria-label="X (Twitter)">
                <span className="footer-social-pill">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                </span>
              </a>
              <a href="#" className="social-list-item" aria-label="Facebook">
                <span className="footer-social-pill">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTopColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', textAlign: 'center' }}>
          <p>&copy; {new Date().getFullYear()} NUZAROX. All rights reserved. Engineered with precision.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
