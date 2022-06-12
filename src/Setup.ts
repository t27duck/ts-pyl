import { Game } from "./Game";

export class Setup {
  constructor(
    private dialog: HTMLDialogElement | null,
    private game: Game
  ) {
    this.dialog = dialog;
    this.game = game;
  }


  // Methods
  show(): void {
    if (this.dialog) {
      this.dialog.showModal();
      this.dialog.addEventListener("close", () => {
        this.processDialog();
      });
    }
  }

  processDialog(): void {
    const round = parseInt((document.getElementById("select-round") as HTMLSelectElement).value);
    this.game.resetRound(round);

    const p1Spins = parseInt((document.getElementById("select-player-1-spins") as HTMLSelectElement).value);
    const p2Spins = parseInt((document.getElementById("select-player-2-spins") as HTMLSelectElement).value);
    const p3Spins = parseInt((document.getElementById("select-player-3-spins") as HTMLSelectElement).value);
    this.game.resetSpins([p1Spins, p2Spins, p3Spins]);
    this.game.startRound();
  }
}
