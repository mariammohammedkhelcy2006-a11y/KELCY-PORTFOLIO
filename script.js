const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

const savedTheme = localStorage.getItem('kelcy-theme') || 'light';
if (savedTheme === 'dark') {
  body.classList.add('dark');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('menu-open', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-open');
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const nextTheme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('kelcy-theme', nextTheme);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((item) => {
  observer.observe(item);
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateField(field, errorLabel, value) {
  const cleanValue = value.trim();
  const fieldName = field.name;
  let error = '';

  if (!cleanValue) {
    error = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
  } else if (fieldName === 'email' && !validateEmail(cleanValue)) {
    error = 'Please enter a valid email address.';
  } else if (fieldName === 'message' && cleanValue.length < 10) {
    error = 'Message must be at least 10 characters.';
  } else if (fieldName === 'name' && cleanValue.length < 2) {
    error = 'Name must be at least 2 characters.';
  }

  const errorNode = document.getElementById(`${fieldName}Error`);
  if (errorNode) {
    errorNode.textContent = error;
  }

  if (error) {
    field.classList.add('invalid');
    return false;
  }

  field.classList.remove('invalid');
  return true;
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const status = document.getElementById('formStatus');

    const isNameValid = validateField(name, 'nameError', name.value);
    const isEmailValid = validateField(email, 'emailError', email.value);
    const isMessageValid = validateField(message, 'messageError', message.value);

    if (isNameValid && isEmailValid && isMessageValid) {
      if (status) {
        status.textContent = 'Thank you! Your message has been sent.';
      }
      contactForm.reset();
    } else if (status) {
      status.textContent = 'Please correct the errors and try again.';
    }
  });
}
