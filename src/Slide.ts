import { Player } from "./Player";

export class Slide {
  protected _className: string;
  protected _color: string;
  protected _hideText: boolean;
  protected _choices: Array<number>;
  protected _text: string;
  protected _wordPerLine: boolean;
  protected _value: number;
  protected _target: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: any = undefined;

  constructor(
    protected slideConfig: {
      className?: string;
      color?: string;
      hideText?: boolean;
      choices?: Array<number>;
      text?: string;
      wordPerLine?: boolean;
      value?: number;
      target?: number;
    }
  ) {
    this.slideConfig = slideConfig;
    this._className = slideConfig.className || "";
    this._color = slideConfig.color || "";
    this._hideText = slideConfig.hideText || false;
    this._choices = slideConfig.choices || [];
    this._text = slideConfig.text || "";
    this._wordPerLine = slideConfig.wordPerLine || false;
    this._value = slideConfig.value || 0;
    this._target = slideConfig.target || -1;
  }

  // Getters

  get text(): string {
    return this.slideConfig.text || "";
  }

  get originalText(): string {
    return this.slideConfig.text || "";
  }

  get description(): string {
    return this.slideConfig.text || "";
  }

  get color(): string {
    return this.slideConfig.color || "";
  }

  get value(): number {
    return this._value;
  }

  get target(): number {
    return this.slideConfig.target || 0;
  }

  get hideText(): boolean {
    return this.slideConfig.hideText === true;
  }

  get choices(): number[] {
    return this.slideConfig.choices || [];
  }

  get className(): string | undefined {
    return this.slideConfig.className;
  }

  get baseClassName(): string {
    return "";
  }

  // Methods

  applyToPlayer(player: Player): void {
    player.addScore(this.value);
  }
}
