import { Slide } from "../Slide";
import { Player } from "../Player";
import { Game } from "../Game";

export class PickSpace extends Slide {
  private game: Game | undefined;

  constructor(slideConfig: {
    className?: string;
    color: string;
    hideText?: boolean;
    choices: Array<number>;
    text: string;
    wordPerLine?: boolean;
  }) {
    super(slideConfig);
  }

  // Getters

  get baseClassName(): string {
    return "panel-pickspace";
  }

  get text(): string {
    if (this._hideText) {
      return "";
    } else if (this._wordPerLine) {
      return `${this._text}`.split(" ").join("<br />");
    } else {
      return `${this._text}`;
    }
  }

  get description(): string {
    return `${this._text}!`;
  }

  handleMoveChoice = (event: Event): void => {
    if (!this.game) {
      return;
    }

    const target = event.target as HTMLButtonElement;
    const panelIndex = target.dataset.panelIndex;
    if (panelIndex) {
      const realPanelIndex = parseInt(panelIndex) - 1;
      this.game.board.clearCurrentInterval();
      this.game.board.flashCurrentPanel(realPanelIndex);
      this.game.processResult(realPanelIndex, false);
    }
  };

  callback = (game: Game) => {
    this.game = game;
    game.displayStopMessage(this.description, true);
    game.board.flashPanelList(this._choices);
    this._choices.forEach((pIndex) => {
      const button = document.createElement("button");
      button.innerText = game.board.panels[pIndex - 1].currentSlide.originalText;
      button.classList.add("choice-button");
      button.dataset.panelIndex = pIndex.toString();
      button.addEventListener("click", this.handleMoveChoice);
      game.centerPanel.appendChild(button);
    });
  };

  // Methods

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  applyToPlayer(player: Player): void {}
}
