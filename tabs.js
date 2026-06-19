// Woolworths-style tabs controller (vanilla)
(function () {
  function initTabs() {
    const tabGroups = document.querySelectorAll('[data-tabs]');
    tabGroups.forEach((group) => {
      const buttons = group.querySelectorAll('[role="tab"]');
      const panels = group.querySelectorAll('[role="tabpanel"]');
      if (!buttons.length || !panels.length) return;

      function setActive(nextBtn) {
        buttons.forEach((b) => {
          const active = b === nextBtn;
          b.setAttribute('aria-selected', active ? 'true' : 'false');
          if (active) b.classList.add('is-active');
          else b.classList.remove('is-active');
        });

        panels.forEach((p) => {
          const shouldShow = p.id === nextBtn.getAttribute('aria-controls');
          p.hidden = !shouldShow;

          // If the tab button also has an href hash, smooth-scroll the relevant section on the same page
          const hash = nextBtn.getAttribute('href');
          if (shouldShow && hash && hash.startsWith('#')) {
            const target = document.querySelector(hash);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }

      buttons.forEach((btn) => {
        btn.addEventListener('click', () => setActive(btn));
        btn.addEventListener('keydown', (e) => {
          if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
          e.preventDefault();
          const idx = Array.from(buttons).indexOf(btn);
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          const next = buttons[(idx + dir + buttons.length) % buttons.length];
          next.focus();
          setActive(next);
        });
      });

      // Ensure one is active on load
      const initial = group.querySelector('[role="tab"][aria-selected="true"]') || buttons[0];
      if (initial) setActive(initial);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTabs);
  else initTabs();
})();

