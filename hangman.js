let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let wrongGuesses = 0;
let counted = 0;

// Fetching API that generates a random word in English
fetch("https://random-word-api.herokuapp.com/word?lang=en")
    .then(response => response.json())
    .then((json) => {

        let word = json[0];
        let wordNum = "";


        // The word is separated into its individual letters
        for (let i = 0; i < word.length; i++) {

            let letterDiv = document.createElement("div");
            let wordLetter = word[i];

            letterDiv.innerHTML = "<h1>" + wordLetter + "</h1>";
            letterDiv.classList.add("checker");

            document.getElementById("containerLetters").append(letterDiv);

        }

        let underscoreDiv = document.createElement("div");

        for (let i = 0; i < word.length; i++) {
            wordNum = wordNum + "_";
        }
        underscoreDiv.innerText = wordNum;
        document.getElementById("containerUnderscores").append(underscoreDiv);


        // Gets the value from the input field when "enter" is pressed
        let input = document.getElementById("guessLetter");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                let guess = document.getElementById("guessLetter").value;

                // If more than one letter is entered an alert is activated
                if (guess.length > 1) {
                    alert("No more than one letter at a time!");
                }

                // Checks if the guessed letter is correct, in which case the letter is displayed
                else {
                    for (let i = 0; i < word.length; i++) {
                        if (guess == word[i]) {
                            let check = document.getElementsByClassName("checker")
                            if (check[i].innerHTML.indexOf(word[i]) !== -1) {
                                check[i].innerHTML = "<h2>" + word[i] + "</h2>"
                                document.getElementById("guessLetter").value = "";
                            }
                        }
                        else {
                            wrongGuesses++;
                            let count = 0;
                            for (let i = 0; i < word.length; i++) {
                                count++;
                                counted = count - wrongGuesses;
                                if (counted == 1) {
                                    // Horizontal ground
                                    ctx.strokeStyle = "white";
                                    ctx.beginPath();
                                    ctx.moveTo(500, 500);
                                    ctx.lineTo(0, 500);
                                    ctx.lineWidth = 25;
                                    ctx.stroke();
                                }
                                if (counted == 2) {
                                    // Horizontal ground
                                    // Vertical bar
                                    ctx.beginPath();
                                    ctx.moveTo(350, 490);
                                    ctx.lineTo(350, 50);
                                    ctx.lineWidth = 15;
                                    ctx.stroke();
                                }
                            }
                        }
                    }
                }
            }
        });


    }
    )


/*
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

// Body
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