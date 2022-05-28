import { Slide } from "./Slide";

export class Panel {
  private currentSlideIndex: number = 0;
  element: HTMLElement | null;
  innerElement: HTMLElement | null | undefined;

  constructor(
    identifier: string,
    private slides: Slide[],
  ) {
    this.slides = slides;
    this.element = document.querySelector(identifier);
    this.innerElement = this.element?.querySelector(".inner-panel");
    this.currentSlideIndex = Math.floor(Math.random() * this.slides.length);
    this.displaySlide();
  }

  // Getters

  get currentSlide(): Slide {
    return this.slides[this.currentSlideIndex];
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

  displaySlide(): void {
    if (this.element) {
    }
    if (this.innerElement) {
      if (this.currentSlide.type == "cash" || this.currentSlide.type == "cash_and_spin") {
        this.innerElement.classList.add("panel-cash");
      } else {
        this.innerElement.classList.remove("panel-cash");
      }
      this.innerElement.innerHTML = this.currentSlide.text;
      this.innerElement.style.backgroundColor = this.currentSlide.color;
    }
  }
}
