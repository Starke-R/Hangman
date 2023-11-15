fetch("https://random-word-api.herokuapp.com/word?lang=en")
    .then(response => response.json())
    .then((json) => {

        let word = json[0];
        let wordNum = "";

        for (let i = 0; i < word.length; i++) {

            let letterDiv = document.createElement("div");
            let wordLetter = word[i];

            letterDiv.innerHTML = "<h1>" + wordLetter + "</h1>";
            letterDiv.classList.add("checker");

            document.getElementById("containerLetters").append(letterDiv);

        }

        let underscoreDiv = document.createElement("div");

        for (let i = 0; i < word.length; i++) {
            wordNum = wordNum + "_ ";
        }
        underscoreDiv.innerText = wordNum;
        document.getElementById("containerUnderscores").append(underscoreDiv);



        let input = document.getElementById("guessLetter");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                let guess = document.getElementById("guessLetter").value;

                if (guess.length > 1) {
                    alert("No more than one letter at a time!");
                }

                else {

                    for (let i = 0; i < word.length; i++) {
                        if (guess == word[i]) {
                            let check = document.getElementsByClassName("checker")
                            if (check[i].innerHTML.indexOf(word[i]) !== -1) {
                                check[i].innerHTML = "<h2>" + word[i] + "</h2>"

                                document.getElementById("guessLetter").value = "";
                                
                                console.log("heh");
                                
                            }
                        }

                    }

                }

            }
        });


    }
    )




