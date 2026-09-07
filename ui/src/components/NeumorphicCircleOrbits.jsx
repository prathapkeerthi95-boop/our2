import React from 'react';

export default function NeumorphicCircleOrbits({ align = 'right', theme = 'light', offsetY = '50%' }) {
  const isRight = align === 'right';

  // Vibrant Cyan Blue 3D sphere gradient matching user image:
  const ballStyles = {
    cyan: {
      background: 'radial-gradient(circle at 68% 26%, #FFFFFF 0%, #70C5FF 12%, #00B4D8 40%, #0077B6 75%, #003B5C 100%)'
    }
  };

  // 4 Cyan Blue Balls orbiting exclusively inside the first 3 line tracks (Track 0, 1, 2)
  const balls = [
    // Track 0 (Inner Track Groove between Ring 0 & Ring 1)
    { trackInset: '30%', size: 'clamp(58px, 7.8vw, 132px)', color: 'cyan', duration: 20, reverse: false, startAngle: 45 },

    // Track 1 (Middle-Inner Track Groove between Ring 1 & Ring 2)
    { trackInset: '18%', size: 'clamp(62px, 8.2vw, 136px)', color: 'cyan', duration: 28, reverse: true, startAngle: 120 },

    // Track 2 (Middle-Outer Track Groove between Ring 2 & Ring 3)
    { trackInset: '6%', size: 'clamp(64px, 8.4vw, 138px)', color: 'cyan', duration: 36, reverse: false, startAngle: 0 },
    { trackInset: '6%', size: 'clamp(64px, 8.4vw, 138px)', color: 'cyan', duration: 36, reverse: false, startAngle: 180 }
  ];

  return (
    <div 
      className={`neumorphic-circle-orbits-container ${theme}`} 
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <style>{`
        @keyframes orbitCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbitCCW {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>

      {/* 5 Concentric Sculpted Neumorphic Circles — 100% Responsive & Adaptable to ALL Screen Sizes */}
      <div 
        style={{
          position: 'absolute',
          top: offsetY,
          [isRight ? 'right' : 'left']: 'clamp(-280px, -20vw, -120px)', // Responsively clips ~25% off-screen across all viewports
          transform: 'translateY(-50%)',
          width: 'clamp(550px, 75vw, 1200px)',
          height: 'clamp(550px, 75vw, 1200px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      >
        {/* Ring 4 (Extra Outermost 128% diameter) */}
        <div style={{
          position: 'absolute',
          inset: '-14%',
          borderRadius: '50%',
          border: theme === 'dark' ? '1.5px solid rgba(0, 229, 255, 0.28)' : '2px solid rgba(0, 180, 216, 0.2)',
          boxShadow: theme === 'dark'
            ? '0 0 60px rgba(0,0,0,0.7), inset 0 0 35px rgba(0, 229, 255, 0.1)'
            : '32px 32px 80px #e4e1da, -32px -32px 80px #ffffff, inset 0 0 24px rgba(0, 180, 216, 0.06), inset 6px 6px 14px rgba(10, 37, 64, 0.05)',
          background: theme === 'dark' ? 'rgba(8, 8, 16, 0.35)' : 'rgba(250, 248, 244, 0.2)',
          backdropFilter: 'blur(4px)'
        }} />

        {/* Ring 3 (Outer 100% diameter) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: theme === 'dark' ? '1.5px solid rgba(0, 229, 255, 0.35)' : '2px solid rgba(0, 180, 216, 0.25)',
          boxShadow: theme === 'dark'
            ? '0 0 50px rgba(0,0,0,0.8), inset 0 0 30px rgba(0, 229, 255, 0.12)'
            : '28px 28px 70px #e4e1da, -28px -28px 70px #ffffff, inset 0 0 20px rgba(0, 180, 216, 0.08), inset 5px 5px 12px rgba(10, 37, 64, 0.06)',
          background: theme === 'dark' ? 'rgba(10, 10, 18, 0.4)' : 'rgba(250, 248, 244, 0.3)',
          backdropFilter: 'blur(6px)'
        }} />

        {/* Ring 2 (Middle 76.8% diameter) */}
        <div style={{
          position: 'absolute',
          inset: '12%',
          borderRadius: '50%',
          border: theme === 'dark' ? '1.5px solid rgba(0, 180, 216, 0.4)' : '2px solid rgba(2, 128, 144, 0.28)',
          boxShadow: theme === 'dark'
            ? '0 0 40px rgba(0,0,0,0.8), inset 0 0 25px rgba(0, 180, 216, 0.15)'
            : '22px 22px 55px #e1ded7, -22px -22px 55px #ffffff, inset 0 0 16px rgba(0, 180, 216, 0.07), inset 4px 4px 10px rgba(10, 37, 64, 0.07)',
          background: theme === 'dark' ? 'rgba(12, 12, 22, 0.45)' : 'rgba(250, 248, 244, 0.4)'
        }} />

        {/* Ring 1 (Inner 53.4% diameter) */}
        <div style={{
          position: 'absolute',
          inset: '24%',
          borderRadius: '50%',
          border: theme === 'dark' ? '1.5px solid rgba(0, 229, 255, 0.45)' : '2px solid rgba(0, 180, 216, 0.32)',
          boxShadow: theme === 'dark'
            ? '0 0 35px rgba(0,0,0,0.9), inset 0 0 20px rgba(0, 229, 255, 0.18)'
            : '16px 16px 40px #dfdcd5, -16px -16px 40px #ffffff, inset 0 0 12px rgba(0, 180, 216, 0.09), inset 3px 3px 8px rgba(10, 37, 64, 0.08)',
          background: theme === 'dark' ? 'rgba(15, 15, 28, 0.5)' : 'rgba(250, 248, 244, 0.5)'
        }} />

        {/* Ring 0 (Core 30% diameter) */}
        <div style={{
          position: 'absolute',
          inset: '36%',
          borderRadius: '50%',
          border: theme === 'dark' ? '2px solid rgba(10, 37, 64, 0.6)' : '2.5px solid rgba(10, 37, 64, 0.38)',
          boxShadow: theme === 'dark'
            ? '0 0 30px rgba(0,0,0,0.95), inset 0 0 15px rgba(0, 229, 255, 0.22)'
            : '12px 12px 30px #dbd8d1, -12px -12px 30px #ffffff, inset 0 0 10px rgba(0, 180, 216, 0.1), inset 2px 2px 6px rgba(10, 37, 64, 0.09)',
          background: theme === 'dark' ? 'rgba(18, 18, 35, 0.6)' : 'rgba(250, 248, 244, 0.6)'
        }} />

        {/* LIVE ORBITING 3D LOGO-COLORED SPHERES MATCHING IMAGE 1 & FILLING GAP BETWEEN 2 LINES (NO SHADOWS) */}
        {balls.map((b, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              inset: b.trackInset,
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: `${b.reverse ? 'orbitCCW' : 'orbitCW'} ${b.duration}s linear infinite`,
              transformOrigin: 'center center'
            }}
          >
            {/* The 3D Sphere (Image 1 style) spanning full width between 2 lines */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${b.startAngle}deg)`,
                width: typeof b.size === 'number' ? `${b.size}px` : b.size,
                height: typeof b.size === 'number' ? `${b.size}px` : b.size,
                borderRadius: '50%',
                background: ballStyles[b.color].background,
                boxShadow: 'none',
                zIndex: 3
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}





