fetch("https://random-word-api.herokuapp.com/word?lang=en")
    .then(response => response.json())
    .then((json) => {

        let word = json[0];
        let wordNum = "";
        let wordLetter = "";

        let letterDiv = document.createElement("div");
        
        for (let i = 0; i < word.length; i++) {
            wordLetter = word;
        }
        letterDiv.innerText = wordLetter;
        letterDiv.classList.add("randomWords");

        document.getElementById("mainContainer").append(letterDiv);




        let underscoreDiv = document.createElement("div");

        for (let i = 0; i < word.length; i++) {
            wordNum = wordNum + "_ ";
        }

        
        underscoreDiv.innerText = wordNum;
        underscoreDiv.classList.add("randomWords");

        document.getElementById("mainContainer").append(underscoreDiv);






        let input = document.getElementById("guessLetter");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                let guess = document.getElementById("guessLetter").value;

                if (guess.length > 1 ){
                    alert("No more than one letter at a time!");
                }

                else {
                
                for (let i = 0; i < word.length; i++) {
                   if (guess == word[i]){
                    console.log(guess)
                   }
                   
                }
        
                }
        
            }
        });


    }
    )




