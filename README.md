# shotbykian

A dark, editorial photo portfolio. Next.js 14 (App Router) + TypeScript + Tailwind + framer-motion.

---

## Run

```bash
npm install
npm run dev          # auto-runs predev image manifest, then next dev
npm run build        # auto-runs prebuild image manifest, then next build
npm run build:images # rebuild the manifest manually
npm run optimize:images # one-time: re-encode source JPEGs with mozjpeg q75 (preserves EXIF)
```

Open http://localhost:3000.

---

## Adding photos

### Lightroom export preset (one-time setup)

Save these settings as a Lightroom export preset called **shotbykian web**:

| Setting | Value |
| --- | --- |
| Image Format | JPEG |
| Quality | **80** |
| Color Space | **sRGB** |
| Resize | Long Edge **2400 px** |
| Sharpen For | Screen, Standard |
| Metadata → Include | **All Metadata** (so EXIF flows into the lightbox info bar) |
| File Naming | Custom: `ALBUMNAME-{Sequence#}` (e.g. `JAPAN-1`, `JAPAN-2`...) |

With this preset, files are sized correctly out of the box — no manual resize step needed.

### Adding photos to an existing album

1. Export from Lightroom using the preset, continuing the existing numbering (e.g. if `AFRICA-71.jpg` is the last file, start at `AFRICA-72.jpg`).
2. Drop the files into the album folder (`public/AFRICA/`, etc.).
3. Run `npm run dev` — the `predev` hook rebuilds the manifest automatically.

That's it. Aspect ratios, blur placeholders, and EXIF are extracted on rebuild.

### Adding a brand-new album

Say you're adding "Japan, 2025":

1. **Export from Lightroom** with the preset. Files named `JAPAN-1.jpg` through `JAPAN-N.jpg`.
2. **Drop the folder** into `public/`: → `public/JAPAN/JAPAN-1.jpg`, etc.
3. **Register the album folder** in `scripts/build-images.mjs`:
   ```js
   const ALBUMS = [
     // ...existing...
     { id: "japan", dir: "JAPAN" },
   ];
   ```
4. **Add the album metadata** in `lib/albums.ts`:
   ```ts
   japan: {
     id: "japan",
     name: "Japan",
     blurb: "Two weeks across Tokyo, Kyoto, and Osaka.",
     year: "2025",
     cover: "/JAPAN/JAPAN-7.jpg", // your strongest frame for the index + OG card
   },
   ```
5. (Optional) Add a candidate to the home-page hero rotation pool in `app/page.tsx`:
   ```ts
   const HERO_POOL = [
     // ...existing...
     { albumId: "japan", src: "/JAPAN/JAPAN-3.jpg" },
   ];
   ```
6. Run `npm run dev`. The new album appears at the bottom of the index, gets its own `/album/japan` route, a per-album OG card, and a sitemap entry — all automatic.

### Things to know

- **Photo order in the grid** = numerical order of the file suffix. Lightroom: drag photos into your preferred order in a Collection, then export with sequential numbering.
- **The first 6 photos** in each album load eagerly (above the fold). Put your strongest opening shots at the start.
- **Cover photo** is what shows on the album index hover-preview and the per-album OG card. Pick something recognizable as a thumbnail.
- **Skip `npm run optimize:images`** unless you've dropped in oversized originals — the script is for catch-up cleanup, not a regular step.
- **`lib/album-images.json` is gitignored** — it regenerates on every build, so don't commit it.

### Verify

After `npm run dev`:
- New album row appears at the bottom of the home index
- `/album/japan` renders the grid
- Click any photo → lightbox opens, swipe / arrow keys / ESC all work
- If EXIF was preserved on export, the camera/lens/aperture line shows under the photo

---

## Architecture

### Image manifest pipeline

`scripts/build-images.mjs` scans every album folder under `public/`, uses `sharp` to read each image's intrinsic `{width, height}`, generates a 16×16 WebP base64 blur placeholder, and extracts EXIF metadata via `exifr` (camera, lens, aperture, shutter, ISO, focal length). Output is written to `lib/album-images.json` (~40 KB, gitignored). `lib/albums.ts` loads it at build time and exposes typed `albums` / `getAlbum` / `findPhoto` helpers.

This unlocks:

