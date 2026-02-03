(function () {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const url = new URL(window.location.href);
  const submitted = url.searchParams.get('submitted') === '1';
  if (submitted) {
    const statusEl = document.querySelector('[data-form-status]');
    if (statusEl) {
      statusEl.hidden = false;
      statusEl.textContent = 'Thanks — your message was sent. We’ll get back to you shortly.';
    }
    url.searchParams.delete('submitted');
    window.history.replaceState({}, '', url.toString());
  }

  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.tagName.toLowerCase() !== 'a') return;
      nav.setAttribute('data-open', 'false');
      navToggle.setAttribute('aria-expanded', 'false');
    });

    window.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      nav.setAttribute('data-open', 'false');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  }
})();
