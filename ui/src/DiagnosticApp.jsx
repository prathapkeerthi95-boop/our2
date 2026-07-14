// DIAGNOSTIC: Renders all sections without complex 3D cube to verify sections work
import React from 'react';
import About from './components/About';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';

const DiagnosticApp = () => {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ height: '100px', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
        HERO (placeholder)
      </div>
      
      <div style={{ height: '100px', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
        SERVICES (placeholder)
      </div>

      {/* ===== ABOUT ===== */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: '#F5F3EF' }}>
        <About />
      </div>

      {/* ===== STATS ===== */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: '#828282', paddingBottom: '4rem' }}>
        <Stats />
      </div>

      {/* ===== PORTFOLIO ===== */}
      <div style={{ position: 'relative', zIndex: 20 }}>
        <Portfolio />
      </div>

      {/* ===== PROCESS ===== */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: '#020202' }}>
        <Process />
        <Testimonials />
      </div>
    </div>
  );
};

export default DiagnosticApp;
