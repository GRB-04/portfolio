/**
 * Gabriel R. Bezerra — Portfolio Scripts
 * Built with vanilla JavaScript & strict attention to craft, performance, and accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initFormValidation();
  initBackToTop();
  initActiveNav();
});

/**
 * Header background opacity on scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.style.backgroundColor = 'rgba(7, 7, 8, 0.95)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      header.style.backgroundColor = 'rgba(7, 7, 8, 0.88)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Highlights active section in navigation
 */
function initActiveNav() {
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.style.color = '#ffffff';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

/**
 * Functional, Accessible Form Validation
 */
function initFormValidation() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusMsg = document.getElementById('form-status');
  if (!form || !submitBtn || !statusMsg) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');

  function validateField(input, errorEl, message) {
    if (!input.value.trim()) {
      errorEl.textContent = message;
      input.style.borderColor = '#ff2222';
      return false;
    }
    if (input.type === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value.trim())) {
        errorEl.textContent = 'Por favor, insira um e-mail válido.';
        input.style.borderColor = '#ff2222';
        return false;
      }
    }
    errorEl.textContent = '';
    input.style.borderColor = '';
    return true;
  }

  // Clear errors on input
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.style.borderColor = '';
      const err = document.getElementById(`error-${input.name}`);
      if (err) err.textContent = '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, errorName, 'Por favor, informe seu nome.');
    const isEmailValid = validateField(emailInput, errorEmail, 'Por favor, informe seu e-mail.');
    const isMsgValid = validateField(messageInput, errorMessage, 'Por favor, escreva uma mensagem.');

    if (!isNameValid || !isEmailValid || !isMsgValid) {
      statusMsg.className = 'form-status-msg error';
      statusMsg.textContent = 'Verifique os campos obrigatórios acima.';
      return;
    }

    // Simulating instant polite feedback
    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = 'Enviando mensagem…';

    setTimeout(() => {
      submitBtn.disabled = false;
      btnText.textContent = originalText;
      statusMsg.className = 'form-status-msg success';
      statusMsg.textContent = '✓ Mensagem recebida! Gabriel entrará em contato em breve.';
      form.reset();

      setTimeout(() => {
        statusMsg.textContent = '';
        statusMsg.className = 'form-status-msg';
      }, 7000);
    }, 600);
  });
}

/**
 * Smooth Back to Top
 */
function initBackToTop() {
  const backTopBtn = document.querySelector('.btn-back-top');
  if (!backTopBtn) return;

  backTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
