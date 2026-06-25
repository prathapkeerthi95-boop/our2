import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles, Wireframe } from '@react-three/drei';
import * as THREE from 'three';

const DiagramShape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.z += 0.002;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#2a2a2e" 
          roughness={0.1} 
          metalness={0.9}
          transparent={true}
          opacity={0.8}
        />
        <Wireframe
          simplify={true}
          thickness={0.02}
          color="#00E5FF"
        />
      </mesh>
    </Float>
  );
};

const OrbitingParticles = () => {
  return (
    <>
      <Sparkles count={80} scale={6} size={2} speed={0.4} opacity={0.6} color="#FF2A54" />
      <Sparkles count={50} scale={4} size={3} speed={0.6} opacity={0.8} color="#7000FF" />
      <Sparkles count={100} scale={8} size={1} speed={0.2} opacity={0.4} color="#ffffff" />
    </>
  );
};

const ParticleDiagram = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#FF2A54" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#00E5FF" />
      
      <Environment preset="city" />
      
      <DiagramShape />
      <OrbitingParticles />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default ParticleDiagram;
