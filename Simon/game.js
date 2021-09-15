const buttonColor = ["red", "blue", "green", "yellow"];
let level = 0;
let correctPattern = [];
let userClickedPattern = [];
let gameStart = false;

console.log("hello"); // making sure the javascript file actually runs

// making sure the user pressed any key from keybpard to stard game
document.addEventListener("keydown", event => {
  // start game if its not already started
  if(!gameStart) {
    gameStart = true;
    console.log("Game starts");
  }
});

const onClick = function() {
//  console.log(this.id);
  let userChoice = this.id  // set the button id to useChoice
  sound(userChoice);  // call sound function to play sound based on color
}
document.getElementById('red').onclick = onClick;
document.getElementById('blue').onclick = onClick;
document.getElementById('green').onclick = onClick;
document.getElementById('yellow').onclick = onClick;

// function that takes button color and plays the sound based on the color
function sound(buttonColor){
  let audio = new Audio("sounds/" + buttonColor + ".mp3");
  audio.play();
}
