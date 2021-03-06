import { Board } from "./Board";
import { Players } from "./Players";
import { Player } from "./Player";
import { Slide } from "./Slide";
import { Setup } from "./Setup";
import { BOARD_STOP_RESULT_DELAY, STOP_BOARD_EVENT_HANDLER_DELAY, PASS_MESSAGE_WAIT } from "./config";
import { buildButton, pressOrPassMessage, sleep, transitionBodyBackground } from "./utils";

export class Game {
  round = 0;
  private _board: Board = new Board(this.round);
  private _players: Players = new Players();
  private _centerPanel: HTMLElement;
  private _setup: Setup;
  private _playersElement: HTMLElement;

  constructor() {
    this._board.displayPanelsBackgroundOnly();
    this._board.allLights(false);
    this._centerPanel = document.getElementById("center-panel") as HTMLElement;
    this._playersElement = document.getElementById("players") as HTMLElement;
    this._setup = new Setup(document.getElementById("setup") as HTMLDialogElement, this);
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

  // Methods

  showSetup(): void {
    this._centerPanel.innerHTML = "";
    this._setup.show();
  }

  newGame = (): void => {
    this._playersElement.classList.add("hide");
    this._board.clearCurrentInterval();
    this._board.displayPanelsBackgroundOnly();
    this._board.allLights(false);
    this._players.resetPlayerData([0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]);
    this._setup.show(0);
  };

  resetRound(round: number): void {
    if (round !== this.round) {
      this.round = round;
      this._board.resetRound(round);
    }
  }

  async startRound() {
    this._playersElement.classList.remove("hide");
    transitionBodyBackground(false);
    this._players.refreshPlayerOutputs();
    let message = `Welcome to round ${this.round + 1}!`;
    message += `<br />There's over $${this._board.totalRoundAmount.toLocaleString()} in cash and prizes up for grabs.`;
    this.displayMessage(message);

    this._board.spinLightOnly();
    await this._board.revealPanels();
    this._board.spin(); // Does not set listener
    this._players.setPlayerOrder();
    this.proceedWithNextPlayer();
  }

  spin(): void {
    this.currentPlayer.useSpin();
    this._board.spin();
    this._playersElement.classList.add("hide");
    setTimeout(() => {
      document.addEventListener("keyup", this.handleKeyUp);
      this._centerPanel.addEventListener("click", this.stopBoard);
      this._centerPanel.classList.add("pointer");
    }, STOP_BOARD_EVENT_HANDLER_DELAY);
  }

  stopBoard = (): void => {
    document.removeEventListener("keyup", this.handleKeyUp);
    this._centerPanel.removeEventListener("click", this.stopBoard);
    this._centerPanel.classList.remove("pointer");
    this._playersElement.classList.remove("hide");

    this._board.stop();
    setTimeout(() => this.processResult(), BOARD_STOP_RESULT_DELAY);
  };

  handleKeyUp = (event: KeyboardEvent): void => {
    if (event.code === "Space" || event.key === "Space") {
      this.stopBoard();
    }
  };

  processResult(panelIndex: number | undefined = undefined, withStopMessage = true): void {
    let slide: Slide;
    if (panelIndex === undefined) {
      slide = this._board.currentPanel.currentSlide;
    } else {
      slide = this._board.panels[panelIndex].currentSlide;
    }

    if (slide.callback) {
      slide.callback(this);
    } else {
      this.displayStopMessage(slide.description, withStopMessage);
      slide.applyToPlayer(this.currentPlayer);
      this._players.refreshPlayerOutputs();
      this.proceedWithRound();
    }
  }

  displayStopMessage(description: string, withStop = true): void {
    if (withStop) {
      this.displayMessage(`Stopped on... ${description}`);
    } else {
      this.displayMessage(`${description}!`);
    }
  }

  async proceedWithRound() {
    await sleep(2000);

    if (!this.currentPlayer) {
      this.endOfRound();
      return;
    }

    let messageText = `${this.currentPlayer.name}<br />`;
    const buttons = [] as Array<HTMLButtonElement>;

    if (this.currentPlayer.canUseEarnedSpins) {
      messageText += pressOrPassMessage();
      buttons.push(buildButton("Press my luck!", this.pressMyLuck));

      const passablePlayers = this._players.passablePlayers();
      if (passablePlayers.length > 0) {
        passablePlayers.forEach((player) => {
          buttons.push(buildButton(`Pass to ${player.name}`, this.pass, { playerNumber: player.number.toString() }));
        });
      } else {
        // Play against the house
        buttons.push(buildButton("End round", this.pass));
      }
    } else if (this.currentPlayer.passedSpins > 0) {
      messageText = `You have spins in your passed column. You must use them.`;
      buttons.push(buildButton("Press my luck!", this.pressMyLuck));
    } else {
      this.proceedWithNextPlayer();
      return;
    }

    this.displayMessage(messageText, buttons);
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
    this._centerPanel.innerHTML = "";
    this.spin();
  };

  pass = (event: Event): void => {
    const target = event.target as HTMLButtonElement;
    const playerNumber = target.dataset.playerNumber;
    if (playerNumber) {
      const passedPlayer = this._players.players.find((player) => player.number === parseInt(playerNumber));
      if (passedPlayer) {
        passedPlayer.passedSpins += this.currentPlayer.earnedSpins;
        this.currentPlayer.earnedSpins = 0;
        this.displayMessage(`You have passed your spins to ${passedPlayer.name}`);
        this._players.refreshPlayerOutputs();
        setTimeout(() => {
          this.proceedWithNextPlayer();
        }, PASS_MESSAGE_WAIT);
      }
    } else {
      this.currentPlayer.earnedSpins = 0;
      this.displayMessage("You have given up your spins");
      this._players.refreshPlayerOutputs();
      setTimeout(() => {
        this.proceedWithNextPlayer();
      }, PASS_MESSAGE_WAIT);
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
    message += ` with a score of $${topScorePlayers[0].score.toLocaleString()} in cash and prizes!`;

    this.displayMessage(message, [buildButton("Start a New Game", this.newGame)]);
    this._board.allLightsFlash();
  }

  displayMessage(messageString: string, buttons: Array<HTMLButtonElement> = []): void {
    const outerContainer = document.createElement("div");
    outerContainer.classList.add("alert");
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerHTML = messageString;
    outerContainer.appendChild(message);
    buttons.forEach((button) => outerContainer.appendChild(button));
    this._centerPanel.innerHTML = "";
    this._centerPanel.appendChild(outerContainer);
  }

  newPlayerTurn(): void {
    let messageText = `${this._players.currentPlayerName}, it's your turn!`;
    if (this.currentPlayer.passedSpins > 0) {
      messageText = `${messageText}<br />You have spins in your passed column. You must use them.`;
    }
    this.displayMessage(messageText, [buildButton("Press my luck!", this.pressMyLuck)]);
  }

  async endOfRound() {
    if (this.round === 0) {
      transitionBodyBackground(true);
      this.displayMessage(`That's the end of round ${this.round + 1}!`);
      await this._board.revealPanels("backgroundOnly");
      this._playersElement.classList.add("hide");
      this.resetRound(1);
      this._board.allLights(false);
      this._setup.show(this.round);
    } else {
      this.gameOver();
    }
  }
}
