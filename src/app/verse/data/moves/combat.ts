import { generateHits, type MoveSet } from "./types";

export const fightingsData: MoveSet[] = [
  {
    id: 0,
    name: "Combat",
    M1: {
      hits: [...generateHits(5, 4), ...generateHits(7.5, 1)],
    },
  },
  {
    id: 1,
    name: "Yuji",
    M1: {
      hits: [...generateHits(25, 4), ...generateHits(27.5, 1)],
    },
    Z: {
      hits: [...generateHits(45, 1)],
    },
    X: {
      hits: [...generateHits(60, 1)],
    },
    C: {
      hits: [...generateHits(80, 1)],
    },
  },
];
