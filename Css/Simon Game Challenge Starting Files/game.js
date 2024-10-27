
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];

var start = false;
var level = 0 ;
$(document).keydown(function(){
    if (!start) {
        $("#level-title").text("Level " + level);
    nextSequence();
    start = true;

    }
})
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").addClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    console.log("Màu ngẫu nhiên: ", randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+ currentColour).addClass("Press");
    setTimeout(function(){
        $("#" + currentColour).removeClass("Press")}, 100);  
}
function startOver() {
    level = 0;
    start = false;
    gamePattern=[];
}





