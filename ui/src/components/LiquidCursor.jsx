import React, { useEffect, useRef } from 'react';

/**
 * LiquidCursor — Apple WWDC25 Production-Grade Liquid Glass System
 * Implements:
 * 1. 40px water-droplet canvas cursor with cap-22 velocity stretch, fixed top-left specular ellipse, and idle recovery.
 * 2. C1 continuous SVG convex lens displacement map generator.
 * 3. Zero-reflow DOM coordinates bounds cacher for text and glass elements.
 * 4. Automatic 4-layer glass surface injector for .glass-card, .glass-btn, and .navbar.
 * 5. JS spring-physics solvers for tilt, sheen tracking, squish, and capsule sliders.
 */
const LiquidCursor = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // ── Generate mathematically perfect convex normal-map lens texture ──
    const LENS_R = 80; // 80px radius (160px diameter) for text magnification
    const mapSize = LENS_R * 2;
    const mapCanvas = document.createElement('canvas');
    mapCanvas.width = mapSize;
    mapCanvas.height = mapSize;
    const mapCtx = mapCanvas.getContext('2d');
    const imgData = mapCtx.createImageData(mapSize, mapSize);
    const data = imgData.data;

    for (let y = 0; y < mapSize; y++) {
      for (let x = 0; x < mapSize; x++) {
        const dx = (x - LENS_R) / LENS_R;
        const dy = (y - LENS_R) / LENS_R;
        const dist = Math.hypot(dx, dy);

        let r = 128;
        let g = 128;
        let b = 128;
        let a = 255;

        if (dist < 1) {
          // Convex lens profile: C1 continuous at the edge (reaches 0 slope at edge)
          const factor = (1 - dist * dist) * (1 - dist * dist);
          const displacementX = -dx * factor * 0.45; // cap distortion scale inside map
          const displacementY = -dy * factor * 0.45;

          r = Math.round(128 + 127 * displacementX);
          g = Math.round(128 + 127 * displacementY);
        }

        const idx = (y * mapSize + x) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = a;
      }
    }
    mapCtx.putImageData(imgData, 0, 0);
    const lensMapDataUrl = mapCanvas.toDataURL();

    // ── SVG Filter Setup ──
    const svgDefs = document.getElementById('glass-defs');
    const textFeImage = document.getElementById('textFeImage');
    if (textFeImage) {
      textFeImage.setAttribute('href', lensMapDataUrl);
    }

    // ── Physics States ──
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let bx = mx;
    let by = my;
    let vx = 0;
    let vy = 0;

    const K = 0.11; // Stiffness
    const D = 0.78; // Damping
    const R_BASE = 40; // Exact 40px radius

    let isClicked = false;
    let clickScaleX = 1.0;
    let clickScaleY = 1.0;
    let clickScaleXVel = 0;
    let clickScaleYVel = 0;

    let lensStrength = 0;
    let lensTarget = 0;

    // ── Resize Canvas ──
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cacheTextBounds();
      cacheGlassBounds();
    };

    // ── Mouse Listeners ──
    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onMouseDown = () => { isClicked = true; };
    const onMouseUp = () => { isClicked = false; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', resizeCanvas);

    // ── Dynamic Glass Injection ──
    let glassIndex = 0;
    let trackedGlassElements = [];

    const injectGlassLayers = (el, index) => {
      if (el.dataset.glassInjected) return;
      el.dataset.glassInjected = 'true';

      const filterId = `glass-filter-${index}-${Math.random().toString(36).substr(2, 9)}`;
      el.dataset.filterId = filterId;

      // 1. Create a unique SVG filter
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', filterId);
      filter.setAttribute('x', '0');
      filter.setAttribute('y', '0');
      filter.setAttribute('width', '100%');
      filter.setAttribute('height', '100%');
      filter.setAttribute('filterUnits', 'objectBoundingBox');

      const feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
      feImage.setAttribute('href', lensMapDataUrl);
      feImage.setAttribute('x', '0');
      feImage.setAttribute('y', '0');
      feImage.setAttribute('width', '100%');
      feImage.setAttribute('height', '100%');
      feImage.setAttribute('result', 'map');

      const feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
      feDisplacementMap.setAttribute('in', 'SourceGraphic');
      feDisplacementMap.setAttribute('in2', 'map');
      feDisplacementMap.setAttribute('scale', '0');
      feDisplacementMap.setAttribute('xChannelSelector', 'R');
      feDisplacementMap.setAttribute('yChannelSelector', 'G');
      feDisplacementMap.setAttribute('id', `disp-map-${filterId}`);

      filter.appendChild(feImage);
      filter.appendChild(feDisplacementMap);
      if (svgDefs) {
        svgDefs.appendChild(filter);
      }

      // 2. Prepend visual layers
      const blurLayer = document.createElement('div');
      blurLayer.className = 'glass-blur-layer';
      el.prepend(blurLayer);

      const lensLayer = document.createElement('div');
      lensLayer.className = 'lens-layer';
      lensLayer.style.backdropFilter = `url(#${filterId})`;
      lensLayer.style.webkitBackdropFilter = `url(#${filterId})`;
      el.prepend(lensLayer);

      const sheenLayer = document.createElement('div');
      sheenLayer.className = 'sheen-layer';
      el.prepend(sheenLayer);
    };

    const updateGlassElements = () => {
      const elements = document.querySelectorAll('.glass-card, .glass-card-dark, .glass-btn, .btn-primary, .btn-premium, .btn-outline');
      let changed = false;
      elements.forEach(el => {
        if (!el.dataset.glassInjected) {
          injectGlassLayers(el, glassIndex++);
          
          let baseScale = 12;
          if (el.classList.contains('glass-btn') || el.classList.contains('btn-primary') || el.classList.contains('btn-premium') || el.classList.contains('btn-outline')) {
            baseScale = 8;
          }

          trackedGlassElements.push({
            el,
            filterId: el.dataset.filterId,
            dispMap: document.getElementById(`disp-map-${el.dataset.filterId}`),
            sheen: el.querySelector('.sheen-layer'),
            
            // Physics States
            baseScale,
            targetScale: baseScale,
            currentScale: 0,
            scaleVel: 0,
            
            rotX: 0, rotXVel: 0, targetRotX: 0,
            rotY: 0, rotYVel: 0, targetRotY: 0,
            transZ: 0, transZVel: 0, targetTransZ: 0,
            
            sheenOpacity: 0, sheenOpacityVel: 0, targetSheenOpacity: 0,
            
            scaleX: 1, scaleXVel: 0, targetScaleX: 1,
            scaleY: 1, scaleYVel: 0, targetScaleY: 1,
          });
          changed = true;
        }
      });

      const initialCount = trackedGlassElements.length;
      trackedGlassElements = trackedGlassElements.filter(item => document.body.contains(item.el));
      if (trackedGlassElements.length !== initialCount || changed) {
        cacheGlassBounds();
      }
    };

    // ── Zero-Reflow Coordinate Caching ──
    let cachedTextBounds = [];
    let cachedGlassBounds = [];

    const cacheTextBounds = () => {
      const textElements = document.querySelectorAll('h1, h2, h3, h4, p, .nav-item, .stat-num, .badge, .label, .hero-char');
      cachedTextBounds = Array.from(textElements).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          cx: rect.left + rect.width / 2 + window.scrollX,
          cy: rect.top + rect.height / 2 + window.scrollY,
          width: rect.width,
          height: rect.height
        };
      });
    };

    const cacheGlassBounds = () => {
      cachedGlassBounds = trackedGlassElements.map(item => {
        const rect = item.el.getBoundingClientRect();
        return {
          item,
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height
        };
      });
    };

    // Cache bounds on load/scroll
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        const scrollY = window.scrollY;
        if (scrollY > 10) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Mutation Observer for dynamic elements ──
    const observer = new MutationObserver(() => {
      updateGlassElements();
      cacheTextBounds();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial setups
    updateGlassElements();
    setTimeout(() => {
      resizeCanvas();
      handleScroll();
    }, 200);

    // ── Main Animation Loop ──
    const render = () => {
      // 1. Spring physics update for cursor coordinates
      const ax = (mx - bx) * K;
      const ay = (my - by) * K;
      vx = (vx + ax) * D;
      vy = (vy + ay) * D;
      bx += vx;
      by += vy;

      const speed = Math.hypot(vx, vy);
      const angle = Math.atan2(vy, vx);

      // Speed cap at 22
      const cappedSpeed = Math.min(speed, 22);

      // Smooth click scale squish springs
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

      // Idle recovery: perfect circle at speed < 0.2
      if (speed > 0.2) {
        ctx.rotate(angle);
        // Stretch along velocity vector
        ctx.scale((1 + cappedSpeed * 0.02) * clickScaleX, (1 - cappedSpeed * 0.01) * clickScaleY);
      } else {
        ctx.scale(clickScaleX, clickScaleY);
      }

      // Layer 1: Outer Rim Bevel Bead
      ctx.shadowColor = 'rgba(160, 140, 220, 0.2)';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, R_BASE, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // Layer 2: Subtle Body Fill Concentrating Light
      const bodyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, R_BASE);
      bodyGrad.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
      bodyGrad.addColorStop(0.6, 'rgba(235, 230, 255, 0.08)');
      bodyGrad.addColorStop(1, 'rgba(215, 210, 245, 0.16)');
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Layer 4: Inner Rim Depth Bevel
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

      ctx.restore(); // Restore to viewport space for fixed specular highlight orientation

      // Layer 3: Specular Highlight Ellipse (Top-left 30% position, fixed orientation)
      ctx.save();
      ctx.translate(bx, by);
      ctx.beginPath();
      ctx.arc(0, 0, R_BASE, 0, Math.PI * 2);
      ctx.clip(); // clip within droplet edge

      // Ellipse coords (Top-left fixed)
      const hx = -R_BASE * 0.32;
      const hy = -R_BASE * 0.32;
      const hRadiusX = R_BASE * 0.45;
      const hRadiusY = R_BASE * 0.3;

      const highlightGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, R_BASE * 0.45);
      highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      highlightGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
      highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = highlightGrad;

      ctx.beginPath();
      ctx.ellipse(hx, hy, hRadiusX, hRadiusY, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Layer 5: Target Center Dot
      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(80, 60, 160, 0.55)';
      ctx.fill();
      ctx.restore();

      // 4. Update SVG Filter Text Magnification
      let closestDist = Infinity;
      let closestElement = null;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      for (let i = 0; i < cachedTextBounds.length; i++) {
        const item = cachedTextBounds[i];
        const scx = item.cx - scrollX;
        const scy = item.cy - scrollY;

        const dist = Math.hypot(mx - scx, my - scy);
        if (dist < closestDist) {
          closestDist = dist;
          closestElement = item.el;
        }
      }

      if (closestDist < 80) {
        // Smoothly fade target displacement based on proximity
        lensTarget = (1 - closestDist / 80) * 32;
      } else {
        lensTarget = 0;
      }

      // Spring filter scale interpolation
      const lensForce = (lensTarget - lensStrength) * 0.12;
      lensStrength += lensForce;

      const textFeDisp = document.getElementById('textFeDisp');
      const textFeImage = document.getElementById('textFeImage');

      if (textFeDisp && textFeImage) {
        if (Math.abs(lensStrength) > 0.05) {
          textFeDisp.setAttribute('scale', lensStrength.toFixed(2));
          textFeImage.setAttribute('x', (bx - LENS_R).toFixed(1));
          textFeImage.setAttribute('y', (by - LENS_R).toFixed(1));

          if (closestElement) {
            closestElement.style.filter = 'url(#dropLens)';
          }
        } else {
          textFeDisp.setAttribute('scale', '0');
        }
      }

      // Reset filters for other text layers
      for (let i = 0; i < cachedTextBounds.length; i++) {
        const item = cachedTextBounds[i];
        if (item.el !== closestElement || Math.abs(lensStrength) <= 0.05) {
          item.el.style.filter = '';
        }
      }

      // 5. Update Specular Sheen, 3D Tilt, & Dynamic Lensing for Glass Elements
      cachedGlassBounds.forEach(bound => {
        const { item, left, top, width, height } = bound;
        const screenLeft = left - scrollX;
        const screenTop = top - scrollY;

        const isHovering = mx >= screenLeft && mx <= screenLeft + width &&
                           my >= screenTop && my <= screenTop + height;

        if (isHovering) {
          item.targetScale = item.baseScale * 1.3;
          item.targetSheenOpacity = 1.0;

          // Specular highlight tracks cursor location
          const lx = ((mx - screenLeft) / width) * 100;
          const ly = ((my - screenTop) / height) * 100;
          if (item.sheen) {
            item.sheen.style.background = `radial-gradient(circle at ${lx}% ${ly}%, rgba(255,255,255,0.85) 0%, transparent 60%)`;
          }

          // Tilt on hover for cards
          if (item.el.classList.contains('glass-card') || item.el.classList.contains('glass-card-dark')) {
            const rx = (mx - screenLeft) / width - 0.5;
            const ry = (my - screenTop) / height - 0.5;
            item.targetRotX = -ry * 12;
            item.targetRotY = rx * 12;
            item.targetTransZ = 8;
          }

          // Squash/stretch buttons
          if (item.el.classList.contains('glass-btn') || item.el.classList.contains('btn-primary') || item.el.classList.contains('btn-premium') || item.el.classList.contains('btn-outline')) {
            item.targetScaleX = 1.03;
            item.targetScaleY = 1.03;
          }
        } else {
          item.targetScale = item.baseScale;
          item.targetSheenOpacity = 0.0;
          item.targetRotX = 0;
          item.targetRotY = 0;
          item.targetTransZ = 0;
          item.targetScaleX = 1.0;
          item.targetScaleY = 1.0;
        }

        // Apply click squash/stretch on active hover elements
        if (isHovering && isClicked) {
          if (item.el.classList.contains('glass-btn') || item.el.classList.contains('btn-primary') || item.el.classList.contains('btn-premium') || item.el.classList.contains('btn-outline')) {
            item.targetScaleX = 1.08;
            item.targetScaleY = 0.90; // squished vertical
          }
        }

        // Spring solvers for glass elements
        // Scale spring
        const scaleForce = (item.targetScale - item.currentScale) * 0.12;
        item.scaleVel = (item.scaleVel + scaleForce) * 0.78;
        item.currentScale += item.scaleVel;
        if (item.dispMap) {
          item.dispMap.setAttribute('scale', item.currentScale.toFixed(2));
        }

        // Sheen opacity spring
        const sheenForce = (item.targetSheenOpacity - item.sheenOpacity) * 0.12;
        item.sheenOpacityVel = (item.sheenOpacityVel + sheenForce) * 0.78;
        item.sheenOpacity += item.sheenOpacityVel;
        if (item.sheen) {
          item.sheen.style.opacity = item.sheenOpacity.toFixed(3);
        }

        // Rotations & transZ springs
        const rotXForce = (item.targetRotX - item.rotX) * 0.08;
        item.rotXVel = (item.rotXVel + rotXForce) * 0.72;
        item.rotX += item.rotXVel;

        const rotYForce = (item.targetRotY - item.rotY) * 0.08;
        item.rotYVel = (item.rotYVel + rotYForce) * 0.72;
        item.rotY += item.rotYVel;

        const transZForce = (item.targetTransZ - item.transZ) * 0.08;
        item.transZVel = (item.transZVel + transZForce) * 0.72;
        item.transZ += item.transZVel;

        // Button scale springs
        const scaleXForce = (item.targetScaleX - item.scaleX) * 0.12;
        item.scaleXVel = (item.scaleXVel + scaleXForce) * 0.75;
        item.scaleX += item.scaleXVel;

        const scaleYForce = (item.targetScaleY - item.scaleY) * 0.12;
        item.scaleYVel = (item.scaleYVel + scaleYForce) * 0.75;
        item.scaleY += item.scaleYVel;

        // Render card tilt / button squash scale
        if (item.el.classList.contains('glass-card') || item.el.classList.contains('glass-card-dark')) {
          item.el.style.transform = `perspective(700px) rotateX(${item.rotX.toFixed(2)}deg) rotateY(${item.rotY.toFixed(2)}deg) translateZ(${item.transZ.toFixed(2)}px)`;
        } else if (item.el.classList.contains('glass-btn') || item.el.classList.contains('btn-primary') || item.el.classList.contains('btn-premium') || item.el.classList.contains('btn-outline')) {
          item.el.style.transform = `scaleX(${item.scaleX.toFixed(3)}) scaleY(${item.scaleY.toFixed(3)})`;
        }
      });

      rafRef.current = requestAnimationFrame(render);
    };

    // Run layout loops
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor globally and style internal elements dynamically */}
      <style dangerouslySetInnerHTML={{__html: `
        html, body, * {
          cursor: none !important;
        }
        .glass-card > *:not(.glass-blur-layer):not(.lens-layer):not(.sheen-layer),
        .glass-card-dark > *:not(.glass-blur-layer):not(.lens-layer):not(.sheen-layer),
        .glass-btn > *:not(.glass-blur-layer):not(.lens-layer):not(.sheen-layer),
        .btn-primary > *:not(.glass-blur-layer):not(.lens-layer):not(.sheen-layer),
        .btn-premium > *:not(.glass-blur-layer):not(.lens-layer):not(.sheen-layer),
        .btn-outline > *:not(.glass-blur-layer):not(.lens-layer):not(.sheen-layer),
        .navbar > *:not(.glass-blur-layer):not(.lens-layer):not(.sheen-layer) {
          position: relative;
          z-index: 10;
        }
        .glass-blur-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -2;
          border-radius: inherit;
        }
        .lens-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          border-radius: inherit;
        }
        .sheen-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          z-index: 0;
        }
      `}} />

      {/* SVG filter structures for localized convex text lensing */}
      <svg style={{ position: 'absolute', top: -999, left: -999, width: 0, height: 0, pointerEvents: 'none' }}>
        <defs id="glass-defs">
          <filter id="dropLens" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
            <feImage id="textFeImage" x="0" y="0" width="100%" height="100%" result="map" />
            <feDisplacementMap id="textFeDisp" in="SourceGraphic" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Fixed Fullscreen Fixed canvas for water-droplet cursor */}
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
