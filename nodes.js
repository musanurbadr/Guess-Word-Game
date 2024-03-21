//Setting check Game
let gameName = "Guess The worlde";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created by cors`;

//settting Game opcem
let numberOfTries = 6;
let numberOfLetters = 6;
let currenrTry = 1;
let numberOfHints = 2; 

//Words magne 
let wordToGuess = "";
const Words = ["Create", "Updete", "Delte" , "Master" , "boolss","noopss" , "school"];
wordToGuess = Words[Math.floor(Math.random() * Words.length )].toLowerCase();
let messageArea = document.querySelector(".message");

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints ;

const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click" , getHint );
function genrateInput (){
    const inputsContainer = document.querySelector(".inputs");
    
    for(let i= 1; i <= numberOfTries ; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}<span>`;

        if (i !== 1 )tryDiv.classList.add("disabled-inputs");

        //create input
        for (let j = 1; j <= numberOfLetters; j++){
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength","1");
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

    //Disyble All Inpurt Except First One 
    const inputsInDisdiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisdiv.forEach((input)=> (input.disabled = true));

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input , index)=> {
        input.addEventListener ('input' , function(){
            this.value = this.value.toUpperCase();
            // console.log(index)
            const nextInupt = inputs[index + 1];
            if (nextInupt) nextInupt.focus()
        });
        input.addEventListener ('keydown' , function(event){
            const currentIndex = Array.from(inputs).indexOf(event.target);
            // console.log(currentIndex);
            if(event.key === "ArrowRight"){
                const nextInupt = currentIndex + 1;
                if (nextInupt < inputs.length) inputs[nextInupt].focus();
            }
            if(event.key === "ArrowLeft"){
                const prevInput = currentIndex - 1;
                if (prevInput >= 0 ) inputs[prevInput].focus();
            }
        });
    });
}
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click" , handleGusese);
console.log(wordToGuess);

function handleGusese(){
    let successGuess = true;
    console.log(wordToGuess);
    for(let i = 1 ; i <= numberOfLetters ; i++){
        const inputdild = document.querySelector(`#guess-${currenrTry}-letter-${i}`);
        const letter = inputdild.value.toLowerCase();
        const actualLeter = wordToGuess [i - 1 ];

        //Game Logic 
        if (letter === actualLeter){
            //letter is Correct and In place
            inputdild.classList.add("yes-in-place");
        } else if (wordToGuess.includes(letter)&& letter !== "") {
            //Letter Is Correct And NOt in place
            inputdild.classList.add("not-is-place");
            successGuess = false; 
        }else{
            inputdild.classList.add("no");
            successGuess = false;
        }
    }
    //check of los win or laset
    if(successGuess){
        messageArea.innerHTML = `You win After <span>${wordToGuess}</span>`;

        // Disable All Input 
        let allris = document.querySelectorAll(".inputs > div");
        allris.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

        //Disball gus Button 
        guessButton.disabled = true; 

    }else{
        document.querySelector(`.try-${currenrTry}`).classList.add("disabled-inputs");
        const currenrTryInput = document.querySelectorAll(`.try-${currenrTry} input`);
        currenrTryInput.forEach((input) => (input.disabled = true));
        
        currenrTry++ ; 

        const textTryInput = document.querySelectorAll(`.try-${currenrTry} input`);
        textTryInput.forEach((input) => (input.disabled = false));

        let el = document.querySelector(`.try-${currenrTry}`);
        if (el){
            document.querySelector(`.try-${currenrTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        }else{
            guessButton.disabled = true; 
            messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`
        }
        
    }
}

function getHint() {
    if (numberOfHints > 0 ){
        numberOfHints--;
        document.querySelector(".hint sapn").innerHTML = numberOfHints;
    }
    if(numberOfHints === 0 ){
        getHintButton.disabled = true ;
    }
    
    //Geat 
    const enabldl = document.querySelectorAll("input:not([disabled])");
    console.log(enabldl);
}
window.onload = function(){
    genrateInput();
};
