import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

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
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Left — Info */}
          <div>
            <div className="section-label reveal">Get In Touch</div>
            <AnimatedHeading 
              text="Let's Build Something Legendary" 
              mode="blur" 
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 900 }} 
            />
            <p className="reveal reveal-delay-2" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
              Ready to dominate your market? Tell us about your project and we'll respond within 24 hours
              with a custom proposal and strategy roadmap.
            </p>

            <div className="contact-info-item reveal reveal-delay-3">
              <div className="icon-box"><Mail size={20} /></div>
              <div>
                <h4>Email Us</h4>
                <p>hello@nuvarox.com</p>
              </div>
            </div>

            <div className="contact-info-item reveal reveal-delay-4">
              <div className="icon-box"><Phone size={20} /></div>
              <div>
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="contact-info-item reveal reveal-delay-5">
              <div className="icon-box"><MapPin size={20} /></div>
              <div>
                <h4>Visit Us</h4>
                <p>Chennai, Tamil Nadu, India</p>
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

            {/* Main Form Card Container */}
            <div className="glass-card reveal reveal-delay-3" style={{
              padding: '2.5rem',
              position: 'relative',
              zIndex: 1,
              background: 'linear-gradient(145deg, rgba(32, 10, 26, 0.92) 0%, rgba(18, 6, 20, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(255, 0, 122, 0.32)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(255, 0, 122, 0.08), 0 0 35px rgba(255, 0, 122, 0.18)'
            }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Start Your Project</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email Address" required
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <input type="tel" placeholder="Phone Number"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                      <option value="Next-Gen Web Design">Next-Gen Web Design</option>
                      <option value="Mobile App Engineering">Mobile App Engineering</option>
                      <option value="Performance Marketing">Performance Marketing</option>
                      <option value="Brand Identity & Logo">Brand Identity & Logo</option>
                      <option value="Full Digital Package">Full Digital Package</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                    <option value="" disabled>Select Budget Range</option>
                    <option value="₹25K - ₹50K">₹25K - ₹50K</option>
                    <option value="₹50K - ₹1L">₹50K - ₹1 Lakh</option>
                    <option value="₹1L - ₹5L">₹1 Lakh - ₹5 Lakhs</option>
                    <option value="₹5L+">₹5 Lakhs+</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea placeholder="Tell us about your project..." rows="4" required
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                  disabled={status === 'sending'}>
                  <span>{status === 'sending' ? 'Transmitting...' : 'Submit Project Brief'}</span>
                  <Send size={16} style={{ position: 'relative', zIndex: 1 }} />
                </button>

                {status === 'success' && (
                  <p style={{ color: '#00E5FF', textAlign: 'center', marginTop: '1rem', fontWeight: 600 }}>
                    ✓ Project brief received. We'll contact you within 24 hours.
                  </p>
                )}
                {status === 'error' && (
                  <p style={{ color: '#FF2A54', textAlign: 'center', marginTop: '1rem' }}>
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
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
