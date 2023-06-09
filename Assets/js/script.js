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
let choice_que = document.querySelectorAll(".choice_que");
    

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

    choice_que.forEach(removeActive =>{
        removeActive.classList.remove("active");
    })

    total_correct.innerHTML = `${correct = 0} out of ${MCQS.length} Questions`;
});

choice_que.forEach( (choices,choiceNo) =>{
    choices.addEventListener("click" , ()=>{
        choices.classLst.add("active");
        // check answer
        if(choiceNo === MCQS[index].answer){
            correct ++;
        }
        else{
            correct += 0;
        }
        clearInterval(interval);

        // disable all options once select an answer
        for(i= 0; i < 3; i++) {
            choice_que[i].classList.add("disabled")
        }
    })
});


// when you click Next Button

next_question.addEventListener("click" , () =>{

// if index is less then MCQS.length
if(index !== MCQS.length -1) {
    index ++;
    choice_que.forEach(removeActive =>{
        removeActive.classList.remove("active");
    })

    // question
loadData();


// result
total_correct.style.display ="block";
total_correct.innerHTML = `${correct} out of ${MCQS.length} Questions`;
clearInterval(interval);
interval = setInterval(countDown,1000);
}
else {
    index = 0;


    // question complete display result
    clearInterval(interval);
    quiz.style.display = "none";
    points.innerHTML = `You got ${correct} out of ${MCQS.length}`;
    result.style.display = "block";

    }
    for(i= 0; i < 3; i++) {
        choice_que[i].classList.remove("disabled")
}

})


// What happens when you click Quit button
quit.addEventListener("click" , ()=> {
    start.style.display = "block";
    result.style.display = "none;"
});

// What happens when you click start again button
exit.addEventListener("click" , ()=> {
    guide.style.display = "block";
    result.style.display = "none;"
});

// Highscore

// Retrieve the form and table elements
const form = document.getElementById('highscore-form');
const tableBody = document.getElementById('highscore-body');

// Array to store the highscores
let highscores = [];

// Function to save the highscore
function saveHighscore(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve the player name and score from the form
  const playerNameInput = document.getElementById('player-name');
  const scoreInput = document.getElementById('score');
  const playerName = playerNameInput.value;
  const score = parseInt(scoreInput.value);

  // Create a highscore object
  const highscore = { playerName, score };

  // Add the highscore to the array
  highscores.push(highscore);

  // Sort the highscores in descending order by score
  highscores.sort((a, b) => b.score - a.score);

  // Clear the form inputs
  playerNameInput.value = '';
  scoreInput.value = '';

  // Update the highscore table
  updateHighscoreTable();

  // Optionally, you can save the highscores to local storage
  localStorage.setItem('highscores', JSON.stringify(highscores));
}

// Function to update the highscore table
function updateHighscoreTable() {
  // Clear the table body
  tableBody.innerHTML = '';

  // Iterate over the highscores and create table rows
  for (let i = 0; i < highscores.length; i++) {
    const highscore = highscores[i];

    // Create a new table row
    const row = document.createElement('tr');

    // Create table cells for player name and score
    const playerNameCell = document.createElement('td');
    playerNameCell.textContent = highscore.playerName;
    row.appendChild(playerNameCell);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = highscore.score;
    row.appendChild(scoreCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  }
}

// Add a submit event listener to the form
form.addEventListener('submit', saveHighscore);

// Optionally, you can load highscores from local storage if available
const savedHighscores = localStorage.getItem('highscores');
if (savedHighscores) {
  highscores = JSON.parse(savedHighscores);
  updateHighscoreTable();
}



