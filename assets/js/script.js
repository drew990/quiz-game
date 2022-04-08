console.log("READING SCRIPT");

var buttonE1,
  buttonE2,
  buttonE3,
  buttonE4,
  divE2,
  textE1,
  questionCount,
  inputE1,
  labelE1,
  timerId,
  timeLeft;

var timerE1 = document.getElementById("stopWatch");
var headerE1 = document.getElementById("h1Display");
var textE2 = document.getElementById("textDisplay");
var divE1 = document.getElementById("question-btn");
var StartE1 = document.getElementById("Start-Game");
var divE3 = document.getElementById("option-div");
var goBack = document.createElement("button");
var clearE1 = document.createElement("button");

const quizQuestions = [
  {
    questionText: "Which is the tallest mountain in the world?",
    question1: "Mount Everest",
    question2: "K2",
    question3: "Kangchenjunga",
    question4: "Puncak Jaya",
    answer: "1",
  },
  {
    questionText: "Which country has the highest population?",
    question1: "India",
    question2: "China",
    question3: "United States",
    question4: "Indonesia",
    answer: "2",
  },
  {
    questionText: "Which is the tallest waterfall in the world?",
    question1: "Victoria Falls",
    question2: "Niagara Falls",
    question3: "Olo'upena Falls",
    question4: "Angel Falls",
    answer: "4",
  },
  {
    questionText: "Which is the largest desert in the world?",
    question1: "Sahara",
    question2: "Antarctic",
    question3: "Arabian Desert",
    question4: "Gobi Desert",
    answer: "2",
  },
  {
    questionText: "Which is the longest river in the world?",
    question1: "Amazon River",
    question2: "Yangtze River",
    question3: "Nile River",
    question4: "Mississippi-Missouri River",
    answer: "3",
  },
];

function countdown() {
  if (timeLeft == -1) {
    //Clears the timer
    clearTimeout(timerId);
    window.alert("The game has ended");
    GameEnd(timerId);
  } else {
    timerE1.innerText = timeLeft;
    timeLeft--;
  }
}

// Game starts
function startGame() {
  console.log("Click Start Game");

  //Sets the time
  timeLeft = 180;

  //Starts Timer
  timerId = setInterval(countdown, 1000);

  //Sets Question counter at 0
  questionCount = 0;
  //Displays First Question

  textE2.innerText = quizQuestions[0].questionText;

  //Creates the four question buttons
  //First gets Div ID to properly place the buttons in the right spot

  //Creates the four buttons with their proper first questions
  //BUTTON OPTION 1
  buttonE1 = document.createElement("button");
  buttonE1.setAttribute(
    "onClick",
    "nextQuestion(this.value, timeLeft, timerId)"
  );
  buttonE1.setAttribute("id", "QuesE1");
  buttonE1.innerText = quizQuestions[0].question1;
  buttonE1.value = 1;

  //BUTTON OPTION 2
  buttonE2 = document.createElement("button");
  buttonE2.setAttribute(
    "onClick",
    "nextQuestion(this.value, timeLeft, timerId)"
  );
  buttonE2.setAttribute("id", "QuesE2");
  buttonE2.innerText = quizQuestions[0].question2;
  buttonE2.value = 2;

  //BUTTON OPTION 3
  buttonE3 = document.createElement("button");
  buttonE3.setAttribute(
    "onClick",
    "nextQuestion(this.value, timeLeft, timerId)"
  );
  buttonE3.setAttribute("id", "QuesE3");
  buttonE3.innerText = quizQuestions[0].question3;
  buttonE3.value = 3;

  //BUTTON OPTION 4
  buttonE4 = document.createElement("button");
  buttonE4.setAttribute(
    "onClick",
    "nextQuestion(this.value, timeLeft, timerId)"
  );
  buttonE4.setAttribute("id", "QuesE3");
  buttonE4.innerText = quizQuestions[0].question4;
  buttonE4.value = 4;

  //Right or Wrong Text Display
  textE1 = document.createElement("p");
  textE1.setAttribute("id", "textDisplay1");

  //Removes Start Game Button

  StartE1.remove();

  //Displays the options
  divE1.append(buttonE1);
  divE1.append(buttonE2);
  divE1.append(buttonE3);
  divE1.append(buttonE4);
}

