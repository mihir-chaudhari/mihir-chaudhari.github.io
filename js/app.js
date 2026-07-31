/**
 * Main application entry — initializes AOS, loader, form, code animation, architecture
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* Loader */
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const hide = () => loader.classList.add('hidden');

    if (prefersReducedMotion) {
      hide();
      return;
    }

    window.addEventListener('load', () => {
      setTimeout(hide, 2000);
    });

    setTimeout(hide, 4000);
  }

  /* AOS */
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: prefersReducedMotion ? true : false
      });
    }
  }

  /* Footer year */
  function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* Back to top */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    let ticking = false;

    const update = () => {
      btn.classList.toggle('visible', window.scrollY > 500);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Contact form */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.style.color = '#f87171';
        return;
      }

      const mailtoLink = `mailto:mihir.chaudharii@outlook.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;

      status.textContent = 'Opening your email client...';
      status.style.color = '';
      form.reset();
    });
  }

  /* Java code animation */
  function initCodeAnimation() {
    const codeEl = document.getElementById('code-animation');
    if (!codeEl || prefersReducedMotion) return;

    const lines = [
      '<span class="ann">@Service</span>',
      '<span class="kw">public class</span> <span class="type">PolicyService</span> {',
      '  <span class="ann">@Autowired</span>',
      '  <span class="kw">private</span> <span class="type">PolicyRepository</span> repo;',
      '',
      '  <span class="kw">public</span> <span class="type">Policy</span> <span class="fn">processPolicy</span>(<span class="type">String</span> id) {',
      '    <span class="kw">return</span> repo.findById(id)',
      '      .map(<span class="kw">this</span>::validate)',
      '      .orElseThrow();',
      '  }',
      '}'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentHTML = '';
    let displayed = [];

    function typeNext() {
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          lineIndex = 0;
          charIndex = 0;
          currentHTML = '';
          displayed = [];
          codeEl.innerHTML = '';
          typeNext();
        }, 3000);
        return;
      }

      const line = lines[lineIndex];

      if (charIndex === 0) {
        displayed.push('');
      }

      if (charIndex < line.length) {
        displayed[lineIndex] = line.substring(0, charIndex + 1);
        charIndex++;
      } else {
        lineIndex++;
        charIndex = 0;
      }

      codeEl.innerHTML = displayed.join('\n') + '<span class="caret"></span>';
      requestAnimationFrame(() => setTimeout(typeNext, charIndex === 0 && line === '' ? 100 : 30));
    }

    setTimeout(typeNext, 2500);
  }

  /* Architecture diagram animation */
  function initArchitecture() {
    const diagram = document.querySelector('.architecture__diagram');
    if (!diagram) return;

    const svg = diagram.querySelector('.arch-svg');
    const nodes = svg.querySelectorAll('.arch-node');
    const arrows = svg.querySelectorAll('.arch-arrow');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          svg.classList.add('animated');
          nodes.forEach((node) => node.classList.add('visible'));
          arrows.forEach((arrow) => arrow.classList.add('visible'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(diagram);
  }

  /* Custom cursor class on body */
  function initCursorClass() {
    if (!isTouchDevice && !prefersReducedMotion) {
      document.body.classList.add('custom-cursor');
    }
  }

  /* Lazy load images */
  function initLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            observer.unobserve(img);
          }
        });
      });
      images.forEach((img) => observer.observe(img));
    }
  }

  /* Init all */
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initAOS();
    initYear();
    initBackToTop();
    initContactForm();
    initCodeAnimation();
    initArchitecture();
    initCursorClass();
    initLazyLoad();
  });
})();
