import { Slide } from "./Slide";
import { enter, leave } from "./vendor/el-transition";

export class Panel {
  private currentSlideIndex = 0;
  private htmlElement: HTMLElement;
  private innerHtmlElement: HTMLElement;

  constructor(
    private identifier: string,
    private slides: Slide[]
  ) {
    this.slides = slides;
    this.identifier = identifier;
    this.currentSlideIndex = Math.floor(Math.random() * this.slides.length);
    this.htmlElement = document.querySelector(this.identifier) as HTMLElement;
    this.innerHtmlElement = this.htmlElement.querySelector(".inner-panel") as HTMLElement;
  }

  // Getters

  get currentSlide(): Slide {
    return this.slides[this.currentSlideIndex];
  }

  get element(): HTMLElement {
    return this.htmlElement;
  }

  // Summation of all current values of all slides in the panel.
  get slidesSum(): number {
    return this.slides.reduce((sum, slide) => sum + slide.value, 0);
  }

  // Methods

  // Changes the slide to a new one. Will always transition to a random slide that is not the current one.
  rotate(): void {
    enter(this.innerHtmlElement, "slide").then(() => {
      if (Math.floor(Math.random() * 2) == 0) {
        this.currentSlideIndex--;
        if (this.currentSlideIndex < 0) {
          this.currentSlideIndex = this.slides.length - 1;
        }
      } else {
        this.currentSlideIndex++;
        if (this.currentSlideIndex >= this.slides.length) {
          this.currentSlideIndex = 0;
        }
      }
      this.displaySlide();
      leave(this.innerHtmlElement, "slide");
    });
  }

  // Proxies presenting the current slide
  displaySlide(displayType = ""): void {
    this.currentSlide.display(this.innerHtmlElement, displayType);
  }
}
