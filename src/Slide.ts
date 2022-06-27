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
    if (this.type == "pickacorner") {
      return (this.slideConfig.text || "").split(" ").join("<br />");
    }

    return this.slideConfig.text || "";
  }

  get description(): string {
    return this.slideConfig.text || "";
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
