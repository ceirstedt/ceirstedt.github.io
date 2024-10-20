import Dealer from "./dealer.js";
import Player from "./player.js";

document.addEventListener("DOMContentLoaded", function () {
  let game_state = "start";

  let playerHand = document.querySelector("#player");
  let player = new Player();
  let dealerHand = document.querySelector("#dealer");
  let dealer = new Dealer();

  let fundsLabel = document.querySelector("#funds-label");

  let hitButton = document.querySelector("#hit-button");
  let standButton = document.querySelector("#stand-button");

  let subOne = document.querySelector("#sub-one");
  let subFive = document.querySelector("#sub-five");
  let addOne = document.querySelector("#add-one");
  let addFive = document.querySelector("#add-five");
  let betButtons = [subFive, -5, subOne, -1, addOne, 1, addFive, 5];

  // add button click functions to all bet buttons
  for (let i = 0; i < betButtons.length; i += 2) {
    betButtons[i].addEventListener("click", function (e) {
      if (
        player.bet + betButtons[i + 1] >= 1 &&
        player.bet + betButtons[i + 1] <= player.funds
      ) {
        player.bet += betButtons[i + 1];
      }
      fundsLabel.innerHTML =
        "Funds: $" + player.funds + " | Bet: $" + player.bet;
    });
  }

  hitButton.addEventListener("click", function (e) {
    if (game_state == "start") {
      playGame();
    } else if (game_state == "play") {
      dealer.dealPlayer(player.hand);
    }
  });

  startGame();

  function startGame() {
    hitButton.innerHTML = "Deal 'em";
    standButton.style.display = "none";
    dealer.fillDeck();
    dealer.shuffleDeck();

    dealerHand.innerHTML =
      '<h3 class="hand-label">Dealer hand</h3>' +
      '<div class="card back">*</div>' +
      '<div class="card back">*</div>';

    playerHand.innerHTML =
      '<h3 class="hand-label">Your hand</h3>' +
      '<div class="card back">*</div>' +
      '<div class="card back">*</div>';

    fundsLabel.innerHTML = "Funds: $" + player.funds + " | Bet: $" + player.bet;
  }

  function playGame() {
    hitButton.innerHTML = "Hit";
    standButton.style.display = "inline";
    game_state = "play";

    for (let i = 0; i < betButtons.length; i += 2) {
      betButtons[i].style.display = "none";
    }

    dealer.dealPlayer(player.hand);
    dealer.dealPlayer(player.hand);
    player.showCards(playerHand);
    dealer.dealPlayer(dealer.hand);
    dealer.showCards(dealerHand);
  }
});
