"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="relative z-10 overflow-hidden whitespace-nowrap py-16 md:py-20 bg-background flex flex-col justify-center">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/15 to-transparent absolute top-0 left-0 right-0" />
      
      <motion.div className="flex gap-8 md:gap-12 whitespace-nowrap" style={{ x }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="font-syne font-bold text-[clamp(3.5rem,8vw,7rem)] text-foreground/[0.03] uppercase tracking-[0.1em] select-none"
          >
            {children}
          </span>
        ))}
      </motion.div>
      
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/15 to-transparent absolute bottom-0 left-0 right-0" />
    </div>
  );
}
