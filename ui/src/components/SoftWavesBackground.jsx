import React from 'react';

const SoftWavesBackground = () => {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0,
      left: 0, 
      width: '100%',
      height: '350px', 
      zIndex: 0, 
      pointerEvents: 'none', 
      overflow: 'hidden',
      background: '#F1F4F9'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        <svg 
          viewBox="0 0 1440 350" 
          preserveAspectRatio="none" 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
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
          d="M 0 0 L 1440 0 L 1440 220 C 1100 280 900 150 550 280 C 300 350 0 250 0 250 Z" 
          fill="url(#waveGrad3)" 
          filter="url(#softShadow2)"
        />
        
        {/* Middle Wave */}
        <path 
          d="M 0 0 L 1440 0 L 1440 160 C 1150 220 850 110 450 220 C 200 280 0 180 0 180 Z" 
          fill="url(#waveGrad2)" 
          filter="url(#softShadow1)"
        />

        {/* Front Wave */}
        <path 
          d="M 0 0 L 1440 0 L 1440 100 C 1200 160 800 70 400 150 C 150 200 0 110 0 110 Z" 
          fill="url(#waveGrad1)" 
          filter="url(#softShadow1)"
        />
      </svg>
      </div>
    </div>
  );
};

export default SoftWavesBackground;
