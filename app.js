const text = document.querySelector(".text");
const button = document.querySelector('.button')
const author = document.querySelector('.author')
const container = document.querySelector('.container')
const quoteContainer = document.querySelector('.quote-container')
const popup = document.querySelector('.popup')
const notify = document.querySelector('.notify')


let soundButton = document.querySelector('.sound')
soundButton.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>` 
let soundEnabled = false

const tts = window.speechSynthesis;

soundButton.addEventListener('click', () => {
  soundEnabled = !soundEnabled
  if (soundEnabled) {
    soundButton.innerHTML = `<i class="fa fa-volume-up" aria-hidden="true"></i>`
  } else {
    soundButton.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`
  }
})

function speak(phrase, lang) {
  let toSpeak = new SpeechSynthesisUtterance(phrase);
  toSpeak.lang = lang;
  tts.speak(toSpeak);
}

async function getQuotes() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "76e06bd676msh2eb196109863460p178a09jsn584cb23046f2",
      "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
    },
  };

  try {
    const data = await fetch(
      "https://quotes15.p.rapidapi.com/quotes/random/",
      options
    );

    if (!data.ok) {
      throw {message:'something went wrong'}
    }
    const result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

getQuotes();

button.addEventListener('click', async () => {
  popup.classList.remove('visible')
  const {content, originator:{name}, url} = await getQuotes()
  text.innerText = content
  author.innerText = name

})

text.addEventListener("dblclick", async (e) => {
  s = window.getSelection();

  let range = s.getRangeAt(0);

  let entireText = e.target.innerText;

  const selectedText = entireText.slice(range.startOffset, range.endOffset);
  
  soundEnabled && speak(selectedText, 'en-EN')

  const translation = await translate(selectedText);

  showPopup(e, translation,selectedText)
});

function getCoordinates(e) {
  const containerWidth = container.offsetWidth
  const containerHeight = container.offsetHeight
  const quoteContainerWidth = quoteContainer.offsetWidth
  const quoteContainerHeight = quoteContainer.offsetHeight

  const offsetWidth = (containerWidth - quoteContainerWidth) / 2
  const offsetHeight = (containerHeight - quoteContainerHeight) / 2
  const mouseX = e.clientX - offsetWidth
  const mouseY = e.clientY - offsetHeight

  return {
    mouseX,
    mouseY
  }
}

 function AddDictionory() {
    const wordTranslatedText = [];
    localStorage.setItem
    
 }

function showPopup(e, translation,selectedText) {
  popup.classList.remove('invisible')
  popup.classList.add('visible')
  const {mouseX, mouseY} = getCoordinates(e)
  const popupWidth = popup.offsetWidth
  const popupHeight = popup.offsetHeight
  popup.style.top = `${mouseY -  popupHeight / 2 - 50}px`
  popup.style.left = `${mouseX - popupWidth / 2}px`

  const {responseData: {
    translatedText
  }} = translation
  
  popup.innerHTML =
   `
  <button class=popup-add-word><i class="fa fa-plus" aria-hidden="true"></i></button>
  <button class=popup-close>
    <i class="fa fa-times" aria-hidden="true"></i>
  </button>
  <p>${translatedText}</p>`
  const popupClose = document.querySelector('.popup-close')

  popupClose?.addEventListener('click', () => {
    popup.classList.add('invisible')
  })
  const popupAddWord = document.querySelector(".popup-add-word");
  popupAddWord.addEventListener("click", () => {
    saveToLocalStorage(selectedText,translatedText)
  });
  
}
function saveToLocalStorage(selectedText, translatedText) {
    const wordsFromLS = JSON.parse(localStorage.getItem
        ("dictionary")) || [];
        if (!wordsFromLS.find((obj) => obj.eng === selectedText)){
            const words = [
                ...wordsFromLS,
                {
                    eng: selectedText,
                    ru: translatedText,
                },
            ];
            localStorage.setItem("dictionary", JSON.stringify(words));
        showNotification('word added')
        } else {
            showNotification('this word already exists')
        }
    
}
function showNotification(text) {
    notify.classList.add("slide-in");
    notify.textContent = text;
    setTimeout(() => {
     notify.classList.remove("slide-in");
     notify.classList.add("slide-out");
    }, 1000);
}

async function translate(word) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '76e06bd676msh2eb196109863460p178a09jsn584cb23046f2',
      'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
    }
  };
  
  const data = await fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=en%7Cru&q=${word}&mt=1&onlyprivate=0&de=a%40b.c`, options)
  const result = await data.json()
  return result
}