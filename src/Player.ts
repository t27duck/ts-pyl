export class Player {
  private _score: number = 0;
  private _earnedSpins: number = 0
  private _passedSpins: number = 0
  private _whammies: number = 0;
  private _element: HTMLElement | null = null;
  private _earnedSpinsElement: HTMLElement | null | undefined = null;
  private _passedSpinsElement: HTMLElement | null | undefined = null;
  private _scoreElement: HTMLElement | null | undefined = null;

  constructor(
    private identifier: string,
  ) {
    this.identifier = identifier;
  }

  // Getters
  get element(): HTMLElement | null {
    if (!this._element) {
      this._element = document.querySelector(this.identifier);
    }

    return this._element;
  }

  get earnedSpinsElement(): HTMLElement | null | undefined {
    if (!this._earnedSpinsElement) {
      this._earnedSpinsElement = this.element?.querySelector(".player-earned-spins");
    }

    return this._earnedSpinsElement;
  }

  get passedSpinsElement(): HTMLElement | null | undefined {
    if (!this._passedSpinsElement) {
      this._passedSpinsElement = this.element?.querySelector(".player-passed-spins");
    }

    return this._passedSpinsElement;
  }

  get scoreElement(): HTMLElement | null | undefined {
    if (!this._scoreElement) {
      this._scoreElement = this.element?.querySelector(".player-score");
    }

    return this._scoreElement;
  }

  // Methods

  displaySpins(): void {
    if (this.earnedSpinsElement) {
      this.earnedSpinsElement.innerHTML = this._earnedSpins.toString();
    }

    if (this.passedSpinsElement) {
      this.passedSpinsElement.innerHTML = this._passedSpins.toString();
    }
  }

  displayScore(): void {
    if (this.scoreElement) {
      this.scoreElement.innerHTML = this._score.toString();
    }
  }

  useSpin(): void {
    if (this._passedSpins > 0) {
      this._passedSpins--;
    } else {
      this._earnedSpins--;
    }
    this.displaySpins();
  }

  addScore(score: number): void {
    this._score += score;
    this.displayScore();
  }
}
