import { Slide } from "../Slide";
import { Player } from "../Player";
import { extractPrize } from "../config";

export class Prize extends Slide {
  private _round: number;

  constructor(slideConfig: { round: number; color: string }) {
    super(slideConfig);
    this._round = slideConfig.round;
    this.setNextPrizeValues();
    this._baseClassName = "panel-prize";
  }

  // Getters

  get description(): string {
    return `${this.text} worth $${this._value}`;
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addScore(this._value);
    this.setNextPrizeValues();
  }

  setNextPrizeValues(round = this._round || 1): void {
    const prize = extractPrize(round);
    this._text = prize.text;
    this._value = prize.value;
  }
}
