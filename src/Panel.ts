import { Slide } from "./Slide";

export class Panel {
  private currentSlideIndex = 0;
  private htmlElement: HTMLElement;
  private innerHtmlElement: HTMLElement;

  constructor(private identifier: string, private slides: Slide[]) {
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

  get innerElement(): HTMLElement {
    return this.innerHtmlElement;
  }

  // Methods

  next(): Slide {
    return Math.floor(Math.random() * 2) == 0 ? this.previousSlide() : this.nextSlide();
  }

  nextSlide(): Slide {
    this.currentSlideIndex++;
    if (this.currentSlideIndex >= this.slides.length) {
      this.currentSlideIndex = 0;
    }
    return this.currentSlide;
  }

  previousSlide(): Slide {
    this.currentSlideIndex--;
    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.slides.length - 1;
    }
    return this.currentSlide;
  }

  displaySlide(displayType = ""): void {
    this.currentSlide.display(this.innerElement, displayType);
  }
}
