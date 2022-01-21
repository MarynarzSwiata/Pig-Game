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
let activePlayer = 0;
let score = 0;
const scores = [0, 0];

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
  if (activePlayer === 0) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    activePlayer = 1;
    score = 0;
    currentPlayer0El.textContent = score;
  } else {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    activePlayer = 0;
    score = 0;
    currentPlayer1El.textContent = score;
  }
};

// CHECKING WHO WINS
const checkWin = function () {
  if (scores[0] >= 100) {
    currentPlayer0El.textContent = 'WINNER';
    currentPlayer1El.textContent = 'LOOSER';
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
    diceRoll.setAttribute('src', `images/cup.png`);
  } else if (scores[1] >= 100) {
    currentPlayer1El.textContent = 'WINNER';
    currentPlayer0El.textContent = 'LOOSER';
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
    diceRoll.setAttribute('src', 'images/cup.png');
  }
};

// BUTTON ROLL A DICE
const addValueCurrent = function (randomNumber) {
  if (randomNumber === 1) {
    changeActivePlayer();
  } else {
    score += randomNumber;
    if (activePlayer === 0) {
      currentPlayer0El.textContent = score;
    } else if (activePlayer === 1) {
      currentPlayer1El.textContent = score;
    }
  }
  checkWin();
};

// BUTTON HOLD A VALUE
const holdValue = function () {
  if (activePlayer === 0) {
    scores[0] += score;
    scorePlayer0El.textContent = scores[0];
  } else {
    scores[1] += score;
    scorePlayer1El.textContent = scores[1];
  }
  changeActivePlayer();
  checkWin();
  console.log(scores);
};

// RESET GAME
const newGame = function () {
  changeActivePlayer();
  diceRoll.classList.add('hidden');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  scores[(0, 0)];
  score;
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
