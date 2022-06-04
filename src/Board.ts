import { Panel } from "./Panel";
import { panelLayouts } from "./panelLayouts";
import { patterns } from "./config";

export class Board {
  private currentPanelIndex: number = 0;
  private currentPatternIndex: number = 0;
  private currentPattern: number[] = [];
  private lightBouncesForPanelRotation: number = 3;
  private bounces: number = 0;
  private spinInterval: number | undefined;
  private stopped: boolean = false;
  private panels: Panel[];
  private patterns: Array<number[]>

  constructor(
    private round: number
  ) {
    this.round = round;
    this.panels = panelLayouts[this.round].map(panel => new Panel(panel.identifier, panel.slides));
    this.patterns = patterns();
  }

  // Getters

  get currentPanel(): Panel {
    return this.panels[this.currentPanelIndex];
  }

  // Methods

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
    }, 250);
  }

  stop(): void {
    this.stopped = true;
    if (this.spinInterval) {
      clearInterval(this.spinInterval);
      setTimeout(() => this.flashCurrentPanel(), 300);
    }
  }

  flashCurrentPanel(): void {
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      this.currentPanel.element?.classList.toggle("panel-active");
      flashCount++;
      if (flashCount > 7) {
        clearInterval(flashInterval);
      }
    }, 200);
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
        this.currentPanelIndex = index;
      } else {
        panel.element?.classList.remove("panel-active");
      }
    });
  }

  displayPanels(): void {
    this.panels.forEach(panel => {
      panel.displaySlide();
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
}
