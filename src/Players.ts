import { Player } from "./Player";

export class Players {
  private _players: Player[] = [];
  private _currentPlayer: Player | undefined = undefined;
  private _playerOrder: Player[] = [];

  constructor() {
    this._players = [
      new Player("#player-1", "Player 1", 1),
      new Player("#player-2", "Player 2", 2),
      new Player("#player-3", "Player 3", 3)
    ];
    this.refreshPlayerOutputs();
  }

  // Getters

  get currentPlayer(): Player | undefined {
    return this._currentPlayer;
  }

  get currentPlayerNumber(): number {
    return this._currentPlayer?.number || 0;
  }

  get currentPlayerName(): string {
    return this._currentPlayer?.name || "";
  }

  get players(): Player[] {
    return this._players;
  }

  // Methods

  passablePlayers(): Player[] {
    const passablePlayers = this._players.filter((player) => player !== this.currentPlayer && !player.outOfGame);
    if (passablePlayers.length > 1) {
      if (passablePlayers[0].score === passablePlayers[1].score) {
        return passablePlayers;
      } else if (passablePlayers[0].score > passablePlayers[1].score) {
        return [passablePlayers[0]];
      } else {
        return [passablePlayers[1]];
      }
    }

    return passablePlayers;
  }

  getPlayerByNumber(number: number): Player | undefined {
    return this._players.find((player) => player.number === number);
  }

  setPlayerOrder(): void {
    const playerStructure = this._players
      .filter((player) => player.totalSpins > 0 && !player.outOfGame)
      .map((player) => player);

    // Sort by score low to high
    // and then by total spins low to high
    playerStructure.sort((a: Player, b: Player): number => {
      if (a.score < b.score) {
        return -1;
      }
      if (a.score > b.score) {
        return 1;
      }

      if (a.totalSpins < b.totalSpins) {
        return -1;
      }
      if (a.totalSpins > b.totalSpins) {
        return 1;
      }
      return 0;
    });

    this._playerOrder = playerStructure;
  }

  determineCurrentPlayer(): void {
    if (this._playerOrder.length !== 0) {
      this._currentPlayer = this._playerOrder.shift();
      return;
    }

    this._currentPlayer = undefined;

    // If no one has spins, the round is pretty much over
    if (this._players.every((player) => player.totalSpins <= 0)) {
      return;
    }

    this.setPlayerOrder();

    if (this._playerOrder.length !== 0) {
      this._currentPlayer = this._playerOrder.shift();
    }
  }

  topScorePlayers(): Player[] {
    const topScore = Math.max(...this._players.map((player) => player.score));
    return this._players.filter((player) => player.score === topScore);
  }

  refreshPlayerOutputs(): void {
    this._players.forEach((player) => {
      if (player.outOfGame) {
        player.earnedSpins = 0;
        player.passedSpins = 0;
        player.clearScore();
      }
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

  resetPassedSpins(spins: Array<number>): void {
    this._players.forEach((player, index) => {
      player.passedSpins = spins[index];
    });
  }

  resetWhammies(whammies: Array<number>): void {
    this._players.forEach((player, index) => {
      player.whammies = whammies[index];
    });
  }

  resetScores(scores: Array<number>): void {
    this._players.forEach((player, index) => {
      player.score = scores[index];
    });
  }
}
