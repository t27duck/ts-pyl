import { Panel } from "./Panel";
import { panelLayouts } from "./panelLayouts";
import {
  patterns,
  BOARD_LIGHT_BOUNCE_DURATION,
  BOARD_STOP_FLASH_PANEL_DELAY,
  BOARD_PANEL_FLASH_DURATION,
  BOARD_FLASH_CHOOSE_PANEL_DURATION,
  LIGHT_BOUNCES_FOR_PANEL_ROTATION,
  START_OF_ROUND_SLIDE_DURATION,
  END_OF_GAME_FLASH_DURATION
} from "./config";

export class Board {
  private currentPanelIndex = 0;
  private currentPatternIndex = 0;
  private currentPattern: number[] = [];
  private bounces = 0; // A counter of number of light bounces between panel rotations.
  private currentInterval: number | undefined;
  private stopped = false;
  private _panels: Panel[];
  private patterns: Array<number[]>;

  constructor(private round: number) {
    this.round = round;
    this._panels = panelLayouts[this.round].map((panel) => new Panel(panel.identifier, panel.slides));
    this.patterns = patterns();
  }

  // Getters

  get currentPanel(): Panel {
    return this._panels[this.currentPanelIndex];
  }

  get panels(): Panel[] {
    return this._panels;
  }

  get totalRoundAmount(): number {
    return this._panels.reduce((sum, panel) => sum + panel.slidesSum, 0);
  }

  // Methods

  // Resets panels to match the given round.
  resetRound(round: number): void {
    this.round = round;
    this._panels = panelLayouts[this.round].map((panel) => new Panel(panel.identifier, panel.slides));
  }

  // Starts an interval to rotate panels and move the light over the current pattern.
  spin(): void {
    if (this.stopped) {
      this.bounceAndRotate();
    }
    this.stopped = false;
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
    this.currentInterval = setInterval(() => {
      this.bounceAndRotate();
    }, BOARD_LIGHT_BOUNCE_DURATION);
  }

  // Rotates the light over panels but does not rotate panel slides.
  // Used to start the round.
  spinLightOnly(): void {
    this.stopped = true;
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
    this.currentInterval = setInterval(() => {
      this.nextLight();
    }, BOARD_LIGHT_BOUNCE_DURATION);
  }

  // Stops board
  stop(): void {
    this.stopped = true;
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      setTimeout(() => this.flashCurrentPanel(), BOARD_STOP_FLASH_PANEL_DELAY);
    }
  }

  // Move the light to the next panel. After X bounces, rotate all panel slides.
  bounceAndRotate(): void {
    if (!this.stopped) {
      if (this.bounces >= LIGHT_BOUNCES_FOR_PANEL_ROTATION) {
        this._panels.forEach((panel) => panel.rotate());
        this.bounces = 0;
      } else {
        this.bounces++;
      }
      this.nextLight();
    }
  }

  // Flashes a panel over an interval after landing on it.
  flashCurrentPanel(panelIndex: number | null = null): void {
    let flashCount = 0;
    const panel = panelIndex ? this._panels[panelIndex] : this.currentPanel;

    this._panels.forEach((p) => {
      if (panel != p) {
        p.element.classList.remove("panel-active");
      }
    });

    // Flashing the stopped on panel can run while other animations happen.
    // Use an independent interval to not colide with any existing ones.
    const flashInterval = setInterval(() => {
      panel.element.classList.toggle("panel-active");
      flashCount++;
      if (flashCount > 8) {
        clearInterval(flashInterval);
        panel.element.classList.add("panel-active");
      }
    }, BOARD_PANEL_FLASH_DURATION);
  }

  // Given a list of panel indexes, flash their lights in order.
  // Used for slides that give the user an option to pick a panel to land on.
  flashPanelList(panelIndexes: number[]): void {
    let currentIndex = 0;
    this.currentInterval = setInterval(() => {
      if (this.currentInterval) {
        panelIndexes.forEach((panelIndex, index) => {
          if (index == currentIndex) {
            this._panels[panelIndex - 1].element.classList.add("panel-active");
          } else {
            this._panels[panelIndex - 1].element.classList.remove("panel-active");
          }
        });

        currentIndex++;
        if (currentIndex >= panelIndexes.length) {
          currentIndex = 0;
        }
      }
    }, BOARD_FLASH_CHOOSE_PANEL_DURATION);
  }

  // Transitions panels to or from background only and graphics over an interval.
  // Mainly used for the start and end of a round.
  async revealPanels(displayType = ""): Promise<void> {
    let interval: number;
    let panelIndex = 0;
    return new Promise<void>((resolve) => {
      interval = setInterval(() => {
        const panel = this._panels[panelIndex];
        panel.displaySlide(displayType);
        panelIndex++;
        if (panelIndex >= this._panels.length) {
          resolve();
          clearInterval(interval);
        }
      }, START_OF_ROUND_SLIDE_DURATION);
    });
  }

  // Flashes lights on all panels on and off at the same time over an internval.
  // Used for the game over state.
  allLightsFlash(): void {
    let counter = 0;
    this.clearCurrentInterval();
    this.currentInterval = setInterval(() => {
      counter++;
      if (this.currentInterval) {
        if (counter % 2 == 0) {
          this.allLights(false);
        } else {
          this.allLights(true);
        }
      }
    }, END_OF_GAME_FLASH_DURATION);
  }

  // Sets the status of all panel lights. true = on; false = off.
  allLights(status: boolean): void {
    if (status) {
      this._panels.forEach((panel) => panel.element.classList.add("panel-active"));
    } else {
      this._panels.forEach((panel) => panel.element.classList.remove("panel-active"));
    }
  }

  clearCurrentInterval(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
  }

  // Moves the light to the next position in the current pattern.
  // Resets and picks a new pattern if current pattern is over.
  nextLight(): void {
    this.currentPatternIndex++;
    if (this.currentPatternIndex >= this.currentPattern.length) {
      this.currentPatternIndex = 0;
      this.currentPattern = this.patterns[Math.floor(Math.random() * this.patterns.length)];
    }
    this._panels.forEach((panel, index) => {
      if (this.currentPattern[this.currentPatternIndex] - 1 === index) {
        panel.element.classList.add("panel-active");
        this.currentPanelIndex = index;
      } else {
        panel.element.classList.remove("panel-active");
      }
    });
  }

  // Sets all panels to show their background color only without any other graphics.
  displayPanelsBackgroundOnly(): void {
    this._panels.forEach((panel) => {
      panel.displaySlide("backgroundOnly");
    });
  }
}
