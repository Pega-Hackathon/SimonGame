console.log("hello"); // making sure the javascript file actually runs

const buttonColor = ["red", "blue", "green", "yellow"];
let level = 0;  // store the game level
let correctPattern = []; // randomly generated game patten
let userClickedPattern = []; // user clicked patten
let customPattern = [];
let gameStart = false;
let customGame = false;
let updatingform = false;

startGame();

const onClick = function() {
  console.log(this.id);
  let userChoice = this.id  // set the user clicked button id to useChoice
  userClickedPattern.push(userChoice);  // adding user clicked color to an userClickedPattern array

  MakeSound(userChoice);  // call MakeSound function to play MakeSound based on color
  //animateOnClick(userChoice);
  playRound(correctPattern);
  checkAnswer(userClickedPattern.length-1); // passing last user clicked answer
}

// getting id of each button when clicked by calling onClick function
document.getElementById('red').onclick = onClick;
document.getElementById('blue').onclick = onClick;
document.getElementById('green').onclick = onClick;
document.getElementById('yellow').onclick = onClick;


function getdata() {
  updatingform = true;
}
document.getElementById('submit').addEventListener("click", function() {

  var color0 = document.getElementById('color0').value;
  var color1 = document.getElementById('color1').value;
  var color2 = document.getElementById('color2').value;
  var color3 = document.getElementById('color3').value;
  var color4 = document.getElementById('color4').value;

  //checking if the form fields are empty
  // ignore the fields that empty and add color that array that exists
  if( !( (color0 ||color1||color2||color3||color4) === "" ) ) {
    if( !(color0 === "")){
      customPattern.push(color0); // adding color to gamepatten array
    }
    if( !(color1 === "")){
      customPattern.push(color1);
    }
    if( !(color2 === "")){
      customPattern.push(color2);
    }
    if( !(color3 === "")){
      customPattern.push(color3);
    }
    if( !(color4 === "")){
      customPattern.push(color4);
    }
    updatingform = false;
    customGame = true;
    console.log(customPattern);
  }
  else {
    updatingform = false;
  }

});

function startGame (){
  // making sure the user pressed any key from keybpard to start game
  document.addEventListener("keydown", event => {
    // start game if its not already started
    if((!gameStart) && (!updatingform)) {
      gameStart = true;
      console.log("Game starts");
      if(customGame){
        document.getElementById('game-status').innerHTML = "Level " + level + " - Custom Pattern";
        console.log("custome game starts")
        getCustomColor()
      }
      else {
        document.getElementById('game-status').innerHTML = "Level " + level + " - Random Pattern";
        getNextColor();
      }
    }
  });
}

// function to check if the user clicked pattern is same as actual computer generated pattern(correctPattern)
function checkAnswer(currentLevel) {
  if (correctPattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === correctPattern.length){
      setTimeout(function () {
        // getNextColor(); // if pattern is correct, calling getNextColor function
        if(customGame) {
          console.log("custome game starts")
          getCustomColor()
        }
        else{
          getNextColor();
        }
      }, 1000);
    }
  } else {
    MakeSound("wrong"); // if pattern is worong, then play wrong.mp3 MakeSound
    document.body.classList.add("game-over"); // display game over by adding 'game-over'class from css
    document.getElementById('title').innerHTML = "Game Over, Press Any Key To Start";   // overwrite game over message as title

    setTimeout(function () {
      document.body.classList.remove("game-over"); // remove 'game-over' class from title
    }, 200);

    startOver();
  }
}

// function to reset the game.
function startOver() {
  level = 0;
  correctPattern = [];
  userClickedPattern = []; // user clicked patten
  customPattern = [];
  let customGame = false;
  let updatingform = false;
  gameStart = false;
  startGame();
}

// function that gets random color and added to correctPattern for guessing
// reseting userclicke pattern
function getNextColor() {
  userClickedPattern = [];
  level++;
  document.getElementById('game-status').innerHTML = "Level " + level + " - Random Pattern";
  var randomNumber = Math.floor(Math.random() * 4); // generating random number between 0-4
  var randomChosenColour = buttonColor[randomNumber]; // pick the color based on random number generated
  correctPattern.push(randomChosenColour); // adding color to correctpatten array

  flashCorrectPattern(); // calling flash method to flash computer generated pattern
}

function playRound(correctPattern) {
  correctPattern.forEach((color, index) => {
//    console.log(correctPattern);
    setTimeout(() => {
      animateOnClick(color);
    }, (index + 1) * 600);
  });
}

const timer = ms => new Promise(res => setTimeout(res, ms))

//function that loops through each color from computer generated list and animate with wait time
async function flashCorrectPattern () { // We need to wrap the loop into an async function for this to work
  document.getElementById('title').innerHTML = "Watch for pattern";
  for (let i = 0; i < correctPattern.length; i++) {
    MakeSound(correctPattern[i]);
    $("#" + correctPattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    await timer(1000); // then the created Promise can be awaited
  }
  document.getElementById('title').innerHTML = "GO";
}

// function to animate the button when user clicked by adding pressed css class styling
function animateOnClick(currentColor) {
  document.getElementById(currentColor).classList.add(".pressed");
  setTimeout(function() {
    document.getElementById(currentColor).classList.remove("pressed");
  }, 100);
  return;
}

// function that takes button color and plays the MakeSound based on the color
function MakeSound(buttonColor){
  let audio = new Audio("sounds/" + buttonColor + ".mp3");
  audio.play();
}

//customer game

// if user is playing custom game, use this function
function getCustomColor() {
  userClickedPattern = [];
  level++;
  document.getElementById('game-status').innerHTML = "Level " + level + " - Custom Pattern";
  if(level-1 < customPattern.length ) {
    console.log(customPattern[level-1]);
    correctPattern.push(customPattern[level-1]); // adding color to correctpatten array
    flashCorrectPattern(); // calling flash method to flash computer generated pattern
  }
  else {
    document.getElementById('title').innerHTML = "You Won, Please Refresh The Browser";   // overwrite game over message as title
    customGame = false;
    startOver();
  }

}
