import { Slide } from "../Slide";
import { Player } from "../Player";

export class Cash extends Slide {
  constructor(slideConfig: { color: string; value: number }) {
    super(slideConfig);
    this._baseClassName = "panel-cash";
  }

  // Getters

  get text(): string {
    return `$${this._value}`;
  }

  get originalText(): string {
    return this.text;
  }

  get description(): string {
    return this.text;
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addScore(this._value);
  }
}
