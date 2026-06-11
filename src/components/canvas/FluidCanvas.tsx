"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Torus, Sphere, Octahedron, Environment } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 5000;
const initialParticles = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const r = 2.5 * Math.cbrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos(2 * Math.random() - 1);
  
  initialParticles[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  initialParticles[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  initialParticles[i * 3 + 2] = r * Math.cos(phi);
}

function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => initialParticles, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c9a84c"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += delta * (0.1 + i * 0.05);
        child.rotation.y += delta * (0.15 - i * 0.05);
      });
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1.5, 0.5, 32, 64]} position={[3, 0.5, -2]}>
        <meshPhysicalMaterial 
          color="#050505"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Torus>
      <Sphere args={[0.9, 64, 64]} position={[-1.5, -1.2, -1]}>
        <meshPhysicalMaterial 
          color="#c9a84c"
          metalness={0.8}
          roughness={0.2}
          transmission={0.4}
          ior={1.5}
          thickness={0.5}
        />
      </Sphere>
      <Octahedron args={[0.5]} position={[0.5, 2.2, -3]}>
        <meshPhysicalMaterial 
          color="#1a1a1a"
          metalness={1}
          roughness={0.2}
        />
      </Octahedron>
    </group>
  );
}

export function FluidCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 opacity-60">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#c9a84c" />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Environment preset="city" />
        <FloatingShapes />
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
