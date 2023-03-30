var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var addHighscore = document.querySelector(".addhigh");
var quizOver = document.querySelector(".quiz-over");
var par = document.querySelector(".enterinitial");
var questionEl = document.querySelector(".question");
var htmlChoices = ["#answer1", "#answer2", "#answer3", "#answer4"];
var answerButtons = document.querySelector(".answerButtons")
var feedback = document.querySelector(".feedback")

var inputEl = document.createElement("input")
var listEl = document.createElement("ol")
// var liEl = document.createElement("li")
var buttonEl = document.createElement("button")
var questionindex = 0

var quizOver = false;
var timer;
var timercount= 90
var flashTimeout;
const questionOptions = [
    {
      question: "How can you get the total number of arguments passed to a function?",
      answeropt: ["A - Using args.length property", "B - Using arguments.length property", "C - Both of the above.", "D - None of the above."],
      answer: "A - Using args.length property"
    },
  
    {
      question: "Which built-in method calls a function for each element in the array?",
      answeropt: ["A - while()", "B - loop()", "C - forEach()", "D - None of the above."],
      answer: "B - loop()"
    },
    
    {
      question: "Which of the following function of String object returns the index within the calling String object of the first occurrence of the specified value?",
      answeropt: ["A - substr()", "B - search()", "C - lastIndexOf()", "D - indexOf()"],
      answer: "C - lastIndexOf()"
    },
    {
        question: "10 - Which of the following function of Array object reverses the order of the elements of an array?",
        answeropt: ["A - reverse()", "B - push()", "C - reduce()", "D - reduceRight()"],
        answer: "C - reduce()"
      },
    
      {
        question: "Which of the following function of String object creates a string to be displayed as bold as if it were in a <b> tag?",
        answeropt: ["A - anchor()", "B - big()", "C - blink()", "D - bold()"],
        answer: "C - blink()"
      },
    ];
    


// remove intro text
function startquiz() {
    startTimer()
    displayquestion()
    quizOver = false
    startButton.disabled = true
}
function displayquestion(){
    var currentQuestion = questionOptions[questionindex]
    questionEl.textContent = currentQuestion.question
    var answerOptions = currentQuestion.answeropt
    for (let i = 0; i<answerOptions.length; i++){
        var choices = document.querySelectorAll(`${htmlChoices[i]}`)
        for (let j = 0; j<choices.length; j++){
            choices[j].textContent = answerOptions[i]
        }
    }
}
answerButtons.addEventListener("click", function(event){
    console.log("clicked")
    var answerEl = event.target
    if (answerEl.matches("button")){
        checkAnswer(answerEl.textContent)
    }
})
function checkAnswer(answerEl){
    var correctAnswer = questionOptions[questionindex].answer
    if (answerEl === correctAnswer){
        clearTimeout(flashTimeout)
        feedback.textContent = "Correct"
        feedback.classList.remove("hide")
        flashTimeout = setTimeout(function(){
            feedback.classList.add("hide")
        },1000)
    } else {
        timercount -= 15
        clearTimeout(flashTimeout)
        feedback.textContent = "Incorrect"
        feedback.classList.remove("hide")
        flashTimeout = setTimeout(function(){
            feedback.classList.add("hide")
    },1000)
    }
    questionindex++
    if (questionOptions.length > questionindex){
        displayquestion()
    } else {
        setTimeout(function(){
            finishQuiz()
        },1000)
    }
}

// enter initials and add it to highscore list in local storage
// clear last question and answers
function finishQuiz() {
    clearInterval(timer)
    quizOver.textContent = "All Done"
    par.textContent = "Enter your initials."
    buttonEl.textContent = "Submit"
    par.appendChild(inputEl)
    par.appendChild(buttonEl)
}

function startTimer() {
    timer = setInterval(function() {
        timercount--
        timerElement.textContent = timercount
        if (timercount >= 0) {
            if (quizOver && timercount >= 0) {
                finishQuiz()
            }
        }
        if (timercount === 0) {
            clearInterval(timer)
            failQuiz()
        }
    },1000)
}
// create failQuiz 

startButton.addEventListener("click",function(){
    startquiz()
})