import React from 'react';

const CyberneticBackdropEngine = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        minHeight: '580px',
        overflow: 'hidden',
        zIndex: 1,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      {/* CSS Animations */}
      <style>
        {`
          @keyframes spinSlow {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes spinSlowReverse {
            from { transform: translate(-50%, -50%) rotate(360deg); }
            to { transform: translate(-50%, -50%) rotate(-360deg); }
          }
          @keyframes spin3D {
            0% { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(0deg); }
            100% { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(360deg); }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
          }
          @keyframes nodeOrbit {
            0% { transform: rotate(0deg) translateX(250px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(250px) rotate(-360deg); }
          }
          @keyframes nodeOrbitReverse {
            0% { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
            100% { transform: rotate(0deg) translateX(180px) rotate(0deg); }
          }
        `}
      </style>

      {/* Container for Robot and its background animation */}
      <div style={{ position: 'relative', width: '45%', height: '100%', marginLeft: '-5%' }}>
        
        {/* Advanced Tech Background Animation */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          zIndex: 1,
          perspective: '1000px'
        }}>
          {/* Layer 1: 3D Grid Floor (Perspective Rotation) */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '140%', height: '140%',
            background: 'linear-gradient(rgba(0,229,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            borderRadius: '50%',
            animation: 'spin3D 30s linear infinite',
            maskImage: 'radial-gradient(black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(black 30%, transparent 70%)'
          }} />

          {/* Layer 2: Radar Sweep */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '110%', height: '110%', borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent 0%, transparent 75%, rgba(0, 229, 255, 0.4) 100%)',
            animation: 'spinSlow 10s linear infinite',
            maskImage: 'radial-gradient(transparent 40%, black 70%)',
            WebkitMaskImage: 'radial-gradient(transparent 40%, black 70%)'
          }} />

          {/* Layer 3: Tech Rings (Dashed and Dotted) */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '80%', height: '80%',
            border: '1px dashed rgba(255, 42, 84, 0.4)', borderRadius: '50%',
            animation: 'spinSlowReverse 20s linear infinite'
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '60%', height: '60%',
            border: '2px dotted rgba(0, 229, 255, 0.5)', borderRadius: '50%',
            animation: 'spinSlow 15s linear infinite'
          }} />

          {/* Layer 4: Orbital Nodes (Tech Agency Style) */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 2 }}>
            <div style={{
              position: 'absolute', width: '8px', height: '8px', borderRadius: '50%',
              background: '#00E5FF', boxShadow: '0 0 15px #00E5FF, 0 0 30px #00E5FF',
              animation: 'nodeOrbit 12s linear infinite'
            }} />
          </div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 2 }}>
            <div style={{
              position: 'absolute', width: '6px', height: '6px', borderRadius: '50%',
              background: '#FF2A54', boxShadow: '0 0 15px #FF2A54, 0 0 30px #FF2A54',
              animation: 'nodeOrbitReverse 18s linear infinite'
            }} />
          </div>

          {/* Layer 5: Crosshair target */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '30%', height: '30%',
            background: 'linear-gradient(90deg, transparent 49%, rgba(0,229,255,0.3) 50%, transparent 51%), linear-gradient(0deg, transparent 49%, rgba(0,229,255,0.3) 50%, transparent 51%)',
            borderRadius: '50%'
          }} />

          {/* Layer 6: Core Glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '35%', height: '35%',
            background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)',
            borderRadius: '50%', animation: 'pulseGlow 3s ease-in-out infinite'
          }} />
        </div>

        {/* Foreground Robot Image - Compact and Static */}
        <img 
          src="/robot-transparent.png" 
          alt="AI Robot" 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '60%', // Significantly more compact
            width: 'auto',
            objectFit: 'contain',
            zIndex: 2,
            filter: 'drop-shadow(0px 20px 40px rgba(0, 229, 255, 0.2))' // Add a subtle cyber glow shadow instead of blending
          }}
        />
      </div>

      {/* Background grain/dots for the section */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '24px 24px', zIndex: 0
      }} />
    </div>
  );
};

export default CyberneticBackdropEngine;
