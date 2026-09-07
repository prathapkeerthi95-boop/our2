import React from 'react';

const CircularMotionFrameBackground = () => {
  return (
    <div 
      className="circular-motion-bg-root"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'linear-gradient(180deg, #EDF2FC 0%, #F0F4FD 280px, #FAFAF8 480px, #FFFFFF 100%)'
      }}
    >
      <style>{`
        /* Continuous Live Animations */
        @keyframes spinCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinCCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes sphereFloat1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10px, -15px) scale(1.03); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes sphereFloat2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(12px, -10px) scale(1.04); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes sphereFloat3 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-8px, 12px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes pulseGlowAtmosphere {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.05); }
        }

        /* 3D Spiral Silk Ribbon Wave Motion Animations */
        @keyframes spiralWaveUndulate1 {
          0% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-14px) scaleY(1.06) rotate(-0.5deg); }
          100% { transform: translateY(0) scaleY(1); }
        }
        @keyframes spiralWaveUndulate2 {
          0% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(16px) scaleY(0.95) rotate(0.8deg); }
          100% { transform: translateY(0) scaleY(1); }
        }
        @keyframes spiralWaveUndulate3 {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        .wave-layer-back {
          animation: spiralWaveUndulate3 14s ease-in-out infinite alternate;
          transform-origin: 50% 50%;
        }
        .wave-layer-mid {
          animation: spiralWaveUndulate2 10s ease-in-out infinite alternate-reverse;
          transform-origin: 50% 50%;
        }
        .wave-layer-front {
          animation: spiralWaveUndulate1 8s ease-in-out infinite alternate;
          transform-origin: 50% 50%;
        }

        .orbit-spin-cw-slow {
          animation: spinCW 60s linear infinite;
          transform-origin: 350px 350px;
        }
        .orbit-spin-ccw-slow {
          animation: spinCCW 45s linear infinite;
          transform-origin: 350px 350px;
        }
        .orbit-spin-cw-med {
          animation: spinCW 30s linear infinite;
          transform-origin: 350px 350px;
        }

        .sphere-top-violet { animation: sphereFloat1 8s ease-in-out infinite; }
        .sphere-mid-core { animation: sphereFloat2 10s ease-in-out infinite 1s; }
        .sphere-lower-cyan { animation: sphereFloat3 7s ease-in-out infinite 2s; }

        .atmospheric-glow-cyan {
          position: absolute;
          top: 0%;
          right: 0%;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%);
          filter: blur(60px);
          animation: pulseGlowAtmosphere 8s ease-in-out infinite alternate;
        }

        .atmospheric-glow-purple {
          position: absolute;
          top: 300px;
          right: 5%;
          width: 650px;
          height: 650px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.16) 0%, rgba(167, 139, 250, 0.06) 55%, transparent 75%);
          filter: blur(65px);
          animation: pulseGlowAtmosphere 10s ease-in-out infinite alternate-reverse;
        }

        /* Responsive Orbital Positioning */
        .orbital-frame-container {
          position: absolute;
          top: 30px;
          right: max(-140px, calc(50vw - 760px));
          width: clamp(540px, 48vw, 750px);
          height: clamp(540px, 48vw, 750px);
          z-index: 2;
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .orbital-frame-container {
            top: 20px !important;
            right: -160px !important;
            width: 480px !important;
            height: 480px !important;
          }
        }
        @media (max-width: 640px) {
          .orbital-frame-container {
            top: 10px !important;
            right: -220px !important;
            width: 380px !important;
            height: 380px !important;
          }
        }
      `}</style>

      {/* ── ATMOSPHERIC LIGHT BLOOMS ── */}
      <div className="atmospheric-glow-cyan" />
      <div className="atmospheric-glow-purple" />

      {/* ── 1. 3D SPIRAL SILK RIBBON WAVE SECTION DIVIDER (EXACT IMAGE 2 REPLICA) ── */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '310px', 
          left: 0, 
          width: '100%', 
          height: '340px', 
          zIndex: 1, 
          pointerEvents: 'none' 
        }}
      >
        <svg 
          viewBox="0 0 1440 340" 
          preserveAspectRatio="none" 
          style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
        >
          <defs>
            {/* Spiral Gradient 1 (Bright Cyan to Sky Blue) */}
            <linearGradient id="spiralCyanGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="40%" stopColor="#38BDF8" />
              <stop offset="80%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            {/* Spiral Gradient 2 (Electric Cyan-Blue to Deep Blue) */}
            <linearGradient id="spiralBlueGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="35%" stopColor="#0284C7" />
              <stop offset="70%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>

            {/* Spiral Gradient 3 (Royal Deep Blue Ribbon) */}
            <linearGradient id="spiralDeepBlueGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="50%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>

            {/* Silk Translucent Gradient Fill 1 */}
            <linearGradient id="spiralSilkFill1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.05" />
            </linearGradient>

            {/* Silk Translucent Gradient Fill 2 */}
            <linearGradient id="spiralSilkFill2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#0284C7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
            </linearGradient>

            {/* Glowing Drop Shadow Filter */}
            <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0284C7" floodOpacity="0.38" />
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00E5FF" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* SILK SHADED FILL RIBBON LAYER 1 (Translucent Mesh Shading between waves) */}
          <path 
            className="wave-layer-back"
            d="M -50, 140 C 320, 230 680, 40 1080, 160 C 1280, 210 1440, 110 1520, 140 L 1520, 230 C 1380, 190 1200, 260 980, 180 C 580, 40 280, 220 -50, 170 Z" 
            fill="url(#spiralSilkFill1)"
          />

          {/* SILK SHADED FILL RIBBON LAYER 2 (Secondary Overlapping Mesh) */}
          <path 
            className="wave-layer-mid"
            d="M -50, 90 C 280, 170 620, 20 1000, 130 C 1220, 180 1400, 90 1520, 120 L 1520, 190 C 1350, 150 1150, 220 920, 160 C 520, 20 220, 180 -50, 120 Z" 
            fill="url(#spiralSilkFill2)"
          />

          {/* RIBBON PATH 1: Wide Translucent Sky-Blue Ribbon (Underneath Base) */}
          <path 
            className="wave-layer-back"
            d="M -50, 160 C 350, 230 720, 70 1120, 180 C 1300, 220 1450, 130 1520, 170" 
            stroke="url(#spiralCyanGrad1)" 
            strokeWidth="14" 
            fill="none" 
            opacity="0.3" 
          />

          {/* RIBBON PATH 2: Deep Royal Blue Interweaving Swirl Path */}
          <path 
            className="wave-layer-mid"
            d="M -50, 70 C 260, 170 560, 10 960, 150 C 1200, 220 1380, 100 1520, 140" 
            stroke="url(#spiralDeepBlueGrad3)" 
            strokeWidth="7" 
            fill="none" 
            opacity="0.75" 
          />

          {/* RIBBON PATH 3: THE MAIN GLOWING ELECTRIC CYAN-BLUE 3D SPIRAL RIBBON (IMAGE 2 REPLICA) */}
          <path 
            className="wave-layer-front"
            d="M -50, 110 C 320, 200 680, 30 1080, 140 C 1280, 190 1440, 90 1520, 110" 
            stroke="url(#spiralBlueGrad2)" 
            strokeWidth="11" 
            strokeLinecap="round" 
            fill="none" 
            style={{ filter: 'url(#ribbonGlow)' }}
          />

          {/* RIBBON PATH 4: Crisp Highlighting Top Accent Stroke */}
          <path 
            className="wave-layer-front"
            d="M -50, 106 C 320, 196 680, 26 1080, 136 C 1280, 186 1440, 86 1520, 106" 
            stroke="rgba(255, 255, 255, 0.85)" 
            strokeWidth="2.5" 
            fill="none" 
          />
        </svg>
      </div>

      {/* ── 2. PORTFOLIO BOTTOM-LEFT FLOWING CURVED WAVE LINES ── */}
      <div style={{ position: 'absolute', top: '650px', left: '-2%', width: '65%', height: '500px', zIndex: 1, pointerEvents: 'none' }}>
        <svg viewBox="0 0 900 500" fill="none" style={{ width: '100%', height: '100%', opacity: 0.85 }}>
          <defs>
            <linearGradient id="leftWaveLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.32)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.02)" />
            </linearGradient>
          </defs>
          
          {/* Smooth Cascading Contour Waves */}
          <path d="M-50,120 C200,60 400,280 850,150" stroke="url(#leftWaveLineGrad)" strokeWidth="1.8" strokeDasharray="6 6" />
          <path d="M-50,190 C220,130 420,340 880,220" stroke="url(#leftWaveLineGrad)" strokeWidth="1.5" />
          <path d="M-50,260 C240,200 440,400 910,290" stroke="url(#leftWaveLineGrad)" strokeWidth="2" strokeDasharray="12 8" />
          <path d="M-50,330 C260,270 460,460 940,360" stroke="url(#leftWaveLineGrad)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* ── 3. CORE CIRCULAR MOTION FRAME & 3D ORBITAL SYSTEM (RIGHT SIDE) ── */}
      <div className="orbital-frame-container">
        <svg viewBox="0 0 700 700" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            {/* Primary Glowing Gradient for the Main Orbital Arc */}
            <linearGradient id="mainOrbitalArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="35%" stopColor="#3B82F6" />
              <stop offset="70%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#C4B5FD" />
            </linearGradient>

            {/* Core 3D Glass Sphere Gradient */}
            <radialGradient id="coreGlassSphereGrad" cx="32%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="22%" stopColor="#C4B5FD" />
              <stop offset="65%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#4C1D95" />
            </radialGradient>

            {/* Inner Ring Soft Glow Filter */}
            <filter id="orbitalGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#3B82F6" floodOpacity="0.38" />
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00E5FF" floodOpacity="0.5" />
            </filter>

            {/* Metallic Highlight Stroke */}
            <linearGradient id="orbitStrokeHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.25)" />
            </linearGradient>
          </defs>

          {/* LAYER A: Outer Thin Tick Mark Ring (Spinning Counter-Clockwise) */}
          <g className="orbit-spin-ccw-slow">
            <circle 
              cx="350" 
              cy="350" 
              r="330" 
              stroke="url(#mainOrbitalArcGrad)" 
              strokeWidth="2.5" 
              strokeDasharray="4 9" 
              fill="none" 
              opacity="0.6" 
            />
            <circle 
              cx="350" 
              cy="350" 
              r="305" 
              stroke="rgba(56, 189, 248, 0.35)" 
              strokeWidth="1.5" 
              strokeDasharray="14 14" 
              fill="none" 
            />
          </g>

          {/* LAYER B: Middle Segmented Track Ring (Spinning Clockwise) */}
          <g className="orbit-spin-cw-slow">
            <circle 
              cx="350" 
              cy="350" 
              r="270" 
              stroke="url(#mainOrbitalArcGrad)" 
              strokeWidth="14" 
              strokeDasharray="36 20 8 20" 
              fill="none" 
              opacity="0.25" 
            />
            <circle 
              cx="350" 
              cy="350" 
              r="245" 
              stroke="rgba(139, 92, 246, 0.4)" 
              strokeWidth="2" 
              strokeDasharray="7 7" 
              fill="none" 
            />
          </g>

          {/* LAYER C: THE MAIN GLOWING 3D CIRCULAR MOTION FRAME (PRIMARY ARC) */}
          <g className="orbit-spin-cw-med">
            {/* Soft Ambient Shadow Arc */}
            <circle 
              cx="350" 
              cy="350" 
              r="200" 
              stroke="url(#mainOrbitalArcGrad)" 
              strokeWidth="38" 
              fill="none" 
              style={{ filter: 'url(#orbitalGlow)' }}
            />
            {/* Crisp Inner Highlighting Stroke */}
            <circle 
              cx="350" 
              cy="350" 
              r="200" 
              stroke="url(#orbitStrokeHighlight)" 
              strokeWidth="3" 
              strokeDasharray="140 30 70 30" 
              fill="none" 
            />
            <circle 
              cx="350" 
              cy="350" 
              r="178" 
              stroke="rgba(255, 255, 255, 0.8)" 
              strokeWidth="1.5" 
              strokeDasharray="10 10" 
              fill="none" 
            />
          </g>

          {/* LAYER D: Inner Core Translucent Lens Center */}
          <circle 
            cx="350" 
            cy="350" 
            r="145" 
            fill="rgba(245, 247, 252, 0.5)" 
            stroke="rgba(255, 255, 255, 0.95)" 
            strokeWidth="3.5" 
            style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
          />
          <circle 
            cx="350" 
            cy="350" 
            r="110" 
            fill="rgba(255, 255, 255, 0.75)" 
            stroke="rgba(56, 189, 248, 0.3)" 
            strokeWidth="2" 
          />

          {/* CORE SPHERE FLOATING INSIDE LENS CENTER */}
          <circle 
            cx="350" 
            cy="350" 
            r="42" 
            fill="url(#coreGlassSphereGrad)" 
            style={{ filter: 'drop-shadow(0 10px 20px rgba(139, 92, 246, 0.35))' }}
          />
        </svg>

        {/* ── 4. FLOATING 3D TRANSLUCENT SPHERES ON ORBIT ── */}
        
        {/* SPHERE 1: Upper-Orbit Soft Violet Sphere */}
        <div 
          className="sphere-top-violet"
          style={{
            position: 'absolute',
            top: '12%',
            right: '20%',
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #DDD6FE 25%, #8B5CF6 65%, #4C1D95 100%)',
            boxShadow: '0 14px 30px rgba(139, 92, 246, 0.32), inset -4px -5px 10px rgba(30, 27, 75, 0.35)',
            zIndex: 4
          }}
        />

        {/* SPHERE 2: Lower-Right Cyan Sphere */}
        <div 
          className="sphere-lower-cyan"
          style={{
            position: 'absolute',
            top: '72%',
            right: '22%',
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #38BDF8 30%, #0284C7 80%, #0369A1 100%)',
            boxShadow: '0 14px 32px rgba(56, 189, 248, 0.32), inset -3px -5px 10px rgba(12, 74, 110, 0.28)',
            zIndex: 4
          }}
        />
      </div>

    </div>
  );
};

export default CircularMotionFrameBackground;
