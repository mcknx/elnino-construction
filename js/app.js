/* =========================================================
   EL NIŇO s.r.o. — Scroll-Driven Animation Engine
   Lenis + GSAP + Canvas Frame Rendering
   ========================================================= */

(function () {
  "use strict";

  /* ── Constants ─────────────────────────────────── */
  const FRAME_COUNT = 311;
  const FRAME_SPEED = 2.0;
  const IMAGE_SCALE = 0.88;
  const FRAME_PATH = (i) => `frames/frame_${String(i).padStart(4, "0")}.webp`;

  /* ── DOM Refs ──────────────────────────────────── */
  const loader = document.getElementById("loader");
  const loaderBar = document.getElementById("loader-bar");
  const loaderPercent = document.getElementById("loader-percent");
  const heroSection = document.querySelector(".hero-standalone");
  const canvasWrap = document.querySelector(".canvas-wrap");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const scrollContainer = document.getElementById("scroll-container");
  const darkOverlay = document.getElementById("dark-overlay");

  /* ── State ─────────────────────────────────────── */
  const frames = new Array(FRAME_COUNT);
  let currentFrame = 0;
  let bgColor = "#F5F2EF";
  let loaded = 0;

  /* ── Canvas Sizing ─────────────────────────────── */
  function getCanvasSize() {
    const w = canvasWrap.offsetWidth || Math.round(window.innerWidth * 2 / 3);
    const h = window.innerHeight;
    return { w, h };
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
        loaderPercent.textContent = pct + "%";
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

      // Phase 1: first 10 frames
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

  /* ── Hero Transition (Circle Wipe) ─────────────── */
  function initHeroTransition() {
    ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        // Hero fades out in first 5% of scroll
        const heroOpacity = Math.max(0, 1 - p * 15);
        heroSection.style.opacity = heroOpacity;
        if (heroOpacity <= 0) {
          heroSection.style.visibility = "hidden";
        } else {
          heroSection.style.visibility = "visible";
        }

        // Canvas reveals via expanding circle clip-path
        const wipeProgress = Math.min(1, Math.max(0, (p - 0.01) / 0.06));
        const radius = wipeProgress * 85;
        canvasWrap.style.clipPath = `circle(${radius}% at 50% 50%)`;
      },
    });
  }

  /* ── Frame-to-Scroll Binding ───────────────────── */
  function initFrameScroll() {
    ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
        const index = Math.min(
          Math.floor(accelerated * FRAME_COUNT),
          FRAME_COUNT - 1
        );
        if (index !== currentFrame) {
          currentFrame = index;
          requestAnimationFrame(() => drawFrame(currentFrame));
        }
      },
    });
  }

  /* ── Section Animation System ──────────────────── */
  function positionSections() {
    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach((section) => {
      const enter = parseFloat(section.dataset.enter) / 100;
      const leave = parseFloat(section.dataset.leave) / 100;
      const midpoint = (enter + leave) / 2;
      section.style.top = `${midpoint * 100}%`;
      section.style.transform = "translateY(-50%)";
    });
  }

  function setupSectionAnimation(section) {
    const type = section.dataset.animation;
    const persist = section.dataset.persist === "true";
    const enter = parseFloat(section.dataset.enter) / 100;
    const leave = parseFloat(section.dataset.leave) / 100;

    const children = section.querySelectorAll(
      ".section-label, .section-heading, .section-body, .section-note, .cta-button, .stat, .cta-contact-row, .cta-address, .service-list"
    );

    const tl = gsap.timeline({ paused: true });

    switch (type) {
      case "fade-up":
        tl.from(children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
        break;
      case "slide-left":
        tl.from(children, { x: -80, opacity: 0, stagger: 0.14, duration: 0.9, ease: "power3.out" });
        break;
      case "slide-right":
        tl.from(children, { x: 80, opacity: 0, stagger: 0.14, duration: 0.9, ease: "power3.out" });
        break;
      case "scale-up":
        tl.from(children, { scale: 0.85, opacity: 0, stagger: 0.12, duration: 1.0, ease: "power2.out" });
        break;
      case "rotate-in":
        tl.from(children, { y: 40, rotation: 3, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" });
        break;
      case "stagger-up":
        tl.from(children, { y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" });
        break;
      case "clip-reveal":
        tl.from(children, { clipPath: "inset(100% 0 0 0)", opacity: 0, stagger: 0.15, duration: 1.2, ease: "power4.inOut" });
        break;
    }

    let isVisible = false;
    let hasPlayed = false;

    ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const inRange = p >= enter && p <= leave;
        const pastLeave = p > leave;

        if (inRange && !isVisible) {
          section.classList.add("is-visible");
          tl.play();
          isVisible = true;
          hasPlayed = true;
        } else if (!inRange && isVisible) {
          if (persist && pastLeave) {
            // Keep visible
          } else {
            section.classList.remove("is-visible");
            tl.reverse();
            isVisible = false;
          }
        }

        // Persist logic — keep showing after leave range
        if (persist && hasPlayed && pastLeave) {
          section.classList.add("is-visible");
        }
      },
    });
  }

  /* ── Counter Animations ────────────────────────── */
  function initCounters() {
    document.querySelectorAll(".stat-number").forEach((el) => {
      const target = parseFloat(el.dataset.value);
      const decimals = parseInt(el.dataset.decimals || "0");
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el.closest(".scroll-section"),
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          el.textContent = decimals > 0
            ? obj.val.toFixed(decimals)
            : Math.round(obj.val);
        },
      });
    });
  }

  /* ── Horizontal Marquee ────────────────────────── */
  function initMarquee() {
    document.querySelectorAll(".marquee-wrap").forEach((el) => {
      const speed = parseFloat(el.dataset.scrollSpeed) || -25;
      const marqueeEnter = parseFloat(el.dataset.enter || "15") / 100;
      const marqueeLeave = parseFloat(el.dataset.leave || "75") / 100;

      gsap.to(el.querySelector(".marquee-text"), {
        xPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Fade in/out based on range
      ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p >= marqueeEnter && p <= marqueeLeave) {
            el.style.opacity = 1;
          } else {
            el.style.opacity = 0;
          }
        },
      });
    });
  }

  /* ── Dark Overlay ──────────────────────────────── */
  function initDarkOverlay() {
    const statsSection = document.querySelector(".section-stats");
    if (!statsSection) return;
    const enter = parseFloat(statsSection.dataset.enter) / 100;
    const leave = parseFloat(statsSection.dataset.leave) / 100;
    const fadeRange = 0.04;

    ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        let opacity = 0;
        if (p >= enter - fadeRange && p <= enter) {
          opacity = ((p - (enter - fadeRange)) / fadeRange) * 0.9;
        } else if (p > enter && p < leave) {
          opacity = 0.9;
        } else if (p >= leave && p <= leave + fadeRange) {
          opacity = 0.9 * (1 - (p - leave) / fadeRange);
        }
        darkOverlay.style.opacity = opacity;
      },
    });
  }

  /* ── Hero Word Split Animation ─────────────────── */
  function animateHero() {
    const words = document.querySelectorAll(".hero-heading .word");
    const tagline = document.querySelector(".hero-tagline");
    const label = document.querySelector(".hero-label");
    const scrollInd = document.querySelector(".hero-scroll-indicator");

    gsap.from(label, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });
    gsap.from(words, { y: 80, opacity: 0, stagger: 0.12, duration: 1.0, ease: "power3.out", delay: 0.5 });
    gsap.from(tagline, { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", delay: 1.0 });
    gsap.from(scrollInd, { opacity: 0, duration: 0.8, ease: "power2.out", delay: 1.5 });
  }

  /* ── Initialize ────────────────────────────────── */
  async function init() {
    gsap.registerPlugin(ScrollTrigger);
    initLenis();

    await preloadFrames();

    // Hide loader
    loader.classList.add("loaded");
    setTimeout(() => {
      loader.style.display = "none";
    }, 700);

    // Hero entrance animation
    animateHero();

    // Setup scroll systems
    initHeroTransition();
    initFrameScroll();
    positionSections();

    document.querySelectorAll(".scroll-section").forEach(setupSectionAnimation);

    initCounters();
    initMarquee();
    initDarkOverlay();
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
