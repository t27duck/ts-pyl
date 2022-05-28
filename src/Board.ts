import { Panel } from "./Panel";

export class Board {
  private currentPanelIndex: number = 0;
  private currentPatternIndex: number = 0;
  private currentPattern: number[] = [];
  private lightBouncesForPanelRotation: number = 3;
  private bounces: number = 0;
  private spinInterval: number | undefined;
  private stopped: boolean = false;

  constructor(
    private panels: Panel[],
    private patterns: Array<number[]>
  ) {
    this.panels = panels;
    this.patterns = patterns;
  }

  // Getters

  get currentPanel(): Panel {
    return this.panels[this.currentPanelIndex];
  }

  // Methods

  spin(): void {
    this.stopped = false;
    document.addEventListener("keyup", this.handleKeyUp);
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
    }, 250);
  }

  stop(): void {
    this.stopped = true;
    document.removeEventListener("keyup", this.handleKeyUp);
    if (this.spinInterval) {
      clearInterval(this.spinInterval);
    }
  }

  nextLight(): void {
    this.currentPatternIndex++;
    if (this.currentPatternIndex >= this.currentPattern.length) {
      this.currentPatternIndex = 0;
      this.currentPattern = this.patterns[Math.floor(Math.random() * this.patterns.length)];
    }
    this.panels.forEach((panel, index) => {
      if (this.currentPattern[this.currentPatternIndex] - 1 == index) {
        panel.element?.classList.add("panel-active");
      } else {
        panel.element?.classList.remove("panel-active");
      }
    });
  }

  rotatePanels(): void {
    this.panels.forEach(panel => {
      panel.innerElement?.classList.add("fadeout");
      setTimeout(() => {
        panel.next();
        panel.displaySlide();
        panel.innerElement?.classList.remove("fadeout");
      }, 200);
    });
  }

  handleKeyUp = (event: KeyboardEvent): void => {
    if (event.code === "Space" || event.key === "Space") {
      this.stop();
    }
  }
}
