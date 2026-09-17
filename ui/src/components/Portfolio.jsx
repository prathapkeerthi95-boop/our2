import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from './AnimatedHeading';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: '01',
    id: 'gagner-sports',
    category: 'E-Commerce',
    tag: 'E-COMMERCE / SPORTS',
    title: 'GAGNER SPORTS',
    location: 'Paris, France & Online',
    client: 'Gagner Sports Ltd',
    completion: '2026',
    services: 'Next.js, Tailwind, 3D WebGL Customizer, Shopify API',
    summary: 'Ultra-fast sportswear platform with interactive 3D product customizer & custom checkout.',
    description: 'Designed and engineered an ultra-responsive headless e-commerce experience for Gagner Sports. Includes custom 3D web-based gear customization, real-time stock sync across European distribution nodes, and lightning-fast sub-second page loads.',
    highlights: [
      '3D real-time gear customization canvas built with Three.js',
      '120% boost in mobile conversion rate post launch',
      'Integrated multi-currency localized checkout system',
      'Headless architecture powered by Next.js & Shopify Plus'
    ],
    image: '/gagner-sports-showcase.jpg',
    gallery: [
      '/gagner-sports-showcase.jpg'
    ],
    link: 'https://gagnersports.com/'
  },
  {
    num: '02',
    id: 'premium-residence',
    category: 'Real Estate',
    tag: 'REAL ESTATE / ARCHITECTURE',
    title: 'AURA LUXURY RESIDENCE',
    location: 'Mayiladuthurai, Tamil Nadu',
    client: 'Aura Estates Group',
    completion: '2026',
    services: 'React, Three.js VR, Architectural 3D Rendering',
    summary: 'Architectural digital showcase & interactive VR estate tour experience.',
    description: 'Designed a high-end luxury architectural web experience for ultra-modern residential villas. Features web-based 3D walkthroughs, interactive floor plan overlays, and client booking consultation tools.',
    highlights: [
      'Interactive 360° panoramic virtual villa walkthroughs',
      'Custom floor plan layer switcher with real-time room dimensions',
      'Seamless multi-device mobile optimization',
      'Instant private consultation booking integration'
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=3840&q=100',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=3840&q=100'
    ],
    link: '#'
  },
  {
    num: '03',
    id: 'ke19-portfolio',
    category: 'Creative & Branding',
    tag: 'CREATIVE / DIGITAL IDENTITY',
    title: 'KE19 PORTFOLIO',
    location: 'Chennai, Tamil Nadu',
    client: 'KE19 Studio',
    completion: '2026',
    services: 'React, GSAP Animations, WebGL Canvas Shaders',
    summary: 'Award-winning interactive digital showcase with fluid WebGL motion graphics.',
    description: 'A custom digital identity platform designed to captivate visitors with kinetic typography, interactive cursor physics, and high-performance WebGL scroll triggers.',
    highlights: [
      'Custom shader animations with reactive mouse physics',
      'Smooth page transition engine with zero delay',
      'Nominated for top web design interactive honors',
      'Full dark theme aesthetic with custom typography'
    ],
    image: '/ke19-showcase.png',
    gallery: [
      '/ke19-showcase.png'
    ],
    link: 'https://ke19portfolio.netlify.app/'
  }
];

const categories = ['All', 'E-Commerce', 'Real Estate', 'Creative & Branding'];

const AbstractRingsBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    
    // Only render when in viewport for performance
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      // Restart the loop when becoming visible again
      if (!wasVisible && isVisible) render();
    });
    observer.observe(canvas);

    const resize = () => {
      canvas.width = window.innerWidth;
      // Make it cover the top header area
      canvas.height = window.innerHeight * 1.2; 
    };
    window.addEventListener('resize', resize);
    resize();

    // 3D Wireframe Rings — PERF: Reduced layers from 75 total to 24 total, step 0.12 instead of 0.05
    const rings = [
      { cx: canvas.width * 0.15, cy: canvas.height * 0.4, radiusX: 350, radiusY: 140, color: 'rgba(0, 229, 255, 0.4)', speed: 0.002, rotation: 0.5, layers: 8 },
      { cx: canvas.width * 0.85, cy: canvas.height * 0.3, radiusX: 450, radiusY: 180, color: 'rgba(112, 0, 255, 0.25)', speed: -0.0015, rotation: -0.3, layers: 8 },
      { cx: canvas.width * 0.6, cy: canvas.height * 0.8, radiusX: 550, radiusY: 220, color: 'rgba(0, 229, 255, 0.2)', speed: 0.001, rotation: 0.1, layers: 8 },
    ];

    const render = () => {
      if (!isVisible) return; // PERF: truly stop — don't re-schedule rAF
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'multiply'; 
      time += 1;

      rings.forEach(ring => {
        ctx.save();
        ctx.translate(ring.cx, ring.cy);
        ctx.rotate(ring.rotation + time * ring.speed);
        
        for (let j = 0; j < ring.layers; j++) {
           const scale = 1 + (j * 0.015);
           const offset = j * 2.5;
           ctx.beginPath();
           for (let i = 0; i <= Math.PI * 2; i += 0.12) {
             const x = Math.cos(i) * ring.radiusX * scale;
             const y = Math.sin(i) * ring.radiusY * scale + offset;
             if (i === 0) ctx.moveTo(x, y);
             else ctx.lineTo(x, y);
           }
           ctx.strokeStyle = ring.color;
           ctx.lineWidth = 0.8;
           ctx.setLineDash([2, 8]); 
           ctx.stroke();
        }
        ctx.restore();
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
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120vh', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Background canvas removed in favor of unified SoftWavesBackground */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, #F1F4F9 100%)' }} />
    </div>
  );
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const pinnedContainerRef = useRef(null);
  const slidesWrapperRef = useRef(null);
  const slideRefs = useRef([]);
  const portMobilePinnedRef = useRef(null);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // Desktop GSAP ScrollTrigger Pinned Overlapping Stack Animation (>768px)
  useEffect(() => {
    if (!pinnedContainerRef.current) return;
    if (window.innerWidth <= 768) return;

    const ctx = gsap.context(() => {
      const container = pinnedContainerRef.current;
      if (!container) return;
      const slides = Array.from(container.querySelectorAll('.metaskapes-gsap-slide'));
      if (slides.length === 0) return;

      slides.forEach((slide, i) => {
        if (i === 0) {
          gsap.set(slide, { yPercent: 0, scale: 1, opacity: 1 });
        } else {
          gsap.set(slide, { yPercent: 100, scale: 1, opacity: 1 });
        }
      });

      if (slides.length > 1) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top+=70px",
            end: () => `+=${slides.length * 85}%`,
            pin: true,
            scrub: 0.4,
            refreshPriority: 1,
            invalidateOnRefresh: true
          }
        });

        slides.forEach((slide, i) => {
          if (i === 0) return;

          tl.to(slide, {
            yPercent: 0,
            ease: "none",
            duration: 1
          });

          tl.to({}, { duration: 0.4 });
        });
      }
    }, pinnedContainerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [activeFilter, filteredProjects.length]);

  // Mobile GSAP ScrollTrigger Pinned Overlapping Stack Animation (<=768px)
  useEffect(() => {
    if (!portMobilePinnedRef.current) return;

    const ctx = gsap.context(() => {
      const container = portMobilePinnedRef.current;
      if (!container) return;
      const slides = Array.from(container.querySelectorAll('.port-mobile-card'));
      if (slides.length === 0) return;

      slides.forEach((slide, i) => {
        if (i === 0) {
          gsap.set(slide, { yPercent: 0, opacity: 1 });
        } else {
          gsap.set(slide, { yPercent: 100, opacity: 1 });
        }
      });

      const mm = gsap.matchMedia();
      mm.add("(max-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top+=75px",
            end: () => `+=${slides.length * 45}%`,
            pin: true,
            scrub: 0.3,
            refreshPriority: 2,
            invalidateOnRefresh: true
          }
        });

        slides.forEach((slide, i) => {
          if (i === 0) return;

          tl.to(slide, {
            yPercent: 0,
            ease: "none",
            duration: 1
          });

          tl.to({}, { duration: 0.35 });
        });
      });
    }, portMobilePinnedRef);

    return () => ctx.revert();
  }, [activeFilter, filteredProjects.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setActiveImageIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
  };

  const navigateModalProject = (direction) => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + direction + projects.length) % projects.length;
    setSelectedProject(projects[nextIndex]);
    setActiveImageIndex(0);
  };

  return (
    <section id="portfolio" className="metaskapes-projects-section" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      {/* Header Container */}
      <div className="metaskapes-container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Section Header with exact preserved Title transition effect from Image 2 */}
        <div className="metaskapes-header-wrapper" style={{ marginBottom: '1rem' }}>
          <div className="section-label reveal metaskapes-badge">
            Selected Work
          </div>
          
          <AnimatedHeading 
            text="Projects That \n Speak Volumes" 
            mode="scramble" 
            style={{ 
              color: '#11131A', // Dark text for Light Theme
              fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', 
              lineHeight: 1.1, 
              fontWeight: 900, 
              letterSpacing: '-0.02em',
              marginBottom: '1rem'
            }} 
          />

          <p className="metaskapes-subtext" style={{ color: 'rgba(0,0,0,0.6)' }}>
            Explore our curated portfolio of bespoke web applications, e-commerce platforms, luxury digital showcases, and mobile ecosystems.
          </p>
        </div>

      </div>

      {/* GSAP ScrollTrigger Pinned Overlapping Stack Container */}
      <div ref={pinnedContainerRef} className="metaskapes-pinned-section">
        <div ref={slidesWrapperRef} className="metaskapes-slides-wrapper">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              ref={(el) => { if (el) slideRefs.current[idx] = el; }}
              className="metaskapes-gsap-slide"
              style={{ zIndex: idx + 1, cursor: 'pointer' }}
              onClick={() => openProjectModal(project)}
            >
              {/* Full-bleed 100vh bright image background */}
              <div className="metaskapes-sticky-bg-wrapper">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="metaskapes-sticky-image"
                />
                {/* Subtle text contrast gradient mask only top-left */}
                <div className="metaskapes-sticky-mask" />
                {/* Seamless top edge fade to blend image into background */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100px',
                  background: 'linear-gradient(to bottom, #F1F4F9 0%, transparent 100%)',
                  pointerEvents: 'none'
                }} />
              </div>

              {/* Unique Tech Category Indicator + Title & Location */}
              <div className="metaskapes-sticky-content" style={{ pointerEvents: 'auto' }}>
                <div className="metaskapes-sticky-brand" style={{ display: 'flex', alignItems: 'center' }}>
                  
                  {/* Replaced Giant Number with Unique Vertical Badge */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginRight: '2.5rem',
                    gap: '1rem',
                    opacity: 0.9
                  }}>
                    <div style={{ width: '2px', height: '50px', background: 'linear-gradient(to bottom, #00E5FF, transparent)' }} />
                    <span style={{ 
                      writingMode: 'vertical-rl', 
                      transform: 'rotate(180deg)', 
                      color: '#00E5FF', 
                      letterSpacing: '0.4em', 
                      fontSize: '0.75rem', 
                      fontWeight: 800,
                      textShadow: '0 0 10px rgba(0, 229, 255, 0.6)'
                    }}>
                      {project.tag}
                    </span>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 10px #00E5FF' }} />
                  </div>

                  <div className="metaskapes-sticky-titles">
                    <h3 className="metaskapes-sticky-title">{project.title}</h3>
                    <p className="metaskapes-sticky-location">{project.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE PINNED OVERLAPPING CARDS (MOBILE VIEW ONLY <769px) ── */}
      <div ref={portMobilePinnedRef} className="port-mobile-pinned-section">
        <div className="port-mobile-header-box">
          <div className="section-label reveal metaskapes-badge" style={{ marginBottom: '0.4rem', fontSize: '0.75rem', display: 'inline-block' }}>
            Selected Work
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#11131A', margin: '0 0 0.3rem', lineHeight: 1.15 }}>
            Projects That Speak Volumes
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.6)', margin: 0, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            Explore our curated portfolio of bespoke web applications, e-commerce platforms, luxury digital showcases, and mobile ecosystems.
          </p>
        </div>

        <div className="port-mobile-slides-wrapper">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className="port-mobile-card" 
              style={{ zIndex: idx + 1 }}
              onClick={() => openProjectModal(project)}
            >
              <div className="port-mobile-card-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00A896', letterSpacing: '0.1em' }}>
                    {project.num} — {project.category}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#666', fontWeight: 600 }}>{project.completion}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#11131A', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                  {project.title}
                </h3>
              </div>

              <div className="port-mobile-img-box">
                <img src={project.image} alt={project.title} className="port-mobile-img" />
              </div>

              <div className="port-mobile-card-footer">
                <p className="port-mobile-desc">{project.summary}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B' }}>📍 {project.location}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00A896', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    View Case Study →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metaskapes Case Study Detail Modal */}
      {selectedProject && (
        <div className="metaskapes-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="metaskapes-modal-dialog" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="metaskapes-modal-header">
              <div>
                <span className="metaskapes-modal-tag">{selectedProject.tag}</span>
                <h2 className="metaskapes-modal-title">{selectedProject.title}</h2>
              </div>
              <button 
                className="metaskapes-modal-close" 
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Image Slider */}
            <div className="metaskapes-modal-gallery">
              <div className="metaskapes-slider-main">
                <img 
                  src={selectedProject.gallery[activeImageIndex]} 
                  alt={`${selectedProject.title} preview ${activeImageIndex + 1}`} 
                  className="metaskapes-slider-img"
                />
                
                {selectedProject.gallery.length > 1 && (
                  <>
                    <button className="metaskapes-slider-nav prev" onClick={prevImage}>
                      ‹
                    </button>
                    <button className="metaskapes-slider-nav next" onClick={nextImage}>
                      ›
                    </button>
                    <div className="metaskapes-slider-counter">
                      {activeImageIndex + 1} / {selectedProject.gallery.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              {selectedProject.gallery.length > 1 && (
                <div className="metaskapes-slider-thumbnails">
                  {selectedProject.gallery.map((img, index) => (
                    <button
                      key={index}
                      className={`metaskapes-thumb-btn ${activeImageIndex === index ? 'is-active' : ''}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img src={img} alt={`Thumb ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Metaskapes Metadata Grid */}
            <div className="metaskapes-meta-grid">
              <div className="metaskapes-meta-item">
                <span className="metaskapes-meta-label">LOCATION</span>
                <span className="metaskapes-meta-val">{selectedProject.location}</span>
              </div>
              <div className="metaskapes-meta-item">
                <span className="metaskapes-meta-label">CLIENT</span>
                <span className="metaskapes-meta-val">{selectedProject.client}</span>
              </div>
              <div className="metaskapes-meta-item">
                <span className="metaskapes-meta-label">COMPLETION</span>
                <span className="metaskapes-meta-val">{selectedProject.completion}</span>
              </div>
              <div className="metaskapes-meta-item">
                <span className="metaskapes-meta-label">SERVICES / TECH</span>
                <span className="metaskapes-meta-val">{selectedProject.services}</span>
              </div>
            </div>

            {/* Overview & Highlights */}
            <div className="metaskapes-modal-body">
              <h4 className="metaskapes-body-heading">Project Overview</h4>
              <p className="metaskapes-body-desc">{selectedProject.description}</p>

              <h4 className="metaskapes-body-heading" style={{ marginTop: '1.5rem' }}>Key Deliverables & Impact</h4>
              <ul className="metaskapes-highlights-list">
                {selectedProject.highlights.map((item, i) => (
                  <li key={i}>
                    <span className="metaskapes-check-icon">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions & Footer Navigation */}
            <div className="metaskapes-modal-footer">
              <div className="metaskapes-modal-nav-btns">
                <button className="metaskapes-nav-link" onClick={() => navigateModalProject(-1)}>
                  ← Prev Project
                </button>
                <button className="metaskapes-nav-link" onClick={() => navigateModalProject(1)}>
                  Next Project →
                </button>
              </div>

              {selectedProject.link && selectedProject.link !== '#' ? (
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="metaskapes-live-link-btn"
                >
                  Visit Website
                  <svg className="metaskapes-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span className="metaskapes-live-link-btn disabled">
                  Internal Enterprise Case Study
                </span>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
