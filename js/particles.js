/**
 * Particles.js configuration
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 60,
        density: { enable: true, value_area: 800 }
      },
      color: { value: ['#2563EB', '#7C3AED', '#00E5FF'] },
      shape: { type: 'circle' },
      opacity: {
        value: 0.3,
        random: true,
        anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 2,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#2563EB',
        opacity: 0.12,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: false },
        resize: true
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.3 } }
      }
    },
    retina_detect: true
  });
})();
