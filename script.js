/**
 * Elamani Tech - Single Page Application
 * Smooth navigation, mobile menu, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initNavigation();
  initMobileMenu();
  initScrollAnimations();
});

/**
 * Header scroll effect - subtle background change on scroll
 */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * Smooth scroll for anchor links
 */
function initNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if open
        document.querySelector('.nav')?.classList.remove('open');
      }
    });
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
      nav.classList.remove('open');
    }
  });
}

/**
 * Fade-in animations on scroll
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -20px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe sections and cards
  const animateElements = document.querySelectorAll(
    '.section-header, .about-content, .about-stats, .challenge-card, .founder-profile, .founder-content, .product-card, .revenue-streams, .market-opportunity, .trust-card, .contact-info'
  );

  animateElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.25s ease ${i * 0.02}s, transform 0.25s ease ${i * 0.02}s`;
    observer.observe(el);
  });

  // Add visible state styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll.visible,
    .section-header.visible,
    .about-content.visible,
    .about-stats.visible,
    .challenge-card.visible,
    .founder-profile.visible,
    .founder-content.visible,
    .product-card.visible,
    .revenue-streams.visible,
    .market-opportunity.visible,
    .trust-card.visible,
    .contact-info.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}
