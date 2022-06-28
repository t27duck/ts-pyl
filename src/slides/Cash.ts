import { Slide } from "../Slide";
import { SlideConfig } from "../types";
import { Player } from "../Player";

export class Cash extends Slide {
  constructor(slideConfig: SlideConfig) {
    super(slideConfig);
  }

  // Getters

  get baseClassName(): string {
    return "panel-cash";
  }

  get text(): string {
    return `$${this.slideConfig.value}`;
  }

  get description(): string {
    return this.text;
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addScore(this.value);
  }
}
