import { Slide } from "./Slide";
import { Cash } from "slides/Cash";
import { CashAndSpin } from "slides/CashAndSpin";
import { CashOrLoseWhammy } from "slides/CashOrLoseWhammy";
import { Prize } from "slides/Prize";
import { PickSpace } from "slides/PickSpace";
import { JumpToSpace } from "slides/JumpToSpace";
import { Whammy } from "slides/Whammy";

export function panelsRound1(): { identifier: string; slides: Slide[] }[] {
  return [
    {
      identifier: "#panel-1",
      slides: [
        new Cash({
          color: "#435E95",
          value: 350
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-superhero"
        }),
        new PickSpace({
          hideText: true,
          text: "Move One Space",
          color: "#085A39",
          className: "panel-moveonespace-corner",
          choices: [2, 18]
        })
      ]
    },
    {
      identifier: "#panel-2",
      slides: [
        new Cash({
          color: "#316384",
          value: 500
        }),
        new Cash({
          color: "#435E95",
          value: 750
        }),
        new Prize({
          round: 1,
          color: "#54642D"
        })
      ]
    },
    {
      identifier: "#panel-3",
      slides: [
        new Cash({
          color: "#0C3E83",
          value: 250
        }),
        new Cash({
          color: "#316384",
          value: 400
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-jumping"
        })
      ]
    },
    {
      identifier: "#panel-4",
      slides: [
        new Cash({
          color: "#316384",
          value: 1000
        }),
        new Cash({
          color: "#54642D",
          value: 1250
        }),
        new Cash({
          color: "#AF5C54",
          value: 1500
        })
      ]
    },
    {
      identifier: "#panel-5",
      slides: [
        new Cash({
          color: "#AF5C54",
          value: 300
        }),
        new Prize({
          round: 1,
          color: "#a73500"
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-hammer"
        })
      ]
    },
    {
      identifier: "#panel-6",
      slides: [
        new Cash({
          color: "#0C3E83",
          value: 525
        }),
        new Cash({
          color: "#D2DE4B",
          value: 650
        }),
        new JumpToSpace({
          className: "panel-backtwospaces",
          hideText: true,
          text: "Go Back Two Spaces",
          color: "#085A39",
          target: 4
        })
      ]
    },
    {
      identifier: "#panel-7",
      slides: [
        new Cash({
          color: "#435E95",
          value: 470
        }),
        new Prize({
          round: 1,
          color: "#a73500"
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-leaning"
        })
      ]
    },
    {
      identifier: "#panel-8",
      slides: [
        new Cash({
          color: "#AF5C54",
          value: 300
        }),
        new Cash({
          color: "#54642D",
          value: 450
        }),
        new Cash({
          color: "#54642D",
          value: 550
        })
      ]
    },
    {
      identifier: "#panel-9",
      slides: [
        new Cash({
          color: "#435E95",
          value: 350
        }),
        new Cash({
          color: "#AF5C54",
          value: 550
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-running"
        })
      ]
    },
    {
      identifier: "#panel-10",
      slides: [
        new Cash({
          color: "#AF5C54",
          value: 300
        }),
        new CashAndSpin({
          color: "#D2DE4B",
          value: 500
        }),
        new Prize({
          round: 1,
          color: "#a73500"
        })
      ]
    },
    {
      identifier: "#panel-11",
      slides: [
        new Cash({
          color: "#D2DE4B",
          value: 200
        }),
        new Cash({
          color: "#0C3E83",
          value: 600
        }),
        new JumpToSpace({
          className: "panel-advancetwospaces",
          hideText: true,
          text: "Advance Two Spaces",
          color: "#085A39",
          target: 13
        })
      ]
    },
    {
      identifier: "#panel-12",
      slides: [
        new Cash({
          color: "#316384",
          value: 400
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-standing"
        }),
        new JumpToSpace({
          text: "Big Bucks",
          color: "#4A7318",
          target: 4
        })
      ]
    },
    {
      identifier: "#panel-13",
      slides: [
        new Cash({
          color: "#316384",
          value: 500
        }),
        new Cash({
          color: "#435E95",
          value: 750
        }),
        new Prize({
          round: 1,
          color: "#AF5C54"
        })
      ]
    },
    {
      identifier: "#panel-14",
      slides: [
        new Cash({
          color: "#316384",
          value: 400
        }),
        new Cash({
          color: "#316384",
          value: 500
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-raisingarms"
        })
      ]
    },
    {
      identifier: "#panel-15",
      slides: [
        new Cash({
          color: "#AF5C54",
          value: 550
        }),
        new Cash({
          color: "#435E95",
          value: 700
        }),
        new Prize({
          round: 1,
          color: "#54642D"
        })
      ]
    },
    {
      identifier: "#panel-16",
      slides: [
        new Cash({
          color: "#AF5C54",
          value: 300
        }),
        new Cash({
          color: "#316384",
          value: 500
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-taunting"
        })
      ]
    },
    {
      identifier: "#panel-17",
      slides: [
        new Cash({
          color: "#435E95",
          value: 200
        }),
        new Prize({
          round: 1,
          color: "#a73500"
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-flex"
        })
      ]
    },
    {
      identifier: "#panel-18",
      slides: [
        new CashAndSpin({
          color: "#435E95",
          value: 100
        }),
        new CashAndSpin({
          color: "#A5C3F3",
          value: 200
        }),
        new CashAndSpin({
          color: "#54642D",
          value: 300
        })
      ]
    }
  ];
}

