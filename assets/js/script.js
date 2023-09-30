const questions = [
    {
        question: "What does HTML standing for?",
        answers: [
          "Highly Targetted Markup Language", 
            "Hyper Text Machine Language", 
            "Huge Text Markup Language",
            "Hyper Text Markup Language",
        ],
        correct:"Hyper Text Markup Language"
    },
    {
        question: "Commonly used data types do NOT include",
        answers: [
             "strings", 
             "booleans", 
             "alerts",
             "numbers",
        ],
        correct: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with ____",
        answers: [
             "quotes",
             "curly brackets",
             "parenthesis", 
             "square brackets", 
        ],
        correct:"parenthesis",
    },
    {
        question: "What is the purpose of a variable in programming?",
        answers: [
            "To store and manage data",
            "To perform mathematical calculations", 
             "To display information on the screen", 
             "To create loops in the code", 
        ],
        correct: "To store and manage data",
    },
    {
        question: "What is the purpose of a for loop in programming?",
        answers: [
             "To declare a variable", 
            "To define a function", 
             "To repeat a block of code a specific number of times",
             "To display a message to the user",
        ],
        correct: "To repeat a block of code a specific number of times",
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-btn");
const scoreElement = document.getElementById("score");
const initialsForm = document.getElementById("initials-form");
const userInput = document.getElementById("user-input");
const submitBtn= document.getElementById("submit-btn")
const app= document.querySelector(".app")
const startContainer=document.querySelector(".start-container")
const timeEL=document.querySelector(".time")
const statusEL=document.getElementById("status")
const initialsContainer=document.querySelector(".container")
const scoreDetails=document.querySelector("#score-details")

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30
let highScores=[]

function startQuiz () {
    console.log("click");
    startContainer.classList.add("hide")
    timeEL.classList.replace("hide", "show")
    app.classList.replace("hide", "show")
    showQuestion(); 
    startTimer();
}

function showQuestion() {
    if(currentQuestionIndex === questions.length){
       showScore()
    }

    answerButtons.innerHTML=""
  
    questionElement.innerHTML=questions[currentQuestionIndex].question


    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
       
        });
}



function startTimer() {

    timer = setInterval(() => {
      timeLeft--;
      timeEL.textContent = `Time left: ${timeLeft} seconds`;
      if (timeLeft == 0) {
      showScore()
      
      } 
    }, 1000);
  }


function selectAnswer(answer) {
    console.log(answer==true, "is this true?");
    if (answer==questions[currentQuestionIndex].correct){
        
        statusEL.innerHTML="Correct!"
        statusEL.style.color="green"
        setTimeout(()=>{
        score++;
        currentQuestionIndex++
        showQuestion()
        statusEL.innerHTML=""
        },1200)
    } else {
        statusEL.innerHTML="Incorrect"
        statusEL.style.color="red"
        setTimeout(()=>{
       currentQuestionIndex++
        showQuestion()
        timeLeft= timeLeft-5
        statusEL.innerHTML=""
    },1200)
   
    }
}



function showScore() {
    clearInterval(timer)
    app.style.display="none"
    initialsContainer.classList.replace("hide", "show")

   scoreDetails.innerHTML = `You scored ${score} out of ${questions.length}!`;
    // scoreElement.textContent = `Score: ${score}`;
   

   
}

function saveScore(initials) {
     highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = {
        initials: initials,
        score: score,
    }
    console.log(newScore);

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    console.log(highScores);
    // highScores = highScores.slice(0, 10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("score.html")
}




startButton.addEventListener("click", startQuiz )
answerButtons.addEventListener("click",()=>{
    correctAns=this.event.target.textContent
    // console.log(correctAns);
    selectAnswer(correctAns)
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const initials = userInput.value.trim();
    if (initials !== "") {
        saveScore(initials);
        initialsForm.style.display = "none";
    }
});




//OLD CODE

// function resetState() {
//     nextButton.style.display = "none";
//     while(answerButtons.firstChild){
//         answerButtons.removeChild(answerButtons.firstChild);
//     }
// }

    // Array.from(answerButtons.children).forEach(button => {
    //     if (button.dataset.correct === "true") {
    //         button.classList.add("correct");
    //     }
    //     button.disabled = true;
    // });
    // nextButton.style.display = "block";
//}

// function startTimerWithReducedTime(timeLeft) {
//     clearInterval(timer);
//     timerElement.textContent = `Time left: ${timeLeft} seconds`;
//     timer = setInterval(() => {
//       timeLeft--;
  
//       if (timeLeft <= 0) {
//         clearInterval(timer);
//         handleNextButton();
//       } else {
//         timerElement.textContent = `Time left: ${timeLeft} seconds`;
//       }
//     }, 1000);
//   }
