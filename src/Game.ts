import { Board } from "./Board";
import { Players } from "./Players";
import { Slide } from "./Slide";
import { Setup } from "./Setup";
import { BOARD_STOP_RESULT_DELAY } from "./config";

export class Game {
  round: number = 0;
  private _board: Board = new Board(this.round);
  private _players: Players = new Players();
  private _centerPanel: HTMLElement | null;
  private _setup: Setup;

  constructor(
  ) {
    this._board.displayPanels("backgroundOnly");
    this._board.allLightsOn();
    this._centerPanel = document.getElementById("center-panel");
    this._setup = new Setup(document.getElementById("setup") as HTMLDialogElement, this)
    this._setup.show();
  }

  // Methods

  resetRound(round: number): void {
    this.round = round;
    this._board.resetRound(round);
    this._board.displayPanels("backgroundOnly");
  }

  resetSpins(spins: Array<number>): void {
    this._players.resetSpins(spins);
    this._players.refreshPlayerOutputs();
  }

  spin(): void {
    this._players.currentPlayer?.useSpin();
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
  }

  handleMoveChoice = (event: Event): void => {
    const target = event.target as HTMLButtonElement;
    const panelIndex = target.dataset.panelIndex;
    if (panelIndex) {
      const realPanelIndex = parseInt(panelIndex) - 1;
      this._board.clearCurrentInterval();
      this._board.flashCurrentPanel(realPanelIndex);
      this.processResult(realPanelIndex, false);
    }
  }

  handleCashOrLoseWhammyChoice = (event: Event): void => {
    const target = event.target as HTMLButtonElement;
    const choice = target.dataset.choice;
    if (!choice) {
      return;
    }

    if (choice === "whammy") {
      this._players.currentPlayer?.addWhammy(-1);
      this.displayStopMessage(`Lose One Whammy`, false);
    } else {
      const value = parseInt(choice);
      this._players.currentPlayer?.addScore(value);
      this.displayStopMessage(`$${value}`, false);
    }
  }

  processResult(panelIndex: number | undefined = undefined, withStopMessage: boolean = true): void {
    let slide: Slide;
    if (panelIndex) {
      slide = this._board.panels[panelIndex].currentSlide;
    } else {
      slide = this._board.currentPanel.currentSlide;
    }
    switch (slide.type) {
      case "cash":
        this._players.currentPlayer?.addScore(slide.value);
        this.displayStopMessage(slide.description, withStopMessage);
        break;
      case "cashandspin":
        this._players.currentPlayer?.addScore(slide.value);
        this._players.currentPlayer?.addAddEarnedSpins(1);
        this.displayStopMessage(slide.description, withStopMessage);
        break;
      case "whammy":
        this._players.currentPlayer?.addWhammy();
        this._players.currentPlayer?.clearScore();
        this.displayStopMessage(slide.description, withStopMessage);
        break;
      case "prize":
        this._players.currentPlayer?.addScore(slide.value);
        this.displayStopMessage(`${slide.description} worth $${slide.value}`, withStopMessage);
        break;
      case "backtwospaces":
      case "advancetwospaces":
          this.displayStopMessage(`${slide.description} to...`, withStopMessage);
          setTimeout(() => {
            const targetIndex = slide.target - 1
            this.processResult(targetIndex, false);
            this._board.flashCurrentPanel(targetIndex);
          }, 1800);
          break;
      case "bigbucks":
        this.displayStopMessage(`${slide.description}!`, withStopMessage);
        setTimeout(() => {
          const targetIndex = slide.target - 1
          this.processResult(targetIndex, false);
          this._board.flashCurrentPanel(targetIndex);
        }, 1800);
        break;
      case "cashorlosewhammy":
        if (this._players.currentPlayer?.whammies && this._players.currentPlayer?.whammies > 0) {
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
          this._players.currentPlayer?.addScore(slide.value);
          this.displayStopMessage(`$${slide.value}!`, withStopMessage);
        }
        break;
      case "pickacorner":
      case "moveonespace":
        this.displayStopMessage(slide.description, withStopMessage);
        this._board.flashPanelList(slide.choices);
        slide.choices.forEach(pIndex => {
          const button = document.createElement("button");
          button.innerText = this._board.panels[pIndex - 1].currentSlide.description;
          button.classList.add("choice-button");
          button.dataset.panelIndex = pIndex.toString();
          button.addEventListener("click", this.handleMoveChoice);
          this._centerPanel?.appendChild(button);
        });
        break;
      default:
        this._players.currentPlayer?.addScore(slide.value);
        this.displayStopMessage(slide.description, withStopMessage);
    }
  }

  displayStopMessage(description: string, withStop: boolean = true): void {
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
}
