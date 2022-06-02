export class Player {
  private _score: number = 0;
  private _earnedSpins: number = 0
  private _whammies: number = 0;
  private _element: HTMLElement | null = null;
  private _earnedSpinsElement: HTMLElement | null | undefined = null;
  private _scoreElement: HTMLElement | null | undefined = null;

  constructor(
    private identifier: string,
  ) {
    this.identifier = identifier;
  }

  // Getters
  get earnedSpins(): number {
    return this._earnedSpins;
  }

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

  get scoreElement(): HTMLElement | null | undefined {
    if (!this._scoreElement) {
      this._scoreElement = this.element?.querySelector(".player-score");
    }

    return this._scoreElement;
  }

  // Methods

  displayEarnedSpins(): void {
    if (this.earnedSpinsElement) {
      this.earnedSpinsElement.innerHTML = this.earnedSpins.toString();
    }
  }

  displayScore(): void {
    if (this.scoreElement) {
      this.scoreElement.innerHTML = this._score.toString();
    }
  }
}
