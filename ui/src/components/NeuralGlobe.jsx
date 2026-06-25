import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * NeuralGlobe — Interactive 3D Matrix Globe with Neuron Scribble
 *
 * Features:
 * – 3D sphere of nodes rendered on Canvas (orthographic projection)
 * – Matrix "digital rain" on the sphere surface (character scribbles)
 * – Neuron connections that draw/erase between nearby nodes
 * – Swipe/drag rotates the globe
 * – Mouse hover repels nearby nodes (liquid distortion)
 * – Scroll-driven animation via GSAP ScrollTrigger
 */
const NeuralGlobe = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Sizing ─────────────────────────────────────────
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Config ─────────────────────────────────────────
    const GLOBE_R   = Math.min(canvas.width, canvas.height) * 0.38;
    const NODE_COUNT = 160;
    const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01'.split('');

    // ── Generate sphere points (Fibonacci sphere) ─────
    const nodes = [];
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      nodes.push({
        // Spherical coords (unit sphere)
        ox: Math.cos(theta) * r,
        oy: y,
        oz: Math.sin(theta) * r,
        // Projected (runtime)
        x: 0, y: 0, z: 0,
        // Matrix character assigned to this node
        char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
        charAlpha: 0,
        charTimer: Math.random() * 200,
        charTTL: 30 + Math.random() * 80,
        // Size & brightness
        size: 1.5 + Math.random() * 2,
        bright: 0.3 + Math.random() * 0.7,
        // Scribble phase offset
        scribblePhase: Math.random() * Math.PI * 2,
      });
    }

    // ── Globe rotation state ───────────────────────────
    let rotX = 0.3;   // tilt
    let rotY = 0;
    let velX = 0;
    let velY = 0.003; // auto-spin

    // ── Mouse / touch interaction ──────────────────────
    let dragging = false;
    let lastMX = 0, lastMY = 0;
    let mouseGlobe = { x: 9999, y: 9999 }; // Mouse in canvas space

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseGlobe.x = e.clientX - rect.left;
      mouseGlobe.y = e.clientY - rect.top;

      if (dragging) {
        const dx = e.clientX - lastMX;
        const dy = e.clientY - lastMY;
        velY = dx * 0.005;
        velX = dy * 0.005;
        rotY += dx * 0.005;
        rotX += dy * 0.005;
        lastMX = e.clientX;
        lastMY = e.clientY;
      }
    };
    const onMouseDown = (e) => {
      dragging = true;
      lastMX = e.clientX; lastMY = e.clientY;
    };
    const onMouseUp = () => { dragging = false; };

    // Touch
    const onTouchStart = (e) => {
      dragging = true;
      lastMX = e.touches[0].clientX;
      lastMY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (!dragging) return;
      const dx = e.touches[0].clientX - lastMX;
      const dy = e.touches[0].clientY - lastMY;
      velY = dx * 0.005;
      velX = dy * 0.005;
      rotY += dx * 0.005;
      rotX += dy * 0.005;
      lastMX = e.touches[0].clientX;
      lastMY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { dragging = false; };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup',   onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: true });
    canvas.addEventListener('touchend',   onTouchEnd);

    // ── 3D Rotation matrices ───────────────────────────
    const rotatePoint = (ox, oy, oz) => {
      // Rotate around Y
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      let x = cosY * ox + sinY * oz;
      let z = -sinY * ox + cosY * oz;
      let y = oy;

      // Rotate around X
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const ny = cosX * y - sinX * z;
      const nz = sinX * y + cosX * z;

      return { x, y: ny, z: nz };
    };

    // ── Scribble helper — draws jittery line segment ───
    const scribble = (x1, y1, x2, y2, jitter, steps) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const lx = x1 + (x2 - x1) * t + (Math.random() - 0.5) * jitter;
        const ly = y1 + (y2 - y1) * t + (Math.random() - 0.5) * jitter;
        ctx.lineTo(lx, ly);
      }
      ctx.stroke();
    };

    // ── Global animation time ──────────────────────────
    let time = 0;
    // Scroll-driven reveal progress (0 → 1)
    let revealProgress = 0;

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      time += 0.016;

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;

      // Auto-spin (decelerate after drag)
      if (!dragging) {
        rotY += velY;
        velY *= 0.97;
        if (Math.abs(velY) < 0.0005) velY = 0.002; // Maintain gentle spin
        rotX += velX;
        velX *= 0.95;
        // Keep tilt gentle
        rotX = Math.max(-0.6, Math.min(0.6, rotX));
      }

      // Project all nodes
      const projected = nodes.map((n, i) => {
        const { x, y, z } = rotatePoint(n.ox, n.oy, n.oz);
        const scale = Math.min(canvas.width, canvas.height);
        return {
          ...n,
          i,
          px: cx + x * GLOBE_R,
          py: cy + y * GLOBE_R,
          z,
          visible: z > -0.2, // Back-face culling
        };
      });

      // Sort back to front
      projected.sort((a, b) => a.z - b.z);

      // ── Draw connections between nearby nodes ──
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        if (!a.visible) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          if (!b.visible) continue;

          const dx = a.px - b.px, dy = a.py - b.py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = 80 * revealProgress;

          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * 0.35 * revealProgress;
            const zFactor = ((a.z + b.z) / 2 + 1) / 2;

            // Scribble connection line (neuron effect)
            ctx.save();
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * zFactor})`;
            ctx.lineWidth = 0.5;
            scribble(a.px, a.py, b.px, b.py, dist * 0.04, 6);
            ctx.restore();
          }
        }
      }

      // ── Draw nodes + matrix characters ──
      projected.forEach((n) => {
        if (!n.visible && n.z < -0.4) return;

        const alpha = ((n.z + 1) / 2) * revealProgress;
        const size  = n.size * ((n.z + 1.5) / 2.5);

        // Mouse repel
        const mdx = n.px - mouseGlobe.x;
        const mdy = n.py - mouseGlobe.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        let rpx = n.px, rpy = n.py;
        if (mdist < 80) {
          const force = (1 - mdist / 80) * 12;
          rpx += (mdx / mdist) * force;
          rpy += (mdy / mdist) * force;
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(rpx, rpy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha * n.bright})`;
        ctx.fill();

        // Matrix character — flicker on and off
        n.charTimer++;
        if (n.charTimer > n.charTTL) {
          n.charTimer = 0;
          n.charTTL = 30 + Math.random() * 80;
          n.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          n.charAlpha = 0.8 + Math.random() * 0.2;
        }
        // Fade out
        n.charAlpha *= 0.98;

        if (n.charAlpha > 0.05 && n.z > 0) {
          ctx.save();
          ctx.font = `${Math.round(size * 6)}px 'Courier New', monospace`;
          ctx.fillStyle = `rgba(0, 229, 255, ${n.charAlpha * alpha})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          // Tiny jitter for scribble feel
          const jx = (Math.random() - 0.5) * 0.8;
          const jy = (Math.random() - 0.5) * 0.8;
          ctx.fillText(n.char, rpx + jx, rpy - size * 5 + jy);
          ctx.restore();
        }
      });

      // ── Ambient globe outline ──
      ctx.beginPath();
      ctx.arc(cx, cy, GLOBE_R * revealProgress, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * revealProgress})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // ── Central glow ──
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, GLOBE_R * 0.6);
      grd.addColorStop(0, `rgba(0, 229, 255, ${0.06 * revealProgress})`);
      grd.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, GLOBE_R * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    };

    draw();

    // ── ScrollTrigger reveal ───────────────────────────
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1.5,
      onUpdate: (self) => {
        revealProgress = self.progress;
      },
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup',   onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove',  onTouchMove);
      canvas.removeEventListener('touchend',   onTouchEnd);
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="neural-globe-section"
      id="antigravity"
    >
      <div className="container">
        {/* Header */}
        <div
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 2 }}
        >
          <span className="section-label" style={{ color: 'var(--accent-cyan)' }}>
            Antigravity Engine
          </span>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>
            Neural Network{' '}
            <span style={{ background: 'linear-gradient(90deg, #00E5FF, #7000FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Intelligence
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto' }}>
            Swipe the globe to explore our interconnected digital neural network. 
            Every node represents a data-driven growth vector.
          </p>
        </div>

        {/* Canvas Wrapper */}
        <div className="neural-globe-wrapper reveal">
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              cursor: 'grab',
            }}
          />

          {/* Glassmorphic overlay badge */}
          <div style={{
            position: 'absolute', bottom: '1.5rem', left: '1.5rem',
            background: 'rgba(0,229,255,0.06)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,229,255,0.2)',
            borderRadius: '12px',
            padding: '0.75rem 1.25rem',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.78rem',
            fontWeight: '500',
            letterSpacing: '0.05em',
            pointerEvents: 'none',
          }}>
            ⟳ Drag to rotate
          </div>

          <div style={{
            position: 'absolute', bottom: '1.5rem', right: '1.5rem',
            background: 'rgba(112,0,255,0.06)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(112,0,255,0.2)',
            borderRadius: '12px',
            padding: '0.75rem 1.25rem',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.78rem',
            fontWeight: '500',
            letterSpacing: '0.05em',
            pointerEvents: 'none',
          }}>
            {NODE_COUNT || 160} active nodes
          </div>
        </div>
      </div>
    </section>
  );
};

// Expose node count for the badge
const NODE_COUNT = 160;

export default NeuralGlobe;
