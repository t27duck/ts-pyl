import { Panel } from "./Panel";
import { panelLayouts } from "./panelLayouts";
import {
  patterns,
  BOARD_LIGHT_BOUNCE_DURATION,
  BOARD_STOP_FLASH_PANEL_DELAY,
  BOARD_PANEL_FLASH_DURATION,
  BOARD_FLASH_CHOOSE_PANEL_DURATION,
  START_OF_ROUND_SLIDE_DURATION,
  END_OF_GAME_FLASH_DURATION
} from "./config";

export class Board {
  private currentPanelIndex = 0;
  private currentPatternIndex = 0;
  private currentPattern: number[] = [];
  private lightBouncesForPanelRotation = 3;
  private bounces = 0;
  private spinInterval: number | undefined;
  private stopped = false;
  private _panels: Panel[];
  private patterns: Array<number[]>;
  private currentInterval: number | undefined;

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

  resetRound(round: number): void {
    this.round = round;
    this._panels = panelLayouts[this.round].map((panel) => new Panel(panel.identifier, panel.slides));
  }

  spin(): void {
    if (this.stopped) {
      this.bounceAndRotate();
    }
    this.stopped = false;
    if (this.spinInterval) {
      clearInterval(this.spinInterval);
    }
    this.spinInterval = setInterval(() => {
      this.bounceAndRotate();
    }, BOARD_LIGHT_BOUNCE_DURATION);
  }

  spinLightOnly(): void {
    this.stopped = true;
    if (this.spinInterval) {
      clearInterval(this.spinInterval);
    }
    this.spinInterval = setInterval(() => {
      this.nextLight();
    }, BOARD_LIGHT_BOUNCE_DURATION);
  }

  stop(): void {
    this.stopped = true;
    if (this.spinInterval) {
      clearInterval(this.spinInterval);
      setTimeout(() => this.flashCurrentPanel(), BOARD_STOP_FLASH_PANEL_DELAY);
    }
  }

  bounceAndRotate(): void {
    if (!this.stopped) {
      if (this.bounces >= this.lightBouncesForPanelRotation) {
        this.rotatePanels();
        this.bounces = 0;
      } else {
        this.bounces++;
      }
      this.nextLight();
    }
  }

  flashCurrentPanel(panelIndex: number | null = null): void {
    let flashCount = 0;
    const panel = panelIndex ? this._panels[panelIndex] : this.currentPanel;

    this._panels.forEach((p) => {
      if (panel != p) {
        p.element.classList.remove("panel-active");
      }
    });

    const flashInterval = setInterval(() => {
      panel.element.classList.toggle("panel-active");
      flashCount++;
      if (flashCount > 8) {
        clearInterval(flashInterval);
        panel.element.classList.add("panel-active");
      }
    }, BOARD_PANEL_FLASH_DURATION);
  }

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

  allLightsFlash(): void {
    let counter = 0;
    this.clearCurrentInterval();
    this.currentInterval = setInterval(() => {
      counter++;
      if (this.currentInterval) {
        counter % 2 == 0 ? this.allLightsOff() : this.allLightsOn();
      }
    }, END_OF_GAME_FLASH_DURATION);
  }

  allLightsOn(): void {
    this._panels.forEach((panel) => panel.element.classList.add("panel-active"));
  }

  allLightsOff(): void {
    this._panels.forEach((panel) => panel.element.classList.remove("panel-active"));
  }

  clearCurrentInterval(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
  }

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

  displayPanels(displayType = ""): void {
    this._panels.forEach((panel) => {
      panel.displaySlide(displayType);
    });
  }

  rotatePanels(): void {
    this._panels.forEach((panel) => panel.rotate());
  }
}
