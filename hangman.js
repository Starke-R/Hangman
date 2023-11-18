let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let wrongGuesses = 0;
let rightGuesses = 0;
let numOfGuesses = 8;

let wins
let losses


// Fetching API that generates a random word in English
fetch("https://random-word-api.herokuapp.com/word?lang=en")
    .then(response => response.json())
    .then((json) => {

        let word = json[0];



        // The word is separated into its individual letters
        for (let i = 0; i < word.length; i++) {

            let letterDiv = document.createElement("div");
            let wordLetter = word[i];

            letterDiv.innerHTML =  wordLetter;
            letterDiv.classList.add("checker");
            letterDiv.classList.add("hiddenLetter");

            document.getElementById("containerLetters")
            document.getElementById("containerLetters").append(letterDiv);

        }

        for (let i = 0; i < word.length; i++) {

            let underscoreDiv = document.createElement("div");

            underscoreDiv.innerHTML = "_";
            underscoreDiv.classList.add("showingLetter");

            document.getElementById("containerUnderscores").append(underscoreDiv);
            document.getElementById("containerUnderscores")
        }



        let winsDisplayed = document.getElementById("winScore")
        winsDisplayed.innerText = "Wins: " + wins;
        document.getElementById("scoreContainer").append(winsDisplayed);

        let lossesDisplayed = document.getElementById("loseScore")
        lossesDisplayed.innerText = "Losses: " + losses;
        document.getElementById("scoreContainer").append(lossesDisplayed);

        let guessesDisplayed = document.getElementById("displayGuesses")
        guessesDisplayed.innerText = "Wrong guesses remaining: " + numOfGuesses;
        document.getElementById("scoreContainer").append(guessesDisplayed);


        // Gets the value from the input field when "enter" is pressed
        let input = document.getElementById("guessLetter");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                let guess = document.getElementById("guessLetter").value;

                // If more than one letter is entered an alert is activated
                if (guess.length > 1) {
                    alert("No more than one letter at a time!");
                }

                // Checks if the guessed letter is correct, in which case the letter is goes from hidden to being displayed
                else {
                    for (let i = 0; i < word.length; i++) {
                        if (guess == word[i]) {
                            let check = document.getElementsByClassName("checker")
                            if (check[i].innerHTML.indexOf(word[i]) !== -1) {
                                check[i].classList.add("showingLetter");
                                check[i].classList.remove("hiddenLetter");
                                document.getElementById("guessLetter").value = "";
                                rightGuesses++;

                                if (rightGuesses == word.length) {
                                    wins++;
                                    let winsDisplayed = document.getElementById("winScore")
                                    winsDisplayed.innerText = "Wins: " + wins;
                                    document.getElementById("scoreContainer").append(winsDisplayed);
                                    localStorage.setItem("wins", wins);
                                }
                            }
                        }

                        // Checks if the guessed letter is incorrect, if so then call function to draw the hangman
                        for (let i = 0; i < word.length; i++) {
                            if (!word.includes(guess)) {
                                wrongGuesses++;
                                drawFunction(wrongGuesses, word)
                                document.getElementById("guessLetter").value = "";
                                return
                            }
                        }
                    }
                }
            }
        });

    }
    )

