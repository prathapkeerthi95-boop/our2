import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Immersive Web Platforms',
    description: 'We architect high-performance websites with cinematic visuals, buttery scroll physics, and sub-second load times. Every pixel is intentional.',
    tags: ['React', 'Next.js', 'GSAP', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    accent: '#7000FF'
  },
  {
    num: '02',
    title: 'Mobile App Engineering',
    description: 'Cross-platform mobile applications engineered for scale. From fintech dashboards to e-commerce ecosystems, we ship production-grade apps.',
    tags: ['React Native', 'iOS', 'Android', 'Flutter'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    accent: '#00E5FF'
  },
  {
    num: '03',
    title: 'Brand & Visual Identity',
    description: 'Complete brand ecosystems — from strategic logo design to typography systems, color theory, and comprehensive brand guidelines.',
    tags: ['Logo Design', 'UI/UX', 'Figma', 'Design Systems'],
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    accent: '#FF2A54'
  },
  {
    num: '04',
    title: 'Performance Marketing',
    description: 'Data-obsessed growth strategies. We combine creative with analytics to engineer campaigns that convert browsers into loyal customers.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    accent: '#FF8800'
  }
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0); // Default first item open
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Entrance animation for the whole accordion list
    gsap.fromTo(containerRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      }
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{ padding: '8rem 0', backgroundColor: '#FAFAFA' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>

        <div style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="section-label reveal">What We Engineer</div>
            <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#0B0C10', marginBottom: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Services Designed for <br/><span className="gradient-text">Market Dominance</span>
            </h2>
          </div>
          <div className="reveal reveal-delay-2" style={{ maxWidth: '350px' }}>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
              We don't just build websites; we engineer digital ecosystems that drive measurable business outcomes.
            </p>
          </div>
        </div>

        {/* Horizontal Expanding Accordion */}
        <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((service, index) => {
            const isActive = hoveredIndex === index;
            
            return (
              <div 
                key={index}
                className="hover-target"
                onMouseEnter={() => setHoveredIndex(index)}
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.1)',
                  borderBottom: index === services.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                  padding: isActive ? '3rem 0' : '2rem 0',
                  cursor: 'none',
                  transition: 'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Background Accent Fill on Hover */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundColor: service.accent,
                  opacity: isActive ? 0.03 : 0,
                  transition: 'opacity 0.5s ease',
                  zIndex: 0,
                  pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: isActive ? 'flex-start' : 'center' }}>
                  
                  {/* Title & Number Area */}
                  <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ 
                      fontSize: isActive ? '2rem' : '1.5rem', 
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: isActive ? service.accent : 'rgba(0,0,0,0.2)',
                      transition: 'all 0.5s ease',
                      width: '40px'
                    }}>
                      {service.num}
                    </div>
                    <h3 style={{ 
                      fontSize: isActive ? '2.5rem' : '1.8rem', 
                      margin: 0, 
                      color: '#0B0C10',
                      letterSpacing: '-0.02em',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isActive ? 'translateX(10px)' : 'translateX(0)'
                    }}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Icon / Arrow (visible when closed) */}
                  {!isActive && (
                    <div style={{ opacity: 0.3, transition: 'opacity 0.3s ease' }}>
                      <ArrowUpRight size={32} />
                    </div>
                  )}

                  {/* Expanded Content Area */}
                  <div style={{
                    flex: isActive ? '2' : '0',
                    display: 'grid',
                    gridTemplateRows: isActive ? '1fr' : '0fr',
                    opacity: isActive ? 1 : 0,
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ minHeight: 0, display: 'flex', gap: '2rem', alignItems: 'center' }}>
                      
                      {/* Text Details */}
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                          {service.description}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {service.tags.map((tag, j) => (
                            <span key={j} style={{
                              padding: '0.3rem 0.8rem',
                              border: '1px solid rgba(0,0,0,0.1)',
                              borderRadius: '50px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              color: '#333'
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expanding Image */}
                      <div style={{ 
                        width: '240px', 
                        height: '160px', 
                        borderRadius: '16px', 
                        overflow: 'hidden',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'scale(1)' : 'scale(0.95)',
                        transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
                      }}>
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
