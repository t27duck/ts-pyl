import { Board } from "./Board";
import { Panel } from "./Panel";
import { panelsRound1, panelsRound2, patterns } from "./config";

function init() {
  const boardPanels: Panel[] = panelsRound1().map(panel => new Panel(panel.identifier, panel.slides));

  const board = new Board(boardPanels, patterns());

  board.spin();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
