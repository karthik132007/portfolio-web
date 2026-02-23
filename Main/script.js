/* =========================================================
   PORTFOLIO — SCRIPT (Premium Redesign)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  const reducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================
  // 1. TYPING ANIMATION
  // ==========================================
  (function initTyping() {
    const roles = ['AI/ML Enthusiast', 'Data Analyst', 'Cloud Learner'];
    const textEl = document.querySelector('.role-text .text-accent');
    const cursorEl = document.querySelector('.role-text .cursor');
    if (!textEl) return;

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    const TYPING_SPEED = 100;
    const DELETING_SPEED = 50;
    const PAUSE_TYPED = 2000;
    const PAUSE_DELETED = 400;

    function tick() {
      const currentRole = roles[roleIdx];

      if (!isDeleting) {
        charIdx++;
        textEl.textContent = currentRole.slice(0, charIdx);
        if (charIdx === currentRole.length) {
          isDeleting = true;
          setTimeout(tick, PAUSE_TYPED);
          return;
        }
        setTimeout(tick, TYPING_SPEED);
      } else {
        charIdx--;
        textEl.textContent = currentRole.slice(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          setTimeout(tick, PAUSE_DELETED);
          return;
        }
        setTimeout(tick, DELETING_SPEED);
      }
    }

    if (cursorEl) cursorEl.style.opacity = '1';
    tick();
  })();

  // ==========================================
  // 2. SCROLL REVEAL (IntersectionObserver)
  // ==========================================
  (function initScrollReveal() {
    if (reducedMotion) {
      // Show everything immediately
      document.querySelectorAll('[data-animate], .reveal-section').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

    // Section-level reveals
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-section').forEach((el) => {
      sectionObserver.observe(el);
    });

    // Element-level reveals
    const elemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          elemObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('[data-animate]').forEach((el) => {
      elemObserver.observe(el);
    });
  })();

  // ==========================================
  // 3. NAVIGATION — Scrollspy + Smooth Scroll
  // ==========================================
  (function initNav() {
    const nav = document.querySelector('.navigation');
    const links = Array.from(
      document.querySelectorAll('.nav-links a.nav-item[href^="#"]')
    );
    const sections = Array.from(document.querySelectorAll('main section[id]'));

    // Sticky nav effect
    function handleScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    // Scrollspy
    let spyTicking = false;
    function handleSpy() {
      if (spyTicking) return;
      spyTicking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY + 120;
        let currentId = '';

        sections.forEach((sec) => {
          if (sec.offsetTop <= scrollY) {
            currentId = sec.id;
          }
        });

        links.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${currentId}`
          );
        });
        spyTicking = false;
      });
    }

    window.addEventListener('scroll', () => {
      handleScroll();
      handleSpy();
    }, { passive: true });

    handleScroll();
    handleSpy();

    // Smooth scroll on click
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.offsetTop - 80;
        window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    });
  })();

  // ==========================================
  // 4. MOBILE MENU
  // ==========================================
  (function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-button button');
    const overlay = document.getElementById('mobileMenu');
    const closeBtn = overlay?.querySelector('.mobile-menu-close');
    const menuLinks = overlay?.querySelectorAll('a');

    if (!menuBtn || !overlay) return;

    function openMenu() {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);

    menuLinks?.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          closeMenu();
          const target = document.querySelector(href);
          if (target) {
            setTimeout(() => {
              const top = target.offsetTop - 80;
              window.scrollTo({
                top,
                behavior: reducedMotion ? 'auto' : 'smooth',
              });
            }, 300);
          }
        }
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeMenu();
      }
    });
  })();

  // ==========================================
  // 5. PROJECT CAROUSEL
  // ==========================================
  (function initCarousels() {
    const carousels = document.querySelectorAll('.project-carousel');

    carousels.forEach((carousel) => {
      const slides = carousel.querySelector('.carousel-slides');
      const slideCount = slides ? slides.children.length : 0;
      if (slideCount <= 1) return;

      let currentIndex = 0;
      let interval = null;
      const AUTOPLAY_MS = 3500;

      function showSlide(idx) {
        currentIndex = idx;
        slides.style.transform = `translateX(-${idx * 100}%)`;
      }

      function next() {
        showSlide((currentIndex + 1) % slideCount);
      }

      function start() {
        if (interval) return;
        interval = setInterval(next, AUTOPLAY_MS);
      }

      function stop() {
        clearInterval(interval);
        interval = null;
      }

      if (!reducedMotion) start();

      carousel.addEventListener('mouseenter', stop);
      carousel.addEventListener('mouseleave', () => {
        if (!reducedMotion) start();
      });
      carousel.addEventListener('focusin', stop);
      carousel.addEventListener('focusout', () => {
        if (!reducedMotion) start();
      });
    });
  })();

  // ==========================================
  // 6. CERTIFICATE MODAL
  // ==========================================
  (function initModal() {
    const modal = document.getElementById('certModal');
    if (!modal) return;

    const modalImg = modal.querySelector('.modal-image');
    const closeBtn = modal.querySelector('.close-button');

    // Internship certificate trigger
    const certTriggers = document.querySelectorAll('.certificate-trigger');
    certTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const img = trigger.querySelector('img');
        if (img && modalImg) {
          modalImg.src = img.src;
          modalImg.alt = img.alt || 'Certificate';
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Certification card buttons
    const viewBtns = document.querySelectorAll('.view-cert-btn');
    viewBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const href = btn.dataset.href;
        const src = btn.dataset.src;

        if (href) {
          window.open(href, '_blank');
          return;
        }

        if (src && modalImg) {
          modalImg.src = src;
          modalImg.alt = 'Certificate';
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  })();

  // ==========================================
  // 7. BACK-TO-TOP BUTTON
  // ==========================================
  (function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `
      <svg viewBox="0 0 36 36">
        <circle class="progress-ring__bg" cx="18" cy="18" r="14"
          fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2.5"/>
        <circle class="progress-ring__circle" cx="18" cy="18" r="14"
          fill="none" stroke-width="2.5" stroke-linecap="round"
          transform="rotate(-90 18 18)"/>
        <path class="arrow-up" d="M18 24V13M13 17l5-5 5 5"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    document.body.appendChild(btn);

    const circle = btn.querySelector('.progress-ring__circle');
    const radius = 14;
    const circumference = 2 * Math.PI * radius;

    if (circle) {
      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;
    }

    function update() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      if (scrollTop > 300) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }

      if (circle) {
        const offset = circumference - progress * circumference;
        circle.style.strokeDashoffset = `${offset}`;
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    });
  })();

  // ==========================================
  // 8. GLASS CARD MOUSE GLOW EFFECT
  // ==========================================
  (function initCardGlow() {
    if (reducedMotion) return;

    document.querySelectorAll('.glass-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  })();


// ==========================================
// 9. GITHUB CONTRIBUTION HEATMAP (LIVE DATA)
// ==========================================
(function initHeatmap() {
    const grid = document.getElementById('heatmapGrid');
    if (!grid) return;

    const GITHUB_USERNAME = 'karthik132007';
    const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

    // Animate stat counter with ease-out cubic
    function animateCounter(el, target) {
        if (!el || target === 0) { if (el) el.textContent = target; return; }
        const duration = 1500;
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        }
        requestAnimationFrame(step);
    }

    // Render heatmap grid from contribution data array
    function renderGrid(contributions) {
        const WEEKS = 52;
        const DAYS = 7;
        const TARGET = WEEKS * DAYS;

        // Take the most recent TARGET days
        const data = contributions.slice(-TARGET);

        // Pad if fewer entries
        while (data.length < TARGET) {
            data.unshift({ date: '', count: 0, level: 0 });
        }

        const fragment = document.createDocumentFragment();
        data.forEach((item) => {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            cell.setAttribute('data-level', Math.min(item.level, 4));

            let tooltip;
            if (item.date) {
                const d = new Date(item.date + 'T00:00:00');
                const dateStr = d.toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                });
                tooltip = item.count > 0
                    ? `${item.count} contribution${item.count > 1 ? 's' : ''} on ${dateStr}`
                    : `No contributions on ${dateStr}`;
            } else {
                tooltip = 'No data';
            }
            cell.setAttribute('data-tooltip', tooltip);
            fragment.appendChild(cell);
        });
        grid.appendChild(fragment);

        // Calculate stats
        const totalContributions = data.reduce((sum, d) => sum + d.count, 0);

        let currentStreak = 0;
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].count > 0) currentStreak++;
            else break;
        }

        let longestStreak = 0;
        let tempStreak = 0;
        for (const d of data) {
            if (d.count > 0) {
                tempStreak++;
                longestStreak = Math.max(longestStreak, tempStreak);
            } else {
                tempStreak = 0;
            }
        }

        return { totalContributions, currentStreak, longestStreak };
    }

    // Trigger stat animation on scroll into view
    function setupScrollTrigger(stats) {
        const section = document.getElementById('github-activity');
        if (!section) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(document.getElementById('heatmapCommits'), stats.totalContributions);
                    animateCounter(document.getElementById('heatmapCurrentStreak'), stats.currentStreak);
                    animateCounter(document.getElementById('heatmapLongestStreak'), stats.longestStreak);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(section);
    }

    // Fetch live data, fallback to generated data on failure
    fetch(API_URL)
        .then((res) => { if (!res.ok) throw new Error(res.status); return res.json(); })
        .then((json) => {
            const contributions = json.contributions || [];
            const stats = renderGrid(contributions);
            setupScrollTrigger(stats);
        })
        .catch(() => {
            console.warn('GitHub contributions API unavailable, using simulated data.');
            const data = [];
            const today = new Date();
            for (let i = 363; i >= 0; i--) {
                const d = new Date(today);
                d.setDate(d.getDate() - i);
                const rand = Math.random();
                let level = 0, count = 0;
                if (rand > 0.6) { level = 1; count = Math.ceil(Math.random() * 3); }
                if (rand > 0.75) { level = 2; count = Math.ceil(Math.random() * 5) + 2; }
                if (rand > 0.88) { level = 3; count = Math.ceil(Math.random() * 7) + 4; }
                if (rand > 0.95) { level = 4; count = Math.ceil(Math.random() * 10) + 8; }
                data.push({ date: d.toISOString().split('T')[0], count, level });
            }
            const stats = renderGrid(data);
            setupScrollTrigger(stats);
        });
})();

  // ==========================================
  // 10. PARTICLE CANVAS BACKGROUND
  // ==========================================
  (function initParticles() {
    if (reducedMotion) return;

    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width, height;
    let particles = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let animId;

    const PARTICLE_COUNT = 70;
    const MAX_CONNECT_DIST = 140;
    const MOUSE_RADIUS = 180;

    const colors = [
      'rgba(0, 212, 170, ',   // cyan
      'rgba(124, 58, 237, ',  // purple
      'rgba(56, 189, 248, ',  // blue
      'rgba(244, 114, 182, ', // pink
    ];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticle() {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        color,
        alpha: Math.random() * 0.5 + 0.15,
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_CONNECT_DIST) {
            const opacity = (1 - dist / MAX_CONNECT_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw dot with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();

        // Subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.alpha * 0.15) + ')';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    // Mouse tracking
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouseX = -9999;
      mouseY = -9999;
    });

    window.addEventListener('resize', () => {
      resize();
    });

    // Visibility API — pause when tab not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        draw();
      }
    });

    init();
    draw();
  })();
});