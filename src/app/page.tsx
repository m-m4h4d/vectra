import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ParallaxText } from "@/components/sections/ParallaxText";
import { Showcase } from "@/components/sections/Showcase";
import { Features } from "@/components/sections/Features";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <ParallaxText baseVelocity={5}>
        Design — Develop — Deploy — Innovate —
      </ParallaxText>
      <Showcase />
      <ParallaxText baseVelocity={-5}>
        Strategy — Branding — Motion — Experience —
      </ParallaxText>
      <Features />
      <Contact />
      <Footer />
    </main>
  );
}
