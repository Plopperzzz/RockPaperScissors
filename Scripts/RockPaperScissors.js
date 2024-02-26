function getComputerChoice(choices=['Rock', 'Paper', 'Scissors'],weights=[1/3, 1/3, 1/3]){
    let epsilon = 10e-5;
    let num, cutoffValue = 0;

    if(Math.abs(weights.reduce((a,b)=>a+b,0) - 1) > epsilon )
    {
        console.error("Weights do not sum to unity");
        return;
    }
    if(weights.length != choices.length)
    {
        console.error("incorrect choice or weight count.");
    }

    num = Math.random();
    for(let i = 0; i < choices.length; ++i)
    {
        if(num - cutoffValue < epsilon)
        {
            return choices[i];
        }

        num = num - cutoffValue;
        cutoffValue += weights[i];
    }
}