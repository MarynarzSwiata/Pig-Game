'use strict';

// SELECTORS
const diceRoll = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const currentPlayer0El = document.querySelector('#current--0');
const currentPlayer1El = document.querySelector('#current--1');
const scorePlayer0El = document.querySelector('#score--0');
const scorePlayer1El = document.querySelector('#score--1');

// VARIABLES
let activePlayer = 0,
  score = 0,
  scores = [0, 0];

// FUNCTIONS
// GENERATING RANDOM NUMBER 1 => 6
const randomNumber = function () {
  let diceNumber = 0;
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  diceRoll.setAttribute('src', `images/dice-${diceNumber}.png`);
  return diceNumber;
};

// CHANGING PLAYER 0 => 1 OR 1 => 0
const changeActivePlayer = function () {
  score = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = score;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  checkWin();
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// REMOVING BUTTONS AND ADDING CUP
const win = function () {
  btnHold.classList.add('hidden');
  btnRoll.classList.add('hidden');
  diceRoll.classList.add('hidden');
};

// CHECKING WHO WINS
const checkWin = function () {
  if (scores[activePlayer] >= 10) {
    document.querySelector(`#current--${activePlayer}`).textContent =
      'WINNER 🏆';
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner', 'name');
    win();
  }
};

// BUTTON ROLL A DICE
const addValueCurrent = function (randomNumber) {
  if (randomNumber === 1) {
    changeActivePlayer();
  } else {
    score += randomNumber;
    // dynamic selection of active player and assign score
    document.querySelector(`#current--${activePlayer}`).textContent = score;
  }
};

// BUTTON HOLD A VALUE
const holdValue = function () {
  scores[activePlayer] += score;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  changeActivePlayer();
};

// RESET GAME
const newGame = function () {
  diceRoll.classList.add('hidden');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  player0.classList.remove('player--winner', 'name');
  player1.classList.remove('player--winner', 'name', 'player--active');
  scores = [0, 0];
  score = 0;
  currentPlayer0El.textContent = 0;
  currentPlayer1El.textContent = 0;
  scorePlayer0El.textContent = 0;
  scorePlayer1El.textContent = 0;
};

// MAIN
btnRoll.addEventListener('click', function () {
  diceRoll.classList.remove('hidden');
  addValueCurrent(randomNumber());
});

btnHold.addEventListener('click', holdValue);

btnNew.addEventListener('click', newGame);
