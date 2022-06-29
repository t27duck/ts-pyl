import { Slide } from "../Slide";
import { Player } from "../Player";

export class Whammy extends Slide {
  constructor(slideConfig: { className: string }) {
    super(slideConfig);
    this._baseClassName = "panel-whammy";
    this._color = "#FFFF99";
  }

  // Getters

  get selectionText(): string {
    return "A Whammy";
  }

  get description(): string {
    return "a Whammy";
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addWhammy();
    player.clearScore();
    if (player.whammies < 4 && player.passedSpins > 0) {
      player.addAddEarnedSpins(player.passedSpins);
      player.passedSpins = 0;
    }
    if (player.whammies >= 4) {
      player.earnedSpins = 0;
      player.passedSpins = 0;
    }
  }
}
