import { Board } from "./Board";
import { Players } from "./Players";

export class Game {
  private _board: Board | null = null;
  private _players: Players = new Players();
  round: number = 0;

  constructor(
  ) {
    this.reconfigureBoard();
    this._board?.spin();
  }

  // Methods

  reconfigureBoard(): void {
    this._board = new Board(this.round);
    this._board.displayPanels();
  }


}
