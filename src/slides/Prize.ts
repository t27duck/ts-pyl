import { Slide } from "../Slide";
import { Player } from "../Player";
import { extractPrize } from "../config";

export class Prize extends Slide {
  private _round: number;

  constructor(slideConfig: { round: number; color: string }) {
    super(slideConfig);
    this._round = slideConfig.round;
    this.setNextPrizeValues();
  }

  // Getters

  get baseClassName(): string {
    return "panel-prize";
  }

  get color(): string {
    return this._color;
  }

  get text(): string {
    return this._text;
  }

  get originalText(): string {
    return this.text;
  }

  get description(): string {
    return `${this.text} worth $${this._value}`;
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addScore(this.value);
    this.setNextPrizeValues();
  }

  setNextPrizeValues(round = this._round || 1): void {
    const prize = extractPrize(round);
    this._text = prize.text;
    this._value = prize.value;
  }
}
