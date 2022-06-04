import { Slide } from "./Slide";

export function panelsRound1(): { identifier: string, slides: Slide[] }[] {
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
          className: "panel-moveonespace-corner",
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

export function panelsRound2(): { identifier: string, slides: Slide[] }[] {
  return [
    {
      identifier: "#panel-1",
      slides: [
        new Slide({
          type: "cash",
          text: "$1400",
          color: "#397399",
          value: 1400
        }),
        new Slide({
          type: "cash",
          text: "$1750",
          color: "#435E95",
          value: 1750
        }),
        new Slide({
          type: "cash",
          text: "$2250",
          color: "#54642D"
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
          text: "$1250",
          color: "#54642D",
          value: 1250
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
      identifier: "#panel-3",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "#316384",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$2000",
          color: "#AF5C54",
          value: 2000
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-running"
        }),
      ]
    },
    {
      identifier: "#panel-4",
      slides: [
        new Slide({
          type: "cashandspin",
          text: "$3000",
          color: "#435E95",
          value: 3000
        }),
        new Slide({
          type: "cashandspin",
          text: "$4000",
          color: "#AF5C54",
          value: 4000
        }),
        new Slide({
          type: "cashandspin",
          text: "$5000",
          color: "#4A7318",
          value: 5000
        }),
      ]
    },
    {
      identifier: "#panel-5",
      slides: [
        new Slide({
          type: "cash",
          text: "$750",
          color: "#435E95",
          value: 750
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
          className: "panel-whammy-standing"
        })
      ]
    },
    {
      identifier: "#panel-6",
      slides: [
        new Slide({
          type: "cashandspin",
          text: "$700",
          color: "#54642D",
          value: 700
        }),
        new Slide({
          type: "pickacorner",
          text: "Pick A Corner",
          color: "#085A39",
          value: 11
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
          text: "$750",
          color: "#435E95",
          value: 750
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
      identifier: "#panel-8",
      slides: [
        new Slide({
          type: "cashandspin",
          text: "$500",
          color: "#D2DE4B",
          value: 500
        }),
        new Slide({
          type: "cashandspin",
          text: "$750",
          color: "#0C3E83",
          value: 750
        }),
        new Slide({
          type: "cashandspin",
          text: "$1000",
          color: "#A5C3F3",
          value: 1000
        })
      ]
    },
    {
      identifier: "#panel-9",
      slides: [
        new Slide({
          type: "cash",
          text: "$800",
          color: "#4A7318",
          value: 800
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-flex"
        }),
        new Slide({
          type: "moveonespace",
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
        new Slide({
          type: "prize",
          text: "A Prize",
          color: "#0C3E83",
          value: 10
        }),
        new Slide({
          type: "prize",
          text: "A Prize",
          color: "#AF5C54",
          value: 10
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
          text: "$1500",
          color: "#AF5C54",
          value: 1500
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-superhero"
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
          text: "$1500",
          color: "#AF5C54",
          value: 1500
        }),
        new Slide({
          type: "cash",
          text: "$2500",
          color: "#4A7318",
          value: 2500
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
      identifier: "#panel-14",
      slides: [
        new Slide({
          type: "cash",
          text: "$2000",
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
        new Slide({
          type: "moveonespace",
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
        new Slide({
          type: "cashandspin",
          text: "$100",
          color: "#A5C3F3",
          value: 1000
        }),
        new Slide({
          type: "cashorlosewhammy",
          text: "$2000",
          secondaryText: "or<br />Lose -1- Whammy",
          color: "#A54D4D",
          value: 2000
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
      identifier: "#panel-16",
      slides: [
        new Slide({
          type: "cashandspin",
          text: "$750",
          color: "#0C3E83",
          value: 750
        }),
        new Slide({
          type: "cash",
          text: "$1500",
          color: "#BD6373",
          value: 1500
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
      identifier: "#panel-17",
      slides: [
        new Slide({
          type: "cash",
          text: "$600",
          color: "#0C3E83",
          value: 600
        }),
        new Slide({
          type: "cashandspin",
          text: "$700",
          color: "#54642D",
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
      identifier: "#panel-18",
      slides: [
        new Slide({
          type: "cashandspin",
          text: "$750",
          color: "#0C3E83",
          value: 750
        }),
        new Slide({
          type: "cashandspin",
          text: "$1000",
          color: "#A5C3F3",
          value: 1000
        }),
        new Slide({
          type: "whammy",
          hideText: true,
          text: "A Whammy",
          color: "#ffff99",
          className: "panel-whammy-raisingarms"
        })
      ]
    }
  ];
}


export const panelLayouts = [panelsRound1(), panelsRound2()];
