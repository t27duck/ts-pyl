import { Slide } from "../Slide";
import { Player } from "../Player";

export class Cash extends Slide {
  private _color: string;
  private _value: number;

  constructor(slideConfig: { color: string; value: number }) {
    super(slideConfig);
    this._color = slideConfig.color;
    this._value = slideConfig.value;
  }

  // Getters

  get baseClassName(): string {
    return "panel-cash";
  }

  get color(): string {
    return this._color;
  }

  get text(): string {
    return `$${this._value}`;
  }

  get originalText(): string {
    return this.text;
  }

  get description(): string {
    return this.text;
  }

  get value(): number {
    return this._value;
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addScore(this.value);
  }
}
