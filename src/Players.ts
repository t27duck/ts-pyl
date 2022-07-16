import { Player } from "./Player";

// Represents a logical grouping of the three players.
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

  // The player with the highest score that is not the current player is the only one that can receive passed spins.
  // In the case of a tie, both players are selectable to receive them.
  passablePlayers(): Player[] {
    const passablePlayers = this._players.filter((player) => player !== this.currentPlayer && player.whammies < 4);
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

  // Order is determined by the player with the lowest score to the highest score.
  // In the case of a tie, the player with the least amount of spins goes before the other.
  // In the case of a tie in spins, order is resolved by player number low to high.
  // This sets the initial order for a round and is called again once all available players have had a turn.
  setPlayerOrder(): void {
    const playerStructure = this._players
      .filter((player) => player.totalSpins > 0 && player.whammies < 4)
      .map((player) => player);

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

  // Runs through the player order. If all players have had a turn, then a new order is determined.
  // An undefined current player results in the end of the round.
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
      if (player.whammies >= 4) {
        player.earnedSpins = 0;
        player.passedSpins = 0;
        player.score = 0;
      }
      player.refreshOutput();
      player.scoreElement.classList.remove("player-buzzed");
    });
    if (this._currentPlayer) {
      this._currentPlayer.scoreElement.classList.add("player-buzzed");
    }
  }

  // Used by Setup to prepopulate/update all player stats for the start of a round.
  resetPlayerData(
    scores: Array<number>,
    earnedSpins: Array<number>,
    passedSpins: Array<number>,
    whammies: Array<number>
  ): void {
    this._players.forEach((player, index) => {
      player.score = scores[index];
      player.earnedSpins = earnedSpins[index];
      player.passedSpins = passedSpins[index];
      player.whammies = whammies[index];
    });
    this.refreshPlayerOutputs();
  }
}
