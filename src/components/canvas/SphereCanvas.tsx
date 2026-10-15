"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useCanvasFrameloop, clampDelta } from "@/hooks/useCanvasFrameloop";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      const dt = clampDelta(delta);
      meshRef.current.rotation.x += dt * 0.2;
      meshRef.current.rotation.y += dt * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.2}>
      <MeshDistortMaterial
        color="#c9a84c"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}

export function SphereCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameloop = useCanvasFrameloop(containerRef);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]} frameloop={frameloop}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
