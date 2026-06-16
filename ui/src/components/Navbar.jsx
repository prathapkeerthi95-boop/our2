import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#" className="navbar-logo">
          <img src="/logo.png" alt="Logo" onError={(e) => e.target.style.display = 'none'} />
          NUVAROX
        </a>

        <ul className="navbar-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#testimonials">Clients</a></li>
          <li>
            <a href="#contact" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>
              <span>Start a Project</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
