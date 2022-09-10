const cards = document.querySelectorAll(".memory-card");
const outputSeconds = document.getElementById("second");
const outputMins = document.getElementById("minute");
let hasFlippedCard = false;
let lockBoard = false;
let matchCount = 0;
let winningMatchCount = 0;
let firstCard;
let secondCard;
let Interval;
let seconds = 00;
let minute = 00;
let isTimerOn = false;
let countFlip = 0;

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (isTimerOn === false) {
    startTimer();
    isTimerOn = true;
  }
  if (lockBoard) {
    return;
  }
  if (this === firstCard) {
    return;
  }
  countFlip++;
  document.getElementById("flips").innerHTML = countFlip;

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
  if (matchCount === winningMatchCount) {
    clearInterval(Interval);
    document.getElementById("time").innerHTML = getTime();
    document.getElementById("grid").style.display = "block";
    document.getElementById("sizeSelection").style.display = "none";
    document.getElementById("winner").style.display = "block";
    document.getElementById("flipCount").innerHTML = countFlip;
  }
}

function getGridSize(value) {
  document.getElementById("memory-game").classList.remove("x3x2");

  if (value === "x3x2") {
    for (let i = 0; i < 10; i++) {
      cards[i].remove();
    }
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.add("x3x2");
    }
    winningMatchCount = 3;
  }
  if (value === "x4x3") {
    for (let i = 0; i < 4; i++) {
      cards[i].remove();
    }
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.add("x4x3");
    }
    winningMatchCount = 6;
  }
  if (value === "x4x4") {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.add("x4x4");
    }
    winningMatchCount = 8;
  }
  document.getElementById("grid").style.display = "none";
}

function timer() {
  seconds++;
  outputSeconds.innerHTML = "0" + seconds;
  outputMins.innerHTML = "0" + minute;

  if (seconds > 59) {
    minute++;
    seconds = 0;
    outputSeconds.innerHTML = "0" + 0;
  }
  if (outputSeconds.innerHTML > 9) {
    outputSeconds.innerHTML = seconds;
  }
}

function getTime() {
  clearInterval(Interval);
  const timeTaken = `${outputMins.innerHTML}:${outputSeconds.innerHTML}`;
  return timeTaken;
}

function startTimer() {
  Interval = setInterval(timer, 1000);
}

function restartGame() {
  window.location.reload();
}

module.exports = {
  cards,
  matchCount,
  getGridSize,
  outputSeconds,
  countFlip,
};
