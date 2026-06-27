import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Major world cities with lat/lng (degrees)
const CITIES = [
  // North America
  { name: 'New York',      lat: 40.7128,  lng: -74.0060 },
  { name: 'Los Angeles',   lat: 34.0522,  lng: -118.2437 },
  { name: 'Chicago',       lat: 41.8781,  lng: -87.6298 },
  { name: 'Toronto',       lat: 43.6532,  lng: -79.3832 },
  { name: 'Vancouver',     lat: 49.2827,  lng: -123.1207 },
  { name: 'Mexico City',   lat: 19.4326,  lng: -99.1332 },
  { name: 'Miami',         lat: 25.7617,  lng: -80.1918 },
  { name: 'Seattle',       lat: 47.6062,  lng: -122.3321 },
  { name: 'San Francisco', lat: 37.7749,  lng: -122.4194 },
  { name: 'Honolulu',      lat: 21.3069,  lng: -157.8583 },
  { name: 'Boston',        lat: 42.3601,  lng: -71.0589 },
  { name: 'Houston',       lat: 29.7604,  lng: -95.3698 },
  { name: 'Montreal',      lat: 45.5017,  lng: -73.5673 },
  { name: 'Atlanta',       lat: 33.7490,  lng: -84.3880 },
  { name: 'Denver',        lat: 39.7392,  lng: -104.9903 },
  { name: 'Dallas',        lat: 32.7767,  lng: -96.7970 },
  { name: 'Panama City',   lat: 8.9824,   lng: -79.5199 },

  // South America
  { name: 'São Paulo',     lat: -23.5505, lng: -46.6333 },
  { name: 'Buenos Aires',  lat: -34.6037, lng: -58.3816 },
  { name: 'Bogota',        lat: 4.7110,   lng: -74.0721 },
  { name: 'Lima',          lat: -12.0464, lng: -77.0428 },
  { name: 'Rio de Janeiro',lat: -22.9068, lng: -43.1729 },
  { name: 'Santiago',      lat: -33.4489, lng: -70.6693 },
  { name: 'Caracas',       lat: 10.4806,  lng: -66.9036 },
  { name: 'Quito',         lat: -0.1807,  lng: -78.4678 },
  { name: 'Montevideo',    lat: -34.9011, lng: -56.1645 },
  { name: 'Manaus',        lat: -3.1190,  lng: -60.0217 },
  { name: 'Recife',        lat: -8.0578,  lng: -34.8778 },

  // Europe
  { name: 'London',        lat: 51.5074,  lng: -0.1278 },
  { name: 'Paris',         lat: 48.8566,  lng: 2.3522 },
  { name: 'Berlin',        lat: 52.5200,  lng: 13.4050 },
  { name: 'Rome',          lat: 41.9028,  lng: 12.4964 },
  { name: 'Madrid',        lat: 40.4168,  lng: -3.7038 },
  { name: 'Moscow',        lat: 55.7558,  lng: 37.6173 },
  { name: 'Amsterdam',     lat: 52.3676,  lng: 4.9041 },
  { name: 'Stockholm',     lat: 59.3293,  lng: 18.0686 },
  { name: 'Athens',        lat: 37.9838,  lng: 23.7275 },
  { name: 'Reykjavik',     lat: 64.1466,  lng: -21.9426 },
  { name: 'Dublin',        lat: 53.3498,  lng: -6.2603 },
  { name: 'Brussels',      lat: 50.8503,  lng: 4.3517 },
  { name: 'Copenhagen',    lat: 55.6761,  lng: 12.5683 },
  { name: 'Oslo',          lat: 59.9139,  lng: 10.7522 },
  { name: 'Helsinki',      lat: 60.1699,  lng: 24.9384 },
  { name: 'Vienna',        lat: 48.2082,  lng: 16.3738 },
  { name: 'Warsaw',        lat: 52.2297,  lng: 21.0122 },
  { name: 'Prague',        lat: 50.0755,  lng: 14.4378 },
  { name: 'Budapest',      lat: 47.4979,  lng: 19.0402 },
  { name: 'Lisbon',        lat: 38.7223,  lng: -9.1393 },
  { name: 'Zurich',        lat: 47.3769,  lng: 8.5417 },
  { name: 'Milan',         lat: 45.4642,  lng: 9.1900 },
  { name: 'Kyiv',          lat: 50.4501,  lng: 30.5234 },

  // Africa
  { name: 'Cairo',         lat: 30.0444,  lng: 31.2357 },
  { name: 'Lagos',         lat: 6.5244,   lng: 3.3792 },
  { name: 'Nairobi',       lat: -1.2921,  lng: 36.8219 },
  { name: 'Johannesburg',  lat: -26.2041, lng: 28.0473 },
  { name: 'Casablanca',    lat: 33.5731,  lng: -7.5898 },
  { name: 'Addis Ababa',   lat: 9.0300,   lng: 38.7400 },
  { name: 'Cape Town',     lat: -33.9249, lng: 18.4241 },
  { name: 'Algiers',       lat: 36.7538,  lng: 3.0588 },
  { name: 'Dakar',         lat: 14.7167,  lng: -17.4677 },
  { name: 'Accra',         lat: 5.6037,   lng: -0.1870 },
  { name: 'Kinshasa',      lat: -4.4419,  lng: 15.2663 },
  { name: 'Dar es Salaam', lat: -6.7924,  lng: 39.2083 },
  { name: 'Antananarivo',  lat: -18.8792, lng: 47.5079 },

  // Middle East & Western/Southern Asia
  { name: 'Dubai',         lat: 25.2048,  lng: 55.2708 },
  { name: 'Riyadh',        lat: 24.7136,  lng: 46.6753 },
  { name: 'Mumbai',        lat: 19.0760,  lng: 72.8777 },
  { name: 'New Delhi',     lat: 28.6139,  lng: 77.2090 },
  { name: 'Bangalore',     lat: 12.9716,  lng: 77.5946 },
  { name: 'Istanbul',      lat: 41.0082,  lng: 28.9784 },
  { name: 'Tehran',        lat: 35.6892,  lng: 51.3890 },
  { name: 'Baghdad',       lat: 33.3152,  lng: 44.3661 },
  { name: 'Tel Aviv',      lat: 32.0853,  lng: 34.7818 },
  { name: 'Karachi',       lat: 24.8607,  lng: 67.0011 },
  { name: 'Dhaka',         lat: 23.8103,  lng: 90.4125 },
  { name: 'Colombo',       lat: 6.9271,   lng: 79.8612 },

  // East Asia & Southeast Asia
  { name: 'Tokyo',         lat: 35.6762,  lng: 139.6503 },
  { name: 'Shanghai',      lat: 31.2304,  lng: 121.4737 },
  { name: 'Singapore',     lat: 1.3521,   lng: 103.8198 },
  { name: 'Seoul',         lat: 37.5665,  lng: 126.9780 },
  { name: 'Bangkok',       lat: 13.7563,  lng: 100.5018 },
  { name: 'Jakarta',       lat: -6.2088,  lng: 106.8456 },
  { name: 'Hong Kong',     lat: 22.3193,  lng: 114.1694 },
  { name: 'Manila',        lat: 14.5995,  lng: 120.9842 },
  { name: 'Beijing',       lat: 39.9042,  lng: 116.4074 },
  { name: 'Taipei',        lat: 25.0330,  lng: 121.5654 },
  { name: 'Kuala Lumpur',  lat: 3.1390,   lng: 101.6869 },
  { name: 'Saigon',        lat: 10.8231,  lng: 106.6297 },
  { name: 'Hanoi',         lat: 21.0285,  lng: 105.8542 },

  // Oceania
  { name: 'Sydney',        lat: -33.8688, lng: 151.2093 },
  { name: 'Melbourne',     lat: -37.8136, lng: 144.9631 },
  { name: 'Auckland',      lat: -36.8485, lng: 174.7633 },
  { name: 'Fiji',          lat: -17.7134, lng: 178.0650 },
  { name: 'Perth',         lat: -31.9505, lng: 115.8605 },
  { name: 'Brisbane',      lat: -27.4698, lng: 153.0251 },
  { name: 'Wellington',    lat: -41.2865, lng: 174.7762 },
  { name: 'Port Moresby',  lat: -9.4438,  lng: 147.1803 }
];

