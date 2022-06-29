import { Slide } from "../Slide";
import { Player } from "../Player";

export class Whammy extends Slide {
  constructor(slideConfig: { className: string }) {
    super(slideConfig);
  }

  // Getters

  get baseClassName(): string {
    return "panel-whammy";
  }

  get color(): string {
    return "#ffff99";
  }

  get originalText(): string {
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
