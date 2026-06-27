import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from './AnimatedHeading';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { category: 'E-Commerce / Sports', title: 'Gagner Sports', image: 'https://images.unsplash.com/photo-1518611507436-f9221403cca2?auto=format&fit=crop&w=1200&q=80', link: 'https://gagnersports.com/', gridArea: 'span 2 / span 2', height: '600px' },
  { category: 'Own Product / Real Estate', title: 'Premium Apartment', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', link: '#', gridArea: 'span 1 / span 1', height: '285px' },
  { category: 'Creative / Digital Identity', title: 'KE19 Portfolio', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80', link: 'https://ke19portfolio.netlify.app/', gridArea: 'span 1 / span 1', height: '285px' }
];

const Portfolio = () => {
  const containerRefs = useRef([]);
  const imgRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    containerRefs.current.forEach((container, i) => {
      if (!container) return;
      const img = imgRefs.current[i];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true
        }
      });

      tl.fromTo(container,
        { height: 0 },
        { height: projects[i].height, duration: 1.5, ease: "expo.inOut" }
      );

      tl.fromTo(img,
        { scale: 1.5 },
        { scale: 1, duration: 1.5, ease: "expo.inOut" },
        "<"
      );
    });

    // Levitate hover effect on cards
    cardRefs.current.forEach((card) => {
      if (!card) return;

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -14,
          scale: 1.02,
          duration: 0.45,
          ease: 'power3.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power3.out'
        });
      });
    });
  }, []);

  return (
    <section id="portfolio" style={{ backgroundColor: '#0A0A0F', padding: '5rem 0' }}>
      <style>{`
        .port-card {
          transition: box-shadow 0.45s ease;
          will-change: transform;
        }
        .port-card:hover {
          box-shadow:
            0 30px 70px rgba(0,0,0,0.7),
            0 10px 30px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.06);
        }
        .port-overlay {
          opacity: 1 !important;
          transition: background 0.4s ease;
        }
        .port-card:hover .port-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%) !important;
        }
        .port-card:hover .port-img {
          transform: scale(1.06);
          transition: transform 0.6s ease;
        }
        .port-img {
          transition: transform 0.6s ease;
        }
        .port-category {
          transform: translateY(8px);
          opacity: 0.75;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .port-card:hover .port-category {
          transform: translateY(0);
          opacity: 1;
        }
        .port-title {
          transform: translateY(6px);
          transition: transform 0.4s ease 0.05s;
        }
        .port-card:hover .port-title {
          transform: translateY(0);
        }
      `}</style>

      <div className="container" style={{ maxWidth: '1200px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="reveal" style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Selected Work
            </div>
            <AnimatedHeading
              text={"Projects That \n Speak Volumes"}
              mode="scramble"
              style={{ color: 'white', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.05, fontWeight: 900, letterSpacing: '-0.02em' }}
            />
          </div>
        </div>

        {/* Sophisticated Asymmetrical Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', gridAutoFlow: 'dense' }}>
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={el => cardRefs.current[index] = el}
              className="portfolio-item port-card"
              style={{
                display: 'block',
                gridColumn: project.gridArea.split(' / ')[0],
                gridRow: project.gridArea.split(' / ')[1],
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                textDecoration: 'none',
                cursor: 'none',
                boxShadow: '0 15px 40px rgba(0,0,0,0.45)'
              }}
            >
              {/* Masking Container */}
              <div
                ref={el => containerRefs.current[index] = el}
                style={{ width: '100%', overflow: 'hidden', position: 'relative', height: project.height }}
              >
                {/* Image */}
                <img
                  ref={el => imgRefs.current[index] = el}
                  src={project.image}
                  alt={project.title}
                  className="port-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Always-visible Overlay — brightens on hover */}
                <div
                  className="port-overlay"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem'
                  }}
                >
                  <div className="port-category" style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {project.category}
                  </div>
                  <h3 className="port-title" style={{ color: 'white', fontSize: '2.5rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {project.title}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
