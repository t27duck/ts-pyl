import { Slide } from "../Slide";
import { Player } from "../Player";

export class CashAndSpin extends Slide {
  constructor(slideConfig: { color: string; value: number }) {
    super(slideConfig);
    this._baseClassName = "panel-cashandspin";
  }

  // Getters

  get text(): string {
    return `$${this._value}<br /><span class="panel-line-two">+<br />One Spin</span>`;
  }

  get selectionText(): string {
    return `$${this._value} and a Spin`;
  }

  get description(): string {
    return `$${this._value} and a Spin`;
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.score += this._value;
    player.earnedSpins += 1;
  }
}
