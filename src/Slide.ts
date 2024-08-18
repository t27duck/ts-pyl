import { Player } from "./Player";
import { SlideConfig } from "./types";

export class Slide {
  protected _baseClassName: string;
  protected _className: string;
  protected _color: string;
  protected _choices: Array<number>;
  protected _text: string;
  protected _description: string;
  protected _wordPerLine: boolean;
  protected _value: number;
  protected _target: number;

  constructor(protected slideConfig: SlideConfig) {
    this._className = slideConfig.className || "";
    this._color = slideConfig.color || "";
    this._choices = slideConfig.choices || [];
    this._text = slideConfig.text || "";
    this._description = slideConfig.description || this._text;
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
    return this._description;
  }

  get value(): number {
    return this._value;
  }

  // Methods

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyToPlayer(player: Player): void {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: any = undefined;

  display(element: HTMLElement, displayType = "") {
    if (displayType === "backgroundOnly") {
      element.innerHTML = "";
      element.setAttribute("class", "inner-panel");
    } else {
      element.setAttribute("class", `inner-panel ${this._baseClassName} ${this._className}`);
      element.innerHTML = this.text;
    }
    element.style.backgroundColor = this._color;
  }
}
