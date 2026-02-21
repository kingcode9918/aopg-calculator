/**
 * SwordMove Interface
 * Represents sword style moves with base damage values.
 */
export interface MoveHit {
  hit: number; // Hit number (1, 2, 3…)
  damage: number; // Damage of that hit
  multiplier?: number; // Optional per-hit multiplier
}

export interface MoveSlot {
  hits: MoveHit[];
}

export interface MoveSet {
  id: number;
  name: string;

  M1?: MoveSlot;
  Z?: MoveSlot;
  X?: MoveSlot;
  C?: MoveSlot;
  V?: MoveSlot;
  F?: MoveSlot;
}
