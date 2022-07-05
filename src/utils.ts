export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

const backgroundProgression: string[][] = [
  ["#2944c3", "#282698"],
  ["#6438ba", "#52188d"],
  ["#8628ad", "#6b0080"],
  ["#a00a9d", "#7d0072"],
  ["#b4008b", "#8a0064"],
  ["#c30078", "#930055"],
  ["#cd0064", "#980046"],
  ["#d2004f", "#9b0038"],
  ["#d4003b", "#9b002a"],
  ["#d20226", "#99021d"]
];

export function transitionBodyBackground(firstStylePart: string, reverse: boolean): void {
  let colors: string[][];
  let index = -1;

  if (reverse) {
    colors = backgroundProgression.slice().reverse();
  } else {
    colors = backgroundProgression;
  }

  const interval = setInterval(() => {
    index++;
    if (interval) {
      if (colors[index]) {
        document.body.style.backgroundImage = `${firstStylePart}, linear-gradient(${colors[index][0]}, ${colors[index][1]})`;
      } else {
        clearInterval(interval);
      }
    }
  }, 100);
}
