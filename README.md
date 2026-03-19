# 🌸 Adorable Accountability

> Cute printable habit trackers that make consistency feel good — no pressure, no guilt.

**Live site:** [adorableaccountability.com](https://adorableaccountability.com)  
**Etsy shop:** [etsy.com/shop/AdorableAccountability](https://etsy.com/shop/AdorableAccountability)

---

## What This Is

A multi-page static website for selling printable and physical habit trackers. Features:

- **Landing page** (`index.html`) — shop, bundles, personalization, freebies, FAQ
- **Tracker Studio** (`studio.html`) — live customizer with real-time preview, print protection
- **ADHD landing page** (`adhd.html`) — dedicated page for the ADHD Gentle Habits Kit
- **CSS design system** (`styles.css`, `studio.css`) — full token-based design with mochi characters
- **JavaScript interactions** (`script.js`, `studio.js`) — scroll animations, studio engine, state management

## Tech Stack

Pure HTML · CSS · Vanilla JS — no framework, no build step, no dependencies.  
Deploy to any static host (Vercel, Netlify, GitHub Pages).

## Project Structure

```
aa-trackers/
├── index.html          # Main landing + shop page
├── studio.html         # Tracker Studio designer
├── adhd.html           # ADHD-focused landing page
├── styles.css          # Main site design system
├── studio.css          # Studio-specific styles + mochi characters
├── script.js           # Main site interactions
├── studio.js           # Studio engine (state, grid, themes, print)
├── GTM_STRATEGY.md     # Full go-to-market strategy + $10K/month checklist
└── NORTH_STAR.md       # Condensed team alignment document
```

## Running Locally

Open `index.html` directly in any browser — no server required.

```bash
# Or use VS Code Live Server, or:
npx serve .
```

## Strategy Docs

- [`NORTH_STAR.md`](./NORTH_STAR.md) — Read this first. Mission, ICP, offer stack, 4-phase GTM.
- [`GTM_STRATEGY.md`](./GTM_STRATEGY.md) — Full 10-expert strategy + phased execution checklist.

## Deployment

Deploy to Vercel:
```bash
npx vercel --prod
```

Or connect this repo to Vercel via the dashboard for automatic deploys on push.

---

© 2026 Adorable Accountability · Made with 🌸
