import React, { useEffect, useRef, useState } from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';
import NeumorphicCircleOrbits from './NeumorphicCircleOrbits';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: <Zap size={22} />, title: 'Obsessive Speed', desc: 'Sub-second load times. We treat performance as a feature, not an afterthought.' },
  { icon: <Shield size={22} />, title: 'Rock-Solid Security', desc: 'Enterprise-grade protocols on every deployment. Your data stays fortified.' },
  { icon: <Users size={22} />, title: 'Dedicated Crew', desc: 'A tight-knit squad of senior engineers and designers assigned to your vision.' },
  { icon: <Award size={22} />, title: 'Revenue-First Design', desc: 'Every pixel we place is engineered to convert visitors into paying customers.' }
];

const featureImages = [
  '/obsessive_speed.png',
  '/rock_solid_security.png',
  '/dedicated_crew.png',
  '/revenue_first_design.png'
];

const allImages = [
  { src: '/creative_process.png', alt: 'Our Creative Process' },
  { src: '/obsessive_speed.png', alt: 'Obsessive Speed' },
  { src: '/rock_solid_security.png', alt: 'Rock-Solid Security' },
  { src: '/dedicated_crew.png', alt: 'Dedicated Crew' },
  { src: '/revenue_first_design.png', alt: 'Revenue-First Design' }
];

