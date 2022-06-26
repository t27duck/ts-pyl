import { SlideConfig } from "./types";
import { Player } from "./Player";

export class Slide {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: any = undefined;

  constructor(protected slideConfig: SlideConfig) {
    this.slideConfig = slideConfig;
  }

  // Getters

  get type(): string {
    return this.slideConfig.type;
  }

  get text(): string {
    if (this.type == "cashandspin") {
      return `${this.slideConfig.text}<br /><span class="panel-line-two">+<br />One Spin</span>`;
    }

    if (this.type == "pickacorner") {
      return (this.slideConfig.text || "").split(" ").join("<br />");
    }

    if (this.slideConfig.secondaryText) {
      return `${this.slideConfig.text}<br /><span class="panel-line-two">${this.slideConfig.secondaryText}</span>`;
    }

    return this.slideConfig.text || "";
  }

  get description(): string {
    switch (this.type) {
      case "cashandspin":
        return `$${this.value} and a Spin`;
      case "cashorlosewhammy":
        return `$${this.value} or Lose One Whammy`;
      default:
        return this.slideConfig.text || "";
    }
  }

  get color(): string {
    return this.slideConfig.color || "";
  }

  get value(): number {
    return this.slideConfig.value || 0;
  }

  get target(): number {
    return this.slideConfig.target || 0;
  }

  get hideText(): boolean {
    return this.slideConfig.hideText === true;
  }

  get choices(): number[] {
    return this.slideConfig.choices || [];
  }

  get className(): string | undefined {
    return this.slideConfig.className;
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addScore(this.value);
  }
}
