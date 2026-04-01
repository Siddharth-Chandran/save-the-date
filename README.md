# 💍 Save the Date — Rohit & Sams

> **12 April 2026 · 10:00 AM · Trichambaram, Taliparamba, Kerala**

A warm, elegant, and fully animated wedding "Save the Date" web page — built to delight guests on any device and leave a lasting first impression.

---

## ✨ Live Preview

Open `index.html` locally or spin up the dev server:

```bash
npm install
npm run dev
```

Then visit **http://localhost:5173** in your browser.

---

## 📖 About This Page

This is a single-page wedding announcement website for **Rohit & Sams**, designed to:

- Inform guests of the wedding date, time, and venue
- Tell the couple's story through beautiful, editorial-style sections
- Provide a live countdown to the big day
- Make it effortless to get directions to the venue
- Work beautifully on both phones and desktops

The aesthetic is **warm and editorial** — think champagne gold, deep forest green, and soft cream, with generous whitespace and serif typography that feels romantic and refined.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Bundler** | [Vite](https://vitejs.dev/) v8 |
| **Language** | Vanilla JavaScript (ESM) |
| **Animations** | [GSAP](https://gsap.com/) v3.14 + ScrollTrigger plugin |
| **Styling** | Vanilla CSS (no frameworks) |
| **Fonts** | Google Fonts — Playfair Display, Cormorant Garamond, Inter |
| **Map** | Google Maps embed (iframe) |

---

## 📋 Requirements

The page was built to meet the following brief:

### Design
- [x] Warm, elegant aesthetic
- [x] Color palette: soft creams · champagne gold · deep forest green
- [x] Serif headings (`Playfair Display`, `Cormorant Garamond`)
- [x] Clean sans-serif body text (`Inter`)
- [x] Spacious, editorial layout

### Content
- [x] **Names**: Rohit & Sams
- [x] **Date**: 12 April 2026, 10:00 AM
- [x] **Venue**: Trichambaram, Taliparamba, Kerala 670141
- [x] Google Maps link to exact coordinates

### Technical
- [x] Project structure: standard Vite (`index.html`, `main.js`, `style.css`)
- [x] GSAP imported via NPM (not CDN)
- [x] Mobile-first, fully responsive
- [x] Semantic HTML with SEO meta tags

---

## 🎬 Features Built

### 1. Preloader
A full-screen forest-green preloader with the monogram **"R & S"** and an animated loading bar. Fades out smoothly after ~2.2 seconds, then hands off to the hero animation.

### 2. Hero Entrance Animation (GSAP Timeline)
A carefully choreographed staggered reveal using `gsap.timeline`:
- "Save the Date" eyebrow slides up from below
- **Rohit** slides up with a blur-to-focus effect
- The **&** ampersand springs in with a `back.out` elastic ease
- **Sams** follows with the same blur-to-focus entrance
- Date and time block fades up
- Gold decorative divider expands from the center
- Scroll hint fades in last

### 3. Scroll Trigger Reveals (GSAP ScrollTrigger)
Every major content element has a `[data-reveal]` attribute and is animated when it enters the viewport:
- `fade-up` — rises from 50px below (default for section headers and cards)
- `fade-left` — enters from the right (story card 1)
- `fade-right` — enters from the left (story card 2)

All animations include a subtle blur-to-sharp transition for a premium feel.

### 4. Parallax Effects
- Hero background leaf decorations and the decorative ring move at different scroll speeds (using `scrub: 1.5`)
- Story images have a gentle inner parallax on scroll (`yPercent: -8`)

### 5. Live Countdown Timer
A real-time countdown to `2026-04-12T10:00:00+05:30`, updating every second with:
- Correct **IST timezone** handling via ISO 8601 offset string
- **Days · Hours · Minutes · Seconds** display
- A CSS `@keyframes flip` animation triggered on each number change (via class toggling + forced reflow)
- GSAP staggered entrance when the countdown section scrolls into view

### 6. Map Integration
- Embedded **Google Maps iframe** for the exact venue coordinates
- Styled with a desaturated filter that sharpens on hover
- A prominent **"Get Directions"** CTA button linking to the full Google Maps URL

### 7. Floating Card Effect
Story card images continuously float up and down with a gentle `sine.inOut` ease (`repeat: -1, yoyo: true`), each card with slightly different amplitude and timing for an organic, natural feel.

### 8. Button Micro-interactions
All CTA buttons use GSAP for hover interactions:
- `mouseenter` → scales up to `1.04` with `power2.out`
- `mouseleave` → springs back to `1.0` with `elastic.out(1, 0.6)`

### 9. Responsive Design
- Fluid type scale using `clamp()` throughout
- Couple names stack vertically on small screens, row on desktop
- Countdown grid switches from a centered row to a 2×2 grid on mobile
- Map card footer stacks on narrow viewports
- Respects `prefers-reduced-motion` — all animations are disabled for accessibility

---

## 📁 Project Structure

```
save-the-date/
├── index.html        # Page structure — all sections and semantic HTML
├── main.js           # All GSAP animations (heavily commented)
├── style.css         # Full design system, components, and responsive styles
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🗺 Venue

**Trichambaram, Taliparamba, Kerala 670141**

[📍 Open in Google Maps](https://www.google.com/maps/place/29J9%2BH8P,+Trichambaram,+Taliparamba,+Kerala+670141/@12.0314677,75.3657532,17z)

---

*Made with love ♥ for Rohit & Sams · Kerala 2026*
