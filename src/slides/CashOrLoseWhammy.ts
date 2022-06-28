import { Slide } from "../Slide";
import { SlideConfig } from "../types";
import { Player } from "../Player";
import { Game } from "../Game";

export class CashOrLoseWhammy extends Slide {
  private game: Game | undefined;

  constructor(slideConfig: SlideConfig) {
    super(slideConfig);
  }

  // Getters

  get type(): string {
    return "cashorlosewhammy";
  }

  get text(): string {
    return `$${this.slideConfig.value}<br /><span class="panel-line-two">or<br />Lose -1- Whammy</span>`;
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
      game.displayStopMessage(`${this.description}!`, true);
      let button = document.createElement("button");
      button.innerText = `$${this.value}`;
      button.classList.add("choice-button");
      button.dataset.choice = this.value.toString();
      button.addEventListener("click", this.handleChoice);
      game.centerPanel.appendChild(button);

      button = document.createElement("button");
      button.innerText = "Lose 1 Whammy";
      button.classList.add("choice-button");
      button.dataset.choice = "whammy";
      button.addEventListener("click", this.handleChoice);
      game.centerPanel.appendChild(button);
    } else {
      game.currentPlayer.addScore(this.value);
      game.displayStopMessage(`$${this.value}!`, true);
      game.proceedWithRound();
    }
  };

  // Methods

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  applyToPlayer(player: Player): void {}
}
