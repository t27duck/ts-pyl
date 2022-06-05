import { Board } from "./Board";
import { Players } from "./Players";

export class Game {
  round: number = 0;
  private _board: Board = new Board(this.round);
  private _players: Players = new Players();
  private _centerPanel: HTMLElement | null;

  constructor(
  ) {
    this._board.displayPanels();
    this.spin();
    this._centerPanel = document.getElementById("center-panel");
  }

  // Methods

  reconfigureBoard(): void {
    this._board = new Board(this.round);
    this._board.displayPanels();
  }

  spin(): void {
    this._players.currentPlayer?.useSpin();
    this._board.spin();
    document.addEventListener("keyup", this.handleKeyUp);
  }

  stop(): void {
    document.removeEventListener("keyup", this.handleKeyUp);
    this._board.stop();
  }

  handleKeyUp = (event: KeyboardEvent): void => {
    if (event.code === "Space" || event.key === "Space") {
      this.stop();
      this.processResult();
    }
  }

  handleMoveChoice = (event: Event): void => {
    const target = event.target as HTMLButtonElement;
    const panelIndex = target.dataset.panelIndex;
    if (panelIndex) {
      const realPanelIndex = parseInt(panelIndex) - 1;
      this.processResult(realPanelIndex, false);
      this._board.clearCurrentInterval();
      this._board.flashCurrentPanel(realPanelIndex);
    }
  }

  processResult(panelIndex: number | undefined = undefined, withStopMessage: boolean = true): void {
    let slide;
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
      case "pickacorner":
      case "moveonespace":
        this.displayStopMessage(slide.description, withStopMessage);
        this._board.flashPanelList(slide.choices);
        slide.choices.forEach(panelIndex => {
          const button = document.createElement("button");
          button.innerText = this._board.panels[panelIndex - 1].currentSlide.description;
          button.classList.add("choice-button");
          button.dataset.panelIndex = panelIndex.toString();
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
      message.innerText += `Stopped on... ${description}!`;
    } else {
      message.innerText = `${description}!`;
    }
    if (this._centerPanel) {
      this._centerPanel.innerHTML = "";
      this._centerPanel.appendChild(message);
    }
  }
}
