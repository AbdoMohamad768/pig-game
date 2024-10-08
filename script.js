'use strict';

const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.querySelector('#score--1');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const currentEl0 = document.querySelector('#current--0');
const currentEl1 = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let running, score, currentScore, activePlayer;

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
}
function initialize() {
  running = true;
  activePlayer = 0;
  currentScore = 0;
  score = [0, 0];

  diceEl.classList.add('hidden');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
}

initialize();

btnRoll.addEventListener('click', function () {
  if (running) {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    if (diceRoll === 1) {
      switchPlayer();
    } else {
      currentScore += diceRoll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (running) {
    // Add current score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // Check if player won
    if (
      Number(document.querySelector(`#score--${activePlayer}`).textContent) >=
      100
    ) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      diceEl.classList.add('hidden');
      running = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove('player--winner');

  // if (playerEl1.classList.contains('player--active')) {
  //   playerEl0.classList.toggle('player--active');
  //   playerEl1.classList.toggle('player--active');
  // }
  initialize();
});
// btnNew.addEventListener('click', initialize);
