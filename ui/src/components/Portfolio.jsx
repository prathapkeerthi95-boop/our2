import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    category: 'E-Commerce / Sports',
    title: 'Gagner Sports',
    image: 'https://images.unsplash.com/photo-1518611507436-f9221403cca2?auto=format&fit=crop&w=1200&q=80',
    link: 'https://gagnersports.com/',
    gridArea: 'span 2 / span 2', // Large, tall
    height: '600px'
  },
  {
    category: 'Own Product / Real Estate',
    title: 'Premium Apartment Website',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    gridArea: 'span 1 / span 1', // Smaller
    height: '285px'
  },
  {
    category: 'Creative / Digital Identity',
    title: 'KE19 Portfolio',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    link: 'https://ke19portfolio.netlify.app/',
    gridArea: 'span 1 / span 1', // Smaller
    height: '285px'
  }
];

const Portfolio = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        }
      );
    });
  }, []);

  return (
    <section id="portfolio" style={{ backgroundColor: '#0A0A0F', padding: '8rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="section-label reveal" style={{ color: 'var(--accent-cyan)' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '2px', background: 'var(--accent-cyan)', marginRight: '0.75rem' }}></span>
              Selected Work
            </div>
            <h2 className="reveal reveal-delay-1" style={{ color: 'white', marginBottom: 0, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
              Projects That <br/><span className="gradient-text">Speak Volumes</span>
            </h2>
          </div>
          <div className="reveal reveal-delay-2" style={{ maxWidth: '400px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
              Every project listed here was engineered end-to-end by our team, from initial strategy through to production deployment.
            </p>
          </div>
        </div>

        {/* Sophisticated Asymmetrical Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          gridAutoFlow: 'dense'
        }}>
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={el => cardRefs.current[index] = el}
              className="hover-target"
              style={{
                display: 'block',
                gridColumn: project.gridArea.split(' / ')[0],
                gridRow: project.gridArea.split(' / ')[1],
                height: project.height,
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                textDecoration: 'none',
                cursor: 'none'
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('.port-img');
                const overlay = e.currentTarget.querySelector('.port-overlay');
                if (img) img.style.transform = 'scale(1.08)';
                if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('.port-img');
                const overlay = e.currentTarget.querySelector('.port-overlay');
                if (img) img.style.transform = 'scale(1)';
                if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)';
              }}
            >
              {/* Image */}
              <img
                className="port-img"
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />

              {/* Dark Overlay */}
              <div 
                className="port-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                  transition: 'background 0.5s ease',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '2.5rem'
                }}
              >
                <div style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {project.category}
                </div>
                <h3 style={{ color: 'white', fontSize: '2rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {project.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
