import { Slide } from "./Slide";

export class Panel {
  private currentSlideIndex: number = 0;
  private htmlElement: HTMLElement | null = null;
  private innerHtmlElement: HTMLElement | null | undefined;

  constructor(
    private identifier: string,
    private slides: Slide[],
  ) {
    this.slides = slides;
    this.identifier = identifier;
    this.currentSlideIndex = Math.floor(Math.random() * this.slides.length);
  }

  // Getters

  get currentSlide(): Slide {
    return this.slides[this.currentSlideIndex];
  }

  get element(): HTMLElement | null {
    if (!this.htmlElement) {
      this.htmlElement = document.querySelector(this.identifier);
    }
    return this.htmlElement;
  }

  get innerElement(): HTMLElement | null | undefined {
    if (!this.innerHtmlElement) {
      this.innerHtmlElement = this.element?.querySelector(".inner-panel");
    }
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

  displaySlide(display: string = ""): void {
    if (this.innerElement) {
      if (display === "backgroundOnly") {
        this.innerElement.innerHTML = "";
        this.innerElement.setAttribute("class", "inner-panel");
      } else {
        this.innerElement.setAttribute("class", `inner-panel panel-${this.currentSlide.type}`);
        if (this.currentSlide.className) {
          this.innerElement.classList.add(this.currentSlide.className);
        }
        if (this.currentSlide.hideText) {
          this.innerElement.innerHTML = "";
        } else {
          this.innerElement.innerHTML = this.currentSlide.text;
        }
      }

      this.innerElement.style.backgroundColor = this.currentSlide.color;
    }
  }
}
