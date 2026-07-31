/**
 * Projects data, card rendering, and modal
 */
(function () {
  'use strict';

  const projects = [
    {
      id: 'insurance-dashboard',
      title: 'Insurance Business Processing Dashboard',
      period: 'March 2025 – March 2026',
      stack: 'Spring Boot Microservices',
      icon: 'fa-solid fa-shield-halved',
      description: 'Enterprise microservices platform integrating with Policy Administration System (PAS) for end-to-end insurance policy workflows with automated business processing.',
      overview: 'Built RESTful APIs with Spring Boot to integrate with a Policy Administration System (PAS), supporting end-to-end policy workflows for Bajaj Life Insurance.',
      features: [
        'RESTful API integration with Policy Administration System (PAS)',
        'Automated business workflows covering 34% of new business requests',
        'Automated servicing request handling for 22% of cases',
        'Scalable microservices architecture for high transaction volumes',
        'CI/CD pipeline integration with OpenShift deployment'
      ],
      architecture: 'Microservices-based architecture using Spring Boot services communicating via REST APIs, integrated with Oracle database through optimized PL/SQL procedures, deployed on Red Hat OpenShift with Jenkins CI/CD pipelines.',
      challenges: [
        'Integrating with legacy PAS systems while maintaining data consistency',
        'Optimizing Oracle PL/SQL queries for high-volume transaction processing',
        'Ensuring 99.9% uptime across distributed microservices'
      ],
      impact: [
        'Automated 34% of new business workflows',
        'Reduced Oracle query execution time by 25%',
        'Achieved 99.9% system uptime on OpenShift',
        'Enabled scalable processing of high transaction volumes'
      ],
      technologies: ['Java 8', 'Spring Boot', 'REST APIs', 'Microservices', 'Oracle', 'PL/SQL', 'OpenShift', 'Jenkins', 'CI/CD']
    },
    {
      id: 'customer-portal-modernization',
      title: 'Customer Portal Revamp',
      period: 'April 2026 – Present',
      stack: 'Java 21, Spring Boot, REST APIs',
      icon: 'fa-solid fa-user-shield',
      description: 'Revamping a customer self-service portal for Bajaj Life Insurance to manage policies, payments, profile updates, service requests, and policy operations.',
      overview: 'Working on a customer self-service portal for Bajaj Life Insurance to modernize policy management and customer operations while preserving existing functionality.',
      features: [
        'Policy details and premium payment management',
        'Profile updates and service request handling',
        'Modernized backend modules with Java 21 migration',
        'Improved performance, maintainability, and code quality',
        'AI-assisted migration support using Claude Opus and Claude Sonnet'
      ],
      architecture: 'Refactoring legacy Java modules into a modern Spring Boot architecture with REST APIs, Oracle backend integration, and deployment-ready support for OpenShift.',
      challenges: [
        'Upgrading from Java 8 to Java 21 without disrupting customer operations',
        'Preserving existing functionality while modernizing legacy code',
        'Refactoring backend modules for performance and maintainability'
      ],
      impact: [
        'Accelerated migration from Java 8 to Java 21',
        'Improved application maintainability and readiness for future enhancements'
      ],
      technologies: ['Java 21', 'Spring Boot', 'REST APIs', 'Oracle', 'Maven', 'Git', 'GitHub', 'OpenShift']
    },
    {
      id: 'logistics-docket',
      title: 'Logistics & Docket Management System',
      period: 'Sep 2023 – Mar 2025',
      stack: 'Spring Boot + Angular',
      icon: 'fa-solid fa-truck-fast',
      description: 'Full-stack enterprise application for end-to-end document lifecycle management with Spring Boot backend and Angular frontend.',
      overview: 'Built a full-stack enterprise application using Spring Boot and Angular for end-to-end document lifecycle management within Bajaj Life Insurance operations.',
      features: [
        'End-to-end document lifecycle management',
        'RESTful APIs with PostgreSQL database integration',
        'Angular-based frontend for document tracking and management',
        'Automated workflow processing reducing operational delays',
        'Query optimization and database indexing for performance'
      ],
      architecture: 'Three-tier architecture with Angular frontend, Spring Boot REST API layer, and PostgreSQL database. Agile development with cross-functional team collaboration on system design.',
      challenges: [
        'Managing complex document lifecycle states across multiple departments',
        'Optimizing PostgreSQL queries for large document datasets',
        'Coordinating frontend-backend integration in an Agile delivery model'
      ],
      impact: [
        'Improved database performance by 25% through query optimization',
        'Reduced operational delays by 20% via workflow automation',
        'Streamlined document tracking across the organization',
        'Enabled efficient cross-team collaboration on system design'
      ],
      technologies: ['Java 8', 'Spring Boot', 'Angular', 'REST APIs', 'PostgreSQL', 'Agile/Scrum']
    }
  ];

  const grid = document.getElementById('projects-grid');
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');

  function createCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${project.title}`);

    card.innerHTML = `
      <div class="project-card__visual">
        <i class="${project.icon} project-card__icon" aria-hidden="true"></i>
      </div>
      <div class="project-card__body">
        <span class="project-card__period">${project.period}</span>
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__stack">${project.stack}</p>
        <p class="project-card__desc">${project.description}</p>
        <span class="project-card__link">View Details <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
      </div>
    `;

    card.addEventListener('click', () => openModal(project));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(project);
      }
    });

    return card;
  }

  function openModal(project) {
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <h2 id="modal-title">${project.title}</h2>
      <p class="modal__meta">${project.period} · ${project.stack}</p>

      <div class="modal__section">
        <h4><i class="fa-solid fa-circle-info" aria-hidden="true"></i> Overview</h4>
        <p>${project.overview}</p>
      </div>

      <div class="modal__section">
        <h4><i class="fa-solid fa-list-check" aria-hidden="true"></i> Features</h4>
        <ul>${project.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </div>

      <div class="modal__section">
        <h4><i class="fa-solid fa-sitemap" aria-hidden="true"></i> Architecture</h4>
        <p>${project.architecture}</p>
      </div>

      <div class="modal__section">
        <h4><i class="fa-solid fa-puzzle-piece" aria-hidden="true"></i> Challenges</h4>
        <ul>${project.challenges.map((c) => `<li>${c}</li>`).join('')}</ul>
      </div>

      <div class="modal__section">
        <h4><i class="fa-solid fa-chart-line" aria-hidden="true"></i> Business Impact</h4>
        <ul>${project.impact.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>

      <div class="modal__section">
        <h4><i class="fa-solid fa-layer-group" aria-hidden="true"></i> Technology Stack</h4>
        <div class="modal__tags">
          ${project.technologies.map((t) => `<span class="modal__tag">${t}</span>`).join('')}
        </div>
      </div>
    `;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function init() {
    if (!grid) return;

    projects.forEach((project) => {
      grid.appendChild(createCard(project));
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) {
        closeModal();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
