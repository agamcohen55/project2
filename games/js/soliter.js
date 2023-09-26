// script.js
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.faceUp = false;
    }

    flip() {
        this.faceUp = !this.faceUp;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        const suits = ['♠', '♣', '♥', '♦'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        for (const suit of suits) {
            for (const value of values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    shuffle() {
        // כאן נכניס את הקלפים למחסנית ונערבב אותם
    }
}

const deck = new Deck();
deck.shuffle();
console.log(deck.cards);
   


// הוסיפו את קוד המחלקות הקיימות כאן

class Solitaire {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();

        this.piles = Array.from({ length: 7 }, () => []);
        this.foundation = Array.from({ length: 4 }, () => []);

        // הפצלת הקלפים למחסניות המתאימות
        for (let i = 0; i < this.piles.length; i++) {
            for (let j = 0; j <= i; j++) {
                const card = this.deck.cards.pop();
                if (j === i) {
                    card.flip(); // הפוך את הקלף העליון במגדרת הראשונה
                }
                this.piles[j].push(card);
            }
        }
    }
}

const solitaire = new Solitaire();
console.log(solitaire.piles); // מחסניות הקלפים
  class Solitaire {
    // קוד קודם...

    // פונקציה להנחת קלף על קלף במחסנית
    placeCardOnPile(cardIndex, fromPileIndex, toPileIndex) {
        const fromPile = this.piles[fromPileIndex];
        const toPile = this.piles[toPileIndex];

        const cardToPlace = fromPile[cardIndex];
        const topCardOfToPile = toPile[toPile.length - 1];

        // נבדוק שהקלף ניתן להנחת קלף מעליו ושהמחסנית לא ריקה
        if (topCardOfToPile && this.canPlaceCardOnTop(cardToPlace, topCardOfToPile)) {
            toPile.push(cardToPlace);
            fromPile.splice(cardIndex, 1);
        }
    }

    // פונקציה לבדיקה האם ניתן להניח קלף מעל קלף אחר
    canPlaceCardOnTop(cardToPlace, targetCard) {
        return cardToPlace.suit === targetCard.suit && this.getValueIndex(cardToPlace.value) === this.getValueIndex(targetCard.value) + 1;
    }

    // פונקציה למציאת האינדקס של הערך במערך הערכים
    getValueIndex(value) {
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        return values.indexOf(value);
    }
}

// קוד נוסף...

const solitaire1 = new Solitaire();
console.log(solitaire.piles);

// מנסה להניח קלף על קלף אחר במחסנית
solitaire.placeCardOnPile(1, 0, 1);
console.log(solitaire.piles);
   class Solitaire {
    // קוד קודם...

    // פונקציה לגרירה ושחרור של קלף
    dragAndDropCard(fromPileIndex, cardIndex, toPileIndex) {
        const fromPile = this.piles[fromPileIndex];
        const toPile = this.piles[toPileIndex];
        const cardToMove = fromPile[cardIndex];

        // הורדת הקלף מהמקום הקודם
        fromPile.splice(cardIndex, 1);

        // הנחת הקלף במקום החדש
        toPile.push(cardToMove);
    }

    // פונקציה לסיבוב הקלף
    rotateCard(pileIndex, cardIndex) {
        const pile = this.piles[pileIndex];
        const card = pile[cardIndex];

        // סיבוב הקלף על פי ה- CSS
        card.rotate();
    }

    // פונקציה להנחת קלף על מקום חוקי בלוח
    placeCard(cardIndex, fromPileIndex, toPileIndex) {
        const fromPile = this.piles[fromPileIndex];
        const toPile = this.piles[toPileIndex];
        const cardToPlace = fromPile[cardIndex];
        const topCardOfToPile = toPile[toPile.length - 1];

        if (topCardOfToPile && this.canPlaceCardOnTop(cardToPlace, topCardOfToPile)) {
            toPile.push(cardToPlace);
            fromPile.splice(cardIndex, 1);
        }
    }

    // פונקציה לבדיקת סיום המשחק
    checkGameOver() {
        // כאן אתה יכול לכתוב את הקוד לבדיקה האם כל הקלפים מסודרים נכונה
    }
}

// קוד נוסף...
