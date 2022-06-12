import { Panel } from "./Panel";
import { panelLayouts } from "./panelLayouts";
import {
  patterns,
  BOARD_LIGHT_BOUNCE_DURATION,
  BOARD_STOP_FLASH_PANEL_DELAY,
  BOARD_PANEL_FLASH_DURATION,
  BOARD_FLASH_CHOOSE_PANEL_DURATION
} from "./config";
import { enter, leave } from "./el-transition";

export class Board {
  private currentPanelIndex: number = 0;
  private currentPatternIndex: number = 0;
  private currentPattern: number[] = [];
  private lightBouncesForPanelRotation: number = 3;
  private bounces: number = 0;
  private spinInterval: number | undefined;
  private stopped: boolean = false;
  private _panels: Panel[];
  private patterns: Array<number[]>
  private currentInterval: number | undefined;

  constructor(
    private round: number
  ) {
    this.round = round;
    this._panels = panelLayouts[this.round].map(panel => new Panel(panel.identifier, panel.slides));
    this.patterns = patterns();
  }

  // Getters

  get currentPanel(): Panel {
    return this._panels[this.currentPanelIndex];
  }

  get panels(): Panel[] {
    return this._panels;
  }

  // Methods

  resetRound(round: number): void {
    this.round = round;
    this._panels = panelLayouts[this.round].map(panel => new Panel(panel.identifier, panel.slides));
  }

  spin(): void {
    this.stopped = false;
    this.spinInterval = setInterval(() => {
      if (!this.stopped) {
        this.nextLight();
        if (this.bounces >= this.lightBouncesForPanelRotation) {
          this.rotatePanels();
          this.bounces = 0;
        } else {
          this.bounces++;
        }
      }
    }, BOARD_LIGHT_BOUNCE_DURATION);
  }

  stop(): void {
    this.stopped = true;
    if (this.spinInterval) {
      clearInterval(this.spinInterval);
      setTimeout(() => this.flashCurrentPanel(), BOARD_STOP_FLASH_PANEL_DELAY);
    }
  }

  flashCurrentPanel(panelIndex: number | null = null): void {
    let flashCount = 0;
    const panel = panelIndex ? this._panels[panelIndex] : this.currentPanel;

    this._panels.forEach(p => {
      if (panel != p) {
        p.element?.classList.remove("panel-active");
      }
    });

    const flashInterval = setInterval(() => {
      panel.element?.classList.toggle("panel-active");
      flashCount++;
      if (flashCount > 8) {
        clearInterval(flashInterval);
        panel.element?.classList.add("panel-active");
      }
    }, BOARD_PANEL_FLASH_DURATION);
  }

  flashPanelList(panelIndexes: number[]): void {
    let currentIndex = 0;
    this.currentInterval = setInterval(() => {
      if (this.currentInterval) {
        panelIndexes.forEach((panelIndex, index) => {
          if (index == currentIndex) {
            this._panels[panelIndex - 1].element?.classList.add("panel-active");
          } else {
            this._panels[panelIndex - 1].element?.classList.remove("panel-active");
          }
        });

        currentIndex++;
        if (currentIndex >= panelIndexes.length) {
          currentIndex = 0;
        }
      }
    }, BOARD_FLASH_CHOOSE_PANEL_DURATION);
  }

  async revealPanels(): Promise<void> {
    let interval: number;
    let panelIndex = 0;
    return new Promise<void>((resolve) => {
      interval = setInterval(() => {
        const panel = this._panels[panelIndex];
        panel.displaySlide();
        panelIndex++;
        if (panelIndex >= this._panels.length) {
          resolve();
          clearInterval(interval);
        }
      }, 200);
    });
  }

  allLightsOn(): void {
    this._panels.forEach(panel => {
      panel.element?.classList.add("panel-active");
    });
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
      if (this.currentPattern[this.currentPatternIndex] - 1 == index) {
        panel.element?.classList.add("panel-active");
        this.currentPanelIndex = index;
      } else {
        panel.element?.classList.remove("panel-active");
      }
    });
  }

  displayPanels(display: string = ""): void {
    this._panels.forEach(panel => {
      panel.displaySlide(display);
    });
  }

  rotatePanels(): void {
    this._panels.forEach(panel => {
      const innerElement = panel.innerElement;
      if (innerElement) {
        enter(innerElement, "slide").then(() => {
          panel.next();
          panel.displaySlide();
          leave(innerElement, "slide");
        });
      }
    });
  }
}
