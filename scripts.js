// scripts.js
let timer;
let isBreak = true;

document.getElementById('startPause').addEventListener('click', function() {
    startTimer(15 * 60, 'pause');
});

document.getElementById('skip').addEventListener('click', function() {
    if (isBreak) {
        startTimer(45 * 60, 'revision');
    } else {
        startTimer(15 * 60, 'pause');
    }
});

function startTimer(duration, type) {
    let timerDisplay = document.getElementById('timerDisplay');
    let minutes, seconds;
    clearInterval(timer);
    timer = setInterval(function() {
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = minutes + ":" + seconds;

        if (--duration < 0) {
            clearInterval(timer);
            document.getElementById('alarmSound').play();
            if (type === 'pause') {
                isBreak = false;
                if (confirm("Veux-tu commencer une session de révision de 45 minutes ?")) {
                    startTimer(45 * 60, 'revision');
                } else {
                    startTimer(15 * 60, 'pause');
                }
            } else {
                isBreak = true;
                if (confirm("Veux-tu prendre une pause de 15 minutes ?")) {
                    startTimer(15 * 60, 'pause');
                } else {
                    startTimer(45 * 60, 'revision');
                }
            }
        }
    }, 1000);
}
