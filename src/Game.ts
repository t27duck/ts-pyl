import { Board } from "./Board";
import { Players } from "./Players";

export class Game {
  private _board: Board | null = null;
  private _players: Players = new Players();
  round: number = 0;

  constructor(
  ) {
    this.reconfigureBoard();
    this.spin();
  }

  // Methods

  reconfigureBoard(): void {
    this._board = new Board(this.round);
    this._board.displayPanels();
  }

  spin(): void {
    this._players.currentPlayer?.useSpin();
    this._board?.spin();
    document.addEventListener("keyup", this.handleKeyUp);
  }

  stop(): void {
    document.removeEventListener("keyup", this.handleKeyUp);
    this._board?.stop();
  }

  handleKeyUp = (event: KeyboardEvent): void => {
    if (event.code === "Space" || event.key === "Space") {
      this.stop();
    }
  }
}
