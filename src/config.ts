export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const BOARD_STOP_RESULT_DELAY = 200;
export const BOARD_LIGHT_BOUNCE_DURATION = 250;
export const BOARD_STOP_FLASH_PANEL_DELAY = 300;
export const BOARD_PANEL_FLASH_DURATION = 160;
export const BOARD_FLASH_CHOOSE_PANEL_DURATION = 800;

export function patterns(): Array<number[]> {
  return [
    [3, 16, 13, 10, 18, 8, 6, 14, 7, 5, 15, 11, 17, 2, 12, 1, 9, 4],
    [5, 18, 11, 13, 3, 6, 15, 7, 1, 9, 14, 16, 10, 2, 4, 12, 17, 8],
    [11, 6, 10, 12, 1, 4, 14, 16, 2, 9, 17, 8, 13, 15, 3, 7, 18, 5],
    [17, 10, 15, 13, 2, 8, 18, 16, 12, 3, 5, 11, 7, 4, 1, 9, 14, 6],
    [18, 16, 10, 5, 11, 9, 2, 13, 17, 7, 4, 15, 12, 8, 6, 3, 1, 14]
  ];
}

const prizesRound1 = [
  { prefix: "A", text: "Sleeper Sofa", value: 899 },
  { prefix: "A", text: "Portable TV", value: 370 },
  { prefix: "A Trip to", text: "Reno", value: 753 },
  { prefix: "A", text: "Bedroom Set", value: 698 },
  { prefix: "A", text: "Paging System", value: 299 },
  { text: "Dinnerware", value: 500 },
  { prefix: "A", text: "Diamond Pendant", value: 375 },
  { text: "Exercise Cycles", value: 480 },
  { prefix: "A Trip To", text: "Las Vegas", value: 526 },
  { text: "Cutlery", value: 375 },
  { text: "Earrings", value: 329 },
  { text: "Small Appliances", value: 286 },
  { prefix: "A", text: "Bracelet", value: 550 },
  { text: "Stainless Cookware", value: 700 },
  { text: "Binoculars", value: 300 },
  { prefix: "A", text: "Car Stereo", value: 440 },
  { prefix: "A", text: "Coffee Set", value: 605 },
  { prefix: "A", text: "Bracelet", value: 500 },
  { text: "Luggage", value: 778 },
  { prefix: "A Trip to", text: "Concord Calif.", value: 657 },
  { text: "Silver Gifts", value: 400 },
  { prefix: "A Trip to", text: "Monterey Calif.", value: 689 },
  { text: "Bumper Pool", value: 1001 },
  { prefix: "A", text: "Food Factory", value: 440 },
  { prefix: "A", text: "Sailboard", value: 749 },
  { text: "Bicycles", value: 470 },
  { prefix: "A", text: "Stereo", value: 420 },
  { prefix: "An", text: "Electric Typewriter", value: 615 },
  { prefix: "A", text: "Reclining Rocker", value: 329 },
  { prefix: "A", text: "Car Stereo", value: 440 },
  { prefix: "A", text: "Coffee Set", value: 605 },
  { prefix: "A", text: "Home Gym", value: 595 },
  { prefix: "An", text: "Exercise Bench", value: 407 },
  { text: "Flatwear", value: 550 },
  { prefix: "A", text: "Telescope", value: 459 },
  { prefix: "A", text: "Video Recorder", value: 799 },
  { prefix: "A Trip To", text: "Scottsdale Arizona", value: 526 },
  { prefix: "A", text: "Flokati Rug", value: 350 },
  { prefix: "A", text: "Reclining Rocker", value: 329 },
  { text: "Watches", value: 345 },
  { prefix: "A", text: "Punch Set", value: 585 }
];

