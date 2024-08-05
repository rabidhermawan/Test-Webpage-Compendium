let roundCount = 5; let playerScore = 0; let computerScore = 0;

function getComputerMove() {
    let computerMove = Math.floor(Math.random() * 3);
    if (computerMove === 0) return "rock";
    else if (computerMove === 1) return "paper";
    else if (computerMove === 2) return "scissor";
    else return "null";
}

function updateDisplay() {
    roundDisplay.textContent = "Rounds left : " + roundCount;
    scoreDisplay.textContent = "Player : " + playerScore + " Computer : " + computerScore;
}

//Main Logic

const submitBtn = document.querySelector("#submit");
const resetBtn = document.querySelector("#resetPlay");
submitBtn.textContent = "Submit";
resetBtn.textContent = "Reset";

const roundDisplay = document.querySelector("#roundsLeft"); 
const scoreDisplay = document.querySelector("#scoreboard");
const testDisplay = document.querySelector("#testDisplay");

roundDisplay.textContent = "Rounds left : " + roundCount;
scoreDisplay.textContent = "Player : " + playerScore + " Computer : " + computerScore;

const radioSelect = document.querySelectorAll("#rpsInput");

//Reset game
resetBtn.addEventListener("click", () => {
    roundCount = 5;
    playerScore = 0;
    computerScore = 0;
    testDisplay.textContent = "";
    updateDisplay();
    
    radioSelect.forEach((rpsInput) => {
        rpsInput.checked = false;
    });
});
        
submitBtn.addEventListener("click", () => {
    //Make sure Game hasn't end yet
    if (roundCount > 0) {
        let proceed = false;
        let playerMove = '';
        let computerMove = getComputerMove();
        radioSelect.forEach((rpsInput) => {
            if (rpsInput.checked) {
                playerMove = rpsInput.value;
                roundCount--;
                proceed = true;
            }
        });

        if (proceed === true){
            //Win Scenarios
            if ((playerMove === "rock" && computerMove === "scissor") ||
                (playerMove === "paper" && computerMove === "rock") ||
                (playerMove === "scissor" && computerMove === "paper")) {
                playerScore++;
                testDisplay.textContent = "Yes! "+ playerMove + " beats " + computerMove + "!";
            }
            //Draw Scenario
            else if (playerMove == computerMove) {
                testDisplay.textContent = playerMove + " ties with " + computerMove + "!";
            }
            //Lose scenario
            else {
                computerScore++;
                testDisplay.textContent = "Oh no! "+ playerMove + " loses to " + computerMove + "!";
            }
        }

        if (roundCount === 0) {
            if (playerScore > computerScore) 
                testDisplay.textContent = "Congrats, you are the winner!";
            else if (playerScore === computerScore) 
                testDisplay.textContent = "Draw!";
            else {
                testDisplay.textContent = "Better luck next time!";
            }
        }
        updateDisplay();
    }
}); 
