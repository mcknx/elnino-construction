# Sections Reference — Business Website Skill

Detailed HTML, CSS, and JS code for each section blueprint. This file is loaded by Claude when building a section — **do not load it proactively**.

---

## Sticky Header

```html
<header class="site-header">
  <a href="#" class="header-logo">STAVBY TO</a>
  <nav class="header-nav">
    <ul class="nav-links">
      <li><a href="#equipment">Technika</a></li>
      <li><a href="#services">Služby</a></li>
      <li><a href="#process">Postup</a></li>
      <li><a href="#coverage">Pokrytie</a></li>
      <li><a href="#contact">Kontakt</a></li>
    </ul>
    <button class="lang-toggle" aria-label="Switch language">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      <span>EN</span>
    </button>
    <button class="hamburger" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>
```

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(26, 26, 26, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-subtle);
  transition: background var(--transition-base);
}

.header-logo {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-accent);
  text-decoration: none;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: color var(--transition-base);
}

.nav-links a:hover {
  color: var(--text-accent);
}

.lang-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  padding: 0.35rem 0.8rem;
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-size: 0.75rem;
  cursor: pointer;
  transition: border-color var(--transition-base);
}

.lang-toggle:hover {
  border-color: var(--text-accent);
}

/* Hamburger — mobile only */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: transform 0.3s, opacity 0.3s;
}

.hamburger[aria-expanded="true"] span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger[aria-expanded="true"] span:nth-child(2) {
  opacity: 0;
}
.hamburger[aria-expanded="true"] span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(26, 26, 26, 0.98);
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    gap: 1.5rem;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s, opacity 0.3s;
  }
  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .hamburger { display: flex; }
}
```

---

## Section 1: HERO

```html
<section class="hero" id="hero">
  <div class="hero-bg" style="background-image: url('images/hero.jpg')"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <span class="hero-badge" data-i18n="hero.badge">Topoľčany, Slovakia</span>
    <h1 class="hero-heading" data-i18n="hero.heading">KOMPLETNÉ STAVEBNÉ A VÝKOPOVÉ RIEŠENIA</h1>
    <p class="hero-subtitle" data-i18n="hero.subtitle">Profesionálne stavebné služby v Topoľčanoch a okolí</p>
    <a href="#contact" class="btn-primary" data-i18n="hero.cta">Žiadosť o cenovú ponuku</a>
  </div>
  <div class="hero-scroll-indicator">
    <div class="scroll-mouse">
      <div class="scroll-dot"></div>
    </div>
  </div>
</section>
```

```css
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.65) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
}

.hero-badge {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-accent);
  border: 1px solid var(--text-accent);
  border-radius: 24px;
  padding: 0.4rem 1.2rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.08em;
}

.hero-heading {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5.5vw, 4.5rem);
  font-weight: 800;
  color: var(--text-primary);
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 1.2rem;
  letter-spacing: 0.02em;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.btn-primary {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-on-accent);
  background: var(--bg-accent);
  padding: 1rem 2.5rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(232, 118, 10, 0.3);
}

/* Scroll indicator */
.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-mouse {
  width: 26px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.scroll-dot {
  width: 4px;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  animation: scrollBounce 1.8s ease-in-out infinite;
}

@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(12px); opacity: 0.3; }
}
```

---

## Section 2: SHOWCASE GRID

```html
<section class="section showcase-grid" id="equipment">
  <div class="container">
    <h2 class="section-title section-reveal" data-i18n="equipment.title">NAŠA TECHNIKA</h2>
    <p class="section-subtitle section-reveal" data-i18n="equipment.subtitle">Moderné stroje pre každý projekt</p>
    <div class="grid-4">
      <!-- Repeat for each item -->
      <div class="card showcase-card section-reveal">
        <div class="card-image-wrap">
          <img src="images/equipment-1.jpg" alt="Minibager" loading="lazy">
          <span class="badge-number">01</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">MINIBAGER</h3>
          <p class="card-desc">Presné výkopové práce aj v stiesnených priestoroch</p>
        </div>
      </div>
      <!-- ... more cards -->
    </div>
  </div>
</section>
```

```css
.section {
  padding: 6rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.04em;
  margin-bottom: 0.8rem;
}

.section-subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 3rem;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.showcase-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition-base), transform var(--transition-base);
}