// Function that draws the hangman
function drawFunction(wrongGuesses, word) {

    if (wrongGuesses == 1) {
        // Horizontal ground
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(500, 500);
        ctx.lineTo(0, 500);
        ctx.lineWidth = 25;
        ctx.stroke();
        numOfGuesses--;
    }

    if (wrongGuesses == 2) {
        // Vertical bar
        ctx.beginPath();
        ctx.moveTo(350, 490);
        ctx.lineTo(350, 50);
        ctx.lineWidth = 15;
        ctx.stroke();
        numOfGuesses--;
    }

    if (wrongGuesses == 3) {
        // Horizontal bar
        ctx.beginPath();
        ctx.moveTo(357, 57);
        ctx.lineTo(150, 57);
        ctx.lineWidth = 15;
        ctx.stroke();
        numOfGuesses--;
    }

    if (wrongGuesses == 4) {
        // Diagonal bar
        ctx.beginPath();
        ctx.moveTo(350, 130);
        ctx.lineTo(250, 57);
        ctx.lineWidth = 15;
        ctx.stroke();
        numOfGuesses--;
    }

    if (wrongGuesses == 5) {
        // Rope
        ctx.beginPath();
        ctx.moveTo(155, 170);
        ctx.lineTo(155, 62);
        ctx.lineWidth = 10;
        ctx.stroke();
        numOfGuesses--;
    }

    if (wrongGuesses == 6) {
        // Head
        ctx.beginPath();
        ctx.arc(155, 200, 35, 2 * Math.PI, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(155, 200, 30, 2 * Math.PI, false);
        ctx.fillStyle = "black";
        ctx.fill();
        numOfGuesses--;
    }

    if (wrongGuesses == 7) {
        // Body
        ctx.beginPath();
        ctx.moveTo(155, 350);
        ctx.lineTo(155, 230);
        ctx.lineWidth = 5;
        ctx.stroke();
        numOfGuesses--;
    }

    if (wrongGuesses == 8) {
        // Arms and legs
        ctx.beginPath();
        ctx.moveTo(155, 350);
        ctx.lineTo(155, 230);
        ctx.moveTo(200, 290);
        ctx.lineTo(155, 235);
        ctx.moveTo(200, 390);
        ctx.lineTo(155, 347);
        ctx.moveTo(100, 290);
        ctx.lineTo(155, 235);
        ctx.moveTo(100, 390);
        ctx.lineTo(155, 347);
        ctx.lineWidth = 5;
        ctx.stroke();
        numOfGuesses--;
        alert("You lose!");
        losses++;
        let lossesDisplayed = document.getElementById("loseScore")
        lossesDisplayed.innerText = "Losses: " + losses;
        document.getElementById("scoreContainer").append(lossesDisplayed);
        localStorage.setItem("losses", losses);


        let reveal = document.getElementsByClassName("hiddenLetter");
        for (let i = 0; i < reveal.length; i++) {
        
        reveal[i].classList.add("showingLetter");
        reveal[i].classList.remove("hiddenLetter");
        i--;
        }
    }


    let guessesDisplayed = document.getElementById("displayGuesses")
    guessesDisplayed.innerText = "Wrong guesses remaining: " + numOfGuesses;
    document.getElementById("scoreContainer").append(guessesDisplayed);

}

window.onload = function () {

    wins = localStorage.getItem("wins");
    losses = localStorage.getItem("losses");

    let winsDisplayed = document.getElementById("winScore")
    winsDisplayed.innerText = "Wins: " + wins;
    document.getElementById("scoreContainer").append(winsDisplayed);

    let lossesDisplayed = document.getElementById("loseScore")
    lossesDisplayed.innerText = "Losses: " + losses;
    document.getElementById("scoreContainer").append(lossesDisplayed);

    let guessesDisplayed = document.getElementById("displayGuesses")
    guessesDisplayed.innerText = "Wrong guesses remaining: " + numOfGuesses;
    document.getElementById("scoreContainer").append(guessesDisplayed);
}





/*

 let correctWord = document.createElement("div");
        correctWord.innerHTML = "<h2>" + word + "</h2>";
        document.getElementById("containerAnswer")
        document.getElementById("containerAnswer").append(correctWord);

        
// Horizontal ground
ctx.strokeStyle = "white";
ctx.beginPath();
ctx.moveTo(500, 500);
ctx.lineTo(0, 500);
ctx.lineWidth = 25;
ctx.stroke();


// Vertical bar
ctx.beginPath();
ctx.moveTo(350, 490);
ctx.lineTo(350, 50);
ctx.lineWidth = 15;
ctx.stroke();


// Horizontal bar
ctx.beginPath();
ctx.moveTo(357, 57);
ctx.lineTo(150, 57);
ctx.lineWidth = 15;
ctx.stroke();


// Diagonal bar
ctx.beginPath();
ctx.moveTo(350, 130);
ctx.lineTo(250, 57);
ctx.lineWidth = 15;
ctx.stroke();


// Rope
ctx.beginPath();
ctx.moveTo(155, 170);
ctx.lineTo(155, 62);
ctx.lineWidth = 10;
ctx.stroke();


// Head
ctx.beginPath();
ctx.arc(155, 200, 35, 2 * Math.PI, false);
ctx.fillStyle = "white";
ctx.fill();
ctx.beginPath();
ctx.arc(155, 200, 30, 2 * Math.PI, false);
ctx.fillStyle = "black";
ctx.fill();


// Body
ctx.beginPath();
ctx.moveTo(155, 350);
ctx.lineTo(155, 230);
ctx.lineWidth = 5;
ctx.stroke();

// Arms and legs
ctx.beginPath();
ctx.moveTo(155, 350);
ctx.lineTo(155, 230);
ctx.moveTo(200, 290);
ctx.lineTo(155, 235);
ctx.moveTo(200, 390);
ctx.lineTo(155, 347);
ctx.moveTo(100, 290);
ctx.lineTo(155, 235);
ctx.moveTo(100, 390);
ctx.lineTo(155, 347);

ctx.lineWidth = 5;
ctx.stroke();
*/