document.addEventListener('DOMContentLoaded', function () {
  // Typing animation for hero section - robust typewriter
  const roles = ['AI/ML Enthusiast', 'Data Analyst', 'Cloud Learner'];
  const roleTextElement = document.querySelector('.role-text .text-accent');
  const cursorElement = document.querySelector('.role-text .cursor');

  if (roleTextElement) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const TYPING_SPEED = 100; // ms per char
    const DELETING_SPEED = 50; // ms per char when deleting
    const PAUSE_AFTER_TYPING = 2000; // pause when a word is fully typed
    const PAUSE_AFTER_DELETING = 500; // short pause after fully deleted

    function tick() {
      const current = roles[roleIndex];

      if (!isDeleting) {
        // add character
        charIndex = Math.min(charIndex + 1, current.length);
        roleTextElement.textContent = current.substring(0, charIndex);

        if (charIndex === current.length) {
          // finished typing - pause then start deleting
          isDeleting = true;
          setTimeout(tick, PAUSE_AFTER_TYPING);
          return;
        }
        setTimeout(tick, TYPING_SPEED);
      } else {
        // delete character
        charIndex = Math.max(charIndex - 1, 0);
        roleTextElement.textContent = current.substring(0, charIndex);

        if (charIndex === 0) {
          // finished deleting - move to next word
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, PAUSE_AFTER_DELETING);
          return;
        }
        setTimeout(tick, DELETING_SPEED);
      }
    }

    // gentle cursor handling: ensure cursor element exists and animate via class if desired
    if (cursorElement) {
      cursorElement.style.opacity = '1';
    }

    // start
    tick();
  }

  // Smooth scrolling and active nav link highlighting
  const navLinks = document.querySelectorAll('.nav-links a.nav-item');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Tabs for Tech Stack section
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabsContent = document.querySelectorAll('.tabs-content');

  if (tabTriggers.length > 0) {
    tabTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = btn.getAttribute('data-tab');
        if (!target) return;

        // deactivate all triggers and contents
        tabTriggers.forEach((t) => t.classList.remove('active'));
        tabsContent.forEach((c) => c.classList.remove('active'));

        // activate clicked
        btn.classList.add('active');
        const content = document.getElementById(target);
        if (content) content.classList.add('active');
      });

      // keyboard support: left/right arrows
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const triggers = Array.from(tabTriggers);
          const idx = triggers.indexOf(btn);
          let nextIdx = idx;
          if (e.key === 'ArrowRight') nextIdx = (idx + 1) % triggers.length;
          if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + triggers.length) % triggers.length;
          triggers[nextIdx].focus();
          triggers[nextIdx].click();
        }
      });
    });
  }
  // Add this inside the DOMContentLoaded event listener in your script.js file

// Project carousel functionality
const carousels = document.querySelectorAll('.project-carousel');

