"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};

/** False during SSR and hydration, true once running on the client. */
function useIsClient() {
  return React.useSyncExternalStore(subscribe, () => true, () => false);
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  const baseClass = "w-10 h-10 flex items-center justify-center rounded-full border border-accent/25 text-accent bg-background/60 backdrop-blur-sm";

  // The theme is unknown until the client reads it, so render a neutral placeholder first.
  if (!isClient) {
    return (
      <button type="button" disabled className={cn(baseClass, "transition-all", className)}>
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(baseClass, "hover:bg-accent/10 transition-all duration-300", className)}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Switch to {isDark ? "light" : "dark"} theme</span>
    </button>
  );
}
