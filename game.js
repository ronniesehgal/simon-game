var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var toggle = false;


$(document).keypress(function() {
  if (!toggle) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    gamesequence();
    toggle = true;
  }
});
$(".btn").click(function(){
  userClickedPattern.push(this.id);
  checkAnswer((userClickedPattern.length)-1)
  animatePress(this.id);
  playSound(this.id);
});
function playSound(name){
  var clicked = new Audio("sounds/"+name+".mp3");
  clicked.play();
}
function animatePress(nameColor){
  $("#"+nameColor).addClass("pressed");
  setTimeout(function(){
    $("#"+nameColor).removeClass("pressed");
  },100);
}

function gamesequence(){
     userClickedPattern = [];
     level++;
     $("h1").text("level"+ " "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
}

function checkAnswer(index){
  if (gamePattern[index] === userClickedPattern[index]){
        if (index == (gamePattern.length)-1){
          setTimeout(gamesequence(),3000);

        }
  }else{
    var lost = new Audio("sounds/wrong.mp3");
    lost.play()
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")},200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  toggle = false;
}
