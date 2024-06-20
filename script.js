// Array of card symbols for the game
const cardSymbols = ['♥', '♦', '♣', '♠', '♚', '♛', '♜', '♝', '☆'];

let flippedCards = [];
let matchedCards = [];

// Shuffle function to randomize the order of card symbols
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Function to initialize the game board
function initializeGame() {
    const grid = document.getElementById('game-grid');
    const shuffledSymbols = shuffle([...cardSymbols, ...cardSymbols]); // Duplicate symbols for pairs

    // Clear the grid
    grid.innerHTML = '';

    // Create card elements and add them to the grid
    shuffledSymbols.forEach((symbol, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.symbol = symbol; // Store the symbol in dataset
        cardElement.innerHTML = `
            <div class="face front">${symbol}</div>
            <div class="face back"></div>`;
        cardElement.addEventListener('click', handleCardClick);
        grid.appendChild(cardElement);
    });
}

// Function to handle card click event
function handleCardClick() {
    // Do nothing if the card is already flipped or matched
    if (this.classList.contains('flipped') || matchedCards.includes(this)) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    // Check if two cards are flipped
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        // Check if the two flipped cards match
        if (card1.dataset.symbol === card2.dataset.symbol) {
            matchedCards.push(card1, card2);
            flippedCards = [];

            // Check if all cards are matched
            if (matchedCards.length === cardSymbols.length * 2) {
                setTimeout(() => {
                    alert('Congratulations! You have won the game!');
                }, 500);
            }
        } else {
            // If cards don't match, flip them back after a delay
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

// Function to reset the game
function resetGame() {
    flippedCards = [];
    matchedCards = [];
    initializeGame();
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initializeGame);
