/* ============================================
   ENGR KHANZALLAH PORTFOLIO - MAIN JAVASCRIPT
   ============================================ */

// ============ EMAILJS SETUP ============
// ✅ STEP 1: Go to https://www.emailjs.com and create a FREE account
// ✅ STEP 2: Create an Email Service (Gmail) → copy your SERVICE ID
// ✅ STEP 3: Create an Email Template → copy your TEMPLATE ID
// ✅ STEP 4: Go to Account → copy your PUBLIC KEY
// ✅ STEP 5: Replace the values below with your own:

const EMAILJS_PUBLIC_KEY  = "EBCmFYLfl5jHaugjb";     // e.g. "abc123XYZ"
const EMAILJS_SERVICE_ID  = "service_w0eycc8";     // e.g. "service_xxxxxx"
const EMAILJS_TEMPLATE_ID = "template_jhusxc8";    // e.g. "template_xxxxxx"

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// ============ LOADER ============
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  }, 2200);
});

// ============ CUSTOM CURSOR ============
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorOutline.style.left = e.clientX + 'px';
    cursorOutline.style.top = e.clientY + 'px';
  }, 60);
});

document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.style.width = '50px';
    cursorOutline.style.height = '50px';
    cursorOutline.style.borderColor = 'rgba(0,245,255,0.8)';
    cursorDot.style.width = '4px';
    cursorDot.style.height = '4px';
  });
  el.addEventListener('mouseleave', () => {
    cursorOutline.style.width = '35px';
    cursorOutline.style.height = '35px';
    cursorOutline.style.borderColor = 'rgba(0,245,255,0.5)';
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
  });
});

// ============ NAVBAR ============
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ============ TYPING EFFECT ============
const roles = [ 'Full Stack Engineer'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const roleEl = document.getElementById('role-text');

function typeRole() {
  const current = roles[roleIndex];
  roleEl.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;
  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 400; }
  setTimeout(typeRole, speed);
}
setTimeout(typeRole, 2500);

// ============ COUNTER ANIMATION ============
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  let count = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    count += increment;
    if (count >= target) { el.textContent = target; clearInterval(timer); }
    else el.textContent = Math.floor(count);
  }, 40);
}

// ============ REVEAL ON SCROLL ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('active'), i * 100);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============ SKILL BARS ============
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skills-category').forEach(cat => skillObserver.observe(cat));

// ============ COUNTER TRIGGER ============
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ============ ✅ REAL EMAIL SENDING WITH EMAILJS ============
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const successEl = document.getElementById('form-success');
    const errorEl = document.getElementById('form-error');

    // Show loading
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    successEl.classList.remove('show');
    errorEl.classList.remove('show');

    // Build template params - matched to your EmailJS template variables
    const templateParams = {
      name:       document.getElementById('from_name').value,
      from_email: document.getElementById('from_email').value,
      subject:    document.getElementById('subject').value,
      message:    document.getElementById('message').value,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        // ✅ SUCCESS
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        form.reset();
        successEl.classList.add('show');
        setTimeout(() => successEl.classList.remove('show'), 5000);
      })
      .catch((error) => {
        // ❌ ERROR
        console.error('EmailJS Error:', error);
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        errorEl.classList.add('show');
        setTimeout(() => errorEl.classList.remove('show'), 5000);
      });
  });
}

// ============ PARTICLES ============
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.7 ? '#7c3aed' : '#00f5ff';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    if (mouse.x && mouse.y) {
      const dx = mouse.x - this.x, dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) { this.x -= dx * 0.01; this.y -= dy * 0.01; }
    }
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color; ctx.globalAlpha = this.opacity; ctx.fill(); ctx.globalAlpha = 1;
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = '#00f5ff'; ctx.globalAlpha = (1 - dist / 120) * 0.08; ctx.lineWidth = 0.5; ctx.stroke(); ctx.globalAlpha = 1;
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.style.opacity = '1'; });
}, { threshold: 0.05 });

document.querySelectorAll('.section').forEach(s => {
  s.style.opacity = '0'; s.style.transition = 'opacity 0.6s ease'; sectionObserver.observe(s);
});
const heroSection = document.querySelector('.hero');
if (heroSection) heroSection.style.opacity = '1';