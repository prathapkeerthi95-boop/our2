import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating Particles (soft on white) ── */
const ParticleField = ({ count = 200 }) => {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 60;
      const speed = 0.001 + Math.random() / 300;
      const xFactor = -25 + Math.random() * 50;
      const yFactor = -12 + Math.random() * 24;
      const zFactor = -10 + Math.random() * 20;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t) * 0.3 + 0.5;
      dummy.position.set(
        a * xFactor / 5 + Math.cos((t / 10) * factor) * 2,
        b * yFactor / 5 + Math.sin((t / 10) * factor) * 2,
        b * zFactor / 5 + Math.cos((t / 8) * factor) * 1.5
      );
      dummy.scale.setScalar(s * 0.12);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#FF2A54" transparent opacity={0.3} />
    </instancedMesh>
  );
};

/* ── Central Glass Crystal ── */
const GlassCore = () => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.15) * 0.08;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef} className="glass-core-group">
        {/* Glass Icosahedron */}
        <mesh>
          <icosahedronGeometry args={[2.5, 2]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.1}
            transmission={0.95}
            thickness={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.5}
            transparent
            opacity={1}
          />
        </mesh>

        {/* Orbital Ring 1 */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[3.8, 0.02, 16, 100]} />
          <meshBasicMaterial color="#FF2A54" transparent opacity={0.4} />
        </mesh>

        {/* Orbital Ring 2 */}
        <mesh rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[4.4, 0.015, 16, 100]} />
          <meshBasicMaterial color="#7000FF" transparent opacity={0.3} />
        </mesh>

        {/* Orbital Ring 3 */}
        <mesh rotation={[Math.PI / 6, Math.PI / 4, 0]}>
          <torusGeometry args={[5, 0.01, 16, 100]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const Background3D = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 1,
      pointerEvents: 'none',
    }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FF2A54" />
        <directionalLight position={[-5, -3, -5]} intensity={1.2} color="#7000FF" />
        <pointLight position={[0, 2, 6]} intensity={0.8} color="#00E5FF" />
        <Environment preset="city" />
        <GlassCore />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default Background3D;
