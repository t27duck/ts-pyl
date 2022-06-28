import { Slide } from "../Slide";
import { Player } from "../Player";

export class Whammy extends Slide {
  private _className: string;

  constructor(slideConfig: { className: string }) {
    super(slideConfig);
    this._className = slideConfig.className;
  }

  // Getters

  get baseClassName(): string {
    return "panel-whammy";
  }

  get className(): string {
    return this._className;
  }

  get text(): string {
    return "";
  }

  get originalText(): string {
    return "A Whammy";
  }

  get description(): string {
    return "a Whammy";
  }

  get color(): string {
    return "#ffff99";
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
