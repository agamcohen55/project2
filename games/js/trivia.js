window.onload = function () {
  
  var questionArea = document.getElementsByClassName('questions')[0],
      answerArea   = document.getElementsByClassName('answers')[0],
      checker      = document.getElementsByClassName('checker')[0],
      current      = 0,
  
   // חפץ שמכיל את כל השאלות + תשובות אפשריות.
      // במערך --> הספרה האחרונה נותנת את מיקום התשובה הנכונה
      allQuestions = {
        'מי המרצה הכי טוב בעולם?' : ['שלמה', 'איתמר', 'מישהו אחר', 0],
        
        'המכללה הכי טובה?' : ['אקריו', 'גון בריס' , 'שם אחר', 0],
        
        'איזה שנה אגם נולד? ' : ['2003', '1995', '2007', 0]
      };
      
  function loadQuestion(curr) {
  // פונקציה זו טוענת את כל השאלות לתוך questionArea
   // הוא תופס את השאלה הנוכחית על סמך המשתנה 'נוכחי'
    var question = Object.keys(allQuestions)[curr];
    
    questionArea.innerHTML = '';
    questionArea.innerHTML = question;    
  }
  
  function loadAnswers(curr) {
  // פונקציה זו טוענת את כל התשובות האפשריות של השאלה הנתונה
   // הוא תופס את מערך התשובות הדרוש בעזרת המשתנה הנוכחי
   // כל תשובה מתווספת עם פונקציית 'onclick'
  
    var answers = allQuestions[Object.keys(allQuestions)[curr]];
    
    answerArea.innerHTML = '';
    
    for (var i = 0; i < answers.length -1; i += 1) {
      var createDiv = document.createElement('div'),
          text = document.createTextNode(answers[i]);
      
      createDiv.appendChild(text);      
      createDiv.addEventListener("click", checkAnswer(i, answers));
      
      
      answerArea.appendChild(createDiv);
    }
  }
  
  function checkAnswer(i, arr) {
   // פונקציה זו טוענת את כל התשובות האפשריות של השאלה הנתונה
   // הוא תופס את מערך התשובות הדרוש בעזרת המשתנה הנוכחי
   // כל תשובה מתווספת עם פונקציית 'onclick'
    
    return function () {
      var givenAnswer = i,
          correctAnswer = arr[arr.length-1];
      
      if (givenAnswer === correctAnswer) {
        addChecker(true);             
      } else {
        addChecker(false);                        
      }
      
      if (current < Object.keys(allQuestions).length -1) {
        current += 1;
        
        loadQuestion(current);
        loadAnswers(current);
      } else {
        questionArea.innerHTML = 'ניצחון!';
        answerArea.innerHTML = 'הפסד!';
      }
                              
    };
  }
  
  function addChecker(bool) {
  // פונקציה זו מוסיפה אלמנט div לדף
   // משמש כדי לראות אם זה נכון או לא נכון
    var createDiv = document.createElement('div'),
        txt       = document.createTextNode(current + 1);
    
    createDiv.appendChild(txt);
    
    if (bool) {
      
      createDiv.className += 'correct';
      checker.appendChild(createDiv);
    } else {
      createDiv.className += 'false';
      checker.appendChild(createDiv);
    }
  }
  
  
  // התחל את החידון מיד
  loadQuestion(current);
  loadAnswers(current);
  
};