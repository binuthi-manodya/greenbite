// Guided Breathing Animation
const breathingCircle = document.getElementById('breathing-circle');
const breathingText = document.getElementById('breathing-text');
let inhale = true;

function animateBreathing() {
  if (inhale) {
    breathingCircle.style.transform = "scale(1.5)";
    breathingText.textContent = "Inhale...";
  } else {
    breathingCircle.style.transform = "scale(1)";
    breathingText.textContent = "Exhale...";
  }
  inhale = !inhale;
  setTimeout(animateBreathing, 4000); // 4 seconds inhale/exhale
}
animateBreathing();

// Meditation Timer
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-timer');
const stopBtn = document.getElementById('stop-timer');
const timerMinutes = document.getElementById('timer-minutes');
const completedSessions = document.getElementById('completed-sessions');
let timerInterval = null;
let totalSeconds = 0;

// Load completed sessions
completedSessions.textContent = localStorage.getItem('completedSessions') || 0;

// Function to play end beep
function playEndBeep() {
  const beep = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
  beep.play().catch(e => console.log("Audio playback blocked until user interaction"));
}

startBtn.addEventListener('click', () => {
  const minutes = parseInt(timerMinutes.value);
  if (!minutes || minutes <= 0) return alert("Enter a valid time.");

  totalSeconds = minutes * 60;

  if (timerInterval) clearInterval(timerInterval);

  // Immediately update display
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  timerDisplay.textContent = `${mins}:${secs < 10 ? '0'+secs : secs}`;

  timerInterval = setInterval(() => {
    totalSeconds--;

    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    timerDisplay.textContent = `${mins}:${secs < 10 ? '0'+secs : secs}`;

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "0:00";
      playEndBeep(); // play sound when timer ends

      // Increment completed sessions
      let sessions = parseInt(localStorage.getItem('completedSessions') || 0);
      sessions++;
      localStorage.setItem('completedSessions', sessions);
      completedSessions.textContent = sessions;
    }
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerDisplay.textContent = "0:00";
});

// Ambient Sound
const ambientSound = document.getElementById('ambient-sound');
const toggleSoundBtn = document.getElementById('toggle-sound');
toggleSoundBtn.addEventListener('click', () => {
  if (ambientSound.paused) {
    ambientSound.play().catch(e => console.log("Audio playback blocked until user interaction"));
    toggleSoundBtn.textContent = "Pause Sound";
  } else {
    ambientSound.pause();
    toggleSoundBtn.textContent = "Play Sound";
  }
});
