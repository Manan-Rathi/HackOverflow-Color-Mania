const body = document.querySelector('body')
const value = document.querySelector('#value')
const newBtn = document.querySelector('.newBtn')
const easyMode = document.querySelector('.easyMode')
const hardMode = document.querySelector('.hardMode')
const easyCards = document.querySelectorAll('.easy_card')
const hardCards = document.querySelectorAll('.hard_card')
const allCards = document.querySelectorAll('.card')
const result = document.querySelector('#result')

let colorStore = [];
let answer = '';
let mode = 3;
playerHasWon = false;


const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

const setRandomColors = () => {
    for (let i = 0; i < 6; i++) colorStore[i] = generateRandomColor()
    answer = colorStore[Math.floor(Math.random() * mode)]
};

const setCardColors = () => {
    for (let i = 0; i < mode; i++)
        allCards[i].style.backgroundColor = colorStore[i];
}

const getWin = (id) => {
    result.style.color = answer
    result.style.opacity = "1"
    playerHasWon = true;
    allCards.forEach((card, index) => {
        if (index != id) {
            card.style.backgroundColor = answer;
            card.style.pointerEvents = "none";
        }
    })
}

const reset = function () {
    result.style.opacity = "0"
    setRandomColors();
    playerHasWon = false;
    value.style.backgroundColor = "transparent"
    value.innerHTML = answer;
    easyCards.forEach(card => {
        card.style.opacity = "1"
        card.style.pointerEvents = "all";
    })
    if (mode == 6)
        hardCards.forEach(card => {
            card.style.opacity = "1"
            card.style.pointerEvents = "all";
        })
    setCardColors();
};

window.addEventListener('load', () => {
    mode = 3;
    reset();
})

newBtn.addEventListener('click', () => {
    reset();
})

easyMode.addEventListener('click', () => {
    mode = 3;
    reset();
    hardCards.forEach(card => {
        card.style.opacity = "0"
        card.style.pointerEvents = "none";
    })
})

hardMode.addEventListener('click', () => {
    mode = 6;
    reset()
    hardCards.forEach(card => {
        card.style.opacity = "1"
        card.style.pointerEvents = "all";
    })
})

allCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (card.style.backgroundColor == answer) {
            getWin(index)
        }
        else if (!playerHasWon) {
            card.style.opacity = "0"
            card.style.pointerEvents = "none";
        }
    })
})