const prizesRound2 = [
  { prefix: "A", text: "Sail Boat", value: 1379 },
  { prefix: "A Trip to", text: "Virgin Islands", value: 3166 },
  { prefix: "A Trip to", text: "Key Biscayne", value: 1570 },
  { prefix: "A Trip to", text: "New Orleans", value: 1360 },
  { prefix: "A", text: "Home Robot", value: 1250 },
  { prefix: "A Trip to", text: "London", value: 2180 },
  { prefix: "A", text: "Game Table", value: 1995 },
  { prefix: "A Trip to", text: "Bermuda", value: 2908 },
  { prefix: "A", text: "Car", value: 5341 },
  { prefix: "A", text: "Big Screen TV", value: 3800 },
  { prefix: "A", text: "Water Bike", value: 3435 },
  { prefix: "A Trip to", text: "Switzerland", value: 3798 },
  { prefix: "A", text: "Tent Trailer", value: 5384 },
  { prefix: "A", text: "Video Recorder & Camera", value: 2345 },
  { prefix: "A", text: "Carribean Cruise", value: 3310 },
  { prefix: "A Trip to", text: "Seattle Wash.", value: 1050 },
  { prefix: "A", text: "Motorcycle", value: 2398 },
  { prefix: "A Trip to", text: "Hong Kong", value: 4328 },
  { prefix: "A Trip to", text: "Tokyo", value: 3484 },
  { prefix: "A Trip to", text: "Rome", value: 2828 },
  { prefix: "A Trip to", text: "Cancun", value: 1288 },
  { prefix: "A Trip to", text: "Dallas", value: 1952 },
  { prefix: "A Trip to", text: "Boston", value: 1958 },
  { prefix: "A Trip to", text: "Portland Oregon", value: 1300 },
  { prefix: "A Trip to the", text: "Canadian Rockies", value: 2116 },
  { prefix: "A Trip to", text: "Mexican Cruise", value: 2190 },
  { prefix: "A Trip to", text: "Waikiki", value: 1038 },
  { prefix: "A Trip to", text: "Puerto Vallarta", value: 1387 },
  { prefix: "A Trip to", text: "Palm Springs", value: 1435 },
  { prefix: "A", text: "British Tour", value: 2534 },
  { prefix: "A", text: "Home Bar", value: 2995 },
  { prefix: "A Trip to", text: "Mexico City", value: 1650 },
  { prefix: "A Trip to", text: "African Safari", value: 6038 },
  { prefix: "A", text: "Stereo", value: 1550 },
  { prefix: "A Trip to", text: "Orlando", value: 2018 },
  { prefix: "A Trip to", text: "New York", value: 2932 },
  { prefix: "A Trip to", text: "Tahiti", value: 3130 },
  { prefix: "A Trip to", text: "Puerto Rico", value: 1164 },
  { prefix: "A", text: "Piano", value: 2295 },
  { text: "Golf Clubs", value: 1060 },
  { prefix: "A Trip to", text: "Singapore", value: 2900 },
  { prefix: "A Trip to", text: "Amsterdam", value: 2458 },
  { prefix: "A", text: "European Tour", value: 2374 },
  { prefix: "A", text: "Billiard Table", value: 2223 },
  { prefix: "A Trip to", text: "San Diego", value: 1084 },
  { prefix: "A", text: "Surf Jet", value: 2350 },
  { prefix: "A", text: "Motorboat", value: 5562 },
  { prefix: "A Trip to", text: "New England", value: 2236 },
  { prefix: "A Trip to", text: "Acapulco", value: 1488 },
  { prefix: "A Trip to", text: "French Chateaux Country", value: 2494 }
];

let prizePool: Array<{ prefix?: string; text: string; value: number }> = [];
let prizeRound = 1;

export function extractPrize(round = 1): { prefix?: string; text: string; value: number } {
  if (round !== prizeRound) {
    prizeRound = round;
    prizePool = [];
  }
  if (prizePool.length === 0) {
    let clonedArray;
    if (round === 1) {
      clonedArray = [...prizesRound1];
    } else {
      clonedArray = [...prizesRound2];
    }
    let currentIndex = clonedArray.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = clonedArray[currentIndex];
      clonedArray[currentIndex] = clonedArray[randomIndex];
      clonedArray[randomIndex] = temporaryValue;
    }

    prizePool = clonedArray;
  }

  return prizePool.shift() || { text: "UNKNOWN PRIZE", value: 0 };
}
