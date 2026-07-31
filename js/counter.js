/**
 * Animated counter for stats and achievements
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimal = parseInt(el.dataset.decimal, 10) || 0;
    const duration = 2000;
    const startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = target * eased;

      el.textContent = decimal > 0
        ? current.toFixed(decimal) + suffix
        : Math.floor(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = decimal > 0
          ? target.toFixed(decimal) + suffix
          : Math.floor(target) + suffix;
      }
    }

    if (prefersReducedMotion) {
      el.textContent = decimal > 0
        ? target.toFixed(decimal) + suffix
        : Math.floor(target) + suffix;
      return;
    }

    requestAnimationFrame(update);
  }

  function init() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));
  }

  document.addEventListener('DOMContentLoaded', init);
})();