.showcase-card:hover {
  border-color: var(--text-accent);
  transform: translateY(-4px);
}

.card-image-wrap {
  position: relative;
  overflow: hidden;
}

.card-image-wrap img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.showcase-card:hover .card-image-wrap img {
  transform: scale(1.05);
}

.badge-number {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-accent);
  color: var(--text-on-accent);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-body {
  padding: 1.2rem 1.4rem 1.4rem;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .grid-4 { grid-template-columns: 1fr; }
}
```

---

## Section 3: PROJECT SHOWCASE

```html
<section class="section project-showcase" id="project">
  <div class="container">
    <div class="project-grid">
      <div class="project-info section-reveal">
        <span class="label-accent" data-i18n="project.label">REALIZOVANÝ PROJEKT</span>
        <h2 class="project-heading" data-i18n="project.heading">VÝKOPOVÉ A ZEMNÉ PRÁCE PRE BYTOVÚ VÝSTAVBU</h2>
        <p class="project-desc" data-i18n="project.desc">Komplexný projekt zahŕňajúci prípravu staveniska, výkopové práce, transport materiálu a finálnu úpravu terénu.</p>
        <div class="project-tabs">
          <button class="tab-btn active" data-tab="before" data-i18n="project.tabBefore">Pred</button>
          <button class="tab-btn" data-tab="during" data-i18n="project.tabDuring">Počas</button>
          <button class="tab-btn" data-tab="after" data-i18n="project.tabAfter">Po</button>
        </div>
        <div class="project-stats">
          <div class="stat-card">
            <span class="stat-value"><span class="counter" data-value="2500">0</span> M<sup>3</sup></span>
            <span class="stat-label" data-i18n="project.stat1Label">Vykopanej zeminy</span>
          </div>
          <div class="stat-card">
            <span class="stat-value"><span class="counter" data-value="14">0</span> <span class="stat-unit" data-i18n="project.stat2Unit">DNÍ</span></span>
            <span class="stat-label" data-i18n="project.stat2Label">Doba realizácie</span>
          </div>
          <div class="stat-card">
            <span class="stat-value"><span class="counter" data-value="100">0</span>%</span>
            <span class="stat-label" data-i18n="project.stat3Label">Spokojnosť klienta</span>
          </div>
        </div>
      </div>
      <div class="project-images section-reveal">
        <div class="project-gallery" data-active-tab="before">
          <img src="images/project-before-1.jpg" alt="Project before" loading="lazy" class="gallery-img">
          <img src="images/project-before-2.jpg" alt="Project before detail" loading="lazy" class="gallery-img">
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.project-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;
}

.label-accent {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-accent);
  display: block;
  margin-bottom: 1rem;
}

.project-heading {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  line-height: 1.15;
  margin-bottom: 1.2rem;
}

.project-desc {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.project-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.tab-btn {
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: none;
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  padding: 0.5rem 1.3rem;
  cursor: pointer;
  transition: all var(--transition-base);
}

.tab-btn.active {
  color: var(--text-accent);
  border-color: var(--text-accent);
  background: rgba(232, 118, 10, 0.08);
}

.tab-btn:hover:not(.active) {
  border-color: var(--text-secondary);
}

.project-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 1.2rem;
  text-align: center;
}

.stat-value {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  color: var(--text-accent);
  display: block;
  margin-bottom: 0.3rem;
}

.stat-unit {
  font-size: 0.7em;
  font-weight: 500;
}

