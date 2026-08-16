document.addEventListener('DOMContentLoaded', () => {
  // Tabs Logic
  const tabCompleted = document.getElementById('tab-completed');
  const tabOngoing = document.getElementById('tab-ongoing');
  const panelCompleted = document.getElementById('panel-completed');
  const panelOngoing = document.getElementById('panel-ongoing');

  if (tabCompleted && tabOngoing && panelCompleted && panelOngoing) {
    tabCompleted.addEventListener('click', () => {
      tabCompleted.classList.add('active');
      tabCompleted.setAttribute('aria-selected', 'true');
      tabOngoing.classList.remove('active');
      tabOngoing.setAttribute('aria-selected', 'false');
      
      panelCompleted.removeAttribute('hidden');
      panelOngoing.setAttribute('hidden', '');
    });

    tabOngoing.addEventListener('click', () => {
      tabOngoing.classList.add('active');
      tabOngoing.setAttribute('aria-selected', 'true');
      tabCompleted.classList.remove('active');
      tabCompleted.setAttribute('aria-selected', 'false');
      
      panelOngoing.removeAttribute('hidden');
      panelCompleted.setAttribute('hidden', '');
    });
  }

  // Mobile Menu Logic
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileNav.style.display = isExpanded ? 'none' : 'flex';
    });
  }

  // Lightbox Logic for Certifications
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const certLinks = document.querySelectorAll('.cert-link');
  const closeBtn = document.querySelector('.lightbox-close');

  if (lightbox && certLinks.length > 0) {
    certLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = link.getAttribute('href');
        const caption = link.getAttribute('data-caption');
        
        if(imgSrc && lightboxImg) {
          lightboxImg.src = imgSrc;
          if(lightboxCaption) lightboxCaption.textContent = caption || '';
          lightbox.classList.add('open');
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('open');
      });
    }

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });
  }

  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  // Reveal animations
  // 1. Auto-add reveal class to all elements we want to animate
  const elementsToReveal = document.querySelectorAll('.section-head, .case, .t-item, .chips li, .certs-list li, .about-text, .about-media, .hero-title, .hero-tagline, .hero-meta, .hero-photo');
  elementsToReveal.forEach(el => {
    if(!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });

  // 2. Setup the observer
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        } else {
          entry.target.classList.remove('in');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -5% 0px"
    });
    
    // Add staggered delay for lists (chips and certs)
    let delayCounter = 0;
    revealElements.forEach(el => {
      // If it's a chip or cert badge, add a slight staggered delay
      if (el.tagName.toLowerCase() === 'li') {
        el.style.transitionDelay = `${(delayCounter % 6) * 0.1}s`;
        delayCounter++;
      } else {
        delayCounter = 0;
      }
      revealObserver.observe(el);
    });
  }

});

