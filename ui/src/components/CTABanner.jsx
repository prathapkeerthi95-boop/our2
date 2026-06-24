import React from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

const CTABanner = () => {
  return (
    <div className="cta-banner" style={{ position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div className="section-label reveal" style={{ justifyContent: 'center' }}>Ready to Dominate?</div>
        <AnimatedHeading 
          text="Your Competition Won't \n Wait. Neither Should You." 
          mode="rotate" 
          style={{ marginBottom: '1.5rem' }} 
        />
        <p className="reveal reveal-delay-2">
          Book a free strategy session with our team and discover how we can 10x your digital presence.
        </p>
        <a href="#contact" className="btn-primary reveal reveal-delay-3">
          <span>Book Free Consultation</span>
          <ArrowRight size={18} style={{ position: 'relative', zIndex: 1 }} />
        </a>
      </div>
    </div>
  );
};

export default CTABanner;