.stat-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.project-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
  aspect-ratio: 3 / 4;
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .project-stats {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .project-stats {
    grid-template-columns: 1fr;
  }
}
```

---

## Section 4: SERVICES GRID (Bento Layout)

```html
<section class="section services-section" id="services">
  <div class="container">
    <h2 class="section-title section-reveal" data-i18n="services.title">NAŠE SLUŽBY</h2>
    <div class="services-bento">
      <div class="service-card span-2 active section-reveal">
        <div class="service-icon"><!-- SVG icon --></div>
        <h3 class="service-title" data-i18n="services.s1Title">KOMPLETNÉ STAVEBNÉ RIEŠENIA</h3>
        <p class="service-desc" data-i18n="services.s1Desc">Od projektu po kolaudáciu</p>
      </div>
      <div class="service-card section-reveal">
        <div class="service-icon"><!-- SVG icon --></div>
        <h3 class="service-title" data-i18n="services.s2Title">VÝKOPOVÉ A ZEMNÉ PRÁCE</h3>
        <p class="service-desc" data-i18n="services.s2Desc">Profesionálne zemné práce akéhokoľvek rozsahu</p>
      </div>
      <div class="service-card section-reveal">
        <div class="service-icon"><!-- SVG icon --></div>
        <h3 class="service-title">PRÁCE MINIBAGROM</h3>
        <p class="service-desc">Presné práce v stiesnených podmienkach</p>
      </div>
      <div class="service-card section-reveal">
        <div class="service-icon"><!-- SVG icon --></div>
        <h3 class="service-title">DOPRAVA BETÓNU</h3>
        <p class="service-desc">Autodomiešavačom priamo na stavbu</p>
      </div>
      <div class="service-card span-2 section-reveal">
        <div class="service-icon"><!-- SVG icon --></div>
        <h3 class="service-title">DODÁVKOVÁ PREPRAVA</h3>
        <p class="service-desc">Rýchla preprava materiálu a nástrojov</p>
      </div>
      <div class="service-card section-reveal">
        <div class="service-icon"><!-- SVG icon --></div>
        <h3 class="service-title">KONTAJNEROVÁ PREPRAVA</h3>
        <p class="service-desc">Odvoz a dovoz materiálu v kontajneroch</p>
      </div>
    </div>
  </div>
</section>
```

```css
.services-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}

.service-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 2rem;
  transition: border-color var(--transition-base);
  cursor: default;
}

.service-card:hover,
.service-card.active {
  border-color: var(--text-accent);
}

.service-card.span-2 {
  grid-column: span 2;
}

.service-icon {
  margin-bottom: 1.2rem;
}

.service-icon svg {
  width: 32px;
  height: 32px;
  stroke: var(--text-accent);
  stroke-width: 1.5;
  fill: none;
}

.service-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
}

.service-desc {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .services-bento {
    grid-template-columns: 1fr;
  }
  .service-card.span-2 {
    grid-column: span 1;
  }
}
```

---

## Section 5: PROCESS TIMELINE

```html
<section class="section process-section" id="process">
  <div class="container">
    <h2 class="section-title section-reveal" data-i18n="process.title">AKO TO FUNGUJE</h2>
    <div class="process-timeline">
      <div class="process-step section-reveal">
        <div class="step-circle">
          <!-- SVG: phone icon -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <span class="step-number">01</span>
        <h3 class="step-title" data-i18n="process.step1Title">KONTAKT</h3>
        <p class="step-desc" data-i18n="process.step1Desc">Zavolajte nám alebo vyplňte formulár</p>
      </div>
      <div class="process-step section-reveal">
        <div class="step-circle"><!-- SVG: search icon --></div>
        <span class="step-number">02</span>
        <h3 class="step-title">OBHLIADKA</h3>
        <p class="step-desc">Bezplatná obhliadka a posúdenie miesta</p>
      </div>
      <div class="process-step section-reveal">
        <div class="step-circle"><!-- SVG: clipboard icon --></div>
        <span class="step-number">03</span>
        <h3 class="step-title">PLÁNOVANIE</h3>
        <p class="step-desc">Príprava detailného plánu prác</p>
      </div>
      <div class="process-step section-reveal">
        <div class="step-circle"><!-- SVG: hard-hat/build icon --></div>
        <span class="step-number">04</span>
        <h3 class="step-title">REALIZÁCIA</h3>
        <p class="step-desc">Profesionálna realizácia projektu</p>
      </div>
    </div>
  </div>
</section>
```

```css
.process-timeline {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding-top: 2rem;
}

/* Connecting line between steps */
.process-timeline::before {
  content: '';
  position: absolute;
  top: calc(2rem + 28px);  /* Center of circles */
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--border-subtle);
  z-index: 0;
}

.process-step {
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 1;
  max-width: 200px;
}

.step-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--bg-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: var(--text-on-accent);
}

.step-number {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-accent);
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.5rem;
}

.step-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
}

