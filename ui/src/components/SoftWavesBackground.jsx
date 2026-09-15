import React from 'react';

const SoftWavesBackground = () => {
  return (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      zIndex: 0, 
      pointerEvents: 'none', 
      background: '#F1F4F9'
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <svg 
          viewBox="0 0 1440 800" 
          preserveAspectRatio="xMaxYMax slice" 
          style={{ 
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
            minWidth: '1000px',
          }}
        >
        <defs>
          <filter id="softShadow1" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="-10" dy="10" stdDeviation="15" floodColor="#000000" floodOpacity="0.05" />
          </filter>
          <filter id="softShadow2" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="-15" dy="15" stdDeviation="20" floodColor="#000000" floodOpacity="0.08" />
          </filter>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F4F9" />
            <stop offset="100%" stopColor="#E2E6EC" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F4F9" />
            <stop offset="100%" stopColor="#D5DBE4" />
          </linearGradient>
          <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F4F9" />
            <stop offset="100%" stopColor="#C5CDD8" />
          </linearGradient>
        </defs>

        {/* Deepest Wave */}
        <path 
          d="M 1440 300 C 1100 250 1000 600 650 650 C 350 690 100 900 0 900 L 0 1000 L 1440 1000 Z" 
          fill="url(#waveGrad3)" 
          filter="url(#softShadow2)"
        />
        
        {/* Middle Wave */}
        <path 
          d="M 1440 400 C 1200 350 950 700 700 700 C 450 700 200 950 0 950 L 0 1000 L 1440 1000 Z" 
          fill="url(#waveGrad2)" 
          filter="url(#softShadow1)"
        />

        {/* Front Wave */}
        <path 
          d="M 1440 500 C 1250 450 1050 800 800 800 C 500 800 250 1000 0 1000 L 0 1000 L 1440 1000 Z" 
          fill="url(#waveGrad1)" 
          filter="url(#softShadow1)"
        />
      </svg>
      </div>
    </div>
  );
};

export default SoftWavesBackground;
