import React, { useEffect, useRef, useState } from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: <Zap size={22} />, title: 'Obsessive Speed', desc: 'Sub-second load times. We treat performance as a feature, not an afterthought.' },
  { icon: <Shield size={22} />, title: 'Rock-Solid Security', desc: 'Enterprise-grade protocols on every deployment. Your data stays fortified.' },
  { icon: <Users size={22} />, title: 'Dedicated Crew', desc: 'A tight-knit squad of senior engineers and designers assigned to your vision.' },
  { icon: <Award size={22} />, title: 'Revenue-First Design', desc: 'Every pixel we place is engineered to convert visitors into paying customers.' }
];

const featureImages = [
  '/obsessive_speed.png',
  '/rock_solid_security.png',
  '/dedicated_crew.png',
  '/revenue_first_design.png'
];

const allImages = [
  { src: '/creative_process.png', alt: 'Our Creative Process' },
  { src: '/obsessive_speed.png', alt: 'Obsessive Speed' },
  { src: '/rock_solid_security.png', alt: 'Rock-Solid Security' },
  { src: '/dedicated_crew.png', alt: 'Dedicated Crew' },
  { src: '/revenue_first_design.png', alt: 'Revenue-First Design' }
];

const About = () => {
  const sectionRef = useRef(null);
  const leftContainerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeImage, setActiveImage] = useState('/creative_process.png');

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1025px)");
    let triggerInstance;
    let scrollTriggerInstance;

    const setupTrigger = () => {
      // Using CSS sticky instead of GSAP pin for precise column-end alignment
      // CSS sticky naturally releases when the parent container's bottom is reached
    };

    // Staggered ScrollTrigger entrance animation for features cards
    if (cardRefs.current.length > 0) {
      scrollTriggerInstance = gsap.fromTo(cardRefs.current.filter(Boolean),
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          rotationX: 12
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-features",
            start: "top 85%",
            once: true
          }
        }
      );
    }

    // Small timeout to allow other animations and layouts to settle
    const timer = setTimeout(() => {
      setupTrigger();
      ScrollTrigger.refresh();
    }, 200);

    const listener = (e) => {
      if (triggerInstance) {
        triggerInstance.kill();
        triggerInstance = null;
      }
      if (e.matches) {
        setupTrigger();
      }
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      clearTimeout(timer);
      if (triggerInstance) triggerInstance.kill();
      if (scrollTriggerInstance) {
        if (scrollTriggerInstance.scrollTrigger) {
          scrollTriggerInstance.scrollTrigger.kill();
        }
        scrollTriggerInstance.kill();
      }
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates: -0.5 to 0.5
    const xc = (x / rect.width) - 0.5;
    const yc = (y / rect.height) - 0.5;
    
    // Smooth 3D tilt using GSAP
    gsap.to(card, {
      rotateX: -yc * 18,
      rotateY: xc * 18,
      x: xc * 8,
      y: yc * 8,
      duration: 0.25,
      ease: "power2.out"
    });
  };

  const handleMouseEnter = (index) => {
    setActiveImage(featureImages[index]);
    
    const card = cardRefs.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1.04,
        borderColor: 'rgba(0, 0, 0, 0.12)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0,0,0,0.02)',
        duration: 0.25,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (e, index) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      scale: 1,
      borderColor: 'rgba(0, 0, 0, 0.06)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      duration: 0.45,
      ease: "power2.out"
    });
  };

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="container">
        <div className="about-grid">
          
          {/* Left: Dynamic visual assets container */}
          <div className="about-left-container" ref={leftContainerRef} style={{ position: 'relative', alignSelf: 'stretch' }}>
            <div 
              className="left-card-glow"
              style={{
                position: 'absolute',
                inset: '-25px',
                borderRadius: '45px',
                background: 
                  activeImage === '/obsessive_speed.png' ? 'radial-gradient(circle, rgba(255, 42, 84, 0.35) 0%, transparent 70%)' :
                  activeImage === '/rock_solid_security.png' ? 'radial-gradient(circle, rgba(0, 229, 255, 0.38) 0%, transparent 70%)' :
                  activeImage === '/dedicated_crew.png' ? 'radial-gradient(circle, rgba(255, 120, 0, 0.35) 0%, transparent 70%)' :
                  activeImage === '/revenue_first_design.png' ? 'radial-gradient(circle, rgba(255, 184, 0, 0.35) 0%, transparent 70%)' :
                  'radial-gradient(circle, rgba(0, 0, 0, 0.08) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none',
                transition: 'background 0.5s ease-in-out',
                opacity: 0.85
              }}
            />

            <div className="about-video-wrapper" ref={videoWrapperRef} style={{ position: 'sticky', top: '50vh', transform: 'translateY(-50%)', zIndex: 1, width: '100%', maxWidth: '1000px', margin: '0 auto', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.15)', aspectRatio: '16/9' }}>
              {allImages.map((img) => (
                <img 
                  key={img.src}
                  src={img.src} 
                  alt={img.alt} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    position: 'absolute', 
                    inset: 0,
                    opacity: activeImage === img.src ? 1 : 0,
                    transition: 'opacity 0.6s ease-in-out',
                    zIndex: activeImage === img.src ? 1 : 0
                  }} 
                />
              ))}
              
              <div className="about-video-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem', color: 'white', zIndex: 2 }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.25rem', color: 'white', fontWeight: 700 }}>
                  {activeImage === '/creative_process.png' && 'Our Creative Process'}
                  {activeImage === '/obsessive_speed.png' && 'Obsessive Speed'}
                  {activeImage === '/rock_solid_security.png' && 'Rock-Solid Security'}
                  {activeImage === '/dedicated_crew.png' && 'Dedicated Crew'}
                  {activeImage === '/revenue_first_design.png' && 'Revenue-First Design'}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', margin: 0 }}>
                  {activeImage === '/creative_process.png' && 'From concept to launch'}
                  {activeImage === '/obsessive_speed.png' && 'Engineered for sub-second performance'}
                  {activeImage === '/rock_solid_security.png' && 'Fortified with enterprise-grade protection'}
                  {activeImage === '/dedicated_crew.png' && 'Full attention of senior designers and devs'}
                  {activeImage === '/revenue_first_design.png' && 'Optimized to convert traffic to paying customers'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div>
            <div className="section-label reveal reveal-delay-1">Who We Are</div>
            <AnimatedHeading 
              text="A Tiny Team with \n Outsized Ambition" 
              mode="blur" 
            />
            <p className="reveal reveal-delay-3" style={{ marginTop: '1.5rem' }}>
              NUVAROX is a boutique digital studio born in Chennai. We're not a 200-person agency churning out templates. We're a focused, obsessive crew that treats every project like it's our own product launch.
            </p>
            <p className="reveal reveal-delay-4" style={{ marginTop: '1rem' }}>
              We partner with startups and ambitious brands who understand that design isn't decoration — it's strategy. When you work with us, you get our full attention, not a junior team and a project manager.
            </p>

            <div 
              className="about-features" 
              onMouseLeave={() => setActiveImage('/creative_process.png')}
              style={{ marginTop: '2.5rem' }}
            >
              {features.map((f, i) => (
                <div 
                  key={i} 
                  ref={el => cardRefs.current[i] = el}
                  className="about-feature glass-card"
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={(e) => handleMouseLeave(e, i)}
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    willChange: 'transform',
                    position: 'relative'
                  }}
                >
                  <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                    <div style={{ 
                      color: i === 0 ? '#FF2A54' : 
                             i === 1 ? '#00E5FF' : 
                             i === 2 ? '#FF7800' : 
                                       '#FFB800', 
                      marginBottom: '0.75rem' 
                    }}>{f.icon}</div>
                    <h4 style={{ fontWeight: 700 }}>{f.title}</h4>
                    <p style={{ margin: 0 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
