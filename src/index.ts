import { Game } from "./Game";

function init() {
  const game = new Game();
  const startButton = document.getElementById("start-new-game") as HTMLButtonElement;
  startButton.addEventListener("click", () => {
    game.showSetup();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
