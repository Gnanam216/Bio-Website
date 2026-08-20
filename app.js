document.addEventListener('DOMContentLoaded', () => {
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.error('PORTFOLIO_DATA is not defined. Please check config.js.');
    return;
  }

  initPersonalInfo();
  initSocials();
  initExperience();
  initEducation();
  initSkills();
  initTheme();
  initMobileMenu();
  initContactForm();
  initScrollAnimations();
  initNavHighlight();
  initNavShrink();
  initTypingEffect();
  initCounters();
  initBackToTop();

  feather.replace();
});

// ── Personal Info ──────────────────────────────────────────
function initPersonalInfo() {
  const info = PORTFOLIO_DATA.personalInfo;

  document.title = `${info.name} | Portfolio`;
  const profileImg = document.getElementById('profile-img');
  if (profileImg) profileImg.alt = `${info.name} Profile`;

  const navLogo = document.getElementById('nav-logo');
  if (navLogo) {
    const first = info.name.split(' ')[0];
    const last  = info.name.split(' ')[1]?.charAt(0) || 'J';
    navLogo.innerHTML = `${first}<span>.${last}</span>`;
  }

  document.getElementById('hero-name').textContent = `Hi, I'm ${info.name}`;
  // hero-title-text is handled by typing effect
  document.getElementById('hero-tagline-text').textContent = info.tagline;
  document.getElementById('about-bio-text').textContent   = info.bio;
  document.getElementById('footer-name').textContent      = info.name;
  document.getElementById('about-location').textContent   = info.location;
  document.getElementById('contact-location-text').textContent = info.location;
  document.getElementById('about-email').textContent      = info.email;

  const emailLink = document.getElementById('contact-email-link');
  if (emailLink) { emailLink.textContent = info.email; emailLink.href = `mailto:${info.email}`; }

  const phoneLink = document.getElementById('contact-phone-link');
  if (phoneLink && info.phone) { phoneLink.textContent = info.phone; phoneLink.href = `tel:${info.phone}`; }

  const resumeLink = document.getElementById('resume-link');
  if (resumeLink) {
    if (info.socials.resume && info.socials.resume !== '#') {
      resumeLink.href = info.socials.resume;
    } else {
      resumeLink.style.display = 'none';
    }
  }

  document.getElementById('current-year').textContent = new Date().getFullYear();
}

// ── Typing Effect on hero subtitle ───────────────────────
function initTypingEffect() {
  const el = document.getElementById('hero-title-text');
  if (!el) return;

  const phrases = [
    PORTFOLIO_DATA.personalInfo.title,
    '.NET Core & C# Engineer',
    'React.js Developer',
    'Azure Cloud Architect',
    'Mobile App Developer (.NET MAUI)',
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;

  // Remove any gradient clip so typing text looks right
  el.style.webkitTextFillColor = '';
  el.style.backgroundImage    = '';
  el.style.color               = '';

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 80);
  }

  // Blinking cursor via a sibling span
  el.insertAdjacentHTML('afterend', '<span class="typing-cursor">|</span>');
  tick();
}

// ── Animated counters in about stats ─────────────────────
function initCounters() {
  const cards = document.querySelectorAll('.stat-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const numEl = entry.target.querySelector('.stat-number');
      if (!numEl || numEl.dataset.counted) return;
      numEl.dataset.counted = '1';

      const target = parseFloat(numEl.textContent);
      const isDecimal = numEl.textContent.includes('.');
      const duration  = 1400;
      const start     = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const value    = eased * target;
        numEl.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
        if (progress < 1) requestAnimationFrame(update);
        else numEl.textContent = isDecimal ? target.toFixed(1) : target;
      }
      requestAnimationFrame(update);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  cards.forEach(c => observer.observe(c));
}

// ── Socials ───────────────────────────────────────────────
function initSocials() {
  const socials    = PORTFOLIO_DATA.personalInfo.socials;
  const heroCont   = document.getElementById('hero-socials-container');
  const footerCont = document.getElementById('footer-socials-container');

  heroCont.innerHTML = footerCont.innerHTML = '';

  const icons = { github: 'github', linkedin: 'linkedin', twitter: 'twitter' };

  Object.keys(socials).forEach(key => {
    if (key === 'resume' || !socials[key] || socials[key] === '#') return;
    const icon = icons[key] || 'link';
    const html = `
      <a href="${socials[key]}" target="_blank" rel="noopener noreferrer"
         class="social-icon-link" aria-label="${key}">
        <i data-feather="${icon}"></i>
      </a>`;
    heroCont.insertAdjacentHTML('beforeend', html);
    footerCont.insertAdjacentHTML('beforeend', html);
  });
}

// ── Experience Timeline ───────────────────────────────────
function initExperience() {
  const timeline = document.getElementById('experience-timeline');
  timeline.innerHTML = '';

  PORTFOLIO_DATA.experience.forEach(exp => {
    const hl = exp.highlights.map(h => `<li>${h}</li>`).join('');
    timeline.insertAdjacentHTML('beforeend', `
      <div class="timeline-item scroll-reveal-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h3 class="timeline-role">${exp.role}</h3>
            <div class="timeline-meta">
              <span><i data-feather="briefcase" style="width:14px;height:14px"></i> ${exp.company}</span>
              <span><i data-feather="calendar"  style="width:14px;height:14px"></i> ${exp.duration}</span>
            </div>
          </div>
          <div class="timeline-body">
            <p>${exp.description}</p>
            <ul class="timeline-highlights">${hl}</ul>
          </div>
        </div>
      </div>`);
  });
}

