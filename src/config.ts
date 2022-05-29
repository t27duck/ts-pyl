import { Slide } from "./Slide";

export function patterns(): Array<number[]> {
  return [
    [3, 16, 13, 10, 18, 8, 6, 14, 7, 5, 15, 11, 17, 2, 12, 1, 9, 4],
    [5, 18, 11, 13, 3, 6, 15, 7, 1, 9, 14, 16, 10, 2, 4, 12, 17, 8],
    [11, 6, 10, 12, 1, 4, 14, 16, 2, 9, 17, 8, 13, 15, 3, 7, 18, 5],
    [17, 10, 15, 13, 2, 8, 18, 16, 12, 3, 5, 11, 7, 4, 1, 9, 14, 6],
    [18, 16, 10, 5, 11, 9, 2, 13, 17, 7, 4, 15, 12, 8, 6, 3, 1, 14]
  ];
}

export function panels(): { identifier: string, slides: Slide[] }[] {
  return [
    {
      identifier: "#panel-0",
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
          color: "#ffff99"
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
      identifier: "#panel-1",
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
      identifier: "#panel-2",
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
          color: "#ffff99"
        }),
      ]
    },
    {
      identifier: "#panel-3",
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
      identifier: "#panel-4",
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
          color: "#ffff99"
        })
      ]
    },
    {
      identifier: "#panel-5",
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
      identifier: "#panel-6",
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
          color: "#ffff99"
        })
      ]
    },
    {
      identifier: "#panel-7",
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
      identifier: "#panel-8",
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
          color: "#ffff99"
        })
      ]
    },
    {
      identifier: "#panel-9",
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
      identifier: "#panel-10",
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
      identifier: "#panel-11",
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
          color: "#ffff99"
        }),
        new Slide({
          type: "bigbucks",
          text: "Big Bucks",
          color: "#4A7318"
        }),
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
      identifier: "#panel-13",
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
          color: "#ffff99"
        })
      ]
    },
    {
      identifier: "#panel-14",
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
      identifier: "#panel-15",
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
          color: "#ffff99"
        })
      ]
    },
    {
      identifier: "#panel-16",
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
          color: "#ffff99"
        })
      ]
    },
    {
      identifier: "#panel-17",
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
