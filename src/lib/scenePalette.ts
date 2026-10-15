"use client";

import { useTheme } from "next-themes";

export type ScenePalette = {
  /** Gold used for particles, wireframes and the hero sphere. */
  accent: string;
  /** The large hero torus. */
  torus: string;
  /** The small hero octahedron. */
  octahedron: string;
};

const palettes: Record<"dark" | "light", ScenePalette> = {
  dark: { accent: "#c9a84c", torus: "#050505", octahedron: "#1a1a1a" },
  // Pale, pearly shapes read as objects on a near-white page; a near-black
  // torus would just look like a hole.
  light: { accent: "#a8862f", torus: "#e9e3d8", octahedron: "#cfc7b8" },
};

/** Colours for the WebGL scenes, following the site's light/dark theme. */
export function useScenePalette(): ScenePalette {
  const { resolvedTheme } = useTheme();
  return palettes[resolvedTheme === "light" ? "light" : "dark"];
}