function nextQuestion(value, timeLeft, timerId) {
  let answerIncorrect;

  //Checks to see if answer is right
  if (value === quizQuestions[questionCount].answer) {
    textE1.innerText = "Correct!";
    answerIncorrect = false;
  }
  //If wrong, it'll display incorrect
  else {
    textE1.innerText = "Incorrect";
    answerIncorrect = true;
  }

  //Displays if answer is correct or not
  divE1.append(textE1);

  //Adds 1 to Question Counter
  questionCount++;

  //Checks to see if the game has ended
  if (questionCount === quizQuestions.length) {
    console.log("The game has ended");
    GameEnd(timeLeft);
  }
  //If not, it'll continue asking questions
  else {
    textE2.innerText = quizQuestions[questionCount].questionText;
    buttonE1.innerText = quizQuestions[questionCount].question1;
    buttonE2.innerText = quizQuestions[questionCount].question2;
    buttonE3.innerText = quizQuestions[questionCount].question3;
    buttonE4.innerText = quizQuestions[questionCount].question4;
  }

  //Subtracts 10s from timer
  if (answerIncorrect == true) {
    clearTimeout(timerId);
    startTimerAgain();
  }
}

//Takes 10s off and starts again
function startTimerAgain() {
  timeLeft = timeLeft - 10;
  timerE1.innerText = timeLeft;
  timerId = setInterval(countdown, 1000);
}

function GameEnd(timeLeft) {
  //Stops the timer
  clearTimeout(timerId);

  //It'll remove all the children elements
  divE1.removeChild(buttonE1);
  divE1.removeChild(buttonE2);
  divE1.removeChild(buttonE3);
  divE1.removeChild(buttonE4);
  divE1.innerText = "";

  //Display End Game Text
  headerE1.innerText = "All Done!";
  textE2.innerText = "Your final score is: " + timeLeft;

  //Displays input
  labelE1 = document.createElement("label");
  labelE1.setAttribute("for", "inputInitials");
  labelE1.textContent = "Enter Initials Here:";

  inputE1 = document.createElement("input");
  inputE1.setAttribute("type", "text");
  inputE1.setAttribute("id", "inputInitials");

  //Rewrite the start button
  StartE1.setAttribute("id", "continue");
  StartE1.setAttribute("onClick", "submitHighScore()");
  StartE1.innerText = "Submit";

  divE1.append(labelE1);
  divE1.append(inputE1);
  divE1.append(StartE1);
}

function submitHighScore() {
  //Gets Value from Input
  const val = document.querySelector("input").value;

  //Puts it into local storage
  localStorage.setItem(val, timeLeft);

  //Clears everything
  divE1.innerHTML = "";

  //Goes to High Scores
  viewHighScore();
}

function viewHighScore() {
  console.log("Give me high score plsss");
  var archive = [],
    keys = Object.keys(localStorage),
    key,
    scoreE1;

  //Creates the go back function
  goBack.setAttribute("onClick", "ResetGame()");
  goBack.innerText = "Go Back";

  //Creates Clear Function
  clearE1.setAttribute("onClick", "clearStorage()");
  clearE1.innerText = "Clear Scores";

  //Checks if there is any scores recorded
  if (localStorage.length == 0) {
    textE2.innerText = "No high scores have been recorded yet";
  } else {
    //Gets ID from all the save scores
    for (var i = 0; (key = keys[i]); i++) {
      //Pushes Key and Value into an array
      archive.push(key + " - " + localStorage.getItem(key));
    }

    //Displays HighScore to users
    headerE1.innerText = "HighScore";
    textE2.innerText = "";

    for (var i = 0; i < archive.length; i++) {
      //Creates the elements needed to display
      divE2 = document.createElement("div");
      scoreE1 = document.createElement("p");

      //Gets the score save from local storage
      savScore = localStorage.getItem(archive[i]);
      scoreE1.innerText = archive[i];

      //Creates a class for the scores
      divE2.classList.add("score");

      //Appends the elements
      divE1.append(divE2);
      divE2.append(scoreE1);
    }
  }

  //Displays the buttons
  divE3.append(goBack);
  divE3.append(clearE1);
}

function ResetGame() {
  //Delete Buttons in DivE3
  divE3.removeChild(goBack);
  divE3.removeChild(clearE1);
  //Deletes All elements
  divE1.innerHTML = "";

  //Resets Title
  headerE1.innerHTML = "Banagas Quiz Game";
  //Resets text display
  textE2.innerText =
    "Test out geography knowledge by taking this quiz. It'll ask you simple questions from capitals and where certain locations are. Good luck!";
  //Resets Start Game Button
  StartE1.setAttribute("id", "Start-Game");
  StartE1.setAttribute("onClick", "startGame()");
  StartE1.innerText = "Start Game";

  //Redisplay the start button
  divE3.append(StartE1);
}

function clearStorage() {
  //Clears Storage
  localStorage.clear();

  //Replaces any scores or text with a confirm message
  divE1.innerHTML = "";
  textE2.innerText =
    "Your scores have been cleared. Theres nothing to show now :(";
}

//Goes to High Score
highScoreButton.addEventListener("click", function () {
  //
  clearTimeout(timerId);

  //Removes Start Game Button
  StartE1.remove();
  //Clears Buttons if in middle of the quiz
  divE1.innerHTML = "";
  //Views Scores
  viewHighScore();
});
