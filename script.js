let randomNumber=Math.floor(Math.random()*100)+1;
let attempts=10;
let trials=10;
const guessInput=document.getElementById("guessInput");
const submitGuess=document.getElementById("submitGuess");
const message=document.getElementById("message");
const attemptsDisplay=document.getElementById("attempts");
const restartGame=document.getElementById("restartButton");
const highScoreDisplay=document.getElementById("highscore");

let highscore=localStorage.getItem("highscore");
if(highscore===null){
    highScoreDisplay.textContent="None";
}else{
    highScoreDisplay.textContent=highscore;
}

submitGuess.addEventListener("click",function(){
    let userGuess=parseInt(guessInput.value);

    if(isNaN(userGuess)||userGuess<1||userGuess>100){
        message.textContent="Please enter a number between 1 and 100";
        message.style.color="red";
        return;
    }
    attempts--;

    if(userGuess===randomNumber){
        message.textContent=`Correct!The number was ${randomNumber} You got it in ${trials-attempts} attempts`;
        message.style.color="green";
        let attemptsUsed=10-attempts;
        if(highscore===null || attemptsUsed<highscore){
            localStorage.setItem("highscore",attemptsUsed);
            highScoreDisplay.textContent=attemptsUsed;
        }
        endGame();
    }else if(userGuess>randomNumber){
        message.textContent="Too high!Try another guess";
        message.style.color="orange";
    }else{
        message.textContent="Too low!Try again!";
        message.style.color="blue";
    }
    attemptsDisplay.textContent=attempts;

    if(attempts===0){
        message.textContent=`Game over bro!No more attempts left! The number was ${randomNumber}`;
        message.style.color="red";
        endGame();
    }
    guessInput.value="";
});

function endGame(){
    guessInput.disabled=true;
    submitGuess.disabled=true;
    restartGame.style.display="block";
}

restartGame.addEventListener("click",function(){
    randomNumber=Math.floor(Math.random()*100)+1;
    attempts=10;
    attemptsDisplay.textContent=attempts;
    message.textContent="";
    guessInput.disabled=false;
    submitGuess.disabled=false;
    guessInput.value="";
    restartGame.style.display="none";
})