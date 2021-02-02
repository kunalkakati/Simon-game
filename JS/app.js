
 var ButtonColours = ["red","blue","green","yellow"];
 var gamePattern = [];
 var userClickPattern = [];
 var started = false;
 var level = 0; 

 function nextSequence(){
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = ButtonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    checkAnswer(userClickPattern.length-1);
    animatePress(userChosenColor);
    playSound(userChosenColor);
})

function playSound(SoundName){
    $("#" + SoundName).fadeOut(100).fadeIn(100);
    var sound = new Audio("sounds/" + SoundName + ".mp3");
    sound.play();
}

function animatePress(curentcolor){
  
   $("."+curentcolor).addClass("pressed");
   setTimeout(function(){
       $("."+curentcolor).removeClass("pressed");
   },100);
}

$(document).keydown(function (){
    if(!started){
        $("#level-title").text( "Lavel " + level);
        nextSequence();
        started = true;
    }    
})

function checkAnswer(curentlevel){

    if(gamePattern[curentlevel] === userClickPattern[curentlevel]){
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game over! press any key to restart.");
        startOver();
    }
}

function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}

