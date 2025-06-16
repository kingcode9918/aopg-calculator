export type DamageType = "Strength" | "Fruit" | "Sword" | "Gun";

export interface Move {
  name: string;
  scaling: DamageType;
  numHits?: number;
  burnHits?: number;
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
    modes: [
      {
        moves: [
          { baseDamage: 8.4, key: "M1", name: "Combat", scaling: "Strength" },
          {
            baseDamage: 60.0,
            key: "Q",
            name: "5 Thousand Brick Fist",
            scaling: "Strength",
          },
          {
            baseDamage: 90.0,
            key: "E",
            name: "Kaimen Wari",
            scaling: "Strength",
          },
          {
            baseDamage: 6.0,
            key: "R",
            name: "Shark Bullets",
            numHits: 10,
            scaling: "Strength",
          },
        ],
        name: "Fishman",
      },
    ],
    moves: [
      { baseDamage: 7.0, key: "M1", name: "Combat", scaling: "Strength" },
      {
        baseDamage: 50.0,
        key: "Q",
        name: "5 Thousand Brick Fist",
        scaling: "Strength",
      },
      { baseDamage: 75.0, key: "E", name: "Kaimen Wari", scaling: "Strength" },
      {
        baseDamage: 5.0,
        key: "R",
        name: "Shark Bullets",
        numHits: 10,
        scaling: "Strength",
      },
    ],
    name: "Atlantean Karate",
    type: "Fighting",
  },
  {
    id: 2,
    modes: [
      {
        moves: [
          { baseDamage: 960.0, key: "M1", name: "Combat", scaling: "Strength" },
          {
            baseDamage: 1320.0,
            key: "Q",
            name: "Vagabond Drill",
            numHits: 8,
            scaling: "Strength",
          },
          {
            baseDamage: 7920.0,
            key: "R",
            name: "Demon Brick Fist",
            scaling: "Strength",
          },
          {
            baseDamage: 2160.0,
            key: "F",
            name: "Spear Wave",
            numHits: 5,
            scaling: "Strength",
          },
          {
            baseDamage: 6000.0,
            key: "U",
            name: "Five Thousand Tile True Punch",
            numHits: 2,
            scaling: "Strength",
          },
        ],
        name: "Awakened Fishman",
      },
    ],
    moves: [
      { baseDamage: 800.0, key: "M1", name: "Combat", scaling: "Strength" },
      {
        baseDamage: 550.0,
        key: "Q",
        name: "Vagabond Drill",
        numHits: 8,
        scaling: "Strength",
      },
      {
        baseDamage: 3300.0,
        key: "R",
        name: "Demon Brick Fist",
        scaling: "Strength",
      },
      {
        baseDamage: 900.0,
        key: "F",
        name: "Spear Wave",
        numHits: 5,
        scaling: "Strength",
      },
      {
        baseDamage: 5000.0,
        key: "U",
        name: "Five Thousand Tile True Punch",
        numHits: 2,
        scaling: "Strength",
      },
    ],
    name: "Atlantean Karate V2",
    type: "Fighting",
  },
  {
    id: 3,
    modes: [
      {
        moves: [
          {
            baseDamage: 3600.0,
            key: "M1",
            name: "Clim-Swing",
            scaling: "Strength",
          },
          {
            baseDamage: 630.0,
            key: "Q",
            name: "Zeus Rush",
            numHits: 10,
            scaling: "Strength",
          },
          {
            baseDamage: 1500.0,
            key: "E",
            name: "Thunderbolt Tempo",
            numHits: 5,
            scaling: "Strength",
          },
          {
            baseDamage: 600.0,
            key: "R",
            name: "Thunder Lance Tempo",
            numHits: 15,
            scaling: "Strength",
          },
          {
            baseDamage: 1050.0,
            key: "F",
            name: "Lightning Madness",
            numHits: 10,
            scaling: "Strength",
          },
          {
            baseDamage: 16500.0,
            key: "Y",
            name: "Ninpo: Lightning Blast",
            scaling: "Strength",
          },
        ],
        name: "Weather Eggs",
      },
    ],
    moves: [
      {
        baseDamage: 1200.0,
        key: "M1",
        name: "Clim-Swing",
        scaling: "Strength",
      },
      {
        baseDamage: 210.0,
        key: "Q",
        name: "Zeus Rush",
        numHits: 10,
        scaling: "Strength",
      },
      {
        baseDamage: 500.0,
        key: "E",
        name: "Thunderbolt Tempo",
        numHits: 5,
        scaling: "Strength",
      },
      {
        baseDamage: 200.0,
        key: "R",
        name: "Thunder Lance Tempo",
        numHits: 15,
        scaling: "Strength",
      },
      {
        baseDamage: 350.0,
        key: "F",
        name: "Lightning Madness",
        numHits: 10,
        scaling: "Strength",
      },
      {
        baseDamage: 5500.0,
        key: "Y",
        name: "Ninpo: Lightning Blast",
        scaling: "Strength",
      },
    ],
    name: "Clima Tact",
    type: "Fighting",
  },
  {
    id: 4,
    modes: [
      {
        moves: [
          { baseDamage: 10.5, key: "M1", name: "Combat", scaling: "Strength" },
          {
            baseDamage: 525.0,
            key: "Q",
            name: "Strong Right",
            scaling: "Strength",
          },
          {
            baseDamage: 600.0,
            key: "E",
            name: "Coup De Vent",
            scaling: "Strength",
          },
          {
            baseDamage: 675.0,
            burnHits: 10,
            key: "R",
            name: "Fresh Fire",
            scaling: "Strength",
          },
        ],
        name: "BF-37",
      },
    ],
    moves: [
      { baseDamage: 7.0, key: "M1", name: "Combat", scaling: "Strength" },
      {
        baseDamage: 350.0,
        key: "Q",
        name: "Strong Right",
        scaling: "Strength",
      },
      {
        baseDamage: 400.0,
        key: "E",
        name: "Coup De Vent",
        scaling: "Strength",
      },
      {
        baseDamage: 450.0,
        burnHits: 10,
        key: "R",
        name: "Fresh Fire",
        scaling: "Strength",
      },
    ],
    name: "Cyborg",
    type: "Fighting",
  },
  {
    id: 5,
    modes: [
      {
        moves: [
          {
            baseDamage: 2200.0,
            key: "M1",
            name: "Powerful Kick",
            scaling: "Strength",
          },
          {
            baseDamage: 7400.0,
            key: "Q",
            name: "Concasser",
            scaling: "Strength",
          },
          {
            baseDamage: 8000.0,
            key: "E",
            name: "Queue-Poire-Jarret",
            scaling: "Strength",
          },
          {
            baseDamage: 10800.0,
            key: "R",
            name: "Boeuf Burst",
            scaling: "Strength",
          },
          {
            baseDamage: 9400.0,
            key: "F",
            name: "Flambage Shot",
            scaling: "Strength",
          },
          {
            baseDamage: 20000.0,
            key: "U",
            name: "Hell Memories",
            scaling: "Strength",
          },
        ],
        name: "Mastered Ifrit",
      },
    ],
    moves: [
      {
        baseDamage: 1100.0,
        key: "M1",
        name: "Powerful Kick",
        scaling: "Strength",
      },
      { baseDamage: 3700.0, key: "Q", name: "Concasser", scaling: "Strength" },
      {
        baseDamage: 4000.0,
        key: "E",
        name: "Queue-Poire-Jarret",
        scaling: "Strength",
      },
      {
        baseDamage: 5400.0,
        key: "R",
        name: "Boeuf Burst",
        scaling: "Strength",
      },
      {
        baseDamage: 4700.0,
        key: "F",
        name: "Flambage Shot",
        scaling: "Strength",
      },
      {
        baseDamage: 10000.0,
        key: "U",
        name: "Hell Memories",
        scaling: "Strength",
      },
    ],
    name: "Final Ifrit",
    type: "Fighting",
  },
  {
    id: 6,
    modes: [
      {
        moves: [
          {
            baseDamage: 1050.0,
            key: "M1",
            name: "Combat",
            scaling: "Strength",
          },
          {
            baseDamage: 808.0,
            key: "Q",
            name: "Meteor Fist",
            numHits: 7,
            scaling: "Strength",
          },
          {
            baseDamage: 7350.0,
            key: "E",
            name: "Sattelite Fist",
            scaling: "Strength",
          },
          {
            baseDamage: 6825.0,
            key: "R",
            name: "Fist of Love",
            scaling: "Strength",
          },
          {
            baseDamage: 5740.0,
            key: "F",
            name: "Blue Hole",
            numHits: 2,
            scaling: "Strength",
          },
          {
            baseDamage: 11445.0,
            key: "U",
            name: "Galaxy Impact",
            scaling: "Strength",
          },
        ],
        name: "Hero Mode",
      },
    ],
    moves: [
      { baseDamage: 750.0, key: "M1", name: "Combat", scaling: "Strength" },
      {
        baseDamage: 385.0,
        key: "Q",
        name: "Meteor Fist",
        numHits: 7,
        scaling: "Strength",
      },
      {
        baseDamage: 3500.0,
        key: "E",
        name: "Sattelite Fist",
        scaling: "Strength",
      },
      {
        baseDamage: 3250.0,
        key: "R",
        name: "Fist of Love",
        scaling: "Strength",
      },
      {
        baseDamage: 4100.0,
        key: "F",
        name: "Blue Hole",
        numHits: 2,
        scaling: "Strength",
      },
      {
        baseDamage: 5450.0,
        key: "U",
        name: "Galaxy Impact",
        scaling: "Strength",
      },
    ],
    name: "Fist of Love",
    type: "Fighting",
  },
  {
    id: 7,
    modes: [
      {
        moves: [
          {
            baseDamage: 8.4,
            burnHits: 10,
            key: "M1",
            name: "Kick",
            scaling: "Strength",
          },
          {
            baseDamage: 30.0,
            burnHits: 10,
            key: "Q",
            name: "Anti Manner Kick Course",
            scaling: "Strength",
          },
          {
            baseDamage: 180.0,
            burnHits: 10,
            key: "E",
            name: "Mouton Shot",
            scaling: "Strength",
          },
          {
            baseDamage: 0.6,
            burnHits: 17,
            key: "R",
            name: "Table Party Kick",
            numHits: 5,
            scaling: "Strength",
          },
        ],
        name: "Diable Jambe",
      },
      {
        moves: [
          {
            baseDamage: 8.4,
            burnHits: 10,
            key: "M1",
            name: "Kick",
            scaling: "Strength",
          },
          {
            baseDamage: 30.0,
            burnHits: 10,
            key: "Q",
            name: "Anti Manner Kick Course",
            scaling: "Strength",
          },
          {
            baseDamage: 180.0,
            burnHits: 10,
            key: "E",
            name: "Mouton Shot",
            scaling: "Strength",
          },
          {
            baseDamage: 0.6,
            burnHits: 17,
            key: "R",
            name: "Table Party Kick",
            numHits: 5,
            scaling: "Strength",
          },
        ],
        name: "Double Diable Jambe",
      },
    ],
    moves: [
      { baseDamage: 7.0, key: "M1", name: "Kick", scaling: "Strength" },
      {
        baseDamage: 25.0,
        key: "Q",
        name: "Anti Manner Kick Course",
        scaling: "Strength",
      },
      { baseDamage: 150.0, key: "E", name: "Mouton Shot", scaling: "Strength" },
      {
        baseDamage: 0.5,
        key: "R",
        name: "Table Party Kick",
        numHits: 5,
        scaling: "Strength",
      },
    ],
    name: "Flamme Dansante",
    type: "Fighting",
  },
  {
    id: 8,
    modes: [],
    moves: [{ baseDamage: 7.0, key: "M1", name: "Punch", scaling: "Strength" }],
    name: "Melee",
    type: "Fighting",
  },
  {
    id: 9,
    modes: [
      {
        moves: [
          {
            baseDamage: 4050.0,
            key: "M1",
            name: "Katana Slash",
            scaling: "Sword",
          },
          {
            baseDamage: 11291.0,
            key: "Q",
            name: "Hell Flare",
            numHits: 11,
            scaling: "Fruit",
          },
          {
            baseDamage: 155250.0,
            key: "E",
            name: "Black Lightning",
            scaling: "Fruit",
          },
          {
            baseDamage: 93150.0,
            key: "F",
            name: "Beezlebub",
            numHits: 2,
            scaling: "Fruit",
          },
          {
            baseDamage: 55890.0,
            key: "Y",
            name: "Meggido",
            numHits: 5,
            scaling: "Fruit",
          },
          {
            baseDamage: 21600.0,
            key: "Y",
            name: "Meggido",
            numHits: 5,
            scaling: "Strength",
          },
        ],
        name: "Birth of a Demon Lord",
      },
      {
        moves: [
          {
            baseDamage: 2400.0,
            key: "M1",
            name: "Katana Slash",
            scaling: "Sword",
          },
          {
            baseDamage: 6691.0,
            key: "Q",
            name: "Hell Flare",
            numHits: 11,
            scaling: "Fruit",
          },
          {
            baseDamage: 92000.0,
            key: "E",
            name: "Black Lightning",
            scaling: "Fruit",
          },
          {
            baseDamage: 55200.0,
            key: "F",
            name: "Beezlebub",
            numHits: 2,
            scaling: "Fruit",
          },
          {
            baseDamage: 33120.0,
            key: "Y",
            name: "Meggido",
            numHits: 5,
            scaling: "Fruit",
          },
          {
            baseDamage: 12800.0,
            key: "Y",
            name: "Meggido",
            numHits: 5,
            scaling: "Strength",
          },
        ],
        name: "100% Souls",
      },
      {
        moves: [
          {
            baseDamage: 6480.0,
            key: "M1",
            name: "Katana Slash",
            scaling: "Sword",
          },
          {
            baseDamage: 18066.0,
            key: "Q",
            name: "Hell Flare",
            numHits: 11,
            scaling: "Fruit",
          },
          {
            baseDamage: 248400.0,
            key: "E",
            name: "Black Lightning",
            scaling: "Fruit",
          },
          {
            baseDamage: 149040.0,
            key: "F",
            name: "Beezlebub",
            numHits: 2,
            scaling: "Fruit",
          },
          {
            baseDamage: 89424.0,
            key: "Y",
            name: "Meggido",
            numHits: 5,
            scaling: "Fruit",
          },
          {
            baseDamage: 34560.0,
            key: "Y",
            name: "Meggido",
            numHits: 5,
            scaling: "Strength",
          },
        ],
        name: "Birth of a Demon Lord + 100% Souls",
      },
    ],
    moves: [
      { baseDamage: 1500.0, key: "M1", name: "Katana Slash", scaling: "Sword" },
      {
        baseDamage: 4182.0,
        key: "Q",
        name: "Hell Flare",
        numHits: 11,
        scaling: "Fruit",
      },
      {
        baseDamage: 57500.0,
        key: "E",
        name: "Black Lightning",
        scaling: "Fruit",
      },
      {
        baseDamage: 34500.0,
        key: "F",
        name: "Beezlebub",
        numHits: 2,
        scaling: "Fruit",
      },
      {
        baseDamage: 20700.0,
        key: "Y",
        name: "Meggido",
        numHits: 5,
        scaling: "Fruit",
      },
      {
        baseDamage: 8000.0,
        key: "Y",
        name: "Meggido",
        numHits: 5,
        scaling: "Strength",
      },
    ],
    name: "Reincarnated Slime",
    type: "Fighting",
  },
  {
    id: 10,
    modes: [],
    moves: [
      { baseDamage: 15.0, key: "M1", name: "Combat", scaling: "Strength" },
      { baseDamage: 155.0, key: "Q", name: "Rankyaku", scaling: "Strength" },
      { baseDamage: 175.0, key: "R", name: "Shigan", scaling: "Strength" },
      { baseDamage: 225.0, key: "F", name: "Rokugan", scaling: "Strength" },
    ],
    name: "Six Styles",
    type: "Fighting",
  },
  {
    id: 11,
    modes: [
      {
        moves: [
          {
            baseDamage: 1050.0,
            key: "M1",
            name: "Sorcerer Slash",
            scaling: "Strength",
          },
          { baseDamage: 3150.0, key: "Q", name: "Cleave", scaling: "Strength" },
          {
            baseDamage: 6370.0,
            key: "E",
            name: "Spiderweb Cleave",
            scaling: "Strength",
          },
          {
            baseDamage: 3990.0,
            key: "R",
            name: "Flame Arrow",
            scaling: "Strength",
          },
          {
            baseDamage: 7910.0,
            key: "Y",
            name: "World Cut",
            scaling: "Strength",
          },
          {
            baseDamage: 1300.0,
            key: "G",
            name: "Domain Expansion",
            numHits: 4,
            scaling: "Strength",
          },
        ],
        name: "Domain Expansion",
      },
      {
        moves: [
          {
            baseDamage: 1530.0,
            key: "M1",
            name: "Sorcerer Slash",
            scaling: "Strength",
          },
          {
            baseDamage: 6800.0,
            key: "Q",
            name: "General's Rage",
            scaling: "Strength",
          },
          {
            baseDamage: 7735.0,
            key: "E",
            name: "Spiderweb Cleave",
            scaling: "Strength",
          },
          {
            baseDamage: 5780.0,
            key: "R",
            name: "General's Roar",
            scaling: "Strength",
          },
          {
            baseDamage: 9605.0,
            key: "Y",
            name: "World Cut",
            scaling: "Strength",
          },
        ],
        name: "King of Curses",
      },
      {
        moves: [
          {
            baseDamage: 2142.0,
            key: "M1",
            name: "Sorcerer Slash",
            scaling: "Strength",
          },
          { baseDamage: 9520.0, key: "Q", name: "Cleave", scaling: "Strength" },
          {
            baseDamage: 10829.0,
            key: "E",
            name: "Spiderweb Cleave",
            scaling: "Strength",
          },
          {
            baseDamage: 8092.0,
            key: "R",
            name: "Flame Arrow",
            scaling: "Strength",
          },
          {
            baseDamage: 13447.0,
            key: "Y",
            name: "World Cut",
            scaling: "Strength",
          },
          {
            baseDamage: 2210.0,
            key: "G",
            name: "Domain Expansion",
            numHits: 4,
            scaling: "Strength",
          },
        ],
        name: "Domain Expansion + King of Curses",
      },
    ],
    moves: [
      {
        baseDamage: 750.0,
        key: "M1",
        name: "Sorcerer Slash",
        scaling: "Strength",
      },
      { baseDamage: 2250.0, key: "Q", name: "Cleave", scaling: "Strength" },
      {
        baseDamage: 4550.0,
        key: "E",
        name: "Spiderweb Cleave",
        scaling: "Strength",
      },
      {
        baseDamage: 2850.0,
        key: "R",
        name: "Flame Arrow",
        scaling: "Strength",
      },
      { baseDamage: 5650.0, key: "Y", name: "World Cut", scaling: "Strength" },
    ],
    name: "Sukuna",
    type: "Fighting",
  },
  {
    id: 12,
    modes: [
      {
        moves: [
          {
            baseDamage: 2520.0,
            key: "M1",
            name: "Justice Punch",
            scaling: "Strength",
          },
          {
            baseDamage: 2800.0,
            key: "Q",
            name: "Still Got It",
            numHits: 3,
            scaling: "Strength",
          },
          {
            baseDamage: 546.0,
            key: "E",
            name: "Cannonball Hail",
            numHits: 10,
            scaling: "Strength",
          },
          {
            baseDamage: 9660.0,
            key: "R",
            name: "Blue Hole",
            scaling: "Strength",
          },
          {
            baseDamage: 12075.0,
            key: "F",
            name: "Galaxy Divide",
            scaling: "Strength",
          },
          {
            baseDamage: 23940.0,
            key: "Y",
            name: "True Galaxy Impact",
            scaling: "Strength",
          },
        ],
        name: "Old Era",
      },
    ],
    moves: [
      {
        baseDamage: 1200.0,
        key: "M1",
        name: "Justice Punch",
        scaling: "Strength",
      },
      {
        baseDamage: 1333.0,
        key: "Q",
        name: "Still Got It",
        numHits: 3,
        scaling: "Strength",
      },
      {
        baseDamage: 260.0,
        key: "E",
        name: "Cannonball Hail",
        numHits: 10,
        scaling: "Strength",
      },
      { baseDamage: 4600.0, key: "R", name: "Blue Hole", scaling: "Strength" },
      {
        baseDamage: 5750.0,
        key: "F",
        name: "Galaxy Divide",
        scaling: "Strength",
      },
      {
        baseDamage: 11400.0,
        key: "Y",
        name: "True Galaxy Impact",
        scaling: "Strength",
      },
    ],
    name: "The Hero",
    type: "Fighting",
  },
  {
    id: 13,
    modes: [
      {
        moves: [
          { baseDamage: 8.4, key: "M1", name: "Punch", scaling: "Strength" },
          {
            baseDamage: 36.0,
            key: "Q",
            name: "Electro Discharge",
            scaling: "Strength",
          },
          {
            baseDamage: 228.0,
            key: "E",
            name: "Electro Rush",
            scaling: "Strength",
          },
          {
            baseDamage: 48.0,
            key: "R",
            name: "Electro Smash",
            scaling: "Strength",
          },
        ],
        name: "Electricity",
      },
    ],
    moves: [
      { baseDamage: 7.0, key: "M1", name: "Punch", scaling: "Strength" },
      {
        baseDamage: 30.0,
        key: "Q",
        name: "Electro Discharge",
        scaling: "Strength",
      },
      {
        baseDamage: 190.0,
        key: "E",
        name: "Electro Rush",
        scaling: "Strength",
      },
      {
        baseDamage: 40.0,
        key: "R",
        name: "Electro Smash",
        scaling: "Strength",
      },
    ],
    name: "Thunder Spark",
    type: "Fighting",
  },
  {
    id: 14,
    modes: [
      {
        moves: [
          {
            baseDamage: 1800.0,
            key: "M1",
            name: "Combat",
            scaling: "Strength",
          },
          {
            baseDamage: 3600.0,
            key: "Q",
            name: "Eleclaw",
            numHits: 2,
            scaling: "Strength",
          },
          {
            baseDamage: 7650.0,
            key: "E",
            name: "Electrical Moon",
            scaling: "Strength",
          },
          {
            baseDamage: 9450.0,
            key: "R",
            name: "Moon Dance",
            scaling: "Strength",
          },
          {
            baseDamage: 2550.0,
            key: "F",
            name: "Static Talons",
            numHits: 4,
            scaling: "Strength",
          },
          {
            baseDamage: 5700.0,
            key: "U",
            name: "Canine Scourge",
            numHits: 2,
            scaling: "Strength",
          },
        ],
        name: "Sulong",
      },
    ],
    moves: [
      { baseDamage: 600.0, key: "M1", name: "Combat", scaling: "Strength" },
      {
        baseDamage: 1200.0,
        key: "Q",
        name: "Eleclaw",
        numHits: 2,
        scaling: "Strength",
      },
      {
        baseDamage: 2550.0,
        key: "E",
        name: "Electrical Moon",
        scaling: "Strength",
      },
      { baseDamage: 3150.0, key: "R", name: "Moon Dance", scaling: "Strength" },
      {
        baseDamage: 850.0,
        key: "F",
        name: "Static Talons",
        numHits: 4,
        scaling: "Strength",
      },
      {
        baseDamage: 1900.0,
        key: "U",
        name: "Canine Scourge",
        numHits: 2,
        scaling: "Strength",
      },
    ],
    name: "Thunder Spark V2",
    type: "Fighting",
  },
  {
    id: 15,
    modes: [
      {
        moves: [
          {
            baseDamage: 384.0,
            burnHits: 10,
            key: "M1",
            name: "Combat",
            scaling: "Strength",
          },
          {
            baseDamage: 2160.0,
            burnHits: 10,
            key: "Q",
            name: "Collier Shoot",
            scaling: "Strength",
          },
          {
            baseDamage: 270.0,
            burnHits: 10,
            key: "E",
            name: "Extra Hachis",
            numHits: 11,
            scaling: "Strength",
          },
          {
            baseDamage: 3840.0,
            burnHits: 10,
            key: "R",
            name: "Anti-Manner Kick Course",
            scaling: "Strength",
          },
          {
            baseDamage: 4200.0,
            burnHits: 10,
            key: "F",
            name: "Shishinabe Shoot",
            scaling: "Strength",
          },
          {
            baseDamage: 5520.0,
            burnHits: 10,
            key: "Y",
            name: "No Room For Dessert",
            numHits: 2,
            scaling: "Strength",
          },
        ],
        name: "Red True Diable Jambe",
      },
      {
        moves: [
          {
            baseDamage: 384.0,
            burnHits: 10,
            key: "M1",
            name: "Combat",
            scaling: "Strength",
          },
          {
            baseDamage: 2160.0,
            burnHits: 10,
            key: "Q",
            name: "Collier Shoot",
            scaling: "Strength",
          },
          {
            baseDamage: 270.0,
            burnHits: 10,
            key: "E",
            name: "Extra Hachis",
            numHits: 11,
            scaling: "Strength",
          },
          {
            baseDamage: 3840.0,
            burnHits: 10,
            key: "R",
            name: "Anti-Manner Kick Course",
            scaling: "Strength",
          },
          {
            baseDamage: 4200.0,
            burnHits: 10,
            key: "F",
            name: "Shishinabe Shoot",
            scaling: "Strength",
          },
          {
            baseDamage: 5520.0,
            burnHits: 10,
            key: "Y",
            name: "No Room For Dessert",
            numHits: 2,
            scaling: "Strength",
          },
        ],
        name: "Blue True Diable Jambe",
      },
    ],
    moves: [
      { baseDamage: 320.0, key: "M1", name: "Combat", scaling: "Strength" },
      {
        baseDamage: 1800.0,
        key: "Q",
        name: "Collier Shoot",
        scaling: "Strength",
      },
      {
        baseDamage: 225.0,
        key: "E",
        name: "Extra Hachis",
        numHits: 11,
        scaling: "Strength",
      },
      {
        baseDamage: 3200.0,
        key: "R",
        name: "Anti-Manner Kick Course",
        scaling: "Strength",
      },
      {
        baseDamage: 3500.0,
        key: "F",
        name: "Shishinabe Shoot",
        scaling: "Strength",
      },
    ],
    name: "True Flamme Dansante",
    type: "Fighting",
  },
  {
    id: 16,
    modes: [
      {
        moves: [
          {
            baseDamage: 6486.0,
            key: "M1",
            name: "Cyber Punch",
            scaling: "Strength",
          },
          {
            baseDamage: 14421.0,
            key: "Q",
            name: "Seismic Gust",
            scaling: "Strength",
          },
          {
            baseDamage: 19780.0,
            key: "E",
            name: "Smash Buster",
            scaling: "Strength",
          },
          {
            baseDamage: 6479.0,
            key: "R",
            name: "Tectonic Fissure",
            numHits: 3,
            scaling: "Strength",
          },
          {
            baseDamage: 2070.0,
            key: "F",
            name: "Chrono Ray",
            numHits: 12,
            scaling: "Strength",
          },
          {
            baseDamage: 13225.0,
            key: "Y",
            name: "Dynatastrophe",
            scaling: "Fruit",
          },
        ],
        name: "Mechanical Augment",
      },
    ],
    moves: [
      {
        baseDamage: 2820.0,
        key: "M1",
        name: "Cyber Punch",
        scaling: "Strength",
      },
      {
        baseDamage: 6270.0,
        key: "Q",
        name: "Seismic Gust",
        scaling: "Strength",
      },
      {
        baseDamage: 8600.0,
        key: "E",
        name: "Smash Buster",
        scaling: "Strength",
      },
      {
        baseDamage: 2817.0,
        key: "R",
        name: "Tectonic Fissure",
        numHits: 3,
        scaling: "Strength",
      },
      {
        baseDamage: 900.0,
        key: "F",
        name: "Chrono Ray",
        numHits: 12,
        scaling: "Strength",
      },
      { baseDamage: 5750.0, key: "Y", name: "Dynatastrophe", scaling: "Fruit" },
    ],
    name: "Ultimate Cyborg",
    type: "Fighting",
  },
  {
    id: 17,
    modes: [
      {
        moves: [
          {
            baseDamage: 5250.0,
            key: "M1",
            name: "Soaring Fist",
            scaling: "Strength",
          },
          {
            baseDamage: 10500.0,
            key: "Q",
            name: "Celestial Whirlwind",
            scaling: "Strength",
          },
          {
            baseDamage: 13250.0,
            key: "E",
            name: "Dragon Fist",
            scaling: "Strength",
          },
          {
            baseDamage: 21250.0,
            key: "R",
            name: "Warp Kamehameha",
            scaling: "Strength",
          },
          {
            baseDamage: 36500.0,
            key: "U",
            name: "Supreme Kamehameha",
            scaling: "Strength",
          },
        ],
        name: "Mastered Ultra Instinct",
      },
    ],
    moves: [
      {
        baseDamage: 2100.0,
        key: "M1",
        name: "Soaring Fist",
        scaling: "Strength",
      },
      {
        baseDamage: 4200.0,
        key: "Q",
        name: "Celestial Whirlwind",
        scaling: "Strength",
      },
      {
        baseDamage: 5300.0,
        key: "E",
        name: "Dragon Fist",
        scaling: "Strength",
      },
      {
        baseDamage: 8500.0,
        key: "R",
        name: "Warp Kamehameha",
        scaling: "Strength",
      },
      {
        baseDamage: 14600.0,
        key: "U",
        name: "Supreme Kamehameha",
        scaling: "Strength",
      },
    ],
    name: "Ultra Instinct",
    type: "Fighting",
  },
  {
    id: 18,
    modes: [
      {
        moves: [
          { baseDamage: 5600.0, key: "M1", name: "Bo Dance", scaling: "Sword" },
          {
            baseDamage: 11200.0,
            key: "Q",
            name: "Focused Slam",
            scaling: "Sword",
          },
          {
            baseDamage: 12600.0,
            key: "E",
            name: "Pillar Pound",
            scaling: "Sword",
          },
          {
            baseDamage: 14000.0,
            key: "R",
            name: "Staff Thrust",
            scaling: "Sword",
          },
          {
            baseDamage: 26600.0,
            key: "F",
            name: "Pluck of Many",
            scaling: "Sword",
          },
        ],
        name: "One Scroll Focus",
      },
      {
        moves: [
          { baseDamage: 8000.0, key: "M1", name: "Bo Dance", scaling: "Sword" },
          {
            baseDamage: 16000.0,
            key: "Q",
            name: "Focused Slam",
            scaling: "Sword",
          },
          {
            baseDamage: 18000.0,
            key: "E",
            name: "Pillar Pound",
            scaling: "Sword",
          },
          {
            baseDamage: 20000.0,
            key: "R",
            name: "Staff Thrust",
            scaling: "Sword",
          },
          {
            baseDamage: 38000.0,
            key: "F",
            name: "Pluck of Many",
            scaling: "Sword",
          },
        ],
        name: "Two Scroll Focus",
      },
      {
        moves: [
          {
            baseDamage: 10600.0,
            key: "M1",
            name: "Bo Dance",
            scaling: "Sword",
          },
          {
            baseDamage: 21200.0,
            key: "Q",
            name: "Focused Slam",
            scaling: "Sword",
          },
          {
            baseDamage: 23850.0,
            key: "E",
            name: "Pillar Pound",
            scaling: "Sword",
          },
          {
            baseDamage: 26500.0,
            key: "R",
            name: "Staff Thrust",
            scaling: "Sword",
          },
          {
            baseDamage: 50350.0,
            key: "F",
            name: "Pluck of Many",
            scaling: "Sword",
          },
        ],
        name: "Three Scroll Focus",
      },
      {
        moves: [
          {
            baseDamage: 13400.0,
            key: "M1",
            name: "Bo Dance",
            scaling: "Sword",
          },
          {
            baseDamage: 26800.0,
            key: "Q",
            name: "Focused Slam",
            scaling: "Sword",
          },
          {
            baseDamage: 30150.0,
            key: "E",
            name: "Pillar Pound",
            scaling: "Sword",
          },
          {
            baseDamage: 33500.0,
            key: "R",
            name: "Staff Thrust",
            scaling: "Sword",
          },
          {
            baseDamage: 50350.0,
            key: "F",
            name: "Pluck of Many",
            scaling: "Sword",
          },
        ],
        name: "Four Scroll Focus",
      },
    ],
    moves: [
      { baseDamage: 4000.0, key: "M1", name: "Bo Dance", scaling: "Sword" },
      { baseDamage: 8000.0, key: "Q", name: "Focused Slam", scaling: "Sword" },
      { baseDamage: 9000.0, key: "E", name: "Pillar Pound", scaling: "Sword" },
      { baseDamage: 10000.0, key: "R", name: "Staff Thrust", scaling: "Sword" },
      {
        baseDamage: 19000.0,
        key: "F",
        name: "Pluck of Many",
        scaling: "Sword",
      },
    ],
    name: "Wukong",
    type: "Fighting",
  },
  {
    id: 19,
    modes: [
      {
        moves: [
          {
            baseDamage: 1920.0,
            burnHits: 10,
            key: "M1",
            name: "Dragon Claw Strike",
            scaling: "Strength",
          },
          {
            baseDamage: 7200.0,
            burnHits: 10,
            key: "Q",
            name: "Dragon's Talon",
            scaling: "Strength",
          },
          {
            baseDamage: 8400.0,
            burnHits: 10,
            key: "E",
            name: "Dragon's Breath",
            scaling: "Strength",
          },
          {
            baseDamage: 9600.0,
            burnHits: 10,
            key: "R",
            name: "Dragon's Fist",
            scaling: "Strength",
          },
          {
            baseDamage: 2842.0,
            burnHits: 37,
            key: "F",
            name: "Blazing Dragon Drill",
            numHits: 4,
            scaling: "Strength",
          },
          {
            baseDamage: 12480.0,
            burnHits: 10,
            key: "U",
            name: "Dragon Emperor",
            scaling: "Strength",
          },
        ],
        name: "Dragon's Flame",
      },
    ],
    moves: [
      {
        baseDamage: 800.0,
        key: "M1",
        name: "Dragon Claw Strike",
        scaling: "Strength",
      },
      {
        baseDamage: 3000.0,
        key: "Q",
        name: "Dragon's Talon",
        scaling: "Strength",
      },
      {
        baseDamage: 3500.0,
        key: "E",
        name: "Dragon's Breath",
        scaling: "Strength",
      },
      {
        baseDamage: 4000.0,
        key: "R",
        name: "Dragon's Fist",
        scaling: "Strength",
      },
    ],
    name: "Wyrm Claw",
    type: "Fighting",
  },
];
