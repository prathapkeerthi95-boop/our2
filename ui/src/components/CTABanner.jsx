import React from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';
import LiveSmokyCanvas from './LiveSmokyCanvas';

const CTABanner = () => {
  return (
    <div 
      className="cta-banner" 
      style={{ 
        position: 'relative', 
        zIndex: 10,
        backgroundImage: 'url(/orderform_studio_smoky_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '5.5rem 0 4.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Seamless Morphing Studio Smoke Video Loop Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: '-25px',
          background: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.22) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(200,215,230,0.18) 0%, transparent 65%)',
          animation: 'smokyStudioPulse 12s ease-in-out infinite alternate',
          pointerEvents: 'none',
          zIndex: 0
        }} 
      />

      {/* Live 60fps Volumetric Smoke Drift Canvas */}
      <LiveSmokyCanvas />

      <style>{`
        @keyframes smokyStudioPulse {
          0% { transform: scale(1) translate(0, 0); opacity: 0.7; }
          50% { transform: scale(1.08) translate(-15px, 10px); opacity: 0.95; }
          100% { transform: scale(1.03) translate(15px, -10px); opacity: 0.75; }
        }
        @media (max-width: 768px) {
          .cta-banner {
            padding: 3.5rem 0 3rem !important;
          }
          .cta-banner .container {
            padding: 0 1.2rem !important;
          }
          .cta-banner .btn-primary {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          .cta-banner {
            padding: 2.5rem 0 2rem !important;
          }
        }
      `}</style>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div 
          className="section-label reveal" 
          style={{ 
            justifyContent: 'center',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '6px 20px',
            borderRadius: '50px',
            background: '#0F172A',
            border: '1.5px solid rgba(15, 23, 42, 0.2)',
            color: '#00E5FF',
            fontWeight: 800,
            fontSize: '0.82rem',
            letterSpacing: '0.14em',
            marginBottom: '1.2rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.12)'
          }}
        >
          READY TO DOMINATE?
        </div>

        <AnimatedHeading 
          text="Your Competition Won't \n Wait. Neither Should You." 
          mode="rotate" 
          style={{ marginBottom: '1.5rem', color: '#0F172A', fontWeight: 900 }} 
        />

        <p className="reveal reveal-delay-2" style={{ color: '#334155', fontWeight: 600, fontSize: '1.1rem', maxWidth: '620px', margin: '0 auto 2.5rem' }}>
          Book a free strategy session with our team and discover how we can 10x your digital presence.
        </p>

        <a href="#contact" className="btn-primary reveal reveal-delay-3" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <span>Book Free Consultation</span>
          <ArrowRight size={18} style={{ position: 'relative', zIndex: 1 }} />
        </a>
      </div>
    </div>
  );
};

export default CTABanner;
