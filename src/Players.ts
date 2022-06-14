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

  get currentPlayerNumber(): number {
    if (!this._currentPlayer) {
      return 0;
    }
    return this._players.indexOf(this._currentPlayer) + 1;
  }

  // Methods

  determineCurrentPlayer(round: number): void {
    const spinCounts = this._players.map(player => player.totalSpins);
    this._currentPlayer = null;

    // If no one has spins, the round is pretty much over
    if (spinCounts.every(spinCount => spinCount === 0)) {
      return;
    }

    const maxSpinCountIndex = spinCounts.indexOf(Math.max(...spinCounts));

    // Round 1 is based solely on spin count
    // Alternatively, is there's noone with a score
    if (round === 0 || this._players.every(player => player.score === 0)) {
      this._currentPlayer = this._players[maxSpinCountIndex];
      return;
    }

    // Garanteed a player with a spin; pick the one with the highest score
    const playersWithSpins = this._players.filter(player => player.totalSpins > 0);
    const scores = playersWithSpins.map(player => player.score);
    const maxScoreIndex = scores.indexOf(Math.max(...scores));
    this._currentPlayer = this._players[maxScoreIndex];
  }

  refreshPlayerOutputs(): void {
    this._players.forEach(player => {
      player.displaySpins();
      player.displayScore();
      player.displayWhammies();
      player.scoreElement.classList.remove("player-buzzed");
    });
    if (this._currentPlayer) {
      this._currentPlayer.scoreElement.classList.add("player-buzzed");
    }
  }

  resetSpins(spins: Array<number>): void {
    this._players.forEach((player, index) => {
      player.earnedSpins = spins[index];
    });
  }
}
