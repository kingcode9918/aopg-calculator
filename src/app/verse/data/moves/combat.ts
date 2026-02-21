import type { MoveSet } from "./types";

export const fightingsData: MoveSet[] = [
  {
    id: 0,
    name: "Combat",
    M1: {
      hits: [
        { hit: 1, damage: 5 },
        { hit: 2, damage: 5 },
        { hit: 3, damage: 5 },
        { hit: 4, damage: 5 },
        { hit: 5, damage: 7.5 },
      ],
    },
  },
  {
    id: 1,
    name: "Yuji",
    M1: {
      hits: [
        { hit: 1, damage: 25 },
        { hit: 2, damage: 25 },
        { hit: 3, damage: 25 },
        { hit: 4, damage: 25 },
        { hit: 5, damage: 27.5 },
      ],
    },
    Z: {
      hits: [{ hit: 1, damage: 45 }],
    },
    X: {
      hits: [{ hit: 1, damage: 60 }],
    },
    C: {
      hits: [{ hit: 1, damage: 80 }],
    },
  },
];
