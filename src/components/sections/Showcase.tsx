"use client";

import { motion } from "framer-motion";
import { SphereCanvas } from "@/components/canvas/SphereCanvas";

export function Showcase() {
  return (
    <section className="relative z-10 py-32 md:py-[200px] overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center min-h-[60vh]">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] as const }}
            className="md:-translate-x-5"
          >
            <p className="text-accent text-xs sm:text-sm tracking-[0.35em] uppercase mb-8 font-dm-sans">
              Interactive 3D
            </p>
            <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em] mb-10 text-foreground">
              Where vision<br />
              meets <span className="gradient-text">precision</span>
            </h2>
            <p className="text-muted text-base md:text-lg leading-[1.7] max-w-[380px] font-dm-sans">
              Real-time 3D rendering with dynamic materials and organic motion.
            </p>
          </motion.div>

          {/* 3D Canvas Container */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] as const, delay: 0.2 }}
            className="relative h-[350px] sm:h-[400px] md:h-[500px] w-full max-w-[500px] mx-auto md:translate-x-[60px]"
          >
            <div className="absolute inset-0 border border-accent/10 rounded-full md:-rotate-3 md:translate-y-[5%] overflow-hidden bg-card/10 backdrop-blur-[2px]">
              <SphereCanvas />
            </div>
            {/* Concentric rings */}
            <div className="absolute inset-8 sm:inset-12 border border-accent/[0.06] rounded-full pointer-events-none" />
            <div className="absolute inset-16 sm:inset-24 border border-accent/[0.03] rounded-full pointer-events-none" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