const UnorganizedTechDoodleCanvas = ({ doodleSvgRef, hoveredCardIndex }) => {
  // Deterministic pseudo-random helper for 750-item edge-to-edge organic tech doodle collage
  const seededRandom = (seed) => {
    const x = Math.sin(seed * 9999 + 1) * 10000;
    return x - Math.floor(x);
  };

  const colors = [
    '#000000', '#0F172A', '#1E293B', '#111827', '#09090B'
  ];

  const totalItems = 1350;
  const items = [];

  for (let i = 0; i < totalItems; i++) {
    const r1 = seededRandom(i * 7 + 1);
    const r2 = seededRandom(i * 13 + 3);
    const r3 = seededRandom(i * 19 + 7);
    const r4 = seededRandom(i * 23 + 11);
    const r5 = seededRandom(i * 31 + 17);

    const x = r1 * 1060 + 20;
    const y = r2 * 1160 + 20;
    const scale = 0.38 + r3 * 0.55;
    const rotate = (r4 - 0.5) * 50;
    const type = Math.floor(r5 * 55);
    const color = colors[Math.floor(r1 * colors.length)];
    const opacity = 0.48 + r2 * 0.45;

    items.push({ id: i, x, y, scale, rotate, type, color, opacity });
  }

  const renderIcon = ({ id, type, x, y, scale, rotate, color, opacity }) => {
    let effectiveType = type;
    if (hoveredCardIndex === 0) effectiveType = 100; // Obsessive Speed -> Lightning Zap
    else if (hoveredCardIndex === 1) effectiveType = 101; // Rock-Solid Security -> Shield
    else if (hoveredCardIndex === 2) effectiveType = 102; // Dedicated Crew -> Users
    else if (hoveredCardIndex === 3) effectiveType = 103; // Revenue-First Design -> Award Medal

    const transform = `translate(${x}, ${y}) scale(${scale}) rotate(${rotate})`;
    switch (effectiveType) {
      case 100: // Zap / Lightning Bolt (Obsessive Speed)
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M3 -15 L-11 1 H1 L-2 15 L12 -1 H0 Z" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        );
      case 101: // Security Shield (Rock-Solid Security)
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M0 -15 C7 -15 13 -11 13 -3 C13 7 5 13 0 16 C-5 13 -13 7 -13 -3 C-13 -11 -7 -15 0 -15 Z" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path className="tech-doodle-path" d="M0 -7 L0 6 M-5 -1 L5 -1" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 102: // Dedicated Crew (Users / Squad)
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <circle className="tech-doodle-path" cx="-5" cy="-6" r="4.5" stroke={color} strokeWidth="2" fill="none" />
            <path className="tech-doodle-path" d="M-13 10 v-2 c0 -3 2.5 -5 5.5 -5 h5 c3 0 5.5 2 5.5 5 v2" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle className="tech-doodle-path" cx="7" cy="-6" r="3.5" stroke={color} strokeWidth="1.8" fill="none" />
            <path className="tech-doodle-path" d="M5 10 v-1 c0 -2.2 1.8 -4 4 -4 h2 c2.2 0 4 1.8 4 4 v1" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </g>
        );
      case 103: // Revenue-First Design (Award Ribbon Medal)
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <circle className="tech-doodle-path" cx="0" cy="-5" r="8.5" stroke={color} strokeWidth="2.2" fill="none" />
            <circle className="tech-doodle-path" cx="0" cy="-5" r="4.5" stroke={color} strokeWidth="1.5" fill="none" />
            <path className="tech-doodle-path" d="M-4.5 3 L-7 15 L0 12 L7 15 L4.5 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        );
      case 0: // CPU / Microprocessor
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-17" y="-17" width="34" height="34" rx="7" stroke={color} strokeWidth="2.2" fill="none" />
            <rect className="tech-doodle-path" x="-8" y="-8" width="16" height="16" rx="3" stroke={color} strokeWidth="1.6" fill="none" />
            <path className="tech-doodle-path" d="M-8 -22 v5 M0 -22 v5 M8 -22 v5 M-8 17 v5 M0 17 v5 M8 17 v5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <path className="tech-doodle-path" d="M-22 -8 h5 M-22 0 h5 M-22 8 h5 M17 -8 h5 M17 0 h5 M17 8 h5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 1: // Code Editor Window
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-20" y="-14" width="40" height="28" rx="6" stroke={color} strokeWidth="2.2" fill="none" />
            <line className="tech-doodle-path" x1="-20" y1="-5" x2="20" y2="-5" stroke={color} strokeWidth="1.4" />
            <path className="tech-doodle-path" d="M-13 0 h16 M-13 6 h22 M-13 10 h10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 2: // Neural Net / AI Brain
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-10 10 c-7-5-7-15 0-19 c5-3 12-2 15 3 c3-5 10-6 15-3 c7 4 7 14 0 19 z" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <circle className="tech-doodle-path" cx="-14" cy="-2" r="2.5" stroke={color} strokeWidth="1.5" fill="none" />
            <circle className="tech-doodle-path" cx="14" cy="-2" r="2.5" stroke={color} strokeWidth="1.5" fill="none" />
          </g>
        );
      case 3: // Robot Head
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-16" y="-5" width="32" height="26" rx="7" stroke={color} strokeWidth="2.2" fill="none" />
            <line className="tech-doodle-path" x1="0" y1="-5" x2="0" y2="-12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <circle className="tech-doodle-path" cx="0" cy="-14" r="2.5" stroke={color} strokeWidth="1.5" fill="none" />
            <circle className="tech-doodle-path" cx="-7" cy="4" r="3" stroke={color} strokeWidth="1.6" fill="none" />
            <circle className="tech-doodle-path" cx="7" cy="4" r="3" stroke={color} strokeWidth="1.6" fill="none" />
            <line className="tech-doodle-path" x1="-7" y1="13" x2="7" y2="13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 4: // Cloud Storage & DB
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-16 -1 c-4 0-7-3-7-7 c0-4 3-7 7-8 c3-5 10-5 13 0 c3-2 8 0 9 3 c3 0 5 3 4 7 c3 2 3 5 0 7 z" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse className="tech-doodle-path" cx="0" cy="9" rx="14" ry="4.5" stroke={color} strokeWidth="1.6" fill="none" />
            <path className="tech-doodle-path" d="M-14 9 v8 c0 2.5 6 4.5 14 4.5 c8 0 14-2 14-4.5 v-8" stroke={color} strokeWidth="1.6" fill="none" />
          </g>
        );
      case 5: // VR Headset
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-18" y="-1" width="36" height="15" rx="4" stroke={color} strokeWidth="2.2" fill="none" />
            <line className="tech-doodle-path" x1="-11" y1="-1" x2="-11" y2="-13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <line className="tech-doodle-path" x1="11" y1="-1" x2="11" y2="-13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <path className="tech-doodle-path" d="M-6 -11 c3-3 9-3 12 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </g>
        );
      case 6: // Mobile Smartphone
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-11" y="-18" width="22" height="36" rx="5" stroke={color} strokeWidth="2.2" fill="none" />
            <rect className="tech-doodle-path" x="-8" y="-14" width="16" height="24" rx="2" stroke={color} strokeWidth="1.4" fill="none" />
            <circle className="tech-doodle-path" cx="16" cy="-5" r="3.5" stroke={color} strokeWidth="1.5" fill="none" />
            <circle className="tech-doodle-path" cx="16" cy="-5" r="8" stroke={color} strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
          </g>
        );
      case 7: // Laptop
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-16" y="-14" width="32" height="22" rx="4" stroke={color} strokeWidth="2.2" fill="none" />
            <path className="tech-doodle-path" d="M-21 8 h42 l-3 5 h-36 z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <path className="tech-doodle-path" d="M-11 -8 h20 M-11 -3 h14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );
      case 8: // Atom / Quantum Orbit
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <circle className="tech-doodle-path" cx="-6" cy="-6" r="9" stroke={color} strokeWidth="1.8" strokeDasharray="4 3" fill="none" />
            <circle className="tech-doodle-path" cx="6" cy="4" r="7" stroke={color} strokeWidth="1.8" strokeDasharray="3 3" fill="none" />
          </g>
        );
      case 9: // Cybersecurity Shield
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-15 -7 h30 c3 0 5 3 4 8 l-2 7 c-2 3-5 3-13 0 c-7 3-11 3-13 0 l-2-7 c-1-5 1-8 4-8 z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" fill="none" />
            <path className="tech-doodle-path" d="M-15 -1 h-5 M15 -1 h5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 10: // Headphones
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-11 5 c0-14 22-14 22 0" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <rect className="tech-doodle-path" x="-15" y="2" width="7" height="12" rx="2.5" stroke={color} strokeWidth="1.8" fill="none" />
            <rect className="tech-doodle-path" x="8" y="2" width="7" height="12" rx="2.5" stroke={color} strokeWidth="1.8" fill="none" />
          </g>
        );
      case 11: // Encryption Key Shield
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-12 -12 l12-4 l12 4 v14 c0 10-12 17-12 17 c0 0-12-7-12-17 z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" fill="none" />
            <circle className="tech-doodle-path" cx="0" cy="-2" r="3.5" stroke={color} strokeWidth="1.5" fill="none" />
          </g>
        );
      case 12: // Idea Lightbulb
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-5 -2 c-5-3-7-8-4-13 c3-5 9-6 14-4 c5 2 7 9 4 14 c-2 2-2 5-2 7 h-9 c0-2-1-5-3-7 z" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <line className="tech-doodle-path" x1="-3" y1="8" x2="4" y2="8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
      case 13: // Game Controller
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-14 -8 h28 c3 0 6 3 4 8 l-2 10 c-1 3-4 3-6 1 l-2-4 h-6 l-2 4 c-2 2-5 2-6-1 l-2-10 c-2-5 1-8 4-8 z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <path className="tech-doodle-path" d="M-8 -3 v6 M-11 0 h6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          </g>
        );
      case 14: // Camera / Lens
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-16" y="-7" width="32" height="22" rx="5" stroke={color} strokeWidth="2" fill="none" />
            <path className="tech-doodle-path" d="M-7 -7 l3-4 h8 l3 4 z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" fill="none" />
            <circle className="tech-doodle-path" cx="0" cy="4" r="6.5" stroke={color} strokeWidth="1.8" fill="none" />
          </g>
        );
      case 15: // Rocket Launch
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-12" y="-11" width="24" height="22" rx="4" stroke={color} strokeWidth="2" fill="none" />
            <path className="tech-doodle-path" d="M12 -5 v10" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <path className="tech-doodle-path" d="M2 -7 l-4 6 h6 l-3 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        );
      case 16: // Binary Stream Text
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <text className="tech-doodle-path" x="-15" y="0" fill={color} fontSize="12" fontWeight="800" fontFamily="monospace">010110</text>
            <text className="tech-doodle-path" x="-13" y="12" fill={color} fontSize="10" fontWeight="700" fontFamily="monospace">AI.SYS</text>
          </g>
        );
      case 17: // Fast Forward Chevrons
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-12 -8 l8 8 l-8 8 M-3 -8 l8 8 l-8 8 M6 -8 l8 8 l-8 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        );
      case 18: // Hexagon Node
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <polygon className="tech-doodle-path" points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8" stroke={color} strokeWidth="1.8" fill="none" />
            <circle className="tech-doodle-path" cx="0" cy="0" r="3" stroke={color} strokeWidth="1.5" fill="none" />
          </g>
        );
      case 19: // Sparkle Star
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M0 -12 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" stroke={color} strokeWidth="1.6" fill="none" />
          </g>
        );
      case 20: // RAM Memory Stick
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-22" y="-9" width="44" height="18" rx="3" stroke={color} strokeWidth="1.8" fill="none" />
            <rect className="tech-doodle-path" x="-16" y="-5" width="8" height="6" stroke={color} strokeWidth="1.2" fill="none" />
            <rect className="tech-doodle-path" x="-4" y="-5" width="8" height="6" stroke={color} strokeWidth="1.2" fill="none" />
            <rect className="tech-doodle-path" x="8" y="-5" width="8" height="6" stroke={color} strokeWidth="1.2" fill="none" />
            <path className="tech-doodle-path" d="M-18 9 v4 M-12 9 v4 M-6 9 v4 M0 9 v4 M6 9 v4 M12 9 v4 M18 9 v4" stroke={color} strokeWidth="1.4" />
          </g>
        );
      case 21: // SSD / NVMe Storage
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-14" y="-18" width="28" height="36" rx="4" stroke={color} strokeWidth="2" fill="none" />
            <rect className="tech-doodle-path" x="-8" y="-12" width="16" height="12" rx="2" stroke={color} strokeWidth="1.4" fill="none" />
            <circle className="tech-doodle-path" cx="0" cy="8" r="3" stroke={color} strokeWidth="1.4" fill="none" />
          </g>
        );
      case 22: // Wi-Fi Router
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-18" y="2" width="36" height="14" rx="4" stroke={color} strokeWidth="2" fill="none" />
            <line className="tech-doodle-path" x1="-10" y1="2" x2="-10" y2="-10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <line className="tech-doodle-path" x1="0" y1="2" x2="0" y2="-12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <line className="tech-doodle-path" x1="10" y1="2" x2="10" y2="-10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <path className="tech-doodle-path" d="M-8 -14 c5-4 11-4 16 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </g>
        );
      case 23: // Git Branching Nodes
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <line className="tech-doodle-path" x1="-12" y1="-14" x2="-12" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path className="tech-doodle-path" d="M-12 -2 c8 0 16 4 16 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle className="tech-doodle-path" cx="-12" cy="-14" r="3.5" stroke={color} strokeWidth="1.6" fill="none" />
            <circle className="tech-doodle-path" cx="-12" cy="14" r="3.5" stroke={color} strokeWidth="1.6" fill="none" />
            <circle className="tech-doodle-path" cx="4" cy="8" r="3.5" stroke={color} strokeWidth="1.6" fill="none" />
          </g>
        );
      case 24: // SQL Database Table
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-16" y="-14" width="32" height="28" rx="4" stroke={color} strokeWidth="2" fill="none" />
            <line className="tech-doodle-path" x1="-16" y1="-5" x2="16" y2="-5" stroke={color} strokeWidth="1.6" />
            <line className="tech-doodle-path" x1="-4" y1="-5" x2="-4" y2="14" stroke={color} strokeWidth="1.4" />
            <line className="tech-doodle-path" x1="-11" y1="2" x2="11" y2="2" stroke={color} strokeWidth="1.2" />
          </g>
        );
      case 25: // API Connector Plug
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-14" y="-8" width="16" height="16" rx="3" stroke={color} strokeWidth="1.8" fill="none" />
            <line className="tech-doodle-path" x1="2" y1="-4" x2="12" y2="-4" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line className="tech-doodle-path" x1="2" y1="4" x2="12" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line className="tech-doodle-path" x1="-22" y1="0" x2="-14" y2="0" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 26: // Analytics Bar Chart & Growth Arrow
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-15" y="2" width="6" height="12" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
            <rect className="tech-doodle-path" x="-5" y="-4" width="6" height="18" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
            <rect className="tech-doodle-path" x="5" y="-12" width="6" height="26" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
            <path className="tech-doodle-path" d="M-15 -6 L-2 -10 L12 -18" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </g>
        );
      case 27: // Pie Chart
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <circle className="tech-doodle-path" cx="0" cy="0" r="15" stroke={color} strokeWidth="2" fill="none" />
            <path className="tech-doodle-path" d="M0 -15 L0 0 L15 0" stroke={color} strokeWidth="1.8" fill="none" />
          </g>
        );
      case 28: // Target Radar / Crosshair
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <circle className="tech-doodle-path" cx="0" cy="0" r="16" stroke={color} strokeWidth="1.8" fill="none" />
            <circle className="tech-doodle-path" cx="0" cy="0" r="8" stroke={color} strokeWidth="1.4" fill="none" />
            <line className="tech-doodle-path" x1="-20" y1="0" x2="20" y2="0" stroke={color} strokeWidth="1.5" />
            <line className="tech-doodle-path" x1="0" y1="-20" x2="0" y2="20" stroke={color} strokeWidth="1.5" />
          </g>
        );
      case 29: // UI Pen Tool Vector Curve
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-16 12 C-8 -12, 8 20, 16 -12" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <rect className="tech-doodle-path" x="-18" y="10" width="4" height="4" stroke={color} strokeWidth="1.4" fill="none" />
            <rect className="tech-doodle-path" x="14" y="-14" width="4" height="4" stroke={color} strokeWidth="1.4" fill="none" />
          </g>
        );
      case 30: // Color Palette Swatches
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-15 10 c-4-6-2-16 6-18 c9-2 18 3 18 11 c0 5-4 7-9 7 c-2 0-4 2-4 4 c0 3 2 4 1 6 c-2 3-8 0-12-1 z" stroke={color} strokeWidth="2" fill="none" />
            <circle className="tech-doodle-path" cx="-5" cy="-8" r="2" fill={color} />
            <circle className="tech-doodle-path" cx="4" cy="-7" r="2" fill={color} />
            <circle className="tech-doodle-path" cx="8" cy="1" r="2" fill={color} />
          </g>
        );
      case 31: // Fingerprint Security Scanner
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-12 8 c0-12 24-12 24 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path className="tech-doodle-path" d="M-8 8 c0-8 16-8 16 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path className="tech-doodle-path" d="M-4 8 c0-4 8-4 8 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </g>
        );
      case 32: // Docker Container Box
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-18" y="-14" width="36" height="28" rx="4" stroke={color} strokeWidth="2" fill="none" />
            <rect className="tech-doodle-path" x="-12" y="-8" width="6" height="6" stroke={color} strokeWidth="1.2" fill="none" />
            <rect className="tech-doodle-path" x="-3" y="-8" width="6" height="6" stroke={color} strokeWidth="1.2" fill="none" />
            <rect className="tech-doodle-path" x="6" y="-8" width="6" height="6" stroke={color} strokeWidth="1.2" fill="none" />
            <rect className="tech-doodle-path" x="-12" y="2" width="6" height="6" stroke={color} strokeWidth="1.2" fill="none" />
            <rect className="tech-doodle-path" x="-3" y="2" width="6" height="6" stroke={color} strokeWidth="1.2" fill="none" />
            <rect className="tech-doodle-path" x="6" y="2" width="6" height="6" stroke={color} strokeWidth="1.2" fill="none" />
          </g>
        );
      case 33: // Smart Watch Wearable
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-12" y="-12" width="24" height="24" rx="6" stroke={color} strokeWidth="2" fill="none" />
            <rect className="tech-doodle-path" x="-6" y="-18" width="12" height="6" stroke={color} strokeWidth="1.4" fill="none" />
            <rect className="tech-doodle-path" x="-6" y="12" width="12" height="6" stroke={color} strokeWidth="1.4" fill="none" />
            <path className="tech-doodle-path" d="M-8 0 h4 l3 -5 l4 10 l3 -5 h2" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        );
      case 34: // Drone Quadcopter
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <circle className="tech-doodle-path" cx="0" cy="0" r="6" stroke={color} strokeWidth="1.8" fill="none" />
            <line className="tech-doodle-path" x1="-12" y1="-12" x2="12" y2="12" stroke={color} strokeWidth="1.6" />
            <line className="tech-doodle-path" x1="-12" y1="12" x2="12" y2="-12" stroke={color} strokeWidth="1.6" />
            <circle className="tech-doodle-path" cx="-12" cy="-12" r="5" stroke={color} strokeWidth="1.4" fill="none" />
            <circle className="tech-doodle-path" cx="12" cy="-12" r="5" stroke={color} strokeWidth="1.4" fill="none" />
            <circle className="tech-doodle-path" cx="-12" cy="12" r="5" stroke={color} strokeWidth="1.4" fill="none" />
            <circle className="tech-doodle-path" cx="12" cy="12" r="5" stroke={color} strokeWidth="1.4" fill="none" />
          </g>
        );
      case 35: // Circuit Board Resistor
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-20 0 h6 l3 -6 l6 12 l6 -12 l6 12 l3 -6 h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        );
      case 36: // Terminal Shell Command
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <text className="tech-doodle-path" x="-18" y="-2" fill={color} fontSize="11" fontWeight="800" fontFamily="monospace">&gt;_ dev</text>
            <text className="tech-doodle-path" x="-18" y="10" fill={color} fontSize="9" fontWeight="700" fontFamily="monospace">$ build</text>
          </g>
        );
      case 37: // JSON Payload Snippet
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <text className="tech-doodle-path" x="-18" y="-2" fill={color} fontSize="11" fontWeight="800" fontFamily="monospace">&#123;"ok":</text>
            <text className="tech-doodle-path" x="-18" y="10" fill={color} fontSize="11" fontWeight="800" fontFamily="monospace">true&#125;</text>
          </g>
        );
      case 38: // AI Magic Sparkle Wand
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <line className="tech-doodle-path" x1="-12" y1="12" x2="4" y2="-4" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path className="tech-doodle-path" d="M8 -16 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" stroke={color} strokeWidth="1.5" fill="none" />
          </g>
        );
      case 39: // AI Vision Bounding Box & Eye
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-14 -8 v-4 h6 M14 -8 v-4 h-6 M-14 8 v4 h6 M14 8 v4 h-6" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse className="tech-doodle-path" cx="0" cy="0" rx="9" ry="5" stroke={color} strokeWidth="1.6" fill="none" />
            <circle className="tech-doodle-path" cx="0" cy="0" r="2" fill={color} />
          </g>
        );
      case 40: // Mouse Pointer Cursor Ripple
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-10 -12 l16 10 l-7 2 l4 9 l-4 2 l-4 -9 l-5 5 z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <path className="tech-doodle-path" d="M8 -8 c4 4 4 10 0 14" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </g>
        );
      case 41: // Folder Tree Directory
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-16 -10 h10 l4 4 h18 v18 h-32 z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <path className="tech-doodle-path" d="M-8 2 h16 M-8 7 h10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          </g>
        );
      case 42: // Satellite Space Dish
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-10 -10 a16 16 0 0 0 20 20" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <line className="tech-doodle-path" x1="0" y1="0" x2="-8" y2="-8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <circle className="tech-doodle-path" cx="-10" cy="-10" r="2.5" fill={color} />
          </g>
        );
      case 43: // Wave Signal Sine Curve
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-18 0 c6 -12 12 12 18 0 c6 -12 12 12 18 0" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );
      case 44: // Debugger Bug & Magnifier
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <ellipse className="tech-doodle-path" cx="-2" cy="0" rx="7" ry="10" stroke={color} strokeWidth="1.8" fill="none" />
            <path className="tech-doodle-path" d="M-9 -4 h-4 M-9 0 h-4 M-9 4 h-4 M5 -4 h4 M5 0 h4 M5 4 h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <circle className="tech-doodle-path" cx="6" cy="6" r="6" stroke={color} strokeWidth="1.5" fill="none" />
            <line className="tech-doodle-path" x1="10" y1="10" x2="16" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 45: // Fast-Charge Battery
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-14" y="-8" width="26" height="16" rx="3" stroke={color} strokeWidth="2" fill="none" />
            <path className="tech-doodle-path" d="M12 -3 v6" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path className="tech-doodle-path" d="M-2 -5 l-4 6 h6 l-4 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        );
      case 46: // USB Type-C Connector
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-16" y="-6" width="32" height="12" rx="6" stroke={color} strokeWidth="2" fill="none" />
            <rect className="tech-doodle-path" x="-8" y="-2" width="16" height="4" rx="2" stroke={color} strokeWidth="1.2" fill="none" />
          </g>
        );
      case 47: // Infinity Tech Loop Ribbon
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-14 0 c0 -8 8 -8 14 0 c6 8 14 8 14 0 c0 -8 -8 -8 -14 0 c-6 8 -14 8 -14 0 z" stroke={color} strokeWidth="2" fill="none" />
          </g>
        );
      case 48: // Brick Firewall Shield
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-14 -12 h28 v24 h-28 z" stroke={color} strokeWidth="2" fill="none" />
            <line className="tech-doodle-path" x1="-14" y1="-4" x2="14" y2="-4" stroke={color} strokeWidth="1.5" />
            <line className="tech-doodle-path" x1="-14" y1="4" x2="14" y2="4" stroke={color} strokeWidth="1.5" />
            <line className="tech-doodle-path" x1="0" y1="-12" x2="0" y2="-4" stroke={color} strokeWidth="1.4" />
            <line className="tech-doodle-path" x1="-7" y1="-4" x2="-7" y2="4" stroke={color} strokeWidth="1.4" />
            <line className="tech-doodle-path" x1="7" y1="-4" x2="7" y2="4" stroke={color} strokeWidth="1.4" />
            <line className="tech-doodle-path" x1="0" y1="4" x2="0" y2="12" stroke={color} strokeWidth="1.4" />
          </g>
        );
      case 49: // Web Browser Stack
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-18 -10 h36 v22 h-36 z" stroke={color} strokeWidth="2" rx="3" fill="none" />
            <circle className="tech-doodle-path" cx="-13" cy="-6" r="1.5" fill={color} />
            <circle className="tech-doodle-path" cx="-8" cy="-6" r="1.5" fill={color} />
            <circle className="tech-doodle-path" cx="-3" cy="-6" r="1.5" fill={color} />
            <line className="tech-doodle-path" x1="-18" y1="-2" x2="18" y2="-2" stroke={color} strokeWidth="1.4" />
          </g>
        );
      case 50: // Interlocking Gear Cogwheels Pair
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <circle className="tech-doodle-path" cx="-6" cy="-4" r="8" stroke={color} strokeWidth="1.8" fill="none" />
            <circle className="tech-doodle-path" cx="6" cy="4" r="6" stroke={color} strokeWidth="1.6" fill="none" />
            <path className="tech-doodle-path" d="M-6 -14 v3 M-6 3 v3 M-15 -4 h3 M3 -4 h3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
            <path className="tech-doodle-path" d="M6 -4 v2 M6 10 v2 M0 4 h2 M12 4 h2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          </g>
        );
      case 51: // Gear AI Brain Profile
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <path className="tech-doodle-path" d="M-10 14 c-5-4-8-10-6-16 c2-8 9-12 16-10 c6 2 10 8 9 14 c-1 4-2 6 0 8 c2 2 4 1 5 3 c1 3-2 7-6 7 z" stroke={color} strokeWidth="2" fill="none" />
            <circle className="tech-doodle-path" cx="0" cy="-4" r="4" stroke={color} strokeWidth="1.4" fill="none" />
            <path className="tech-doodle-path" d="M0 -10 v2 M0 0 v2 M-6 -4 h2 M4 -4 h2" stroke={color} strokeWidth="1.2" />
          </g>
        );
      case 52: // Desktop PC Workstation Monitor
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-18" y="-16" width="36" height="24" rx="3" stroke={color} strokeWidth="2" fill="none" />
            <path className="tech-doodle-path" d="M-4 8 h8 v5 h-8 z M-10 13 h20" stroke={color} strokeWidth="1.6" fill="none" />
            <rect className="tech-doodle-path" x="-12" y="-10" width="14" height="12" rx="1.5" stroke={color} strokeWidth="1.2" fill="none" />
            <circle className="tech-doodle-path" cx="8" cy="-4" r="3" stroke={color} strokeWidth="1.2" fill="none" />
          </g>
        );
      case 53: // RJ45 Ethernet Network Plug
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <rect className="tech-doodle-path" x="-12" y="-12" width="24" height="20" rx="3" stroke={color} strokeWidth="2" fill="none" />
            <path className="tech-doodle-path" d="M-6 -12 v-4 h12 v4 M-8 8 v8 h16 v-8" stroke={color} strokeWidth="1.6" fill="none" />
            <path className="tech-doodle-path" d="M-6 -4 h3 M-1 -4 h3 M4 -4 h3" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          </g>
        );
      case 54: // Crossed Tools (Wrench & Screwdriver)
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <line className="tech-doodle-path" x1="-12" y1="-12" x2="12" y2="12" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <line className="tech-doodle-path" x1="12" y1="-12" x2="-12" y2="12" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <circle className="tech-doodle-path" cx="-12" cy="-12" r="3.5" stroke={color} strokeWidth="1.6" fill="none" />
            <circle className="tech-doodle-path" cx="12" cy="-12" r="3.5" stroke={color} strokeWidth="1.6" fill="none" />
          </g>
        );
      default: // Automation Cogwheel Gear
        return (
          <g key={id} className="tech-doodle-group" data-x={x} data-y={y} transform={transform} opacity={opacity}>
            <circle className="tech-doodle-path" cx="0" cy="0" r="9" stroke={color} strokeWidth="2" fill="none" />
            <circle className="tech-doodle-path" cx="0" cy="0" r="3" stroke={color} strokeWidth="1.5" fill="none" />
            <path className="tech-doodle-path" d="M0 -13 v4 M0 9 v4 M-13 0 h4 M9 0 h4 M-9 -9 l3 3 M6 6 l3 3 M-9 9 l3 -3 M6 -6 l3 -3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );
    }
  };

  return (
    <svg
      ref={doodleSvgRef}
      viewBox="0 0 1100 1200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'visible'
      }}
    >
      <defs>
        <linearGradient id="techDoodleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A2540" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#00B4D8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="techDoodleGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#028090" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00B4D8" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="techDoodleGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3A86FF" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Render 750 Edge-to-Edge Unorganized Freehand Tech Doodle Icons — NO long connecting swoosh lines */}
      {items.map(item => renderIcon(item))}
    </svg>
  );
};

