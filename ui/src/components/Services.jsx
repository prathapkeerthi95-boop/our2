import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from './AnimatedHeading';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Immersive Web Platforms',
    description: 'We architect high-performance websites with cinematic visuals, buttery scroll physics, and sub-second load times. Every pixel is intentional.',
    tags: ['React', 'Next.js', 'GSAP', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    accent: '#B066FF'
  },
  {
    num: '02',
    title: 'Mobile App Engineering',
    description: 'Cross-platform mobile applications engineered for scale. From fintech dashboards to e-commerce ecosystems, we ship production-grade apps.',
    tags: ['React Native', 'iOS', 'Android', 'Flutter'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    accent: '#00E5FF'
  },
  {
    num: '03',
    title: 'Brand & Visual Identity',
    description: 'Complete brand ecosystems — from strategic logo design to typography systems, color theory, and comprehensive brand guidelines.',
    tags: ['Logo Design', 'UI/UX', 'Figma', 'Brand'],
    image: 'https://plus.unsplash.com/premium_photo-1661337217434-af061b4a7eb9?auto=format&fit=crop&w=1200&q=80',
    accent: '#FF2A54'
  },
  {
    num: '04',
    title: 'Performance Marketing',
    description: 'Data-obsessed growth strategies. We combine creative with analytics to engineer campaigns that convert browsers into loyal customers.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics'],
    image: 'https://plus.unsplash.com/premium_photo-1664300117056-60d0d684107d?auto=format&fit=crop&w=1200&q=80',
    accent: '#FF8800'
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const headerBoxRef = useRef(null);
  const gridWrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeGlow, setActiveGlow] = useState(0);

  // Glow interval every 1.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGlow((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // GSAP horizontal chain slide animation
  useEffect(() => {
    const cards = cardsRef.current;
    const headerBox = headerBoxRef.current;
    const gridWrapper = gridWrapperRef.current;

    if (!cards || cards.length < 4 || !headerBox || !gridWrapper || !sectionRef.current) return;

    // Reset initial styles immediately to prevent flashes
    gsap.set(headerBox, { opacity: 0, y: -50, filter: 'blur(10px)' });
    gsap.set(gridWrapper, { opacity: 0 });
    gsap.set(cards[0], { x: -600, opacity: 0 });
    gsap.set(cards[1], { x: '-108%', opacity: 0 });
    gsap.set(cards[2], { x: '-108%', opacity: 0 });
    gsap.set(cards[3], { x: '-108%', opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'restart reverse restart reverse',
        }
      });

      tl.fromTo(headerBox,
        { opacity: 0, y: -50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(gridWrapper,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(cards[0],
        { x: -600, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(cards[1],
        { x: '-108%', opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(cards[2],
        { x: '-108%', opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(cards[3],
        { x: '-108%', opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cardRectsRef = useRef({});
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setBgLoaded(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px' });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Mouse 3D tilt handlers for floating parallax effect
  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    if (!card) return;
    
    let rect = cardRectsRef.current[index];
    if (!rect) {
      rect = card.getBoundingClientRect();
      cardRectsRef.current[index] = rect;
    }
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 12; // max tilt 12 degrees
    const rotateY = ((x - centerX) / centerX) * 12; // max tilt 12 degrees
    
    card.style.transform = `scale(1.06) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) translateZ(15px)`;
    
    // Parallax shift on image
    const img = card.querySelector('.card-img-new');
    if (img) {
      const shiftX = ((x - centerX) / centerX) * -8;
      const shiftY = ((y - centerY) / centerY) * -8;
      img.style.transform = `scale(1.15) translate(${shiftX}px, ${shiftY}px)`;
    }
  };

  const handleMouseLeave = (e, index) => {
    const card = e.currentTarget;
    if (!card) return;
    card.style.transform = '';
    
    if (cardRectsRef.current[index]) {
      delete cardRectsRef.current[index];
    }
    
    const img = card.querySelector('.card-img-new');
    if (img) {
      img.style.transform = '';
    }
  };

  return (
    <div
      ref={sectionRef}
      id="services"
      className="services-section-new"
      style={{
        backgroundImage: bgLoaded ? "url('/images/page 3 background.png')" : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      }}
    >
      {/* CSS Stylesheet for Page Viewport constraints, dynamic floating parallax & border glow */}
      <style>{`
        .services-section-new {
          width: 100%;
          min-height: 100vh;
          background-size: cover;
          background-attachment: scroll;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 6rem 2rem 1.25rem 2rem;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }



        .services-header-wrapper {
          width: 100%;
          max-width: 1100px;
          display: flex;
          justify-content: flex-end;
          margin-bottom: 0px;
          z-index: 2 !important;
        }

        .services-header-glass {
          max-width: 640px !important; /* Larger width container */
          width: 100%;
          padding: 1.75rem 2.5rem !important; /* Increased padding */
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)) !important;
          backdrop-filter: blur(24px) !important;
          -webkit-backdrop-filter: blur(24px) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4) !important;
          position: relative !important;
          overflow: hidden !important;
          background-image: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.02) 40%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.02) 60%,
            rgba(255, 255, 255, 0.05)
          );
          background-size: 200% 200% !important;
          animation: liquidFlowEffect 8s ease infinite;

        }

        @keyframes liquidFlowEffect {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .header-label-new {
          color: rgba(255, 255, 255, 0.7);
          border-color: rgba(255, 255, 255, 0.3);
          margin-bottom: 0.5rem;
          display: inline-block;
          width: fit-content;
          padding: 0.25rem 0.65rem;
          border-radius: 50px;
          border: 1px solid;
          text-transform: uppercase;
          font-size: 0.85rem !important; /* Larger label font */
          letter-spacing: 0.1em;
        }

        .header-title-new {
          color: #ffffff;
          font-size: 2.8rem !important; /* Larger heading title font */
          line-height: 1.15;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .services-grid-wrapper {
          width: 100%;
          max-width: 1100px;
          display: grid;
          /* 1x4 horizontal layout for desktop */
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          box-sizing: border-box;
          z-index: 12 !important;
          margin-top: auto !important; /* Dynamically push cards to the bottom of the page */
        }
        
        .card-outer-wrapper {
          width: 100%;
        }

        .card-float-wrapper {
          perspective: 1000px;
          will-change: transform;
        }

        .card-float-delay-0 { animation: cardFloatEffect 5s ease-in-out infinite; }
        .card-float-delay-1 { animation: cardFloatEffect 5s ease-in-out infinite 1.25s; }
        .card-float-delay-2 { animation: cardFloatEffect 5s ease-in-out infinite 2.5s; }
        .card-float-delay-3 { animation: cardFloatEffect 5s ease-in-out infinite 3.75s; }

        @keyframes cardFloatEffect {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .services-section-new .service-card-new {
          padding: 1.35rem !important; /* Equal padding on all sides */
          display: flex !important;
          flex-direction: column !important;
          border-radius: 20px !important;
          /* Frosted grey glass background */
          background: rgba(30, 32, 38, 0.75) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
          position: relative !important;
          overflow: hidden !important;
          height: 52vh !important; /* Proportionate height to ensure laptop viewport fitting */
          min-height: 410px !important;
          max-height: 465px !important;
          box-sizing: border-box !important;
          box-shadow: 0 20px 50px -10px rgba(0, 229, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease, border-color 0.5s ease !important;
          transform: scale(1) translateZ(0);
          transform-style: preserve-3d !important;
          perspective: 1000px !important;
        }

        /* Disable specular highlight pseudo-elements from index.css to remove top-left white bleaching */
        .services-section-new .service-card-new::before,
        .services-section-new .service-card-new::after {
          display: none !important;
          content: none !important;
        }

        /* Hover Expansion and Cyan Border Glow */

        .services-section-new .service-card-new:hover {
          border-color: #00e5ff !important;
          /* Pure cyan shadow glows - no black shadow */
          box-shadow: 0 35px 70px rgba(0, 229, 255, 0.35), 0 0 35px rgba(0, 229, 255, 0.9), inset 0 0 15px rgba(0, 229, 255, 0.4) !important;
          z-index: 10 !important;
          transition: transform 0.08s ease-out, box-shadow 0.5s ease, border-color 0.5s ease !important;
        }

        /* Active Glowing state on carousel cycle */
        .services-section-new .service-card-new.active-glow-new {
          border-color: #00e5ff !important;
          box-shadow: 0 35px 70px rgba(0, 229, 255, 0.35), 0 0 35px rgba(0, 229, 255, 0.8), inset 0 0 15px rgba(0, 229, 255, 0.3) !important;
          transform: scale(1.02) !important;
        }

        /* Precise 40% Image container height layout with hardware-accelerated clipping fix */
        .services-section-new .card-img-container-new {
          width: 100% !important;
          height: 40% !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          margin: 0 !important;
          margin-bottom: 0.75rem !important;
          position: relative !important;
          transform: translateZ(25px) !important;
          /* Advanced WebKit clip paths to prevent image borders glitching/flashing sharp corners during tilt transformations */
          -webkit-mask-image: -webkit-radial-gradient(white, black) !important;
          mask-image: radial-gradient(white, black) !important;
          will-change: transform !important;
        }

        .services-section-new .card-img-new {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          /* Vibrant, bright images (contrasted and saturated, not bleached) */
          filter: contrast(1.15) saturate(1.35) brightness(1.05) !important;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s ease !important;
          opacity: 1 !important;
          will-change: transform !important;
        }

        .services-section-new .service-card-new:hover .card-img-new {
          filter: contrast(1.2) saturate(1.45) brightness(1.1) !important;
          transition: transform 0.08s ease-out, filter 0.4s ease !important;
        }

        /* Precise 60% Body height layout container */
        .services-section-new .card-body-new {
          display: flex !important;
          flex-direction: column !important;
          height: 60% !important;
          justify-content: space-between !important;
          overflow: hidden !important;
          transform: translateZ(20px) !important;
          margin: 0 !important;
        }

        /* Precise 15% Heading segment container height */
        .services-section-new .card-title-container {
          height: 25% !important; /* 25% of 60% body height = 15% of total card height */
          display: flex !important;
          align-items: center !important;
          margin: 0 !important;
          width: 100% !important;
        }

        .services-section-new .card-title-new {
          font-size: 1.7rem !important; /* Increased font-size */
          line-height: 1.2 !important;
          font-weight: 900 !important;
          color: #00e5ff !important;
          margin: 0 !important;
          width: 100% !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          text-shadow: none !important;
          -webkit-text-stroke: none !important;
        }  /* Precise 35% Paragraph segment container height */
        .services-section-new .card-desc-container {
          height: 58% !important; /* 58% of 60% body height = 35% of total card height */
          display: flex !important;
          align-items: flex-start !important;
          margin: 0 !important;
          overflow: hidden !important;
        }

        .services-section-new .card-desc-new {
          font-size: 1.05rem !important; /* Increased font-size */
          color: rgba(255, 255, 255, 0.7) !important;
          line-height: 1.45 !important;
          margin: 0 !important;
        }  /* Precise 10% Tags segment container height */
        .services-section-new .card-tags-new {
          height: 17% !important; /* 17% of 60% body height = 10% of total card height */
          display: flex !important;
          gap: 0.35rem !important;
          flex-wrap: wrap !important;
          align-items: center !important;
          margin: 0 !important;
        }

        .services-section-new .card-tag-new {
          padding: 0.15rem 0.45rem !important;
          background-color: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 50px !important;
          font-size: 0.65rem !important;
          color: rgba(255, 255, 255, 0.8) !important;
        }

        /* Responsive adjustments */
        @media (max-width: 991px) {
          .services-section-new {
            height: auto;
            min-height: 100vh;
            padding: 5rem 1.5rem 3rem 1.5rem;
            overflow-y: auto;
          }
          .services-header-wrapper {
            margin-bottom: 1.5rem;
            justify-content: center;
          }
          .services-header-glass {
            max-width: 100%;
            padding: 1rem 1.5rem;
          }
          .header-title-new {
            font-size: 1.8rem;
          }
          .services-grid-wrapper {
            grid-template-columns: repeat(2, 1fr); /* 2x2 on tablets */
            gap: 1.25rem;
            margin-top: 2rem !important;
          }
          .service-card-new {
            height: 320px;
            max-height: none;
            padding: 1rem;
          }
          .card-title-new {
            font-size: 1.1rem;
          }
          .card-desc-new {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .card-img-container-new {
            height: 40%;
            margin-bottom: 0.5rem;
          }
        }

        @media (max-width: 600px) {
          .services-grid-wrapper {
            grid-template-columns: 1fr; /* 1x4 vertical on mobile */
            gap: 1rem;
          }
          .service-card-new {
            height: auto;
            min-height: 200px;
            padding: 1rem;
          }
          .card-desc-new {
            display: block;
            -webkit-line-clamp: none;
          }
          .card-img-container-new {
            height: 140px;
          }
        }

        /* Optimize for short viewports/laptops so that cards, titles, descriptions, and tags fit inside a single viewport height with NO cropping */
        @media (max-height: 720px) {
          .services-section-new {
            padding: 5.5rem 2rem 1rem 2rem !important;
            justify-content: flex-start !important;
          }
          .services-header-wrapper {
            margin-bottom: 1.25rem !important; /* Spacing margin inside media query */
          }
          .services-header-glass {
            max-width: 600px !important;
            padding: 1.25rem 2rem !important;
          }
          .header-title-new {
            font-size: 2.4rem !important;
          }
          .services-grid-wrapper {
            transform: translateY(0px) !important; /* Reset vertical offset for small screen heights to prevent bottom cropping */
          }
          .services-section-new .service-card-new {
            height: 52vh !important;
            min-height: 330px !important;
            max-height: 370px !important;
            padding: 0.85rem 0.75rem !important;
          }
          .services-section-new .card-title-new {
            font-size: 1.25rem !important;
            margin-bottom: 0.2rem !important;
          }
          .services-section-new .card-desc-new {
            font-size: 0.88rem !important;
            line-height: 1.25 !important;
          }
          .services-section-new .card-tag-new {
            padding: 0.1rem 0.35rem !important;
            font-size: 0.60rem !important;
          }
        }

      `}</style>
      
      {/* Header wrapper */}
      <div className="services-header-wrapper">
        <div ref={headerBoxRef} className="services-header-glass">
          <div className="header-label-new">
            <span style={{ 
              background: '#FF2A54', 
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              marginRight: '8px' 
            }} />
            Core Capabilities
          </div>
          <h2 className="header-title-new">
            Engineered for <br/> Market Dominance
          </h2>
        </div>
      </div>
      {/* Grid container */}
      <div ref={gridWrapperRef} className="services-grid-wrapper">
        {services.map((service, index) => {
          const isGlowing = activeGlow === index;
          return (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="card-outer-wrapper"
            >
              <div className={`card-float-wrapper card-float-delay-${index}`}>
                <div
                  className={`service-card-new ${isGlowing ? 'active-glow-new' : ''}`}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={(e) => handleMouseLeave(e, index)}
                >
                  {/* Image */}
                  <div className="card-img-container-new">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="card-img-new"
                    />
                  </div>
                  <div className="card-body-new">
                    <div className="card-title-container">
                      <h3 className="card-title-new">
                        {service.title}
                      </h3>
                    </div>
                    <div className="card-desc-container">
                      <p className="card-desc-new">
                        {service.description}
                      </p>
                    </div>
                    <div className="card-tags-new">
                      {service.tags.map((tag, j) => (
                        <span 
                          key={j} 
                          className="card-tag-new"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
