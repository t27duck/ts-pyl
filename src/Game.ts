import { Board } from "./Board";
import { Players } from "./Players";
import { Player } from "./Player";
import { Slide } from "./Slide";
import { Setup } from "./Setup";
import { BOARD_STOP_RESULT_DELAY, sleep } from "./config";

export class Game {
  round = 0;
  private _board: Board = new Board(this.round);
  private _players: Players = new Players();
  private _centerPanel: HTMLElement;
  private _setup: Setup;

  constructor() {
    this._board.displayPanels("backgroundOnly");
    this._board.allLightsOff();
    this._centerPanel = document.getElementById("center-panel") as HTMLElement;
    this._setup = new Setup(document.getElementById("setup") as HTMLDialogElement, this);
    this._setup.show();
  }

  // Getters

  get currentPlayer(): Player {
    return this._players.currentPlayer as Player;
  }

  get players(): Players {
    return this._players;
  }

  get board(): Board {
    return this._board;
  }

  get centerPanel(): HTMLElement {
    return this._centerPanel;
  }

  // Methods

  resetRound(round: number): void {
    if (round !== this.round) {
      this.round = round;
      this._board.resetRound(round);
      this._board.displayPanels("backgroundOnly");
    }
  }

  async startRound() {
    this._players.refreshPlayerOutputs();
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerText = `Welcome to round ${this.round + 1}!`;
    this.centerPanel.innerHTML = "";
    this.centerPanel.appendChild(message);

    this._board.spinLightOnly();
    await this._board.revealPanels();
    this._board.spin(); // Does not set listener
    this._players.setPlayerOrder();
    this.proceedWithNextPlayer();
  }

  spin(): void {
    this.currentPlayer.useSpin();
    this._board.spin();
    setTimeout(() => document.addEventListener("keyup", this.handleKeyUp), 500);
  }

  stopBoard(): void {
    document.removeEventListener("keyup", this.handleKeyUp);
    this._board.stop();
    setTimeout(() => this.processResult(), BOARD_STOP_RESULT_DELAY);
  }

  handleKeyUp = (event: KeyboardEvent): void => {
    if (event.code === "Space" || event.key === "Space") {
      this.stopBoard();
    }
  };

  handleMoveChoice = (event: Event): void => {
    const target = event.target as HTMLButtonElement;
    const panelIndex = target.dataset.panelIndex;
    if (panelIndex) {
      const realPanelIndex = parseInt(panelIndex) - 1;
      this._board.clearCurrentInterval();
      this._board.flashCurrentPanel(realPanelIndex);
      this.processResult(realPanelIndex, false);
    }
  };

  handleCashOrLoseWhammyChoice = (event: Event): void => {
    const target = event.target as HTMLButtonElement;
    const choice = target.dataset.choice;
    if (!choice) {
      return;
    }

    if (choice === "whammy") {
      this.currentPlayer.addWhammy(-1);
      this.displayStopMessage(`Lose One Whammy`, false);
    } else {
      const value = parseInt(choice);
      this.currentPlayer.addScore(value);
      this.displayStopMessage(`$${value}`, false);
    }
    this.proceedWithRound();
  };

  processResult(panelIndex: number | undefined = undefined, withStopMessage = true): void {
    let slide: Slide;
    if (panelIndex === undefined) {
      slide = this._board.currentPanel.currentSlide;
    } else {
      slide = this._board.panels[panelIndex].currentSlide;
    }
    switch (slide.type) {
      case "cash":
      case "cashandspin":
      case "whammy":
      case "prize":
      case "jumptospace":
      case "pickspace":
        this.displayStopMessage(slide.description, withStopMessage);
        if (slide.callback) {
          slide.callback(this);
        } else {
          slide.applyToPlayer(this.currentPlayer);
          this._players.refreshPlayerOutputs();
          this.proceedWithRound();
          break;
        }
        break;
      case "cashorlosewhammy":
        if (this.currentPlayer.whammies > 0) {
          this.displayStopMessage(`${slide.description}!`, withStopMessage);
          let button = document.createElement("button");
          button.innerText = `$${slide.value}`;
          button.classList.add("choice-button");
          button.dataset.choice = slide.value.toString();
          button.addEventListener("click", this.handleCashOrLoseWhammyChoice);
          this.centerPanel.appendChild(button);

          button = document.createElement("button");
          button.innerText = "Lose 1 Whammy";
          button.classList.add("choice-button");
          button.dataset.choice = "whammy";
          button.addEventListener("click", this.handleCashOrLoseWhammyChoice);
          this.centerPanel.appendChild(button);
        } else {
          this.currentPlayer.addScore(slide.value);
          this.displayStopMessage(`$${slide.value}!`, withStopMessage);
          this.proceedWithRound();
        }
        break;
      default:
        this.currentPlayer.addScore(slide.value);
        this.displayStopMessage(slide.description, withStopMessage);
        this.proceedWithRound();
    }
  }

