import Dealer from "./dealer.js";
import Player from "./player.js";

class BlackjackGame {
  constructor() {
    this.initializeGame();
    this.setupEventListeners();
    this.startGame();
  }

  initializeGame() {
    this.gameState = "start";
    this.player = new Player();
    this.dealer = new Dealer();

    // DOM Elements
    this.elements = {
      playerHand: document.querySelector("#player"),
      dealerHand: document.querySelector("#dealer"),
      fundsLabel: document.querySelector("#funds-label"),
      gameOverText: document.querySelector("#game-over-text"),
      hitButton: document.querySelector("#hit-button"),
      standButton: document.querySelector("#stand-button"),
    };

    // Betting buttons configuration
    this.betButtons = [
      { element: document.querySelector("#sub-five"), value: -5 },
      { element: document.querySelector("#sub-one"), value: -1 },
      { element: document.querySelector("#add-one"), value: 1 },
      { element: document.querySelector("#add-five"), value: 5 },
    ];
  }

  setupEventListeners() {
    this.setupBettingButtons();
    this.setupGameButtons();
  }

  setupBettingButtons() {
    this.betButtons.forEach(({ element, value }) => {
      element.addEventListener("click", () => this.handleBet(value));
    });
  }

  setupGameButtons() {
    this.elements.hitButton.addEventListener("click", () =>
      this.handleHitButton(),
    );
    this.elements.standButton.addEventListener("click", () =>
      this.handleStandButton(),
    );
  }

  handleBet(value) {
    const newBet = this.player.bet + value;
    if (newBet >= 1 && newBet <= this.player.funds) {
      this.player.bet = newBet;
      this.updateFundsDisplay();
    }
  }

  handleHitButton() {
    switch (this.gameState) {
      case "start":
        this.playGame();
        break;
      case "play":
        this.gameLogic("hit");
        break;
      case "win":
      case "lose":
        this.gameState = "start";
        this.startGame();
        break;
    }
  }

  handleStandButton() {
    if (this.gameState === "play") {
      this.gameLogic("stand");
    }
  }

  gameLogic(action) {
    this.checkGameStatus();

    if (action === "hit") {
      this.handleHit();
    } else {
      this.handleStand();
    }

    this.updateFundsDisplay();
  }

  handleHit() {
    this.dealer.dealPlayer(this.player.hand);
    this.player.showCards(this.elements.playerHand);
    this.checkGameStatus();
  }

  handleStand() {
    while (this.dealer.sumCards() <= 14) {
      this.dealer.dealPlayer(this.dealer.hand);
      this.dealer.showCards(this.elements.dealerHand);
    }
    this.determineWinner();
  }

  checkGameStatus() {
    if (this.player.sumCards() > 21 || this.dealer.sumCards() === 21) {
      this.endGame("lose");
    } else if (this.player.sumCards() === 21 || this.dealer.sumCards() > 21) {
      this.endGame("win");
    }
  }

  determineWinner() {
    if (this.dealer.sumCards() > 21) {
      this.endGame("win");
    } else if (21 - this.dealer.sumCards() <= 21 - this.player.sumCards()) {
      this.endGame("lose");
    } else {
      this.endGame("win");
    }
  }

  endGame(result) {
    this.gameState = result;
    this.player.funds += result === "win" ? this.player.bet : -this.player.bet;
    this.elements.standButton.style.display = "none";
    this.elements.gameOverText.innerHTML =
      result === "win" ? "You Win!" : "You Lose!";
    this.elements.hitButton.innerHTML = "Play Again";
  }

  updateFundsDisplay() {
    this.elements.fundsLabel.innerHTML = `Funds: $${this.player.funds} | Bet: $${this.player.bet}`;
  }

  startGame() {
    this.resetGameState();
    this.setupInitialDisplay();
    this.updateFundsDisplay();
  }

  resetGameState() {
    this.elements.gameOverText.innerHTML = "";
    this.elements.hitButton.innerHTML = "Deal 'em";
    this.elements.standButton.style.display = "none";
    this.dealer.fillDeck();
    [...Array(3)].forEach(() => this.dealer.shuffleDeck());
    this.player.hand = [];
    this.dealer.hand = [];
  }

  setupInitialDisplay() {
    this.betButtons.forEach(({ element }) => {
      element.style.display = "inline";
    });

    const initialHandHTML =
      '<h3 class="hand-label">%LABEL%</h3><div class="card back">*</div><div class="card back">*</div>';
    this.elements.dealerHand.innerHTML = initialHandHTML.replace(
      "%LABEL%",
      "Dealer hand",
    );
    this.elements.playerHand.innerHTML = initialHandHTML.replace(
      "%LABEL%",
      "Your hand",
    );
  }

  playGame() {
    this.gameState = "play";
    this.elements.hitButton.innerHTML = "Hit";
    this.elements.standButton.style.display = "inline";
    this.betButtons.forEach(({ element }) => {
      element.style.display = "none";
    });

    // Deal initial cards
    [...Array(2)].forEach(() => this.dealer.dealPlayer(this.player.hand));
    this.player.showCards(this.elements.playerHand);
    this.dealer.dealPlayer(this.dealer.hand);
    this.dealer.showCards(this.elements.dealerHand);

    this.checkGameStatus();
  }
}

document.addEventListener("DOMContentLoaded", () => new BlackjackGame());
