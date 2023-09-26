const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const checkButton = document.getElementById('checkButton');
const feedbackElement = document.getElementById('feedback');

let correctAnswer; // המשתנה בו נשמור את התשובה הנכונה

// פונקציה ליצירת שאלה חדשה
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  questionElement.textContent = `${num1} ${operator} ${num2}`;
  
  // שמירת התשובה הנכונה במשתנה
  correctAnswer = eval(`${num1} ${operator} ${num2}`);
}

checkButton.addEventListener('click', function() {
  const userAnswer = parseFloat(answerElement.value);
  
  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = 'תשובה נכונה!';
  } else {
    feedbackElement.textContent = 'תשובה שגויה, נסה שוב.';
  }

  answerElement.value = '';
  
  // יצירת שאלה חדשה לאחר בדיקה
  generateQuestion();
});

// יצירת שאלה ראשונית
generateQuestion();
