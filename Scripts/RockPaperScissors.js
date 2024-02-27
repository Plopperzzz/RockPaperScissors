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
        cutoffValue += weights[i];

        if (num - weights[i] < epsilon) {
            return choices[i];
        }

        num = num - cutoffValue;
    }
}

function getWinner(choices=['Rock', 'Paper', 'Scissors'], player1, player2) {
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
        if(player2Index === choices.length - 1 && player1Index === 0)
        {
            // check cyclic case
            //message = "player 1 wins!";
            retVal = 0;
        }
        else{
            //message = "Player 2 wins!";
            retVal = 1;
        }
    }

    return retVal;
}