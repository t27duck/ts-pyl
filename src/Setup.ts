import { Game } from "./Game";
import { spinDistributions } from "./utils";

export class Setup {
  private currentRound = 0;
  private selectRound: HTMLSelectElement;
  private player1Spins: HTMLInputElement;
  private player2Spins: HTMLInputElement;
  private player3Spins: HTMLInputElement;
  private player1PassedSpins: HTMLInputElement;
  private player2PassedSpins: HTMLInputElement;
  private player3PassedSpins: HTMLInputElement;
  private player1Whammies: HTMLSelectElement;
  private player2Whammies: HTMLSelectElement;
  private player3Whammies: HTMLSelectElement;
  private player1Score: HTMLInputElement;
  private player2Score: HTMLInputElement;
  private player3Score: HTMLInputElement;
  private randomSpinsButton: HTMLAnchorElement;
  private randomSpinsFormPoolButton: HTMLAnchorElement;

  constructor(
    private dialog: HTMLDialogElement,
    private game: Game
  ) {
    this.dialog = dialog;
    this.game = game;
    this.selectRound = this.dialog.querySelector("#select-round") as HTMLSelectElement;
    this.player1Spins = document.getElementById("select-player-1-spins") as HTMLInputElement;
    this.player2Spins = document.getElementById("select-player-2-spins") as HTMLInputElement;
    this.player3Spins = document.getElementById("select-player-3-spins") as HTMLInputElement;
    this.player1PassedSpins = document.getElementById("select-player-1-passed-spins") as HTMLInputElement;
    this.player2PassedSpins = document.getElementById("select-player-2-passed-spins") as HTMLInputElement;
    this.player3PassedSpins = document.getElementById("select-player-3-passed-spins") as HTMLInputElement;
    this.player1Whammies = document.getElementById("select-player-1-whammies") as HTMLSelectElement;
    this.player2Whammies = document.getElementById("select-player-2-whammies") as HTMLSelectElement;
    this.player3Whammies = document.getElementById("select-player-3-whammies") as HTMLSelectElement;
    this.player1Score = document.getElementById("select-player-1-score") as HTMLInputElement;
    this.player2Score = document.getElementById("select-player-2-score") as HTMLInputElement;
    this.player3Score = document.getElementById("select-player-3-score") as HTMLInputElement;
    this.randomSpinsButton = document.getElementById("random-spins") as HTMLAnchorElement;
    this.randomSpinsFormPoolButton = document.getElementById("random-spins-pool") as HTMLAnchorElement;

    this.randomSpinsButton.addEventListener("click", this.pullRandomSpins);
    this.randomSpinsFormPoolButton.addEventListener("click", this.pullRandomSpinsFromPool);
  }

  // Methods
  show(round = 0): void {
    this.currentRound = round;
    this.configureDialog();
    this.dialog.showModal();
    this.dialog.addEventListener("close", () => {
      this.processDialog();
    });
  }

  configureDialog(): void {
    this.selectRound.value = this.currentRound.toString();
    this.game.players.players.forEach((player, index) => {
      switch (index) {
        case 0:
          this.player1Whammies.value = player.whammies.toString();
          this.player1Score.value = player.score.toString();
          break;
        case 1:
          this.player2Whammies.value = player.whammies.toString();
          this.player2Score.value = player.score.toString();
          break;
        case 2:
          this.player3Whammies.value = player.whammies.toString();
          this.player3Score.value = player.score.toString();
      }
    });
    if (this.currentRound === 0) {
      this.selectRound.disabled = false;
      this.player1Score.disabled = false;
      this.player2Score.disabled = false;
      this.player3Score.disabled = false;
    } else {
      this.selectRound.disabled = true;
      this.player1Score.disabled = true;
      this.player2Score.disabled = true;
      this.player3Score.disabled = true;
    }

    this.pullRandomSpinsFromPool();

    this.player1PassedSpins.value = "0";
    this.player2PassedSpins.value = "0";
    this.player3PassedSpins.value = "0";
  }

  processDialog(): void {
    const round = parseInt(this.selectRound.value);
    this.game.resetRound(round);

    const p1Spins = parseInt(this.player1Spins.value);
    const p2Spins = parseInt(this.player2Spins.value);
    const p3Spins = parseInt(this.player3Spins.value);

    const p1PassedSpins = parseInt(this.player1PassedSpins.value);
    const p2PassedSpins = parseInt(this.player2PassedSpins.value);
    const p3PassedSpins = parseInt(this.player3PassedSpins.value);

    const p1Whammies = parseInt(this.player1Whammies.value);
    const p2Whammies = parseInt(this.player2Whammies.value);
    const p3Whammies = parseInt(this.player3Whammies.value);

    const p1Score = parseInt(this.player1Score.value);
    const p2Score = parseInt(this.player2Score.value);
    const p3Score = parseInt(this.player3Score.value);

    this.game.players.resetPlayerData(
      [p1Score, p2Score, p3Score],
      [p1Spins, p2Spins, p3Spins],
      [p1PassedSpins, p2PassedSpins, p3PassedSpins],
      [p1Whammies, p2Whammies, p3Whammies]
    );

    this.game.startRound();
  }

  pullRandomSpinsFromPool = (event: Event | undefined = undefined) => {
    if (event) {
      event.preventDefault();
    }
    const spins = spinDistributions[Math.floor(Math.random() * spinDistributions.length)];
    this.player1Spins.value = spins[0].toString();
    this.player2Spins.value = spins[1].toString();
    this.player3Spins.value = spins[2].toString();
  };

  pullRandomSpins = (event: Event | undefined = undefined) => {
    if (event) {
      event.preventDefault();
    }
    const spins = Math.floor(Math.random() * 12);
    this.player1Spins.value = spins.toString();
    this.player2Spins.value = spins.toString();
    this.player3Spins.value = spins.toString();
  };
}
