const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const phoneButton = document.getElementById('phoneButton');
const fiftyFiftyButton = document.getElementById('fiftyFiftyButton');

let questions = [
 
  { question: 'שאלה 1: מי המרצה הכי טוב?', options: ['שלמה', 'תשובה 2', 'תשובה 3', 'תשובה 4'], correctIndex: 0 },
  { question: 'שאלה 2: מהו ריבוע של 9?', options: ['6', '9', '12', '15'], correctIndex: 1 },
  { question: 'שאלה 3: מהו תוצאת 7 * 8?', options: ['45', '50', '56', '64'], correctIndex: 2 },
  { question: 'שאלה 4: מהו שורש ריבועי של 144?', options: ['10', '12', '15', '20'], correctIndex: 1 },
];

let currentQuestionIndex = 0;

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = ''; 
  
  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => checkAnswer(index));
    optionsElement.appendChild(optionElement);
  });

  feedbackElement.textContent = '';
}

function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedIndex === currentQuestion.correctIndex) {
    feedbackElement.textContent = 'תשובה נכונה!';
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      questionElement.textContent = 'סיימת את המשחק! כל הכבוד!';
      optionsElement.innerHTML = '';
      feedbackElement.textContent = '';
      phoneButton.disabled = true;
      fiftyFiftyButton.disabled = true;
    }
  } else {
    feedbackElement.textContent = 'תשובה שגויה, נסה שוב.';
  }
}

phoneButton.addEventListener('click', () => {
  feedbackElement.textContent = 'אני מזמין חבר לטלפון...';
  phoneButton.disabled = true;
  setTimeout(() => {
    feedbackElement.textContent = 'החבר אמר שהתשובה הנכונה היא: ' + questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctIndex];
  }, 2000);
});

fiftyFiftyButton.addEventListener('click', () => {
  feedbackElement.textContent = 'אני מפסיק חצי מהתשובות...';
  fiftyFiftyButton.disabled = true;
  const currentQuestion = questions[currentQuestionIndex];
  const wrongOptions = currentQuestion.options.filter((option, index) => index !== currentQuestion.correctIndex);
  const randomIndex = Math.floor(Math.random() * wrongOptions.length);
  optionsElement.innerHTML = '';
  optionsElement.innerHTML += `<div class="option">${currentQuestion.options[currentQuestion.correctIndex]}</div>`;
  optionsElement.innerHTML += `<div class="option">${wrongOptions[randomIndex]}</div>`;
});

displayQuestion();
