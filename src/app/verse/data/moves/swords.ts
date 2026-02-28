import { generateHits, type MoveSet } from "./types";

export const swordsData: MoveSet[] = [
  {
    id: 0,
    name: "Katana",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 7.5, count: 3 }),
        ...generateHits({ baseDamage: 10, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 10, count: 10 })] },
  },
  {
    id: 1,
    name: "Saber",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 15, count: 3 }),
        ...generateHits({ baseDamage: 17.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 30, count: 10 })] },
    X: { hits: [...generateHits({ baseDamage: 3.5, count: 10 })] },
  },
  {
    id: 2,
    name: "Yoru",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 15, count: 3 }),
        ...generateHits({ baseDamage: 17.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 25, count: 10 })] },
    X: { hits: [...generateHits({ baseDamage: 20, count: 1 })] },
  },
  {
    id: 3,
    name: "Kashimo",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 20, count: 3 }),
        ...generateHits({ baseDamage: 22.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 30, count: 1, upgrade: 0 })] },
    X: { hits: [...generateHits({ baseDamage: 30, count: 1, upgrade: 0 })] },
    C: { hits: [...generateHits({ baseDamage: 45, count: 1, upgrade: 0 })] },
  },
  {
    id: 4,
    name: "Excalibur",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 20, count: 3 }),
        ...generateHits({ baseDamage: 22.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 35, count: 1 })] },
    X: { hits: [...generateHits({ baseDamage: 50, count: 1 })] },
  },
  {
    id: 5,
    name: "Toji",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 25, count: 3 }),
        ...generateHits({ baseDamage: 27.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 40, count: 1, upgrade: 0 })] },
    X: { hits: [...generateHits({ baseDamage: 4, count: 10, upgrade: 0 })] },
    C: { hits: [...generateHits({ baseDamage: 45, count: 1, upgrade: 0 })] },
  },
  {
    id: 6,
    name: "Ichigo",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 25, count: 3 }),
        ...generateHits({ baseDamage: 27.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 9, count: 10, upgrade: 0.25 })] },
    X: { hits: [...generateHits({ baseDamage: 80, count: 1 })] },
    C: { hits: [...generateHits({ baseDamage: 100, count: 1, upgrade: 5 })] },
  },
  {
    id: 7,
    name: "Shusui",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 25, count: 3 }),
        ...generateHits({ baseDamage: 27.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 2.5, count: 30 })] },
    X: { hits: [...generateHits({ baseDamage: 2.5, count: 30, upgrade: 0 })] },
    C: { hits: [...generateHits({ baseDamage: 80, count: 1 })] },
  },
  {
    id: 8,
    name: "Starkk",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 25, count: 3 }),
        ...generateHits({ baseDamage: 27.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 45, count: 1 })] },
    X: {
      hits: [...generateHits({ baseDamage: 2.75, count: 20, upgrade: 0.5 })],
    },
    C: {
      hits: [...generateHits({ baseDamage: 2.5, count: 30, upgrade: 0.5 })],
    },
  },
  {
    id: 9,
    name: "Maki",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 20, count: 3 }),
        ...generateHits({ baseDamage: 22.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 60, count: 1 })] },
    X: { hits: [...generateHits({ baseDamage: 75, count: 3 })] },
    C: { hits: [...generateHits({ baseDamage: 8, count: 10, upgrade: 0.5 })] },
  },
  {
    id: 10,
    name: "Cid Kagenou",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 97.5, count: 3 }),
        ...generateHits({ baseDamage: 105, count: 1 }),
      ],
    },
    Z: {
      hits: [
        ...generateHits({ baseDamage: 75, count: 2 }),
        ...generateHits({ baseDamage: 90, count: 1 }),
      ],
      upgrade: 1,
    },
    X: {
      hits: [
        ...generateHits({ baseDamage: 150, count: 1, upgrade: 1 }),
        ...generateHits({ baseDamage: 18, count: 5, upgrade: 0.25 }),
      ],
    },
    C: {
      hits: [...generateHits({ baseDamage: 8.55, count: 35, upgrade: 0.15 })],
    },
    V: {
      hits: [...generateHits({ baseDamage: 12, count: 30, upgrade: 0.25 })],
    },
  },
  {
    id: 11,
    name: "Cid's",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 210, count: 3 }),
        ...generateHits({ baseDamage: 225, count: 1 }),
      ],
    },
    Z: {
      hits: [
        ...generateHits({ baseDamage: 300, count: 2, upgrade: 1 }),
        ...generateHits({ baseDamage: 900, count: 1, upgrade: 1 }),
      ],
    },
    X: {
      hits: [
        ...generateHits({ baseDamage: 420, count: 1, upgrade: 1 }),
        ...generateHits({ baseDamage: 180, count: 8, upgrade: 0.25 }),
      ],
    },
    C: {
      hits: [...generateHits({ baseDamage: 54, count: 35, upgrade: 0.25 })],
    },
    V: {
      hits: [...generateHits({ baseDamage: 45, count: 50, upgrade: 0.25 })],
    },
    F: {
      hits: [...generateHits({ baseDamage: 120, count: 40, upgrade: 0.25 })],
    },
  },
  {
    id: 12,
    name: "Zenitsu",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 42.5, count: 3 }),
        ...generateHits({ baseDamage: 47.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 150, count: 1 })] },
    X: {
      hits: [...generateHits({ baseDamage: 4.5, count: 25, upgrade: 0.25 })],
    },
    C: { hits: [...generateHits({ baseDamage: 150, count: 1 })] },
    V: {
      hits: [...generateHits({ baseDamage: 12, count: 17, upgrade: 0.25 })],
    },
  },
  {
    id: 13,
    name: "Kokushibo",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 37.5, count: 3 }),
        ...generateHits({ baseDamage: 42.5, count: 1 }),
      ],
    },
    Z: {
      hits: [...generateHits({ baseDamage: 3.5, count: 40, upgrade: 0.25 })],
    },
    X: { hits: [...generateHits({ baseDamage: 8, count: 20, upgrade: 0.25 })] },
    C: { hits: [...generateHits({ baseDamage: 150, count: 1, upgrade: 5 })] },
    V: { hits: [...generateHits({ baseDamage: 5, count: 30, upgrade: 0.25 })] },
  },
  {
    id: 14,
    name: "Cha Haein",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 47.5, count: 3 }),
        ...generateHits({ baseDamage: 52.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 200, count: 1, upgrade: 5 })] },
    X: {
      hits: [...generateHits({ baseDamage: 25, count: 10, upgrade: 0.25 })],
    },
    C: {
      hits: [...generateHits({ baseDamage: 15, count: 15, upgrade: 0.25 })],
    },
    V: {
      hits: [
        ...generateHits({ baseDamage: 75, count: 2 }),
        ...generateHits({ baseDamage: 100, count: 1, upgrade: 5 }),
      ],
    },
  },
  {
    id: 15,
    name: "Lancer",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 47.5, count: 3 }),
        ...generateHits({ baseDamage: 52.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 250, count: 1 })] },
    X: {
      hits: [
        ...generateHits({ baseDamage: 25, count: 8, upgrade: 0.5 }),
        ...generateHits({ baseDamage: 100, count: 1 }),
      ],
    },
    C: { hits: [...generateHits({ baseDamage: 150, count: 2 })] },
    V: { hits: [...generateHits({ baseDamage: 375, count: 1 })] },
    F: {
      hits: [...generateHits({ baseDamage: 15, count: 40, upgrade: 0.25 })],
    },
  },
  {
    id: 16,
    name: "Toji (UL)",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 32.5, count: 3 }),
        ...generateHits({ baseDamage: 42.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 8, count: 25, upgrade: 0.25 })] },
    X: {
      hits: [
        ...generateHits({ baseDamage: 50, count: 2 }),
        ...generateHits({ baseDamage: 100, count: 1 }),
      ],
    },
    C: {
      hits: [
        ...generateHits({ baseDamage: 15, count: 7, upgrade: 0.25 }),
        ...generateHits({ baseDamage: 100, count: 1 }),
      ],
    },
    V: { hits: [...generateHits({ baseDamage: 250, count: 1, upgrade: 5 })] },
  },
  {
    id: 17,
    name: "Vergil",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 30, count: 3 }),
        ...generateHits({ baseDamage: 32.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 15, count: 1, upgrade: 1 })] },
    X: {
      hits: [...generateHits({ baseDamage: 8, count: 10, upgrade: 0.25 })],
    },
    C: { hits: [...generateHits({ baseDamage: 100, count: 1, upgrade: 5 })] },
    V: { hits: [...generateHits({ baseDamage: 150, count: 1, upgrade: 2.5 })] },
  },
  {
    id: 18,
    name: "Butterflies",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 162.5, count: 3 }),
        ...generateHits({ baseDamage: 187.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 45, count: 22, upgrade: 0.5 })] },
    X: {
      hits: [...generateHits({ baseDamage: 875, count: 1, upgrade: 5 })],
    },
    C: { hits: [...generateHits({ baseDamage: 250, count: 1, upgrade: 5 })] },
    V: {
      hits: [...generateHits({ baseDamage: 15, count: 60, upgrade: 0.25 })],
    },
    F: { hits: [], desc: "Mode" },
  },
  {
    id: 19,
    name: "Butterflies + Mode",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 187.5, count: 3 }),
        ...generateHits({ baseDamage: 212.5, count: 1 }),
      ],
    },
    Z: {
      hits: [...generateHits({ baseDamage: 57.5, count: 22, upgrade: 0.5 })],
    },
    X: {
      hits: [...generateHits({ baseDamage: 1000, count: 1, upgrade: 5 })],
    },
    C: { hits: [...generateHits({ baseDamage: 375, count: 1, upgrade: 5 })] },
    V: {
      hits: [...generateHits({ baseDamage: 20, count: 60, upgrade: 0.25 })],
    },
    F: { hits: [], desc: "Mode" },
  },
  {
    id: 20,
    name: "Starkk (LL)",
    M1: { hits: [...generateHits({ baseDamage: 30, count: 1 })] },
    Z: { hits: [...generateHits({ baseDamage: 14, count: 17, upgrade: 0.5 })] },
    X: {
      hits: [...generateHits({ baseDamage: 15, count: 17, upgrade: 0.5 })],
    },
    C: {
      hits: [
        ...generateHits({ baseDamage: 50, count: 2 }),
        ...generateHits({ baseDamage: 125, count: 1 }),
      ],
    },
    V: { hits: [...generateHits({ baseDamage: 8, count: 45, upgrade: 0.25 })] },
    F: { hits: [], desc: "Mode" },
  },
  {
    id: 21,
    name: "Starkk (LL) + Mode",
    M1: { hits: [...generateHits({ baseDamage: 40, count: 1 })] },
    Z: { hits: [...generateHits({ baseDamage: 18, count: 17, upgrade: 0.5 })] },
    X: {
      hits: [...generateHits({ baseDamage: 19, count: 17, upgrade: 0.5 })],
    },
    C: {
      hits: [
        ...generateHits({ baseDamage: 75, count: 2 }),
        ...generateHits({ baseDamage: 175, count: 1 }),
      ],
    },
    V: {
      hits: [...generateHits({ baseDamage: 13, count: 45, upgrade: 0.25 })],
    },
    F: { hits: [], desc: "Mode" },
  },
  {
    id: 22,
    name: "Red Mist",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 240, count: 3 }),
        ...generateHits({ baseDamage: 255, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 210, count: 1, upgrade: 1 })] },
    X: { hits: [...generateHits({ baseDamage: 900, count: 1, upgrade: 1 })] },
    C: { hits: [...generateHits({ baseDamage: 900, count: 1, upgrade: 1 })] },
    V: { hits: [...generateHits({ baseDamage: 1200, count: 1, upgrade: 1 })] },
    F: { hits: [], desc: "Mode" },
  },
  {
    id: 23,
    name: "Red Mist + Mode",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 240, count: 3 }),
        ...generateHits({ baseDamage: 255, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 300, count: 1, upgrade: 1 })] },
    X: { hits: [...generateHits({ baseDamage: 1200, count: 1, upgrade: 1 })] },
    C: { hits: [...generateHits({ baseDamage: 1200, count: 1, upgrade: 1 })] },
    V: { hits: [...generateHits({ baseDamage: 1500, count: 1, upgrade: 1 })] },
    F: { hits: [], desc: "Mode" },
  },
  {
    id: 24,
    name: "Sung Jin Woo",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 42.5, count: 3 }),
        ...generateHits({ baseDamage: 47.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 60, count: 3, upgrade: 1 })] },
    X: { hits: [...generateHits({ baseDamage: 175, count: 1, upgrade: 5 })] },
    C: { hits: [...generateHits({ baseDamage: 9, count: 25, upgrade: 0.25 })] },
    V: { hits: [...generateHits({ baseDamage: 6, count: 50, upgrade: 0.25 })] },
  },
  {
    id: 25,
    name: "Emiya",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 47.5, count: 3 }),
        ...generateHits({ baseDamage: 52.5, count: 1 }),
      ],
    },
    Z: {
      hits: [
        ...generateHits({ baseDamage: 15, count: 12, upgrade: 5 }),
        ...generateHits({ baseDamage: 70, count: 1, upgrade: 5 }),
      ],
    },
    X: { hits: [...generateHits({ baseDamage: 125, count: 2, upgrade: 5 })] },
    C: { hits: [...generateHits({ baseDamage: 350, count: 1, upgrade: 5 })] },
    V: { hits: [...generateHits({ baseDamage: 400, count: 5, upgrade: 5 })] },
  },
  {
    id: 26,
    name: "Kamish Wrath",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 285, count: 3 }),
        ...generateHits({ baseDamage: 315, count: 1 }),
      ],
    },
    Z: {
      hits: [...generateHits({ baseDamage: 105, count: 25, upgrade: 0.25 })],
    },
    X: { hits: [...generateHits({ baseDamage: 2250, count: 1, upgrade: 5 })] },
    C: {
      hits: [
        ...generateHits({ baseDamage: 30, count: 20, upgrade: 0.25 }),
        ...generateHits({ baseDamage: 300, count: 1, upgrade: 5 }),
        ...generateHits({ baseDamage: 60, count: 20, upgrade: 0.25 }),
        ...generateHits({ baseDamage: 50, count: 1, upgrade: 5 }),
      ],
    },
    V: {
      hits: [
        ...generateHits({ baseDamage: 300, count: 1, upgrade: 5 }),
        ...generateHits({ baseDamage: 600, count: 2, upgrade: 5 }),
        ...generateHits({ baseDamage: 900, count: 1, upgrade: 5 }),
      ],
    },
  },
  {
    id: 27,
    name: "Voidedge",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 47.5, count: 3 }),
        ...generateHits({ baseDamage: 52.5, count: 1 }),
      ],
    },
    Z: {
      hits: [
        ...generateHits({ baseDamage: 20, count: 27, upgrade: 0.25 }),
        ...generateHits({ baseDamage: 50, count: 2, upgrade: 0.25 }),
      ],
    },
    X: {
      hits: [
        ...generateHits({ baseDamage: 10, count: 1, upgrade: 0.6 }),
        ...generateHits({ baseDamage: 15, count: 37, upgrade: 0.25 }),
      ],
    },
    C: {
      hits: [
        ...generateHits({ baseDamage: 15, count: 22, upgrade: 5 }),
        ...generateHits({ baseDamage: 115, count: 1, upgrade: 5 }),
        ...generateHits({ baseDamage: 115, count: 1, upgrade: 6 }),
        ...generateHits({ baseDamage: 115, count: 1, upgrade: 10 }),
      ],
    },
    V: { hits: [...generateHits({ baseDamage: 450, count: 1, upgrade: 5 })] },
  },
  {
    id: 28,
    name: "Uryu",
    M1: {
      hits: [
        ...generateHits({ baseDamage: 47.5, count: 3 }),
        ...generateHits({ baseDamage: 52.5, count: 1 }),
      ],
    },
    Z: { hits: [...generateHits({ baseDamage: 300, count: 1 })] },
    X: { hits: [...generateHits({ baseDamage: 350, count: 1 })] },
    C: { hits: [...generateHits({ baseDamage: 10, count: 40, upgrade: 0.5 })] },
    V: { hits: [...generateHits({ baseDamage: 600, count: 1 })] },
  },
  {
    id: 29,
    name: "Ichigo (TYBW)",
    M1: {
      hits: [...generateHits({ baseDamage: 150, count: 1 })],
    },
    Z: {
      hits: [
        ...generateHits({ baseDamage: 250, count: 1 }),
        ...generateHits({ baseDamage: 562.5, count: 1 }),
      ],
    },
    X: { hits: [...generateHits({ baseDamage: 1062.5, count: 1 })] },
    C: {
      hits: [
        ...generateHits({ baseDamage: 5, count: 1 }),
        ...generateHits({ baseDamage: 10, count: 1 }),
      ],
    },
    V: { hits: [...generateHits({ baseDamage: 800, count: 2 })] },
    F: { hits: [], desc: "Mode" },
  },

  {
    id: 30,
    name: "Ichigo (TYBW) + Mode",
    M1: {
      hits: [...generateHits({ baseDamage: 180, count: 1, upgrade: 3 })],
    },
    Z: {
      hits: [
        ...generateHits({ baseDamage: 300, count: 1, upgrade: 3 }),
        ...generateHits({ baseDamage: 675, count: 1, upgrade: 3 }),
      ],
    },
    X: { hits: [...generateHits({ baseDamage: 1275, count: 1, upgrade: 3 })] },
    C: {
      hits: [
        ...generateHits({ baseDamage: 6, count: 1, upgrade: 3 }),
        ...generateHits({ baseDamage: 12, count: 1, upgrade: 3 }),
      ],
    },
    V: { hits: [...generateHits({ baseDamage: 2700, count: 2, upgrade: 3 })] },
    F: { hits: [], desc: "Mode" },
  },
  {
    id: 31,
    name: "Zoro",
    M1: {
      hits: [...generateHits({ baseDamage: 145.0, count: 1 })],
    },
    Z: {
      hits: [...generateHits({ baseDamage: 725.0, count: 1 })],
    },
    X: {
      hits: [...generateHits({ baseDamage: 1087.5, count: 1 })],
    },
    C: {
      hits: [...generateHits({ baseDamage: 1232.5, count: 1 })],
    },
    V: {
      hits: [...generateHits({ baseDamage: 1595.0, count: 1 })],
    },
    F: {
      hits: [...generateHits({ baseDamage: 5437.5, count: 1 })],
    },
  },
  {
    id: 32,
    name: "Soul Cane",
    M1: {
      hits: [...generateHits({ baseDamage: 156.0, count: 1 })],
    },
    Z: {
      hits: [...generateHits({ baseDamage: 1020.5, count: 1, upgrade: 0 })],
    },
    X: {
      hits: [...generateHits({ baseDamage: 1651, count: 1, upgrade: 0 })],
    },
    C: {
      hits: [...generateHits({ baseDamage: 393.9, count: 5, upgrade: 0 })],
    },
    V: {
      hits: [...generateHits({ baseDamage: 2275.0, count: 1, upgrade: 0 })],
    },
  },
  {
    id: 33,
    name: "Nichirin Blade",
    M1: {
      hits: [...generateHits({ baseDamage: 390.0, count: 1 })],
    },
  },
  {
    id: 34,
    name: "Tanjiro",
    M1: {
      hits: [...generateHits({ baseDamage: 390.0, count: 1 })],
    },
    Z: {
      hits: [...generateHits({ baseDamage: 686.4, count: 1, upgrade: 0 })],
    },
    X: {
      hits: [...generateHits({ baseDamage: 471.9, count: 2, upgrade: 0 })],
    },
    C: {
      hits: [...generateHits({ baseDamage: 150.15, count: 8, upgrade: 0 })],
    },
    V: {
      hits: [...generateHits({ baseDamage: 117.98, count: 16, upgrade: 0 })],
    },
    F: {
      hits: [...generateHits({ baseDamage: 1287, count: 1, upgrade: 0 })],
    },
    Y: {
      hits: [],
      desc: "Mode",
    },
  },
  {
    id: 35,
    name: "Tanjiro + Mode",
    M1: {
      hits: [...generateHits({ baseDamage: 390.0, count: 1 })],
    },
    Z: {
      hits: [...generateHits({ baseDamage: 650, count: 1, upgrade: 0 })],
    },
    X: {
      hits: [...generateHits({ baseDamage: 812.5, count: 2, upgrade: 0 })],
    },
    C: {
      hits: [...generateHits({ baseDamage: 1105, count: 1, upgrade: 0 })],
    },
    V: {
      hits: [
        ...generateHits({ baseDamage: 40.625, count: 8, upgrade: 0 }),
        ...generateHits({ baseDamage: 975, count: 1, upgrade: 0 }),
      ],
    },
    F: {
      hits: [
        ...generateHits({ baseDamage: 650, count: 1, upgrade: 0 }),
        ...generateHits({ baseDamage: 1950, count: 1, upgrade: 0 }),
      ],
    },
    Y: {
      hits: [],
      desc: "Mode",
    },
  },
];
