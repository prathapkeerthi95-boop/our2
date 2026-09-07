import React, { useEffect, useRef } from 'react';

export default function LiveConstellationCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking
    const mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes configuration
    const particleCount = Math.min(100, Math.floor((width * height) / 10000));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2.2 + 1.2,
        baseAlpha: Math.random() * 0.45 + 0.35,
        hasRing: Math.random() > 0.68,
        ringSize: Math.random() * 8 + 6,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }

    const maxDistance = 145;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft ambient light flare on right side (matching Image 1)
      const glowGrad = ctx.createRadialGradient(
        width * 0.88,
        height * 0.45,
        20,
        width * 0.88,
        height * 0.45,
        width * 0.45
      );
      glowGrad.addColorStop(0, 'rgba(215, 230, 255, 0.14)');
      glowGrad.addColorStop(0.5, 'rgba(180, 205, 255, 0.05)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction (gentle attraction / magnetic drift)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p.x -= (dxMouse / distMouse) * force * 1.2;
          p.y -= (dyMouse / distMouse) * force * 1.2;
        }

        // Pulse angle for rings
        p.pulseAngle += p.pulseSpeed;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 242, 255, ${p.baseAlpha})`;
        ctx.shadowColor = 'rgba(200, 225, 255, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for lines

        // Draw ring if node has outer circle (from Image 1 style)
        if (p.hasRing) {
          const currentRing = p.ringSize + Math.sin(p.pulseAngle) * 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRing, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(210, 225, 255, ${0.25 + Math.sin(p.pulseAngle) * 0.15})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Draw constellation connection lines & triangles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.38;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(215, 230, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Find 3rd point to form translucent mesh triangle (Image 1 style)
            for (let k = j + 1; k < particles.length; k++) {
              const p3 = particles[k];
              const dx2 = p3.x - p1.x;
              const dy2 = p3.y - p1.y;
              const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

              const dx3 = p3.x - p2.x;
              const dy3 = p3.y - p2.y;
              const dist3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

              if (dist2 < maxDistance && dist3 < maxDistance) {
                const triAlpha = (1 - (dist + dist2 + dist3) / (maxDistance * 3)) * 0.06;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.closePath();
                ctx.fillStyle = `rgba(200, 225, 255, ${triAlpha})`;
                ctx.fill();
              }
            }
          }
        }

        // Line to cursor if close
        if (mouse.x > 0) {
          const dxM = mouse.x - particles[i].x;
          const dyM = mouse.y - particles[i].y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < mouse.radius) {
            const alphaM = (1 - distM / mouse.radius) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 240, 255, ${alphaM})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
