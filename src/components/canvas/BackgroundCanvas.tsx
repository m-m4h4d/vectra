"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

function GeometricMesh() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={2}>
      <Sphere args={[2, 16, 16]}>
        <meshBasicMaterial color="#c9a84c" wireframe transparent opacity={0.06} />
      </Sphere>
      <Sphere args={[2.5, 8, 8]}>
        <meshBasicMaterial color="#c9a84c" wireframe transparent opacity={0.04} />
      </Sphere>
    </group>
  );
}

export function BackgroundCanvas() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-20 pointer-events-none transition-opacity duration-500">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <GeometricMesh />
      </Canvas>
    </div>
  );
}
