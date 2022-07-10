// A close enough implementation of "sleep".
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// A list of spin distributions from question rounds from actual episodes.
export const spinDistributions = [
  [2, 5, 4],
  [3, 4, 7],
  [4, 3, 5],
  [4, 5, 7],
  [3, 7, 3],
  [3, 4, 9],
  [3, 4, 6],
  [2, 5, 7],
  [4, 3, 10],
  [2, 7, 3],
  [4, 4, 12],
  [4, 3, 4],
  [2, 6, 3],
  [5, 2, 5],
  [2, 2, 7],
  [7, 3, 1],
  [7, 4, 2],
  [8, 2, 5],
  [7, 3, 4],
  [3, 3, 10],
  [1, 7, 3],
  [6, 4, 10],
  [4, 2, 4],
  [10, 3, 4],
  [2, 3, 4],
  [10, 4, 2],
  [5, 1, 2],
  [4, 5, 3],
  [8, 3, 2],
  [7, 5, 2],
  [5, 4, 3],
  [3, 5, 2],
  [6, 7, 4],
  [2, 7, 3],
  [2, 9, 2],
  [7, 2, 3],
  [3, 8, 4],
  [1, 6, 2],
  [3, 4, 5],
  [5, 4, 5],
  [6, 2, 6],
  [4, 5, 4],
  [3, 2, 7],
  [2, 6, 2],
  [7, 2, 2],
  [7, 8, 4],
  [6, 2, 2],
  [4, 2, 5],
  [1, 3, 1],
  [6, 6, 8]
];

// "Macro" for making a HTML button to present a choice to the player.
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

const PRESS_OR_PASS_MESSAGES = ["Press your luck or pass?", "What are you going to do?", "What's it going to be?"];

// Picks a random "question" to present to the player
export function pressOrPassMessage(): string {
  return PRESS_OR_PASS_MESSAGES[Math.floor(Math.random() * PRESS_OR_PASS_MESSAGES.length)];
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

// There is no native background gradient transition in CSS. This (with the above array)
// implements a similar effect.
export function transitionBodyBackground(reverse: boolean): void {
  const firstStylePart = window
    .getComputedStyle(document.body, null)
    .getPropertyValue("background-image")
    .split(",")[0];

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
        if (reverse) {
          document.body.classList.remove("in-round");
        } else {
          document.body.classList.add("in-round");
        }
        document.body.style.backgroundImage = "";
      }
    }
  }, 100);
}
