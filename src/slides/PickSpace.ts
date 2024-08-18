import { Slide } from "../Slide";
import { Player } from "../Player";
import { Game } from "../Game";
import { buildButton } from "../utils";

export class PickSpace extends Slide {
  private game: Game | undefined;

  constructor(slideConfig: { className?: string; color: string; choices: Array<number>; text: string }) {
    super(slideConfig);
    this._baseClassName = "panel-pickspace";
  }

  // Getters

  get text(): string {
    return "";
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
    game.board.flashPanelList(this._choices);
    const buttons = this._choices.map((pIndex) => {
      return buildButton(game.board.panels[pIndex - 1].currentSlide.selectionText, this.handleMoveChoice, {
        panelIndex: pIndex.toString()
      });
    });
    game.displayMessage(`Stopped on ${this.description}...`, buttons);
  };

  // Methods

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyToPlayer(player: Player): void {}
}
