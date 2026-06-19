/* Shared lightbox for image galleries */
(function () {
  function initLightbox() {
    const triggers = document.querySelectorAll('[data-lightbox="gallery"]');
    if (!triggers.length) return;

    const overlay = document.getElementById('lightbox-overlay');
    if (!overlay) return;

    const imgEl = overlay.querySelector('[data-lightbox-image]');
    const captionEl = overlay.querySelector('[data-lightbox-caption]');
    const closeBtn = overlay.querySelector('[data-lightbox-close]');
    const prevBtn = overlay.querySelector('[data-lightbox-prev]');
    const nextBtn = overlay.querySelector('[data-lightbox-next]');

    let index = 0;

    function getGalleryItems() {
      return Array.from(triggers);
    }

    function openAt(i) {
      const items = getGalleryItems();
      if (!items.length) return;
      index = (i + items.length) % items.length;

      const trigger = items[index];
      const full = trigger.getAttribute('data-full') || trigger.getAttribute('src');
      const alt = trigger.getAttribute('alt') || '';

      imgEl.src = full;
      imgEl.alt = alt;
      if (captionEl) captionEl.textContent = alt;

      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // Focus for accessibility
      (closeBtn || overlay).focus?.();
    }

    function close() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      // Return focus to last focused trigger (if any)
      const last = document.activeElement;
      if (last && triggers && triggers.length) {
        // no-op: keep simple
      }
    }

    triggers.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openAt(i);
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openAt(i);
        }
      });
    });

    closeBtn?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      openAt(index - 1);
    });

    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      openAt(index + 1);
    });

    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') openAt(index - 1);
      if (e.key === 'ArrowRight') openAt(index + 1);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();

