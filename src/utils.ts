const PRESS_OR_PASS_MESSAGES = ["Press your luck or pass?", "What are you going to do?", "What's it going to be?"];

export function buildButton(
  buttonText: string,
  clickHandler: (event: Event) => void,
  dataAttributes: Record<string, string> = {}
): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerText = buttonText;
  button.classList.add("choice-button");
  button.addEventListener("click", clickHandler);
  for (const [key, value] of Object.entries(dataAttributes)) {
    button.dataset[key] = value;
  }

  return button;
}

export const sample = (array: Array<string | number>) => {
  const length = array.length;
  return array[Math.floor(Math.random() * length)];
};

export function pressOrPassMessage(): string {
  return sample(PRESS_OR_PASS_MESSAGES).toString();
}
