import { Game } from "./Game";

export class Setup {
  private currentRound = 0;

  constructor(private dialog: HTMLDialogElement, private game: Game) {
    this.dialog = dialog;
    this.game = game;
  }

  // getters

  get selectRound(): HTMLSelectElement {
    return this.dialog.querySelector("#select-round") as HTMLSelectElement;
  }

  get player1Spins(): HTMLInputElement {
    return document.getElementById("select-player-1-spins") as HTMLInputElement;
  }

  get player2Spins(): HTMLInputElement {
    return document.getElementById("select-player-2-spins") as HTMLInputElement;
  }

  get player3Spins(): HTMLInputElement {
    return document.getElementById("select-player-3-spins") as HTMLInputElement;
  }

  get player1Whammies(): HTMLSelectElement {
    return document.getElementById("select-player-1-whammies") as HTMLSelectElement;
  }

  get player2Whammies(): HTMLSelectElement {
    return document.getElementById("select-player-2-whammies") as HTMLSelectElement;
  }

  get player3Whammies(): HTMLSelectElement {
    return document.getElementById("select-player-3-whammies") as HTMLSelectElement;
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
          break;
        case 1:
          this.player2Whammies.value = player.whammies.toString();
          break;
        case 2:
          this.player3Whammies.value = player.whammies.toString();
      }
    });
    if (this.currentRound === 0) {
      this.selectRound.disabled = false;
      this.player1Spins.value = "2";
      this.player2Spins.value = "4";
      this.player3Spins.value = "3";
    } else {
      this.selectRound.disabled = true;
      this.player1Spins.value = "3";
      this.player2Spins.value = "5";
      this.player3Spins.value = "4";
    }
  }

  processDialog(): void {
    const round = parseInt(this.selectRound.value);
    this.game.resetRound(round);

    const p1Spins = parseInt(this.player1Spins.value);
    const p2Spins = parseInt(this.player2Spins.value);
    const p3Spins = parseInt(this.player3Spins.value);
    this.game.resetSpins([p1Spins, p2Spins, p3Spins]);

    const p1Whammies = parseInt(this.player1Whammies.value);
    const p2Whammies = parseInt(this.player2Whammies.value);
    const p3Whammies = parseInt(this.player3Whammies.value);
    this.game.resetWhammies([p1Whammies, p2Whammies, p3Whammies]);

    this.game.startRound();
  }
}
