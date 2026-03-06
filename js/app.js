/* =========================================================
   EL NIŇO s.r.o. — Canvas Video + Business Layout Engine
   Lenis + GSAP + Canvas Frame Rendering + ScrollTrigger Reveals
   ========================================================= */

(function () {
  "use strict";

  /* ── Constants ─────────────────────────────────── */
  const FRAME_COUNT = 311;
  const IMAGE_SCALE = 0.88;
  const FRAME_PATH = (i) => `frames/frame_${String(i).padStart(4, "0")}.webp`;

  /* ── DOM Refs ──────────────────────────────────── */
  const loader = document.getElementById("loader");
  const loaderBar = document.getElementById("loader-bar");
  const loaderPercent = document.getElementById("loader-percent");
  const heroSection = document.querySelector(".hero");
  const canvasWrap = document.querySelector(".canvas-wrap");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  /* ── State ─────────────────────────────────────── */
  const frames = new Array(FRAME_COUNT);
  let currentFrame = 0;
  let bgColor = "#F5F2EF";
  let loaded = 0;

  /* ── Canvas Sizing (Full Viewport) ─────────────── */
  function getCanvasSize() {
    return { w: window.innerWidth, h: window.innerHeight };
  }

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const { w, h } = getCanvasSize();
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);
    drawFrame(currentFrame);
  }

  window.addEventListener("resize", resizeCanvas);

  /* ── Background Color Sampler ──────────────────── */
  function sampleBgColor(img) {
    const tmp = document.createElement("canvas");
    tmp.width = img.naturalWidth;
    tmp.height = img.naturalHeight;
    const tCtx = tmp.getContext("2d");
    tCtx.drawImage(img, 0, 0);
    const corners = [
      tCtx.getImageData(2, 2, 1, 1).data,
      tCtx.getImageData(img.naturalWidth - 3, 2, 1, 1).data,
      tCtx.getImageData(2, img.naturalHeight - 3, 1, 1).data,
      tCtx.getImageData(img.naturalWidth - 3, img.naturalHeight - 3, 1, 1).data,
    ];
    let r = 0, g = 0, b = 0;
    corners.forEach((c) => { r += c[0]; g += c[1]; b += c[2]; });
    r = Math.round(r / 4);
    g = Math.round(g / 4);
    b = Math.round(b / 4);
    return `rgb(${r},${g},${b})`;
  }

  /* ── Frame Renderer — Padded Cover ─────────────── */
  function drawFrame(index) {
    const img = frames[index];
    if (!img) return;
    const dpr = window.devicePixelRatio || 1;
    const { w: cw, h: ch } = getCanvasSize();
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  /* ── Frame Preloader (Two-Phase) ───────────────── */
  function preloadFrames() {
    return new Promise((resolve) => {
      const FIRST_BATCH = 10;

      function updateProgress() {
        const pct = Math.round((loaded / FRAME_COUNT) * 100);
        loaderBar.style.width = pct + "%";
        loaderPercent.textContent = pct + " %";
      }

      function loadImage(index) {
        return new Promise((res) => {
          const img = new Image();
          img.onload = () => {
            frames[index] = img;
            loaded++;
            if (index % 20 === 0) bgColor = sampleBgColor(img);
            updateProgress();
            res();
          };
          img.onerror = () => {
            loaded++;
            updateProgress();
            res();
          };
          img.src = FRAME_PATH(index + 1);
        });
      }

      // Phase 1: first 10 frames (blocking)
      const firstBatch = [];
      for (let i = 0; i < FIRST_BATCH && i < FRAME_COUNT; i++) {
        firstBatch.push(loadImage(i));
      }

      Promise.all(firstBatch).then(() => {
        resizeCanvas();
        drawFrame(0);

        // Phase 2: remaining frames in batches of 20
        const remaining = [];
        for (let i = FIRST_BATCH; i < FRAME_COUNT; i++) {
          remaining.push(i);
        }

        let idx = 0;
        function loadBatch() {
          const batch = [];
          const end = Math.min(idx + 20, remaining.length);
          for (let j = idx; j < end; j++) {
            batch.push(loadImage(remaining[j]));
          }
          idx = end;
          Promise.all(batch).then(() => {
            if (idx < remaining.length) {
              requestAnimationFrame(loadBatch);
            } else {
              resolve();
            }
          });
        }

        if (remaining.length > 0) {
          loadBatch();
        } else {
          resolve();
        }
      });
    });
  }

  /* ── Lenis Smooth Scroll ───────────────────────── */
  function initLenis() {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return lenis;
  }

  /* ── Hero Fade Out on Scroll ───────────────────── */
  function initHeroFade() {
    if (!heroSection) return;
    ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const opacity = 1 - self.progress * 1.5;
        heroSection.style.opacity = Math.max(0, opacity);
      },
    });
  }

  /* ── Frame-to-Scroll Binding (Full Page) ───────── */
  function initFrameScroll() {
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const index = Math.min(
          Math.floor(self.progress * FRAME_COUNT),
          FRAME_COUNT - 1
        );
        if (index !== currentFrame) {
          currentFrame = index;
          requestAnimationFrame(() => drawFrame(currentFrame));
        }
      },
    });
  }

  /* ── Scroll Reveal Animations ──────────────────── */
  function initScrollReveals() {
    const sections = document.querySelectorAll(".section, .cta-banner");
    sections.forEach((section) => {
      const reveals = section.querySelectorAll(".reveal");
      if (reveals.length === 0) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(reveals, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });
    });
  }

  /* ── Counter Animations ────────────────────────── */
  function initCounters() {
    document.querySelectorAll(".stat-number").forEach((el) => {
      const target = parseFloat(el.dataset.value);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el.closest(".section"),
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val);
        },
      });
    });
  }

  /* ── Mobile Menu ───────────────────────────────── */
  function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ── Form Validation ───────────────────────────── */
  function initFormValidation() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      let valid = true;
      const fields = form.querySelectorAll("[required]");

      fields.forEach((field) => {
        field.classList.remove("error");
        if (!field.value.trim()) {
          field.classList.add("error");
          valid = false;
        }
        if (field.type === "email" && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            field.classList.add("error");
            valid = false;
          }
        }
      });

      if (!valid) {
        e.preventDefault();
      }
    });
  }

  /* ── Hero Word Split Animation ─────────────────── */
  function animateHero() {
    const words = document.querySelectorAll(".hero-heading .word");
    const tagline = document.querySelector(".hero-tagline");
    const badge = document.querySelector(".hero-badge");
    const btn = document.querySelector(".btn-primary");
    const scrollInd = document.querySelector(".hero-scroll-indicator");

    if (badge) gsap.from(badge, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });
    if (words.length) gsap.from(words, { y: 80, opacity: 0, stagger: 0.12, duration: 1.0, ease: "power3.out", delay: 0.5 });
    if (tagline) gsap.from(tagline, { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", delay: 1.0 });
    if (btn) gsap.from(btn, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 1.3 });
    if (scrollInd) gsap.from(scrollInd, { opacity: 0, duration: 0.8, ease: "power2.out", delay: 1.5 });
  }

  /* ── Initialize ────────────────────────────────── */
  async function init() {
    gsap.registerPlugin(ScrollTrigger);

    await preloadFrames();

    // Hide loader
    loader.classList.add("loaded");
    setTimeout(() => {
      loader.style.display = "none";
    }, 700);

    // Start systems
    initLenis();
    initFrameScroll();
    initHeroFade();
    animateHero();
    initScrollReveals();
    initCounters();
    initMobileMenu();
    initFormValidation();
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
