'use strict';

//---------------------------GLOBAL VARIABLES----------------------------------------------
let secretNumber = 0; // Creation of secretNumber variable which will be the number the player tries to guess
let score = 20; // Initial score of game
let highScore = 0; // Initial value of highScore
let lostMessage = '💥 You lost the game!';
let gameOver = false;
let lowNumber = 1; // Pick a number that is between lowNumber here and highNumber below.
let highNumber = 20; // Pick a number that is between lowNumber above and highNumber here.


//---------------------------DOM NODE VARIABLES---------------------------------------------
let bodyDOM = document.querySelector('body'); // Place in DOM to select entire body. We need this to change background color of game for when player wins.
let scoreDOM = document.querySelector('.score'); // Place in DOM where score is located.
let numberDOM = document.querySelector('.number'); // Place in DOM that displays secret number upon winning. When in game play it displays a ?
let guessDOM = document.querySelector('.guess'); // Place in DOM where you input your number guess
let highScoreDOM = document.querySelector('.highscore') // Place in DOM which display the high score
let betweenDOM = document.querySelector('.between').textContent = `Between ${lowNumber} and ${highNumber}`; // Sets the between class in the DOM to display the numbers between that we chose in the variables lowNumber and highNumber above.


//---------------------------------FUNCTIONS-------------------------------------------------
// Random Number Function - Function that generates a random number which is the secret number in which player is trying to guess
const randomNumber = () => {
    secretNumber = Math.floor((Math.random() * 20) + 1); 
    console.log(secretNumber); // Prints secret number to console.
    return secretNumber;
}
randomNumber(); // Invoke Function so game can start upon refresh of page

// Function to check for high score and update the DOM to display the high score
const checkHighScore = (score) => {
    if (score > highScore) {
        highScore = score;
        highScoreDOM.textContent = highScore; // Update high score in DOM
    }
}

// Function to check to see if guess is between numbers and give them message if their guess IS NOT between the numbers
const guessCheck = (guess) => {
    displayMessage(`Your guess is not between ${lowNumber} and ${highNumber}`);
    guessDOM.style.backgroundColor = 'red'; // Change the b
}

const resetInputBackground = () => {
    guessDOM.style.backgroundColor = ''; // Reset of background back to default which is the blackish color; Need to do this because if player guesses number not between lowNumber and highNumber the input box background color turns red and this function basically resets it back to its default.
}


// Function to display message to player whether you won, lost, or your guess is too high or too low.
const displayMessage = (message) => {
    document.querySelector('.message').textContent = message;
}

// Function which runs everytime there is a guess
const guessFunction = () => {
    const guess = Number(document.querySelector('.guess').value); // Convert to number because by default all inputs by user in <input> tags are strings.

    if(!guess) {
        
        displayMessage('⛔️ No Number!');
    
        // Player Wins game
    } else if (guess === secretNumber) {
        displayMessage('🎉 Correct Number!');
        score += 1; // Add one to score upon guessing correct number
        scoreDOM.textContent = score; // Update the DOM where score is displayed to display the current score
        numberDOM.textContent = secretNumber; // Update DOM to display secret number upon player guessing the number correctly.
        numberDOM.style.width = '30rem'; 
        bodyDOM.style.backgroundColor = '#60b347'; // Must put color inside quotes; Style properties follow camelCase just like in Javascript and they always need to be put inside a string.
        checkHighScore(score); // Checks for high score
        gameOver = true; // Turns gameOver to true since player guessed the number

    } else if (guess < lowNumber || guess > highNumber) {
        guessCheck();

        // Guess is Wrong
    } else if (guess !== secretNumber){
        if(score > 1) { // Score must be greater than 1 so if you lose then it will decrease score and say your guess was too high or too low. But if it were at 1 then if your guess is wrong we want it to say 'You lost!' as opposed to saying your guess is too high or too low.
        score -= 1; // Subtract one from score upon guessing incorrectly
        scoreDOM.textContent = score; // Update the DOM where score is displayed to display the current score
        displayMessage (guess > secretNumber ? '📈 Too High!' : '📉 Too Low!'); // Determines whether guess was too high or too low and displays this to player in the DOM
        } else if (score === 0) {
            displayMessage(lostMessage); // If score goes down to 0 it displays this message to the player
        }
    }
}


//-------------------------------EVENT LISTENERS----------------------------------------------
// Check Guess (CLICK) - Event listener for when you click on Check button to see if your guess is correct.
document.querySelector('.check').addEventListener('click', () => {
    resetInputBackground(); // Resets input background to default black background in case somebody turned the input to a red background by guessing numbers outside the lowNumber and highNumber.
    gameOver === false ? guessFunction() : ''; // This makes sure that if game is already over then the scores, etc don't keep updating. NOTHING WORKS IF GAMEOVER IS === TRUE. If game is NOT OVER then it runs guessFunction which runs all the guess game logic.
});

// Check Guess (ENTER) - Event listener for when you hit ENTER button to see if your guess is correct.
document.querySelector('.guess').addEventListener('keypress', (e) => {
    resetInputBackground(); // Resets input background to default black background in case somebody turned the input to a red background by guessing numbers outside the lowNumber and highNumber.
    if(gameOver === false) {
        if(e.key === 'Enter') {
            guessFunction(); // If game is NOT OVER and player hits Enter button then run guessFunction which runs through all guess game logic.
        }
    }  
});

// Reset Game Play - Event listener for when player clicks on Again button which resets game to play again
document.querySelector('.again').addEventListener('click', () => {
    gameOver = false;
    displayMessage('Start guessing...'); // Reset message back to Start Guessing....
    score = 20; // Reset score variable back to 20
    scoreDOM.textContent = score; // Reset score in DOM back to 20
    bodyDOM.style.backgroundColor = '#222'; // Change background color to green upon winning game
    numberDOM.style.width = '15rem'; // Change width of secret number back to original 15rem
    numberDOM.textContent = '?'; // Change secret number back to ? when resetting game
    guessDOM.value = ''; // Change input box back to blank upon resetting game; Must use .value instead of .textContent for anywhere in DOM where there is an <input> tag.
    randomNumber(); // Invoke function to change secret number variable to new random secret number for new game play
})




