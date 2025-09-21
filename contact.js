// Contact Form Submission
const form = document.getElementById('contact-form');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return;
  }

  // Save feedback in localStorage
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
  feedbacks.push({name, email, message, date: new Date().toLocaleString()});
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

  // Show confirmation
  confirmation.style.display = 'block';

  // Reset form
  form.reset();

  // Hide confirmation after 4 seconds
  setTimeout(() => { confirmation.style.display = 'none'; }, 4000);
});

// FAQ Accordion
const headers = document.querySelectorAll('.accordion-header');
headers.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const isOpen = content.style.maxHeight;
    document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
