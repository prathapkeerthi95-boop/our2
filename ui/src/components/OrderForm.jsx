import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';
import LiveSmokyCanvas from './LiveSmokyCanvas';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [status, setStatus] = useState('');
  
  // Simple Math Captcha
  const [captchaVal1, setCaptchaVal1] = useState(0);
  const [captchaVal2, setCaptchaVal2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    setCaptchaVal1(Math.floor(Math.random() * 10) + 1);
    setCaptchaVal2(Math.floor(Math.random() * 10) + 1);
    setCaptchaAnswer('');
    setCaptchaError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate Captcha
    if (parseInt(captchaAnswer) !== captchaVal1 + captchaVal2) {
      setCaptchaError(true);
      return;
    }

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
        setFormData({ name: '', email: '', phone: '', message: '' });
        generateCaptcha();
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
                'Build': { color: '#00B8D9', WebkitTextFillColor: '#00B8D9', display: 'inline-block' },
                'Legendary': { color: '#00B8D9', WebkitTextFillColor: '#00B8D9', display: 'inline-block' }
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
            <div className="glass-card form-glass-card reveal reveal-delay-3" style={{
              position: 'relative',
              zIndex: 1,
              background: '#FFFFFF',
              borderRadius: '32px',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25)'
            }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#0F172A', fontWeight: 800, fontSize: '1.8rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>Start Your Project</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-grid-row" style={{ display: 'grid', gap: '1.1rem' }}>
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '14px 18px', fontSize: '0.95rem', width: '100%', fontWeight: 500, color: '#0F172A' }} />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email Address" required
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '14px 18px', fontSize: '0.95rem', width: '100%', fontWeight: 500, color: '#0F172A' }} />
                  </div>
                </div>

                <div className="form-group custom-phone-input" style={{ marginTop: '1.1rem' }}>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={formData.phone}
                    onChange={phone => setFormData(prev => ({...prev, phone: phone || ''}))}
                    placeholder="Phone Number"
                  />
                </div>

                <div className="form-group" style={{ marginTop: '1.1rem' }}>
                  <textarea placeholder="Tell us about your project..." rows="4" required
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '14px 18px', fontSize: '0.95rem', width: '100%', fontWeight: 500, color: '#0F172A', resize: 'vertical' }}></textarea>
                </div>

                {/* Captcha Section */}
                <div style={{ marginTop: '1.1rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#0F172A', fontWeight: 600 }}>
                    <ShieldCheck size={20} color="#00E5FF" />
                    <span>Security Check: {captchaVal1} + {captchaVal2} = ?</span>
                  </div>
                  <input 
                    type="number" 
                    placeholder="Answer" 
                    required
                    value={captchaAnswer} 
                    onChange={e => {
                      setCaptchaAnswer(e.target.value);
                      setCaptchaError(false);
                    }}
                    style={{ 
                      background: '#FFFFFF', 
                      border: captchaError ? '1px solid #FF2A54' : '1px solid #E2E8F0', 
                      borderRadius: '12px', 
                      padding: '10px 14px', 
                      fontSize: '0.95rem', 
                      width: '120px', 
                      fontWeight: 600, 
                      color: '#0F172A',
                      textAlign: 'center'
                    }} 
                  />
                </div>
                {captchaError && (
                  <p style={{ color: '#FF2A54', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600 }}>Incorrect answer, please try again.</p>
                )}

                <button type="submit" className="glass-submit-btn" style={{ width: '100%', marginTop: '1.4rem', justifyContent: 'center', background: 'linear-gradient(135deg, #00E5FF 0%, #7000FF 100%)', color: '#FFFFFF', padding: '16px', borderRadius: '16px', fontWeight: 800, fontSize: '1.02rem', border: 'none', cursor: 'pointer', boxShadow: '0 12px 30px rgba(0, 229, 255, 0.35)', display: 'flex', alignItems: 'center', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  disabled={status === 'sending'}>
                  <span>{status === 'sending' ? 'Transmitting...' : 'Submit'}</span>
                  <Send size={18} style={{ position: 'relative', zIndex: 1, marginLeft: '10px' }} />
                </button>

                {status === 'success' && (
                  <p style={{ color: '#7000FF', textAlign: 'center', marginTop: '1rem', fontWeight: 700 }}>
                    ✓ Message received. We'll contact you shortly.
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
            #contact input, #contact select, #contact textarea {
              color: #0F172A !important;
              caret-color: #00E5FF !important;
              transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            #contact input::placeholder, #contact textarea::placeholder {
              color: #94A3B8 !important;
              opacity: 1 !important;
            }
            #contact input:hover, #contact select:hover, #contact textarea:hover {
              background: #FFFFFF !important;
              border-color: rgba(0, 229, 255, 0.5) !important;
              box-shadow: 0 0 10px rgba(0, 229, 255, 0.1) !important;
            }
            #contact input:focus, #contact select:focus, #contact textarea:focus,
            #contact input:active, #contact select:active, #contact textarea:active {
              background: #FFFFFF !important;
              border-color: #00E5FF !important;
              outline: none !important;
              box-shadow: 0 0 15px rgba(0, 229, 255, 0.2) !important;
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
            /* react-phone-number-input custom styles */
            .custom-phone-input .PhoneInput {
              background: #F8FAFC;
              border: 1px solid #E2E8F0;
              border-radius: 16px;
              height: 50px;
              padding: 0 14px;
              display: flex;
              align-items: center;
              transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .custom-phone-input .PhoneInput:focus-within {
              background: #FFFFFF;
              border-color: #00E5FF;
              box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
            }
            .custom-phone-input .PhoneInputCountry {
              margin-right: 12px;
              padding-right: 12px;
              border-right: 1px solid #E2E8F0;
            }
            .custom-phone-input .PhoneInputInput {
              border: none !important;
              background: transparent !important;
              font-size: 0.95rem;
              font-weight: 500;
              color: #0F172A !important;
              height: 100%;
              outline: none !important;
              padding: 0 !important;
              box-shadow: none !important;
            }
            .custom-phone-input .PhoneInputInput::placeholder {
              color: #94A3B8 !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
