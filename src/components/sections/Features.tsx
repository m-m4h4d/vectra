"use client";

import { motion } from "framer-motion";
import { BackgroundCanvas } from "@/components/canvas/BackgroundCanvas";

const features = [
  {
    num: "01",
    title: "WebGL & Three.js",
    desc: "Hardware-accelerated 3D graphics rendered directly in the browser.",
  },
  {
    num: "02",
    title: "Parallax Depth",
    desc: "Multi-layered scroll animations creating a sense of spatial depth.",
  },
  {
    num: "03",
    title: "Dynamic Materials",
    desc: "Glass, refraction, and distortion materials with real-time lighting.",
  },
  {
    num: "04",
    title: "Smooth Motion",
    desc: "Spring physics and eased transitions for fluid interactivity.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

export function Features() {
  return (
    <section className="relative z-10 py-32 md:py-[200px] overflow-hidden bg-background">
      <BackgroundCanvas />
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        <div className="text-center mb-20 md:mb-[140px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.p variants={itemVariants} className="text-accent text-xs sm:text-sm tracking-[0.35em] uppercase mb-6 sm:mb-8 font-dm-sans">
              Capabilities
            </motion.p>
            <motion.h2 variants={itemVariants} className="font-syne font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-foreground">
              Built with<br />
              <span className="gradient-text">modern tech</span>
            </motion.h2>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-20 md:gap-x-[100px] max-w-[900px] mx-auto"
        >
          {features.map((feature) => (
            <motion.div key={feature.num} variants={itemVariants} className="relative">
              <div className="flex items-baseline gap-4 md:gap-5 mb-4 md:mb-5">
                <span className="text-accent/40 font-syne text-sm md:text-[0.875rem] font-medium">
                  {feature.num}
                </span>
                <h3 className="font-syne font-bold text-[1.2rem] md:text-[1.4rem] text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted leading-[1.7] pl-[35px] md:pl-[40px] text-[0.95rem] md:text-base font-dm-sans">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
