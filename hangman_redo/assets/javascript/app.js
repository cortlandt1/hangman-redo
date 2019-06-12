//variable to hold wins, losses, remainingGuesses, 
//array to hold guessedLetters, array to hold hiddenCharacters, array to hold possible word choices by computer
// function to handle win, loss, reset, function if letter guessed is correct, function for if the letter guessed is incorrect
// function to generate the chosen word, function to loop through word and create '-' in an array
//
var wins = 0
var losses = 0
var remainingGuesses = 10
var wordArray = ['ArnoldSchwarzenegger', 'LouFerigno', 'LeeHaney', 'DorianYates', 'LeeLabrada', 'JayCutler', 'KaiGreene', 'FrancisBenfatto', 'SergeNubret'];
var compGuess = wordGenerator(wordArray).toLowerCase()
var hiddenCharacters = []
var answerArray = []
var guessedLetters = []
var remainingLetters = compGuess.length
var regex=/^[a-zA-Z]+$/;

//Inital game start function on page load
window.onload = function () {
    document.querySelector('#wins').innerHTML = '' + wins
    document.querySelector('#losses').innerHTML = '' + losses
    document.querySelector('#remGuess').innerHTML = '' + remainingGuesses
    document.querySelector('#characters').innerHTML = guessedLetters.toString()
    document.querySelector('#gameDisplay').innerHTML = hiddenCharacters.toString()
    characterMask()
}

//Chooses random word from wordArray
function wordGenerator (wordArray) {
    return wordArray[Math.floor(Math.random() * wordArray.length)]
}

function characterMask () {
    for (let i = 0; i < compGuess.length; i++) {
        hiddenCharacters[i] = '_'
        document.querySelector('#gameDisplay').innerHTML = hiddenCharacters.join(' ')
    }
}


console.log(hiddenCharacters)
console.log(compGuess)


function messageDisplay (message) {
    var selector = document.querySelector('#message')
    let display = true
    if (display = true) {
        selector.innerHTML = message
    } 

    setTimeout(function() {
        display = false
        selector.innerHTML = '' 
        },3000)
    
}

//function to check if the letter is already guessed
function alreadyGuessed (playerGuess) {
    for (let e = 0; e < guessedLetters.length; e++) {
        if (guessedLetters[e] === playerGuess) {
            messageDisplay('Oops, you already gussed that letter')
            remainingLetters++
        }
    }
}

document.onkeyup = function (event) {
     let playerGuess = event.key
     if (playerGuess.length > 1) {
         messageDisplay('Please enter a letter')
        } else (playerGuess = playerGuess.toLowerCase() )
    
        alreadyGuessed(playerGuess)
        if(playerGuess.length <= 1) {
            guessedLetters.push(event.key)
        }

    document.querySelector('#characters').innerHTML = guessedLetters.toString()
    letterCheck(playerGuess)
}


//function to determine if the guessed letter is found within the hidden word
function letterCheck (playerGuess) {
    for (let j = 0; j < compGuess.length; j++) {
        if (compGuess[j] === playerGuess) {
            hiddenCharacters[j] = playerGuess
            remainingLetters--
            console.log(remainingLetters)
            console.log('Success')
            letterIsCorrect()
        } else {
            letterIsWrong() 
        }
    }
}


//function to determine the game action if letter guessed is correct
function letterIsCorrect (playerGuess) {
    if (remainingLetters <= 1) {
        //display win message and reset game
        win() 
    } else {
        document.querySelector('#gameDisplay').innerHTML = hiddenCharacters.join(' ')
        
    }
}

//function to determine the game action if letter guessed is incorrect
function letterIsWrong () {
    remainingGuesses--
    document.querySelector('#remGuess').innerHTML = '' + remainingGuesses
}

//function to define game action of player wins

function win (playerGuess) {
    wins++
    messageDisplay('Congradulations, you won!')
    setTimeout(function() {
        reset()
        },3000)
}

//function to define game action of player loses
function lose (playerGuess) {
    losses++
}

//function to reset game to be played again, all variables and arrays cleared or set to original amounts. 
function reset () {
    guessedLetters = []
    remainingGuesses = 10
    compGuess = wordGenerator(wordArray).toLowerCase()
    remainingLetters = compGuess.length
    console.log(compGuess)
    console.log(remainingLetters)
    hiddenCharacters = []
    characterMask()
    document.querySelector('#wins').innerHTML = '' + wins
    document.querySelector('#losses').innerHTML = '' + losses
    document.querySelector('#remGuess').innerHTML = '' + remainingGuesses
    document.querySelector('#characters').innerHTML = guessedLetters.toString()
}
