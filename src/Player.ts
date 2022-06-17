export class Player {
  private _score: number = 0;
  private _earnedSpins: number = 0
  private _passedSpins: number = 0
  private _whammies: number = 0;
  private _element: HTMLElement | undefined = undefined;
  private _earnedSpinsElement: HTMLElement | undefined = undefined;
  private _passedSpinsElement: HTMLElement | undefined = undefined;
  private _scoreElement: HTMLElement | undefined = undefined;

  constructor(
    private identifier: string,
    private _name: string,
    private _number: number
  ) {
    this.identifier = identifier;
    this._name = _name;
    this._number = _number;
  }

  // Getters

  get name(): string {
    return this._name;
  }

  get number(): number {
    return this._number;
  }

  get element(): HTMLElement {
    if (!this._element) {
      this._element = document.querySelector(this.identifier) as HTMLElement;
    }

    return this._element;
  }

  get earnedSpinsElement(): HTMLElement {
    if (!this._earnedSpinsElement) {
      this._earnedSpinsElement = this.element?.querySelector(".player-earned-spins") as HTMLElement;
    }

    return this._earnedSpinsElement;
  }

  get passedSpinsElement(): HTMLElement {
    if (!this._passedSpinsElement) {
      this._passedSpinsElement = this.element?.querySelector(".player-passed-spins") as HTMLElement;
    }

    return this._passedSpinsElement;
  }

  get scoreElement(): HTMLElement {
    if (!this._scoreElement) {
      this._scoreElement = this.element?.querySelector(".player-score") as HTMLElement;
    }

    return this._scoreElement;
  }

  get score(): number {
    return this._score;
  }

  get whammies(): number {
    return this._whammies;
  }

  get earnedSpins(): number {
    return this._earnedSpins;
  }

  get passedSpins(): number {
    return this._passedSpins;
  }

  get canUseEarnedSpins(): boolean {
    return this.whammies < 4 && this._passedSpins == 0 && this._earnedSpins > 0;
  }

  get totalSpins(): number {
    return this._earnedSpins + this._passedSpins;
  }

  get outOfGame(): boolean {
    return this._whammies >= 4;
  }

  // Setters

  set earnedSpins(value: number) {
    this._earnedSpins = value;
  }

  set passedSpins(value: number) {
    this._passedSpins = value;
  }

  // Methods

  displaySpins(): void {
    this.earnedSpinsElement.innerHTML = this._earnedSpins.toString();
    this.passedSpinsElement.innerHTML = this._passedSpins.toString();
  }

  displayScore(): void {
    this.scoreElement.innerHTML = `$${this._score}`;
  }

  displayWhammies(): void {
    this.element.querySelectorAll(".player-whammy-icon").forEach((whammyIcon, index) => {
      if (index < this._whammies) {
        whammyIcon.classList.remove("player-whammy-icon-hidden");
      } else {
        whammyIcon.classList.add("player-whammy-icon-hidden");
      }
    });
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

  clearScore(): void {
    this._score = 0;
    this.displayScore();
  }

  addAddEarnedSpins(earnedSpins: number): void {
    this._earnedSpins += earnedSpins;
    this.displaySpins();
  }

  addAddPassedSpins(passedSpins: number): void {
    this._passedSpins += passedSpins;
    this.displaySpins();
  }

  addWhammy(amount: number = 1): void {
    this._whammies += amount;
    this.displayWhammies();
  }
}
