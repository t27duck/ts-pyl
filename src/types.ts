// Shared types
export type SlideConfig = {
  type: string,
  text: string,
  secondaryText?: string,
  color: string,
  value?: number,
  hideText?: boolean | undefined,
  choices?: number[],
  className?: string
};
