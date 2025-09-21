// DOM Elements
const form = document.getElementById('calculator-form');
const bmrOutput = document.getElementById('bmr');
const tdeeOutput = document.getElementById('tdee');
const carbsOutput = document.getElementById('carbs');
const proteinOutput = document.getElementById('protein');
const fatOutput = document.getElementById('fat');

const carbsBar = document.getElementById('carbs-bar');
const proteinBar = document.getElementById('protein-bar');
const fatBar = document.getElementById('fat-bar');

// Function to animate numbers
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Function to calculate macros and calories
function calculateCalories(e) {
  e.preventDefault();

  const age = parseInt(form.age.value);
  const gender = form.gender.value;
  const height = parseFloat(form.height.value);
  const weight = parseFloat(form.weight.value);
  const activity = parseFloat(form.activity.value);

  // Form Validation
  if (!age || !height || !weight || !activity || !gender) {
    alert('Please fill in all fields correctly!');
    return;
  }

  // Save to localStorage
  localStorage.setItem('lastCalc', JSON.stringify({ age, gender, height, weight, activity }));

  // BMR Calculation
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // TDEE Calculation
  const tdee = Math.round(bmr * activity);

  // Macros Calculation
  const carbs = Math.round((tdee * 0.5) / 4);
  const protein = Math.round((tdee * 0.2) / 4);
  const fat = Math.round((tdee * 0.3) / 9);

  // Animate counters
  animateValue(bmrOutput, 0, Math.round(bmr), 1000);
  animateValue(tdeeOutput, 0, tdee, 1000);
  animateValue(carbsOutput, 0, carbs, 1000);
  animateValue(proteinOutput, 0, protein, 1000);
  animateValue(fatOutput, 0, fat, 1000);

  // Animate progress bars
  carbsBar.style.width = `${Math.min(carbs, 400)}%`; // capped visually
  proteinBar.style.width = `${Math.min(protein, 200)}%`;
  fatBar.style.width = `${Math.min(fat, 100)}%`;
}

// Load saved data from localStorage
window.addEventListener('load', () => {
  const saved = JSON.parse(localStorage.getItem('lastCalc'));
  if (saved) {
    form.age.value = saved.age;
    form.gender.value = saved.gender;
    form.height.value = saved.height;
    form.weight.value = saved.weight;
    form.activity.value = saved.activity;
    form.dispatchEvent(new Event('submit'));
  }
});

// Event Listener
form.addEventListener('submit', calculateCalories);
