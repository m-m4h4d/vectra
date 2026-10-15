"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useScroll, type MotionValue } from "framer-motion";
import * as THREE from "three";
import { useCanvasFrameloop, clampDelta } from "@/hooks/useCanvasFrameloop";
import { useDampedProgress } from "@/hooks/useDampedProgress";

function GeometricMesh({ progress }: { progress: MotionValue<number> }) {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const step = useDampedProgress(progress);
  const spin = useRef(0);
  
  useFrame((state, delta) => {
    const p = step(delta);
    spin.current += clampDelta(delta);

    // The two shells counter-rotate with scroll, so they shear past each other.
    if (innerRef.current) {
      innerRef.current.rotation.x = spin.current * 0.05 + p * Math.PI * 0.5;
      innerRef.current.rotation.y = spin.current * 0.08 + p * Math.PI;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = spin.current * 0.05 - p * Math.PI * 0.3;
      outerRef.current.rotation.y = spin.current * 0.08 - p * Math.PI * 0.6;
      outerRef.current.scale.setScalar(0.9 + p * 0.3);
    }
  });

  return (
    <group scale={2}>
      <Sphere ref={innerRef} args={[2, 16, 16]}>
        <meshBasicMaterial color="#c9a84c" wireframe transparent opacity={0.06} />
      </Sphere>
      <Sphere ref={outerRef} args={[2.5, 8, 8]}>
        <meshBasicMaterial color="#c9a84c" wireframe transparent opacity={0.04} />
      </Sphere>
    </group>
  );
}

export function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameloop = useCanvasFrameloop(containerRef);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-20 pointer-events-none transition-opacity duration-500">
      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]} frameloop={frameloop}>
        <GeometricMesh progress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
