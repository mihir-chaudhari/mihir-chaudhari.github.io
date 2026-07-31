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

  const skillDetails = {
    'Java 8': {
      category: 'Backend',
      description: 'Enterprise-grade Java development using Java 8 language features, object-oriented design, and JVM-based backend services.',
      details: ['Designed clean, maintainable abstractions with SOLID principles', 'Built business logic for high-throughput insurance systems', 'Optimized code for performance and memory footprint'],
      tools: ['JDK 8', 'Maven', 'Eclipse']
    },
    'Java 21': {
      category: 'Backend',
      description: 'Modern Java 21 development for next-generation backend services, focusing on migration, performance, and new language features.',
      details: ['Converted legacy Java 8 services to Java 21 for the customer portal revamp', 'Leveraged modern Java APIs and language enhancements', 'Improved runtime performance and code maintainability'],
      tools: ['JDK 21', 'Spring Boot', 'Maven']
    },
    'Spring Boot': {
      category: 'Backend',
      description: 'Spring Boot microservice framework for rapid backend development, auto-configuration, and production-ready REST APIs.',
      details: ['Created resilient service endpoints with embedded server support', 'Configured dependency injection, security, and actuator monitoring', 'Streamlined deployment with environment-specific profiles'],
      tools: ['Spring Framework', 'Spring Data', 'Spring Security']
    },
    'Spring MVC': {
      category: 'Backend',
      description: 'MVC-based request handling for web applications and REST controllers within Spring-based projects.',
      details: ['Built controller workflows and request mappings', 'Handled form submissions and JSON payloads', 'Implemented validation and exception handling'],
      tools: ['Spring Web', 'Thymeleaf', 'REST Controllers']
    },
    'REST APIs': {
      category: 'Backend',
      description: 'Designing and delivering RESTful APIs with clear resources, versioning, and consistent HTTP semantics.',
      details: ['Defined API contracts for enterprise workflows', 'Used JSON payloads with proper status codes', 'Ensured secure and stable integration points'],
      tools: ['Postman', 'Swagger', 'OpenAPI']
    },
    'Microservices': {
      category: 'Backend',
      description: 'Decoupled service architecture for scalable systems, with independent deployability and resilient communication.',
      details: ['Split monolithic designs into focused services', 'Handled service-to-service communication with REST', 'Applied resilience patterns for availability'],
      tools: ['Docker', 'Kubernetes', 'OpenShift']
    },
    'OOP Design': {
      category: 'Backend',
      description: 'Object-oriented programming principles for maintainable, extensible software design.',
      details: ['Applied encapsulation, abstraction, and composition', 'Designed modular classes and domain models', 'Used interfaces and inheritance effectively'],
      tools: ['UML', 'Design Patterns', 'SOLID']
    },
    'PostgreSQL': {
      category: 'Database',
      description: 'Relational database design, query optimization, and transactional consistency with PostgreSQL.',
      details: ['Modeled normalized schemas for business data', 'Optimized SQL queries and indexes', 'Managed database connections and migrations'],
      tools: ['pgAdmin', 'psql', 'SQL']
    },
    'Oracle': {
      category: 'Database',
      description: 'Enterprise Oracle database development with PL/SQL and performance tuning.',
      details: ['Developed stored procedures and packages', 'Improved query performance with explain plans', 'Maintained data integrity and backup processes'],
      tools: ['Oracle SQL*Plus', 'PL/SQL', 'Data Pump']
    },
    'PL/SQL': {
      category: 'Database',
      description: 'Procedural programming inside the database for business logic, data processing, and performance-critical operations.',
      details: ['Wrote stored procedures and functions', 'Created reusable database packages', 'Handled exceptions and transaction control'],
      tools: ['Oracle PL/SQL', 'Procedures', 'Packages']
    },
    'RDBMS/SQL': {
      category: 'Database',
      description: 'Relational database management and SQL querying for transactional systems.',
      details: ['Designed schemas and entity relationships', 'Wrote complex joins and aggregations', 'Managed transactions and data consistency'],
      tools: ['SQL', 'ER Modeling', 'Database Tuning']
    },
    'AWS EC2': {
      category: 'Cloud',
      description: 'AWS compute infrastructure for deploying backend services on virtual machines.',
      details: ['Provisioned and configured EC2 instances', 'Secured access with security groups', 'Monitored instance health and performance'],
      tools: ['AWS Console', 'EC2', 'SSH']
    },
    'AWS S3': {
      category: 'Cloud',
      description: 'Object storage for static assets, backups, and application data.',
      details: ['Stored and served files securely', 'Managed lifecycle policies', 'Integrated S3 storage with backend applications'],
      tools: ['AWS S3', 'Buckets', 'IAM']
    },
    'AWS Lambda': {
      category: 'Cloud',
      description: 'Serverless compute for event-driven functions and lightweight backend automation.',
      details: ['Built event-driven workflows', 'Designed lightweight cloud functions', 'Reduced infrastructure overhead for small tasks'],
      tools: ['AWS Lambda', 'API Gateway', 'CloudWatch']
    },
    'OpenShift': {
      category: 'DevOps',
      description: 'Container platform for deploying, scaling, and managing applications in production.',
      details: ['Deployed containerized microservices', 'Configured build pipelines', 'Monitored application health and scalability'],
      tools: ['OpenShift', 'Containers', 'Routes']
    },
    'Jenkins': {
      category: 'DevOps',
      description: 'Continuous integration server for automated builds, tests, and deployments.',
      details: ['Created pipeline jobs for builds and deployment', 'Automated unit tests and packaging', 'Integrated with Git repositories'],
      tools: ['Jenkins', 'Pipelines', 'Jobs']
    },
    'Git/GitHub': {
      category: 'DevOps',
      description: 'Version control and collaboration with Git and GitHub workflow practices.',
      details: ['Managed branches and pull requests', 'Reviewed code changes collaboratively', 'Resolved merge conflicts effectively'],
      tools: ['Git', 'GitHub', 'Branching']
    },
    'Maven': {
      category: 'DevOps',
      description: 'Build automation and dependency management for Java projects.',
      details: ['Configured project dependencies and plugins', 'Created reproducible build lifecycles', 'Managed release artifacts'],
      tools: ['Maven', 'POM', 'Plugins']
    },
    'CI/CD': {
      category: 'DevOps',
      description: 'Automated delivery pipelines for building, testing, and deploying software.',
      details: ['Enabled frequent, reliable deployments', 'Integrated automated tests into pipeline', 'Reduced manual release effort'],
      tools: ['CI/CD', 'Automation', 'Pipeline']
    },
    'Angular': {
      category: 'Frontend',
      description: 'Single-page application development using Angular for dynamic, component-driven interfaces.',
      details: ['Built reusable components and services', 'Handled state and routing in the UI', 'Connected frontend flows to backend APIs'],
      tools: ['Angular', 'TypeScript', 'RxJS']
    },
    'GitHub Copilot': {
      category: 'Tools & Practices',
      description: 'AI-powered code assistance for faster development and smarter suggestions.',
      details: ['Accelerated code generation and refactoring', 'Improved productivity in everyday coding tasks', 'Used AI to explore implementation options'],
      tools: ['GitHub Copilot', 'AI assistance']
    },
    'Claude AI': {
      category: 'Tools & Practices',
      description: 'AI assistant for debugging, design review, and developer productivity.',
      details: ['Used Claude to troubleshoot code issues', 'Generated implementation ideas and explanations', 'Enhanced developer workflows with AI suggestions'],
      tools: ['Claude', 'AI review']
    },
    'Agile/Scrum': {
      category: 'Tools & Practices',
      description: 'Agile delivery methodology focused on iterative planning, review, and collaboration.',
      details: ['Participated in sprint planning and standups', 'Delivered incremental value each iteration', 'Collaborated closely with stakeholders'],
      tools: ['Scrum', 'Sprint planning', 'Retrospectives']
    },
    'Performance Tuning': {
      category: 'Tools & Practices',
      description: 'Improving system speed, reliability, and efficiency through profiling and optimization.',
      details: ['Analyzed bottlenecks in code and database queries', 'Optimized response times and throughput', 'Improved resource usage under load'],
      tools: ['Profiling', 'Optimization', 'Monitoring']
    },
    'Code Review': {
      category: 'Tools & Practices',
      description: 'Reviewing code quality, readability, and best-practice adherence through peer feedback.',
      details: ['Provided constructive feedback on pull requests', 'Ensured consistent coding standards', 'Improved maintainability through code review'],
      tools: ['Code review', 'Best practices']
    }
  };

  function initSkillDetails() {
    const cards = document.querySelectorAll('.skill-card');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    if (!cards.length || !modal || !modalBody) return;

    cards.forEach((card) => {
      const label = card.querySelector('span');
      const skillName = label ? label.textContent.trim() : '';
      if (!skillName || !skillDetails[skillName]) return;

      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${skillName}`);

      const openSkillModal = () => {
        const skill = skillDetails[skillName];
        if (!skill) return;

        modalBody.innerHTML = `
          <h2 id="modal-title">${skillName}</h2>
          <p class="modal__meta">${skill.category}</p>
          <div class="modal__section">
            <h4><i class="fa-solid fa-circle-info" aria-hidden="true"></i> About</h4>
            <p>${skill.description}</p>
          </div>
          <div class="modal__section">
            <h4><i class="fa-solid fa-list-check" aria-hidden="true"></i> What I do</h4>
            <ul>${skill.details.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div class="modal__section">
            <h4><i class="fa-solid fa-layer-group" aria-hidden="true"></i> Related tools</h4>
            <div class="modal__tags">${skill.tools.map((tool) => `<span class="modal__tag">${tool}</span>`).join('')}</div>
          </div>
        `;

        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        const modalClose = document.getElementById('modal-close');
        if (modalClose) modalClose.focus();
      };

      card.addEventListener('click', openSkillModal);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openSkillModal();
        }
      });
    });
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
    initSkillDetails();
  });
})();
