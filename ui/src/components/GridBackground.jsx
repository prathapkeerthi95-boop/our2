import React, { useEffect, useRef } from 'react';

const GridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let animationFrameId;
    let isVisible = true;
    
    let targetMouse = { x: -1000, y: -1000 };
    let currentMouse = { x: -1000, y: -1000 };

    // Particles array
    let particles = [];
    const particleCount = 50; // Number of floating particles
    const connectionDistance = 100; // How close they must be to connect

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          baseSize: Math.random() * 1.5 + 0.5
        });
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0 });
    observer.observe(canvas);

    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', () => { targetMouse.x = -1000; targetMouse.y = -1000; });

    const draw = () => {
      if (!isVisible) { animationFrameId = requestAnimationFrame(draw); return; }
      // Lerp mouse
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.1;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);
      
      const mouseRadius = 300; // Flashlight radius
      const connectionDistSq = connectionDistance * connectionDistance;
      
      // Update and draw particles
      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Distance from mouse
        const dx = currentMouse.x - p.x;
        const dy = currentMouse.y - p.y;
        const distSqToMouse = dx * dx + dy * dy;

        let opacity = 0.05; // Base invisible-ish
        let size = p.baseSize;
        let distToMouse = mouseRadius;

        // Flashlight effect
        if (distSqToMouse < mouseRadius * mouseRadius) {
          distToMouse = Math.sqrt(distSqToMouse);
          const intensity = 1 - (distToMouse / mouseRadius);
          opacity = 0.05 + (intensity * 0.5); // Glow up to 0.55
          size = p.baseSize + (intensity * 2);
        }

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = `rgba(11, 12, 16, ${opacity})`;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        if (currentMouse.x > -500) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx2 = p.x - p2.x;
            const dy2 = p.y - p2.y;
            const dist2Sq = dx2 * dx2 + dy2 * dy2;

            if (dist2Sq < connectionDistSq) {
              const dist2 = Math.sqrt(dist2Sq);
              // Line opacity depends on distance between particles AND distance to mouse
              const distToMouse2 = Math.sqrt(Math.pow(currentMouse.x - p2.x, 2) + Math.pow(currentMouse.y - p2.y, 2));
              const avgDistToMouse = (distToMouse + distToMouse2) / 2;
              
              let lineOpacity = 0.01; // Barely visible base
              if (avgDistToMouse < mouseRadius) {
                const lineIntensity = 1 - (avgDistToMouse / mouseRadius);
                const connectionIntensity = 1 - (dist2 / connectionDistance);
                lineOpacity = 0.01 + (lineIntensity * connectionIntensity * 0.25);
              }

              if (lineOpacity > 0.01) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(11, 12, 16, ${lineOpacity})`;
                ctx.lineWidth = 1;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 0, 
          pointerEvents: 'none'
        }} 
      />
      {/* CSS Noise Overlay for extra premium texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.4,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
      }} />
    </>
  );
};

export default GridBackground;
