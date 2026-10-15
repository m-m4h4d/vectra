"use client";

import { RefObject } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Only run a canvas' render loop while it is near the viewport and the user
 * hasn't asked for reduced motion. Otherwise fall back to "demand", which
 * renders a single still frame (plus re-renders on resize).
 */
export function useCanvasFrameloop(ref: RefObject<Element | null>) {
  const inView = useInView(ref, { margin: "200px 0px" });
  const reducedMotion = useReducedMotion();
  return inView && !reducedMotion ? "always" : "demand";
}

/** Cap frame delta so animations don't jump after the loop was paused. */
export const clampDelta = (delta: number) => Math.min(delta, 0.1);
