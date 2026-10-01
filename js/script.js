/**
 * ==========================================================================
 * STUCOARTE - JAVASCRIPT PRINCIPAL
 * Identidad: Acabados Coloniales & Arquitectura de Estuco
 * Vanilla JS Puro (Sin dependencias externas ni compilación)
 * Compatible con ejecución local y GitHub Pages
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. CONFIGURACIÓN OFICIAL DE LA MARCA STUCOARTE
  const CONFIG = {
    whatsappNumber: '50583771116', // Número oficial de WhatsApp de StucoArte
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
  // 3. MENÚ MÓVIL DESPLEGABLE (HAMBURGUESA)
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
  // 4. FILTRADO DE GALERÍA DE PROYECTOS
  // --------------------------------------------------------------------------
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCategory === filterVal) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. LIGHTBOX INTERACTIVO (MODAL DE FOTOGRAFÍAS REALES)
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  const visibleGalleryItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');

  const openLightbox = (index) => {
    const visibleList = visibleGalleryItems();
    if (!visibleList[index]) return;

    currentGalleryIndex = index;
    const item = visibleList[currentGalleryIndex];
    const imgEl = item.querySelector('.gallery-img');
    const titleEl = item.querySelector('.gallery-title');
    const catEl = item.querySelector('.gallery-category');

    if (lightboxImg && imgEl) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || 'StucoArte Nicaragua';
    }
    if (lightboxTitle && titleEl) lightboxTitle.textContent = titleEl.textContent;
    if (lightboxCategory && catEl) lightboxCategory.textContent = catEl.textContent;

    lightboxModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showNextLightbox = () => {
    const visibleList = visibleGalleryItems();
    if (visibleList.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % visibleList.length;
    openLightbox(currentGalleryIndex);
  };

  const showPrevLightbox = () => {
    const visibleList = visibleGalleryItems();
    if (visibleList.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + visibleList.length) % visibleList.length;
    openLightbox(currentGalleryIndex);
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const visibleList = visibleGalleryItems();
      const index = visibleList.indexOf(item);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxNext?.addEventListener('click', showNextLightbox);
  lightboxPrev?.addEventListener('click', showPrevLightbox);

  // Cerrar al hacer clic fuera del contenido
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextLightbox();
    if (e.key === 'ArrowLeft') showPrevLightbox();
  });

  // --------------------------------------------------------------------------
  // 6. PRESELECCIÓN DE SERVICIO DESDE LAS TARJETAS
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
  // 7. PREGUNTAS FRECUENTES (FAQ ACORDEÓN)
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
    const service = document.getElementById('projectService')?.value || 'Aplicación en exteriores';
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
        formStatus.textContent = 'Por favor complete su nombre, teléfono y los detalles de su consulta.';
      }
      return;
    }

    const whatsappMessage = 
      `Hola StucoArte, le escribo desde la página web:\n\n` +
      `• Nombre: ${data.name}\n` +
      `• Teléfono: ${data.phone}\n` +
      (data.location ? `• Ubicación: ${data.location}\n` : '') +
      `• Consulta: ${data.service}\n` +
      `• Detalles: ${data.message}`;

    const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    if (formStatus) {
      formStatus.className = 'form-status-alert success';
      formStatus.textContent = 'Abriendo WhatsApp con los datos de su consulta...';
    }

    window.open(encodedUrl, '_blank');
  });

  // --------------------------------------------------------------------------
  // 9. BOTÓN VOLVER ARRIBA (BACK TO TOP)
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

// 2. Obtenemos el año actual y lo asignamos como contenido del elemento
yearElement.textContent = new Date().getFullYear();

