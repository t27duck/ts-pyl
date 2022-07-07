import { Slide } from "../Slide";
import { Player } from "../Player";
import { Game } from "../Game";
import { buildButton } from "../utils";

export class CashOrLoseWhammy extends Slide {
  private game: Game | undefined;

  constructor(slideConfig: { color: string; value: number }) {
    super(slideConfig);
    this._baseClassName = "panel-cashorlosewhammy";
  }

  // Getters

  get text(): string {
    return `$${this._value}<br /><span class="panel-line-two">or<br />Lose -1- Whammy</span>`;
  }

  get description(): string {
    return `$${this._value} or Lose One Whammy`;
  }

  get selectionText(): string {
    return this.description;
  }

  handleChoice = (event: Event): void => {
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
    if (game.currentPlayer.whammies > 0) {
      const buttons = [];
      buttons.push(buildButton(`$${this._value}`, this.handleChoice, { choice: this._value.toString() }));
      buttons.push(buildButton("Lose 1 Whammy", this.handleChoice, { choice: "whammy" }));
      game.displayMessage(`Stopped on ${this.description}...`, buttons);
    } else {
      game.currentPlayer.score += this._value;
      game.displayStopMessage(`$${this._value}!`, true);
      game.proceedWithRound();
    }
  };

  // Methods

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  applyToPlayer(player: Player): void {}
}
