'use strict';

// Selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const resetButton = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// initialise the game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');

  dice.classList.add('hide');
};
init();

// Change player function
const changePlayer = function () {
  // switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // used to switch background colour instead of toggle we can also use add or remove player--active class manually
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  // switchPlayer();
};

// hide dice before starting the game
dice.classList.add('hide');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // used to switch background colour instead of toggle we can also use add or remove player--active class manually
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Roll dice function
rollDice.addEventListener('click', function () {
  if (playing) {
    const randomNum = Math.trunc(Math.random() * 6 + 1);
    dice.src = `./images/dice-${randomNum}.png`;
    dice.classList.remove('hide');

    if (randomNum !== 1) {
      currentScore += randomNum;
      // currentScore0.textContent = sumOfCurentScore; instead of this
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
});

/* player 0 at position 0 and player1 two at position1 so in 
this var we will be storing the scores */
holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    // scores[0] = scores[0] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hide');
    } else {
      changePlayer();
    }
  }
});

// reset new game button function
resetButton.addEventListener('click', init);
