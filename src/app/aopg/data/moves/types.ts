export type DamageScale = "fruitbuff" | "swordbuff" | "gunbuff" | "strengthbuff" | "hakibuff";

export type MoveKey = "M1" | "Q" | "E" | "R" | "F" | "G" | "T" | "U" | "Y";

// For split damage: each scale gets its own base damage value
export type SplitDamage = {
  scale: DamageScale;
  damage: number;
}[];

// For multi-scale: can be single scale, array of scales (takes max), or split damage (sums)
export type MoveScale = DamageScale | DamageScale[] | SplitDamage;

export interface MoveDamage {
  id: number;
  name: string;
  M1: number;
  Q: number;
  E: number;
  R: number;
  F: number;
  G: number;
  T: number;
  U: number;
  Y: number;
  // Optional: override default scale based on source (applies to all moves)
  scale?: DamageScale;
  // Optional: per-key scales - each move can have its own scale(s)
  // Example: { M1: "swordbuff", Q: "fruitbuff", E: ["fruitbuff", "strengthbuff"] }
  // For split damage: E: [{ scale: "fruitbuff", damage: 2500 }, { scale: "strengthbuff", damage: 2500 }]
  scales?: Partial<Record<MoveKey, MoveScale>>;
}

export const getMoveTotal = (move: MoveDamage): number => {
  const keys: (keyof MoveDamage)[] = [
    "M1",
    "Q",
    "E",
    "R",
    "F",
    "G",
    "T",
    "U",
    "Y",
  ];
  return keys.reduce((total, key) => total + Number(move[key]), 0);
};
