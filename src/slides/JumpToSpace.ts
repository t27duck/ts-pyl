import { Slide } from "../Slide";
import { Player } from "../Player";
import { Game } from "../Game";

export class JumpToSpace extends Slide {
  constructor(slideConfig: { className?: string; color: string; description?: string; target: number; text?: string }) {
    super(slideConfig);
    this._baseClassName = "panel-jumptospace";
  }

  // Getters

  get description(): string {
    return `${this._description} to...`;
  }

  callback = (game: Game) => {
    game.displayStopMessage(this.description, true);
    setTimeout(() => {
      const targetIndex = this._target - 1;
      game.processResult(targetIndex, false);
      game.board.flashCurrentPanel(targetIndex);
      game.proceedWithRound();
    }, 1800);
  };

  // Methods

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  applyToPlayer(player: Player): void {}
}
