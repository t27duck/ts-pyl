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
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$1000",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$750",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-1",
      slides: [
        new Slide({
          type: "cash_and_spin",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash_and_spin",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-2",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-3",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-4",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-5",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-6",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-7",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-8",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-9",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-10",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-11",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-12",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-13",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-14",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-15",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-16",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },
    {
      identifier: "#panel-17",
      slides: [
        new Slide({
          type: "cash",
          text: "$500",
          color: "green",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "red",
          value: 500
        }),
        new Slide({
          type: "cash",
          text: "$500",
          color: "blue",
          value: 500
        }),
      ]
    },

  ];
}
