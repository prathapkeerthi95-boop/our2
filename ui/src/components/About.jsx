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
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const handleWrapperMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
    setGlowPos({ x, y });
  };

  const handleWrapperMouseLeave = () => {
    setGlowPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    let scrollTriggerInstance;
    let pinTriggerInstance;

    const setupPin = () => {
      if (pinTriggerInstance) {
        pinTriggerInstance.kill();
        pinTriggerInstance = null;
      }
      if (window.innerWidth > 1024 && leftContainerRef.current && sectionRef.current) {
        pinTriggerInstance = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 110px",
          endTrigger: sectionRef.current,
          end: "bottom 80%",
          pin: leftContainerRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true
        });
      }
    };

    setupPin();

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

    const handleResize = () => {
      setupPin();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (pinTriggerInstance) pinTriggerInstance.kill();
      if (scrollTriggerInstance) {
        if (scrollTriggerInstance.scrollTrigger) {
          scrollTriggerInstance.scrollTrigger.kill();
        }
        scrollTriggerInstance.kill();
      }
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
              className="about-sticky-wrapper"
              onMouseMove={handleWrapperMouseMove}
              onMouseLeave={handleWrapperMouseLeave}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '1000px',
                margin: '0 auto',
              }}
            >
              {/* Primary Volumetric Outer Backlight Aura — Pure image color fading directly to transparent */}
              <div 
                className="left-card-glow-outer"
                style={{
                  position: 'absolute',
                  inset: '-35px',
                  borderRadius: '45px',
                  background: 
                    activeImage === '/obsessive_speed.png' ? 'radial-gradient(ellipse at center, rgba(255, 42, 84, 0.65) 0%, rgba(255, 42, 84, 0.25) 50%, transparent 80%)' :
                    activeImage === '/rock_solid_security.png' ? 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.70) 0%, rgba(0, 180, 255, 0.25) 50%, transparent 80%)' :
                    activeImage === '/dedicated_crew.png' ? 'radial-gradient(ellipse at center, rgba(255, 110, 0, 0.75) 0%, rgba(255, 60, 0, 0.28) 50%, transparent 80%)' :
                    activeImage === '/revenue_first_design.png' ? 'radial-gradient(ellipse at center, rgba(255, 184, 0, 0.70) 0%, rgba(255, 120, 0, 0.25) 50%, transparent 80%)' :
                    'radial-gradient(ellipse at center, rgba(160, 60, 255, 0.70) 0%, rgba(120, 0, 255, 0.25) 50%, transparent 80%)',
                  filter: 'blur(40px)',
                  zIndex: 0,
                  pointerEvents: 'none',
                  transition: 'background 0.5s ease-in-out, transform 0.2s ease-out',
                  transform: `translate3d(${glowPos.x}px, ${glowPos.y}px, 0)`,
                  opacity: 0.95
                }}
              />

              {/* Concentric Intense Rim-Light Glow Core directly behind card edge */}
              <div 
                className="left-card-glow-core"
                style={{
                  position: 'absolute',
                  inset: '-15px',
                  borderRadius: '35px',
                  background: 
                    activeImage === '/obsessive_speed.png' ? 'radial-gradient(circle, rgba(255, 42, 84, 0.85) 0%, rgba(255, 42, 84, 0.35) 55%, transparent 85%)' :
                    activeImage === '/rock_solid_security.png' ? 'radial-gradient(circle, rgba(0, 229, 255, 0.88) 0%, rgba(0, 200, 255, 0.38) 55%, transparent 85%)' :
                    activeImage === '/dedicated_crew.png' ? 'radial-gradient(circle, rgba(255, 120, 0, 0.90) 0%, rgba(255, 80, 0, 0.40) 55%, transparent 85%)' :
                    activeImage === '/revenue_first_design.png' ? 'radial-gradient(circle, rgba(255, 184, 0, 0.85) 0%, rgba(255, 140, 0, 0.35) 55%, transparent 85%)' :
                    'radial-gradient(circle, rgba(175, 70, 255, 0.85) 0%, rgba(130, 20, 255, 0.35) 55%, transparent 85%)',
                  filter: 'blur(22px)',
                  zIndex: 0,
                  pointerEvents: 'none',
                  transition: 'background 0.5s ease-in-out, transform 0.15s ease-out',
                  transform: `translate3d(${glowPos.x * 1.4}px, ${glowPos.y * 1.4}px, 0)`,
                  opacity: 0.90
                }}
              />

              <div 
                className="about-video-wrapper" 
                ref={videoWrapperRef} 
                style={{ 
                  position: 'relative', 
                  zIndex: 1, 
                  width: '100%', 
                  maxWidth: '1000px', 
                  margin: '0 auto', 
                  borderRadius: '30px', 
                  overflow: 'hidden', 
                  boxShadow: 
                    activeImage === '/obsessive_speed.png' ? '0 25px 60px rgba(255, 42, 84, 0.30)' :
                    activeImage === '/rock_solid_security.png' ? '0 25px 60px rgba(0, 229, 255, 0.30)' :
                    activeImage === '/dedicated_crew.png' ? '0 25px 60px rgba(255, 120, 0, 0.30)' :
                    activeImage === '/revenue_first_design.png' ? '0 25px 60px rgba(255, 184, 0, 0.30)' :
                    '0 25px 60px rgba(160, 60, 255, 0.30)',
                  transition: 'box-shadow 0.5s ease-in-out',
                  aspectRatio: '16/9' 
                }}
              >
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
          </div>

          {/* Right: Copy */}
          <div>
            <div className="section-label reveal reveal-delay-1">Who We Are</div>
            <AnimatedHeading 
              text="A Tiny Team with \n Outsized Ambition" 
              mode="rotate" 
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
                  className={`about-card-float-wrapper float-delay-${i}`}
                  style={{ borderRadius: '24px', overflow: 'hidden' }}
                >
                  <div 
                    className="about-feature glass-card"
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseMove={(e) => handleMouseMove(e, i)}
                    onMouseLeave={(e) => handleMouseLeave(e, i)}
                    style={{
                      perspective: '1000px',
                      transformStyle: 'preserve-3d',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      willChange: 'transform',
                      position: 'relative',
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.07)',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 18px 40px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.02)'
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
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes levitateFloat0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.2deg); }
        }
        @keyframes levitateFloat1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1.5deg); }
        }
        @keyframes levitateFloat2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-11px) rotate(1.1deg); }
        }
        @keyframes levitateFloat3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-1.3deg); }
        }

        .about-card-float-wrapper {
          will-change: transform;
        }

        .float-delay-0 {
          animation: levitateFloat0 4.2s ease-in-out infinite;
        }
        .float-delay-1 {
          animation: levitateFloat1 4.9s ease-in-out infinite 0.6s;
        }
        .float-delay-2 {
          animation: levitateFloat2 5.4s ease-in-out infinite 1.2s;
        }
        .float-delay-3 {
          animation: levitateFloat3 4.6s ease-in-out infinite 1.8s;
        }
      `}</style>
    </section>
  );
};

export default About;
