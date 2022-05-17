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
const highscoreDiv = document.getElementById("highscoreContainer");
const front = document.getElementById("front");
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
    highscoreDiv.style.display ="none";
    front.style.display ="none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
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
    front.style.display ="none";
    scoreDiv.style.display = "block";

    
    // calculate the amount of question percent answered ]y the user
    let scorePerCent = Math.round(100 * score/questions.length);
     
    scoreDiv.innerHTML = "<p>"+ "Well Done ! your score is " + scorePerCent +"%</p>";

    scoreDiv.innerHTML +='<label for="studentname">' + 'your name is: ' + '</label>';
    scoreDiv.innerHTML +='<input type="text" name="studentname" id="studentname" placeholder="your name">';
    console.log(scorePerCent);
    scoreDiv.innerHTML += '<button class="submit" id="submit"">submit</button>';
    const submit = document.getElementById("submit");
    const studentname = document.getElementById("studentname");
    let studenttestarray=[];
    function savename() {

        var studenttest =
       {studentname : studentname.value,
        studentscore: scorePerCent
  
        };
       console.log(studenttest);
  
       studenttestarray.push(studenttest);
       localStorage.setItem("studenttestarray", JSON.stringify(studenttestarray));
      
   };

   submit.addEventListener("click", function(event) {
    event.preventDefault();
    
   savename();
   highscoreRender();
  });
}


function highscoreRender(){
    quiz.style.display = "none";
    front.style.display ="none";
    scoreDiv.style.display = "none";
    highscoreDiv.style.display ="block";
    
    let jsonarray = localStorage.getItem("studenttestarray");
    let retrievedObject = JSON.parse(jsonarray);
    console.log(retrievedObject);
    highscoreDiv.innerHTML+="<p> Name:  " + retrievedObject[0].studentname +"</p>";
    highscoreDiv.innerHTML+="<p> Percentage:  " + retrievedObject[0].studentscore +"</p>";

    highscoreDiv.innerHTML+= '<button class="Restart" id="Restart"">Go back</button>';
    const Restart = document.getElementById("Restart");

    Restart.addEventListener("click", function(event) {

        event.preventDefault();
        score = 0;
        runningQuestion = 0;
        startQuiz();
      });

}

