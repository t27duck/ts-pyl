import { Player } from "./Player";

export class Slide {
  protected _baseClassName: string;
  protected _className: string;
  protected _color: string;
  protected _hideText: boolean;
  protected _choices: Array<number>;
  protected _text: string;
  protected _wordPerLine: boolean;
  protected _value: number;
  protected _target: number;

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
    this._baseClassName = "";
  }

  // Getters

  get text(): string {
    return this._text;
  }

  get selectionText(): string {
    return this._text;
  }

  get description(): string {
    return this._text;
  }

  // Methods

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  applyToPlayer(player: Player): void {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: any = undefined;

  display(element: HTMLElement, displayType = "") {
    if (displayType === "backgroundOnly") {
      element.innerHTML = "";
      element.setAttribute("class", "inner-panel");
    } else {
      element.setAttribute("class", `inner-panel ${this._baseClassName} ${this._className}`);
      if (this._hideText) {
        element.innerHTML = "";
      } else {
        element.innerHTML = this.text;
      }
    }
    element.style.backgroundColor = this._color;
  }
}
