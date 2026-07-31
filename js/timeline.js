/**
 * Timeline scroll reveal animation
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    const items = document.querySelectorAll('.timeline__item');
    if (!items.length) return;

    if (prefersReducedMotion) {
      items.forEach((item) => item.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    items.forEach((item) => observer.observe(item));
  }

  document.addEventListener('DOMContentLoaded', init);
})();