  displayStopMessage(description: string, withStop = true): void {
    const message = document.createElement("div");
    message.classList.add("message");
    if (withStop) {
      message.innerText += `Stopped on... ${description}`;
    } else {
      message.innerText = `${description}!`;
    }
    this.centerPanel.innerHTML = "";
    this.centerPanel.appendChild(message);
  }

  async proceedWithRound() {
    await sleep(2000);

    if (!this.currentPlayer) {
      this.endOfRound();
      return;
    }

    const message = document.createElement("div");
    const buttons = [] as Array<HTMLButtonElement>;
    message.classList.add("message");

    if (this.currentPlayer.canUseEarnedSpins) {
      message.innerText = "Press your luck or pass?";
      let button = document.createElement("button");
      button.innerText = "Press my luck!";
      button.classList.add("choice-button");
      button.addEventListener("click", this.pressMyLuck);
      buttons.push(button);

      const passablePlayers = this._players.passablePlayers();
      if (passablePlayers.length > 0) {
        passablePlayers.forEach((player) => {
          button = document.createElement("button");
          button.innerText = `Pass to ${player.name}`;
          button.dataset.playerNumber = player.number.toString();
          button.classList.add("choice-button");
          button.addEventListener("click", this.pass);
          buttons.push(button);
        });
      } else {
        // Play against the house
        button = document.createElement("button");
        button.innerText = "End round";
        button.classList.add("choice-button");
        button.addEventListener("click", this.pass);
        buttons.push(button);
      }
    } else if (this.currentPlayer.passedSpins > 0) {
      message.innerText = `You have spins in your passed column. You must use them.`;
      const button = document.createElement("button");
      button.innerText = "Press my luck!";
      button.classList.add("choice-button");
      button.addEventListener("click", this.pressMyLuck);
      buttons.push(button);
    } else {
      this.proceedWithNextPlayer();
      return;
    }

    this.centerPanel.innerHTML = "";
    this.centerPanel.appendChild(message);
    if (buttons) {
      buttons.forEach((button) => {
        this.centerPanel.appendChild(button);
      });
    }
  }

  proceedWithNextPlayer(): void {
    this._players.determineCurrentPlayer();
    this._players.refreshPlayerOutputs();

    if (this.currentPlayer) {
      this.newPlayerTurn();
    } else {
      this.endOfRound();
    }
  }

  pressMyLuck = (): void => {
    this.centerPanel.innerHTML = "";
    this.spin();
  };

  pass = (event: Event): void => {
    const target = event.target as HTMLButtonElement;
    const playerNumber = target.dataset.playerNumber;
    if (playerNumber) {
      const passedPlayer = this._players.getPlayerByNumber(parseInt(playerNumber));
      if (passedPlayer) {
        passedPlayer.passedSpins += this.currentPlayer.earnedSpins;
        this.currentPlayer.earnedSpins = 0;
        this.displayMessage(`You have passed your spins to ${passedPlayer.name}`);
        this._players.refreshPlayerOutputs();
        setTimeout(() => {
          this.proceedWithNextPlayer();
        }, 2000);
      }
    } else {
      this.currentPlayer.earnedSpins = 0;
      this.displayMessage("You have given up your spins");
      this._players.refreshPlayerOutputs();
      setTimeout(() => {
        this.proceedWithNextPlayer();
      }, 2000);
    }
  };

  nextRound = (): void => {
    if (this.round === 0) {
      this.resetRound(1);
      this._board.allLightsOff();
      this._setup.show(this.round);
    } else {
      this.gameOver();
    }
  };

  gameOver(): void {
    const topScorePlayers = this._players.topScorePlayers();
    let message = "That's the end of the game!<br />";
    if (topScorePlayers.length > 1) {
      message += "The winners are:<br />";
    } else {
      message += "The winner is:<br />";
    }

    message += topScorePlayers.map((player) => player.name).join(" and ");
    message += `with a score of $${topScorePlayers[0].score} in case and prizes!`;

    this.displayMessage(message);
    this._board.allLightsFlash();
  }

  displayMessage(messageString: string): void {
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerHTML = messageString;
    this.centerPanel.innerHTML = "";
    this.centerPanel.appendChild(message);
  }

  newPlayerTurn(): void {
    const message = document.createElement("div");
    message.classList.add("message");
    let messageText = `${this._players.currentPlayerName}, it's your turn.`;
    if (this.currentPlayer.passedSpins > 0) {
      messageText = `${messageText}<br />You have spins in your passed column. You must use them.`;
    }
    message.innerHTML = messageText;
    const button = document.createElement("button");
    button.innerText = "Press my luck!";
    button.classList.add("choice-button");
    button.addEventListener("click", this.pressMyLuck);
    this.centerPanel.innerHTML = "";
    this.centerPanel.appendChild(message);
    this.centerPanel.appendChild(button);
  }

  endOfRound(): void {
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerText = `That's the end of round ${this.round + 1}!`;
    const button = document.createElement("button");
    button.innerText = "Continue...";
    button.classList.add("choice-button");
    button.addEventListener("click", this.nextRound);
    this.centerPanel.innerHTML = "";
    this.centerPanel.appendChild(message);
    this.centerPanel.appendChild(button);
  }
}
