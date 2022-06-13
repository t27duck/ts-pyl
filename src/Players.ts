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
    this.refreshPlayerOutputs();
  }

  // Getters

  get currentPlayer(): Player | null {
    return this._currentPlayer;
  }

  // Methods

  determineCurrentPlayer(): void {
    const spinCounts = this._players.map(player => player.totalSpins);
    let scores = this._players.map(player => player.score);
    this._currentPlayer = null;

    if (spinCounts.every(spinCount => spinCount === 0)) {
      return;
    }

    const maxSpinCountIndex = spinCounts.indexOf(Math.max(...spinCounts));
    let maxScoreIndex = spinCounts.indexOf(Math.max(...scores));

    if (scores.every(score => score === 0)) {
      this._currentPlayer = this._players[maxSpinCountIndex];
      return;
    }

    while (true) {
      if (this._players[maxScoreIndex].totalSpins === 0) {
        scores.splice(maxScoreIndex, 1);
        maxScoreIndex = spinCounts.indexOf(Math.max(...scores));
      } else {
        this._currentPlayer = this._players[maxScoreIndex];
        break;
      }
    }
  }

  refreshPlayerOutputs(): void {
    this._players.forEach(player => {
      player.displaySpins();
      player.displayScore();
      player.displayWhammies();
      player.scoreElement.classList.remove("player-buzzed");
    });
    this._currentPlayer?.scoreElement?.classList.add("player-buzzed");
  }

  resetSpins(spins: Array<number>): void {
    this._players.forEach((player, index) => {
      player.earnedSpins = spins[index];
    });
  }
}
