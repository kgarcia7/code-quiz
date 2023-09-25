const questions = [
    {
        question: "What does HTML standing for?",
        answers: [
            { text: "Highly Targetted Markup Language", correct: false},
            { text: "Hyper Text Machine Language", correct: false},
            { text: "Huge Text Markup Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
        ]
    },
    {
        question: "Commonly used data types do NOT include",
        answers: [
            { text: "strings", correct: false},
            { text: "booleans", correct: false},
            { text: "alerts", correct: true},
            { text: "numbers", correct: false},
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed with ____",
        answers: [
            { text: "quotes", correct: false},
            { text: "curly brackets", correct: true},
            { text: "parenthesis", correct: false},
            { text: "square brackets", correct: false},
        ]
    },
    {
        question: "What is the purpose of a variable in programming?",
        answers: [
            { text: "To store and manage data", correct: true},
            { text: "To perform mathematical calculations", correct: false},
            { text: "To display information on the screen", correct: false},
            { text: "To create loops in the code", correct: false},
        ]
    },
    {
        question: "What is the purpose of a for loop in programming?",
        answers: [
            { text: "To declare a variable", correct: false},
            { text: "To define a function", correct: false},
            { text: "To repeat a block of code a specific number of times", correct: true},
            { text: "To display a message to the user", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials-input");

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimitPerQuestion = 30;

function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
    startTimer();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer() {
    let timeLeft = timeLimitPerQuestion;
    timerElement.textContent = `Time left: ${timeLeft} seconds`;
  
    timer = setInterval(() => {
      timeLeft--;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        handleNextButton();
      } else {
        timerElement.textContent = `Time left: ${timeLeft} seconds`;
      }
    }, 1000);
  }


function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");

    if (timerElement.textContent.includes("seconds")) {
        const currentTimeLeft = parseInt(timerElement.textContent.split(" ")[2]);
        if (currentTimeLeft > 10) {
          startTimerWithReducedTime(currentTimeLeft - 10);
        } else {
          startTimerWithReducedTime(0);
        }
      }
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function startTimerWithReducedTime(timeLeft) {
    clearInterval(timer);
    timerElement.textContent = `Time left: ${timeLeft} seconds`;
    timer = setInterval(() => {
      timeLeft--;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        handleNextButton();
      } else {
        timerElement.textContent = `Time left: ${timeLeft} seconds`;
      }
    }, 1000);
  }


function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    scoreElement.textContent = `Score: ${score}`;
    initialsForm.style.display = "block";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    initialsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const initials = initialsInput.value.trim();
        if (initials !== "") {
            saveScore(initials, score);
            initialsForm.style.display = "none";
        }
    });
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function saveScore(initials, score) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = {
        initials: initials,
        score: score,
    }

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

startQuiz();
