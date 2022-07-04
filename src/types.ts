// Shared types
export type SlideConfig = {
  className?: string;
  color?: string;
  choices?: Array<number>;
  text?: string;
  description?: string;
  wordPerLine?: boolean;
  value?: number;
  target?: number;
};

export type PrizeConfig = {
  prefix?: string;
  text: string;
  value: number;
};
