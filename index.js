let player = {
    name: localStorage.getItem("playerName") || "Player",
    chips: 500
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const playerEl = document.getElementById("player-el")
const startBtn = document.querySelector("button[onclick='startGame()']")
const newCardBtn = document.querySelector("button[onclick='newCard()']")

playerEl.textContent = `${player.name}: $${player.chips}`

function getRandomCard() {
    const randomNumber = Math.floor(Math.random() * 13) + 1
    return randomNumber > 10 ? 10 : randomNumber === 1 ? 11 : randomNumber
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    cards = [getRandomCard(), getRandomCard()]
    sum = cards[0] + cards[1]
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: " + cards.join(" ")
    sumEl.textContent = "Sum: " + sum

    if (sum < 21) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 50
    } else {
        message = "You're out of the game!"
        isAlive = false
        player.chips -= 50
    }

    messageEl.textContent = message
    playerEl.textContent = `${player.name}: $${player.chips}`
    newCardBtn.disabled = !isAlive || hasBlackJack
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        const card = getRandomCard()
        cards.push(card)
        sum += card
        renderGame()
    }
}

function resetGame() {
    cards = []
    sum = 0
    hasBlackJack = false
    isAlive = false
    message = "Want to play a round?"
    messageEl.textContent = message
    cardsEl.textContent = "Cards:"
    sumEl.textContent = "Sum:"
    newCardBtn.disabled = false
    playerEl.textContent = `${player.name}: $${player.chips}`
}
