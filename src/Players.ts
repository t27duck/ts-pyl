import { Player } from "./Player";

export class Players {
  private _players: Player[] = [];
  private _currentPlayer: Player | null = null;

  constructor() {
    this._players = [
      new Player("#player-1"),
      new Player("#player-2"),
      new Player("#player-3")
    ];

    this._currentPlayer = this._players[0];
    this.refreshPlayerOutputs();
  }

  // Getters

  get currentPlayer(): Player | null {
    return this._currentPlayer;
  }

  // Methods

  determineCurrentPlayer(): void {
    const spinCounts = this._players.map(player => player.earnedSpins);
    this._currentPlayer = this._players[spinCounts.indexOf(Math.max(...spinCounts))];
  }

  refreshPlayerOutputs(): void {
    this._players.forEach(player => {
      player.displaySpins();
      player.displayScore();
      player.displayWhammies();
      player.scoreElement?.classList.remove("player-buzzed");
    });
    this._currentPlayer?.scoreElement?.classList.add("player-buzzed");
  }

  resetSpins(spins: Array<number>): void {
    this._players.forEach((player, index) => {
      player.earnedSpins = spins[index];
    });
  }
}
