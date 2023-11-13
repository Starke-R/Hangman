fetch("https://random-word-api.herokuapp.com/word?lang=en")
   .then(response => response.json())
   .then((json) => {

    let word = json[0];
    let wordNum = "";
    let mainDiv = document.createElement("div");
    for (let i = 0; i < word.length; i++) {
        wordNum = wordNum + "_ ";
    }
    
    mainDiv.innerHTML = wordNum;

    document.getElementById("mainContainer").append(mainDiv);
   }

   )