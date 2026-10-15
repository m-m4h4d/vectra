# Vectra

A one-page site for a fictional creative studio, built as a showcase for scroll-driven 3D in the browser. As you scroll, the WebGL scenes move with the page: shapes drift at different speeds to create parallax depth, and the camera pushes into the scene.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with the React Compiler
- [React Three Fiber](https://r3f.docs.pmnd.rs) and [drei](https://drei.docs.pmnd.rs) on [three.js](https://threejs.org) for the 3D scenes
- [Motion](https://motion.dev) (`framer-motion`) for entrance animations and scroll tracking
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- [Tailwind CSS](https://tailwindcss.com) 4 and [next-themes](https://github.com/pacocoursey/next-themes) for light and dark themes

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project layout

```
src/
  app/          Root layout, page, global styles and icons
  components/
    canvas/     The three WebGL scenes (hero, showcase sphere, features background)
    hero/ navbar/ sections/ footer/ ui/
  hooks/        Render-loop and scroll-progress hooks shared by the scenes
  lib/          Utilities and the 3D colour palette
  providers/    Theme, smooth scrolling and motion settings
```

## How the 3D works

- **Scroll-driven:** each scene tracks how far its section has scrolled (`useScroll`) and eases toward that value every frame (`src/hooks/useDampedProgress.ts`), so nothing re-renders as you scroll.
- **Only visible scenes render:** a canvas animates only while it's near the viewport (`src/hooks/useCanvasFrameloop.ts`). Pixel ratio is capped at 1.5, and three.js loads separately from the first page load.
- **Reduced motion:** if the visitor's system asks for reduced motion, the scenes draw a single still frame, smooth scrolling and the text marquee stop, and entrance animations fade without moving.

## Customising

- **Theme colours:** CSS variables in `src/app/globals.css`, for both themes.
- **3D colours:** `src/lib/scenePalette.ts`, for both themes.
- **Scroll motion:** the `SHAPES` list and camera move in `src/components/canvas/FluidCanvas.tsx`.
- **Contact email:** `EMAIL` in `src/components/sections/Contact.tsx`.

## License

See [LICENSE](LICENSE).
