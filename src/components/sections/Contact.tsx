"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "nacheez.writes@gmail.com";

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative z-10 bg-background pt-10 md:pt-20">
      <div className="relative overflow-hidden bg-card mx-4 sm:mx-8 md:mx-12 rounded-t-[32px] sm:rounded-t-[48px] border border-accent/10 border-b-0 shadow-2xl">

        {/* Glow effect */}
        <div className="absolute -top-[150px] md:-top-[200px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-accent/10 blur-[100px] md:blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto py-32 md:py-[200px] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] as const }}
          >
            <p className="text-accent text-xs sm:text-sm tracking-[0.35em] uppercase mb-6 md:mb-8 font-dm-sans">
              Start a Project
            </p>
            <h2 className="font-syne font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.02em] mb-10 md:mb-12 text-foreground">
              Let&apos;s build something<br />
              <span className="gradient-text">extraordinary</span>
            </h2>
            <button
              onClick={handleEmailClick}
              className="inline-block px-10 md:px-12 py-4 md:py-5 bg-accent text-card font-semibold text-xs md:text-sm tracking-[0.1em] uppercase rounded-full no-underline transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:scale-105"
            >
              {copied ? "Copied to clipboard!" : email}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
