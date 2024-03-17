const maxScore = document.querySelector("#playingTo");
const playerOne = document.querySelector("#playerOne");
const playerTwo = document.querySelector("#playerTwo");
const reset = document.querySelector("#reset");
const playerOneScore = document.querySelector("#playerOneScore");
const playerTwoScore = document.querySelector("#playerTwoScore");
playerOne.addEventListener("click",()=>{ 
    playerOneScore.innerText = `${parseInt(playerOneScore.innerText) +1}`; 
    if (playerOneScore.innerText == maxScore.value){
        playerOne.disabled = true;
        playerTwo.disabled = true;
        playerOneScore.style.color = "green";
        playerTwoScore.style.color = "red";
    }
})
playerTwo.addEventListener("click",()=>{
    playerTwoScore.innerText = `${parseInt(playerTwoScore.innerText) +1}`; 
    if (playerTwoScore.innerText == maxScore.value){
        playerOne.disabled = true;
        playerTwo.disabled = true;
        playerTwoScore.style.color = "green";
        playerOneScore.style.color = "red";
    }
})
reset.addEventListener("click",()=>{
    playerOneScore.innerText = "0";
    playerTwoScore.innerText = "0";
    playerOneScore.style.color = "black";
    playerTwoScore.style.color = "black";
    playerOne.disabled = false;
    playerTwo.disabled = false;
})