const themeGlows = {
  '/creative_process.png': {
    color: '#00E5FF',
    border: '1.5px solid rgba(0, 229, 255, 0.45)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12), 0 0 25px rgba(0, 229, 255, 0.28), 0 0 50px rgba(112, 0, 255, 0.16)'
  },
  '/obsessive_speed.png': {
    color: '#FF2A54',
    border: '1.5px solid rgba(255, 42, 84, 0.45)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12), 0 0 25px rgba(255, 42, 84, 0.28), 0 0 50px rgba(176, 38, 255, 0.18)'
  },
  '/rock_solid_security.png': {
    color: '#00B8D9',
    border: '1.5px solid rgba(0, 184, 217, 0.45)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12), 0 0 25px rgba(0, 184, 217, 0.28), 0 0 50px rgba(0, 229, 255, 0.18)'
  },
  '/dedicated_crew.png': {
    color: '#7000FF',
    border: '1.5px solid rgba(112, 0, 255, 0.45)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12), 0 0 25px rgba(112, 0, 255, 0.28), 0 0 50px rgba(58, 134, 255, 0.18)'
  },
  '/revenue_first_design.png': {
    color: '#FF7800',
    border: '1.5px solid rgba(255, 120, 0, 0.45)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12), 0 0 25px rgba(255, 120, 0, 0.28), 0 0 50px rgba(255, 42, 84, 0.18)'
  }
};

