import { Slide } from "../Slide";
import { Player } from "../Player";
import { extractPrize } from "../config";

export class Prize extends Slide {
  private _round: number;
  private _selectionText = "";

  constructor(slideConfig: { round: number; color: string }) {
    super(slideConfig);
    this._round = slideConfig.round;
    this.setNextPrizeValues();
    this._baseClassName = "panel-prize";
  }

  // Getters

  get selectionText(): string {
    return this._selectionText;
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
    if (prize.prefix) {
      this._description = `${prize.prefix} ${this.text} worth $${this._value}`;
      this._selectionText = `${prize.prefix} ${this.text}`;
    } else {
      this._description = `${this.text} worth $${this._value}`;
      this._selectionText = this.text;
    }
  }
}
