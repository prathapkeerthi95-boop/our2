import React, { useEffect, useRef } from 'react';

/**
 * LiquidCursor — High-Performance Cursor System with Idle-Sleep Engine
 * 
 * Shuts down all rendering and requestAnimationFrame when the cursor is static.
 * Automatically wakes up on mousemove, mousedown, mouseup, or scroll.
 */
const LiquidCursor = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // ── Physics States ──
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let bx = mx;
    let by = my;
    let vx = 0;
    let vy = 0;

    const K = 0.11;  // Stiffness
    const D = 0.78;  // Damping
    const R_BASE = 24; // 24px radius

    let isClicked = false;
    let clickScaleX = 1.0;
    let clickScaleY = 1.0;
    let clickScaleXVel = 0;
    let clickScaleYVel = 0;

    let isRunning = false;

    // ── Resize Canvas ──
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      wakeUp();
    };

    // ── Static drawing for sleep mode ──
    const drawCursorStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw static droplet
      ctx.save();
      ctx.translate(mx, my);

      // Layer 1: Outer Rim
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, R_BASE, 0, Math.PI * 2);
      ctx.stroke();

      // Layer 2: Body Fill
      const bodyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, R_BASE);
      bodyGrad.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
      bodyGrad.addColorStop(0.6, 'rgba(235, 230, 255, 0.08)');
      bodyGrad.addColorStop(1, 'rgba(215, 210, 245, 0.16)');
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Layer 3: Specular Highlight (fixed orientation)
      const hx = -R_BASE * 0.32;
      const hy = -R_BASE * 0.32;
      const highlightGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, R_BASE * 0.45);
      highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      highlightGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
      highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = highlightGrad;
      ctx.beginPath();
      ctx.ellipse(hx, hy, R_BASE * 0.45, R_BASE * 0.3, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Layer 4: Target Center Dot
      ctx.beginPath();
      ctx.arc(mx, my, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(80, 60, 160, 0.55)';
      ctx.fill();
    };

    // ── Main Animation Loop ──
    const render = () => {
      if (!isRunning) return;

      // 1. Spring physics
      const ax = (mx - bx) * K;
      const ay = (my - by) * K;
      vx = (vx + ax) * D;
      vy = (vy + ay) * D;
      bx += vx;
      by += vy;

      const speed = Math.hypot(vx, vy);
      const angle = Math.atan2(vy, vx);
      const cappedSpeed = Math.min(speed, 22);

      // Click scale springs
      const targetClickX = isClicked ? 1.15 : 1.0;
      const targetClickY = isClicked ? 0.85 : 1.0;
      
      const forceCX = (targetClickX - clickScaleX) * 0.15;
      clickScaleXVel = (clickScaleXVel + forceCX) * 0.72;
      clickScaleX += clickScaleXVel;

      const forceCY = (targetClickY - clickScaleY) * 0.15;
      clickScaleYVel = (clickScaleYVel + forceCY) * 0.72;
      clickScaleY += clickScaleYVel;

      // 2. Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 3. Draw Water Droplet
      ctx.save();
      ctx.translate(bx, by);

      if (speed > 0.2) {
        ctx.rotate(angle);
        ctx.scale((1 + cappedSpeed * 0.02) * clickScaleX, (1 - cappedSpeed * 0.01) * clickScaleY);
      } else {
        ctx.scale(clickScaleX, clickScaleY);
      }

      // Layer 1: Outer Rim
      ctx.shadowColor = 'rgba(160, 140, 220, 0.2)';
      ctx.shadowBlur = 4;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, R_BASE, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Layer 2: Body Fill
      const bodyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, R_BASE);
      bodyGrad.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
      bodyGrad.addColorStop(0.6, 'rgba(235, 230, 255, 0.08)');
      bodyGrad.addColorStop(1, 'rgba(215, 210, 245, 0.16)');
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Layer 3: Inner Depth
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, R_BASE, 0, Math.PI * 2);
      ctx.clip();
      const depthGrad = ctx.createRadialGradient(0, 0, R_BASE * 0.72, 0, 0, R_BASE);
      depthGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      depthGrad.addColorStop(1, 'rgba(0, 0, 0, 0.06)');
      ctx.fillStyle = depthGrad;
      ctx.fillRect(-R_BASE, -R_BASE, R_BASE * 2, R_BASE * 2);
      ctx.restore();

      ctx.restore();

      // Layer 4: Specular Highlight (fixed orientation)
      ctx.save();
      ctx.translate(bx, by);
      ctx.beginPath();
      ctx.arc(0, 0, R_BASE, 0, Math.PI * 2);
      ctx.clip();

      const hx = -R_BASE * 0.32;
      const hy = -R_BASE * 0.32;

      const highlightGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, R_BASE * 0.45);
      highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      highlightGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
      highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = highlightGrad;

      ctx.beginPath();
      ctx.ellipse(hx, hy, R_BASE * 0.45, R_BASE * 0.3, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Layer 5: Target Center Dot
      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(80, 60, 160, 0.55)';
      ctx.fill();
      ctx.restore();

      // Check if stationary to enter sleep mode
      const distToTarget = Math.hypot(mx - bx, my - by);
      const scaleError = Math.abs(1.0 - clickScaleX) + Math.abs(1.0 - clickScaleY);

      if (speed < 0.01 && distToTarget < 0.01 && scaleError < 0.01 && !isClicked) {
        bx = mx;
        by = my;
        clickScaleX = 1.0;
        clickScaleY = 1.0;
        drawCursorStatic();
        isRunning = false;
        return;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const wakeUp = () => {
      if (!isRunning) {
        isRunning = true;
        render();
      }
    };

    // ── Event Listeners ──
    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      wakeUp();
    };
    const onMouseDown = () => {
      isClicked = true;
      wakeUp();
    };
    const onMouseUp = () => {
      isClicked = false;
      wakeUp();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // ── Navbar scroll handler ──
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 10) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      wakeUp();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial setup and startup
    resizeCanvas();
    handleScroll();
    wakeUp();

    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        html, body, * {
          cursor: none !important;
        }
        
        /* CSS-only glass card hover */
        .glass-card,
        .glass-card-dark {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          will-change: transform;
        }
        .glass-card:hover,
        .glass-card-dark:hover {
          transform: perspective(700px) rotateX(-2deg) rotateY(2deg) translateZ(8px) !important;
          box-shadow: 0 20px 60px rgba(0, 229, 255, 0.08), 0 0 40px rgba(112, 0, 255, 0.04);
        }
        
        /* CSS-only button hover */
        .glass-btn,
        .btn-primary,
        .btn-premium,
        .btn-outline {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .glass-btn:hover,
        .btn-primary:hover,
        .btn-premium:hover,
        .btn-outline:hover {
          transform: scale(1.03) !important;
        }
        .glass-btn:active,
        .btn-primary:active,
        .btn-premium:active,
        .btn-outline:active {
          transform: scaleX(1.08) scaleY(0.92) !important;
        }
      `}} />

      <canvas
        ref={canvasRef}
        id="cursor-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 999999,
        }}
      />
    </>
  );
};

export default LiquidCursor;
