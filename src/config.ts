import { Slide } from "./Slide";

function shuffle(array: Array<any>): Array<any> {
  let clonedArray = [...array];
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
  return clonedArray;
}

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
  { text: "Sleeper Sofa", value: 899 },
  { text: "Portable TV", value: 370 },
  { text: "Reno", value: 753 },
  { text: "Bedroom Set", value: 698 },
  { text: "Paging System", value: 299 },
  { text: "Dinnerware", value: 500 },
  { text: "Diamond Pendant", value: 375 },
  { text: "Exercise Cycles", value: 480 },
  { text: "Las Vegas", value: 526 },
  { text: "Cutlery", value: 375 },
  { text: "Earrings", value: 329 },
  { text: "Small Appliances", value: 286 },
  { text: "Bracelet", value: 550 },
  { text: "Stainless Cookware", value: 700 },
  { text: "Binoculars", value: 300 },
  { text: "Car Stereo", value: 440 },
  { text: "Coffee Set", value: 605 },
  { text: "Bracelet", value: 500 },
  { text: "Luggage", value: 778 },
  { text: "Concord Calif.", value: 657 },
  { text: "Silver Gifts", value: 400 },
  { text: "Monterey Calif.", value: 689 },
  { text: "Bumper Pool", value: 1001 },
  { text: "Food Factory", value: 440 },
  { text: "Sailboard", value: 749 },
  { text: "Bicycles", value: 470 },
  { text: "Stereo", value: 420 },
  { text: "Electric Typewriter", value: 615 },
  { text: "Reclining Rocker", value: 329 },
  { text: "Car Stereo", value: 440 },
  { text: "Coffee Set", value: 605 },
  { text: "Luggage", value: 778 },
  { text: "Home Gym", value: 595 },
  { text: "Exercise Bench", value: 407 },
  { text: "Flatwear", value: 550 },
  { text: "Telescope", value: 459 },
  { text: "Video Recorder", value: 799 },
  { text: "Scottsdale Arizona", value: 526 },
  { text: "Flokati Rug", value: 350 },
  { text: "Reclining Rocker", value: 329 },
  { text: "Watches", value: 345 },
  { text: "Punch Set", value: 585 }
];

const prizesRound2 = [
  { text: "Sail Boat", value: 1379 },
  { text: "Virgin Islands", value: 3166 },
  { text: "Key Biscayne", value: 1570 },
  { text: "New Orleans", value: 1360 },
  { text: "Home Robot", value: 1250 },
  { text: "London", value: 2180 },
  { text: "Game Table", value: 1995 },
  { text: "Bermuda", value: 2908 },
  { text: "Car", value: 5341 },
  { text: "Big Screen TV", value: 3800 },
  { text: "Water Bike", value: 3435 },
  { text: "Switzerland", value: 3798 },
  { text: "Tent Trailer", value: 5384 },
  { text: "Video Recorder & Camera", value: 2345 },
  { text: "Carribean Cruise", value: 3310 },
  { text: "Seattle Wash.", value: 1050 },
  { text: "Motorcycle", value: 2398 },
  { text: "Hong Kong", value: 4328 },
  { text: "Tokyo", value: 3484 },
  { text: "Rome", value: 2828 },
  { text: "Cancun", value: 1288 },
  { text: "Dallas", value: 1952 },
  { text: "Boston", value: 1958 },
  { text: "Portland Oregon", value: 1300 },
  { text: "Canadian Rockies", value: 2116 },
  { text: "Mexican Cruise", value: 2190 },
  { text: "Waikiki", value: 1038 },
  { text: "Puerto Vallarta", value: 1387 },
  { text: "Palm Springs", value: 1435 },
  { text: "British Tour", value: 2534 },
  { text: "Home Bar", value: 2995 },
  { text: "Mexico City", value: 1650 },
  { text: "African Safari", value: 6038 },
  { text: "Stereo", value: 1550 },
  { text: "Orlando", value: 2018 },
  { text: "New York", value: 2932 },
  { text: "Tahiti", value: 3130 },
  { text: "Puerto Rico", value: 1164 },
  { text: "Piano", value: 2295 },
  { text: "Golf Clubs", value: 1060 },
  { text: "Singapore", value: 2900 },
  { text: "Amsterdam", value: 2458 },
  { text: "European Tour", value: 2374 },
  { text: "Billiard Table", value: 2223 },
  { text: "San Diego", value: 1084 },
  { text: "Surf Jet", value: 2350 },
  { text: "Motorboat", value: 5562 },
  { text: "New England", value: 2236 },
  { text: "Acapulco", value: 1488 },
  { text: "French Chateaux Country", value: 2494 }
];

let prizePool: Array<any> = [];

export function extractPrize(): { text: string, value: number } {
  if (prizePool.length === 0) {
    prizePool = shuffle(prizesRound1);
  }

  return prizePool.shift();
}