const featureWatermarks = {
  '/obsessive_speed.png': {
    color: '#FF2A54',
    icon: (
      <svg viewBox="0 0 24 24" width="460" height="460" fill="none" stroke="#FF2A54" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  '/rock_solid_security.png': {
    color: '#00B8D9',
    icon: (
      <svg viewBox="0 0 24 24" width="460" height="460" fill="none" stroke="#00B8D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  '/dedicated_crew.png': {
    color: '#7000FF',
    icon: (
      <svg viewBox="0 0 24 24" width="460" height="460" fill="none" stroke="#7000FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  '/revenue_first_design.png': {
    color: '#FF7800',
    icon: (
      <svg viewBox="0 0 24 24" width="460" height="460" fill="none" stroke="#FF7800" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    )
  }
};

const About = () => {
  const sectionRef = useRef(null);
  const leftContainerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const doodleSvgRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeImage, setActiveImage] = useState('/creative_process.png');
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [cardPositions, setCardPositions] = useState([0, 1, 3, 2]);
  const [rotationStarted, setRotationStarted] = useState(false);

  const handleWrapperMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
    setGlowPos({ x, y });
  };

  const handleWrapperMouseLeave = () => {
    setGlowPos({ x: 0, y: 0 });
  };

  // Helper to compute smooth CSS translate transform for clockwise grid slot movement
  const getCardTransform = (cardIndex, targetSlotIndex) => {
    const initialSlots = [
      { c: 0, r: 0 }, // Feature 0 (Obsessive Speed): initial Top-Left
      { c: 1, r: 0 }, // Feature 1 (Rock-Solid Security): initial Top-Right
      { c: 0, r: 1 }, // Feature 2 (Dedicated Crew): initial Bottom-Left
      { c: 1, r: 1 }  // Feature 3 (Revenue-First Design): initial Bottom-Right
    ];
    
    const slotCoords = [
      { c: 0, r: 0 }, // Slot 0: Top-Left
      { c: 1, r: 0 }, // Slot 1: Top-Right
      { c: 1, r: 1 }, // Slot 2: Bottom-Right
      { c: 0, r: 1 }  // Slot 3: Bottom-Left
    ];

    const initial = initialSlots[cardIndex];
    const target = slotCoords[targetSlotIndex];

    const deltaCol = target.c - initial.c;
    const deltaRow = target.r - initial.r;

    if (deltaCol === 0 && deltaRow === 0) return 'translate(0px, 0px)';

    const xStr = deltaCol === 0 ? '0px' : deltaCol > 0 ? 'calc(100% + 1.25rem)' : 'calc(-100% - 1.25rem)';
    const yStr = deltaRow === 0 ? '0px' : deltaRow > 0 ? 'calc(100% + 1.25rem)' : 'calc(-100% - 1.25rem)';

    return `translate(${xStr}, ${yStr})`;
  };

  // Continuous 2-second clockwise card rotation loop starting AFTER scroll entrance reveal completes
  useEffect(() => {
    if (!rotationStarted) return;

    const timer = setInterval(() => {
      setCardPositions(prev => prev.map(p => (p + 1) % 4));
    }, 2000);

    return () => clearInterval(timer);
  }, [rotationStarted]);

  // Synchronize activeImage with whichever card is currently at Top-Left (Slot 0)
  useEffect(() => {
    if (!rotationStarted) return;
    const topIdx = cardPositions.findIndex(p => p === 0);
    if (topIdx !== -1 && featureImages[topIdx]) {
      setActiveImage(featureImages[topIdx]);
    }
  }, [cardPositions, rotationStarted]);

  useEffect(() => {
    let scrollTriggerInstance;
    let pinTriggerInstance;
    let doodleTriggerInstance;
    let rotationTriggerInstance;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (leftContainerRef.current && sectionRef.current) {
        pinTriggerInstance = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 100px",
          endTrigger: ".about-features",
          end: "bottom 75%",
          pin: leftContainerRef.current,
          pinSpacing: false,
          refreshPriority: 2,
          invalidateOnRefresh: true
        });
      }

      return () => {
        if (pinTriggerInstance) pinTriggerInstance.kill();
      };
    });

    // Guaranteed trigger to start rotation 1 second after scrolling into view
    rotationTriggerInstance = ScrollTrigger.create({
      trigger: ".about-features",
      start: "top 85%",
      once: true,
      onEnter: () => {
        setTimeout(() => {
          setRotationStarted(true);
        }, 1000);
      }
    });

    // Staggered ScrollTrigger entrance animation for features cards
    if (cardRefs.current.length > 0) {
      scrollTriggerInstance = gsap.fromTo(cardRefs.current.filter(Boolean),
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          rotationX: 12
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          onComplete: () => {
            cardRefs.current.forEach(el => {
              if (el) gsap.set(el, { clearProps: "transform,scale,rotationX,y" });
            });
            setRotationStarted(true);
          },
          scrollTrigger: {
            trigger: ".about-features",
            start: "top 85%",
            once: true
          }
        }
      );
    }

    return () => {
      mm.revert();
      if (doodleTriggerInstance) doodleTriggerInstance.kill();
      if (rotationTriggerInstance) rotationTriggerInstance.kill();
      if (scrollTriggerInstance) {
        if (scrollTriggerInstance.scrollTrigger) {
          scrollTriggerInstance.scrollTrigger.kill();
        }
        scrollTriggerInstance.kill();
      }
    };
  }, []);

  const handleMouseEnter = (index) => {
    setActiveImage(featureImages[index]);
  };

  const handleMouseLeave = () => {};

  return (
    <section id="about" ref={sectionRef} className="about-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Neumorphic 3/4 Circle Layers with Live Orbiting Logo Color Balls */}
      <NeumorphicCircleOrbits align="left" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="about-grid">
          
          {/* Left: Dynamic visual assets container */}
          <div className="about-left-container" ref={leftContainerRef} style={{ position: 'relative', alignSelf: 'stretch' }}>
            <div 
              className="about-sticky-wrapper"
              onMouseMove={handleWrapperMouseMove}
              onMouseLeave={handleWrapperMouseLeave}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '1000px',
                margin: '0 auto',
              }}
            >

              <div 
                className="about-video-wrapper" 
                ref={videoWrapperRef} 
                style={{ 
                  position: 'relative', 
                  zIndex: 1, 
                  width: '100%', 
                  maxWidth: '1000px', 
                  margin: '0 auto', 
                  borderRadius: '30px', 
                  overflow: 'hidden', 
                  aspectRatio: '16/9',
                  border: (themeGlows[activeImage] || themeGlows['/creative_process.png']).border,
                  boxShadow: (themeGlows[activeImage] || themeGlows['/creative_process.png']).boxShadow,
                  transition: 'border 0.5s ease, box-shadow 0.5s ease'
                }}
              >
                {/* Large Watermark Icon overlay on card hover */}
                {Object.entries(featureWatermarks).map(([imgSrc, data]) => {
                  const isSelected = activeImage === imgSrc;
                  return (
                    <div
                      key={imgSrc}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: isSelected ? 'translate(-50%, -50%) scale(1.08)' : 'translate(-50%, -50%) scale(0.65)',
                        opacity: isSelected ? 0.38 : 0,
                        filter: `drop-shadow(0 0 35px ${data.color}) blur(0.5px)`,
                        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease, filter 0.4s ease',
                        zIndex: 1,
                        pointerEvents: 'none'
                      }}
                    >
                      {data.icon}
                    </div>
                  );
                })}
                {allImages.map((img) => (
                  <img 
                    key={img.src}
                    src={img.src} 
                    alt={img.alt} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      position: 'absolute', 
                      inset: 0,
                      opacity: activeImage === img.src ? 1 : 0,
                      transition: 'opacity 0.6s ease-in-out',
                      zIndex: activeImage === img.src ? 1 : 0
                    }} 
                  />
                ))}
                
                <div className="about-video-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem', color: 'white', zIndex: 2 }}>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '0.25rem', color: 'white', fontWeight: 700 }}>
                    {activeImage === '/creative_process.png' && 'Our Creative Process'}
                    {activeImage === '/obsessive_speed.png' && 'Obsessive Speed'}
                    {activeImage === '/rock_solid_security.png' && 'Rock-Solid Security'}
                    {activeImage === '/dedicated_crew.png' && 'Dedicated Crew'}
                    {activeImage === '/revenue_first_design.png' && 'Revenue-First Design'}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', margin: 0 }}>
                    {activeImage === '/creative_process.png' && 'From concept to launch'}
                    {activeImage === '/obsessive_speed.png' && 'Engineered for sub-second performance'}
                    {activeImage === '/rock_solid_security.png' && 'Fortified with enterprise-grade protection'}
                    {activeImage === '/dedicated_crew.png' && 'Full attention of senior designers and devs'}
                    {activeImage === '/revenue_first_design.png' && 'Optimized to convert traffic to paying customers'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div>
            <div className="section-label reveal reveal-delay-1">Who We Are</div>
            <AnimatedHeading 
              text="A Tiny Team with \n Outsized Ambition" 
              mode="rotate" 
            />
            <p className="reveal reveal-delay-3" style={{ marginTop: '1.5rem' }}>
              NUZAROX is a boutique digital studio born in Chennai. We're not a 200-person agency churning out templates. We're a focused, obsessive crew that treats every project like it's our own product launch.
            </p>
            <p className="reveal reveal-delay-4" style={{ marginTop: '1rem' }}>
              We partner with startups and ambitious brands who understand that design isn't decoration — it's strategy. When you work with us, you get our full attention, not a junior team and a project manager.
            </p>

            <div 
              className="about-features" 
              style={{ marginTop: '2.5rem', position: 'relative' }}
            >
              {features.map((f, i) => {
                const isActive = activeImage === featureImages[i];
                const itemGlow = themeGlows[featureImages[i]];
                const pos = cardPositions[i];
                const transformVal = getCardTransform(i, pos);

                return (
                  <div
                    key={i}
                    ref={el => cardRefs.current[i] = el}
                    style={{ 
                      borderRadius: '24px', 
                      overflow: 'visible',
                      transform: transformVal,
                      transition: 'transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      willChange: 'transform',
                      position: 'relative',
                      zIndex: pos === 0 ? 3 : 1
                    }}
                  >
                    <div 
                      className="about-feature glass-card"
                      onMouseEnter={() => handleMouseEnter(i)}
                      onMouseLeave={() => handleMouseLeave()}
                      style={{
                        transition: 'all 0.35s ease',
                        willChange: 'transform',
                        position: 'relative',
                        background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.95)',
                        border: isActive ? itemGlow.border : '1px solid rgba(0, 0, 0, 0.07)',
                        boxShadow: isActive 
                          ? `0 14px 32px rgba(0,0,0,0.06), 0 0 20px ${itemGlow.color}35` 
                          : '0 4px 12px rgba(0,0,0,0.03)',
                        borderRadius: '24px',
                        padding: '1.5rem',
                        transform: isActive ? 'scale(1.02)' : 'scale(1)'
                      }}
                    >
                      <div>
                        <div style={{ 
                          color: itemGlow.color, 
                          marginBottom: '0.75rem',
                          transition: 'color 0.3s ease'
                        }}>{f.icon}</div>
                        <h4 style={{ fontWeight: 700, margin: 0, marginBottom: '0.35rem' }}>{f.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748B' }}>{f.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
