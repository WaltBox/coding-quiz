var inputDiv = document.querySelector(".initials");
var timeDiv = document.querySelector(".time");
var questionDiv = document.querySelector(".question");
var answersDiv = document.querySelector(".choice-container");
var scoreDiv = document.querySelector(".score");
var ul = document.getElementById("list");
var li = document.createElement("li");
//var newP =document.createElement("p");
//document.choices.appendChild(newP);


var seconds = 75;
var index = 0;
var score = 0;

var questions = [
    {
        question: "What is the color of the sky",
        choices: ["A. blue", "B. red", "C. yellow", "D. All of them"],
        answer: "D. All of them"
    },
    {
        question: "What is 1+1",
        choices: ["0","1","2","3"],
        answer: "2"
    },
    {
        question: "What does HTML stand for?",
        choices:["Hypertext Markup Language" , "Huge text mice like", "Harry tom might like", "High tide might look"],
        answer: "Hypertext Markup Language"
    },
    {
        question: "What is used to style a website?",
        choices: ["HTML", "CSS","Javascript","Git"],
        answer: "CSS"
    },
]

function displayQuestions() {
    // Step 1: Change the question on the screen
    var questionTitle = questions[index].question
    questionDiv.textContent = questionTitle;
    // Step 2: Change the answers
    answersDiv.textContent = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
        //for each choice, create a p tag
        var p = document.createElement('p');
        //then: add/display text choice value to the p tag
        p.textContent = questions[index].choices[i];
        //add class
        p.classList.add('choice-text');
        //then: append each p tag to answerDiv
        answersDiv.appendChild(p)
        //when an answer is clicked, call checkAnswer func
        p.addEventListener('click', checkAnswer)
    }
}

function checkAnswer(event) {
    var chosenBtn = event.target.innerText;
    //Check to see if chosen answer is equal to answer in questions arr
    if (chosenBtn === questions[index].answer){
        score += 1;

    } else {
        score -= 1;
    }
    index++;
    if (index >= questions.length) {
        window.location.href = "gameover.html"; 
        return
    }
    displayQuestions();
    //call displayQuestion again
}

function updateTime() {
    timeDiv.textContent = "Time: " + seconds
    if (seconds == 0 ) {
        window.location.href = "gameover.html"; 
        return
    }
    seconds-- 
    setTimeout(updateTime,1000)
    return;     
}
function handleInitials() {
    var temp = inputDiv.textContent
    if (localStorage.getItem("highscores") == null) {
        var newHighscores = {};
        localStorage.setItem("highscores", JSON.stringify(newHighscores));
    }
    var storedScores = JSON.parse(localStorage.getItem("highscores"));
    storedScores[temp] = score;
    console.log(storedScores)
    localStorage.setItem("highscores", JSON.stringify(storedScores))
    window.location.href = "index.html"; 
}
function viewHighscores() {
    window.location.href = "highscores.html"; 
}
function hsHome() {
    window.location.href = "index.html"; 
}
updateTime()
displayQuestions()