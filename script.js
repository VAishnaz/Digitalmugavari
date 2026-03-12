/* ═══════════════════════════════════════════
   DIGITAL MUGAVARI — SCRIPTS
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────
     HEADER SCROLL SHADOW
  ────────────────────────────────────── */
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  /* ──────────────────────────────────────
     SERVICES NAV — DYNAMIC TOP OFFSET
     Keeps nav right below header at every
     viewport width (critical for mobile
     where header height is auto).
  ────────────────────────────────────── */
  const servicesNav = document.getElementById('services-nav');
  function updateNavTop() {
    if (servicesNav && header) {
      const headerH = header.offsetHeight;
      servicesNav.style.top = headerH + 'px';
    }
  }
  updateNavTop();
  window.addEventListener('resize', updateNavTop);
  window.addEventListener('orientationchange', () => {
    setTimeout(updateNavTop, 150);
  });

  /* ──────────────────────────────────────
     SEARCH BAR & LAZY SEARCH
  ────────────────────────────────────── */
  const services = [
    { name: 'Website Development', tag: 'Web Dev', keywords: ['web', 'website', 'e-commerce', 'app', 'development', 'coding', 'wordpress', 'ui', 'ux'] },
    { name: 'Digital Marketing', tag: 'Marketing', keywords: ['ads', 'meta', 'google', 'facebook', 'instagram', 'ppc', 'revenue', 'campaign', 'email'] },
    { name: 'Search Engine Optimization', tag: 'SEO', keywords: ['seo', 'search', 'rank', 'google', 'visibility', 'traffic', 'backlink', 'keywords', 'optimization'] },
    { name: 'Branding', tag: 'Branding', keywords: ['logo', 'identity', 'brand', 'naming', 'guidelines', 'visual', 'storytelling'] },
    { name: 'Influencer Marketing', tag: 'Social', keywords: ['influencer', 'social', 'collaboration', 'trust', 'engagement', 'creator'] },
    { name: 'Graphic Design', tag: 'Design', keywords: ['design', 'graphics', 'illustration', 'poster', 'banner', 'motion', 'video'] },
  ];

  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');
  const searchBtn = document.querySelector('.search-btn');

  function findServiceMatch(query) {
    const q = query.toLowerCase().trim();
    if (!q) return null;

    // First try: exact name match
    let match = services.find(s => s.name.toLowerCase() === q || s.tag.toLowerCase() === q);
    if (match) return match;

    // Second try: name includes query
    match = services.find(s => s.name.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q));
    if (match) return match;

    // Third try: keyword match
    match = services.find(s => s.keywords.some(k => k.toLowerCase().includes(q) || q.includes(k.toLowerCase())));
    if (match) return match;

    return null;
  }

  function renderDropdown(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      searchDropdown.classList.remove('active');
      return;
    }

    const filtered = services.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.tag.toLowerCase().includes(q) ||
      s.keywords.some(k => k.includes(q))
    );

    if (!filtered.length) {
      searchDropdown.innerHTML = '<div class="search-dropdown-empty">No matching services found</div>';
      searchDropdown.classList.add('active');
      return;
    }

    searchDropdown.innerHTML = filtered.slice(0, 6).map(s => `
      <div class="search-dropdown-item" data-service="${s.name}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <div class="sdi-info">
          <span class="sdi-name">${s.name}</span>
          <span class="sdi-tag">${s.tag}</span>
        </div>
      </div>
    `).join('');
    searchDropdown.classList.add('active');
  }

  // Helper to open and clear
  function openAndClear(serviceName) {
    openModal(serviceName);
    searchInput.value = '';
    searchDropdown.classList.remove('active');
  }

  // Debounce for lazy search
  let searchTimeout;
  searchInput.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      renderDropdown(e.target.value);
    }, 250);
  });

  searchInput.addEventListener('focus', e => {
    if (e.target.value) renderDropdown(e.target.value);
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const match = findServiceMatch(searchInput.value);
      if (match) {
        openAndClear(match.name);
      }
    }
  });

  searchBtn.addEventListener('click', () => {
    const match = findServiceMatch(searchInput.value);
    if (match) {
      openAndClear(match.name);
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) {
      searchDropdown.classList.remove('active');
    }
  });

  searchDropdown.addEventListener('click', e => {
    const item = e.target.closest('.search-dropdown-item');
    if (item && item.dataset.service) {
      openAndClear(item.dataset.service);
    }
  });

  /* ──────────────────────────────────────
     SERVICES MODAL
  ────────────────────────────────────── */
  const servicesData = {
    'Website Development': {
      title: 'Website Development',
      desc: 'Performance-optimized, pixel-perfect websites that convert visitors to clients.',
      icon: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>',
      weDo: ['Responsive Design', 'E-commerce Solutions', 'Full-Stack Web Apps', 'UI/UX Prototyping', 'Performance Tuning', 'CMS Integration']
    },
    'Digital Marketing': {
      title: 'Digital Marketing',
      desc: 'End-to-end digital strategies that drive measurable growth across all channels.',
      icon: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>',
      weDo: ['Meta & Google Ads', 'Content Strategy', 'Email Automation', 'Conversion Optimization', 'Market Research', 'Campaign Analysis']
    },
    'Search Engine Optimization': {
      title: 'Search Engine Optimization',
      desc: 'Rank higher, get found faster. Technical and content SEO that dominates search results.',
      icon: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" /></svg>',
      weDo: ['Technical SEO Audit', 'Keyword Strategy', 'Backlink Building', 'On-Page Optimization', 'Local SEO', 'Content Marketing']
    },
    'Branding': {
      title: 'Branding',
      desc: 'Craft a distinct identity that resonates, remembered, and respected everywhere.',
      icon: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>',
      weDo: ['Brand Identity', 'Logo Design', 'Brand Guidelines', 'Visual Storytelling', 'Packaging Design', 'Naming & Copy']
    },
    'Influencer Marketing': {
      title: 'Influencer Marketing',
      desc: 'Collaborating with trusted voices to expand reach, build trust, and drive engagement.',
      icon: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      weDo: ['Creator Sourcing', 'Campaign Management', 'Contract Negotiation', 'Brand Partnerships', 'Performance Tracking', 'Content Seeding']
    },
    'Graphic Design': {
      title: 'Graphic Design',
      desc: 'Creative designs that shape identities and make your brand unforgettable.',
      icon: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path></svg>',
      weDo: ['Social Media Visuals', 'Print & Editorial', 'Illustrations', 'Motion Graphics', 'Presentation Design', 'Brand Assets']
    }
  };

  const servicesModal = document.getElementById('servicesModal');
  const modalClose = document.getElementById('modalClose');
  const sdIcon = document.getElementById('sdIcon');
  const sdTitle = document.getElementById('sdTitle');
  const sdDesc = document.getElementById('sdDesc');
  const sdWeDo = document.getElementById('sdWeDo'); // New element
  const sdCta = document.getElementById('sdCta');

  function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    if (data) {
      sdIcon.innerHTML = data.icon;
      sdTitle.textContent = data.title;
      sdDesc.textContent = data.desc;

      // Populate WE DO section
      if (data.weDo && sdWeDo) {
        sdWeDo.innerHTML = `
          <div class="we-do-label">We Do:</div>
          <div class="we-do-grid">
            ${data.weDo.map((item, i) => `
              <div class="we-do-item" style="--delay: ${i * 0.05}s">
                <span class="we-do-dot">${i + 1}</span>
                ${item}
              </div>
            `).join('')}
          </div>
        `;
      }

      sdCta.onclick = () => {
        const msg = encodeURIComponent(`Hello, I'm interested in your ${data.title} service. Could you share more details?`);
        window.open(`https://wa.me/918807838134?text=${msg}`, '_blank');
      };

      servicesModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Add active state to nav tab temporarily
      document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
      const activeTab = document.querySelector(`.service-tab[data-service="${serviceKey}"]`);
      if (activeTab) activeTab.classList.add('active');
    }
  }

  function closeModal() {
    servicesModal.classList.remove('active');
    document.body.style.overflow = '';
    document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
  }

  document.querySelectorAll('.service-tab').forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      openModal(tab.dataset.service);
    });
  });

  modalClose.addEventListener('click', closeModal);
  servicesModal.addEventListener('click', e => {
    if (e.target === servicesModal) closeModal();
  });

  // Close modal on scroll
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollY - lastScrollY) > 80 && servicesModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Close modal with Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ──────────────────────────────────────
     HERO CAROUSEL
  ────────────────────────────────────── */
  const track = document.getElementById('carouselTrack');
  const slides = track.querySelectorAll('.carousel-slide');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  let currentSlide = 0;
  let autoSlideTimer;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  // Initialize first slide
  updateCarousel();

  function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });

    // Animate content on slide change
    slides.forEach((slide, i) => {
      const content = slide.querySelector('.slide-content');
      if (content) {
        content.classList.toggle('active', i === currentSlide);
      }
    });
  }

  function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    updateCarousel();
    resetAutoSlide();
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5500);
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToSlide(currentSlide + (diff > 0 ? 1 : -1));
  });

  resetAutoSlide();

  /* ──────────────────────────────────────
     TESTIMONIALS SLIDER
  ────────────────────────────────────── */
  const testiTrack = document.getElementById('testiTrack');
  const testiCards = testiTrack.querySelectorAll('.testi-card');
  const testiDotsContainer = document.getElementById('testiDots');
  const testiPrev = document.getElementById('testiPrev');
  const testiNext = document.getElementById('testiNext');

  let testiCurrent = 0;
  let testiVisible = getTestiVisible();
  let testiTotal = Math.ceil(testiCards.length / testiVisible);
  let testiAutoTimer;

  function getTestiVisible() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 1100) return 2;
    return 3;
  }

  function buildTestiDots() {
    testiVisible = getTestiVisible();
    testiTotal = Math.ceil(testiCards.length / testiVisible);
    testiDotsContainer.innerHTML = '';
    for (let i = 0; i < testiTotal; i++) {
      const d = document.createElement('div');
      d.classList.add('testi-dot');
      if (i === 0) d.classList.add('active');
      d.addEventListener('click', () => goToTesti(i));
      testiDotsContainer.appendChild(d);
    }
  }

  function updateTesti() {
    const cardWidth = testiCards[0].offsetWidth;
    const gap = 24;
    testiTrack.style.transform = `translateX(-${testiCurrent * (cardWidth + gap) * testiVisible}px)`;
    testiDotsContainer.querySelectorAll('.testi-dot').forEach((d, i) => {
      d.classList.toggle('active', i === testiCurrent);
    });
  }

  function goToTesti(n) {
    testiCurrent = (n + testiTotal) % testiTotal;
    updateTesti();
    resetTestiAuto();
  }

  function resetTestiAuto() {
    clearInterval(testiAutoTimer);
    testiAutoTimer = setInterval(() => goToTesti(testiCurrent + 1), 4500);
  }

  testiPrev.addEventListener('click', () => goToTesti(testiCurrent - 1));
  testiNext.addEventListener('click', () => goToTesti(testiCurrent + 1));

  buildTestiDots();
  resetTestiAuto();

  window.addEventListener('resize', () => {
    const newVisible = getTestiVisible();
    if (newVisible !== testiVisible) {
      testiCurrent = 0;
      buildTestiDots();
      updateTesti();
    }
  });

  // Touch for testimonials
  let tTestiStart = 0;
  testiTrack.addEventListener('touchstart', e => { tTestiStart = e.touches[0].clientX; });
  testiTrack.addEventListener('touchend', e => {
    const diff = tTestiStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToTesti(testiCurrent + (diff > 0 ? 1 : -1));
  });

  /* ──────────────────────────────────────
     PACKAGES — FORM LOGIC
  ────────────────────────────────────── */
  document.querySelectorAll('.pkg-card').forEach(card => {
    const mainBtn = card.querySelector('.pkg-cta');
    const closeBtn = card.querySelector('.pkg-form-close');
    const form = card.querySelector('.pkg-form');
    const formOverlay = card.querySelector('.pkg-form-overlay');

    if (mainBtn) {
      mainBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (form) form.reset();
        card.classList.add('form-active');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.remove('form-active');
        if (form) form.reset();
      });
    }

    // Close form when clicking on the overlay background
    if (formOverlay) {
      formOverlay.addEventListener('click', (e) => {
        if (e.target === formOverlay) {
          card.classList.remove('form-active');
          if (form) form.reset();
        }
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const businessName = formData.get('businessName');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const pkgName = card.dataset.package;

        // Skip custom package — has its own handler
        if (card.id === 'customPkgCard') return;

        const text = encodeURIComponent(
          `*Package Inquiry: ${pkgName}*\n\n` +
          `*Business Name:* ${businessName}\n` +
          `*Phone:* ${phone}\n` +
          `*Email:* ${email}\n\n` +
          `I'm interested in the ${pkgName}. Please get back to me.`
        );

        // Open WhatsApp
        window.open(`https://wa.me/918807838134?text=${text}`, '_blank');

        // Reset and close
        setTimeout(() => {
          form.reset();
          card.classList.remove('form-active');
        }, 500);
      });
    }
  });

  /* ──────────────────────────────────────
     CUSTOM PACKAGE — CHECKBOX & CTA LOGIC
  ────────────────────────────────────── */
  const customCard = document.getElementById('customPkgCard');
  const customCheckboxes = customCard.querySelectorAll('.custom-cb');
  const customCounter = document.getElementById('customCounter');
  const customCta = document.getElementById('customCta');
  const customSelectedField = document.getElementById('customSelectedField');
  const customForm = document.getElementById('customPkgForm');

  function getSelectedServices() {
    return Array.from(customCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  }

  function updateCustomState() {
    const selected = getSelectedServices();
    const count = selected.length;

    // Update counter
    customCounter.textContent = `${count} service${count !== 1 ? 's' : ''} selected`;
    customCounter.classList.toggle('has-selection', count > 0);

    // Enable / disable CTA
    customCta.disabled = count === 0;

    // Update the read-only field in the form overlay
    customSelectedField.value = selected.join(', ');
  }

  customCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateCustomState);
  });

  // Shake when clicking disabled CTA
  customCta.addEventListener('click', (e) => {
    e.stopPropagation();
    if (customCta.disabled) {
      customCta.classList.remove('shake');
      // Force reflow so the animation re-triggers
      void customCta.offsetWidth;
      customCta.classList.add('shake');
      return;
    }
    // Open form overlay
    customCard.classList.add('form-active');
    updateCustomState(); // refresh selected services field
  });

  // Custom form submit → WhatsApp
  customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(customForm);
    const services = getSelectedServices().join(', ');
    const customerName = formData.get('customerName');

    const msg = encodeURIComponent(
      `Hi, I'm interested in a custom package: ${services}. My name is ${customerName}.`
    );

    window.open(`https://wa.me/918807838134?text=${msg}`, '_blank');

    // Reset and close
    setTimeout(() => {
      customForm.reset();
      customCheckboxes.forEach(cb => cb.checked = false);
      updateCustomState();
      customCard.classList.remove('form-active');
    }, 500);
  });

  /* ──────────────────────────────────────
     SCROLL REVEAL (ENHANCED)
  ────────────────────────────────────── */
  // Setup stagger indices for components with .stagger-parent
  document.querySelectorAll('.stagger-parent').forEach(parent => {
    const children = parent.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.setProperty('--stagger-idx', i);
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.15, 
    rootMargin: '0px 0px -50px 0px' 
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────
     ACTIVE NAV LINK ON SCROLL
  ────────────────────────────────────── */
  const sections = ['hero', 'packages', 'clients', 'testimonials', 'contact'];
  const navLinks = document.querySelectorAll('.snav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const id = entry.target.id;
        const match = document.querySelector(`.snav-link[href="#${id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  /* ──────────────────────────────────────
     STAGGERED CARD REVEAL DELAYS
  ────────────────────────────────────── */
  document.querySelectorAll('.packages-grid .pkg-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

});