carousels.forEach((carousel) => {
  const slides = carousel.querySelector('.carousel-slides');
  const slideCount = slides.children.length;
  let currentIndex = 0;

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

    // Auto-advance with pause on hover/focus. Keep the interval id to clear when paused.
    let carouselInterval = null;
    const AUTOPLAY_MS = 3000;

    function startCarousel() {
      if (carouselInterval) return;
      carouselInterval = setInterval(showNextSlide, AUTOPLAY_MS);
      carousel.classList.remove('paused');
    }

    function stopCarousel() {
      if (!carouselInterval) return;
      clearInterval(carouselInterval);
      carouselInterval = null;
      carousel.classList.add('paused');
    }

    // start by default unless user prefers reduced motion
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) startCarousel();

    // Pause on hover / focus for accessibility
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', () => { if (!prefersReduced) startCarousel(); });
    carousel.addEventListener('focusin', stopCarousel);
    carousel.addEventListener('focusout', () => { if (!prefersReduced) startCarousel(); });
});

  const sections = document.querySelectorAll('section');
  const nav = document.querySelector('.navigation');

  window.addEventListener('scroll', () => {
    // Nav scroll effect
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        const sectionId = section.getAttribute('id');
        if (sectionId) {
          current = sectionId;
        }
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // ---------------- Advanced Animations: reveal-on-scroll, blobs, parallax, modal handling ----------------

  // Respect user prefers-reduced-motion for motion-heavy features
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll using IntersectionObserver
  (function setupRevealOnScroll() {
    if (reducedMotion) return; // don't animate if user asked to reduce motion

    let revealables = document.querySelectorAll('.reveal, .reveal-stagger');
    // If there are no explicit reveal classes in the markup, add sensible defaults
    if (revealables.length === 0) {
      const defaults = Array.from(document.querySelectorAll('section, .project-card, .skill-item, .hero-text > *'));
      defaults.forEach((el) => el.classList.add('reveal'));
      revealables = document.querySelectorAll('.reveal, .reveal-stagger');
    }
    if (!('IntersectionObserver' in window) || revealables.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // if stagger container, reveal children with small delays handled by CSS
          // stop observing once revealed to save work
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealables.forEach((el) => observer.observe(el));
  })();

  // Parallax on scroll and data-animate observer
  (function setupParallaxAndAnimations() {
    if (reducedMotion) return; // avoid heavy motion when user prefers reduced motion

    // Parallax: elements with data-depth="0.1" etc. depth is a multiplier
    const parallaxEls = Array.from(document.querySelectorAll('[data-depth]'));
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY || window.pageYOffset;
        parallaxEls.forEach((el) => {
          const depth = parseFloat(el.getAttribute('data-depth')) || 0;
          // compute translateY based on element position and depth
          const y = scrolled * depth;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
        });
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // initial call
    onScroll();

    // IntersectionObserver for in/out animations using data-animate value
    const animTargets = document.querySelectorAll('[data-animate]');
    if ('IntersectionObserver' in window && animTargets.length) {
      const animObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const mode = el.getAttribute('data-animate') || 'fade-up';
          if (entry.isIntersecting) {
            el.classList.remove('anim-hidden');
            el.classList.add('anim-visible');
            // optional directional classes
            if (mode.includes('left')) el.classList.add('slide-left');
            if (mode.includes('right')) el.classList.add('slide-right');
            if (mode.includes('up')) el.classList.add('slide-up');
            if (mode.includes('zoom')) el.classList.add('zoom-in');
          } else {
            // optionally hide again when leaving viewport
            el.classList.remove('anim-visible');
            el.classList.add('anim-hidden');
            el.classList.remove('slide-left','slide-right','slide-up','zoom-in');
          }
        });
      }, { threshold: 0.12 });

      animTargets.forEach((t) => {
        t.classList.add('anim-hidden');
        animObserver.observe(t);
      });
    }
  })();

  // Smooth anchor scrolling + scrollspy + sticky nav state
  (function navEnhancements() {
    const nav = document.querySelector('.navigation');
    const links = Array.from(document.querySelectorAll('.nav-links a.nav-item[href^="#"]'));
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    let spyTicking = false;

    function getNavHeight() {
      return nav ? nav.offsetHeight : 0;
    }

    // Smooth scroll for nav items with offset
    links.forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - (getNavHeight() + 12);
        window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    });

    function onScroll() {
      if (spyTicking) return;
      spyTicking = true;
      requestAnimationFrame(() => {
        const y = window.pageYOffset || window.scrollY;
        const navH = getNavHeight();
        // toggle nav scrolled state
        if (nav) nav.classList.toggle('scrolled', y > 8);
        // find current section
        let currentId = '';
        for (const sec of sections) {
          const rect = sec.getBoundingClientRect();
          const top = rect.top + y - navH - 100;
          const bottom = top + sec.offsetHeight;
          if (y >= top && y < bottom) {
            currentId = sec.id;
            break;
          }
        }
        // update active link
        links.forEach((lnk) => {
          const href = lnk.getAttribute('href') || '';
          const isActive = currentId && href === `#${currentId}`;
          lnk.classList.toggle('active', isActive);
        });
        spyTicking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // initial paint
    onScroll();
  })();

  // Create background layers: keep gradient, replace shapes with edge-only canvas network
  (function createBackgroundLayers() {
    // Remove any previously-added shapes/overlays
    document.querySelectorAll('.network-overlay, .animated-blobs').forEach((el) => el.remove());

    // Always add/keep subtle gradient (not heavy motion)
    if (!document.querySelector('.animated-gradient')) {
      const grad = document.createElement('div');
      grad.className = 'animated-gradient';
      document.body.appendChild(grad);
    }

    // Add edge network canvas
    if (!document.querySelector('.edge-network-canvas')) {
      const c = document.createElement('canvas');
      c.className = 'edge-network-canvas';
      document.body.appendChild(c);
      initEdgeNetworkCanvas(c, { reducedMotion });
    }
  })();

  // Edge-only canvas network, theme-colored and lightweight
  function initEdgeNetworkCanvas(canvas, opts) {
    const ctx = canvas.getContext('2d');
    const state = {
      nodes: [],
      conns: [],
      packets: [],
      rafId: null,
      lastTime: 0,
      reduced: !!(opts && opts.reducedMotion)
    };

    function hslVar(name, alpha = 1) {
      const root = getComputedStyle(document.documentElement);
      const raw = (root.getPropertyValue(name) || '').trim(); // e.g. "217 91% 60%"
      const parts = raw.replace(/\s+/g, ', ');
      return `hsla(${parts}, ${alpha})`;
    }

    const colors = {
      line: hslVar('--accent', 0.42),
      node: hslVar('--primary', 0.68),
      packet: hslVar('--primary', 1),
      packetGlow: hslVar('--primary', 0.6),
      grid: hslVar('--accent', 0.09)
    };

    function resize() {
      const dpr = Math.max(1, Math.min(2.5, window.devicePixelRatio || 1));
      const w = Math.floor(window.innerWidth);
      const h = Math.floor(window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGraph(w, h);
    }

    function edgePoint(w, h, side, idx, count, margin) {
      // side: 0 top, 1 right, 2 bottom, 3 left
      const t = (idx + 0.5) / count;
      const jitter = (side % 2 === 0 ? h : w) * 0.03; // small jitter along inward axis
      switch (side) {
        case 0: return { x: margin + t * (w - margin * 2), y: margin + Math.random() * jitter };
        case 1: return { x: w - margin - Math.random() * jitter, y: margin + t * (h - margin * 2) };
        case 2: return { x: margin + t * (w - margin * 2), y: h - margin - Math.random() * jitter };
        case 3: return { x: margin + Math.random() * jitter, y: margin + t * (h - margin * 2) };
      }
      return { x: 0, y: 0 };
    }

    function buildGraph(w, h) {
      state.nodes = [];
      state.conns = [];
      state.packets = [];

      const perEdge = Math.max(5, Math.round((w + h) / 600) + 5); // scale with screen
      const margin = Math.max(16, Math.min(48, Math.round(Math.min(w, h) * 0.05)));

      // Build nodes along each edge (excluding bottom edge: side === 2)
      for (let side = 0; side < 4; side++) {
        if (side === 2) continue; // skip bottom edge per user request
        for (let i = 0; i < perEdge; i++) {
          const p = edgePoint(w, h, side, i, perEdge, margin);
          state.nodes.push({ x: p.x, y: p.y, pulse: Math.random() * Math.PI * 2 });
        }
      }

      // Corner mini-clusters (top corners only; omit bottom corners)
      const corners = [
        { x: margin, y: margin },
        { x: w - margin, y: margin }
      ];
      corners.forEach((c) => {
        for (let i = 0; i < 3; i++) {
          state.nodes.push({
            x: c.x + (Math.random() - 0.5) * margin * 0.7,
            y: c.y + (Math.random() - 0.5) * margin * 0.7,
            pulse: Math.random() * Math.PI * 2
          });
        }
      });

      // Connect near neighbors along edges and a few diagonal hints
      const N = state.nodes.length;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = state.nodes[i], b = state.nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          const near = Math.min(w, h) * 0.18;
          if (d < near && d > 24 && Math.random() < 0.14) {
            state.conns.push({ a, b, len: d });
          }
        }
      }
      // Ensure continuous lines along each edge by linking ordered nodes
      function linkEdge(filterFn, key) {
        const list = state.nodes.filter(filterFn).sort((p, q) => p[key] - q[key]);
        for (let i = 0; i < list.length - 1; i++) state.conns.push({ a: list[i], b: list[i + 1] });
      }
  linkEdge((p) => p.y < margin * 1.6, 'x'); // top
  linkEdge((p) => p.x > w - margin * 1.6, 'y'); // right
  // bottom edge intentionally omitted
  linkEdge((p) => p.x < margin * 1.6, 'y'); // left
    }

    function drawGrid(w, h) {
      // very faint edge grid
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      const step = Math.max(60, Math.min(120, Math.round(Math.min(w, h) / 10)));
      ctx.setLineDash([4, 8]);
      for (let x = 0; x <= w; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y <= h; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    function drawConnections() {
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1.6;
      ctx.setLineDash([6, 7]);
      state.conns.forEach(({ a, b }) => {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }

    function drawNodes(t) {
      state.nodes.forEach((n) => {
        const r = 1.8 + (Math.sin(t / 800 + n.pulse) + 1) * 0.7;
        ctx.fillStyle = colors.node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function spawnPacket() {
      if (state.conns.length === 0) return;
      const c = state.conns[Math.floor(Math.random() * state.conns.length)];
      const dir = Math.random() < 0.5 ? 1 : -1;
      const start = dir > 0 ? c.a : c.b;
      const end = dir > 0 ? c.b : c.a;
      state.packets.push({ start, end, t: 0, v: 0.008 + Math.random() * 0.006 });
    }

    function drawPackets() {
      ctx.fillStyle = colors.packet;
      state.packets.forEach((p, i) => {
        p.t += p.v;
        if (p.t >= 1) { state.packets.splice(i, 1); return; }
        const x = p.start.x + (p.end.x - p.start.x) * p.t;
        const y = p.start.y + (p.end.y - p.start.y) * p.t;

        // glow
        ctx.strokeStyle = colors.packetGlow;
        ctx.lineWidth = 2.2;
        ctx.strokeRect(x - 4, y - 4, 8, 8);
        ctx.fillRect(x - 2.2, y - 2.2, 4.4, 4.4);
      });
      // keep a modest number of packets
      if (state.packets.length < Math.max(4, Math.round(state.conns.length * 0.04)) && Math.random() < 0.7) {
        spawnPacket();
      }
    }

    function frame(ts) {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      drawGrid(w, h);
      drawConnections();
      drawNodes(ts || 0);
      if (!state.reduced) drawPackets();
      state.rafId = requestAnimationFrame(frame);
    }

    window.addEventListener('resize', resize);
    resize();
    if (state.reduced) {
      // single paint without animation
      drawGrid(canvas.clientWidth, canvas.clientHeight);
      drawConnections();
      drawNodes(0);
    } else {
      frame(0);
    }
    return state;
  }

  // Hero parallax: subtle movement based on mouse on large screens
  (function heroParallax() {
    const hero = document.querySelector('.hero-illustration');
    if (!hero || reducedMotion) return;

    hero.classList.add('parallax');
    // limit event handling frequency
    let raf = null;
    function onMove(e) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width; // -0.5 .. 0.5
        const dy = (e.clientY - cy) / rect.height;
        const tx = dx * 12; // reduce values
        const ty = dy * 10;
        hero.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${dx * 3}deg)`;
        raf = null;
      });
    }

    // reset when leaving
    function reset() {
      hero.style.transform = '';
    }

    window.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', reset);
    // touch devices: small parallax on device orientation could be added later
  })();

  // Modal open/close for certificate thumbnail
  (function modalHandling() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = modalOverlay ? modalOverlay.querySelector('.close-button') : null;
    const certificateTriggers = document.querySelectorAll('.certificate-trigger');
    if (!modalOverlay || certificateTriggers.length === 0) return;

    function openModal(imgSrc, alt) {
      const img = modalOverlay.querySelector('.modal-image');
      if (img) {
        img.src = imgSrc;
        img.alt = alt || '';
      }
      modalOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }

    certificateTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const img = trigger.querySelector('img');
        if (img) openModal(img.src, img.alt);
      });
    });

    // Wire 'View Certification' buttons to open modal (use data-src attribute)
    const viewButtons = document.querySelectorAll('.view-cert-btn');
    viewButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('data-href');
        if (href) {
          // open external credential link in a new tab
          window.open(href, '_blank', 'noopener noreferrer');
          return;
        }
        const src = btn.getAttribute('data-src');
        if (src) openModal(src, btn.getAttribute('aria-label') || 'Certificate');
      });
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay || e.target.classList.contains('close-button')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.style.display === 'flex') closeModal();
    });
  })();

  // Count-up animation for Coding Stats numbers
  (function setupCodingStatsCountUp() {
    const nums = Array.from(document.querySelectorAll('.coding-stat-number'));
    if (!nums.length) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Helper to animate integer value
    function animateCount(el, target, suffix = '', duration = 1200) {
      if (prefersReduced || duration <= 0) {
        el.textContent = `${Math.round(target)}${suffix}`;
        return;
      }
      const start = 0;
      const startTime = performance.now();

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(progress);
        const value = Math.round(start + (target - start) * eased);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    // Prepare targets from text (e.g., "385+" => 385 with suffix "+")
    nums.forEach((el) => {
      const raw = (el.textContent || '').trim();
      const match = raw.match(/(\d+)(.*)?/);
      const target = match ? parseInt(match[1], 10) : 0;
      const suffix = match && match[2] ? match[2] : '';
      el.dataset.target = String(target);
      el.dataset.suffix = suffix;
      // initialize to 0 with same suffix for a nicer entrance
      el.textContent = `0${suffix}`;
      el.dataset.counted = 'false';
    });

    function run(el) {
      if (!el || el.dataset.counted === 'true') return;
      el.dataset.counted = 'true';
      const target = parseInt(el.dataset.target || '0', 10);
      const suffix = el.dataset.suffix || '';
      animateCount(el, target, suffix, 1100);
    }

    // Trigger when the coding stats card is in view
    const container = document.querySelector('.coding-stats') || document.getElementById('about');
    if ('IntersectionObserver' in window && container) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nums.forEach(run);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      io.observe(container);
    } else {
      // Fallback: run immediately
      nums.forEach(run);
    }
  })();

  // ---------------- Back to top button with scroll progress ----------------
  (function backToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const circle = btn.querySelector('.progress-ring__circle');
    const R = 52; // matches r in SVG
    const CIRC = 2 * Math.PI * R;
    if (circle) {
      circle.style.strokeDasharray = String(CIRC);
      circle.style.strokeDashoffset = String(CIRC);
    }

    const showAfter = 120; // px scrolled before showing button

    function update() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      const offset = CIRC - (CIRC * pct);
      if (circle) circle.style.strokeDashoffset = String(offset);

      if (scrollTop > showAfter) btn.classList.add('show'); else btn.classList.remove('show');
    }

    // Respect reduced motion for click behavior
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (prefersReduced) {
        window.scrollTo({ top: 0 });
        return;
      }
      // smooth scroll with easing
      const start = window.pageYOffset || document.documentElement.scrollTop || 0;
      const duration = 600;
      const startTime = performance.now();

      function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

      function step(now) {
        const elapsed = Math.min(1, (now - startTime) / duration);
        const eased = easeOutCubic(elapsed);
        const y = start * (1 - eased);
        window.scrollTo(0, y);
        if (elapsed < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });

    // update on scroll/resize
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // initial update
    update();
  })();
});