const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let matchCount = 0;
let firstCard;
let secondCard;

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard) {
    return;
  }
  if (this === firstCard) {
    return;
  }

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;

  checkForMatch();

  setTimeout(() => {
    gameOver();
  }, 400);
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (isMatch) {
    matchCount++;
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffleBoard() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function gameOver() {
  if (matchCount === 6) {
    if (confirm("You've done it. Well Done!")) {
      window.location.reload();
    } else {
      return;
    }
  }
}

module.exports = {
  cards,
  matchCount,
};
