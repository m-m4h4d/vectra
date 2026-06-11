"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "py-4 bg-background/70 backdrop-blur-md border-b border-accent/10"
          : "py-7 bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
        <a
          href="#"
          className="font-syne font-bold text-xl tracking-tight text-foreground no-underline"
        >
          VECTRA<span className="text-accent">.</span>
        </a>
        
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-xs sm:text-sm font-medium px-5 sm:px-7 py-2 sm:py-2.5 rounded-full border border-accent/25 text-accent bg-transparent hover:bg-accent hover:text-card transition-all duration-300 tracking-wide"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
}
