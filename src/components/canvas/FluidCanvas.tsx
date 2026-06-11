"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
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

export function FluidCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none dark:opacity-40 opacity-20 transition-opacity duration-500">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
