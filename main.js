/**
 * main.js — Save the Date: Rohit & Sams
 *
 * GSAP Animation Breakdown:
 * ─────────────────────────────────────────────────────────────
 * 1. PRELOADER       → Fades out after page ready
 * 2. HERO REVEAL     → Staggered entrance (eyebrow → names → date → divider → scroll)
 * 3. SCROLL TRIGGERS → Each section reveals on scroll (ScrollTrigger plugin)
 *    - Fade-up (default)
 *    - Fade-left / Fade-right (story cards)
 * 4. PARALLAX        → Subtle bg-decor elements move at different speeds
 * 5. COUNTDOWN       → Functional real-time countdown to April 12, 2026 10AM
 * ─────────────────────────────────────────────────────────────
 */

// ── Import GSAP core + plugins (installed via npm) ─────────────
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Vercel Analytics
import { inject } from '@vercel/analytics';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Initialize Vercel Web Analytics
inject();

// ══════════════════════════════════════════════
// SECTION 1: PRELOADER
// ══════════════════════════════════════════════

/**
 * showPage()
 * Called when the DOM is fully ready.
 * Hides the preloader with a smooth fade and triggers the hero animation.
 */
function showPage() {
  const preloader = document.getElementById("preloader");

  // Small delay so the preloader fill animation completes (1.6s + 0.4s offset = ~2s)
  gsap.delayedCall(2.2, () => {
    // Fade the preloader overlay out
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        preloader.classList.add("hidden");
        // Once preloader is gone, fire the hero entrance animation
        animateHero();
      },
    });
  });
}

// ══════════════════════════════════════════════
// SECTION 2: HERO ENTRANCE ANIMATION
// ══════════════════════════════════════════════

/**
 * animateHero()
 * Creates a staggered reveal timeline for all hero elements.
 * Order: eyebrow → name (Rohit) → ampersand → name (Sams) → date → divider → scroll hint
 *
 * Each element starts with opacity:0 (set in CSS) and is brought in via GSAP.
 */
function animateHero() {
  // Master timeline for the hero section
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Step 1 — Eyebrow text "Save the Date" — slides up from 20px below
  heroTl.fromTo(
    "#hero-eyebrow",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.9 }
  );

  // Step 2 — Names: staggered appearance of Rohit, &, Sams
  // Each name slides up from 60px offset with a slight blur effect
  heroTl.fromTo(
    "#name-rohit",
    { opacity: 0, y: 60, filter: "blur(4px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
    "-=0.4" // Overlap with previous tween by 0.4s for fluidity
  );

  heroTl.fromTo(
    "#ampersand-wrapper",
    { opacity: 0, scale: 0.7, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
    "-=0.7"
  );

  heroTl.fromTo(
    "#name-sams",
    { opacity: 0, y: 60, filter: "blur(4px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
    "-=0.7"
  );

  // Step 3 — Date block slides up
  heroTl.fromTo(
    "#date-wrapper",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 },
    "-=0.4"
  );

  // Step 4 — Gold divider expands from center
  heroTl.fromTo(
    "#hero-divider",
    { opacity: 0, scaleX: 0 },
    { opacity: 1, scaleX: 1, duration: 0.7, ease: "power2.inOut" },
    "-=0.3"
  );

  // Step 5 — Scroll indicator fades in last
  heroTl.fromTo(
    "#scroll-indicator",
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.6 },
    "-=0.2"
  );
}

// ══════════════════════════════════════════════
// SECTION 3: SCROLL TRIGGER REVEAL ANIMATIONS
// ══════════════════════════════════════════════

/**
 * initScrollAnimations()
 * Queries all elements with [data-reveal] and wires up ScrollTrigger instances.
 *
 * data-reveal values:
 *   "fade-up"    — element rises from below (default)
 *   "fade-left"  — element slides from the right
 *   "fade-right" — element slides from the left
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-element");

  revealElements.forEach((el, index) => {
    const revealType = el.dataset.reveal || "fade-up";

    // Determine the initial transform offset based on reveal direction
    const fromVars = getRevealFromVars(revealType);

    // Create a ScrollTrigger for each element
    // "once: true" means animation won't replay on scroll back up
    gsap.fromTo(
      el,
      {
        opacity: 0,
        ...fromVars,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        // Stagger cards within the same parent slightly
        delay: (index % 3) * 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",    // Start when element's top hits 88% of viewport height
          end: "top 20%",
          toggleActions: "play none none none", // only play once
          once: true,
        },
      }
    );
  });
}

/**
 * getRevealFromVars(type)
 * Returns the initial GSAP 'from' properties for each reveal type.
 * @param {string} type - "fade-up" | "fade-left" | "fade-right"
 */
function getRevealFromVars(type) {
  switch (type) {
    case "fade-left":
      // Comes in from the right
      return { x: 60, y: 0, filter: "blur(3px)" };
    case "fade-right":
      // Comes in from the left
      return { x: -60, y: 0, filter: "blur(3px)" };
    case "fade-up":
    default:
      return { x: 0, y: 50, filter: "blur(2px)" };
  }
}

// ══════════════════════════════════════════════
// SECTION 4: PARALLAX EFFECTS
// ══════════════════════════════════════════════

/**
 * initParallax()
 * Adds subtle vertical parallax movement to hero background decorations.
 * Background elements move at a slower rate than the scroll, creating depth.
 */
