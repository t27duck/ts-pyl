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
