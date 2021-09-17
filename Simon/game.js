console.log("hello"); // making sure the javascript file actually runs

const buttonColor = ["red", "blue", "green", "yellow"];
const redButton = document.getElementById('red').id;
const blueButton = document.getElementById('blue').id;
const greenButton = document.getElementById('green').id;
const yellowButton = document.getElementById('yellow').id;
const buttonID = [redButton, blueButton, greenButton, yellowButton];

let level = 0;
let correctPattern = [];
let userClickedPattern = [];
let gameStart = false;
let userCanClick = false;

// making sure the user pressed any key from keybpard to stard game
document.addEventListener("keydown", event => {
  // start game if its not already started
  if(!gameStart) {
    gameStart = true;
    console.log("Game starts");
    document.getElementById('game-status').innerHTML = "Level " + level;
    nextSequence();
  }
});

const onClick = function() {
  console.log(this.id);
  let userChoice = this.id  // set the button id to useChoice
  userClickedPattern.push(userChoice);  // adding user clicked color to an userClickedPattern array

  sound(userChoice);  // call sound function to play sound based on color
  //animatePress(userChoice);
  playRound(correctPattern);
  //flashCorrectPattern()


  checkAnswer(userClickedPattern.length-1); // passing last user clicked answer
}
document.getElementById('red').onclick = onClick;
document.getElementById('blue').onclick = onClick;
document.getElementById('green').onclick = onClick;
document.getElementById('yellow').onclick = onClick;

function checkAnswer(currentLevel) {
  if (correctPattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === correctPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    sound("wrong");
    document.body.classList.add("game-over");
    document.getElementById('title').innerHTML = "Game Over, Please Refresh The Browser";

    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  correctPattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById('game-status').innerHTML = "Level " + level;
  var randomNumber = Math.floor(Math.random() * 4); // generating random number between 0-4
  var randomChosenColour = buttonColor[randomNumber]; // pick the color based on random number generated
  correctPattern.push(randomChosenColour); // adding color to gamepatten array

  flashCorrectPattern();


}

function playRound(correctPattern) {
  correctPattern.forEach((color, index) => {
    console.log(correctPattern);
    setTimeout(() => {
      animatePress(color);
    }, (index + 1) * 600);
  });
}


const timer = ms => new Promise(res => setTimeout(res, ms))

async function flashCorrectPattern () { // We need to wrap the loop into an async function for this to work
  document.getElementById('title').innerHTML = "Watch for pattern";
  for (var i = 0; i < correctPattern.length; i++) {
    sound(correctPattern[i]);
    $("#" + correctPattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    console.log(i);
    await timer(2000); // then the created Promise can be awaited
  }
  document.getElementById('title').innerHTML = "GO";
}


function animatePress(currentColor) {
  document.getElementById(currentColor).classList.add(".pressed");
  setTimeout(function() {
    document.getElementById(currentColor).classList.remove("pressed");
  }, 100);
  return;
}

// function that takes button color and plays the sound based on the color
function sound(buttonColor){
  let audio = new Audio("sounds/" + buttonColor + ".mp3");
  audio.play();
}