// Simplified coordinates of continents to render an accurate 3D Earth shape
const POLYGONS = [
  // North America
  [
    [-168, 66], [-150, 70], [-120, 70], [-90, 70], [-80, 75], [-70, 72], [-60, 60], [-50, 60],
    [-55, 48], [-60, 45], [-70, 45], [-75, 40], [-80, 32], [-81, 25], [-80, 9], [-82, 9],
    [-90, 14], [-100, 15], [-105, 20], [-110, 23], [-115, 33], [-125, 48], [-140, 60], [-160, 60]
  ],
  // South America
  [
    [-77, 8], [-80, 5], [-81, -5], [-81, -12], [-75, -20], [-71, -30], [-74, -40], [-73, -50],
    [-71, -55], [-50, -50], [-40, -40], [-43, -30], [-38, -20], [-35, -6], [-40, -2], [-50, 5],
    [-60, 10], [-70, 10], [-75, 8]
  ],
  // Africa
  [
    [-17, 32], [-17, 15], [-15, 5], [0, 5], [10, 5], [10, -20], [20, -34], [30, -30],
    [40, -20], [40, -10], [50, 5], [51, 11], [43, 12], [34, 27], [33, 31], [30, 31],
    [20, 32], [10, 37], [0, 36], [-5, 36]
  ],
  // Eurasia (Europe & Asia)
  [
    [-9, 36], [-9, 43], [-5, 48], [5, 50], [5, 60], [10, 60], [10, 65], [20, 70],
    [25, 71], [30, 68], [40, 68], [50, 68], [60, 70], [70, 73], [80, 75], [100, 77],
    [120, 77], [140, 75], [160, 73], [170, 70], [180, 65], [180, 60], [160, 55], [160, 50],
    [150, 45], [140, 35], [120, 35], [120, 23], [109, 18], [105, 10], [100, 5], [96, 16],
    [88, 22], [77, 8], [72, 20], [60, 25], [50, 25], [45, 20], [35, 15], [35, 30],
    [30, 30], [30, 40], [40, 40], [40, 45], [25, 45], [20, 40], [15, 40], [12, 43],
    [15, 40], [15, 38], [12, 38], [12, 43], [5, 36]
  ],
  // Australia
  [
    [113, -26], [114, -15], [123, -15], [136, -12], [142, -11], [146, -15], [153, -28], [150, -35],
    [143, -38], [115, -35]
  ],
  // Greenland
  [
    [-60, 70], [-50, 80], [-20, 83], [-30, 69], [-43, 60]
  ],
  // Madagascar
  [
    [47, -25], [49, -15], [50, -12], [47, -16], [43, -25]
  ],
  // Japan
  [
    [130, 32], [132, 34], [136, 35], [140, 38], [142, 43], [140, 40], [135, 35]
  ],
  // Great Britain & Ireland
  [
    [-8, 52], [-4, 58], [-2, 55], [-1, 51], [-5, 50]
  ],
  // Iceland
  [
    [-24, 65], [-14, 65], [-15, 63], [-22, 63]
  ],
  // New Zealand
  [
    [166, -46], [178, -37], [174, -41], [168, -46]
  ],
  // Antarctica
  [
    [-180, -75], [180, -75], [180, -85], [-180, -85]
  ]
];

