const colors = ['red', 'blue', 'green', 'yellow'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'כ', 'צ', 'פ', 'A'];

const gameBoard = document.getElementById('game-board');
const drawCardButton = document.getElementById('draw-card');
const playersHandsElement = document.getElementById('players-hands');
const startGameButton = document.getElementById('start-game');
const SPECIAL_CARDS = {
    STOP: 'stop',
    PLUS: 'plus',
    CHANGE_COLOR: 'change-color',
    TAKI: 'taki',
    SUPER_TAKI: 'super-taki',
    SWITCH_DIRECTION: 'switch-direction',
    KING: 'king',
    PLUS3: 'plus3',
    BROKEN_PLUS3: 'broken-plus3'
};

const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8', 'Player 9', 'Player 10'];
let playersHands = {};
let currentPlayerIndex = 0;
let direction = 1; // 1 for clockwise, -1 for counterclockwise

function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.style.backgroundColor = card.color;
    cardElement.textContent = card.number;
    return cardElement;
}

function initializeDeck() {
    const deck = [];
    colors.forEach(color => {
        numbers.forEach(number => {
            deck.push({ color, number });
        });
    });
    shuffleDeck(deck);
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function startGame() {
    const deck = initializeDeck();

    players.forEach(player => {
        playersHands[player] = [];
        for (let i = 0; i < 8; i++) {
            const drawnCard = deck.pop();
            playersHands[player].push(drawnCard);
        }
    });

    const leadingCard = deck.pop();
    const cardElement = createCardElement(leadingCard);
    gameBoard.appendChild(cardElement);

    currentPlayerIndex = 0;
    updatePlayersHands();
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + direction + players.length) % players.length;
}

function isValidMove(card) {
    const leadingCard = gameBoard.lastElementChild;
    return card.color === leadingCard.style.backgroundColor || card.number === leadingCard.textContent || isSpecialCard(card);
}

function isSpecialCard(card) {
    return Object.values(SPECIAL_CARDS).includes(card.number);
}

function applySpecialCardEffect(player, card) {
    // Add special card effects here
}

function playerMove(player, cardIndex) {
    const playerHand = playersHands[player];
    const playedCard = playerHand[cardIndex];

    if (isValidMove(playedCard)) {
        playerHand.splice(cardIndex, 1);

        if (isSpecialCard(playedCard)) {
            applySpecialCardEffect(player, playedCard);
        }

        const cardElement = createCardElement(playedCard);
        gameBoard.appendChild(cardElement);
        nextPlayer();
        updatePlayersHands();
    }
}

function updatePlayersHands() {
    playersHandsElement.innerHTML = '';

    players.forEach(player => {
        const playerHand = playersHands[player];
        const handContainer = document.createElement('div');
        handContainer.classList.add('player-hand');

        playerHand.forEach((card, index) => {
            const cardElement = createCardElement(card);
            cardElement.addEventListener('click', () => playerMove(player, index));
            handContainer.appendChild(cardElement);
        });

        playersHandsElement.appendChild(handContainer);
    });
}

function updateTopCard() {
    const leadingCard = gameBoard.lastElementChild;
    leadingCard.style.backgroundColor = leadingCard.card.color;
    leadingCard.textContent = leadingCard.card.number;
}

function updateCurrentPlayer() {
    const currentPlayer = players[currentPlayerIndex];
    // Update the UI to indicate the current player
}

drawCardButton.addEventListener('click', drawCard);
startGameButton.addEventListener('click', startGame);
