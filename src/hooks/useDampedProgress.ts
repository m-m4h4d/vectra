"use client";

import { useRef } from "react";
import { MathUtils } from "three";
import type { MotionValue } from "framer-motion";
import { clampDelta } from "@/hooks/useCanvasFrameloop";

/**
 * Eases toward a scroll progress MotionValue inside useFrame, so scroll-linked
 * scenes glide instead of stepping with each wheel tick. Call the returned
 * function once per frame with the frame delta.
 */
export function useDampedProgress(progress: MotionValue<number>, smoothing = 4) {
  const value = useRef(progress.get());
  return (delta: number) => {
    value.current = MathUtils.damp(value.current, progress.get(), smoothing, clampDelta(delta));
    return value.current;
  };
}
