const timer = document.querySelector(".timer");
const alarm = new Audio("alarm.mp3");
const circle = document.querySelector(".circle");
let angle = 0;
const audioLink = new Audio("tick.mp3");
const inputDays = document.querySelector(".input-days");
const inputHours = document.querySelector(".input-hours");
const inputMinutes = document.querySelector(".input-minutes");
const inputSeconds = document.querySelector(".input-seconds");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const pauseBtn = document.querySelector(".pause-btn");
let root = document.documentElement;




let daysFromInput = 0;
let hoursFromInput = 0;
let minutesFromInput = 0;
let secondsFromInput = 0;
let countDownDate = 0;
let timerIsRinning = false;


circle.classList.add("stop-animation");

inputDays.addEventListener("keyup", (e) => {
  daysFromInput = Number(e.target.textContent);
});

inputHours.addEventListener("keyup", (e) => {
  hoursFromInput = Number(e.target.textContent);
});

inputMinutes.addEventListener("keyup", (e) => {
  minutesFromInput = Number(e.target.textContent);
});

inputSeconds.addEventListener("keyup", (e) => {
  secondsFromInput = Number(e.target.textContent);
  circle.style.transform = `rotate(${6 * Number(e.target.textContent)}deg)`;
  root.style.setProperty('--start', `${6 * Number(e.target.textContent)}deg`)
});

function disableContentEditable() {
  inputDays.setAttribute("contenteditable", false);
  inputDays.style.border = "none";
  inputHours.setAttribute("contenteditable", false);
  inputHours.style.border = "none";
  inputMinutes.setAttribute("contenteditable", false);
  inputMinutes.style.border = "none";
  inputSeconds.setAttribute("contenteditable", false);
  inputSeconds.style.border = "none";
}

function enableContentEditable() {
    inputDays.setAttribute("contenteditable", true);
    inputDays.style.border = "1px solid white";
    inputHours.setAttribute("contenteditable", true);
    inputHours.style.border = "1px solid white";
    inputMinutes.setAttribute("contenteditable", true);
    inputMinutes.style.border = "1px solid white";
    inputSeconds.setAttribute("contenteditable", true);
    inputSeconds.style.border = "1px solid white";
  }

function clearFields() {
      inputDays.textContent = "";
      inputHours.textContent = "";
      inputMinutes.textContent = "";
      inputSeconds.textContent = "";
}
function startTimer() {
  disableContentEditable();
  circle.style.transform = `rotate(${angle}deg)`;
  circle.classList.remove("stop-animation");
  countDownDate =
    new Date().getTime() +
    (daysFromInput * 24 * 60 * 60 * 1000 +
      hoursFromInput * 60 * 60 * 1000 +
      minutesFromInput * 60 * 1000 +
      secondsFromInput * 1000);

  t = setInterval(() => {
    audioLink.play();
    const now = new Date().getTime();
    const difference = countDownDate - now;
    angle += 6;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (difference % (60 * 1000 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    inputDays.textContent = `${days}d`;
    inputHours.textContent = `${hours}h`;
    inputMinutes.textContent = `${minutes}m`;
    inputSeconds.textContent = `${seconds}s`;

    if (seconds <= 0 && days <= 0 && minutes <= 0 && hours <= 0) {
      clearInterval(t);
      alarm.play();
      circle.style.transform = `rotate(${angle}deg)`;
      circle.classList.add("stop-animation");
      enableContentEditable()
      inputDays.textContent = "";
      inputHours.textContent = "";
      inputMinutes.textContent = "";
      inputSeconds.textContent = "";
    }
  }, 1000);
  
}
let t;


startBtn.addEventListener("click", () => {
  startTimer()
  timerIsRinning = true
});

pauseBtn.addEventListener("click" , () =>{
  timerIsRinning = false
  clearInterval(t)
  circle.style.transform = `rotate(${angle}deg)`;
  circle.classList.add("stop-animation");
  secondsFromInput = inputSeconds.textContent.split("s")[0]
  minutesFromInput = inputMinutes.textContent.split("m")[0]
  hoursFromInput = inputHours.textContent.split("h")[0]
  daysFromInput = inputDays.textContent.split("d")[0]
  root.style.setProperty('--start', `${angle}deg`)

  
})

stopBtn.addEventListener('click', () =>{
  timerIsRinning = false
  clearInterval(t);
  circle.style.transform = `rotate(${0}deg)`;
  circle.classList.add("stop-animation");
  enableContentEditable()
  clearFields()
  root.style.setProperty('--start', `${0}deg`)

})
