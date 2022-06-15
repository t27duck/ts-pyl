import { Player } from "./Player";

export class Players {
  private _players: Player[] = [];
  private _currentPlayer: Player | undefined = undefined;
  private _playerOrder: Player[] = [];

  constructor() {
    this._players = [
      new Player("#player-1"),
      new Player("#player-2"),
      new Player("#player-3")
    ];
    this.refreshPlayerOutputs();
  }

  // Getters

  get currentPlayer(): Player | undefined {
    return this._currentPlayer;
  }

  get currentPlayerNumber(): number {
    if (!this._currentPlayer) {
      return 0;
    }
    return this._players.indexOf(this._currentPlayer) + 1;
  }

  // Methods

  setPlayerOrder(): void {
    const playerStructure = this._players.map(player => player);

    // Sort by score low to high
    // and then by total spins low to high
    playerStructure.sort((a: Player, b: Player): number => {
      if (a.score < b.score) { return -1; }
      if (a.score > b.score) { return 1; }

      if (a.totalSpins < b.totalSpins) { return -1; }
      if (a.totalSpins > b.totalSpins) { return 1; }
      return 0;
    });

    this._playerOrder = playerStructure;
  }

  determineCurrentPlayer(round: number): void {
    if (this._playerOrder.length !== 0) {
      this._currentPlayer = this._playerOrder.shift();
      return;
    }

    const spinCounts = this._players.map(player => player.totalSpins);
    this._currentPlayer = undefined;

    // If no one has spins, the round is pretty much over
    if (spinCounts.every(spinCount => spinCount <= 0)) {
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
