import { generateHits, type MoveSet } from "./types";

export const fightingsData: MoveSet[] = [
  {
    id: 0,
    name: "Combat",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 5, count: 4 }),
        ...generateHits({ baseDamage: 7.5, count: 1 }),
      ],
    },
  },
  {
    id: 1,
    name: "Yuji",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 25, count: 4 }),
        ...generateHits({ baseDamage: 27.5, count: 1 }),
      ],
    },
    Z: {
      hits: [...generateHits({ baseDamage: 45, count: 1 })],
    },
    X: {
      hits: [...generateHits({ baseDamage: 60, count: 1 })],
    },
    C: {
      hits: [...generateHits({ baseDamage: 80, count: 1 })],
    },
  },
];
