# 🍷 Gridly - Discover, Collect & Share Visual Inspirations

Gridly is a premium, high-fidelity visual discovery and media-sharing single-page application (SPA) heavily inspired by Pinterest. Built with a bespoke **Wine & Blush** minimal aesthetic palette, the platform delivers fluid content exploration, deep asset inspection, dynamic client-side filtering, content uploads, full-text searching, and an immersive integrated messaging inbox experience.

The project is completely self-contained within a high-performance frontend architecture, bypassing complex backend network configurations while retaining advanced relational-like features through a state-synchronized memory matrix.

---

## 🎨 Visual Aesthetics & Design System

Gridly is styled using an ultra-premium, dark-burgundy-accented visual identity engineered with CSS custom variables:

* **Primary Canvas (`--blush-bg`):** `#FFF0F2` — A soft, editorial-grade muted blush canvas.
* **Focus Brand Tone (`--wine-primary`):** `#58111A` — Deep Burgundy for primary branding, interactive anchors, and structural badges.
* **Deep Contrast Accent (`--wine-dark`):** `#38070C` — High-contrast wine tone for interactive state depth.
* **Muted Elements (`--text-muted`):** `#735155` — Soft brown-pink hue for typography hierarchy and passive states.
* **Layout Physics:** Built on a production-grade Pinterest Fluid Masonry Engine utilizing multi-column balance parameters (`column-count`), eliminating layout shifts.

---

## 🚀 Key Functional Features

1. **Fluid Category Filtering:** Case-insensitive string matching array processor linking the top contextual tab elements ("Architecture", "Cinema", "Music", "Minimal Art") directly with media entity cards instantly.
2. **Live Search Index Engine:** A micro-optimized search loop utilizing text normalization (`toLowerCase().trim()`) that evaluates grid headers across the active dataset in real-time.
3. **Client-Side Asset Ingestion:** Dynamic binary media ingestion powered by the HTML5 `FileReader` API. Supports real-time rendering previews for uploaded images and streams them layout-side using `unshift` arrays.
4. **Interactive Inbox Overlays:** A glassmorphic popup modal containing contextual notification mocks, school friend chat feeds, and user indexing inputs accessible directly via the top navigation dock.

---

## 📂 Project Architecture

```directory
GridlyProject/
│
├── index.html       # Structural Blueprint & Modal Portals
├── style.css        # Core Layout, Masonry Physics & Wine-Blush Variables
├── app.js           # Stateful Architecture, Search Engine & Routing Logic
└── README.md        # System Documentation & Deployment Guide
