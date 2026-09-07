import React, { useEffect, useRef } from 'react';

export default function LiveSmokyCanvas() {
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

    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // 12 Multi-layered Volumetric Moving Smoke Clouds across the full page background
    const smokeCloudCount = 12;
    const smokeClouds = Array.from({ length: smokeCloudCount }, (_, i) => {
      const baseRadius = Math.random() * 240 + 160;
      const lobeCount = 5;
      const lobes = Array.from({ length: lobeCount }, () => ({
        offsetX: (Math.random() - 0.5) * (baseRadius * 0.65),
        offsetY: (Math.random() - 0.5) * (baseRadius * 0.65),
        scale: Math.random() * 0.45 + 0.65,
        opacityFactor: Math.random() * 0.3 + 0.5
      }));

      return {
        x: (i / smokeCloudCount) * width + (Math.random() - 0.5) * 150,
        y: Math.random() * height,
        baseRadius,
        lobes,
        speedX: Math.random() * 0.85 + 0.35, // Smooth continuous rightward travel
        speedY: (Math.random() - 0.5) * 0.35 - 0.05,
        swaySpeed: Math.random() * 0.0015 + 0.0008,
        swayAmp: Math.random() * 50 + 20,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.06 + 0.10, // Rich, visible, translucent smoke atmosphere
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.003
      };
    });

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    let startTime = performance.now();

    const render = (now) => {
      if (!isVisible) { animationFrameId = requestAnimationFrame(render); return; }
      ctx.clearRect(0, 0, width, height);

      const time = (now - startTime);

      smokeClouds.forEach((cloud) => {
        // Continuous traveling motion across full background width and height
        cloud.x += cloud.speedX;
        cloud.y += cloud.speedY;
        cloud.rotation += cloud.rotSpeed;

        const currentX = cloud.x + Math.sin(time * cloud.swaySpeed + cloud.phase) * cloud.swayAmp;
        const currentY = cloud.y + Math.cos(time * (cloud.swaySpeed * 0.85) + cloud.phase) * (cloud.swayAmp * 0.5);

        const maxBound = cloud.baseRadius * 1.8;
        if (cloud.y < -maxBound) cloud.y = height + maxBound;
        if (cloud.y > height + maxBound) cloud.y = -maxBound;
        if (cloud.x > width + maxBound) cloud.x = -maxBound;
        if (cloud.x < -maxBound) cloud.x = width + maxBound;

        let pushX = 0;
        let pushY = 0;
        if (mouse.active) {
          const dx = currentX - mouse.x;
          const dy = currentY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const factor = (1 - dist / 220);
            pushX = (dx / dist) * factor * 22;
            pushY = (dy / dist) * factor * 22;
          }
        }

        const renderX = currentX + pushX;
        const renderY = currentY + pushY;
        const currentRadius = cloud.baseRadius * (1 + Math.sin(time * 0.0009 + cloud.phase) * 0.12);
        const finalAlpha = Math.min(0.22, cloud.opacity + Math.sin(time * 0.0012 + cloud.phase) * 0.025);

        ctx.save();
        ctx.translate(renderX, renderY);
        ctx.rotate(cloud.rotation);

        cloud.lobes.forEach((lobe) => {
          const lobeRadius = currentRadius * lobe.scale;
          const lobeAlpha = finalAlpha * lobe.opacityFactor;

          const grad = ctx.createRadialGradient(
            lobe.offsetX, lobe.offsetY, 0,
            lobe.offsetX, lobe.offsetY, lobeRadius
          );

          grad.addColorStop(0, `rgba(245, 248, 255, ${lobeAlpha * 0.95})`);
          grad.addColorStop(0.35, `rgba(215, 228, 245, ${lobeAlpha * 0.55})`);
          grad.addColorStop(0.70, `rgba(175, 190, 215, ${lobeAlpha * 0.18})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(lobe.offsetX, lobe.offsetY, lobeRadius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
}
