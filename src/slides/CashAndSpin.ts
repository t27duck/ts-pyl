import { Slide } from "../Slide";
import { Player } from "../Player";

export class CashAndSpin extends Slide {
  private _color: string;
  private _value: number;

  constructor(slideConfig: { color: string; value: number }) {
    super(slideConfig);
    this._color = slideConfig.color;
    this._value = slideConfig.value;
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
    return this.text;
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
