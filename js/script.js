/**
 * ==========================================================================
 * STUCOARTE - JAVASCRIPT PRINCIPAL
 * Identidad: Acabados Coloniales & Arquitectura de Estuco
 * Vanilla JS Puro (Sin dependencias externas ni compilaciÃ³n)
 * Compatible con ejecuciÃ³n local y GitHub Pages
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. CONFIGURACIÃ“N OFICIAL DE LA MARCA STUCOARTE
  const CONFIG = {
    whatsappNumber: '50583771116', // NÃºmero oficial de WhatsApp de StucoArte
    facebookUrl: 'https://www.facebook.com/StucoArte',
    companyName: 'StucoArte'
  };

  // --------------------------------------------------------------------------
  // 2. NAVBAR SCROLL EFFECT
  // --------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // 3. MENÃš MÃ“VIL DESPLEGABLE (HAMBURGUESA)
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar al hacer clic en cualquier enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. GALERÍA: SELECCIÓN DESTACADA (9 FOTOS), CARRUSEL DE ADICIONALES Y LIGHTBOX
  // --------------------------------------------------------------------------
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryGrid = document.getElementById('galleryGrid');
  const allGalleryItems = Array.from(galleryGrid ? galleryGrid.querySelectorAll('.gallery-item') : []);
  const galleryMoreWrapper = document.getElementById('galleryMoreWrapper');
  const galleryMore = document.getElementById('galleryMore');
  const galleryMoreText = galleryMore?.querySelector('.gallery-more-text');
  const galleryMoreIcon = galleryMore?.querySelector('.gallery-more-icon');
  const galleryStatus = document.getElementById('galleryStatus');
  const galleryCarouselSection = document.getElementById('galleryCarouselSection');
  const carouselViewport = document.getElementById('carouselViewport');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const carouselCount = document.getElementById('carouselCount');
  const galleryLess = document.getElementById('galleryLess');

  const FEATURED_LIMIT = 9;
  let activeFilter = 'all';
  let isCarouselOpen = false;

  const getFilteredItems = () => {
    return allGalleryItems.filter(item => activeFilter === 'all' || item.dataset.category === activeFilter);
  };

  const getCarouselScrollStep = () => {
    if (!carouselViewport) return 300;
    const firstItem = carouselViewport.querySelector('.gallery-item');
    if (!firstItem) return carouselViewport.clientWidth;
    const style = window.getComputedStyle(carouselViewport);
    const gap = parseFloat(style.columnGap || style.gap) || 20;
    return firstItem.offsetWidth + gap;
  };

  const updateCarouselControls = () => {
    if (!carouselViewport || !galleryCarouselSection || galleryCarouselSection.hidden) return;
    const matches = getFilteredItems();
    const additionalCount = Math.max(0, matches.length - FEATURED_LIMIT);

    if (additionalCount === 0) {
      if (carouselPrev) { carouselPrev.disabled = true; carouselPrev.setAttribute('aria-disabled', 'true'); }
      if (carouselNext) { carouselNext.disabled = true; carouselNext.setAttribute('aria-disabled', 'true'); }
      if (carouselCount) carouselCount.textContent = '0 / 0';
      return;
    }

    const currentScroll = carouselViewport.scrollLeft;
    const maxScroll = carouselViewport.scrollWidth - carouselViewport.clientWidth;
    const atStart = currentScroll <= 4;
    const atEnd = currentScroll >= maxScroll - 4 || maxScroll <= 4;

    if (carouselPrev) {
      carouselPrev.disabled = atStart;
      carouselPrev.setAttribute('aria-disabled', String(atStart));
    }
    if (carouselNext) {
      carouselNext.disabled = atEnd;
      carouselNext.setAttribute('aria-disabled', String(atEnd));
    }

    if (carouselCount) {
      const step = getCarouselScrollStep();
      const currentIdx = Math.min(
        Math.max(1, Math.round(currentScroll / step) + 1),
        additionalCount
      );
      carouselCount.textContent = `${currentIdx} / ${additionalCount}`;
    }
  };

  const scrollCarousel = (direction) => {
    if (!carouselViewport) return;
    const step = getCarouselScrollStep();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    carouselViewport.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  carouselPrev?.addEventListener('click', () => scrollCarousel(-1));
  carouselNext?.addEventListener('click', () => scrollCarousel(1));

  let carouselScrollRaf = null;
  carouselViewport?.addEventListener('scroll', () => {
    if (carouselScrollRaf) window.cancelAnimationFrame(carouselScrollRaf);
    carouselScrollRaf = window.requestAnimationFrame(updateCarouselControls);
  }, { passive: true });

  carouselViewport?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollCarousel(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollCarousel(1);
    }
  });

  const setCarouselOpenState = (open, shouldScroll = false) => {
    isCarouselOpen = open;
    const matches = getFilteredItems();
    const hasMore = matches.length > FEATURED_LIMIT;

    if (galleryCarouselSection) {
      galleryCarouselSection.hidden = !isCarouselOpen || !hasMore;
      galleryCarouselSection.setAttribute('aria-hidden', String(!isCarouselOpen || !hasMore));
    }

    if (galleryMore) {
      galleryMore.hidden = !hasMore;
      galleryMore.setAttribute('aria-expanded', String(isCarouselOpen && hasMore));
      if (galleryMoreText) {
        galleryMoreText.textContent = isCarouselOpen ? 'Mostrar menos' : 'Ver más fotografías';
      }
      if (galleryMoreIcon) {
        galleryMoreIcon.textContent = isCarouselOpen ? '↑' : '↓';
      }
    }

    if (galleryStatus) {
      if (!hasMore) {
        galleryStatus.textContent = `${matches.length} de ${matches.length} fotografías`;
      } else {
        galleryStatus.textContent = isCarouselOpen
          ? `${matches.length} de ${matches.length} fotografías`
          : `${Math.min(FEATURED_LIMIT, matches.length)} de ${matches.length} fotografías`;
      }
    }

    if (isCarouselOpen && hasMore) {
      updateCarouselControls();
      if (shouldScroll) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        galleryCarouselSection?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'nearest'
        });
      }
    }
  };

  const renderGallery = (resetCarousel = false) => {
    if (resetCarousel) {
      if (carouselViewport) carouselViewport.scrollLeft = 0;
      isCarouselOpen = false;
    }

    const matches = getFilteredItems();
    const featuredItems = matches.slice(0, FEATURED_LIMIT);
    const carouselItems = matches.slice(FEATURED_LIMIT);

    // Distribuir elementos en cuadrícula inicial y carrusel sin duplicación
    if (galleryGrid) {
      galleryGrid.replaceChildren(...featuredItems);
    }
    if (carouselViewport) {
      carouselViewport.replaceChildren(...carouselItems);
    }

    // Actualizar botones de filtros
    galleryFilterBtns.forEach(btn => {
      const selected = btn.dataset.filter === activeFilter;
      btn.classList.toggle('active', selected);
      btn.setAttribute('aria-pressed', String(selected));
    });

    setCarouselOpenState(isCarouselOpen, false);
  };

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (activeFilter === btn.dataset.filter) return;
      activeFilter = btn.dataset.filter;
      // Reiniciar carrusel al cambiar de categoría
      renderGallery(true);
    });
  });

  galleryMore?.addEventListener('click', () => {
    setCarouselOpenState(!isCarouselOpen, true);
  });

  galleryLess?.addEventListener('click', () => {
    setCarouselOpenState(false, false);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    galleryMoreWrapper?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest'
    });
    galleryMore?.focus({ preventScroll: true });
  });

  window.addEventListener('resize', () => {
    if (isCarouselOpen) updateCarouselControls();
  }, { passive: true });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxCount = document.getElementById('lightboxCount');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentGalleryIndex = 0;
  let returnFocus = null;
  let previousOverflow = '';

  const openLightbox = (index) => {
    const items = getFilteredItems();
    const item = items[index];
    if (!item || !lightboxModal || !lightboxImg) return;
    currentGalleryIndex = index;
    const img = item.querySelector('.gallery-img');
    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxTitle) lightboxTitle.textContent = item.querySelector('.gallery-title')?.textContent || '';
    if (lightboxCategory) lightboxCategory.textContent = item.querySelector('.gallery-category')?.textContent || '';
    if (lightboxCount) lightboxCount.textContent = `${index + 1} / ${items.length}`;

    if (!lightboxModal.classList.contains('active')) {
      returnFocus = document.activeElement;
      previousOverflow = document.body.style.overflow;
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightboxClose?.focus();
    }
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousOverflow;
    if (returnFocus && typeof returnFocus.focus === 'function') {
      returnFocus.focus({ preventScroll: true });
    }
  };

  const stepLightbox = (step) => {
    const items = getFilteredItems();
    const count = items.length;
    if (count) {
      openLightbox((currentGalleryIndex + step + count) % count);
    }
  };

  const handleGalleryItemTrigger = (item) => {
    const items = getFilteredItems();
    const index = items.indexOf(item);
    if (index !== -1) {
      openLightbox(index);
    }
  };

  // Interacción para abrir lightbox tanto en selección inicial como en carrusel
  allGalleryItems.forEach(item => {
    item.addEventListener('click', () => handleGalleryItemTrigger(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleGalleryItemTrigger(item);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxNext?.addEventListener('click', () => stepLightbox(1));
  lightboxPrev?.addEventListener('click', () => stepLightbox(-1));

  lightboxModal?.addEventListener('click', (event) => {
    if (event.target === lightboxModal) closeLightbox();
  });

  // Gesto táctil (deslizar con el dedo) en el visor ampliado móvil
  let lightboxTouchStartX = 0;
  let lightboxTouchEndX = 0;
  lightboxModal?.addEventListener('touchstart', (e) => {
    lightboxTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightboxModal?.addEventListener('touchend', (e) => {
    lightboxTouchEndX = e.changedTouches[0].screenX;
    const diff = lightboxTouchEndX - lightboxTouchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) stepLightbox(1);
      else stepLightbox(-1);
    }
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (!lightboxModal?.classList.contains('active')) return;
    if (['Escape', 'ArrowRight', 'ArrowLeft'].includes(event.key)) event.preventDefault();
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') stepLightbox(1);
    if (event.key === 'ArrowLeft') stepLightbox(-1);
    if (event.key === 'Tab') {
      const buttons = Array.from(lightboxModal.querySelectorAll('button, a'));
      if (!buttons.length) return;
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Inicializar galería
  renderGallery(true);

  // --------------------------------------------------------------------------
  // 6. PRESELECCIÃ“N DE SERVICIO DESDE LAS TARJETAS
  // --------------------------------------------------------------------------
  const serviceQuoteButtons = document.querySelectorAll('.js-select-service');
  const serviceSelectInput = document.getElementById('projectService');

  serviceQuoteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      if (serviceSelectInput && serviceName) {
        serviceSelectInput.value = serviceName;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 7. PREGUNTAS FRECUENTES (FAQ ACORDEÃ“N)
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 8. FORMULARIO DE CONTACTO & GENERADOR WHATSAPP (+505 83771116)
  // --------------------------------------------------------------------------
  const quoteForm = document.getElementById('quoteForm');
  const formStatus = document.getElementById('formStatus');

  const getFormData = () => {
    const name = document.getElementById('clientName')?.value.trim() || '';
    const phone = document.getElementById('clientPhone')?.value.trim() || '';
    const location = document.getElementById('projectLocation')?.value.trim() || '';
    const service = document.getElementById('projectService')?.value || 'AplicaciÃ³n en exteriores';
    const message = document.getElementById('projectMessage')?.value.trim() || '';

    return { name, phone, location, service, message };
  };

  // Preparar y enviar mensaje a WhatsApp oficial de StucoArte
  quoteForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();

    if (!data.name || !data.phone || !data.message) {
      if (formStatus) {
        formStatus.className = 'form-status-alert error';
        formStatus.textContent = 'Por favor complete su nombre, telÃ©fono y los detalles de su consulta.';
      }
      return;
    }

    const whatsappMessage = 
      `Hola StucoArte, le escribo desde la pÃ¡gina web:\n\n` +
      `â€¢ Nombre: ${data.name}\n` +
      `â€¢ TelÃ©fono: ${data.phone}\n` +
      (data.location ? `â€¢ UbicaciÃ³n: ${data.location}\n` : '') +
      `â€¢ Consulta: ${data.service}\n` +
      `â€¢ Detalles: ${data.message}`;

    const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    if (formStatus) {
      formStatus.className = 'form-status-alert success';
      formStatus.textContent = 'Abriendo WhatsApp con los datos de su consulta...';
    }

    window.open(encodedUrl, '_blank', 'noopener,noreferrer');
  });

  // --------------------------------------------------------------------------
  // 9. BOTÃ“N VOLVER ARRIBA (BACK TO TOP)
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --------------------------------------------------------------------------
  // 10. ANIMACIONES DE ENTRADA AL HACER SCROLL
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.fade-in-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
});

// 1. Seleccionamos el elemento por su ID
const yearElement = document.getElementById('year');

// 2. Obtenemos el aÃ±o actual y lo asignamos como contenido del elemento
if (yearElement) yearElement.textContent = new Date().getFullYear();