export function Footer() {
  return (
    <footer className="bg-card mx-4 sm:mx-8 md:mx-12 px-6 md:px-16 py-8 md:py-10 border-t border-accent/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-muted/80 text-xs tracking-[0.05em] font-dm-sans">
          © {new Date().getFullYear()} Vectra Studio
        </span>
        <span className="text-muted/60 text-xs tracking-[0.05em] font-dm-sans">
          Next.js + Three.js + Motion
        </span>
      </div>
    </footer>
  );
}
