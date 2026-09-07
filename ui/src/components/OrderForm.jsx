import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';
import LiveSmokyCanvas from './LiveSmokyCanvas';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: 'Next-Gen Web Design', budget: '', message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('http://localhost:5001/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service: 'Next-Gen Web Design', budget: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{
      position: 'relative',
      overflow: 'hidden',
      background: '#05070C',
      color: '#0F172A',
      padding: '100px 0'
    }}>
      {/* ── HIGH-DEFINITION WHITE SMOKE ON BLACK BACKGROUND VIDEO (MIXKIT 1960) ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.88,
          filter: 'brightness(0.92) contrast(1.15)'
        }}
      >
        <source src="https://assets.mixkit.co/videos/1960/1960-720.mp4" type="video/mp4" />
      </video>

      {/* Dark Ambient Masking Layer for Readability */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(5, 7, 12, 0.35) 0%, rgba(5, 7, 12, 0.75) 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Canvas Smoke Accent Layer */}
      <LiveSmokyCanvas />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-grid">
          {/* Left — Info */}
          <div>
            <div className="section-label reveal" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 18px',
              borderRadius: '50px',
              background: '#FFFFFF',
              border: '1.5px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
              color: '#00B8D9',
              fontWeight: 800,
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '1rem'
            }}>Get In Touch</div>
            <AnimatedHeading 
              text="Let's Build Something Legendary" 
              mode="blur" 
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 900, color: '#FFFFFF' }} 
              wordStyles={{
                'Build': {
                  color: '#00B8D9',
                  WebkitTextFillColor: '#00B8D9',
                  display: 'inline-block'
                },
                'Legendary': {
                  color: '#00B8D9',
                  WebkitTextFillColor: '#00B8D9',
                  display: 'inline-block'
                }
              }}
            />
            <p className="reveal reveal-delay-2" style={{ marginTop: '1rem', marginBottom: '3rem', color: '#FFFFFF', fontSize: '1.1rem', lineHeight: '1.6', fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Ready to dominate your market? Tell us about your project and we'll respond within 24 hours
              with a custom proposal and strategy roadmap.
            </p>

            <div className="contact-info-item reveal reveal-delay-3" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.8rem' }}>
              <div className="icon-box" style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.22)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255, 255, 255, 0.45)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}><Mail size={20} /></div>
              <div>
                <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.1rem', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>Email Us</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.95)', margin: 0, fontWeight: 600, fontSize: '0.98rem', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>nuzaroxtech@gmail.com</p>
              </div>
            </div>

            <div className="contact-info-item reveal reveal-delay-4" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.8rem' }}>
              <div className="icon-box" style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.22)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255, 255, 255, 0.45)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}><Phone size={20} /></div>
              <div>
                <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.1rem', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>Call Us</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.95)', margin: 0, fontWeight: 600, fontSize: '0.98rem', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>+91 89394 31717 / +91 99621 13240</p>
              </div>
            </div>

            <div className="contact-info-item reveal reveal-delay-5" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.8rem' }}>
              <div className="icon-box" style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.22)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255, 255, 255, 0.45)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}><MapPin size={20} /></div>
              <div>
                <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.1rem', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>Visit Us</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.95)', margin: 0, fontWeight: 600, fontSize: '0.98rem', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Chennai, Tamil Nadu, India</p>
              </div>
            </div>
          </div>

          {/* Right — Form Wrapper with Subtle Pink Gradient Glow */}
          <div style={{ position: 'relative' }}>
            {/* Subtle Volumetric Pink Gradient Backlight Aura */}
            <div style={{
              position: 'absolute',
              inset: '-25px',
              borderRadius: '32px',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 0, 122, 0.22) 0%, rgba(255, 42, 84, 0.08) 55%, transparent 80%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
              zIndex: 0,
              animation: 'subtlePinkGlow 5s ease-in-out infinite alternate'
            }} />

            {/* Main Form Card Container (Opaque Frosted Slate Grey Glass Card) */}
            <div className="glass-card reveal reveal-delay-3" style={{
              padding: '2.5rem',
              position: 'relative',
              zIndex: 1,
              background: 'linear-gradient(145deg, rgba(230, 236, 244, 0.88) 0%, rgba(200, 208, 220, 0.92) 100%)',
              borderRadius: '28px',
              backdropFilter: 'blur(32px) saturate(180%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%)',
              boxShadow: '0 32px 80px rgba(15, 23, 42, 0.2), inset 0 1.5px 0 rgba(255, 255, 255, 0.95)'
            }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#0F172A', fontWeight: 800, fontSize: '1.75rem', fontFamily: 'var(--font-display)' }}>Start Your Project</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ background: 'rgba(255, 255, 255, 0.88)', border: '1.5px solid rgba(15, 23, 42, 0.12)', borderRadius: '12px', padding: '12px 16px', fontSize: '0.95rem', width: '100%', fontWeight: 600 }} />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email Address" required
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{ background: 'rgba(255, 255, 255, 0.88)', border: '1.5px solid rgba(15, 23, 42, 0.12)', borderRadius: '12px', padding: '12px 16px', fontSize: '0.95rem', width: '100%', fontWeight: 600 }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <input type="tel" placeholder="Phone Number"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ background: 'rgba(255, 255, 255, 0.88)', border: '1.5px solid rgba(15, 23, 42, 0.12)', borderRadius: '12px', padding: '12px 16px', fontSize: '0.95rem', width: '100%', fontWeight: 600 }} />
                  </div>
                  <div className="form-group">
                    <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
                      style={{ background: 'rgba(255, 255, 255, 0.88)', border: '1.5px solid rgba(15, 23, 42, 0.12)', borderRadius: '12px', padding: '12px 16px', fontSize: '0.95rem', width: '100%', fontWeight: 600 }}>
                      <option value="Next-Gen Web Design">Next-Gen Web Design</option>
                      <option value="Mobile App Engineering">Mobile App Engineering</option>
                      <option value="Performance Marketing">Performance Marketing</option>
                      <option value="Brand Identity & Logo">Brand Identity & Logo</option>
                      <option value="Full Digital Package">Full Digital Package</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}
                    style={{ background: 'rgba(255, 255, 255, 0.88)', border: '1.5px solid rgba(15, 23, 42, 0.12)', borderRadius: '12px', padding: '12px 16px', fontSize: '0.95rem', width: '100%', fontWeight: 600 }}>
                    <option value="" disabled>Select Budget Range</option>
                    <option value="₹25K - ₹50K">₹25K - ₹50K</option>
                    <option value="₹50K - ₹1L">₹50K - ₹1 Lakh</option>
                    <option value="₹1L - ₹5L">₹1 Lakh - ₹5 Lakhs</option>
                    <option value="₹5L+">₹5 Lakhs+</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea placeholder="Tell us about your project..." rows="4" required
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    style={{ background: 'rgba(255, 255, 255, 0.88)', border: '1.5px solid rgba(15, 23, 42, 0.12)', borderRadius: '12px', padding: '12px 16px', fontSize: '0.95rem', width: '100%', fontWeight: 600, resize: 'vertical' }}></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #FF2A54 0%, #7000FF 100%)', color: '#FFFFFF', padding: '14px', borderRadius: '14px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(255, 42, 84, 0.35)' }}
                  disabled={status === 'sending'}>
                  <span>{status === 'sending' ? 'Transmitting...' : 'Submit Project Brief'}</span>
                  <Send size={16} style={{ position: 'relative', zIndex: 1, marginLeft: '8px' }} />
                </button>

                {status === 'success' && (
                  <p style={{ color: '#00B8D9', textAlign: 'center', marginTop: '1rem', fontWeight: 700 }}>
                    ✓ Project brief received. We'll contact you within 24 hours.
                  </p>
                )}
                {status === 'error' && (
                  <p style={{ color: '#FF2A54', textAlign: 'center', marginTop: '1rem', fontWeight: 700 }}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>

          <style>{`
            @keyframes subtlePinkGlow {
              0%, 100% { opacity: 0.6; transform: scale(0.98); }
              50% { opacity: 0.95; transform: scale(1.02); }
            }
            #contact input, #contact select, #contact textarea {
              color: #0F172A;
              caret-color: #0F172A;
              transition: all 0.2s ease;
            }
            #contact input::placeholder, #contact textarea::placeholder {
              color: #475569 !important;
              opacity: 0.9;
            }
            #contact input:hover, #contact select:hover, #contact textarea:hover {
              color: #FFFFFF !important;
              caret-color: #FFFFFF !important;
              background: #0F172A !important;
              border-color: #3282FF !important;
            }
            #contact input:hover::placeholder, #contact textarea:hover::placeholder {
              color: #FFFFFF !important;
              opacity: 0.95 !important;
            }
            #contact input:focus, #contact select:focus, #contact textarea:focus,
            #contact input:active, #contact select:active, #contact textarea:active {
              color: #FFFFFF !important;
              caret-color: #FFFFFF !important;
              background: #0F172A !important;
              border-color: #3282FF !important;
              outline: none;
              box-shadow: 0 0 0 4px rgba(50, 130, 255, 0.35) !important;
            }
            #contact input:focus::placeholder, #contact textarea:focus::placeholder {
              color: #FFFFFF !important;
              opacity: 0.95 !important;
            }
            #contact select option {
              background: #0F172A !important;
              color: #FFFFFF !important;
            }
            #contact input::selection, #contact textarea::selection, #contact select::selection {
              background: #3282FF !important;
              color: #FFFFFF !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
