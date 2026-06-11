"use client";

import { motion } from "framer-motion";
import { FluidCanvas } from "@/components/canvas/FluidCanvas";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 0.61, 0.36, 1] as const,
    },
  },
};

export function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-background">
      <FluidCanvas />
      
      {/* Gradients to blend canvas with background */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-[1]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={itemVariants}
            className="text-accent text-xs sm:text-sm tracking-[0.35em] uppercase mb-6 sm:mb-8 font-dm-sans font-medium"
          >
            Creative Studio
          </motion.p>
          
          <motion.h1
            variants={itemVariants}
            className="font-syne font-bold text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] tracking-[-0.02em] mb-8 sm:mb-10 text-foreground"
          >
            We craft<br />
            <span className="gradient-text">immersive</span><br />
            experiences
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-muted text-base sm:text-lg md:text-xl max-w-[420px] leading-[1.7] font-dm-sans"
          >
            Elevating brands through design, development, and digital storytelling.
          </motion.p>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 sm:bottom-12 left-6 md:left-16 flex items-center gap-4"
        >
          <div className="w-[1px] h-16 sm:h-20 bg-gradient-to-b from-accent/50 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 80] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-5 bg-accent"
            />
          </div>
          <span className="text-muted text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-medium">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
