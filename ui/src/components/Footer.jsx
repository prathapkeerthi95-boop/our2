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

    // Live wave ribbon lines matching NUZAROX Logo Colors (Electric Cyan, Cyan-Blue, Emerald Neon Mint)
    const waves = [
      { yOffset: 0.35, frequency: 0.003, amplitude: 55, speed: 1.4, color: 'rgba(0, 229, 255, 0.40)', layers: 5 },
      { yOffset: 0.50, frequency: 0.002, amplitude: 75, speed: 1.0, color: 'rgba(0, 136, 255, 0.35)', layers: 6 },
      { yOffset: 0.65, frequency: 0.004, amplitude: 45, speed: 1.6, color: 'rgba(0, 230, 118, 0.32)', layers: 5 },
      { yOffset: 0.80, frequency: 0.0018, amplitude: 85, speed: 0.8, color: 'rgba(50, 130, 255, 0.30)', layers: 4 }
    ];

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) { animationFrameId = requestAnimationFrame(render); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'multiply';

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

      ctx.globalCompositeOperation = 'source-over';
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
    <footer className="footer" style={{ position: 'relative', overflow: 'hidden' }}>
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="navbar-logo" style={{ marginBottom: '0.5rem' }}>
              NUZAROX
            </div>
            <p style={{ marginBottom: '1.2rem' }}>
              An elite digital agency engineering next-generation websites, mobile apps,
              brand identities, and growth strategies for ambitious businesses.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <img 
                src="/n-logo-vivid.png" 
                alt="Nuzarox Company Logo" 
                style={{
                  height: '48px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 16px rgba(0, 229, 255, 0.75))'
                }}
              />
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">Mobile Apps</a></li>
              <li><a href="#services">Digital Marketing</a></li>
              <li><a href="#services">Brand & Logo Design</a></li>
              <li><a href="#services">UI/UX Design</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#portfolio">Our Work</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:nuzaroxtech@gmail.com">nuzaroxtech@gmail.com</a></li>
              <li><a href="tel:+918939431717">+91 89394 31717</a></li>
              <li><a href="tel:+919962113240">+91 99621 13240</a></li>
              <li><a href="#">Chennai, India</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NUZAROX. All rights reserved. Engineered with precision.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="LinkedIn">IN</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="Dribbble">DR</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
