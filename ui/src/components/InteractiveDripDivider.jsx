import React, { useRef, useEffect } from 'react';

/**
 * InteractiveDripDivider — Apple Meta-material Liquid Paint Transition
 * Renders a gooey SVG paint dripping boundary that stretches towards the cursor
 * and organically detaches droplets falling downwards.
 */
const InteractiveDripDivider = ({ color = '#050505', isTop = false }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const dropletsGroupRef = useRef(null);
  const dripsGroupRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Proximity parameters
    const dripCount = Math.max(12, Math.floor(window.innerWidth / 75)); // Responsive drip count
    const angleStep = window.innerWidth / dripCount;
    
    // Initialize drip nodes
    const drips = Array.from({ length: dripCount }).map((_, idx) => ({
      x: idx * angleStep + angleStep / 2 + (Math.random() - 0.5) * 15, // slight random horizontal jitter
      height: 15,
      vel: 0,
      cooldown: 0,
      width: 14 + Math.random() * 8 // random organic drip widths
    }));

    // Initialize DOM drip elements
    const dripsGroup = dripsGroupRef.current;
    if (dripsGroup) {
      dripsGroup.innerHTML = '';
      drips.forEach((drip, idx) => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', (drip.x - drip.width / 2).toFixed(1));
        rect.setAttribute('y', isTop ? '-10' : '0'); // anchor beyond edge
        rect.setAttribute('width', drip.width.toFixed(1));
        rect.setAttribute('height', drip.height.toFixed(1));
        rect.setAttribute('rx', (drip.width / 2).toFixed(1));
        rect.setAttribute('ry', (drip.width / 2).toFixed(1));
        rect.setAttribute('fill', color);
        dripsGroup.appendChild(rect);
        drip.el = rect;
      });
    }

    // Active droplet particles list
    let droplets = [];

    const spawnDroplet = (x, y, radius) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x.toFixed(1));
      circle.setAttribute('cy', y.toFixed(1));
      circle.setAttribute('r', radius.toFixed(1));
      circle.setAttribute('fill', color);
      
      const group = dropletsGroupRef.current;
      if (group) {
        group.appendChild(circle);
      }

      droplets.push({
        el: circle,
        x,
        y,
        yVel: 1.5,
        opacity: 1.0,
        r: radius
      });
    };

    // Track mouse move coordinates relative to the divider
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = isTop ? (rect.bottom - e.clientY) : (e.clientY - rect.top);
      
      mouseRef.current = { x: mouseX, y: mouseY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Physics update loop
    let rafId;
    const updatePhysics = () => {
      const mouse = mouseRef.current;
      const rect = container.getBoundingClientRect();
      
      // Stop tracking mouse if scrolled completely out of view
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        mouse.active = false;
      }

      // Update drips heights
      drips.forEach((drip) => {
        let targetHeight = 15; // idle height

        if (mouse.active) {
          const dx = mouse.x - drip.x;
          const distanceX = Math.abs(dx);
          const distanceY = mouse.y - 10; // Y distance from anchor edge

          // Check horizontal proximity and if mouse is hanging below the divider
          if (distanceX < 140 && distanceY > 0 && distanceY < 180) {
            const influenceX = 1 - (distanceX / 140);
            const influenceY = 1 - (Math.abs(distanceY - 70) / 110);
            const clampedInfluenceY = Math.max(0, influenceY);
            
            // Stretch calculation
            const stretch = distanceY * influenceX * 0.92 * clampedInfluenceY;
            targetHeight = Math.max(15, Math.min(105, 15 + stretch));

            // Droplet detachment condition (stretch threshold + random chance + cooloff)
            if (targetHeight > 80 && Math.random() < 0.02 && drip.cooldown <= 0) {
              spawnDroplet(drip.x, isTop ? (rect.height - targetHeight) : targetHeight, drip.width * 0.45);
              drip.cooldown = 45; // prevent immediate spawn spam
            }
          }
        }

        if (drip.cooldown > 0) drip.cooldown--;

        // Spring animation physics solver
        const force = (targetHeight - drip.height) * 0.08;
        drip.vel = (drip.vel + force) * 0.72;
        drip.height += drip.vel;

        // Apply visual updates directly to SVG elements
        if (drip.el) {
          if (isTop) {
            drip.el.setAttribute('y', (rect.height - drip.height).toFixed(1));
          }
          drip.el.setAttribute('height', drip.height.toFixed(1));
        }
      });

      // Update falling droplets
      const group = dropletsGroupRef.current;
      droplets.forEach((drop) => {
        drop.y += isTop ? -drop.yVel : drop.yVel; // fall down or "rise up" if inverted top divider
        drop.yVel += 0.35; // gravity acceleration
        drop.opacity -= 0.015; // dissolve opacity

        if (drop.el) {
          drop.el.setAttribute('cy', drop.y.toFixed(1));
          drop.el.setAttribute('opacity', drop.opacity.toFixed(3));
        }
      });

      // Clear dissolved droplet DOM elements
      droplets.forEach((drop, idx) => {
        if (drop.opacity <= 0 || (isTop ? drop.y < -50 : drop.y > rect.height + 50)) {
          if (drop.el && group) {
            group.removeChild(drop.el);
          }
          droplets[idx] = null;
        }
      });
      droplets = droplets.filter(Boolean);

      rafId = requestAnimationFrame(updatePhysics);
    };

    rafId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [color, isTop]);

  // SVG gooey filter unique to this instance to prevent collisions
  const filterId = `gooey-drip-${isTop ? 'top' : 'bottom'}-${Math.floor(Math.random() * 1000)}`;

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '110px',
        position: 'absolute',
        left: 0,
        // Place divider at the bottom of the section, or top if inverted
        bottom: isTop ? 'auto' : '-45px',
        top: isTop ? '-45px' : 'auto',
        zIndex: 35, // Render above section backdrops, below headers/cursor
        pointerEvents: 'none', // cursor can glide through it
        overflow: 'hidden'
      }}
    >
      <svg 
        ref={svgRef}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <defs>
          {/* Gooey matrix filter */}
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>

        <g filter={`url(#${filterId})`}>
          {/* Flat anchor bar */}
          <rect 
            x="0" 
            y={isTop ? '90' : '0'} 
            width="100%" 
            height="25" 
            fill={color} 
          />

          {/* Drips container */}
          <g ref={dripsGroupRef} />

          {/* Droplets container */}
          <g ref={dropletsGroupRef} />
        </g>
      </svg>
    </div>
  );
};

export default InteractiveDripDivider;
