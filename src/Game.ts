import { Board } from "./Board";
import { Players } from "./Players";

export class Game {
  round: number = 0;
  private _board: Board = new Board(this.round);
  private _players: Players = new Players();

  constructor(
  ) {
    this._board.displayPanels();
    this.spin();
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

  processResult(): void {
    const slide = this._board.currentPanel.currentSlide;
    switch (slide.type) {
      case "cash":
        this._players.currentPlayer?.addScore(slide.value);
        break;
      default:
        this._players.currentPlayer?.addScore(slide.value);
    }
  }
}
