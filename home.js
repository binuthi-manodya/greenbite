// Quotes
const healthQuotes = [
  "Take care of your body. It's the only place you have to live.",
  "Health is a state of complete harmony of the body, mind and spirit.",
  "The groundwork for all happiness is good health.",
  "A healthy outside starts from the inside.",
  "Your body is a temple, but only if you treat it like one.",
  "Health is not about the weight you lose, but about the life you gain.",
  "The greatest wealth is health.",
  "A healthy lifestyle is a journey, not a destination."
];

// Health Tips
const healthTips = [
  { title: "Stay Hydrated", content: "Drink at least 8 glasses of water daily." },
  { title: "Eat More Greens", content: "Leafy greens provide fiber and nutrients." },
  { title: "Practice Mindful Eating", content: "Savor your food and eat slowly." },
  { title: "Get Moving", content: "At least 30 minutes of activity daily." },
  { title: "Prioritize Sleep", content: "Aim for 7-9 hours of quality sleep." },
  { title: "Practice Gratitude", content: "Focus on the positives every day." },
  { title: "Limit Processed Foods", content: "Stick to whole, unprocessed meals." },
  { title: "Connect with Others", content: "Strong social ties boost happiness." },
  { title: "Spend Time in Nature", content: "20 minutes outdoors can lift mood." },
  { title: "Practice Deep Breathing", content: "Helps reduce stress and anxiety." }
];

// DOM elements
const heroQuote = document.getElementById('hero-quote');
const tipDate = document.getElementById('tip-date');
const tipTitle = document.getElementById('tip-title');
const tipContent = document.getElementById('tip-content');
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar-menu');
const newsletterForm = document.getElementById('newsletter-form');
const toast = document.getElementById('toast');
const featureCards = document.querySelectorAll('.feature-card');

// Init
document.addEventListener('DOMContentLoaded', () => {
  updateHeroQuote();
  setInterval(updateHeroQuote, 5000);
  setHealthTipOfTheDay();
  setupEventListeners();
  setupScrollAnimations();
  checkFirstVisit();
});

// Update Hero Quote
function updateHeroQuote() {
  const randomIndex = Math.floor(Math.random() * healthQuotes.length);
  heroQuote.style.opacity = '0';
  setTimeout(() => {
    heroQuote.textContent = `"${healthQuotes[randomIndex]}"`;
    heroQuote.style.opacity = '1';
  }, 300);
}

// Health Tip of the Day
function setHealthTipOfTheDay() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const tipIndex = dayOfYear % healthTips.length;
  const tip = healthTips[tipIndex];
  const formattedDate = today.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  tipDate.textContent = formattedDate;
  tipTitle.textContent = tip.title;
  tipContent.textContent = tip.content;
}

// Event Listeners
function setupEventListeners() {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });

  document.querySelectorAll('.navbar-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });

  newsletterForm.addEventListener('submit', handleNewsletterSubmit);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
}

// Newsletter
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = e.target.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  if (!email) { showToast('Please enter a valid email', 'error'); return; }

  const emails = getStoredEmails();
  emails.push(email);
  localStorage.setItem('greenbite_newsletter_emails', JSON.stringify(emails));

  showToast('Thank you for subscribing!', 'success');
  emailInput.value = '';
}
function getStoredEmails() {
  const stored = localStorage.getItem('greenbite_newsletter_emails');
  return stored ? JSON.parse(stored) : [];
}

// Toast
function showToast(message, type='success') {
  toast.textContent = message;
  toast.className = 'toast ' + type;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Scroll Animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i*100);
      }
    });
  }, { threshold:0.1 });

  featureCards.forEach(card => observer.observe(card));
}

// First Visit
function checkFirstVisit() {
  if (!localStorage.getItem('greenbite_visited')) {
    localStorage.setItem('greenbite_visited','true');
    showToast('Welcome to GreenBite! Start your wellness journey today.','success');
  }
}