export function panelsRound2(): { identifier: string; slides: Slide[] }[] {
  return [
    {
      identifier: "#panel-1",
      slides: [
        new Cash({
          color: "#397399",
          value: 1400
        }),
        new Cash({
          color: "#435E95",
          value: 1750
        }),
        new Cash({
          color: "#54642D",
          value: 2250
        })
      ]
    },
    {
      identifier: "#panel-2",
      slides: [
        new Cash({
          color: "#316384",
          value: 500
        }),
        new Cash({
          color: "#54642D",
          value: 1250
        }),
        new Prize({
          round: 2,
          color: "#a73500"
        })
      ]
    },
    {
      identifier: "#panel-3",
      slides: [
        new Cash({
          color: "#316384",
          value: 500
        }),
        new Cash({
          color: "#AF5C54",
          value: 2000
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-running"
        })
      ]
    },
    {
      identifier: "#panel-4",
      slides: [
        new CashAndSpin({
          color: "#435E95",
          value: 3000
        }),
        new CashAndSpin({
          color: "#AF5C54",
          value: 4000
        }),
        new CashAndSpin({
          color: "#4A7318",
          value: 5000
        })
      ]
    },
    {
      identifier: "#panel-5",
      slides: [
        new Cash({
          color: "#435E95",
          value: 750
        }),
        new Prize({
          round: 2,
          color: "#a73500"
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-standing"
        })
      ]
    },
    {
      identifier: "#panel-6",
      slides: [
        new CashAndSpin({
          color: "#54642D",
          value: 700
        }),
        new PickSpace({
          text: "Pick A Corner",
          color: "#085A39",
          value: 11,
          choices: [1, 10, 15],
          wordPerLine: true
        }),
        new JumpToSpace({
          className: "panel-backtwospaces",
          hideText: true,
          text: "Go Back Two Spaces",
          color: "#085A39",
          target: 4
        })
      ]
    },
    {
      identifier: "#panel-7",
      slides: [
        new Cash({
          color: "#435E95",
          value: 750
        }),
        new Prize({
          round: 2,
          color: "#a73500"
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-hammer"
        })
      ]
    },
    {
      identifier: "#panel-8",
      slides: [
        new CashAndSpin({
          color: "#D2DE4B",
          value: 500
        }),
        new CashAndSpin({
          color: "#0C3E83",
          value: 750
        }),
        new CashAndSpin({
          color: "#A5C3F3",
          value: 1000
        })
      ]
    },
    {
      identifier: "#panel-9",
      slides: [
        new Cash({
          color: "#4A7318",
          value: 800
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-flex"
        }),
        new PickSpace({
          hideText: true,
          text: "Move One Space",
          color: "#085A39",
          className: "panel-moveonespace-vertical",
          choices: [8, 10]
        })
      ]
    },
    {
      identifier: "#panel-10",
      slides: [
        new Prize({
          round: 2,
          color: "#0C3E83"
        }),
        new Prize({
          round: 2,
          color: "#AF5C54"
        }),
        new Prize({
          round: 2,
          color: "#a73500"
        })
      ]
    },
    {
      identifier: "#panel-11",
      slides: [
        new Cash({
          color: "#AF5C54",
          value: 1500
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-superhero"
        }),
        new JumpToSpace({
          className: "panel-advancetwospaces",
          hideText: true,
          text: "Advance Two Spaces",
          color: "#085A39",
          target: 13
        })
      ]
    },
    {
      identifier: "#panel-12",
      slides: [
        new Cash({
          color: "#316384",
          value: 500
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-taunting"
        }),
        new JumpToSpace({
          text: "Big Bucks",
          color: "#4A7318",
          target: 4
        })
      ]
    },
    {
      identifier: "#panel-13",
      slides: [
        new Cash({
          color: "#AF5C54",
          value: 1500
        }),
        new Cash({
          color: "#4A7318",
          value: 2500
        }),
        new Prize({
          round: 2,
          text: "A Prize",
          color: "#a73500"
        })
      ]
    },
    {
      identifier: "#panel-14",
      slides: [
        new Cash({
          color: "#316384",
          value: 2000
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-jumping"
        }),
        new PickSpace({
          hideText: true,
          text: "Move One Space",
          color: "#085A39",
          className: "panel-moveonespace-horizontal",
          choices: [13, 15]
        })
      ]
    },
    {
      identifier: "#panel-15",
      slides: [
        new CashAndSpin({
          color: "#A5C3F3",
          value: 1000
        }),
        new CashOrLoseWhammy({
          color: "#A54D4D",
          value: 2000
        }),
        new Prize({
          round: 2,
          color: "#a73500"
        })
      ]
    },
    {
      identifier: "#panel-16",
      slides: [
        new CashAndSpin({
          color: "#0C3E83",
          value: 750
        }),
        new Cash({
          color: "#BD6373",
          value: 1500
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-leaning"
        })
      ]
    },
    {
      identifier: "#panel-17",
      slides: [
        new Cash({
          color: "#0C3E83",
          value: 600
        }),
        new CashAndSpin({
          color: "#54642D",
          value: 700
        }),
        new Prize({
          round: 2,
          color: "#54642D"
        })
      ]
    },
    {
      identifier: "#panel-18",
      slides: [
        new CashAndSpin({
          color: "#0C3E83",
          value: 750
        }),
        new CashAndSpin({
          color: "#A5C3F3",
          value: 1000
        }),
        new Whammy({
          text: "A Whammy",
          className: "panel-whammy-raisingarms"
        })
      ]
    }
  ];
}

export const panelLayouts = [panelsRound1(), panelsRound2()];
