import { Slide } from "../Slide";
import { Player } from "../Player";
import { Game } from "../Game";

export class JumpToSpace extends Slide {
  private _className: string;
  private _color: string;
  private _hideText: boolean;
  private _target: number;
  private _text: string;

  constructor(slideConfig: { className?: string; color: string; hideText?: boolean; target: number; text: string }) {
    super(slideConfig);
    this._className = slideConfig.className || "";
    this._color = slideConfig.color;
    this._hideText = slideConfig.hideText || false;
    this._target = slideConfig.target;
    this._text = slideConfig.text;
  }

  // Getters

  get baseClassName(): string {
    return "panel-jumptospace";
  }

  get className(): string {
    return this._className;
  }

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

  get color(): string {
    return this._color;
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
