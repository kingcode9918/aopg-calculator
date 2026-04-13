export type DamageScale =
  | "fruitbuff"
  | "swordbuff"
  | "gunbuff"
  | "strengthbuff"
  | "hakibuff";

export type MoveKey = "M1" | "Q" | "E" | "R" | "F" | "G" | "T" | "U" | "Y";

// For split damage: each scale gets its own base damage value
export type SplitDamage = {
  scale: DamageScale;
  damage: number;
}[];

// For multi-scale: can be single scale, array of scales (takes max), or split damage (sums)
export type MoveScale = DamageScale | DamageScale[] | SplitDamage;

export type MoveData =
  | number
  | {
      dmg: number;
      cooldown?: number;
      duration?: number;
      hits?: number;
      scales?: MoveScale;
    };

export interface SpecialBuff {
  name: string;
  buff: number;
  buffKey?: Partial<Record<MoveKey, number>>;
  isTitle?: boolean;
  isMode?: boolean;
  stackable?: boolean;
  exclude?: MoveKey[];
}

export interface MoveDamage {
  id: number | string;
  name: string;
  M1?: MoveData;
  Q?: MoveData;
  E?: MoveData;
  R?: MoveData;
  F?: MoveData;
  G?: MoveData;
  T?: MoveData;
  U?: MoveData;
  Y?: MoveData;
  // Optional: override default scale based on source (applies to all moves)
  scale?: DamageScale;
  // Optional: per-key scales - each move can have its own scale(s)
  // Example: { M1: "swordbuff", Q: "fruitbuff", E: ["fruitbuff", "strengthbuff"] }
  // For split damage: E: [{ scale: "fruitbuff", damage: 2500 }, { scale: "strengthbuff", damage: 2500 }]
  scales?: Partial<Record<MoveKey, MoveScale>>;
  cooldowns?: Partial<Record<MoveKey, number>>;
  mode?: { buff: number; name?: string };
  specialBuffs?: SpecialBuff[];
  modeOverrides?: Partial<Record<MoveKey, MoveData>>;
}

export const getMoveDamageValue = (data: MoveData | undefined): number => {
  if (data === undefined) return 0;
  if (typeof data === "number") return data;
  return data.dmg || 0;
};

export const getMoveTotal = (move: MoveDamage): number => {
  const keys: MoveKey[] = ["M1", "Q", "E", "R", "F", "G", "T", "U", "Y"];
  return keys.reduce((total, key) => {
    const val = move[key as keyof MoveDamage];
    // check if it is MoveData (number or object with dmg)
    if (
      typeof val === "number" ||
      (typeof val === "object" && val !== null && "dmg" in val)
    ) {
      return total + getMoveDamageValue(val as MoveData);
    }
    return total;
  }, 0);
};
