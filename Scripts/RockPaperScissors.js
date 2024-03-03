// choices is ordered such that choices[0] > choices[len-1], choices[len-1] > choices[len-2], ..., > choices[0] i.e choices is cyclic in nature.
// ex.
// Rock > Scissors, Scissors > Paper, Paper > Rock
function getComputerChoice(choices = ['Rock', 'Paper', 'Scissors'], weights = [1 / 3, 1 / 3, 1 / 3]) {
    let epsilon = 10e-5;
    let num, cutoffValue = 0;

    if (Math.abs(weights.reduce((a, b) => a + b, 0) - 1) > epsilon) {
        console.error("Weights do not sum to unity");
        return 1;
    }
    if (weights.length != choices.length) {
        console.error("incorrect choice or weight count.");
    }

    num = Math.random();
    for (let i = 0; i < choices.length; ++i) {

        // find where exactly in our weights num falls
        // we do this by subtracting the probabilities from our random number one at a time until 
        // our random number is less than the next probability.
        cutoffValue += weights[i];

        if (num - weights[i] < epsilon) {
            return choices[i];
        }

        num = num - cutoffValue;
    }
}

function getWinner(choices = ['Rock', 'Paper', 'Scissors'], player1, player2) {
    let retVal;

    // get player choice index 
    player1Index = choices.indexOf(player1);
    player2Index = choices.indexOf(player2);

    if (player1 === player2) {
        //message = "It's a tie!";
        retVal = -1;
    }
    else if (player1Index > player2Index) {

        // check cyclic case
        if (player1Index === choices.length - 1 && player2Index === 0) {
            //message = "Player 2 wins!";
            retVal = 1;
        }
        else {
            //message = "Player 1 wins!";
            retVal = 0;
        }
    }
    else {
        if (player2Index === choices.length - 1 && player1Index === 0) {
            // check cyclic case
            //message = "player 1 wins!";
            retVal = 0;
        }
        else {
            //message = "Player 2 wins!";
            retVal = 1;
        }
    }

    return retVal;
}

function playGame(choices = ['Rock', 'Paper', 'Scissors']) {
    let player1Wins = 0,

        // Computer
        player2Wins = 0,
        ties = 0;

    // result of one game
    let res;

    console.log("Rock Paper Scissors!");

    for (let i = 0; i < 5; ++i) {

        console.clear();

        console.log(`           Player         Computer
        ----------------------------
            ${player1Wins}              ${player2Wins}`);
            

        let userInput = prompt("What is your choice (Rock Paper Scissors)?");

        userInput = userInput.toLowerCase().slice(0, 1).toUpperCase() + userInput.toLowerCase().slice(1, userInput.length);

        if (!choices.includes(userInput)) {
            console.error("Not a valid choice");
            i--;
            continue;
        }

        let comp = getComputerChoice();
        res = getWinner(undefined, userInput, comp);

        console.log(`Player 1 played ${userInput}`);
        console.log(`Computer played ${comp}`);
        console.log(res);

        if (res === -1) {
            ties++;
            console.log("Tie");
        }
        else if (res === 0) {
            player1Wins++;
            console.log("Player 1");
        }
        else if(res === 1) {
            player2Wins++;
            console.log("Computer");
        }

    }

    if (player1Wins === player2Wins) {
        console.log("It's a tie!");
    };
    if (player1Wins > player2Wins) {
        console.log("Player 1 wins!");
    }
    else {
        console.log("Computer wins!");
    }
}

let playerWins = 0,
    computerWins = 0;

const gameBtn = document.querySelectorAll('.game-button');
const playerWindow = document.querySelector("#score1");
const computerWindow = document.querySelector('#score2');
const info = document.querySelector('#info');

gameBtn.forEach(element => {
    element.addEventListener('click', e =>{
        //alert(element.id)
        const compChoice = getComputerChoice();
        let playerChoice;

        switch(element.id)
        {
            case 'rockBtn':
                playerChoice = 'Rock';
                break;
            case 'paperBtn':
                playerChoice = 'Paper';
                break;
            case 'scissorsBtn':
                playerChoice = 'Scissors';
                break;
        }

        switch(compChoice)
        {
            case 'Rock':
                document.querySelector('#rockBtn').style.backgroundColor = '#d47c74';
                document.querySelector('#paperBtn').style.backgroundColor = 'rgb(235,235,235)';
                document.querySelector('#scissorsBtn').style.backgroundColor = 'rgb(235,235,235)';
                break;
            case 'Paper':
                document.querySelector('#paperBtn').style.backgroundColor = '#d47c74';
                document.querySelector('#rockBtn').style.backgroundColor = 'rgb(235,235,235)';
                document.querySelector('#scissorsBtn').style.backgroundColor = 'rgb(235,235,235)';

                break;
            case 'Scissors':
                document.querySelector('#scissorsBtn').style.backgroundColor = '#d47c74';
                document.querySelector('#paperBtn').style.backgroundColor = 'rgb(235,235,235)';
                document.querySelector('#rockBtn').style.backgroundColor = 'rgb(235,235,235)';
                break;
        }

        const winnerVal = getWinner(undefined, playerChoice, compChoice);
        if(winnerVal == 0)
        {
            playerWins++;
        }
        if(winnerVal == 1)
        {
            computerWins++;
        }

        playerWindow.textContent = playerWins;
        computerWindow.textContent = computerWins;
        console.log(computerWins);
        console.log(playerWins);


        info.textContent = winnerVal === -1 ? "It's a tie!" : winnerVal === 0 ? "You win!" : "Computer wins!";
    })
});