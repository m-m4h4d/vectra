"use client";

import { useRef, type ComponentRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useScroll, type MotionValue } from "framer-motion";
import * as THREE from "three";
import { useCanvasFrameloop, clampDelta } from "@/hooks/useCanvasFrameloop";
import { useDampedProgress } from "@/hooks/useDampedProgress";

function AnimatedSphere({ progress }: { progress: MotionValue<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const step = useDampedProgress(progress);
  const spin = useRef({ x: 0, y: 0 });
  
  useFrame((state, delta) => {
    const p = step(delta);
    // 0 → 1 → 0 as the section enters, centres, then leaves the viewport.
    const focus = Math.sin(p * Math.PI);
    const dt = clampDelta(delta);
    spin.current.x += dt * 0.2;
    spin.current.y += dt * 0.3;

    if (meshRef.current) {
      meshRef.current.rotation.x = spin.current.x;
      meshRef.current.rotation.y = spin.current.y + p * Math.PI * 2;
      meshRef.current.scale.setScalar(1.2 * (0.85 + focus * 0.2));
    }
    if (materialRef.current) {
      // Calm while centred, more agitated at the edges of the section.
      materialRef.current.distort = 0.6 - focus * 0.35;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.2}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#c9a84c"
        attach="material"
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]} frameloop={frameloop}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere progress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
