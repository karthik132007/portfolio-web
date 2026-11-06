# Karthikeya Kumar — Curious by default.

A React portfolio built with Vite, retaining the original visual identity, local fonts, artwork, and résumé downloads, with a scroll-opening technology chest and three English writing styles.

## Run locally

Use Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The React source requires the development server; opening `index.html` directly is no longer supported.

## Build and preview

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host such as GitHub Pages, Netlify, or Cloudflare Pages. Relative build URLs support hosting under a subdirectory.

## Language styles and section order

Visitors choose Standard English, Shakespearean English, or Pirate English every time they open or reload the site, before the portfolio mounts. The header switcher changes the copy immediately during the current visit. A previously saved choice does not bypass the entrance picker.

All three styles cover navigation, headings, project notes, tool descriptions, accessibility labels, and interactive feedback. Proper names, technologies, URLs, dates, and numerical results stay intact. The standalone résumé PDFs are the original downloads.

The page order is: hero, introduction, tech stack, projects, about, Side Quests, and contact.

```sh
npm test
```

The copy checks cover every UI key and data description, both styled variants, placeholders, and numerical facts.

## Edit the portfolio

- `src/App.jsx`: the entrance gate, page composition, and case-study selection.
- `src/i18n/catalog.js`: original copy and the two authored style variants.
- `src/i18n/LanguageContext.jsx`: the selected voice for the current visit and page metadata.
- `src/components/LanguageGate.jsx`, `LanguageSwitcher.jsx`, and `src/language.css`: the first-visit picker and header language control.
- `src/components/SideQuests.jsx`: hobbies and research goals, near the bottom of the page.
- `src/components/`: header, hero, introduction, selected work, about section, inventory, contact section, dialog, reading progress, and SVG icon definitions.
- `src/data/projects.js`: case-study text, metrics, and links.
- `src/data/inventory.js`: the 35 tools and their descriptions, used by the chest and item inspector.
- `src/components/ChestArtwork.jsx`: double-chest geometry and pixelated wood; its lid follows scroll position.
- `src/components/TechnologyIcon.jsx`: recognizable technology logos and descriptive symbols, shared by the chest slots and inspector.
- `src/components/inventory.css`: chest layout, item slots, responsive sizing, and reduced-motion styles.
- `public/assets/tech-icons/`: local technology icons and third-party license notices.
- `src/hooks/useScrollMotion.js` and `src/motion.css`: section reveals, staggered entrances, and scroll-linked movement. Motion respects reduced-motion preferences and cleans up observers and listeners.
- `src/lib/sculpture.js`: the original canvas sculpture, with animation, pointer handling, reduced-motion support, and cleanup when its component unmounts.
- `style.css`: the unchanged original typography, colors, layouts, animations, and mobile styles.
- `src/interaction.css`: lets the sculpture button receive pointer clicks through an overlapping desktop hero row, without changing its appearance.
- `public/assets/`: original local fonts, favicon, and both résumé PDFs, served at `assets/` URLs.
- `index.html`: page title, metadata, font stylesheet, and React entry point.

React state manages the mobile menu, sculpture perspective, case-study dialog, chest opening and item inspection, and email-copy feedback. The chest starts closed and opens as its section scrolls into view; it closes again when scrolling back. A keyboard-accessible open button also reveals the tools, and reduced-motion users get a simple state change. Animation frames, observers, listeners, and timers are cleaned up when their components unmount.

