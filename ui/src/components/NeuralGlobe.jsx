import React, { useRef, useEffect, useMemo, Suspense } from 'react';
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
const EARTH_DAY_URL      = `${BASE}/earth_atmos_2048.jpg`;
const EARTH_NIGHT_URL    = `${BASE}/earth_lights_2048.png`;
const EARTH_CLOUDS_URL   = `${BASE}/earth_clouds_2048.png`;
const EARTH_NORMAL_URL   = `${BASE}/earth_normal_2048.jpg`;
const EARTH_SPECULAR_URL = `${BASE}/earth_specular_2048.jpg`;

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

// ─────────────────────────────────────────────────────────────────────────────
// ORBITAL ARC COLORS
// ─────────────────────────────────────────────────────────────────────────────
const ARC_COLORS = [
  '#00f0ff', // cyan
  '#aa00ff', // purple
  '#ff00aa', // magenta
  '#ffcc00', // yellow
  '#00ffaa', // teal
  '#0066ff', // blue
];

// ─────────────────────────────────────────────────────────────────────────────
// ATMOSPHERE SHADER (Rim Glow)
// ─────────────────────────────────────────────────────────────────────────────
const AtmosphereShader = {
  uniforms: {
    sunPosition: { value: new THREE.Vector3(1, 0, 0) },
    atmosphereColor: { value: new THREE.Color(0x0088ff) },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 atmosphereColor;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec3 viewDir = normalize(-vPosition);
      float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
      rim = pow(rim, 2.5);
      vec3 color = mix(vec3(0.0, 0.3, 1.0), vec3(0.0, 0.9, 1.0), rim);
      float alpha = rim * 0.85;
      gl_FragColor = vec4(color, alpha);
    }
  `,
};

// ─────────────────────────────────────────────────────────────────────────────
// EARTH GLOBE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function EarthGlobe({ isDragging, velocity, rotation }) {
  const globeRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();
  const nightRef = useRef();

  const textures = useTexture({
    map:          EARTH_DAY_URL,
    emissiveMap:  EARTH_NIGHT_URL,
    normalMap:    EARTH_NORMAL_URL,
    roughnessMap: EARTH_SPECULAR_URL,
  });

  const cloudTex = useTexture(EARTH_CLOUDS_URL);

  useFrame((state, delta) => {
    if (!globeRef.current) return;
    const vx = velocity.current.x;
    const vy = velocity.current.y;
    const hasVelocity = Math.abs(vx) > 0.0001 || Math.abs(vy) > 0.0001;

    if (isDragging.current || hasVelocity) {
      // Apply drag or inertia
      globeRef.current.rotation.y += vx * delta * 60;
      globeRef.current.rotation.x += vy * delta * 60;
      if (cloudsRef.current) cloudsRef.current.rotation.y += vx * delta * 60;
    } else {
      // Slow auto-rotation when not dragging and no inertia
      globeRef.current.rotation.y += 0.0012;
      if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0015;
    }
    // Clamp X rotation
    globeRef.current.rotation.x = Math.max(-0.7, Math.min(0.7, globeRef.current.rotation.x));
    // Atmosphere syncs with globe
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.copy(globeRef.current.rotation);
    }
  });

  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={globeRef} castShadow receiveShadow>
        <sphereGeometry args={[2.2, 128, 128]} />
        <meshPhongMaterial
          map={textures.map}
          emissiveMap={textures.emissiveMap}
          emissive={new THREE.Color(0xffeedd)}
          emissiveIntensity={0.6}
          normalMap={textures.normalMap}
          normalScale={new THREE.Vector2(0.5, 0.5)}
          specularMap={textures.roughnessMap}
          specular={new THREE.Color(0x226699)}
          shininess={30}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.23, 96, 96]} />
        <meshPhongMaterial
          map={cloudTex}
          transparent
          opacity={0.38}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Atmosphere rim glow */}
      <mesh ref={atmosphereRef} scale={1.12}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <shaderMaterial
          attach="material"
          args={[AtmosphereShader]}
          side={THREE.BackSide}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner atmospheric haze */}
      <mesh scale={1.05}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0x0033aa)}
          transparent
          opacity={0.04}
          side={THREE.FrontSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORBITAL ARC (one ring around the globe with glowing node)
// ─────────────────────────────────────────────────────────────────────────────
function OrbitalArc({ color, tiltX, tiltZ, speed, radius, nodeCount }) {
  const arcRef = useRef();
  const nodeRefs = useRef([]);
  const timeRef = useRef(Math.random() * Math.PI * 2);

  const points = useMemo(() => {
    const pts = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius * 0.15, // slight elliptical shape
        Math.sin(theta) * radius
      ));
    }
    return pts;
  }, [radius]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points, true);
  }, [points]);

  const linePoints = useMemo(() => curve.getPoints(256), [curve]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(linePoints);
    return geo;
  }, [linePoints]);

  // Node positions along the arc
  const nodeOffsets = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => i / nodeCount);
  }, [nodeCount]);

  useFrame((state, delta) => {
    timeRef.current += delta * speed;
    if (arcRef.current) {
      // Pulse opacity
      const pulse = 0.5 + 0.5 * Math.sin(timeRef.current * 2);
      arcRef.current.material.opacity = 0.25 + pulse * 0.25;
    }
    // Move nodes along arc
    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      const t = ((timeRef.current * 0.15 + nodeOffsets[i]) % 1 + 1) % 1;
      const pt = curve.getPoint(t);
      node.position.copy(pt);
      // Pulse scale
      const s = 0.8 + 0.4 * Math.sin(timeRef.current * 3 + i * 1.5);
      node.scale.setScalar(s);
    });
  });


  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      {/* Arc line */}
      <line ref={arcRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </line>

      {/* Glowing nodes moving along arc */}
      {nodeOffsets.map((_, i) => (
        <group key={i} ref={el => nodeRefs.current[i] = el}>
          {/* Outer glow */}
          <mesh>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {/* Core bright dot */}
          <mesh scale={0.5}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial
              color={'#ffffff'}
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {/* Point light for local bloom */}
          <pointLight color={color} intensity={0.8} distance={0.8} decay={2} />
        </group>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE CONTENT (inside Canvas)
// ─────────────────────────────────────────────────────────────────────────────
function SceneContent({ isDragging, velocity, rotation, opacity }) {
  // Cinematic lighting setup
  return (
    <>
      {/* Ambient blue fill */}
      <ambientLight color={0x0a1628} intensity={1.5} />

      {/* Main sun light (from upper-right) */}
      <directionalLight
        color={0xffffff}
        intensity={2.5}
        position={[5, 3, 3]}
        castShadow
      />

      {/* Secondary blue rim fill */}
      <pointLight
        color={0x0044ff}
        intensity={1.2}
        position={[-4, 2, -3]}
        distance={15}
        decay={2}
      />

      {/* Warm fill from below */}
      <pointLight
        color={0xff6600}
        intensity={0.3}
        position={[0, -5, 2]}
        distance={12}
        decay={2}
      />

      {/* Star field */}
      <Stars
        radius={80}
        depth={50}
        count={5000}
        factor={3}
        saturation={0.3}
        fade
        speed={0.5}
      />

      {/* Earth */}
      <Suspense fallback={null}>
        <EarthGlobe isDragging={isDragging} velocity={velocity} rotation={rotation} />
      </Suspense>

      {/* Orbital arcs — multiple rings at different tilts */}
      <OrbitalArc
        color={ARC_COLORS[0]}
        tiltX={Math.PI * 0.22}
        tiltZ={Math.PI * 0.08}
        speed={0.4}
        radius={2.85}
        nodeCount={2}
      />
      <OrbitalArc
        color={ARC_COLORS[1]}
        tiltX={-Math.PI * 0.3}
        tiltZ={Math.PI * 0.15}
        speed={0.25}
        radius={2.95}
        nodeCount={1}
      />
      <OrbitalArc
        color={ARC_COLORS[2]}
        tiltX={Math.PI * 0.5}
        tiltZ={-Math.PI * 0.12}
        speed={0.35}
        radius={3.05}
        nodeCount={2}
      />
      <OrbitalArc
        color={ARC_COLORS[3]}
        tiltX={Math.PI * 0.1}
        tiltZ={Math.PI * 0.45}
        speed={0.18}
        radius={2.9}
        nodeCount={1}
      />
      <OrbitalArc
        color={ARC_COLORS[4]}
        tiltX={-Math.PI * 0.15}
        tiltZ={-Math.PI * 0.35}
        speed={0.3}
        radius={3.1}
        nodeCount={1}
      />
      <OrbitalArc
        color={ARC_COLORS[5]}
        tiltX={Math.PI * 0.65}
        tiltZ={Math.PI * 0.25}
        speed={0.22}
        radius={2.8}
        nodeCount={2}
      />

      {/* Volumetric glow around globe — large soft light */}
      <pointLight
        color={0x002266}
        intensity={3}
        position={[0, 0, 0]}
        distance={6}
        decay={1}
      />

      {/* Bloom post-processing */}
      <EffectComposer multisampling={4}>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.7}
        />
        <Vignette eskil={false} offset={0.25} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRAG / INERTIA CONTROLLER (outside canvas, mouse events on wrapper)
// ─────────────────────────────────────────────────────────────────────────────
function useGlobeInteraction(wrapperRef) {
  const isDragging = useRef(false);
  const velocity = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let animId;
    const applyInertia = () => {
      if (!isDragging.current) {
        velocity.current.x *= 0.93;
        velocity.current.y *= 0.93;
        if (Math.abs(velocity.current.x) < 0.0001) velocity.current.x = 0;
        if (Math.abs(velocity.current.y) < 0.0001) velocity.current.y = 0;
      }
      animId = requestAnimationFrame(applyInertia);
    };
    animId = requestAnimationFrame(applyInertia);

    const onDown = (e) => {
      isDragging.current = true;
      el.style.cursor = 'grabbing';
      const point = e.touches ? e.touches[0] : e;
      lastPos.current = { x: point.clientX, y: point.clientY };
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      const point = e.touches ? e.touches[0] : e;
      const dx = (point.clientX - lastPos.current.x) * 0.004;
      const dy = (point.clientY - lastPos.current.y) * 0.004;
      velocity.current.x = dx;
      velocity.current.y = dy;
      lastPos.current = { x: point.clientX, y: point.clientY };
    };
    const onUp = () => {
      isDragging.current = false;
      el.style.cursor = 'grab';
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onUp);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mouseleave', onUp);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onUp);
    };
  }, [wrapperRef]);

  return { isDragging, velocity, rotation };
}

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND — pure CSS deep space (no per-frame getImageData crash)
// ─────────────────────────────────────────────────────────────────────────────
function DeepSpaceBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#030712',
        overflow: 'hidden',
      }}
    >
      {/* Nebula blob 1 — blue */}
      <div style={{
        position: 'absolute',
        top: '-10%', left: '-5%',
        width: '60%', height: '80%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(15,40,120,0.45) 0%, rgba(8,20,80,0.2) 50%, transparent 75%)',
        filter: 'blur(40px)',
        animation: 'nebulaFloat1 18s ease-in-out infinite alternate',
      }} />
      {/* Nebula blob 2 — cyan */}
      <div style={{
        position: 'absolute',
        bottom: '-15%', right: '-5%',
        width: '55%', height: '80%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(0,60,110,0.35) 0%, rgba(0,30,60,0.15) 55%, transparent 80%)',
        filter: 'blur(50px)',
        animation: 'nebulaFloat2 22s ease-in-out infinite alternate',
      }} />
      {/* Center atmospheric glow behind globe */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '55%', height: '90%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(0,80,180,0.2) 0%, rgba(0,40,120,0.08) 50%, transparent 75%)',
        filter: 'blur(30px)',
        animation: 'nebulaFloat3 14s ease-in-out infinite alternate',
      }} />
      {/* Film grain overlay — static CSS, no JS */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
        opacity: 0.4,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }} />
      <style>{`
        @keyframes nebulaFloat1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(3%, 4%) scale(1.08); }
        }
        @keyframes nebulaFloat2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-4%, -3%) scale(1.1); }
        }
        @keyframes nebulaFloat3 {
          from { transform: translate(-50%, -50%) scale(1); }
          to   { transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN NEURAL GLOBE SECTION
// ─────────────────────────────────────────────────────────────────────────────
const NeuralGlobe = () => {
  const sectionRef   = useRef(null);
  const wrapperRef   = useRef(null);
  const canvasWrapRef = useRef(null);
  // Use a ref for opacity so scroll ticks don't cause React re-renders
  const opacityRef   = useRef(0);

  const { isDragging, velocity, rotation } = useGlobeInteraction(wrapperRef);

  // Fade in via direct DOM style — no setState on every scroll tick
  useEffect(() => {
    const el = canvasWrapRef.current;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      end: 'top 20%',
      scrub: 1,
      onUpdate: (self) => {
        opacityRef.current = self.progress;
        if (el) el.style.opacity = self.progress;
      },
      onEnter: () => {
        opacityRef.current = 1;
        if (el) el.style.opacity = 1;
      },
      onLeaveBack: () => {
        opacityRef.current = 0;
        if (el) el.style.opacity = 0;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="neural-globe-section"
      id="antigravity"
      style={{ scrollMarginTop: '80px', position: 'relative' }}
    >
      {/* Deep space background */}
      <DeepSpaceBackground />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section header */}
        <div
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 2 }}
        >
          <span className="section-label" style={{ color: 'var(--accent-cyan)' }}>
            Global Reach
          </span>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>
            Connected{' '}
            <span style={{
              background: 'linear-gradient(90deg, #00E5FF, #7000FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Worldwide
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto' }}>
            A living, breathing Earth — orbital arcs trace the connections powering our global network. Drag to rotate.
          </p>
        </div>

        {/* Globe wrapper */}
        <div
          ref={wrapperRef}
          className="neural-globe-wrapper reveal"
          style={{ position: 'relative', cursor: 'grab' }}
        >
          {/* Three.js Canvas — always mounted, never unmounted to avoid scroll jump */}
          <div
            ref={canvasWrapRef}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
            }}
          >
            <GlobeErrorBoundary>
              <Canvas
                camera={{ position: [0, 0, 6.5], fov: 45, near: 0.1, far: 1000 }}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.2,
                  outputColorSpace: THREE.SRGBColorSpace,
                  powerPreference: 'high-performance',
                }}
                style={{ width: '100%', height: '100%', background: 'transparent' }}
                dpr={[1, 1.5]}
                frameloop="always"
              >
                <Suspense fallback={null}>
                  <SceneContent
                    isDragging={isDragging}
                    velocity={velocity}
                    rotation={rotation}
                  />
                </Suspense>
              </Canvas>
            </GlobeErrorBoundary>
          </div>

          {/* UI Overlays */}
          <div style={{
            position: 'absolute', bottom: '1.5rem', left: '1.5rem',
            background: 'rgba(0,229,255,0.06)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,229,255,0.2)', borderRadius: '12px',
            padding: '0.75rem 1.25rem', color: 'rgba(255,255,255,0.7)',
            fontSize: '0.78rem', fontWeight: '500', letterSpacing: '0.05em',
            pointerEvents: 'none', zIndex: 5,
          }}>
            ⟳ Drag · Rotate
          </div>

          <div style={{
            position: 'absolute', bottom: '1.5rem', right: '1.5rem',
            background: 'rgba(0,255,180,0.06)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,255,180,0.2)', borderRadius: '12px',
            padding: '0.75rem 1.25rem', color: 'rgba(255,255,255,0.7)',
            fontSize: '0.78rem', fontWeight: '500', letterSpacing: '0.05em',
            pointerEvents: 'none', zIndex: 5,
          }}>
            ● 100+ Neural Nodes · Live Arcs
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeuralGlobe;
