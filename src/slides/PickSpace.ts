import { Slide } from "../Slide";
import { SlideConfig } from "../types";
import { Player } from "../Player";
import { Game } from "../Game";

export class PickSpace extends Slide {
  constructor(slideConfig: SlideConfig) {
    super(slideConfig);
  }

  // Getters

  get type(): string {
    return "pickspace";
  }

  get text(): string {
    if (this.slideConfig.hideText) {
      return "";
    } else if (this.slideConfig.wordPerLine) {
      return `${this.slideConfig.text}`.split(" ").join("<br />");
    } else {
      return `${this.slideConfig.text}`;
    }
  }

  get description(): string {
    return `${this.slideConfig.text}!`;
  }

  callback = (game: Game) => {
    game.board.flashPanelList(this.choices);
    this.choices.forEach((pIndex) => {
      const button = document.createElement("button");
      button.innerText = game.board.panels[pIndex - 1].currentSlide.description;
      button.classList.add("choice-button");
      button.dataset.panelIndex = pIndex.toString();
      button.addEventListener("click", game.handleMoveChoice);
      game.centerPanel.appendChild(button);
    });
  };

  // Methods

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  applyToPlayer(player: Player): void {}
}
