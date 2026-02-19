/**
 * Dany Ramadhan - Personal Branding Website
 * Main JS: typing effect, scroll progress, mobile menu, AOS
 */

(function () {
  'use strict';

  // --- Typing effect (hero)
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const phrases = [
      'Core Banking & Financial Systems',
      'Enterprise Dashboard & Reporting',
      'REST API & Microservices',
      'Scalable System Architecture',
      'Mobile Banking Integration',
      'High-Performance Database Design',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }
      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 800);
  }

  // --- Scroll progress bar
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    function updateProgress() {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // --- Navbar background on scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    function toggleNavBg() {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-dark/80', 'backdrop-blur-xl', 'border-b', 'border-white/5');
      } else {
        navbar.classList.remove('bg-dark/80', 'backdrop-blur-xl', 'border-b', 'border-white/5');
      }
    }
    window.addEventListener('scroll', toggleNavBg, { passive: true });
    toggleNavBg();
  }

  // --- Mobile menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
      const isExpanded = !mobileMenu.classList.contains('hidden');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });
    document.querySelectorAll('#mobile-menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }
})();
