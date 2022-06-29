import { Slide } from "../Slide";
import { Player } from "../Player";

export class CashAndSpin extends Slide {
  constructor(slideConfig: { color: string; value: number }) {
    super(slideConfig);
  }

  // Getters

  get baseClassName(): string {
    return "panel-cashandspin";
  }

  get color(): string {
    return this._color;
  }

  get text(): string {
    return `$${this.value}<br /><span class="panel-line-two">+<br />One Spin</span>`;
  }

  get originalText(): string {
    return `$${this.value} and a Spin`;
  }

  get description(): string {
    return `$${this.value} and a Spin`;
  }

  get value(): number {
    return this._value;
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addScore(this.value);
    player.addAddEarnedSpins(1);
  }
}
