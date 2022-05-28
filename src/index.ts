import { Board } from "./Board";
import { Panel } from "./Panel";
import { panels, patterns } from "./config";

function init() {
  const boardPanels: Panel[] = panels().map(panel => new Panel(panel.identifier, panel.slides));

  const board = new Board(boardPanels, patterns());

  board.spin();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
