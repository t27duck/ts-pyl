import { Slide } from "../Slide";
import { SlideConfig } from "../types";
import { Player } from "../Player";
import { extractPrize } from "../config";

export class Prize extends Slide {
  constructor(slideConfig: SlideConfig) {
    super(slideConfig);
    this.setNextPrizeValues();
  }

  // Getters

  get type(): string {
    return "prize";
  }

  get text(): string {
    return this.slideConfig.text || "UKNOWN";
  }

  get description(): string {
    return `${this.text} worth $${this.value}`;
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addScore(this.value);
    this.setNextPrizeValues();
  }

  setNextPrizeValues(round = this.slideConfig.round || 1): void {
    const prize = extractPrize(round);
    this.slideConfig.text = prize.text;
    this.slideConfig.value = prize.value;
  }
}
