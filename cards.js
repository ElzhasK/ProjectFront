const flipCardBack = document.querySelector(".flip-card-back");
const flipCardFront = document.querySelector(".flip-card-front");
const flipCardFrontWord = document.querySelector(".flip-card-front-word");
const flipCardBackWord = document.querySelector(".flip-card-back-word");
const wordsFromLS = JSON.parse(localStorage.getItem("dictionary"));
const playSound = document.querySelector(".play-sound");

const flipCard = document.querySelector(".flip-card");

const flipCardInner = document.querySelector(".flip-card-inner");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");

const showCurrentTotal = document.querySelector(".show-current-total");

let currentCard = 0;
let flipped = false;
const numberOfWords = wordsFromLS.length;
const tts = window.speechSynthesis;

showCurrentTotal.textContent = `${currentCard + 1}/${numberOfWords}`;

function speak(phrase, lang) {
  let toSpeak = new SpeechSynthesisUtterance(phrase);
  toSpeak.lang = lang;
  tts.speak(toSpeak);
}

btnLeft.addEventListener("click", () => {
  btnRight.disabled = false;
  if (currentCard > 0) {
    currentCard -= 1;
  }
  if (currentCard <= 0) {
    btnLeft.disabled = true;
  }
  renderCard();
  resetCardSide();
  showCurrentTotal.textContent = `${currentCard + 1}/${numberOfWords}`;
});

btnRight.addEventListener("click", () => {
  btnLeft.disabled = false;
  currentCard += 1;
  if (currentCard >= numberOfWords - 1) {
    btnRight.disabled = true;
  }
  renderCard();
  resetCardSide();
  showCurrentTotal.textContent = `${currentCard + 1}/${numberOfWords}`;
});

flipCard.addEventListener("click", () => {
  flipped = !flipped;
  if (flipped) {
    flipCardInner.style.transform = `rotateX(180deg)`;
  } else {
    flipCardInner.style.transform = `rotateX(0deg)`;
  }
});

function renderCard() {
  flipCardFrontWord.textContent = `${wordsFromLS[currentCard].eng}`;

  flipCardBackWord.textContent = `${wordsFromLS[currentCard].ru}`;
}

renderCard();

function resetCardSide() {
  flipCardInner.style.transform = `rotateX(0deg)`;
  flipped = false;
}

playSound.addEventListener("click", (event) => {
  event.cancelBubble = true;
  if (event.stopPropagation) event.stopPropagation();
  speak("hello", "en-EN")
});