// ── Education Cards ───────────────────────────────────────
function initEducation() {
  const container = document.getElementById('education-container');
  container.innerHTML = '';

  PORTFOLIO_DATA.education.forEach((edu, i) => {
    const hl = edu.highlights.map(h => `<li>${h}</li>`).join('');
    container.insertAdjacentHTML('beforeend', `
      <div class="education-card scroll-reveal-item" style="--delay:${i * 0.12}s">
        <span class="edu-duration">${edu.duration}</span>
        <h3 class="edu-degree">${edu.degree}</h3>
        <p class="edu-school">${edu.school}</p>
        <p class="edu-details">${edu.details}</p>
        <ul class="edu-highlights">${hl}</ul>
      </div>`);
  });
}

// ── Skills ────────────────────────────────────────────────
function initSkills() {
  const skills    = PORTFOLIO_DATA.skills;
  const container = document.getElementById('skills-container');
  const filterBtns= document.querySelectorAll('.filter-btn');

  function renderSkills(cat = 'all') {
    container.innerHTML = '';
    const list = cat === 'all' ? skills : skills.filter(s => s.category === cat);

    list.forEach((skill, i) => {
      container.insertAdjacentHTML('beforeend', `
        <div class="skill-card scroll-reveal-item" data-category="${skill.category}"
             style="--delay:${i * 0.06}s">
          <div class="skill-header">
            <span class="skill-name">
              <span class="skill-icon">${skill.icon || ''}</span>
              ${skill.name}
            </span>
            <span class="skill-pct">${skill.level}%</span>
          </div>
          <div class="skill-track">
            <div class="skill-bar" data-level="${skill.level}"></div>
          </div>
        </div>`);
    });

    // Re-observe new items
    observeRevealItems();

    // Animate bars if section already visible
    if (document.getElementById('skills').classList.contains('active')) {
      setTimeout(animateBars, 100);
    }
  }

  function animateBars() {
    container.querySelectorAll('.skill-bar').forEach(bar => {
      bar.style.width = `${bar.dataset.level}%`;
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderSkills(e.target.dataset.category);
    });
  });

  renderSkills();
}

// ── Theme ─────────────────────────────────────────────────
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const saved  = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  const applyTheme = theme => {
    document.body.classList.toggle('dark-theme',  theme === 'dark');
    document.body.classList.toggle('light-theme', theme === 'light');
  };

  applyTheme(saved || (prefersLight ? 'light' : 'dark'));

  toggle.addEventListener('click', () => {
    const next = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}

// ── Mobile Menu ───────────────────────────────────────────
function initMobileMenu() {
  const btn    = document.getElementById('mobile-menu-btn');
  const nav    = document.getElementById('mobile-nav');
  const links  = document.querySelectorAll('.mobile-nav-link');

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.innerHTML = open ? '<i data-feather="x"></i>' : '<i data-feather="menu"></i>';
    feather.replace();
  });

  links.forEach(l => l.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.innerHTML = '<i data-feather="menu"></i>';
    feather.replace();
  }));
}

// ── Contact Form ──────────────────────────────────────────
function initContactForm() {
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const btn      = form.querySelector('.btn-submit');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;

    btn.disabled = true;
    btn.innerHTML = '<span>Sending…</span>';
    feedback.textContent = '';
    feedback.className   = 'form-feedback';

    setTimeout(() => {
      feedback.textContent = `✅ Thank you, ${name}! Your message was sent successfully.`;
      feedback.className   = 'form-feedback success';
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span><i data-feather="send"></i>';
      feather.replace();

      setTimeout(() => {
        feedback.textContent = '';
        feedback.className   = 'form-feedback';
      }, 5000);
    }, 1200);
  });
}

// ── Scroll reveal (staggered per item) ───────────────────
function observeRevealItems() {
  const items = document.querySelectorAll('.scroll-reveal-item:not(.visible)');
  const obs   = new IntersectionObserver((entries, ob) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseFloat(entry.target.style.getPropertyValue('--delay') || 0) * 1000;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      ob.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach(el => obs.observe(el));
}

function initScrollAnimations() {
  // Section-level reveal
  const sections = document.querySelectorAll('.scroll-reveal');
  const sectionObs = new IntersectionObserver((entries, ob) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');

      if (entry.target.id === 'skills') {
        entry.target.querySelectorAll('.skill-bar').forEach(bar => {
          bar.style.width = `${bar.dataset.level}%`;
        });
      }
      ob.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(s => sectionObs.observe(s));

  // Item-level stagger
  observeRevealItems();
}

// ── Navbar: active link on scroll ────────────────────────
function initNavHighlight() {
  const links    = document.querySelectorAll('.nav-link');
  const sectionIds = [...links].map(l => l.getAttribute('href').replace('#', ''));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}

// ── Navbar: shrink on scroll ──────────────────────────────
function initNavShrink() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── Back to top button ────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
