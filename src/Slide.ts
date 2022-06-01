import { SlideConfig } from "./types";
import { extractPrize } from "./config";

export class Slide {
  constructor(
    private slideConfig: SlideConfig
  ) {
    this.slideConfig = slideConfig;
    this.resolvePrizeValues();
  }

  // Methods

  resolvePrizeValues(): void {
    if (this.type === "prize") {
      const prize = extractPrize();
      this.slideConfig.text = prize.text;
      this.slideConfig.value = prize.value;
    }
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
      return this.slideConfig.text.split(" ").join("<br />");
    }

    if (this.slideConfig.secondaryText) {
      return `${this.slideConfig.text}<br /><span class="panel-line-two">${this.slideConfig.secondaryText}</span>`;
    }

    return this.slideConfig.text;
  }

  get color(): string {
    return this.slideConfig.color;
  }

  get hideText(): boolean {
    return this.slideConfig.hideText === true;
  }

  get className(): string | undefined {
    return this.slideConfig.className;
  }
}