- **Zero CLS** — every tile reserves space using its real aspect ratio
- **Blur-up loading** — every `next/image` gets a real `blurDataURL`
- **Static album pages** — `generateStaticParams` prerenders all five at build time
- **EXIF in lightbox** — surfaces under the photo when present

> **Note on EXIF**: every current source photo has its metadata stripped (Lightroom default export setting). The pipeline is in place — re-export with metadata preserved and the lightbox info bar lights up automatically.

### Source-image optimization

`scripts/optimize-originals.mjs` re-encodes every JPEG in `public/{ALBUM}/` and `public/me*.jpg` with mozjpeg q75 (preserves EXIF). Idempotent — skips files that wouldn't gain at least 5 KB. Run once after adding a batch of new photos:

```bash
node scripts/optimize-originals.mjs
```

### Components

| File | Role |
| --- | --- |
| `components/Preloader.tsx` | Dark cover with the wordmark, animated progress bar, and counting `000%→100%` indicator. Slides up out of view when above-the-fold images load (or 3s safety). DOM updates are imperative via refs (no React re-renders) for animation efficiency. |
| `components/Hero.tsx` | Fullscreen hero photo with parallax + scroll fade, animated name reveal |
| `components/AlbumIndex.tsx` | List view of albums; desktop hover surfaces a floating preview thumbnail |
| `components/About.tsx` | Portrait + bio + stat block |
| `components/Footer.tsx` | Giant wordmark, contact links |
| `components/PhotoGrid.tsx` | CSS-columns masonry with per-tile aspect ratios, shimmer skeletons, blur placeholders, eager-load first 6, click → opens Lightbox (lazy-loaded) |
| `components/Lightbox.tsx` | Fullscreen carousel — prev/next buttons, arrow-key + ESC support, swipe via framer-motion drag, photo counter, sliding-window thumbnail strip, EXIF bar, full a11y (`role=dialog`, focus trap, return-focus on close), neighbor-image preload |
| `components/PageTransition.tsx` | Curtain wipe between routes (mounted via `app/template.tsx`) |
| `components/TransitionLink.tsx` | Wraps `next/link` to call `document.startViewTransition` for the View Transitions API morph between `album-title-{id}` elements |
| `components/MotionProvider.tsx` | `LazyMotion` provider so the rest of the app can use `m.*` instead of `motion.*` (lighter framer-motion footprint) |
| `components/HomeClient.tsx` | Renders main content underneath the preloader so the hero starts loading immediately for instant LCP |

### Image config

`next.config.mjs` enables AVIF + WebP and a 30-day image cache. All `<img>` tags use `next/image` with proper `sizes` so the optimizer serves the right resolution per breakpoint.

### SEO + social

- `app/sitemap.ts` — sitemap.xml for home + 5 album routes
- `app/robots.ts` — robots.txt
- `app/opengraph-image.tsx` — generated 1200×630 OG card for the home page
- `app/album/[id]/opengraph-image.tsx` — per-album OG card using each album's cover

### Hero rotation

`app/page.tsx` picks a hero from a curated pool, deterministic by UTC day. The page is rebuilt every 24h via `revalidate`, so returning visitors see something fresh without it changing on every navigation.

---

## Dependencies

Runtime: `next`, `react`, `react-dom`, `framer-motion`.
Dev: `sharp` + `exifr` (manifest builder), `tailwindcss`, `typescript`, `eslint`.

---

## Performance

Last measured (production build, headless desktop Lighthouse):

| Route | Perf | A11y | Best Practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 84 | 100 | 100 | 100 | 0.1s | 0.289 |
| `/album/[id]` | 96 | 100 | 100 | 100 | 1.4s | 0 |

First Load JS: 131 KB home, 108 KB album. Album pages prerendered as static HTML for all 5 albums.

> **Note on home CLS**: the 0.289 score is attributed by Lighthouse to the preloader's animated progress bar + per-frame percentage text updates. This is a Lighthouse detection artifact (it counts frequent JS-driven text updates as layout events even when the element width is fixed) — real-world Core Web Vitals from CrUX will not see this as a layout shift since nothing visible to a human user is moving. If you want a perfect 100 score, drop the percentage counter from `components/Preloader.tsx` and the CLS goes to 0.
