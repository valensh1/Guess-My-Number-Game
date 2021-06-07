'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number!';

// document.querySelector('.number').textContent = 13; // Use .textContent to get any text inside a <p> tag and any <h> tags
// document.querySelector('.score').textContent = 20;

// document.querySelector('.guess').value = 23; // Use .value to get the value inside any input fields in HTML
// console.log(document.querySelector('.guess').value);

const secretNumber = Math.floor((Math.random() * 20) + 1); // Random number between 1 and 20; Math.random will produce a number between 0 and .99. Then you need to multiply it by 20 to get as high as 20 but the highest number it will produce is 19.99. Math.floor will round 19.99 down to 19 so that's why you also need the +1 at end to get to 20. You also need +1 at end so that if number comes out below 1 and then rounds down to 0 the +1 always gives you at least 1.
document.querySelector('.number').textContent = secretNumber;
let score = 20; // Initial score of game

// DOM NODE VARIABLES
let scoreDOM = document.querySelector('.score'); // Place in DOM where score is located.
let messageDOM = document.querySelector('.message'); // Place in DOM that gives message such as score too low, too high, or you win or you lose!


document.querySelector('.check').addEventListener('click', () => {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if(!guess) {
        document.querySelector('.message').textContent = '⛔️ No Number!';
    } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = '🎉 Correct Number!';
        score += 1;
        scoreDOM.textContent = score;
        document.querySelector('body').style.backgroundColor = '#60b347'; // Must put color inside quotes; Style properties follow camelCase just like in Javascript and they always need to be put inside a string.
        document.querySelector('.number').style.width = '30rem';
    } else if (guess > secretNumber) {
        if (score > 1) {
        document.querySelector('.message').textContent = '📈 Too High!';
        score -= 1;
        scoreDOM.textContent = score;
        } else {
            messageDOM.textContent = '💥 You lost the game!'
        }
    } else if (guess < secretNumber) {
        if (score > 1) {
        document.querySelector('.message').textContent = '📉 Too Low!';
        score -= 1;
        scoreDOM.textContent = score;
        } else {
            messageDOM.textContent = '💥 You lost the game!'
        }
    }
});


