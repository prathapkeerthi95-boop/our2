import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="navbar-logo" style={{ marginBottom: '0.5rem' }}>
              NUVAROX
            </div>
            <p style={{ marginBottom: '1.2rem' }}>
              An elite digital agency engineering next-generation websites, mobile apps,
              brand identities, and growth strategies for ambitious businesses.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <img 
                src="/n-logo-vivid.png" 
                alt="Nuvvarox Company Logo" 
                style={{
                  height: '48px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 16px rgba(0, 229, 255, 0.75))'
                }}
              />
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">Mobile Apps</a></li>
              <li><a href="#services">Digital Marketing</a></li>
              <li><a href="#services">Brand & Logo Design</a></li>
              <li><a href="#services">UI/UX Design</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#portfolio">Our Work</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@nuvarox.com">hello@nuvarox.com</a></li>
              <li><a href="tel:+919876543210">+91 98765 43210</a></li>
              <li><a href="#">Chennai, India</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NUVAROX. All rights reserved. Engineered with precision.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="LinkedIn">IN</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="Dribbble">DR</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
