

// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const result = document.getElementById("result");
const input_group= document.getElementById("input_group");
const submit = document.getElementById("submit");
const studentname = document.getElementById("studentname");
const scorerank = document.getElementById("scorerank");


// create our questions
let questions = [
    {
        question : "JavaScript is the programming language of the _____.",
        choiceA : "1. Desktop",
        choiceB : "2. Mobile",
        choiceC : "3. Web",
        choiceD : "4. Server",
        correct : "C"
    },{
        question : "Which type of JavaScript language is _____?",
        choiceA : "1. Object-oriented",
        choiceB : "2. Object-based",
        choiceC : "3. Functional programming",
        choiceD : "4. All of the above",
        correct : "B"
    },{
        question : "JavaScript ignores?",
        choiceA : "1. newlines",
        choiceB : "2. tabs",
        choiceC : "3. spaces",
        choiceD : "4. All of the above",
        correct : "D"
    },{
        question : "In JavaScript, single line comment begins with ___.",
        choiceA : "1. #",
        choiceB : "2. /*",
        choiceC : "3. $",
        choiceD : "4. //",
        correct : "D"
    },{
        question : "The const keyword is used to define a ______.",
        choiceA : "1. Function scopes variable",
        choiceB : "2. Block scoped variable",
        choiceC : "3. Constant",
        choiceD : "4. Constant with no initial value",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
  //  renderCounter();
  //  TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}



// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
       
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){

    result.innerHTML = "<p>"+ "correct !" +"</p>";
    //clean out in half second
    setTimeout(function(){
        result.innerHTML = '';
    }, 500);
}


// answer is Wrong
function answerIsWrong(){
    result.innerHTML = "<p>"+ "wrong !" +"</p>";
//clean out in half second
    setTimeout(function(){
        result.innerHTML = '';
    }, 500);
}

// score render
function scoreRender(){
    quiz.style.display = "none";

    scoreDiv.style.display = "block";

    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
     
    scoreDiv.innerHTML += "<p>"+ "Well Done ! your score is " + scorePerCent +"%</p>";
}


submit.addEventListener("click", function(event) {
    event.preventDefault();
    
    var studenttest =
    {username : studentname.value.trim(),
     userscore: score
    };
    
    localStorage.setItem("studenttest", JSON.stringify(studenttest)); 

    // and renders todos on the page
    //renderTodos();
  });

//
//  function savename() {
 //   event.preventDefault();

  //    var studenttest =
 //     {studentname : studentname.value,
//       studentscore: score

//      }
     // Set the todos to be stringified and saves them into todos in localStorage
 //   localStorage.setItem("studenttest", JSON.stringify(studenttest));
 // }

  function highestscore() {
    var max=0;
    max = math.max(score);
  }