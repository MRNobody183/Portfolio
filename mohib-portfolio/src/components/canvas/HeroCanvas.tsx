"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function HeroMesh() {
  const meshRef = useRef<Mesh>(null);
  const elapsedTime = useRef(0);

  useFrame((_, delta) => {
    if (meshRef.current) {
      elapsedTime.current += delta;
      meshRef.current.rotation.y += 0.0025;
      meshRef.current.rotation.x = Math.sin(elapsedTime.current * 0.7) * 0.1;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.45} roughness={0.18} />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <div className="hero-canvas">
      <div className="hero-gradient-ring" />
      <Canvas
        camera={{ position: [0, 0, 4], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 4, 2]} intensity={1.1} />
        <directionalLight position={[-4, -2, -4]} intensity={0.5} />
        <HeroMesh />
      </Canvas>
    </div>
  );
}
