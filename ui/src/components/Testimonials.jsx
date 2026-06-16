import React from 'react';

const testimonials = [
  {
    stars: '★★★★★',
    quote: 'NUVAROX completely transformed our digital presence. Our website traffic increased by 420% and the design is something our competitors can only dream about.',
    name: 'Rajesh Krishnan',
    role: 'CEO, TechNova Solutions',
    initials: 'RK'
  },
  {
    stars: '★★★★★',
    quote: 'The mobile app they built for us is flawless. From the UX research to the final deployment, every stage was handled with absolute professionalism and precision.',
    name: 'Priya Venkatesh',
    role: 'Founder, FitPulse App',
    initials: 'PV'
  },
  {
    stars: '★★★★★',
    quote: 'Their brand strategy work was exceptional. They didn\'t just design a logo — they built an entire identity ecosystem that perfectly captures who we are.',
    name: 'Arjun Mehta',
    role: 'Director, Vertex Industries',
    initials: 'AM'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>Client Testimonials</div>
          <h2 style={{ marginBottom: '1rem' }}>Trusted by <span className="gradient-text">Industry Leaders</span></h2>
          <p style={{ maxWidth: '500px', margin: '0 auto' }}>
            Don't just take our word for it. Here's what our clients say about working with NUVAROX.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className={`glass-card testimonial-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="stars">{t.stars}</div>
              <blockquote>"{t.quote}"</blockquote>
              <div className="client-info">
                <div className="client-avatar">{t.initials}</div>
                <div>
                  <div className="client-name">{t.name}</div>
                  <div className="client-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
