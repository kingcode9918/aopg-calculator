export type DamageType = "Strength" | "Fruit" | "Sword" | "Gun";

export interface Move {
  name: string;
  scaling: DamageType;
  numHits?: number;
  baseDamage: number;
  key: string;
}

export interface Mode {
  name: string;
  moves: Move[];
}

export interface Weapon {
  id: number;
  name: string;
  type: "Fighting" | "Sword" | "Gun" | "Fruit" | "Support" | "";
  moves: Move[];
  modes?: Mode[];
}

export const damageData: Weapon[] = [
  { id: 0, name: "Unarmed", type: "", moves: [] },
  {
    id: 1,
    name: "Melee",
    type: "Fighting",
    moves: [{ name: "Punch", scaling: "Strength", baseDamage: 7, key: "M1" }],
  },
  {
    id: 2,
    name: "Atlantean Karate",
    type: "Fighting",
    moves: [
      { name: "Combat", scaling: "Strength", baseDamage: 7, key: "M1" },
      {
        name: "5 Thousand Brick Fist",
        scaling: "Strength",
        baseDamage: 50,
        key: "Q",
      },
      {
        name: "Kaimen Wari",
        scaling: "Strength",
        baseDamage: 75,
        key: "E",
      },
      {
        name: "Shark Bullets",
        scaling: "Strength",
        numHits: 10,
        baseDamage: 5,
        key: "R",
      },
    ],
    modes: [
      {
        name: "Fishman",
        moves: [
          { name: "Combat", scaling: "Strength", baseDamage: 8.4, key: "M1" },
          {
            name: "5 Thousand Brick Fist",
            scaling: "Strength",
            baseDamage: 60,
            key: "Q",
          },
          {
            name: "Kaimen Wari",
            scaling: "Strength",
            baseDamage: 90,
            key: "E",
          },
          {
            name: "Shark Bullets",
            scaling: "Strength",
            numHits: 10,
            baseDamage: 6,
            key: "R",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Flamme Dansante",
    type: "Fighting",
    moves: [
      { name: "Kick", scaling: "Strength", baseDamage: 7, key: "M1" },
      {
        name: "Anti Manner Kick Course",
        scaling: "Strength",
        baseDamage: 25,
        key: "Q",
      },
      {
        name: "Mouton Shot",
        scaling: "Strength",
        baseDamage: 150,
        key: "E",
      },
      {
        name: "Table Party Kick",
        scaling: "Strength",
        baseDamage: 0.5,
        numHits: 5,
        key: "R",
      },
    ],
    modes: [
      {
        name: "Diable Jambe",
        moves: [
          { name: "Kick", scaling: "Strength", baseDamage: 8.4, key: "M1" },
          {
            name: "Anti Manner Kick Course",
            scaling: "Strength",
            baseDamage: 30,
            key: "Q",
          },
          {
            name: "Mouton Shot",
            scaling: "Strength",
            baseDamage: 180,
            key: "E",
          },
          {
            name: "Table Party Kick",
            scaling: "Strength",
            baseDamage: 0.6,
            numHits: 5,
            key: "R",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Thunder Spark",
    type: "Fighting",
    moves: [
      { name: "Punch", scaling: "Strength", baseDamage: 7, key: "M1" },
      {
        name: "Electro Discharge",
        scaling: "Strength",
        baseDamage: 30,
        key: "Q",
      },
      {
        name: "Electro Rush",
        scaling: "Strength",
        baseDamage: 190,
        key: "E",
      },
      {
        name: "Electro Smash",
        scaling: "Strength",
        baseDamage: 40,
        key: "R",
      },
    ],
    modes: [
      {
        name: "Electricity",
        moves: [
          { name: "Punch", scaling: "Strength", baseDamage: 8.4, key: "M1" },
          {
            name: "Electro Discharge",
            scaling: "Strength",
            baseDamage: 36,
            key: "Q",
          },
          {
            name: "Electro Rush",
            scaling: "Strength",
            baseDamage: 228,
            key: "E",
          },
          {
            name: "Electro Smash",
            scaling: "Strength",
            baseDamage: 48,
            key: "R",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Six Styles",
    type: "Fighting",
    moves: [
      { name: "Combat", scaling: "Strength", baseDamage: 15, key: "M1" },
      {
        name: "Rankyaku",
        scaling: "Strength",
        baseDamage: 155,
        key: "Q",
      },
      {
        name: "Shigan",
        scaling: "Strength",
        baseDamage: 175,
        key: "R",
      },
      {
        name: "Rokugan",
        scaling: "Strength",
        baseDamage: 225,
        key: "F",
      },
    ],
  },
  {
    id: 6,
    name: "Cyborg",
    type: "Fighting",
    moves: [
      { name: "Combat", scaling: "Strength", baseDamage: 7, key: "M1" },
      {
        name: "Strong Right",
        scaling: "Strength",
        baseDamage: 350,
        key: "Q",
      },
      {
        name: "Coup De Vent",
        scaling: "Strength",
        baseDamage: 175,
        key: "R",
      },
      {
        name: "Rokugan",
        scaling: "Strength",
        baseDamage: 225,
        key: "F",
      },
    ],
  },
];
