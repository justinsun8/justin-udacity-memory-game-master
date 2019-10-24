/*
 * Create a list that holds all of your cards
 */
const iconList = ['fa fa-diamond', 'fa fa-diamond', 
            'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 
            'fa fa-anchor', 'fa fa-anchor', 
            'fa fa-bolt', 'fa fa-bolt', 
            'fa fa-cube', 'fa fa-cube',
            'fa fa-leaf', 'fa fa-leaf', 
            'fa fa-bomb', 'fa fa-bomb',
            'fa fa-bicycle', 'fa fa-bicycle'];


const cardsContainer = document.querySelector(".deck");

let selectedCards = [];
let matchedCards = [];
let clockOff = true;
let time = 0;
let clockID;
//Shuffle the cards
//shuffle(iconList);


/*
* Initialize Game
*/ 
function init() {
    // Creating element modal
    document.createElement("modal__background");
    for (let i = 0; i < iconList.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class = "${iconList[i]}"></i>`;
        cardsContainer.appendChild(card);

        //Add Click event to each card
        click(card);

        }
}

/*
* Click Event
*/
function click(card) {

        // Card Click Event
        card.addEventListener("click", function() {

            const currentCard = this;
            const previousCard = selectedCards[0];
            if (clockOff) {
                startClock();
                clockOff = false;
            }

            // Existing opened card
            if (selectedCards.length === 1) {
    
                card.classList.add('open', 'show', 'disabled');
                selectedCards.push(this);
    
                //Compare opened cards
                compare(currentCard, previousCard);
    
            } else {
            // No opened cards
                card.classList.add('open', 'show', 'disabled');
                selectedCards.push(this);
    
            }
    
        })
        

}

//Compare the two cards
function compare(currentCard, previousCard) {
    //Matcher
    if (currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.classList.add('match');
        previousCard.classList.add('match');

        //Push to matchedcards array
        matchedCards.push(currentCard, previousCard);
        
        //Clear selectedcards array
        selectedCards = [];

        //Check if game is over
        isOver();
        
    } else {

        setTimeout(() => {
            currentCard.classList.remove('open', 'show', 'disabled');
            previousCard.classList.remove('open', 'show', 'disabled');
            
        }, 1000)

        
    }
    selectedCards = [];
    //Add New Move
    addMove();
    
};

//Check if the game is over
function isOver() {
    if (matchedCards.length === iconList.length) {
        toggleModal();
        stopClock();
        time = 0;
    }
    
};

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
* Add Moves
*/
const movesContainer = document.querySelector('.moves');
let moves = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

//Set the rating
    rating();
};



/*
* Rating
*/
const starsContainer = document.querySelector('.stars');
function rating() {
    switch(moves) {
        case 15:
            starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
        break;
        case 25:
            starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>';
        break;

    }
};


/*
* Clock
*/


function startClock() {
    clockID = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}

function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = time / 60;
    const seconds = time % 60;
    const sec = (seconds < 10) ? "0"+seconds : seconds
    console.log(clock);
    clock.innerHTML = Math.floor(minutes) + ':' + sec
};

function stopClock() {
    clearInterval(clockID);
};


/*
* Modal
*/
function toggleModal() {
    const modal = document.querySelector('.modal__background');
    modal.classList.toggle('hide');
    writeModalStats();
    
};

/*
* Display Stats
*/

function writeModalStats() {
    const timeStat = document.querySelector('.modal__time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const moveStat = document.querySelector('.modal__moves');
    const starsStat = document.querySelector('.modal__stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    moveStat.innerHTML = `Moves = ${moves + 1}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    console.log(starCount);
    return starCount;
}



/*
* Restart Button
*/
function restartGame() {
    //Delete All Cards
    cardsContainer.innerHTML = "";

    //Call 'init' to create new cards
    shuffle(iconList);
    init();

    //Reset Any Related variables
    matchedCards = [];
    selectedCards = [];
    moves = 0;
    document.querySelector('.clock').innerHTML = '0:00';
    stopClock();
    time = 0;
    clockOff = true;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'


};


/*
* Restart Button top of Page
*/
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', () => {
    restartGame();
});

/*
* Modal Buttons
*/
document.querySelector('.modal__cancel').addEventListener('click', () => {
    toggleModal();
});
document.querySelector('.modal__close').addEventListener('click', () => {
    toggleModal();
});
document.querySelector('.modal__replay').addEventListener('click', () => {
    restartGame();
    toggleModal();
})




///Start the game!
shuffle(iconList);
init();


