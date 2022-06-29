import { Slide } from "../Slide";
import { Player } from "../Player";
import { Game } from "../Game";

export class JumpToSpace extends Slide {
  constructor(slideConfig: { className?: string; color: string; hideText?: boolean; target: number; text: string }) {
    super(slideConfig);
    this._baseClassName = "panel-jumptospace";
  }

  // Getters

  get text(): string {
    if (this._hideText) {
      return "";
    } else {
      return this._text;
    }
  }

  get originalText(): string {
    return this._text;
  }

  get description(): string {
    if (this._hideText) {
      return `${this._text} to...`;
    } else {
      return `${this._text}!`;
    }
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
