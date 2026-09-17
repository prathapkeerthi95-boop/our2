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

          {/* Right — Form Wrapper */}
          <div style={{ position: 'relative' }}>
            {/* Main Form Card Container (Liquid Glass & Glassmorphism Card) */}
            <div className="glass-card form-glass-card reveal reveal-delay-3" style={{
              position: 'relative',
              zIndex: 1,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 100%)',
              borderRadius: '32px',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45), inset 0 1.5px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.15)'
            }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#FFFFFF', fontWeight: 800, fontSize: '1.8rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>Start Your Project</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-grid-row" style={{ display: 'grid', gap: '1.1rem' }}>
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '14px 18px', fontSize: '0.95rem', width: '100%', fontWeight: 500, color: '#FFFFFF', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }} />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email Address" required
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '14px 18px', fontSize: '0.95rem', width: '100%', fontWeight: 500, color: '#FFFFFF', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }} />
                  </div>
                </div>

                <div className="form-grid-row" style={{ display: 'grid', gap: '1.1rem', marginTop: '1.1rem' }}>
                  <div className="form-group">
                    <input type="tel" placeholder="Phone Number"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '14px 18px', fontSize: '0.95rem', width: '100%', fontWeight: 500, color: '#FFFFFF', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }} />
                  </div>
                  <div className="form-group">
                    <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '14px 18px', fontSize: '0.95rem', width: '100%', fontWeight: 500, color: '#FFFFFF', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                      <option value="Next-Gen Web Design">Next-Gen Web Design</option>
                      <option value="Mobile App Engineering">Mobile App Engineering</option>
                      <option value="Performance Marketing">Performance Marketing</option>
                      <option value="Brand Identity & Logo">Brand Identity & Logo</option>
                      <option value="Full Digital Package">Full Digital Package</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.1rem' }}>
                  <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '14px 18px', fontSize: '0.95rem', width: '100%', fontWeight: 500, color: '#FFFFFF', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                    <option value="" disabled>Select Budget Range</option>
                    <option value="₹25K - ₹50K">₹25K - ₹50K</option>
                    <option value="₹50K - ₹1L">₹50K - ₹1 Lakh</option>
                    <option value="₹1L - ₹5L">₹1 Lakh - ₹5 Lakhs</option>
                    <option value="₹5L+">₹5 Lakhs+</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginTop: '1.1rem' }}>
                  <textarea placeholder="Tell us about your project..." rows="4" required
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '14px 18px', fontSize: '0.95rem', width: '100%', fontWeight: 500, color: '#FFFFFF', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', resize: 'vertical' }}></textarea>
                </div>

                <button type="submit" className="glass-submit-btn" style={{ width: '100%', marginTop: '1.4rem', justifyContent: 'center', background: 'linear-gradient(135deg, #00E5FF 0%, #7000FF 100%)', color: '#FFFFFF', padding: '16px', borderRadius: '16px', fontWeight: 800, fontSize: '1.02rem', border: 'none', cursor: 'pointer', boxShadow: '0 12px 30px rgba(0, 229, 255, 0.35)', display: 'flex', alignItems: 'center', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  disabled={status === 'sending'}>
                  <span>{status === 'sending' ? 'Transmitting...' : 'Submit Project Brief'}</span>
                  <Send size={18} style={{ position: 'relative', zIndex: 1, marginLeft: '10px' }} />
                </button>

                {status === 'success' && (
                  <p style={{ color: '#00E5FF', textAlign: 'center', marginTop: '1rem', fontWeight: 700 }}>
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
            .form-grid-row {
              grid-template-columns: 1fr 1fr;
            }
            .form-glass-card {
              padding: 2.5rem;
            }
            @media (max-width: 1024px) {
              #contact {
                padding: 60px 0 !important;
              }
            }
            @media (max-width: 680px) {
              .form-grid-row {
                grid-template-columns: 1fr;
              }
              .form-glass-card {
                padding: 1.5rem;
                border-radius: 24px !important;
              }
              #contact {
                padding: 40px 0 !important;
              }
              #contact .contact-info-item .icon-box {
                width: 40px !important;
                height: 40px !important;
                border-radius: 10px !important;
              }
              #contact h4 {
                font-size: 0.95rem !important;
              }
              #contact .contact-info-item p {
                font-size: 0.85rem !important;
              }
            }
            @media (max-width: 480px) {
              #contact {
                padding: 30px 0 !important;
              }
              .form-glass-card {
                padding: 1.25rem;
                border-radius: 20px !important;
              }
              .form-glass-card h3 {
                font-size: 1.5rem !important;
              }
            }
            @keyframes subtlePinkGlow {
              0%, 100% { opacity: 0.6; transform: scale(0.98); }
              50% { opacity: 0.95; transform: scale(1.02); }
            }
            #contact input, #contact select, #contact textarea {
              color: #FFFFFF !important;
              caret-color: #00E5FF !important;
              transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            #contact input::placeholder, #contact textarea::placeholder {
              color: rgba(255, 255, 255, 0.6) !important;
              opacity: 1 !important;
            }
            #contact input:hover, #contact select:hover, #contact textarea:hover {
              background: rgba(255, 255, 255, 0.14) !important;
              border-color: rgba(0, 229, 255, 0.5) !important;
              box-shadow: 0 0 20px rgba(0, 229, 255, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3) !important;
            }
            #contact input:focus, #contact select:focus, #contact textarea:focus,
            #contact input:active, #contact select:active, #contact textarea:active {
              background: rgba(255, 255, 255, 0.18) !important;
              border-color: #00E5FF !important;
              outline: none !important;
              box-shadow: 0 0 25px rgba(0, 229, 255, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5) !important;
            }
            #contact select option {
              background: #0D111A !important;
              color: #FFFFFF !important;
              padding: 10px !important;
            }
            #contact input::selection, #contact textarea::selection, #contact select::selection {
              background: #00E5FF !important;
              color: #000000 !important;
            }
            .glass-submit-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 16px 40px rgba(0, 229, 255, 0.55) !important;
              filter: brightness(1.1);
            }
            .glass-submit-btn:active {
              transform: translateY(0);
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
