"use client";

import { ReactLenis } from 'lenis/react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    // Changing options recreates the Lenis instance without remounting children.
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reducedMotion }}>
      {/* Skip transform/layout animations (opacity fades still run) for users who prefer reduced motion. */}
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </ReactLenis>
  );
}