const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ'.split('');

const NeuralGlobe = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // ── Pre-render Matrix Characters Sprite Sheet ──────────
    const charSheet = document.createElement('canvas');
    const charSize = 24;
    charSheet.width = MATRIX_CHARS.length * charSize;
    charSheet.height = charSize;
    const csCtx = charSheet.getContext('2d');
    csCtx.font = `bold ${charSize}px 'Courier New', monospace`;
    csCtx.textAlign = 'center';
    csCtx.textBaseline = 'middle';
    csCtx.fillStyle = '#00F0D7'; // Glowing cyan
    MATRIX_CHARS.forEach((char, idx) => {
      csCtx.fillText(char, idx * charSize + charSize / 2, charSize / 2);
    });

    // ── Sizing ─────────────────────────────────────────
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width  = rect.width  * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width  = rect.width  + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width  / window.devicePixelRatio;
    const H = () => canvas.height / window.devicePixelRatio;

    // Globe radius
    const R = () => Math.min(W(), H()) * 0.36;

    // ── Lat/Lng → Unit sphere ────────────────────────
    const latLngToXYZ = (lat, lng) => {
      const phi   = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return {
        ox: -Math.sin(phi) * Math.cos(theta),
        oy:  Math.cos(phi),
        oz:  Math.sin(phi) * Math.sin(theta),
      };
    };

    // ── Unit sphere → Lat/Lng ────────────────────────
    const xyzToLatLng = (x, y, z) => {
      const phi = Math.acos(Math.max(-1, Math.min(1, y)));
      const lat = 90 - phi * (180 / Math.PI);
      let theta = Math.atan2(z, -x);
      if (theta < 0) theta += Math.PI * 2;
      const lng = theta * (180 / Math.PI) - 180;
      return { lat, lng };
    };

    // ── Offscreen Continent Mask Canvas ──────────────
    const offscreen = document.createElement('canvas');
    offscreen.width = 360;
    offscreen.height = 180;
    const oCtx = offscreen.getContext('2d');

    // Fill black (ocean)
    oCtx.fillStyle = '#000000';
    oCtx.fillRect(0, 0, 360, 180);

    // Draw continents in white (land)
    oCtx.fillStyle = '#ffffff';
    POLYGONS.forEach(poly => {
      oCtx.beginPath();
      poly.forEach((pt, idx) => {
        const x = pt[0] + 180;
        const y = 90 - pt[1];
        if (idx === 0) oCtx.moveTo(x, y);
        else oCtx.lineTo(x, y);
      });
      oCtx.closePath();
      oCtx.fill();
    });

    const imgData = oCtx.getImageData(0, 0, 360, 180);
    const isLand = (lng, lat) => {
      const x = Math.round(lng + 180);
      const y = Math.round(90 - lat);
      if (x < 0 || x >= 360 || y < 0 || y >= 180) return false;
      const idx = (y * 360 + x) * 4;
      return imgData.data[idx] > 128; // check red channel
    };

    // ── Fibonacci sphere dots ────────────────────────
    const DOTS = 600;
    const sphereDots = [];
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < DOTS; i++) {
      const y = 1 - (i / (DOTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;

      const ox = Math.cos(theta) * r;
      const oy = y;
      const oz = Math.sin(theta) * r;

      const { lat, lng } = xyzToLatLng(ox, oy, oz);
      const land = isLand(lng, lat);

      sphereDots.push({
        ox,
        oy,
        oz,
        isLand: land,
        size: land ? (1.2 + Math.random() * 1.6) : 0.6,
        bright: land ? (0.45 + Math.random() * 0.55) : 0.12,
        // matrix char
        char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
        charAlpha: 0,
        charTimer: Math.random() * 120,
        charTTL: 20 + Math.random() * 60,
      });
    }

    // ── Nodes (Cities & Uniform Neural Junctions) ─────
    const allNodes = CITIES.map(c => ({
      name: c.name,
      lat: c.lat,
      lng: c.lng,
      isNamed: true,
      ...latLngToXYZ(c.lat, c.lng),
      pulsePhase: Math.random() * Math.PI * 2,
      active: false,
      activeTimer: 0,
    }));

    // Generate additional neural junctions uniformly using a Fibonacci sphere to avoid empty spaces
    const totalCandidates = 150;
    for (let i = 0; i < totalCandidates; i++) {
      const y = 1 - (i / (totalCandidates - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;

      const ox = Math.cos(theta) * r;
      const oy = y;
      const oz = Math.sin(theta) * r;

      const { lat, lng } = xyzToLatLng(ox, oy, oz);
      const land = isLand(lng, lat);

      // Check distance from existing cities to prevent overlaps
      let nearCity = false;
      for (let c of allNodes) {
        const dist = Math.sqrt((ox - c.ox)**2 + (oy - c.oy)**2 + (oz - c.oz)**2);
        if (dist < 0.10) {
          nearCity = true;
          break;
        }
      }

      // 100% chance on land, 35% chance in oceans (e.g. Satellite links, Oceanic Stations)
      // This completely covers the empty spaces across the entire globe!
      if (!nearCity && (land || Math.random() < 0.35)) {
        allNodes.push({
          name: land ? `NODE-${String(i).padStart(3, '0')}` : `NET-${String(i).padStart(3, '0')}`,
          lat,
          lng,
          isNamed: false,
          ox, oy, oz,
          pulsePhase: Math.random() * Math.PI * 2,
          active: false,
          activeTimer: 0,
        });
      }
    }

    // Calculate nearest neighbors for the neural mesh (Constellation Star-Map effect)
    allNodes.forEach((node, i) => {
      const dists = [];
      allNodes.forEach((other, j) => {
        if (i === j) return;
        const dx = node.ox - other.ox;
        const dy = node.oy - other.oy;
        const dz = node.oz - other.oz;
        const d = Math.sqrt(dx*dx + dy*dy + dz*dz);
        dists.push({ index: j, dist: d });
      });
      dists.sort((a, b) => a.dist - b.dist);
      // Connect to the 3 closest nodes within regional threshold (0.24 unit sphere dist)
      node.neighbors = dists
        .filter(item => item.dist < 0.24)
        .slice(0, 3)
        .map(item => item.index);
    });

    // ── Active call arcs ─────────────────────────────
    let arcs = [];

    // Spawn 20 arcs per second — steady flow of connections
    let lastArcTime = 0;
    const ARC_INTERVAL = 1.0 / 12; // 12 arcs per second

    // 3D Neon Color Themes
    const ARC_COLORS = [
      { stroke: 'rgba(0, 240, 255, ', glow: 'rgba(0, 240, 255, 0.8)' },    // Neon Cyan
      { stroke: 'rgba(255, 50, 150, ', glow: 'rgba(255, 50, 150, 0.8)' },  // Neon Pink
      { stroke: 'rgba(170, 40, 255, ', glow: 'rgba(170, 40, 255, 0.8)' },  // Neon Purple
      { stroke: 'rgba(0, 255, 170, ', glow: 'rgba(0, 255, 170, 0.8)' },    // Neon Teal
      { stroke: 'rgba(255, 200, 0, ', glow: 'rgba(255, 200, 0, 0.8)' },    // Neon Gold
      { stroke: 'rgba(100, 220, 255, ', glow: 'rgba(100, 220, 255, 0.8)' }, // Light Blue
    ];

    // Keep track of recently-used from/to pairs to alternate routes
    let recentPairs = [];

    const spawnArc = (t) => {
      // Use loop accumulator to maintain correct spawning rate even when frame duration varies
      let spawnCount = 0;
      while (t - lastArcTime >= ARC_INTERVAL && spawnCount < 4) {
        lastArcTime += ARC_INTERVAL;
        spawnCount++;

        // Pick a random source node
        const i = Math.floor(Math.random() * allNodes.length);
        // Pick a random destination that is NOT the same and NOT in recent pairs
        let j;
        let attempts = 0;
        do {
          j = Math.floor(Math.random() * allNodes.length);
          attempts++;
        } while ((j === i || recentPairs.some(p => p[0] === i && p[1] === j)) && attempts < 25);

        // Track recent pairs (keep last 50)
        recentPairs.push([i, j]);
        if (recentPairs.length > 50) recentPairs.shift();

        // Activate source and destination nodes
        allNodes[i].active = true;
        allNodes[i].activeTimer = 60;
        allNodes[j].active = true;
        allNodes[j].activeTimer = 60;

        const colorTheme = ARC_COLORS[Math.floor(Math.random() * ARC_COLORS.length)];

        arcs.push({
          from: i,
          to: j,
          progress: 0,
          alpha: 1,
          speed: 0.006 + Math.random() * 0.009, // Slower majestical speed
          colorTheme,
        });
      }
      // If we hit the per-frame cap, sync lastArcTime to avoid snowballing
      if (spawnCount >= 4) lastArcTime = t;

      // Cap array size for performance
      if (arcs.length > 35) {
        arcs = arcs.slice(arcs.length - 35);
      }
    };

    // ── Rotation state ────────────────────────────────
    let rotX = 0.25, rotY = 0;
    let velX = 0, velY = 0.004;
    let dragging = false;
    let lastMX = 0, lastMY = 0;

    // Cursor follow (gentle tilt toward cursor)
    let targetTiltX = 0, targetTiltY = 0;
    let cursorX = W() / 2, cursorY = H() / 2;

    // ── Interaction ───────────────────────────────────
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      cursorX = e.clientX - rect.left;
      cursorY = e.clientY - rect.top;
      // Gentle tilt toward cursor
      targetTiltY =  ((cursorX / W()) - 0.5) * 0.18;
      targetTiltX = -((cursorY / H()) - 0.5) * 0.12;

      if (dragging) {
        const dx = e.clientX - lastMX;
        const dy = e.clientY - lastMY;
        velY = dx * 0.006;
        velX = dy * 0.006;
        rotY += dx * 0.006;
        rotX += dy * 0.006;
        lastMX = e.clientX; lastMY = e.clientY;
      }
    };
    const onMouseDown = (e) => { dragging = true; lastMX = e.clientX; lastMY = e.clientY; };
    const onMouseUp   = () => { dragging = false; };

    const onTouchStart = (e) => { dragging = true; lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      if (!dragging) return;
      const dx = e.touches[0].clientX - lastMX;
      const dy = e.touches[0].clientY - lastMY;
      velY = dx * 0.006; velX = dy * 0.006;
      rotY += dx * 0.006; rotX += dy * 0.006;
      lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { dragging = false; };

    canvas.addEventListener('mousemove',  onMouseMove);
    canvas.addEventListener('mousedown',  onMouseDown);
    canvas.addEventListener('mouseup',    onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: true });
    canvas.addEventListener('touchend',   onTouchEnd);

    // ── Rotation helper ───────────────────────────────
    const rotate = (ox, oy, oz) => {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      let x = cosY * ox + sinY * oz;
      let z = -sinY * ox + cosY * oz;
      let y = oy;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const ny = cosX * y - sinX * z;
      const nz = sinX * y + cosX * z;
      return { x, y: ny, z: nz };
    };

    const project = (ox, oy, oz, cx, cy, radius) => {
      const { x, y, z } = rotate(ox, oy, oz);
      return { px: cx + x * radius, py: cy + y * radius, z };
    };

    // ── Elevated arc point — arcs rise ABOVE the globe surface ─
    const arcPoint = (p1, p2, t, cx, cy, radius) => {
      // Interpolate on sphere surface
      const ax = p1.ox + (p2.ox - p1.ox) * t;
      const ay = p1.oy + (p2.oy - p1.oy) * t;
      const az = p1.oz + (p2.oz - p1.oz) * t;
      const len = Math.sqrt(ax*ax + ay*ay + az*az);
      const nx = ax / len, ny = ay / len, nz = az / len;

      // Calculate distance between the two endpoints for height scaling
      const dx = p2.ox - p1.ox, dy = p2.oy - p1.oy, dz = p2.oz - p1.oz;
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

      // Parabolic height: peaks at t=0.5, zero at t=0 and t=1
      const height = 4 * t * (1 - t) * dist * 0.35;
      const elevatedRadius = radius * (1.0 + height);

      return project(nx, ny, nz, cx, cy, elevatedRadius);
    };

    // ── Draw earth-like latitude/longitude grid ────────
    const drawGrid = (cx, cy, radius, alpha) => {
      ctx.save();
      ctx.strokeStyle = `rgba(0,210,200,${0.035 * alpha})`;
      ctx.lineWidth = 0.5;

      // Latitude lines (fewer lines, larger step)
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (90 - lat) * (Math.PI / 180);
        const yUnit = Math.cos(phi);
        const rUnit = Math.sin(phi);
        ctx.beginPath();
        for (let lng = 0; lng <= 360; lng += 8) {
          const theta = lng * (Math.PI / 180);
          const ox = -rUnit * Math.cos(theta);
          const oz =  rUnit * Math.sin(theta);
          const { px, py, z } = project(ox, yUnit, oz, cx, cy, radius);
          if (z < -0.1) continue;
          if (lng === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Longitude lines (fewer lines, larger step)
      for (let lng = 0; lng < 360; lng += 30) {
        const theta = lng * (Math.PI / 180);
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 8) {
          const phi = (90 - lat) * (Math.PI / 180);
          const yUnit = Math.cos(phi);
          const rUnit = Math.sin(phi);
          const ox = -rUnit * Math.cos(theta);
          const oz =  rUnit * Math.sin(theta);
          const { px, py, z } = project(ox, yUnit, oz, cx, cy, radius);
          if (z < -0.1) continue;
          if (lat === -90) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    // ── Main Draw ─────────────────────────────────────
    let time = 0;
    let revealProgress = 0;
    let isVisible = false;

    // IntersectionObserver to FULLY pause/resume rAF when off-screen
    const startLoop = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    const stopLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const visObs = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastArcTime = time; // Reset arc timer to prevent burst spawning
          startLoop();
        } else if (revealProgress <= 0) {
          stopLoop();
        }
      },
      { rootMargin: '300px' }
    );
    if (sectionRef.current) visObs.observe(sectionRef.current);

    const draw = () => {
      if (!isVisible && revealProgress <= 0) {
        stopLoop();
        return;
      }
      rafRef.current = requestAnimationFrame(draw);
      time += 0.016;

      const w = W(), h = H(), cx = w / 2, cy = h / 2, radius = R();

      // Auto spin + cursor-follow tilt
      if (!dragging) {
        rotY += velY;
        velY  = velY * 0.97 + (Math.abs(velY) < 0.001 ? 0.003 : 0);
        rotX += velX;
        velX *= 0.94;
        rotX += (targetTiltX - rotX) * 0.012;
      }
      rotX = Math.max(-0.7, Math.min(0.7, rotX));

      ctx.clearRect(0, 0, w, h);

      // Spawn active connections
      spawnArc(time);

      // ── Globe atmosphere glow ──────────────────────
      const atmoGrd = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.15);
      atmoGrd.addColorStop(0, `rgba(0,210,200,${0.07 * revealProgress})`);
      atmoGrd.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = atmoGrd;
      ctx.fill();

      // ── Ocean fill ────────────────────────────────
      const oceanGrd = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.2, 0, cx, cy, radius);
      oceanGrd.addColorStop(0, `rgba(0,25,50,${0.9 * revealProgress})`);
      oceanGrd.addColorStop(1, `rgba(0,8,22,${0.85 * revealProgress})`);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrd;
      ctx.fill();

      // ── Latitude/Longitude grid ─────────────────────
      drawGrid(cx, cy, radius, revealProgress);

      // ── Sphere dots (Matrix & Landmasses) - Projected and drawn in a single fast loop ──
      for (let i = 0; i < DOTS; i++) {
        const n = sphereDots[i];
        if (!n) continue;
        const { x, y, z } = rotate(n.ox, n.oy, n.oz);
        if (z < 0) continue; // Skip back-side dots
        
        const px = cx + x * radius;
        const py = cy + y * radius;
        const alpha = ((z + 1) / 2) * revealProgress * n.bright;

        // Draw Dot
        ctx.beginPath();
        ctx.arc(px, py, n.size * ((z + 1.5) / 2.5), 0, Math.PI * 2);
        
        if (n.isLand) {
          ctx.fillStyle = `rgba(0,225,205,${alpha * 0.75})`;
          ctx.fill();

          // Matrix character flicker overlay on land
          n.charTimer++;
          if (n.charTimer > n.charTTL) {
            n.charTimer = 0;
            n.charTTL = 20 + Math.random() * 60;
            n.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
            n.charAlpha = 0.75 + Math.random() * 0.25;
          }
          n.charAlpha *= 0.975;
          if (n.charAlpha > 0.04 && z > 0.15) {
            const charIdx = MATRIX_CHARS.indexOf(n.char);
            if (charIdx !== -1) {
              const fs = n.size * 5.2 * ((z + 1.5) / 2.5);
              ctx.globalAlpha = Math.max(0, Math.min(1, n.charAlpha * alpha * 1.35));
              ctx.drawImage(
                charSheet,
                charIdx * charSize, 0, charSize, charSize,
                px - fs / 2, py - n.size * 4.2 - fs / 2, fs, fs
              );
            }
          }
        } else {
          // Ocean dot
          ctx.fillStyle = `rgba(0,105,125,${alpha * 0.16})`;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0; // Reset globalAlpha

      // ── Globe outline ────────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,210,200,${0.3 * revealProgress})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Project all persistent nodes in-place (No object allocation!)
      for (let i = 0; i < allNodes.length; i++) {
        const c = allNodes[i];
        const { x, y, z } = rotate(c.ox, c.oy, c.oz);
        c.px = cx + x * radius;
        c.py = cy + y * radius;
        c.z = z;
      }

      // ── Draw Neural Mesh (Constellation Lines) ──────
      ctx.save();
      ctx.lineWidth = 0.7;
      for (let i = 0; i < allNodes.length; i++) {
        const c = allNodes[i];
        if (c.z < -0.1) continue;
        const alpha = ((c.z + 1) / 2) * revealProgress;

        for (let k = 0; k < c.neighbors.length; k++) {
          const nbIdx = c.neighbors[k];
          const other = allNodes[nbIdx];
          if (other.z < -0.1) continue;
          
          // Only draw once per pair
          if (i >= nbIdx) continue;

          const lineAlpha = alpha * 0.13;
          ctx.strokeStyle = `rgba(0, 210, 200, ${lineAlpha})`;
          ctx.beginPath();
          ctx.moveTo(c.px, c.py);
          ctx.lineTo(other.px, other.py);
          ctx.stroke();
        }
      }
      ctx.restore();

      // ── Draw Nodes ─────────────────────────────────
      for (let i = 0; i < allNodes.length; i++) {
        const c = allNodes[i];
        if (c.z < -0.05) continue;
        const alpha = ((c.z + 1) / 2) * revealProgress;
        
        // Update active timers
        c.activeTimer = Math.max(0, c.activeTimer - 1);
        if (c.activeTimer === 0) c.active = false;

        const pulse = 0.6 + 0.4 * Math.sin(time * 3.5 + c.pulsePhase);

        if (c.active) {
          // Pulsing ring
          for (let r = 1; r <= 3; r++) {
            ctx.beginPath();
            ctx.arc(c.px, c.py, 2.5 + r * 4.5 * pulse, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 210, ${(0.5 / r) * alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
          // Bright dot
          ctx.beginPath();
          ctx.arc(c.px, c.py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        } else {
          // Normal dot
          ctx.beginPath();
          ctx.arc(c.px, c.py, c.isNamed ? 2.5 : 1.5, 0, Math.PI * 2);
          ctx.fillStyle = c.isNamed 
            ? `rgba(0, 215, 200, ${alpha * pulse * 0.85})`
            : `rgba(0, 215, 200, ${alpha * pulse * 0.55})`;
          ctx.fill();
        }
      }

      // ── Draw City Labels (Optimized: Set font once!) ──
      ctx.save();
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.textAlign = 'center';
      for (let i = 0; i < allNodes.length; i++) {
        const c = allNodes[i];
        if (c.isNamed && c.z > 0.35) {
          const alpha = ((c.z + 1) / 2) * revealProgress;
          if (alpha > 0.4) {
            ctx.fillStyle = `rgba(215,255,250,${alpha * 0.85})`;
            ctx.fillText(c.name, c.px, c.py - 10);
          }
        }
      }
      ctx.restore();

      // ── Connection arcs (live calls) - Multi-pass high-performance neon stroke ──
      for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i];
        arc.progress = Math.min(1, arc.progress + arc.speed);
        if (arc.progress >= 1) arc.alpha -= 0.015; // Slow fade for longer visibility

        const from = allNodes[arc.from];
        const to   = allNodes[arc.to];
        const steps = 24;
        const drawSteps = Math.floor(arc.progress * steps);

        const arcAlpha = arc.alpha * 0.92 * revealProgress;

        // Precompute points for this arc to avoid multiple arcPoint calculations
        const pts = [];
        for (let s = 0; s <= drawSteps; s++) {
          const t = s / steps;
          const pt = arcPoint(from, to, t, cx, cy, radius);
          pts.push(pt);
        }

        // Pass 1: Wide diffuse glow (drawn with very low opacity, no slow shadowBlur)
        ctx.lineWidth = 7.0;
        ctx.beginPath();
        let started = false;
        for (let s = 0; s < pts.length; s++) {
          const pt = pts[s];
          if (pt.z < -0.5) { started = false; continue; }
          const depthFade = Math.max(0.15, Math.min(1, (pt.z + 0.5) / 1.0));
          ctx.strokeStyle = `${arc.colorTheme.stroke}${arcAlpha * 0.12 * depthFade})`;
          if (!started) { ctx.moveTo(pt.px, pt.py); started = true; }
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.stroke();

        // Pass 2: Medium glowing line
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        started = false;
        for (let s = 0; s < pts.length; s++) {
          const pt = pts[s];
          if (pt.z < -0.5) { started = false; continue; }
          const depthFade = Math.max(0.15, Math.min(1, (pt.z + 0.5) / 1.0));
          ctx.strokeStyle = `${arc.colorTheme.stroke}${arcAlpha * 0.38 * depthFade})`;
          if (!started) { ctx.moveTo(pt.px, pt.py); started = true; }
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.stroke();

        // Pass 3: Thin white-hot core
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        started = false;
        for (let s = 0; s < pts.length; s++) {
          const pt = pts[s];
          if (pt.z < -0.6) { started = false; continue; }
          const depthFade = Math.max(0.1, Math.min(1, (pt.z + 0.6) / 1.2));
          ctx.strokeStyle = `rgba(255, 255, 255, ${arcAlpha * 0.9 * depthFade})`;
          if (!started) { ctx.moveTo(pt.px, pt.py); started = true; }
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.stroke();

        // Bright glowing head of arc (No slow shadowBlur)
        if (arc.progress < 1) {
          const headT = arc.progress;
          const head = arcPoint(from, to, headT, cx, cy, radius);
          if (head.z > -0.5) {
            // Outer glow circle
            ctx.beginPath();
            ctx.arc(head.px, head.py, 7, 0, Math.PI * 2);
            ctx.fillStyle = `${arc.colorTheme.stroke}${arc.alpha * 0.22})`;
            ctx.fill();
            
            // Medium glow circle
            ctx.beginPath();
            ctx.arc(head.px, head.py, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = `${arc.colorTheme.stroke}${arc.alpha * 0.6})`;
            ctx.fill();
            
            // Core dot
            ctx.beginPath();
            ctx.arc(head.px, head.py, 2.0, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${arc.alpha * 0.95})`;
            ctx.fill();
          }
        }
      }

      // Remove dead arcs
      arcs = arcs.filter(a => a.alpha > 0);
    };

    startLoop();

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      end: 'bottom 15%',
      scrub: 1.5,
      onUpdate: (self) => { revealProgress = self.progress; },
      onEnter: () => { revealProgress = 1; isVisible = true; startLoop(); },
      onLeave: () => { revealProgress = 0; isVisible = false; stopLoop(); },
      onEnterBack: () => { revealProgress = 1; isVisible = true; startLoop(); },
      onLeaveBack: () => { revealProgress = 0; isVisible = false; stopLoop(); },
    });

    // If section is already scrolled past on mount, set revealProgress immediately
    setTimeout(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.2) {
          revealProgress = 1;
        }
      }
    }, 100);

    return () => {
      stopLoop();
      visObs.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove',  onMouseMove);
      canvas.removeEventListener('mousedown',  onMouseDown);
      canvas.removeEventListener('mouseup',    onMouseUp);
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
      style={{ scrollMarginTop: '80px' }}
    >
      <div className="container">
        <div
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 2 }}
        >
          <span className="section-label" style={{ color: 'var(--accent-cyan)' }}>
            Global Reach
          </span>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>
            Connected{' '}
            <span style={{ background: 'linear-gradient(90deg, #00E5FF, #7000FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Worldwide
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto' }}>
            Live connections firing across the globe — every arc is a real-world call happening right now. Drag to rotate. Tilt with your cursor.
          </p>
        </div>

        <div className="neural-globe-wrapper reveal">
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
          />

          <div style={{
            position: 'absolute', bottom: '1.5rem', left: '1.5rem',
            background: 'rgba(0,229,255,0.06)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,229,255,0.2)', borderRadius: '12px',
            padding: '0.75rem 1.25rem', color: 'rgba(255,255,255,0.7)',
            fontSize: '0.78rem', fontWeight: '500', letterSpacing: '0.05em', pointerEvents: 'none',
          }}>
            ⟳ Drag · Tilt with cursor
          </div>

          <div style={{
            position: 'absolute', bottom: '1.5rem', right: '1.5rem',
            background: 'rgba(0,255,180,0.06)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,255,180,0.2)', borderRadius: '12px',
            padding: '0.75rem 1.25rem', color: 'rgba(255,255,255,0.7)',
            fontSize: '0.78rem', fontWeight: '500', letterSpacing: '0.05em', pointerEvents: 'none',
          }}>
            ● 100+ Neural Nodes · Live Arcs
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeuralGlobe;
