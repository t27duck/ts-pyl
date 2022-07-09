export const BOARD_STOP_RESULT_DELAY = 200;
export const BOARD_LIGHT_BOUNCE_DURATION = 250;
export const BOARD_STOP_FLASH_PANEL_DELAY = 300;
export const BOARD_PANEL_FLASH_DURATION = 160;
export const BOARD_FLASH_CHOOSE_PANEL_DURATION = 800;
export const LIGHT_BOUNCES_FOR_PANEL_ROTATION = 3;
export const STOP_BOARD_EVENT_HANDLER_DELAY = 500;
export const PASS_MESSAGE_WAIT = 2000;
export const JUMP_TO_SLIDE_DELAY = 1800;
export const START_OF_ROUND_SLIDE_DURATION = 200;
export const END_OF_GAME_FLASH_DURATION = 500;

export function patterns(): Array<number[]> {
  return [
    [3, 16, 13, 10, 18, 8, 6, 14, 7, 5, 15, 11, 17, 2, 12, 1, 9, 4],
    [5, 18, 11, 13, 3, 6, 15, 7, 1, 9, 14, 16, 10, 2, 4, 12, 17, 8],
    [11, 6, 10, 12, 1, 4, 14, 16, 2, 9, 17, 8, 13, 15, 3, 7, 18, 5],
    [17, 10, 15, 13, 2, 8, 18, 16, 12, 3, 5, 11, 7, 4, 1, 9, 14, 6],
    [18, 16, 10, 5, 11, 9, 2, 13, 17, 7, 4, 15, 12, 8, 6, 3, 1, 14]
  ];
}