.step-desc {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .process-timeline {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding-left: 3rem;
  }
  .process-timeline::before {
    top: 0;
    bottom: 0;
    left: calc(3rem + 20px);
    right: auto;
    width: 2px;
    height: auto;
  }
  .process-step {
    text-align: left;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    max-width: 100%;
  }
  .step-circle {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    margin: 0;
  }
}
```

---

## Section 6: COVERAGE MAP

```html
<section class="section coverage-section" id="coverage">
  <div class="container">
    <h2 class="section-title section-reveal" data-i18n="coverage.title">OBLASŤ PÔSOBENIA</h2>
    <p class="section-subtitle section-reveal" data-i18n="coverage.subtitle">Topoľčany a okolité regióny</p>
    <div class="coverage-map section-reveal">
      <div class="map-ring ring-outer"></div>
      <div class="map-ring ring-middle"></div>
      <div class="map-ring ring-inner"></div>
      <div class="map-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--bg-accent)" stroke="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span class="map-center-label">TOPOĽČANY</span>
      </div>
      <!-- City dots — position with CSS custom properties -->
      <div class="city-dot" style="--x: 35%; --y: 22%;">
        <span class="dot"></span>
        <span class="city-name">Nitra</span>
      </div>
      <div class="city-dot" style="--x: 62%; --y: 32%;">
        <span class="dot"></span>
        <span class="city-name">Zlaté Moravce</span>
      </div>
      <div class="city-dot" style="--x: 28%; --y: 55%;">
        <span class="dot"></span>
        <span class="city-name">Piešťany</span>
      </div>
      <div class="city-dot" style="--x: 65%; --y: 62%;">
        <span class="dot"></span>
        <span class="city-name">Partizánske</span>
      </div>
      <div class="city-dot" style="--x: 42%; --y: 80%;">
        <span class="dot"></span>
        <span class="city-name">Bánovce nad Bebravou</span>
      </div>
    </div>
  </div>
</section>
```

```css
.coverage-map {
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;
  margin: 3rem auto 0;
}

.map-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid var(--border-subtle);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ring-outer { width: 100%; height: 100%; }
.ring-middle { width: 66%; height: 66%; }
.ring-inner { width: 33%; height: 33%; }

.map-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
}

.map-center-label {
  display: block;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.3rem;
}

.city-dot {
  position: absolute;
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  z-index: 1;
}

.city-dot .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--bg-accent);
  flex-shrink: 0;
}

.city-name {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

@media (max-width: 480px) {
  .coverage-map {
    max-width: 320px;
  }
  .city-name {
    font-size: 0.65rem;
  }
}
```

---

## Section 7: CTA BANNER

```html
<section class="cta-banner">
  <div class="container">
    <h2 class="cta-heading section-reveal" data-i18n="cta.heading">POTREBUJETE STAVEBNÉ SLUŽBY?</h2>
    <p class="cta-subtitle section-reveal" data-i18n="cta.subtitle">Kontaktujte nás a získajte nezáväznú cenovú ponuku</p>
    <a href="#contact" class="btn-dark section-reveal" data-i18n="cta.button">Kontaktujte nás</a>
  </div>
</section>
```

```css
.cta-banner {
  background: var(--bg-accent);
  padding: 6rem 0;
  text-align: center;
}

.cta-heading {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: var(--text-on-accent);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2.5rem;
}

.btn-dark {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  background: var(--bg-primary);
  padding: 1rem 2.5rem;
  border: 2px solid var(--bg-primary);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: all var(--transition-base);
}

.btn-dark:hover {
  background: transparent;
  color: var(--text-on-accent);
  border-color: var(--text-on-accent);
}
```

---

## Section 8: CONTACT

```html
<section class="section contact-section" id="contact">
  <div class="container">
    <h2 class="section-title section-reveal" data-i18n="contact.title">KONTAKT</h2>
    <div class="contact-grid">
      <div class="contact-info section-reveal">
        <div class="info-card">
          <div class="info-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div>
            <span class="info-label" data-i18n="contact.phoneLabel">Telefón</span>
            <strong class="info-value">0910 318 099</strong>
          </div>
        </div>
        <div class="info-card">
          <span class="info-text" data-i18n="contact.coverage">Pokrytie do 50 km od Topoľčian</span>
        </div>
      </div>
      <form class="contact-form section-reveal" data-netlify="true" name="contact" method="POST">
        <input type="text" name="name" placeholder="Meno" required data-i18n-placeholder="contact.namePlaceholder">
        <input type="email" name="email" placeholder="E-mail" required data-i18n-placeholder="contact.emailPlaceholder">
        <select name="service" required>
          <option value="" disabled selected data-i18n="contact.serviceDefault">Vyberte službu</option>
          <option value="construction">Stavebné práce</option>
          <option value="excavation">Výkopové práce</option>
          <option value="transport">Preprava</option>
          <option value="other">Iné</option>
        </select>
        <textarea name="message" rows="5" placeholder="Správa" data-i18n-placeholder="contact.messagePlaceholder"></textarea>
        <button type="submit" class="btn-submit">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          <span data-i18n="contact.submitBtn">Odoslať žiadosť</span>
        </button>
      </form>
    </div>
  </div>
</section>
```

```css
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.info-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-accent);
  flex-shrink: 0;
}

