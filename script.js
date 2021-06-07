'use strict';

// Function that generates a random number which is the secret number in which player is trying to guess
let secretNumber = 0; // Creation of secretNumber variable which will be the number the player tries to guess

// Random Number Function
const randomNumber = () => {
    secretNumber = Math.floor((Math.random() * 20) + 1); 
    console.log(secretNumber); // Prints secret number to console.
    return secretNumber;
}
randomNumber(); // Invoke Function so game can start upon refresh of page

let score = 20; // Initial score of game

// DOM NODE VARIABLES
let bodyDOM = document.querySelector('body'); // Place in DOM to select entire body. We need this to change background color of game for when player wins.
let scoreDOM = document.querySelector('.score'); // Place in DOM where score is located.
let messageDOM = document.querySelector('.message'); // Place in DOM that gives message such as score too low, too high, or you win or you lose!
let numberDOM = document.querySelector('.number'); // Place in DOM that displays secret number upon winning. When in game play it displays a ?
let guessDOM = document.querySelector('.guess'); // Place in DOM where you input your number guess

// Event listener for when you click on Check button to see if you guess is correct.
document.querySelector('.check').addEventListener('click', () => {
    const guess = Number(guessDOM.value); // Convert to number because by default all inputs by user in <input> tags are strings.

    if(!guess) {
        messageDOM.textContent = '⛔️ No Number!';
        // Player Wins game
    } else if (guess === secretNumber) {
        messageDOM.textContent = '🎉 Correct Number!';
        score += 1; // Add one to score upon guessing correct number
        scoreDOM.textContent = score; // Update the DOM where score is displayed to display the current score
        numberDOM.textContent = secretNumber; // Update DOM to display secret number upon player guessing the number correctly.
        numberDOM.style.width = '30rem'; 
        bodyDOM.style.backgroundColor = '#60b347'; // Must put color inside quotes; Style properties follow camelCase just like in Javascript and they always need to be put inside a string.
        // Player guess is too high
    } else if (guess > secretNumber) {
        if (score > 1) { // Score must be greater than 1 because if we have > 0 then player can get a score of 0 but it won't tell player they lost game
        messageDOM.textContent = '📈 Too High!';
        score -= 1; // Subtract one from score upon guessing incorrectly
        scoreDOM.textContent = score; // Update the DOM where score is displayed to display the current score
        } else {
            messageDOM.textContent = '💥 You lost the game!'
        }
        //Player guess is too low
    } else if (guess < secretNumber) {
        if (score > 1) { // Score must be greater than 1 because if we have > 0 then player can get a score of 0 but it won't tell player they lost game
        messageDOM.textContent = '📉 Too Low!';
        score -= 1; // Subtract one from score upon guessing incorrectly
        scoreDOM.textContent = score; // Update the DOM where score is displayed to display the current score
        } else {
            messageDOM.textContent = '💥 You lost the game!'
        }
    }
});

// Event listener for when player clicks on Again button which resets game to play again
document.querySelector('.again').addEventListener('click', () => {
    messageDOM.textContent = 'Start guessing...'; // Reset message back to Start Guessing....
    score = 20; // Reset score variable back to 20
    scoreDOM.textContent = score; // Reset score in DOM back to 20
    bodyDOM.style.backgroundColor = '#222'; // Change background color to green upon winning game
    numberDOM.style.width = '15rem'; // Change width of secret number back to original 15rem
    numberDOM.textContent = '?'; // Change secret number back to ? when resetting game
    guessDOM.value = ''; // Change input box back to blank upon resetting game; Must use .value instead of .textContent for anywhere in DOM where there is an <input> tag.
    randomNumber(); // Invoke function to change secret number variable to new random secret number for new game play
})