function initParallax() {
  // Parallax for hero background leaf decorations
  const parallaxTargets = [
    { selector: ".bg-leaf--1", yPercent: -25 },
    { selector: ".bg-leaf--2", yPercent: -15 },
    { selector: ".bg-leaf--3", yPercent: -35 },
    { selector: ".bg-circle",  yPercent: -10 },
  ];

  parallaxTargets.forEach(({ selector, yPercent }) => {
    const el = document.querySelector(selector);
    if (!el) return;

    gsap.to(el, {
      yPercent,
      ease: "none", // Linear scrub for smooth parallax feel
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5, // Smooth scrub factor (higher = more lag/inertia)
      },
    });
  });

  // Subtle parallax on story images as you scroll through
  document.querySelectorAll(".story-image").forEach((img) => {
    gsap.to(img, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  });
}

// ══════════════════════════════════════════════
// SECTION 5: COUNTDOWN TIMER
// ══════════════════════════════════════════════

/**
 * initCountdown()
 * Calculates the time remaining until April 12, 2026 at 10:00 AM IST (UTC+5:30).
 * Updates every second. Adds a CSS flip animation on each number change.
 *
 * IST offset: UTC+5:30 → April 12, 2026 10:00 AM IST = April 12, 2026 04:30 UTC
 */
function initCountdown() {
  // Wedding datetime in IST: April 12, 2026 at 10:00 AM
  // ISO string with offset: "2026-04-12T10:00:00+05:30"
  const weddingDate = new Date("2026-04-12T10:00:00+05:30").getTime();

  // Cache DOM references
  const daysEl    = document.getElementById("days");
  const hoursEl   = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  // Store previous values to detect changes (for flip animation)
  let prevValues = { days: null, hours: null, minutes: null, seconds: null };

  /**
   * updateCountdown()
   * Runs every second. Computes remaining time and updates the DOM.
   * If a value changed from the previous tick, adds a 'flip' CSS class
   * for a subtle number-change animation.
   */
  function updateCountdown() {
    const now  = Date.now();
    const diff = weddingDate - now;

    // If we've passed the wedding date, show celebration state
    if (diff <= 0) {
      daysEl.textContent    = "00";
      hoursEl.textContent   = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      clearInterval(timer);
      return;
    }

    // Calculate time units
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Format values with leading zeros
    const formatted = {
      days:    String(days).padStart(2, "0"),
      hours:   String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };

    // Update each element — add flip animation only if the value changed
    updateUnit(daysEl,    formatted.days,    prevValues.days);
    updateUnit(hoursEl,   formatted.hours,   prevValues.hours);
    updateUnit(minutesEl, formatted.minutes, prevValues.minutes);
    updateUnit(secondsEl, formatted.seconds, prevValues.seconds);

    // Persist current values for next comparison
    prevValues = { ...formatted };
  }

  /**
   * updateUnit(el, newVal, prevVal)
   * Sets the text content of a countdown element.
   * If value changed, briefly adds the 'flip' class to trigger CSS animation.
   */
  function updateUnit(el, newVal, prevVal) {
    if (newVal !== prevVal) {
      el.textContent = newVal;
      // Remove and re-add to restart animation
      el.classList.remove("flip");
      void el.offsetWidth; // Force reflow so animation restarts
      el.classList.add("flip");
    }
  }

  // Run immediately and then every second
  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}

// ══════════════════════════════════════════════
// SECTION 6: BUTTON HOVER MICRO-ANIMATIONS
// ══════════════════════════════════════════════

/**
 * initButtonAnimations()
 * Adds GSAP-powered hover micro-interactions on CTA buttons.
 * These enhance the CSS transitions with a slight "squish" feel.
 */
function initButtonAnimations() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.04,
        duration: 0.25,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.6)",
      });
    });
  });
}

// ══════════════════════════════════════════════
// SECTION 7: COUNTDOWN GSAP ENTRANCE
// ══════════════════════════════════════════════

/**
 * initCountdownEntrance()
 * When the countdown section scrolls into view, each number unit
 * cascades in with a staggered GSAP animation.
 */
function initCountdownEntrance() {
  const units = gsap.utils.toArray(".countdown-unit");

  gsap.fromTo(
    units,
    {
      opacity: 0,
      y: 40,
      scale: 0.8,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.4)",
      stagger: 0.12, // Each unit appears 120ms after the previous
      scrollTrigger: {
        trigger: "#countdown-grid",
        start: "top 80%",
        once: true,
      },
    }
  );
}

// ══════════════════════════════════════════════
// SECTION 8: FLOATING CARD ANIMATION
// ══════════════════════════════════════════════

/**
 * initFloatingCards()
 * Applies a continuous, gentle floating motion to story card images.
 * Each card gets a slightly different offset and duration for organic feel.
 */
function initFloatingCards() {
  const floatContainers = document.querySelectorAll(".story-card-media");

  floatContainers.forEach((el, i) => {
    // Random-feeling but deterministic parameters per card
    const yAmp  = 8 + (i * 3);   // Vertical amplitude (px)
    const dur   = 3.5 + (i * 0.7); // Duration
    const delay = i * 0.5;        // Stagger start

    gsap.to(el, {
      y: -yAmp,
      duration: dur,
      ease: "sine.inOut",
      repeat: -1,      // Infinite loop
      yoyo: true,      // Reverse back to original position
      delay,
    });
  });
}

// ══════════════════════════════════════════════
// INIT: Run everything on DOM ready
// ══════════════════════════════════════════════

/**
 * Main initialization — wired to DOMContentLoaded.
 * Order matters: preloader runs first, then GSAP systems init.
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Start preloader sequence (triggers hero animation internally)
  showPage();

  // 2. Set up all scroll-triggered reveal animations
  initScrollAnimations();

  // 3. Parallax depth effects
  initParallax();

  // 4. Countdown timer (real-time)
  initCountdown();

  // 5. Countdown section entrance animation
  initCountdownEntrance();

  // 6. Button hover micro-interactions
  initButtonAnimations();

  // 7. Floating card animations for story images
  initFloatingCards();

  // ── Smooth scroll for anchor links ───────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
