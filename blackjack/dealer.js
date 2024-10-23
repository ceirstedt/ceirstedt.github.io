import Card from "./card.js";

let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
let suits = ["diams", "hearts", "spades", "clubs"];

class Dealer {
  constructor() {
    this.deck = [];
    this.hand = [];
    this.cardCount = 0;
    this.cardsDealt = 0;
  }

  fillDeck() {
    for (let i = 0; i < ranks.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        this.deck.push(new Card(suits[j], ranks[i], values[i]));
        this.deck.push(new Card(suits[j], ranks[i], values[i]));
        this.deck.push(new Card(suits[j], ranks[i], values[i]));
        this.deck.push(new Card(suits[j], ranks[i], values[i]));
        this.cardCount += 4;
      }
    }
  }

  shuffleDeck() {
    for (let i = 0; i < this.cardCount; i++) {
      let r = Math.floor(Math.random() * this.cardCount);
      let tmp = this.deck[i];
      this.deck[i] = this.deck[r];
      this.deck[r] = tmp;
    }
  }

  dealPlayer(hand) {
    hand.push(
      new Card(
        this.deck[this.cardsDealt].suit,
        this.deck[this.cardsDealt].rank,
        this.deck[this.cardsDealt].value,
      ),
    );

    this.cardsDealt += 1;
  }

  showCards(dealerHand) {
    dealerHand.innerHTML = '<h3 class="hand-label">Dealer hand</h3>';
    for (let i = 0; i < this.hand.length; i++) {
      dealerHand.innerHTML +=
        '<div class="card rank-' +
        this.hand[i].rank +
        " " +
        this.hand[i].suit +
        ">" +
        '<span class"rank">' +
        this.hand[i].rank +
        "</span>" +
        '<span class="suit">&' +
        this.hand[i].suit +
        ";</span>" +
        "</div>";
      if (this.hand.length == 1) {
        dealerHand.innerHTML += '<div class="card back">*</div>';
      }
    }
    dealerHand.innerHTML +=
      '<h3 class="hand-label">Total Hand Value: ' +
      this.sumCards(this.hand) +
      "</h3>";
  }

  sumCards() {
    let sum = 0;
    for (let i = 0; i < this.hand.length; i++) {
      sum += this.hand[i].value;
    }
    return sum;
  }
}

export default Dealer;
