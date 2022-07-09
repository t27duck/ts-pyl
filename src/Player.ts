export class Player {
  private _score = 0;
  private _earnedSpins = 0;
  private _passedSpins = 0;
  private _whammies = 0;
  private _element: HTMLElement;
  private _earnedSpinsElement: HTMLElement;
  private _passedSpinsElement: HTMLElement;
  private _scoreElement: HTMLElement;

  constructor(private identifier: string, private _name: string, private _number: number) {
    this.identifier = identifier;
    this._name = _name;
    this._number = _number;
    this._element = document.querySelector(this.identifier) as HTMLElement;
    this._earnedSpinsElement = this._element.querySelector(".player-earned-spins") as HTMLElement;
    this._passedSpinsElement = this._element.querySelector(".player-passed-spins") as HTMLElement;
    this._scoreElement = this._element.querySelector(".player-score") as HTMLElement;
  }

  // Getters / Setters

  get name(): string {
    return this._name;
  }

  get number(): number {
    return this._number;
  }

  get scoreElement(): HTMLElement {
    return this._scoreElement;
  }

  get score(): number {
    return this._score;
  }

  set score(amount: number) {
    this._score = amount;
  }

  get whammies(): number {
    return this._whammies;
  }

  set whammies(amount: number) {
    this._whammies = amount;
  }

  get earnedSpins(): number {
    return this._earnedSpins;
  }

  set earnedSpins(value: number) {
    this._earnedSpins = value;
  }

  get passedSpins(): number {
    return this._passedSpins;
  }

  set passedSpins(value: number) {
    this._passedSpins = value;
  }

  get canUseEarnedSpins(): boolean {
    return this.whammies < 4 && this._passedSpins == 0 && this._earnedSpins > 0;
  }

  get totalSpins(): number {
    return this._earnedSpins + this._passedSpins;
  }

  // Methods

  refreshOutput(): void {
    this._earnedSpinsElement.innerHTML = this._earnedSpins.toString();
    this._passedSpinsElement.innerHTML = this._passedSpins.toString();
    this._scoreElement.innerHTML = `$${this._score}`;
    this._element.querySelectorAll(".player-whammy-icon").forEach((whammyIcon, index) => {
      if (index < this._whammies) {
        whammyIcon.classList.remove("player-whammy-icon-hidden");
      } else {
        whammyIcon.classList.add("player-whammy-icon-hidden");
      }
    });
  }

  // Passed spins must be used before earned spins.
  useSpin(): void {
    if (this._passedSpins > 0) {
      this._passedSpins--;
    } else {
      this._earnedSpins--;
    }
    this.refreshOutput();
  }
}
