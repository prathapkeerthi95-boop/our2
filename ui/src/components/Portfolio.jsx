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
    image: 'https://images.unsplash.com/photo-1734574226134-9f0f07e62407?w=1920&auto=format&fit=crop&q=95',
    gallery: [
      'https://images.unsplash.com/photo-1734574226134-9f0f07e62407?w=1920&auto=format&fit=crop&q=95',
      'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=1920&auto=format&fit=crop&q=95',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&auto=format&fit=crop&q=95'
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
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=95',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=95',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=95',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=95'
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
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=95',
    gallery: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=95',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1920&q=95',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1920&q=95'
    ],
    link: 'https://ke19portfolio.netlify.app/'
  }
];

const categories = ['All', 'E-Commerce', 'Real Estate', 'Creative & Branding'];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const pinnedContainerRef = useRef(null);
  const slidesWrapperRef = useRef(null);
  const slideRefs = useRef([]);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // GSAP ScrollTrigger Pinned Overlapping Stack Animation
  useEffect(() => {
    if (!pinnedContainerRef.current) return;

    const ctx = gsap.context(() => {
      const slides = slideRefs.current.filter(Boolean);
      if (slides.length === 0) return;

      slides.forEach((slide, i) => {
        if (i === 0) {
          gsap.set(slide, { yPercent: 0 });
        } else {
          gsap.set(slide, { yPercent: 100 });
        }
      });

      if (slides.length > 1) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinnedContainerRef.current,
            start: "top top",
            end: () => `+=${(slides.length - 1) * 100}%`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
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
        });
      }
    }, pinnedContainerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
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
    <section id="portfolio" className="metaskapes-projects-section">
      {/* Header Container */}
      <div className="metaskapes-container">
        
        {/* Section Header with exact preserved Title transition effect from Image 2 */}
        <div className="metaskapes-header-wrapper">
          <div className="section-label reveal metaskapes-badge">
            Selected Work
          </div>
          
          <AnimatedHeading 
            text="Projects That \n Speak Volumes" 
            mode="scramble" 
            style={{ 
              color: '#FFFFFF', 
              fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', 
              lineHeight: 1.1, 
              fontWeight: 900, 
              letterSpacing: '-0.02em',
              marginBottom: '1rem'
            }} 
          />

          <p className="metaskapes-subtext">
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
              style={{ zIndex: idx + 1 }}
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
              </div>

              {/* Metaskapes Clean Top-Left Header: Giant Number + Title & Location */}
              <div className="metaskapes-sticky-content">
                <div className="metaskapes-sticky-brand">
                  <span className="metaskapes-sticky-num">{project.num}</span>
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
