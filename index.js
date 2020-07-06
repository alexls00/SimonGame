var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false; // helps to know if the game already began
var level = 0;

// Gives a new color to the sequence
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
  audio.play();
  level++;
  $('h1').text("Level " + level);
}

//Play the corresponding sound for each color
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

//makes an animation when a button is clicked by the user
function animatePress(currentColor) {
  $('.' + currentColor).addClass('pressed');
  setTimeout(function() {
    $('.' + currentColor).removeClass('pressed');
  }, 100);
}

function startover(){
  started = false;
  level = 0;
  gamePattern = [];
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      console.log("succes");
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    });
    $('h1').text("Game over, press any key to restart");
    startover();
  }
}

//When a Button is pressed
$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(event.target.id)
  animatePress(event.target.id)


  checkAnswer(userClickedPattern.length - 1);
})

//When a key is pressed
$(document).on('keypress', function() {
  if (started == false) {
    nextSequence();
    started = true;
  }
});
