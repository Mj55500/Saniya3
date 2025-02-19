let timer;
let isRunning = false;
let timeLeft = 1500; // 25 минут
let cycleCount = 0;
const workTime = 1500; // 25 минут
const shortBreak = 300; // 5 минут
const longBreak = 900; // 15 минут
const alarmSound = document.getElementById("alarm");

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const statusText = document.getElementById("status");
const cycleCounter = document.getElementById("cycles");

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent =` ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alarmSound.play();
                nextPhase();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = workTime;
    updateDisplay();
    statusText.textContent = "Рабочая сессия";
    document.body.style.background = "#f4f4f4";
}

function nextPhase() {
    if (statusText.textContent === "Рабочая сессия") {
        cycleCount++;
        cycleCounter.textContent = cycleCount;
        if (cycleCount % 4 === 0) {
            timeLeft = longBreak;
            statusText.textContent = "Длинный перерыв";
            document.body.style.background = "#4caf50"; // Зеленый
        } else {
            timeLeft = shortBreak;
            statusText.textContent = "Короткий перерыв";
            document.body.style.background = "#2196f3"; // Синий
        }
    } else {
        timeLeft = workTime;
        statusText.textContent = "Рабочая сессия";
        document.body.style.background = "#f4f4f4"; // Серый
    }
    updateDisplay();
    startTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();