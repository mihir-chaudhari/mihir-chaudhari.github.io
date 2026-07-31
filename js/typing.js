/**
 * Typing effect for hero role
 */
(function () {
  'use strict';

  const roles = [
    'Java Backend Engineer',
    'Spring Boot Developer',
    'Microservices Architect',
    'Cloud-Native Engineer'
  ];

  const el = document.getElementById('typing-text');
  if (!el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pauseEnd = false;

  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseTime = 2000;

  function tick() {
    const current = roles[roleIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 1000);
})();
