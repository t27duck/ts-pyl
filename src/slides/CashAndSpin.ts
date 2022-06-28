import { Slide } from "../Slide";
import { SlideConfig } from "../types";
import { Player } from "../Player";

export class CashAndSpin extends Slide {
  constructor(slideConfig: SlideConfig) {
    super(slideConfig);
  }

  // Getters

  get baseClassName(): string {
    return "panel-cashandspin";
  }

  get text(): string {
    return `$${this.value}<br /><span class="panel-line-two">+<br />One Spin</span>`;
  }

  get description(): string {
    return `$${this.value} and a Spin`;
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addScore(this.value);
    player.addAddEarnedSpins(1);
  }
}
