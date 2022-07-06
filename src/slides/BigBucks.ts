import { JumpToSpace } from "../slides/JumpToSpace";

export class BigBucks extends JumpToSpace {
  constructor(slideConfig: { color: string; target: number }) {
    super({ ...slideConfig, text: "Big Bucks" });
    this._baseClassName = "panel-bigbucks";
  }

  // Getters

  get description(): string {
    return `${this._description}!!!`;
  }
}
