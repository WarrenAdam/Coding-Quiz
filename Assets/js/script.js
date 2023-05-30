//  START SECTION
let start = document.querySelector("#start");


//  GUIDE SECTION
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//  QUIZ SECTION
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//  QUESTION SECTION
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//  MCOS SECTION
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");


//  CORRECT AND NEXT BUTTON SECTION
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");



//  RESULTS SECTION
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let playAgain = document.querySelector("#playAgain");


//  GET ALL 'H4' FROM QUIZ SECTION MCQS
let choice_que = document.querySelector(".choice_que");
    

let index = 0;
let timer = 0;
let interval = 0;

// Total Points
let correct = 0;

// stor Answer Value
let UserAns = undefined;

// What happens when you click start button
start.addEventListener("click" , ()=> {
    start.style.display = "none";
    guide.style.display = "block;"
});


// What happens when you click exit button
exit.addEventListener("click" , ()=> {
    start.style.display = "block";
    guide.style.display = "none;"
});

// Creating Timer for Quiz Timer Section

let countDown = ()=>{
    if(timer === 20) {
        clearInterval(interval);
        next_question.click();
    }
    else {
        timer++;
        time.innertext = timer;
    }
}

// setInterval(countDown,1000);

let loadData = ()=> {
    questionNo.innerText = index + 1 +". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
    option4.innerText = MCQS[index].choice4;

    // Timer start
    timer = 0;

}

loadData();

// when you click continue button
continueBtn.addEventListener("click", ()=>{
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown,1000);
    loadData();
});