const wordElement = document.getElementById('word');
const guessesElement = document.getElementById('guesses');
const hangmanElement = document.getElementById('hangman');
const restartButton = document.getElementById('restartButton');

const words = ['apple', 'banana', 'cherry', 'grape', 'orange', 'pear', 'pineapple', 'strawberry', 'watermelon'];

let currentWord;
let guessedLetters = [];
let mistakes = 0;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  let displayedWord = '';
  for (const letter of currentWord) {
    if (guessedLetters.includes(letter)) {
      displayedWord += letter;
    } else {
      displayedWord += '_';
    }
    displayedWord += ' ';
  }
  wordElement.textContent = displayedWord;
}

function displayHangman() {
  const parts = [
    mistakes >= 1 ? 'O' : '',
    mistakes >= 2 ? '|' : '',
    mistakes >= 3 ? '/' : '',
    mistakes >= 4 ? '\\' : '',
    mistakes >= 5 ? '/' : '',
    mistakes >= 6 ? '\\' : '',
  ];
  hangmanElement.textContent = parts.join('');

  // Adding classes to hangman parts for animation
  const hangmanParts = hangmanElement.querySelectorAll('.head, .body, .left-arm, .right-arm, .left-leg, .right-leg');
  hangmanParts.forEach((part, index) => {
    if (index < mistakes) {
      part.classList.add('show');
    } else {
      part.classList.remove('show');
    }
  });
}

function checkWinOrLose() {
  if (mistakes >= 6) {
    wordElement.textContent = 'אתה הפסדת! המילה הייתה: ' + currentWord;
  } else if (!wordElement.textContent.includes('_')) {
    wordElement.textContent = 'ניצחת! המילה הייתה: ' + currentWord;
  }
}

function restartGame() {
  currentWord = getRandomWord();
  guessedLetters = [];
  mistakes = 0;
  wordElement.textContent = '';
  guessesElement.textContent = '';
  hangmanElement.textContent = '';
  displayWord();
  displayHangman();
}

document.addEventListener('keydown', (event) => {
  const letter = event.key.toLowerCase();
  if (currentWord.includes(letter) && !guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    displayWord();
  } else if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    mistakes++;
    displayWord();
    displayHangman();
  }
  guessesElement.textContent = 'ניסיונות שגויים: ' + mistakes;
  checkWinOrLose();
});

restartButton.addEventListener('click', restartGame);

restartGame();
