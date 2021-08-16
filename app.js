const gameContainer = document.getElementById("memory-game");

let hasCardFlipped = false;
let clickDelay = false;
let firstCard;
let secondCard;

//set current game score to zero
let currentScore = Number(0);
const currentScoreContainer = document.querySelector('.current-score-value');
currentScoreContainer.innerText = currentScore;

//get the best score from local storage or set to zero
let bestScore = JSON.parse(localStorage.getItem('bestScore')) || '--';

const bestScoreContainer = document.querySelector('.best-score-value');
bestScoreContainer.innerText = bestScore;

//note to self: fix card deck to be 1 item then clone array and add to existing
//      instead of copying twice like done below
//      add a larger array of objects and let the user pick a range of cards
//      then cut down a shuffled array to match the number of cards before
//      passing it into the following functions
const cardDeck = [
    {
        name: 'keyboard',
        src : 'keyboard.png',
        alt : 'keyboard icon'
    },
    {
        name: 'computer',
        src : 'computer.png',
        alt : 'computer icon'
    },
    {
        name: 'mouse',
        src : 'mouse.png',
        alt : 'mouse icon'
    },
    {
        name: 'floppy',
        src : 'floppy.png',
        alt : 'floppy icon'
    },
    {
        name: 'hourglass',
        src : 'hourglass.png',
        alt : 'hourglass icon'
    },
    {
        name: 'document',
        src : 'document.png',
        alt : 'document icon'
    },
    {
        name: 'keyboard',
        src : 'keyboard.png',
        alt : 'keyboard icon'
    },
    {
        name: 'computer',
        src : 'computer.png',
        alt : 'computer icon'
    },
    {
        name: 'mouse',
        src : 'mouse.png',
        alt : 'mouse icon'
    },
    {
        name: 'floppy',
        src : 'floppy.png',
        alt : 'floppy icon'
    },
    {
        name: 'document',
        src : 'document.png',
        alt : 'document icon'
    },
    {
        name: 'hourglass',
        src : 'hourglass.png',
        alt : 'hourglass icon'
    }
  ];

let pairCounter = cardDeck.length/2;

function shuffleDeck(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

let shuffledDeck = shuffleDeck(cardDeck);

function createDivsForCards(cardArray) {
    for (let obj of cardArray) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('memory-card');
        newDiv.dataset.icon = obj.name;
  
        const newFrontFace = document.createElement('img');
        newFrontFace.classList.add('front-face');
        newFrontFace.src = obj.src;
        newFrontFace.alt = obj.alt;
    
        const newBackFace = document.createElement('img');
        newBackFace.classList.add('back-face');
        newBackFace.src = 'vintage-windows.png';
        newBackFace.alt = 'vintage-windows icon';
     
        newDiv.addEventListener('click', handleCardClick);
  
        newDiv.append(newFrontFace);
        newDiv.append(newBackFace);
        gameContainer.append(newDiv);
    }
  }

function handleCardClick(event) {
    if(clickDelay) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    currentScore++;
    currentScoreContainer.innerText = currentScore;

    if(!hasCardFlipped){
        //first card clicked
        hasCardFlipped = true;
        firstCard = this;
        return;
    } 
    
    //second card clicked
    secondCard = this;
    matchCheck();
    
}

function matchCheck(){
    let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
    isMatch ? cardsMatched() : cardsNotMatched();    
}

function cardsMatched(){
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);

    pairCounter--;

    if(pairCounter===0){
        //game won!
        alert(`You won the game! Score: ${currentScore}`);

        //check to see if current score is best score
        if(bestScore === '--' || currentScore < bestScore){
            bestScore = currentScore;        
            localStorage.setItem('bestScore',JSON.stringify(currentScore));
            alert(`Your new best score is ${currentScore}!`);
            bestScoreContainer.innerText = currentScore;
          }
    }
    resetBoard();
}

function cardsNotMatched(){
    clickDelay = true;
    setTimeout(function(){
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

//reset board after each match
function resetBoard(){
    hasCardFlipped = false;
    clickDelay = false;
    firstCard = null;
    secondCard = null;
}

//reset game
const resetBtn = document.querySelector('#reset-button');
resetBtn.addEventListener('click',function(event){
  window.location.reload();
})

createDivsForCards(cardDeck);
