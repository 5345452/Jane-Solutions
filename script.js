document.addEventListener("DOMContentLoaded", () => {

  alert("JavaScript is working!");

  // ---------- NAVBAR ----------
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // ---------- MOBILE MENU ----------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // ---------- SLIDESHOW (FIXED) ----------
  const slides = document.querySelectorAll('.slide');
  let current = 0;

  console.log("Slides found:", slides.length);

  function showSlide(i) {
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === i);
    });
    current = i;
  }

  if (slides.length > 0) {
    setInterval(() => {
      showSlide((current + 1) % slides.length);
    }, 5000);
  }

  // ---------- SMOOTH SCROLL ----------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- FORM ----------
  const PHONE_WA = '254115134329';
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  function showMsg(text, ok = true) {
    formMsg.textContent = text;
    formMsg.style.color = ok ? '#16a34a' : '#dc2626';

    setTimeout(() => formMsg.textContent = '', 4000);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();

      if (!name) return showMsg('Enter name', false);
      if (!/^\S+@\S+\.\S+$/.test(email)) return showMsg('Invalid email', false);
      if (phone.length < 5) return showMsg('Invalid phone', false);
      if (message.length < 5) return showMsg('Message too short', false);

      const text = `Hi Jane, I'm ${name} (${email}, ${phone}). ${message}`;
      const url = `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(text)}`;

      window.open(url, '_blank');
      showMsg('Opening WhatsApp...', true);
      form.reset();
    });
  }

  // ---------- YEAR ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});