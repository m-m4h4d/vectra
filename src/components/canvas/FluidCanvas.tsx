"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Torus, Sphere, Octahedron, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useCanvasFrameloop, clampDelta } from "@/hooks/useCanvasFrameloop";

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
      const dt = clampDelta(delta);
      ref.current.rotation.x -= dt / 15;
      ref.current.rotation.y -= dt / 20;
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
      const dt = clampDelta(delta);
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += dt * (0.1 + i * 0.05);
        child.rotation.y += dt * (0.15 - i * 0.05);
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
          clearcoat={1}
          clearcoatRoughness={0.15}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const frameloop = useCanvasFrameloop(containerRef);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 opacity-60">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]} frameloop={frameloop}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#c9a84c" />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        {/* Local light rig instead of a CDN-hosted HDR preset; rendered once. */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={4} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer form="rect" intensity={2} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 0.5, 1]} />
          <Lightformer form="rect" intensity={2} position={[5, -1, -1]} rotation-y={-Math.PI / 2} scale={[20, 0.5, 1]} />
          <Lightformer form="ring" color="#c9a84c" intensity={3} position={[-5, 2, 5]} scale={3} />
        </Environment>
        <FloatingShapes />
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
