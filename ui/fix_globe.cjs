const fs = require('fs');

const path = 'd:/Our Pro 2/ui/src/components/NeuralGlobe.jsx';
let content = fs.readFileSync(path, 'utf8');

// The file got messed up at the top. Let's find the start of the GlobeErrorBoundary and replace everything before it with the correct imports and constants.

const correctTop = `import React, { useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// EARTH TEXTURE URLS — pinned to npm three@0.128.0 (permanently cached)
// ─────────────────────────────────────────────────────────────────────────────
const BASE = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/textures/planets';
const EARTH_DAY_URL      = \`\${BASE}/earth_atmos_2048.jpg\`;
const EARTH_NIGHT_URL    = \`\${BASE}/earth_lights_2048.png\`;
const EARTH_CLOUDS_URL   = \`\${BASE}/earth_clouds_2048.png\`;
const EARTH_NORMAL_URL   = \`\${BASE}/earth_normal_2048.jpg\`;
const EARTH_SPECULAR_URL = \`\${BASE}/earth_specular_2048.jpg\`;

// ─────────────────────────────────────────────────────────────────────────────
// ARC COLORS
// ─────────────────────────────────────────────────────────────────────────────
const ARC_COLORS = ['#00E5CC', '#0066FF', '#00E5CC', '#0066FF', '#00E5CC', '#0066FF'];

// ─────────────────────────────────────────────────────────────────────────────
// ERROR BOUNDARY — prevents Canvas crash from blanking the whole page
// ─────────────────────────────────────────────────────────────────────────────
class GlobeErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', letterSpacing: '0.1em'
        }}>
          ● GLOBE LOADING
        </div>
      );
    }
    return this.props.children;
  }
}
`;

// Find where "function EarthGlobe" starts, or some stable marker
const marker = 'function EarthGlobe';
const markerIndex = content.indexOf(marker);

if (markerIndex > -1) {
  // Replace everything before the marker with correctTop
  content = correctTop + "\n// ─────────────────────────────────────────────────────────────────────────────\n" + content.substring(markerIndex);
  
  // Also fix deep space background color
  content = content.replace(/background:\s*['"]#030712['"]/g, "background: '#060C14'");
  
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully fixed NeuralGlobe.jsx');
} else {
  console.log('Error: Could not find EarthGlobe marker in NeuralGlobe.jsx');
}
