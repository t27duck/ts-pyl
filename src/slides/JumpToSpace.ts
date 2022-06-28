import { Slide } from "../Slide";
import { SlideConfig } from "../types";
import { Player } from "../Player";
import { Game } from "../Game";

export class JumpToSpace extends Slide {
  constructor(slideConfig: SlideConfig) {
    super(slideConfig);
  }

  // Getters

  get baseClassName(): string {
    return "panel-jumptospace";
  }

  get text(): string {
    if (this.slideConfig.hideText) {
      return "";
    } else {
      return `${this.slideConfig.text}`;
    }
  }

  get description(): string {
    if (this.slideConfig.hideText) {
      return `${this.slideConfig.text} to...`;
    } else {
      return `${this.slideConfig.text}!`;
    }
  }

  callback = (game: Game) => {
    game.displayStopMessage(this.description, true);
    setTimeout(() => {
      const targetIndex = this.target - 1;
      game.processResult(targetIndex, false);
      game.board.flashCurrentPanel(targetIndex);
      game.proceedWithRound();
    }, 1800);
  };

  // Methods

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  applyToPlayer(player: Player): void {}
}
