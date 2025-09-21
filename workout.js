// Sample workout data
const workouts = {
  full: {
    none: ["Jumping Jacks", "Push-ups", "Squats", "Plank"],
    dumbbells: ["Dumbbell Squats", "Shoulder Press", "Bicep Curls", "Lunges"],
    resistance: ["Band Rows", "Band Squats", "Band Press", "Band Deadlifts"]
  },
  arms: {
    none: ["Push-ups", "Tricep Dips", "Arm Circles"],
    dumbbells: ["Bicep Curls", "Hammer Curls", "Tricep Kickbacks"],
    resistance: ["Band Curls", "Band Extensions", "Band Pull Aparts"]
  },
  legs: {
    none: ["Squats", "Lunges", "Calf Raises"],
    dumbbells: ["Goblet Squats", "Dumbbell Deadlifts", "Step-ups"],
    resistance: ["Band Squats", "Band Walks", "Glute Bridges"]
  },
  core: {
    none: ["Sit-ups", "Plank", "Bicycle Crunches"],
    dumbbells: ["Weighted Sit-ups", "Russian Twists", "Side Bends"],
    resistance: ["Band Rotations", "Band Crunches", "Band Side Pulls"]
  }
};

const form = document.getElementById("workout-form");
const results = document.getElementById("workout-results");
const exerciseList = document.getElementById("exercise-list");
const timerDisplay = document.getElementById("timer");
const startTimerBtn = document.getElementById("start-timer");

let countdown;

// Generate Workout
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bodyPart = document.getElementById("body-part").value;
  const equipment = document.getElementById("equipment").value;

  if (!bodyPart || !equipment) {
    alert("Please select body part and equipment.");
    return;
  }

  // Pick random 3 exercises
  const exercises = workouts[bodyPart][equipment];
  const selected = [];
  while (selected.length < 3) {
    const random = exercises[Math.floor(Math.random() * exercises.length)];
    if (!selected.includes(random)) selected.push(random);
  }

  // Display
  exerciseList.innerHTML = "";
  selected.forEach(ex => {
    const li = document.createElement("li");
    li.textContent = ex;
    exerciseList.appendChild(li);
  });

  results.style.display = "block";

  // Save workout in localStorage
  localStorage.setItem("lastWorkout", JSON.stringify({ bodyPart, equipment, selected }));
});

// Timer
function startTimer(duration) {
  let time = duration;
  clearInterval(countdown);
  countdown = setInterval(() => {
    let minutes = String(Math.floor(time / 60)).padStart(2, "0");
    let seconds = String(time % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (--time < 0) {
      clearInterval(countdown);
      alert("Time’s up! Move to next exercise!");
    }
  }, 1000);
}

startTimerBtn.addEventListener("click", () => {
  startTimer(30); // 30s countdown
});

// Load saved workout
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("lastWorkout"));
  if (saved) {
    exerciseList.innerHTML = "";
    saved.selected.forEach(ex => {
      const li = document.createElement("li");
      li.textContent = ex;
      exerciseList.appendChild(li);
    });
    results.style.display = "block";
  }
});

//Timer
function startTimer(durationInSeconds) {
  let time = durationInSeconds;
  const display = document.getElementById('timer-display'); // Make sure you have a <span id="timer-display"></span>
  const beepSound = document.getElementById('beep-sound');

  const timerInterval = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    display.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (time <= 0) {
      clearInterval(timerInterval);
      // Play sound when timer reaches 0
      beepSound.play();
    }

    time--;
  }, 1000);
}

// Example usage: 10-second timer
startTimer(10);