.info-label {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--text-secondary);
  display: block;
}

.info-value {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
}

.info-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 1rem 1.2rem;
  outline: none;
  transition: border-color var(--transition-base);
  width: 100%;
}

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  border-color: var(--text-accent);
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: var(--text-secondary);
}

.contact-form select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a0a0a0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

.contact-form textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-on-accent);
  background: var(--bg-accent);
  border: none;
  border-radius: var(--radius-sm);
  padding: 1rem 2rem;
  cursor: pointer;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(232, 118, 10, 0.3);
}

/* Validation states */
.contact-form input:invalid:not(:placeholder-shown),
.contact-form select:invalid {
  border-color: #e53935;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

---

## JavaScript: Core Modules

### Scroll Reveal Animations

```js
function initScrollReveal() {
  gsap.registerPlugin(ScrollTrigger);

  // Basic reveal for all .section-reveal elements
  document.querySelectorAll('.section-reveal').forEach((el, i) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Stagger cards within grid containers
  document.querySelectorAll('.grid-4, .services-bento').forEach(grid => {
    const cards = grid.querySelectorAll('.card, .service-card');
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
}
```

### Counter Animations

```js
function initCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseFloat(el.dataset.value);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toLocaleString();
      }
    });
  });
}
```

### Tab Switching (Project Showcase)

```js
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const gallery = document.querySelector('.project-gallery');
  if (!tabBtns.length || !gallery) return;

  // Define image sets per tab
  const imageSets = {
    before: ['images/project-before-1.jpg', 'images/project-before-2.jpg'],
    during: ['images/project-during-1.jpg', 'images/project-during-2.jpg'],
    after:  ['images/project-after-1.jpg', 'images/project-after-2.jpg']
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      const imgs = gallery.querySelectorAll('.gallery-img');
      const newSrcs = imageSets[tab] || imageSets.before;
      imgs.forEach((img, i) => {
        if (newSrcs[i]) {
          gsap.to(img, { opacity: 0, duration: 0.2, onComplete: () => {
            img.src = newSrcs[i];
            gsap.to(img, { opacity: 1, duration: 0.3 });
          }});
        }
      });
    });
  });
}
```

### Mobile Menu

```js
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });
}
```

### Language Toggle (i18n)

```js
function initI18n(translations) {
  let currentLang = localStorage.getItem('lang') || 'sk';
  const toggle = document.querySelector('.lang-toggle span');

  function applyLang(lang) {
    document.documentElement.lang = lang;
    const data = translations[lang];
    if (!data) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const keys = el.dataset.i18n.split('.');
      let value = data;
      for (const key of keys) {
        value = value?.[key];
      }
      if (value) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const keys = el.dataset.i18nPlaceholder.split('.');
      let value = data;
      for (const key of keys) {
        value = value?.[key];
      }
      if (value) el.placeholder = value;
    });

    if (toggle) toggle.textContent = lang === 'sk' ? 'EN' : 'SK';
    localStorage.setItem('lang', lang);
    currentLang = lang;
  }

  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      applyLang(currentLang === 'sk' ? 'en' : 'sk');
    });
  }

  applyLang(currentLang);
}
```

### Form Validation

```js
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const inputs = form.querySelectorAll('[required]');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = '#e53935';
      } else {
        input.style.borderColor = '';
      }
    });
    const email = form.querySelector('input[type="email"]');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      valid = false;
      email.style.borderColor = '#e53935';
    }
    if (!valid) e.preventDefault();
  });
}
```

### Init Everything

```js
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initTabs();
  initMobileMenu();
  initFormValidation();

  // Uncomment and populate translations object for i18n:
  // initI18n(translations);
});
```
