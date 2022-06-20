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
  private _centerPanel: HTMLElement | null;
  private _setup: Setup;

  constructor() {
    this._board.displayPanels("backgroundOnly");
    this._board.allLightsOff();
    this._centerPanel = document.getElementById("center-panel");
    this._setup = new Setup(document.getElementById("setup") as HTMLDialogElement, this);
    this._setup.show();
  }

  // Getters

  get currentPlayer(): Player {
    return this._players.currentPlayer as Player;
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
    if (this._centerPanel) {
      this._centerPanel.innerHTML = "";
      this._centerPanel.appendChild(message);
    }

    this._board.spinLightOnly();
    await this._board.revealPanels();
    this._board.spin(); // Does not set listener
    this._players.setPlayerOrder();
    this.proceedWithNextPlayer();
  }

  resetSpins(spins: Array<number>): void {
    this._players.resetSpins(spins);
  }

  spin(): void {
    this.currentPlayer.useSpin();
    this._board.spin();
    document.addEventListener("keyup", this.handleKeyUp);
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
    if (panelIndex) {
      slide = this._board.panels[panelIndex].currentSlide;
    } else {
      slide = this._board.currentPanel.currentSlide;
    }
    switch (slide.type) {
      case "cash":
        this.currentPlayer.addScore(slide.value);
        this.displayStopMessage(slide.description, withStopMessage);
        this.proceedWithRound();
        break;
      case "cashandspin":
        this.currentPlayer.addScore(slide.value);
        this.currentPlayer.addAddEarnedSpins(1);
        this.displayStopMessage(slide.description, withStopMessage);
        this.proceedWithRound();
        break;
      case "whammy":
        this.currentPlayer.addWhammy();
        this.currentPlayer.clearScore();
        this.displayStopMessage(slide.description, withStopMessage);
        if (this.currentPlayer.whammies < 4 && this.currentPlayer.passedSpins > 0) {
          this.currentPlayer.addAddEarnedSpins(this.currentPlayer.passedSpins);
          this.currentPlayer.passedSpins = 0;
        }
        this._players.refreshPlayerOutputs();
        this.proceedWithRound();
        break;
      case "prize":
        this.currentPlayer.addScore(slide.value);
        this.displayStopMessage(`${slide.description} worth $${slide.value}`, withStopMessage);
        slide.resolveValues(this.round + 1);
        this.proceedWithRound();
        break;
      case "backtwospaces":
      case "advancetwospaces":
        this.displayStopMessage(`${slide.description} to...`, withStopMessage);
        setTimeout(() => {
          const targetIndex = slide.target - 1;
          this.processResult(targetIndex, false);
          this._board.flashCurrentPanel(targetIndex);
          this.proceedWithRound();
        }, 1800);
        break;
      case "bigbucks":
        this.displayStopMessage(`${slide.description}!`, withStopMessage);
        setTimeout(() => {
          const targetIndex = slide.target - 1;
          this.processResult(targetIndex, false);
          this._board.flashCurrentPanel(targetIndex);
          this.proceedWithRound();
        }, 1800);
        break;
      case "cashorlosewhammy":
        if (this.currentPlayer.whammies > 0) {
          this.displayStopMessage(`${slide.description}!`, withStopMessage);
          let button = document.createElement("button");
          button.innerText = `$${slide.value}`;
          button.classList.add("choice-button");
          button.dataset.choice = slide.value.toString();
          button.addEventListener("click", this.handleCashOrLoseWhammyChoice);
          this._centerPanel?.appendChild(button);

          button = document.createElement("button");
          button.innerText = "Lose 1 Whammy";
          button.classList.add("choice-button");
          button.dataset.choice = "whammy";
          button.addEventListener("click", this.handleCashOrLoseWhammyChoice);
          this._centerPanel?.appendChild(button);
        } else {
          this.currentPlayer.addScore(slide.value);
          this.displayStopMessage(`$${slide.value}!`, withStopMessage);
          this.proceedWithRound();
        }
        break;
      case "pickacorner":
      case "moveonespace":
        this.displayStopMessage(slide.description, withStopMessage);
        this._board.flashPanelList(slide.choices);
        slide.choices.forEach((pIndex) => {
          const button = document.createElement("button");
          button.innerText = this._board.panels[pIndex - 1].currentSlide.description;
          button.classList.add("choice-button");
          button.dataset.panelIndex = pIndex.toString();
          button.addEventListener("click", this.handleMoveChoice);
          this._centerPanel?.appendChild(button);
        });
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
    if (this._centerPanel) {
      this._centerPanel.innerHTML = "";
      this._centerPanel.appendChild(message);
    }
  }

  async proceedWithRound() {
    await sleep(2000);
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

    if (this._centerPanel) {
      this._centerPanel.innerHTML = "";
      this._centerPanel.appendChild(message);
      if (buttons) {
        buttons.forEach((button) => {
          if (this._centerPanel) {
            this._centerPanel.appendChild(button);
          }
        });
      }
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
    if (this._centerPanel) {
      this._centerPanel.innerHTML = "";
    }
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
    if (this._centerPanel) {
      this._centerPanel.innerHTML = "";
      this._centerPanel.appendChild(message);
    }
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
    if (this._centerPanel) {
      this._centerPanel.innerHTML = "";
      this._centerPanel.appendChild(message);
      this._centerPanel.appendChild(button);
    }
  }

  endOfRound(): void {
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerText = `That's the end of round ${this.round + 1}!`;
    const button = document.createElement("button");
    button.innerText = "Continue...";
    button.classList.add("choice-button");
    button.addEventListener("click", this.nextRound);
    if (this._centerPanel) {
      this._centerPanel.innerHTML = "";
      this._centerPanel.appendChild(message);
      this._centerPanel.appendChild(button);
    }
  }
}
