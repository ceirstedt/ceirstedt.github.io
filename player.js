class Player {
  constructor() {
    this.hand = [];
    this.funds = 10;
    this.bet = 1;
  }

  showCards(playerHand) {
    playerHand.innerHTML = '<h3 class="hand-label">Your hand</h3>';
    for (let i = 0; i < this.hand.length; i++) {
      playerHand.innerHTML +=
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
    }
    playerHand.innerHTML +=
      '<h3 class="hand-label">Total Hand Value: ' +
      sumCards(this.hand) +
      "</h3>";
  }
}

function sumCards(hand) {
  let sum = 0;
  for (let i = 0; i < hand.length; i++) {
    sum += hand[i].value;
  }
  return sum;
}

export default Player;
