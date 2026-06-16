import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We deep-dive into your business, audience, and competitive landscape to understand the full picture.'
  },
  {
    number: '02',
    title: 'Strategy & Design',
    description: 'Our design team crafts wireframes, prototypes, and high-fidelity mockups tailored to your brand DNA.'
  },
  {
    number: '03',
    title: 'Engineering',
    description: 'Elite developers bring the vision to life with production-grade code, 3D assets, and pixel-perfect implementation.'
  },
  {
    number: '04',
    title: 'Launch & Scale',
    description: 'We deploy, optimize, and monitor performance. Post-launch support ensures sustained growth and iteration.'
  }
];

const Process = () => {
  return (
    <section id="process">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>How We Work</div>
          <h2 style={{ marginBottom: '1rem' }}>A Process Built for <span className="gradient-text">Precision</span></h2>
          <p style={{ maxWidth: '550px', margin: '0 auto' }}>
            Every project follows our battle-tested four-stage framework that guarantees
            on-time delivery and exceptional quality.
          </p>
        </div>

        <div className="process-steps">
          {steps.map((step, i) => (
            <div key={i} className={`glass-card process-step reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="step-number">{step.number}</div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
