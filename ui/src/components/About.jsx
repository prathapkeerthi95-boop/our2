import React from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

const features = [
  { icon: <Zap size={22} />, title: 'Obsessive Speed', desc: 'Sub-second load times. We treat performance as a feature, not an afterthought.' },
  { icon: <Shield size={22} />, title: 'Rock-Solid Security', desc: 'Enterprise-grade protocols on every deployment. Your data stays fortified.' },
  { icon: <Users size={22} />, title: 'Dedicated Crew', desc: 'A tight-knit squad of senior engineers and designers assigned to your vision.' },
  { icon: <Award size={22} />, title: 'Revenue-First Design', desc: 'Every pixel we place is engineered to convert visitors into paying customers.' }
];

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          
          {/* Left: Video with overlay */}
          <div className="reveal hover-target">
            <div className="about-video-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.15)', aspectRatio: '16/9' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}>
                <source src="/illustration-explainer-purple-ai-business-company-presentation.mp4" type="video/mp4" />
              </video>
              <div className="about-video-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem', color: 'white' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.25rem', color: 'white', fontWeight: 700 }}>Our Creative Process</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', margin: 0 }}>From concept to launch</p>
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

            <div className="about-features" style={{ marginTop: '2.5rem' }}>
              {features.map((f, i) => (
                <div key={i} className={`about-feature glass-card reveal reveal-delay-${(i % 4) + 1}`}>
                  <div style={{ color: 'var(--accent-crimson)', marginBottom: '0.75rem' }}>{f.icon}</div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
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
