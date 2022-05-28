import { SlideConfig } from "./types";

export class Slide {
  constructor(
    private slideConfig: SlideConfig
  ) {
    this.slideConfig = slideConfig;
  }

  // Getters

  get type(): string {
    return this.slideConfig.type;
  }

  get text(): string {
    if (this.type == "cash_and_spin") {
      return `${this.slideConfig.text}<br /><span class="panel-line-two">+<br />One Spin</span>`;
    }

    if (this.slideConfig.secondaryText) {
      return `${this.slideConfig.text}<br /><span class="panel-line-two">${this.slideConfig.secondaryText}</span>`;
    }

    return this.slideConfig.text;
  }

  get color(): string {
    return this.slideConfig.color;
  }
}