export function panels(): { identifier: string, slides: Slide[] }[] {
  return [
    {
      identifier: "#panel-1",
      slides: [
        new Slide({
          type: "cash",
          text: "$350",
          color: "#435E95",
          value: 500
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-superhero"
        }),
        new Slide({
          type: "moveonespace",
          hideText: true,
          text: "Move One Space",
          color: "#085A39",
          choices: [2, 18]
        })
      ]
    },
    {
      identifier: "#panel-2",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "#316384",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$750",
          color: "#435E95",
          value: 750
        }),
        new Slide({
          type: "prize",
          text: "A Prize",
          color: "#54642D",
          value: 10
        })
      ]
    },
    {
      identifier: "#panel-3",
      slides: [
        new Slide({
          type: "cash",
          text: "$250",
          color: "#0C3E83",
          value: 259
        }),
        new Slide({
          type: "cash",
          text: "$400",
          color: "#316384",
          value: 400
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-jumping"
        }),
      ]
    },
    {
      identifier: "#panel-4",
      slides: [
        new Slide({
          type: "cash",
          text: "$1000",
          color: "#316384",
          value: 1000
        }),
        new Slide({
          type: "cash",
          text: "$1250",
          color: "#54642D",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$1500",
          color: "#AF5C54",
          value: 1500
        }),
      ]
    },
    {
      identifier: "#panel-5",
      slides: [
        new Slide({
          type: "cash",
          text: "$300",
          color: "#AF5C54",
          value: 300
        }),
        new Slide({
          type: "prize",
          text: "A Prize",
          color: "#a73500",
          value: 10
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-hammer"
        })
      ]
    },
    {
      identifier: "#panel-6",
      slides: [
        new Slide({
          type: "cash",
          text: "$525",
          color: "#0C3E83",
          value: 525
        }),
        new Slide({
          type: "cash",
          text: "$650",
          color: "#D2DE4B",
          value: 650
        }),
        new Slide({
          type: "backtwospaces",
          hideText: true,
          text: "Go Back Two Spaces",
          color: "#085A39"
        }),
      ]
    },
    {
      identifier: "#panel-7",
      slides: [
        new Slide({
          type: "cash",
          text: "$470",
          color: "#435E95",
          value: 470
        }),
        new Slide({
          type: "prize",
          text: "A Prize",
          color: "#a73500",
          value: 10
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-leaning"
        })
      ]
    },
    {
      identifier: "#panel-8",
      slides: [
        new Slide({
          type: "cash",
          text: "$300",
          color: "#AF5C54",
          value: 300
        }),
        new Slide({
          type: "cash",
          text: "$450",
          color: "#54642D",
          value: 450
        }),
        new Slide({
          type: "cash",
          text: "$550",
          color: "#54642D",
          value: 550
        }),
      ]
    },
    {
      identifier: "#panel-9",
      slides: [
        new Slide({
          type: "cash",
          text: "$350",
          color: "#435E95",
          value: 350
        }),
        new Slide({
          type: "cash",
          text: "$550",
          color: "#AF5C54",
          value: 550
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-running"
        })
      ]
    },
    {
      identifier: "#panel-10",
      slides: [
        new Slide({
          type: "cash",
          text: "$300",
          color: "#AF5C54",
          value: 300
        }),
        new Slide({
          type: "cashandspin",
          text: "$500",
          color: "#D2DE4B",
          value: 500
        }),
        new Slide({
          type: "prize",
          text: "A Prize",
          color: "#a73500",
          value: 10
        })
      ]
    },
    {
      identifier: "#panel-11",
      slides: [
        new Slide({
          type: "cash",
          text: "$200",
          color: "#D2DE4B",
          value: 200
        }),
        new Slide({
          type: "cash",
          text: "$600",
          color: "#0C3E83",
          value: 600
        }),
        new Slide({
          type: "advancetwospaces",
          hideText: true,
          text: "Advance Two Spaces",
          color: "#085A39"
        })
      ]
    },
    {
      identifier: "#panel-12",
      slides: [
        new Slide({
          type: "cash",
          text: "$400",
          color: "#316384",
          value: 400
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-standing"
        }),
        new Slide({
          type: "bigbucks",
          text: "Big Bucks",
          color: "#4A7318"
        }),
      ]
    },
    {
      identifier: "#panel-13",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "#316384",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$750",
          color: "#435E95",
          value: 750
        }),
        new Slide({
          type: "prize",
          text: "A Prize",
          color: "#AF5C54",
          value: 10
        })
      ]
    },
    {
      identifier: "#panel-14",
      slides: [
        new Slide({
          type: "cash",
          text: "$400",
          color: "#316384",
          value: 400
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "#316384",
          value: 500
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-raisingarms"
        })
      ]
    },
    {
      identifier: "#panel-15",
      slides: [
        new Slide({
          type: "cash",
          text: "$550",
          color: "#AF5C54",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$700",
          color: "#435E95",
          value: 700
        }),
        new Slide({
          type: "prize",
          text: "A Prize",
          color: "#54642D",
          value: 10
        })
      ]
    },
    {
      identifier: "#panel-16",
      slides: [
        new Slide({
          type: "cash",
          text: "$300",
          color: "#AF5C54",
          value: 300
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "#316384",
          value: 500
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-taunting"
        })
      ]
    },
    {
      identifier: "#panel-17",
      slides: [
        new Slide({
          type: "cash",
          text: "$200",
          color: "#435E95",
          value: 200
        }),
        new Slide({
          type: "prize",
          text: "A Prize",
          color: "#a73500",
          value: 10
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-hammer"
        })
      ]
    },
    {
      identifier: "#panel-18",
      slides: [
        new Slide({
          type: "cashandspin",
          text: "$100",
          color: "#435E95",
          value: 100
        }),
        new Slide({
          type: "cashandspin",
          text: "$200",
          color: "#A5C3F3",
          value: 200
        }),
        new Slide({
          type: "cashandspin",
          text: "$300",
          color: "#54642D",
          value: 300
        }),
      ]
    }
  ];
}
