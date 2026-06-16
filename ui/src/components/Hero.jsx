import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedIcon from './AnimatedIcon';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to the center of the hero section
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="editorial-hero" id="hero" ref={heroRef} style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Interactive Ambient Color Glow */}
      <div 
        className="ambient-glow"
        style={{
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <div className="hero-top-meta reveal visible">
          <span className="hero-badge">Creative Studio</span>
          <span className="hero-location">Chennai, IN</span>
        </div>

        <div className="hero-title-container">
          <h1 className="reveal visible reveal-delay-1 split-text">
            We Design
          </h1>
          <div className="hero-title-row reveal visible reveal-delay-2">
            <AnimatedIcon type="heroAbstract" width="200" height="80" strokeWidth={1.5} color="var(--accent-crimson)" />
            <h1 className="split-text">Experiences.</h1>
          </div>
        </div>

        <div className="hero-bottom-grid">
          <p className="hero-manifesto reveal visible reveal-delay-3">
            NUVAROX is an elite digital branding and engineering consultancy. We strip away the noise to build immaculate, high-performance platforms that define the future of digital interaction.
          </p>

          <div className="hero-cta-container reveal visible reveal-delay-4">
            <a href="#contact" className="btn-primary hover-target">
              <span>Start a Project</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
