/**
 * Custom cursor, glow, and mouse spotlight
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice || prefersReducedMotion) return;

  const cursor = document.getElementById('cursor');
  const glow = document.getElementById('cursor-glow');
  const spotlight = document.getElementById('spotlight');

  if (!cursor || !glow || !spotlight) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let glowX = 0;
  let glowY = 0;
  let spotlightX = 0;
  let spotlightY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  const interactiveSelectors = 'a, button, .project-card, .skill-card, .skill-group, input, textarea, .nav-link, .contact-pill';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursor.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursor.classList.remove('hover');
    }
  });

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function animate() {
    cursorX = lerp(cursorX, mouseX, 0.35);
    cursorY = lerp(cursorY, mouseY, 0.35);
    glowX = lerp(glowX, mouseX, 0.08);
    glowY = lerp(glowY, mouseY, 0.08);
    spotlightX = lerp(spotlightX, mouseX, 0.06);
    spotlightY = lerp(spotlightY, mouseY, 0.06);

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    spotlight.style.left = spotlightX + 'px';
    spotlight.style.top = spotlightY + 'px';

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
