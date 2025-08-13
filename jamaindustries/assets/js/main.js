(function () {
  document.documentElement.classList.remove('no-js');

  function getPathName() {
    try { return (window.location.pathname || '').split('/').pop() || 'index.html'; } catch (_) { return 'index.html'; }
  }

  function setActiveNavLink() {
    var path = getPathName();
    var map = {
      'index.html': 'home',
      '': 'home',
      'about.html': 'about',
      'services.html': 'services',
      'contact.html': 'contact'
    };
    var active = map[path];
    var links = document.querySelectorAll('nav a[data-nav]');
    links.forEach(function (link) {
      if (link.getAttribute('data-nav') === active) {
        link.classList.add('active');
      }
    });
  }

  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function closeOnEscape(e) {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        document.removeEventListener('keydown', closeOnEscape);
      }
    }

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      if (!expanded) { document.addEventListener('keydown', closeOnEscape); }
    });
  }

  function initYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function validate(form) {
    var isValid = true;
    function setError(id, message) {
      var span = form.querySelector('.error[data-for="' + id + '"]');
      if (span) span.textContent = message || '';
    }

    var required = ['name', 'email', 'service', 'message'];
    required.forEach(function (id) {
      var el = form.querySelector('#' + id);
      var value = (el && el.value || '').trim();
      if (!value) { setError(id, 'Required'); isValid = false; }
      else { setError(id, ''); }
    });

    var email = form.querySelector('#email');
    if (email && email.value) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email.value)) { setError('email', 'Invalid email'); isValid = false; }
    }

    var hp = form.querySelector('#company_website');
    if (hp && hp.value) { isValid = false; }

    return isValid;
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var status = form.querySelector('.form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) { if (status) status.textContent = 'Please fix the highlighted fields.'; return; }

      if (status) status.textContent = 'Sending…';

      // Placeholder: mimic async submit
      setTimeout(function () {
        if (status) status.textContent = 'Thanks! Your message has been sent.';
        form.reset();
      }, 700);
    });
  }

  setActiveNavLink();
  initMobileNav();
  initYear();
  initContactForm();
})();